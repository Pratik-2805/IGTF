// src/app/dashboard/DashboardClient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import{ jwtDecode} from "jwt-decode";


// Layout Components
import Header from "./layout/Header";
import Modal from "./common/Modal";

// Tab Components
import ExhibitorsTab from "@/components/admin/ExhibitorsTab";
import VisitorsTab from "@/components/admin/VisitorsTab";
import EventsTab from "@/components/admin/EventsTab";
import CategoriesTab from "@/components/admin/CategoriesTab";
import GalleryTab from "@/components/admin/GalleryTab";
import ManageTeamTab from "@/components/admin/ManageTeamTab";

// Hooks
import { useExhibitors } from "@/hooks/useExhibitors";
import { useVisitors } from "@/hooks/useVisitors";
import { useEvents } from "@/hooks/useEvents";
import { useCategories } from "@/hooks/useCategories";
import { useGallery } from "@/hooks/useGallery";
import { useTeam } from "@/hooks/useTeam";

// Config
import { UserRole, roleTabs, roleTitles } from "@/utils/roleConfig";

interface DecodedToken {
    id?: number;
    email?: string;
    role?: UserRole;
    exp?: number;
    // add other fields if present in your token
}

export default function DashboardClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // hooks (backend logic)
    const exhibitorsHook = useExhibitors();
    const visitorsHook = useVisitors();
    const eventsHook = useEvents();
    const categoriesHook = useCategories();
    const galleryHook = useGallery();
    const teamHook = useTeam();
    // modal
    const [showModal, setShowModal] = useState(false);

    // role and loading
    const [role, setRole] = useState<UserRole | null>(null);
    const [authChecked, setAuthChecked] = useState(false); // to avoid flicker

    // derive allowed tabs for the current role (memoized)
    const allowedTabs = useMemo(() => {
        if (!role) return [];
        return roleTabs[role] ?? [];
    }, [role]);

    // source-of-truth valid tabs for the app (all possible)
    const validTabs = ["exhibitors", "visitors", "events", "categories", "gallery","manage-team"];

    // Read tab from URL (source of truth)
    const tabFromUrl = searchParams?.get("tab") ?? "";
    // compute activeTab from URL but ensure it's valid _and_ allowed for role (if role known)
    const activeTabFromUrlIsValid = validTabs.includes(tabFromUrl);
    const activeTabAllowed = role ? allowedTabs.includes(tabFromUrl) : activeTabFromUrlIsValid;
    const activeTab = activeTabAllowed ? tabFromUrl || "exhibitors" : (allowedTabs[0] ?? "exhibitors");

    // Update tab by updating URL
    const handleTabChange = (tab: string) => {
        // prevent changing to a tab not allowed for role
        if (role && !allowedTabs.includes(tab)) {
            // optionally show toast / unauthorized notice
            return;
        }

        const params = new URLSearchParams(searchParams?.toString() ?? "");
        params.set("tab", tab);
        // replace to avoid pushing history on small changes
        router.replace(`${pathname}?${params.toString()}`);
    };

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem("isAdminLoggedIn");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // optional: clear other app state
        router.push("/login");
    };

    // --- Auth & role extraction from JWT ---
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const loggedIn = localStorage.getItem("isAdminLoggedIn");

        if (!token || loggedIn !== "true") {
            // Not logged in -> redirect to login
            setAuthChecked(true);
            router.push("/login");
            return;
        }

        try {
            const decoded = jwtDecode<DecodedToken>(token);
            if (!decoded || !decoded.role) {
                // invalid token or missing role
                setAuthChecked(true);
                router.push("/login");
                return;
            }

            // Ensure role is a supported role
            const r = decoded.role as UserRole;
            if (!["admin", "manager", "sales"].includes(r)) {
                // unsupported role -> treat as unauthorized
                setAuthChecked(true);
                router.push("/login");
                return;
            }

            setRole(r);
            setAuthChecked(true);
        } catch (err) {
            console.error("Token decode error:", err);
            setAuthChecked(true);
            router.push("/login");
        }
        // run only once on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    // If role is known and URL has invalid tab (or tab not allowed), replace URL to first allowed tab
    useEffect(() => {
        if (!authChecked) return; // wait until auth check finished
        if (!role) return;

        const urlTab = searchParams?.get("tab");
        // if no tab in url -> set to first allowed if not already
        if (!urlTab) {
            const params = new URLSearchParams(searchParams?.toString() ?? "");
            params.set("tab", allowedTabs[0]);
            router.replace(`${pathname}?${params.toString()}`);
            return;
        }

        // if the tab is invalid globally or not allowed for this role -> replace
        if (!validTabs.includes(urlTab) || !allowedTabs.includes(urlTab)) {
            const params = new URLSearchParams(searchParams?.toString() ?? "");
            params.set("tab", allowedTabs[0]);
            router.replace(`${pathname}?${params.toString()}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authChecked, role, searchParams?.toString()]);

    // Modal submit handler (kept as before)
    const handleSubmit = (formData: any) => {
        if (activeTab === "events") {
            eventsHook.editingItem ? eventsHook.editEvent(formData) : eventsHook.addEvent(formData);
        }

        if (activeTab === "categories") {
            categoriesHook.editingItem ? categoriesHook.editCategory(formData) : categoriesHook.addCategory(formData);
        }

        if (activeTab === "gallery") {
            galleryHook.editingItem ? galleryHook.editGalleryImage(formData) : galleryHook.addGalleryImage(formData);
        }

        setShowModal(false);
    };

    // show a loading state while auth is being checked
    if (!authChecked || !role) {
        return <div className="min-h-screen flex items-center justify-center">Checking authentication...</div>;
    }

    return (
        <div className="min-h-screen bg-background">
            {/* HEADER */}
            <Header activeTab={activeTab} onTabChange={handleTabChange} onLogout={handleLogout} role={role} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* EXHIBITORS TAB */}
                {activeTab === "exhibitors" && (
                    <ExhibitorsTab
                        exhibitors={exhibitorsHook.exhibitors}
                        stats={exhibitorsHook.stats}
                        searchQuery={exhibitorsHook.searchQuery}
                        setSearchQuery={exhibitorsHook.setSearchQuery}
                        filterStatus={exhibitorsHook.filterStatus}
                        setFilterStatus={exhibitorsHook.setFilterStatus}
                        updateStatus={exhibitorsHook.updateStatus}
                        isUpdating={exhibitorsHook.isUpdating}
                        loading={exhibitorsHook.loading}
                    />
                )}

                {/* VISITORS TAB */}
                {activeTab === "visitors" && (
                    <VisitorsTab
                        visitors={visitorsHook.visitors}
                        searchQuery={visitorsHook.searchQuery}
                        setSearchQuery={visitorsHook.setSearchQuery}
                        handleDeleteVisitor={visitorsHook.handleDeleteVisitor}
                        stats={visitorsHook.stats}
                        loading={visitorsHook.loading}
                    />
                )}

                {/* EVENTS TAB */}
                {activeTab === "events" && (
                    <EventsTab
                        events={eventsHook.events}
                        addEvent={eventsHook.addEvent}
                        editEvent={eventsHook.editEvent}
                        deleteEvent={eventsHook.deleteEvent}
                        loading={eventsHook.loading}
                    />
                )}

                {/* CATEGORIES TAB */}
                {activeTab === "categories" && (
                    <CategoriesTab
                        categories={categoriesHook.categories}
                        addCategory={categoriesHook.addCategory}
                        editCategory={categoriesHook.editCategory}
                        deleteCategory={categoriesHook.deleteCategory}
                        loading={categoriesHook.loading}
                    />
                )}

                {/* GALLERY TAB */}
                {activeTab === "gallery" && (
                    <GalleryTab
                        gallery={galleryHook.gallery}
                        addGalleryImage={galleryHook.addGalleryImage}
                        editGalleryImage={galleryHook.editGalleryImage}
                        deleteGalleryImage={galleryHook.deleteGalleryImage}
                        loading={galleryHook.loading}
                    />
                )}

                {activeTab === "manage-team" && (
                    <ManageTeamTab
                        team={teamHook.team}
                        loading={teamHook.loading}
                        createUser={teamHook.createUser}
                        deleteUser={teamHook.deleteUser}
                        refresh={teamHook.refresh}
                    />
                )}

            </div>

            {/* REUSABLE MODAL */}
            {showModal && (
                <Modal
                    title={
                        eventsHook.editingItem || categoriesHook.editingItem || galleryHook.editingItem
                            ? `Edit ${activeTab}`
                            : `Add new ${activeTab}`
                    }
                    onClose={() => {
                        setShowModal(false);
                        eventsHook.setEditingItem(null);
                        categoriesHook.setEditingItem(null);
                        galleryHook.setEditingItem(null);
                        galleryHook.setImageFile(null);
                    }}
                >
                    {/* Dynamic Form Fields based on active tab */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const fd = new FormData(e.currentTarget);
                            const obj = Object.fromEntries(fd.entries());
                            handleSubmit(obj);
                        }}
                        className="space-y-4"
                    >
                        {/* EVENT FORM */}
                        {activeTab === "events" && (
                            <>
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        defaultValue={(eventsHook.editingItem as any)?.title || ""}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                        Location
                                    </label>
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        defaultValue={(eventsHook.editingItem as any)?.location || ""}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                        Date
                                    </label>
                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        defaultValue={(eventsHook.editingItem as any)?.date || ""}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        name="exhibitors"
                                        type="number"
                                        defaultValue={(eventsHook.editingItem as any)?.exhibitors ?? 0}
                                        placeholder="Exhibitors"
                                        className="border rounded p-2"
                                    />
                                    <input
                                        name="buyers"
                                        type="number"
                                        defaultValue={(eventsHook.editingItem as any)?.buyers ?? 0}
                                        placeholder="Buyers"
                                        className="border rounded p-2"
                                    />
                                    <input
                                        name="countries"
                                        type="number"
                                        defaultValue={(eventsHook.editingItem as any)?.countries ?? 0}
                                        placeholder="Countries"
                                        className="border rounded p-2"
                                    />
                                    <input
                                        name="sectors"
                                        type="number"
                                        defaultValue={(eventsHook.editingItem as any)?.sectors ?? 0}
                                        placeholder="Sectors"
                                        className="border rounded p-2"
                                    />
                                </div>

                                <label className="inline-flex items-center gap-2">
                                    <input name="is_past" type="checkbox" defaultChecked={!!(eventsHook.editingItem as any)?.is_past} />
                                    <span className="text-sm">Is past event</span>
                                </label>
                            </>
                        )}

                        {/* CATEGORY FORM */}
                        {activeTab === "categories" && (
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    defaultValue={(categoriesHook.editingItem as any)?.name || ""}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                />
                            </div>
                        )}

                        {/* GALLERY FORM */}
                        {activeTab === "gallery" && (
                            <>
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        defaultValue={(galleryHook.editingItem as any)?.title || ""}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                        Image
                                    </label>
                                    <input id="image" name="image" type="file" accept="image/*" className="mt-1 block w-full" />
                                </div>
                            </>
                        )}

                        <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-md">
                            Submit
                        </button>
                    </form>
                </Modal>
            )}
        </div>
    );
}

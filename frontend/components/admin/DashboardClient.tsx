// ...existing code...
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// Layout Components
import Header from "./layout/Header";
import Modal from "./common/Modal";

// Tab Components
import ExhibitorsTab from "@/components/admin/ExhibitorsTab";
import VisitorsTab from "@/components/admin/VisitorsTab";
import EventsTab from "@/components/admin/EventsTab";
import CategoriesTab from "@/components/admin/CategoriesTab";
import GalleryTab from "@/components/admin/GalleryTab";

// Hooks
import { useExhibitors } from "@/hooks/useExhibitors";
import { useVisitors } from "@/hooks/useVisitors";
import { useEvents } from "@/hooks/useEvents";
import { useCategories } from "@/hooks/useCategories";
import { useGallery } from "@/hooks/useGallery";

export default function DashboardClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // --- Tabs ---
    const validTabs = ["exhibitors", "visitors", "events", "categories", "gallery"];

    // Read tab from URL (source of truth)
    const tabFromUrl = searchParams?.get("tab");
    const activeTab = validTabs.includes(tabFromUrl ?? "")
        ? tabFromUrl!
        : "exhibitors";

    // Update tab by updating URL
    const handleTabChange = (tab: string) => {
        const params = new URLSearchParams(searchParams?.toString() ?? "");
        params.set("tab", tab);

        router.replace(`${pathname}?${params.toString()}`);
    };

    // --- Modal ---
    const [showModal, setShowModal] = useState(false);

    // --- Authentication Check ---
    useEffect(() => {
        const loggedIn = localStorage.getItem("isAdminLoggedIn");
        const token = localStorage.getItem("accessToken");

        if (loggedIn !== "true" || !token) {
            router.push("/admin/login");
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("isAdminLoggedIn");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/");
    };

    // --- Hooks (All Backend Logic) ---
    const exhibitorsHook = useExhibitors();
    const visitorsHook = useVisitors();
    const eventsHook = useEvents();
    const categoriesHook = useCategories();
    const galleryHook = useGallery();

    // --- Modal Form Submit Handler ---
    const handleSubmit = (formData: any) => {
        if (activeTab === "events") {
            eventsHook.editingItem
                ? eventsHook.editEvent(formData)
                : eventsHook.addEvent(formData);
        }

        if (activeTab === "categories") {
            categoriesHook.editingItem
                ? categoriesHook.editCategory(formData)
                : categoriesHook.addCategory(formData);
        }

        if (activeTab === "gallery") {
            galleryHook.editingItem
                ? galleryHook.editGalleryImage(formData)
                : galleryHook.addGalleryImage(formData);
        }

        setShowModal(false);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* HEADER */}
            <Header activeTab={activeTab} onTabChange={handleTabChange} onLogout={handleLogout} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* --- EXHIBITORS TAB --- */}
                {activeTab === "exhibitors" && (
                    <ExhibitorsTab
                        exhibitors={exhibitorsHook.exhibitors}
                        stats={exhibitorsHook.stats}
                        searchQuery={exhibitorsHook.searchQuery}
                        setSearchQuery={exhibitorsHook.setSearchQuery}
                        filterStatus={exhibitorsHook.filterStatus}
                        setFilterStatus={exhibitorsHook.setFilterStatus}
                        updateStatus={exhibitorsHook.updateStatus}
                        isUpdating={exhibitorsHook.isUpdating} // Add this line
                        loading={exhibitorsHook.loading}
                    />
                )}

                {/* --- VISITORS TAB --- */}
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

                {/* --- EVENTS TAB --- */}
                {activeTab === "events" && (
                    <EventsTab
                        events={eventsHook.events}
                        addEvent={eventsHook.addEvent}
                        editEvent={eventsHook.editEvent}
                        deleteEvent={eventsHook.deleteEvent}
                        loading={eventsHook.loading}
                    />
                )}

                {/* --- CATEGORIES TAB --- */}
                {activeTab === "categories" && (
                    <CategoriesTab
                        categories={categoriesHook.categories}
                        addCategory={categoriesHook.addCategory}
                        editCategory={categoriesHook.editCategory}
                        deleteCategory={categoriesHook.deleteCategory}
                        loading={categoriesHook.loading}

                    />
                )}

                {/* --- GALLERY TAB --- */}
                {activeTab === "gallery" && (
                    <GalleryTab
                        gallery={galleryHook.gallery}
                        addGalleryImage={galleryHook.addGalleryImage}
                        editGalleryImage={galleryHook.editGalleryImage}
                        deleteGalleryImage={galleryHook.deleteGalleryImage}
                        loading={galleryHook.loading}
                    />
                )}
            </div>

            {/* --- REUSABLE MODAL --- */}
            {showModal && (
                <Modal
                    title={
                        eventsHook.editingItem ||
                            categoriesHook.editingItem ||
                            galleryHook.editingItem
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
                        {/* EVENT FORM (inline to avoid referencing EventsTab.Form) */}
                        {activeTab === "events" && (
                            <>
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        defaultValue={(eventsHook.editingItem as any)?.title || ""}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        defaultValue={(eventsHook.editingItem as any)?.location || ""}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        defaultValue={(eventsHook.editingItem as any)?.date || ""}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <input name="exhibitors" type="number" defaultValue={(eventsHook.editingItem as any)?.exhibitors ?? 0} placeholder="Exhibitors" className="border rounded p-2" />
                                    <input name="buyers" type="number" defaultValue={(eventsHook.editingItem as any)?.buyers ?? 0} placeholder="Buyers" className="border rounded p-2" />
                                    <input name="countries" type="number" defaultValue={(eventsHook.editingItem as any)?.countries ?? 0} placeholder="Countries" className="border rounded p-2" />
                                    <input name="sectors" type="number" defaultValue={(eventsHook.editingItem as any)?.sectors ?? 0} placeholder="Sectors" className="border rounded p-2" />
                                </div>

                                <label className="inline-flex items-center gap-2">
                                    <input name="is_past" type="checkbox" defaultChecked={!!(eventsHook.editingItem as any)?.is_past} />
                                    <span className="text-sm">Is past event</span>
                                </label>
                            </>
                        )}

                        {/* CATEGORY FORM (inline to avoid referencing CategoriesTab.Form) */}
                        {activeTab === "categories" && (
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
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
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        defaultValue={(galleryHook.editingItem as any)?.title || ""}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        className="mt-1 block w-full"
                                    />
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground py-3 rounded-md"
                        >
                            Submit
                        </button>
                    </form>
                </Modal>
            )}
        </div>
    );
}
// ...existing code...
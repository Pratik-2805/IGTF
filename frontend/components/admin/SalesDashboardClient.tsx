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

// Hooks
import { useExhibitors } from "@/hooks/useExhibitors";
import { useVisitors } from "@/hooks/useVisitors";

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
            router.push("/login");
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

    return (
        <div className="min-h-screen bg-background">
            {/* HEADER */}
            <Header activeTab={activeTab} onTabChange={handleTabChange} onLogout={handleLogout} role="sales"/>

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
            </div>
        </div>
    );
}

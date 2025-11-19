"use client";

import { LogOut } from "lucide-react";

const tabs = ["exhibitors", "visitors", "events", "categories", "gallery"];

interface HeaderProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    onLogout: () => void;
}

export default function Header({ activeTab, onTabChange, onLogout }: HeaderProps) {
    return (
        <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-40">
            {/* Logo + Logout */}
            <div className="flex items-center justify-between px-6 py-4">
                <h1 className="font-serif text-2xl">Admin Dashboard</h1>

                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 bg-primary-foreground text-primary px-4 py-2 rounded-md hover:bg-primary-foreground/90"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>

            {/* Navigation Tabs */}
            <div className="border-t border-primary-foreground/20">
                <div className="flex gap-1 overflow-x-auto px-4 py-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => onTabChange(tab)}
                            className={`capitalize px-6 py-3 font-medium ${activeTab === tab
                                    ? "bg-primary-foreground text-primary border-b-2 border-primary"
                                    : "text-primary-foreground/70 hover:text-primary-foreground"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
}

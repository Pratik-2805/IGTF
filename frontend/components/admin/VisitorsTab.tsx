"use client";

import { Search } from "lucide-react";
import { VisitorRegistration } from "@/utils/api";

interface VisitorsTabProps {
    visitors: VisitorRegistration[];
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    handleDeleteVisitor: (id: number) => void;
    stats: {
        totalVisitors: number;
        paidVisitors: number;
        contactedVisitors: number;
    };
    loading: boolean;
}

export default function VisitorsTab({
    visitors,
    searchQuery,
    setSearchQuery,
    stats,
    handleDeleteVisitor,
    loading,
}: VisitorsTabProps) {

    const safeVisitors = Array.isArray(visitors) ? visitors : [];
    const filteredVisitors = safeVisitors.filter((v) => {
        const q = searchQuery.toLowerCase();
        return (
            v.first_name.toLowerCase().includes(q) ||
            v.last_name.toLowerCase().includes(q) ||
            v.company_name.toLowerCase().includes(q) ||
            v.email_address.toLowerCase().includes(q) ||
            v.industry_interest.toLowerCase().includes(q)
        );
    });

    if (loading) {
        return (
            <div className="py-40 flex justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading exhibitors...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-purple-500/10 border border-purple-500 p-6 rounded-lg">
                    <p className="text-sm text-purple-700 mb-1">Total Visitors</p>
                    <p className="text-3xl font-bold text-purple-700">{stats.totalVisitors}</p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500 p-6 rounded-lg">
                    <p className="text-sm text-blue-700 mb-1">Contacted Visitors</p>
                    <p className="text-3xl font-bold text-blue-700">{stats.contactedVisitors}</p>
                </div>

                <div className="bg-green-500/10 border border-green-500 p-6 rounded-lg">
                    <p className="text-sm text-green-700 mb-1">Paid Visitors</p>
                    <p className="text-3xl font-bold text-green-700">{stats.paidVisitors}</p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-muted/30 p-6 rounded-lg mb-8">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search visitors by name, company, email, or industry..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-md bg-background border border-border focus:ring-primary"
                    />
                </div>
            </div>

            {/* Visitor List */}
            <div className="space-y-4">
                <h2 className="font-serif text-2xl mb-4">
                    Visitor Registrations ({filteredVisitors.length})
                </h2>

                {filteredVisitors.map((visitor) => (
                    <div
                        key={visitor.id}
                        className="border-2 rounded-lg p-6 bg-blue-500/10 border-blue-500 hover:shadow-lg transition"
                    >
                        <div className="flex flex-col lg:flex-row justify-between gap-6">

                            {/* Left Section */}
                            <div className="flex-1 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-serif text-xl">
                                            {visitor.first_name} {visitor.last_name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Registered on {new Date(visitor.created_at).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <span className="px-3 py-1 text-xs rounded-full bg-blue-500 text-white">
                                        VISITOR
                                    </span>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Company</p>
                                        <p className="font-medium">{visitor.company_name}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">Industry</p>
                                        <p className="font-medium">{visitor.industry_interest}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <p className="font-medium">{visitor.email_address}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">Contact Number</p>
                                        <p className="font-medium">{visitor.phone_number}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Section - Delete Button */}
                            <div className="lg:w-48">
                                <p className="text-sm font-medium mb-3">Actions</p>

                                <button
                                    onClick={() => handleDeleteVisitor(visitor.id)}
                                    className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm font-medium"
                                >
                                    Delete Registration
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredVisitors.length === 0 && visitors.length > 0 && (
                    <div className="text-center text-muted-foreground py-12">
                        No visitors match this search.
                    </div>
                )}

                {visitors.length === 0 && (
                    <div className="text-center text-muted-foreground py-12">
                        No visitor registrations found.
                    </div>
                )}
            </div>
        </div>
    );
}

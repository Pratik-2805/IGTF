"use client";

import { useState, useEffect, useCallback } from "react";
import { ExhibitorRegistration, URLS, getAuthHeaders } from "@/utils/api";
import { toast } from "sonner";

export function useExhibitors() {
  const [exhibitors, setExhibitors] = useState<ExhibitorRegistration[]>([]);
  const [loading, setLoading] = useState(true); // initial fetch loader
  const [isUpdating, setIsUpdating] = useState(false); // update loader

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const fetchExhibitors = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(URLS.EXHIBITORS, { headers: getAuthHeaders() });
      const data = await res.json();

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setExhibitors(list);
    } catch (err) {
      setExhibitors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExhibitors();
  }, [fetchExhibitors]);

  // STATUS UPDATE — NO OPTIMISTIC UPDATE
  const updateStatus = async (
    id: number,
    newStatus: ExhibitorRegistration["status"]
  ) => {
    try {
      setIsUpdating(true);

      const res = await fetch(`${URLS.EXHIBITORS}${id}/`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      toast.success("Status updated successfully");

      await fetchExhibitors(); // wait for fresh backend data
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  // STATS
  const stats = {
    totalExhibitors: exhibitors.length,
    paidExhibitors: exhibitors.filter((e) => e.status === "paid").length,
    contactedExhibitors: exhibitors.filter((e) => e.status === "contacted")
      .length,
    pendingExhibitors: exhibitors.filter((e) => e.status === "pending").length,
    rejectedExhibitors: exhibitors.filter((e) => e.status === "rejected")
      .length,
  };

  return {
    exhibitors,
    loading,
    isUpdating,

    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,

    updateStatus,
    stats,
    refetch: fetchExhibitors,
  };
}

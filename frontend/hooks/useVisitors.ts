"use client";

import { useState, useEffect, useCallback } from "react";
import { VisitorRegistration, URLS, getAuthHeaders } from "@/utils/api";
import { toast } from "sonner";

export function useVisitors() {
  const [visitors, setVisitors] = useState<VisitorRegistration[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  // ----------------------------
  // FETCH VISITORS
  // ----------------------------
  const fetchVisitors = useCallback(async () => {
    try {
      const res = await fetch(URLS.VISITORS, {
        headers: getAuthHeaders(),
      });

      const data = await res.json();
      console.log("VISITOR API RESPONSE:", data);

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.results)
        ? data.results
        : [];

      setVisitors(list);
    } catch (error) {
      console.error("Visitor fetch error:", error);
      setVisitors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVisitors();
  }, [fetchVisitors]);

  // ----------------------------
  // DELETE VISITOR
  // ----------------------------
  const handleDeleteVisitor = async (id: number) => {
    try {
      const res = await fetch(`${URLS.VISITORS}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        toast.error("Failed to delete visitor");
        return;
      }

      // Remove visitor locally
      setVisitors((prev) => prev.filter((v) => v.id !== id));

      toast.success("Visitor deleted successfully");
    } catch (error) {
      console.error("Delete visitor error:", error);
      toast.error("Error deleting visitor");
    }
  };

  // ----------------------------
  // RETURN HOOK DATA
  // ----------------------------
  return {
    visitors,
    searchQuery,
    loading,
    setSearchQuery,
    handleDeleteVisitor, // <-- added correctly
    stats: {
      totalVisitors: visitors.length,
      contactedVisitors: visitors.filter((v) => v.status === "contacted")
        .length,
      paidVisitors: visitors.filter((v) => v.status === "paid").length,
    },
  };
}

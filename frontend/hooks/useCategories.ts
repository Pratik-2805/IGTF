"use client";

import { useState, useEffect, useCallback } from "react";
import { Category, URLS, getAuthHeaders } from "@/utils/api";
import { toast } from "sonner";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all categories
  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(URLS.CATEGORIES, {
        headers: getAuthHeaders(),
      });

      const data = await res.json();
      setCategories(data.results || data);
    } catch (err) {
      toast.error("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // ✅ ADD CATEGORY — with image upload (multipart/form-data)
  const addCategory = async (data: any, file: File | null) => {
    try {
      const form = new FormData();

      form.append("name", data.name);
      form.append("icon", data.icon);
      form.append("description", data.description);

      if (file) {
        form.append("image", file); // sends file to S3 via Django
      }

      const res = await fetch(URLS.CATEGORIES, {
        method: "POST",
        headers: {
          Authorization: getAuthHeaders().Authorization!, // NO content-type here
        },
        body: form,
      });

      if (!res.ok) throw new Error("Failed to create category");

      toast.success("Category created successfully!");
      fetchCategories();
    } catch (err) {
      toast.error("Failed to create category.");
    }
  };

  // ❌ REMOVED EDIT FUNCTION COMPLETELY
  // (You no longer need it and your UI should not call it)

  // ✅ DELETE CATEGORY
  const deleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`${URLS.CATEGORIES}${id}/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Category deleted successfully.");
      fetchCategories();
    } catch (err) {
      toast.error("Failed to delete category.");
    }
  };

  return {
    categories,
    loading,

    addCategory,
    deleteCategory,
    refetch: fetchCategories,
  };
}

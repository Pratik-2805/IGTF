"use client";

import { useState, useEffect, useCallback } from "react";
import { Category, URLS, getAuthHeaders } from "@/utils/api";
import { toast } from "sonner";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // For editing inside the modal
  const [editingItem, setEditingItem] = useState<Category | null>(null);

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

  // Add Category
  const addCategory = async (data: any) => {
    try {
      const res = await fetch(URLS.CATEGORIES, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create category");

      toast.success("Category created successfully!");
      fetchCategories();
    } catch (err) {
      toast.error("Failed to create category.");
    }
  };

  // Edit Category
  const editCategory = async (data: any) => {
    if (!editingItem) return;

    try {
      const res = await fetch(`${URLS.CATEGORIES}${editingItem.id}/`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update category");

      toast.success("Category updated successfully!");
      fetchCategories();
    } catch (err) {
      toast.error("Failed to update category.");
    }
  };

  // Delete category
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

    editingItem,
    setEditingItem,

    addCategory,
    editCategory,
    deleteCategory,

    refetch: fetchCategories,
  };
}

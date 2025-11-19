"use client";

import { useState, useEffect, useCallback } from "react";
import { GalleryImage, URLS, getAuthHeaders } from "@/utils/api";
import { toast } from "sonner";

export function useGallery() {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  // For modal editing
  const [editingItem, setEditingItem] = useState<GalleryImage | null>(null);

  // For storing selected image file
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch gallery images
  const fetchGallery = useCallback(async () => {
    try {
      const res = await fetch(URLS.GALLERY, {
        headers: getAuthHeaders(),
      });

      const data = await res.json();
      setGallery(data.results || data);
    } catch (error) {
      toast.error("Failed to load gallery images.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  // Add a new gallery image
  const addGalleryImage = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(URLS.GALLERY, {
        method: "POST",
        headers: {
          Authorization: getAuthHeaders().Authorization || "",
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload image");

      toast.success("Gallery image added!");
      setImageFile(null);
      fetchGallery();
    } catch (error) {
      toast.error("Failed to add image.");
    }
  };

  // Edit an existing gallery image
  const editGalleryImage = async (data: any) => {
    if (!editingItem) return;

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);

      // Only upload a new file if user selected one
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`${URLS.GALLERY}${editingItem.id}/`, {
        method: "PUT",
        headers: {
          Authorization: getAuthHeaders().Authorization || "",
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update image");

      toast.success("Gallery image updated!");
      setEditingItem(null);
      setImageFile(null);
      fetchGallery();
    } catch (error) {
      toast.error("Failed to update gallery image.");
    }
  };

  // Delete a gallery image
  const deleteGalleryImage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`${URLS.GALLERY}${id}/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Image deleted.");
      fetchGallery();
    } catch (error) {
      toast.error("Failed to delete image.");
    }
  };

  return {
    gallery,
    loading,

    editingItem,
    setEditingItem,

    imageFile,
    setImageFile,

    addGalleryImage,
    editGalleryImage,
    deleteGalleryImage,

    refetch: fetchGallery,
  };
}

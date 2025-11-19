"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";

import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/utils/cropImage";

interface GalleryImage {
    id: number;
    title: string;
    description: string;
    image?: string; // URL (optional to match API shape)
    location?: string;
    gallery_type?: string;
    about_type?: string;
}
interface GalleryTabProps {
    gallery: GalleryImage[];
    addGalleryImage: (data: any, file: File | null) => void;
    editGalleryImage: (data: any, file: File | null) => void;
    deleteGalleryImage: (id: number) => void;
    loading: boolean;
}

export default function GalleryTab({
    gallery,
    addGalleryImage,
    editGalleryImage,
    deleteGalleryImage,
    loading,
}: GalleryTabProps) {
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<GalleryImage | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    // NEW: location state for conditional gallery options
    const [selectedLocation, setSelectedLocation] = useState<string>("");

    useEffect(() => {
        if (editingItem) {
            setSelectedLocation(editingItem.location || "");
        } else {
            setSelectedLocation("");
        }
    }, [editingItem]);

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
        setImageFile(null);
        setSelectedLocation("");
    };

    if (loading) {
        return (
            <div className="py-40 flex justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading images/videos...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="font-serif text-3xl">Manage Images/Videos ({gallery.length})</h2>

                <button
                    onClick={() => {
                        setEditingItem(null);
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90"
                >
                    <Plus className="w-5 h-5" /> Add Image
                </button>
            </div>

            {/* GALLERY GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((img) => (
                    <div
                        key={img.id}
                        className="bg-muted/30 rounded-lg shadow-lg overflow-hidden"
                    >
                        <img
                            src={img.image}
                            alt={img.title}
                            className="w-full h-52 object-cover"
                        />

                        <div className="p-5">
                            <h3 className="font-serif text-xl">{img.title}</h3>

                            {/* Show location */}
                            <p className="text-xs mt-1 text-muted-foreground">
                                <b>Shown on:</b> {img.location || "—"}
                                {img.location === "gallery" && img.gallery_type
                                    ? ` (${img.gallery_type})`
                                    : ""}
                            </p>

                            <p className="text-sm text-muted-foreground mt-2">
                                {img.description}
                            </p>

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => {
                                        setEditingItem(img);
                                        setShowModal(true);
                                    }}
                                    className="p-2 hover:bg-muted rounded-md transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>

                                <button
                                    onClick={() => deleteGalleryImage(img.id)}
                                    className="p-2 hover:bg-red-500/10 text-red-500 rounded-md transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ⭐ MODAL (IN-TAB, NO WRAPPER COMPONENT) */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-background rounded-lg max-w-xl w-full shadow-xl max-h-[90vh] overflow-y-auto">
                        {/* HEADER */}
                        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-background">
                            <h2 className="font-serif text-2xl">
                                {editingItem ? "Edit Image" : "Add Image"}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-muted rounded-md"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const fd = new FormData(e.currentTarget);
                                const data = Object.fromEntries(fd.entries());

                                editingItem
                                    ? editGalleryImage(data, imageFile)
                                    : addGalleryImage(data, imageFile);

                                closeModal();
                            }}
                            className="p-6 space-y-4"
                        >
                            {/* TITLE */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Image Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={editingItem?.title}
                                    required
                                    className="w-full px-4 py-2 rounded-md border border-border bg-background"
                                />
                            </div>

                            {/* 📌 LOCATION FIELD */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Show this image on:
                                </label>

                                <select
                                    name="location"
                                    value={selectedLocation}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSelectedLocation(value);

                                        // clear gallery_type when leaving gallery
                                        if (value !== "gallery") {
                                            const galleryType = document.querySelector(
                                                "select[name='gallery_type']"
                                            ) as HTMLSelectElement;
                                            if (galleryType) galleryType.value = "";
                                        }
                                    }}
                                    required
                                    className="w-full px-4 py-2 rounded-md border border-border bg-background"
                                >
                                    <option value="">Select Page</option>
                                    <option value="home">Home</option>
                                    <option value="about">About Us</option>
                                    <option value="gallery">Gallery</option>
                                </select>
                            </div>

                            {/* 📌 SHOW ONLY IF GALLERY SELECTED */}
                            {selectedLocation === "gallery" && (
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Where in Gallery?
                                    </label>

                                    <select
                                        name="gallery_type"
                                        defaultValue={editingItem?.gallery_type || ""}
                                        required
                                        className="w-full px-4 py-2 rounded-md border border-border bg-background"
                                    >
                                        <option value="">Select Option</option>
                                        <option value="carousel">Carousel</option>
                                        <option value="tab">Tab Position</option>
                                    </select>
                                </div>
                            )}

                            {/* 📌 SHOW ONLY IF GALLERY SELECTED */}
                            {selectedLocation === "about" && (
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Where in About Us?
                                    </label>

                                    <select
                                        name="about_type"
                                        defaultValue={editingItem?.about_type || ""}
                                        required
                                        className="w-full px-4 py-2 rounded-md border border-border bg-background"
                                    >
                                        <option value="">Select Option</option>
                                        <option value="why_exhibit">Why Exhibit?</option>
                                        <option value="why_chose_igtf">Why Choose IGTF?</option>
                                    </select>
                                </div>
                            )}

                            {/* IMAGE UPLOAD */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setImageFile(e.target.files?.[0] || null)
                                    }
                                    required={!editingItem}
                                    className="w-full px-4 py-2 rounded-md border border-border bg-background"
                                />

                                {editingItem && !imageFile && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Current Image:{" "}
                                        <span className="text-primary">{editingItem.image}</span>
                                    </p>
                                )}
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    defaultValue={editingItem?.description}
                                    rows={3}
                                    className="w-full px-4 py-2 rounded-md border border-border bg-background resize-none"
                                />
                            </div>

                            {/* BUTTONS */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-6 py-3 rounded-md border border-border hover:bg-muted transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/80 transition"
                                >
                                    {editingItem ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

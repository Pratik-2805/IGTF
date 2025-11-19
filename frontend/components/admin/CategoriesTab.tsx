"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";

import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/utils/cropImage";

interface Category {
    id: number;
    name: string;
    icon: string;
    description: string;
    image?: string;
}

interface CategoriesTabProps {
    categories: Category[];
    addCategory: (data: any, file: File | null) => void;
    editCategory: (data: any, file: File | null) => void;
    deleteCategory: (id: number) => void;
    loading: boolean;
}

export default function CategoriesTab({
    categories,
    addCategory,
    editCategory,
    deleteCategory,
    loading
}: CategoriesTabProps) {

    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Category | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    // CROPPER STATE
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [showCropper, setShowCropper] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
        setImageFile(null);
        setImageSrc(null);
    };

    if (loading) {
        return (
            <div className="py-40 flex justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading categories...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="font-serif text-3xl">Manage Categories ({categories.length})</h2>

                <button
                    onClick={() => {
                        setEditingItem(null);
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Add Category
                </button>
            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div key={category.id} className="bg-muted/30 p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between items-start">
                            <h3 className="font-serif text-xl mb-2 flex items-center gap-2">
                                <span className="text-2xl">{category.icon}</span>
                                {category.name}
                            </h3>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setEditingItem(category);
                                        setShowModal(true);
                                    }}
                                    className="p-2 hover:bg-muted rounded-md"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>

                                <button
                                    onClick={() => deleteCategory(category.id)}
                                    className="p-2 hover:bg-red-500/10 text-red-500 rounded-md"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground mt-3">{category.description}</p>

                        {category.image && (
                            <img
                                src={category.image}
                                alt={category.name}
                                className="mt-4 rounded-md w-full h-40 object-cover border"
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* ⭐ MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-background rounded-lg max-w-xl w-full shadow-xl max-h-[90vh] overflow-y-auto">

                        {/* HEADER */}
                        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-background">
                            <h2 className="font-serif text-2xl">
                                {editingItem ? "Edit Category" : "Add Category"}
                            </h2>

                            <button onClick={closeModal} className="p-2 hover:bg-muted rounded-md">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const fd = new FormData(e.currentTarget);
                                const data = Object.fromEntries(fd.entries());

                                if (editingItem) {
                                    editCategory(data, imageFile);
                                } else {
                                    addCategory(data, imageFile);
                                }
                                closeModal();
                            }}
                            className="p-6 space-y-4"
                        >

                            {/* NAME */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Category Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={editingItem?.name}
                                    required
                                    className="w-full px-4 py-2 rounded-md border border-border bg-background"
                                />
                            </div>

                            {/* ICON */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Icon (Emoji)</label>
                                <input
                                    type="text"
                                    name="icon"
                                    defaultValue={editingItem?.icon}
                                    required
                                    className="w-full px-4 py-2 rounded-md border border-border bg-background"
                                />
                            </div>

                            {/* IMAGE UPLOAD */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Category Image (3:5)</label>

                                <div className="flex items-center border border-border rounded-md overflow-hidden mb-3">
                                    <label className="bg-blue-600 text-white px-4 py-2 cursor-pointer hover:bg-blue-700 transition">
                                        Choose Image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                setImageSrc(URL.createObjectURL(file));
                                                setShowCropper(true);
                                            }}
                                            required={!editingItem}
                                        />
                                    </label>

                                    <div className="flex-1 bg-white px-4 py-2 text-sm">
                                        {imageFile
                                            ? imageFile.name
                                            : editingItem?.image
                                                ? editingItem.image.split("/").pop()
                                                : "No file chosen"}
                                    </div>
                                </div>

                                {/* CROPPER */}
                                {showCropper && imageSrc && (
                                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                                        <div className="bg-white p-4 rounded-lg shadow-xl max-w-lg w-full">

                                            <h3 className="text-lg font-semibold mb-3">Crop Image (3 :5)</h3>

                                            <div className="relative w-full h-64 bg-black">
                                                <Cropper
                                                    image={imageSrc}
                                                    crop={crop}
                                                    zoom={zoom}
                                                    aspect={3 / 5}
                                                    onCropChange={setCrop}
                                                    onZoomChange={setZoom}
                                                    onCropComplete={(_, area) => setCroppedAreaPixels(area)}
                                                />
                                            </div>

                                            <div className="flex justify-end gap-3 mt-4">
                                                <button
                                                    onClick={() => setShowCropper(false)}
                                                    className="px-4 py-2 border rounded-md"
                                                >
                                                    Cancel
                                                </button>

                                                <button
                                                    onClick={async () => {
                                                        const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
                                                        setImageFile(cropped);
                                                        setShowCropper(false);
                                                    }}
                                                    className="px-4 py-2 bg-primary text-white rounded-md"
                                                >
                                                    Save Crop
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    name="description"
                                    rows={3}
                                    defaultValue={editingItem?.description}
                                    required
                                    className="w-full px-4 py-2 rounded-md border border-border bg-background resize-none"
                                />
                            </div>

                            {/* BUTTONS */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-6 py-3 border rounded-md hover:bg-muted"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90"
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

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { ChatBot } from "@/components/chat-bot";
import { Footer } from "@/components/footer";

const GALLERY_API_URL = "http://localhost:8000/api/gallery/";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fetch gallery images from API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(GALLERY_API_URL);
        if (!res.ok) {
          console.error("Failed to load gallery:", res.status);
          return;
        }

        let data = await res.json();

        // Handle DRF pagination: { results: [...] }
        if (data && data.results) data = data.results;

        if (!Array.isArray(data)) {
          console.error("Gallery API did not return a list");
          return;
        }

        setGallery(data);
      } catch (error) {
        console.error("Gallery fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative py-32 px-4 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-6xl mb-6 animate-fade-in">
              Gallery
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in-delay-1">
              Explore highlights from our previous exhibitions
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 scroll-animate">
              <h2 className="font-serif text-3xl md:text-4xl mb-4">
                Exhibition Moments
              </h2>
              <p className="text-muted-foreground">
                Captured memories of business, innovation & global trade
              </p>
            </div>

            {loading ? (
              <p className="text-center text-muted-foreground text-xl">
                Loading gallery...
              </p>
            ) : gallery.length === 0 ? (
              <p className="text-center text-muted-foreground text-xl">
                No gallery images found. Upload some in the admin panel.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedImage(item.image_url)}
                    className="aspect-square rounded-lg overflow-hidden shadow hover:scale-105 transition-all duration-500 cursor-pointer"
                  >
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Image Modal */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          >
            <div className="relative w-[90%] md:w-[60%] lg:w-[40%] h-[60%] md:h-[70%]">
              <Image
                src={selectedImage}
                alt="Full Preview"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        )}
      </div>

      <Footer />
      <ChatBot />
    </div>
  );
}

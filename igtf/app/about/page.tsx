"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChatBot } from "@/components/chat-bot";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const exhibitImages = [
    {
      src: "/gallery/image1.jpg",
      alt: "Grand Success - Bigger Comeback November 2025",
    },
    {
      src: "/gallery/image2.jpg",
      alt: "Join Indian Ethnic Expo 2nd Edition Dubai",
    },
    {
      src: "/gallery/image3.jpg",
      alt: "Direct Access to Your Next Big Client",
    },
    {
      src: "/gallery/image4.jpg",
      alt: "Unlock Your Business Potential",
    },
    {
      src: "/gallery/image5.jpg",
      alt: "Showcase Your Collection at Dubai Premium Exhibition",
    },
    {
      src: "/gallery/image6.jpg",
      alt: "Your Next Big Opportunity is Here",
    },
    {
      src: "/gallery/image7.jpg",
      alt: "Grand Success Second Edition",
    },
    {
      src: "/gallery/image8.jpg",
      alt: "Making a Comeback November 2025",
    },
    {
      src: "/gallery/image9.jpg",
      alt: "Launch New Collections with Impact",
    },
    {
      src: "/gallery/image10.jpg",
      alt: "Join IEexpo 2025 Dubai",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % exhibitImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [exhibitImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % exhibitImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + exhibitImages.length) % exhibitImages.length
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-28 lg:py-32 px-4 bg-linear-to-b from-muted/30 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 animate-fade-in">
              About IGTF
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground animate-fade-in-delay-1 px-4">
              India's Premier B2B Trade Platform Connecting Local Excellence
              with Global Markets
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 bg-background">
          <div className="max-w-4xl mx-auto scroll-animate">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">
              Our Story
            </h2>
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                Indo-Global Trade Fair 2025 is more than just an exhibition –
                it's a transformative platform where Indian enterprise meets the
                world. Inspired by Hon'ble Prime Minister Shri Narendra Modi's
                vision of "Local to Global", we are committed to empowering
                Indian MSMEs and connecting them with international markets.
              </p>
              <p>
                The Indo Global Trade Fair (IGTF) & Sitarahub create a seamless
                path for Indian makers and suppliers to enter global markets. We
                bring together manufacturers, exporters, distributors, and key
                decision-makers from multiple industries, creating powerful
                opportunities to connect, collaborate, and expand business
                horizons.
              </p>
              <p>
                With strategic locations, curated foot traffic, and unparalleled
                opportunities for brand visibility, IGTF ensures exhibitors can
                showcase their offerings to a discerning audience ready to
                invest in business growth.
              </p>
            </div>
          </div>
        </section>

        {/* Why Sections */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16 lg:mb-20">
              <div className="space-y-4 sm:space-y-6 scroll-animate-left">
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl">
                  Why Exhibit?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Showcase your brand to a global audience of international
                  buyers and decision-makers.
                </p>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Network with international buyers from 40+ countries
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Boost your brand visibility with exclusive media coverage
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Connect with 6000+ trade buyers and industry leaders
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Access hosted buyer programs for qualified meetings
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Flexible stall pricing and sponsorship packages</span>
                  </li>
                </ul>
              </div>

              <div className="relative aspect-square rounded-lg overflow-hidden border-4 sm:border-8 border-white shadow-2xl scroll-animate-zoom group">
                {exhibitImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary rounded-full p-2 sm:p-3 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 shadow-lg z-10"
                  aria-label="Previous image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary rounded-full p-2 sm:p-3 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 shadow-lg z-10"
                  aria-label="Next image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>

                <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
                  {exhibitImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "bg-white w-6 sm:w-8"
                          : "bg-white/60"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <div className="relative aspect-square rounded-lg overflow-hidden border-4 sm:border-8 border-white shadow-2xl md:order-1 order-2 scroll-animate-zoom">
                <img
                  src="/global-trade-networking-business-meeting.jpg"
                  alt="Why Choose IGTF"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 sm:space-y-6 md:order-2 order-1 scroll-animate-right">
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl">
                  Why Choose IGTF?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  IGTF – Indo Global Trade Fair is a premier B2B platform
                  designed for serious business growth.
                </p>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Prime locations with exceptional visibility and footfall
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      16 dynamic sectors representing diverse industries
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Extensive B2B focus connecting manufacturers with buyers
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Strategic networking opportunities for business expansion
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              <div className="bg-muted/30 p-6 sm:p-8 rounded-lg scroll-animate">
                <h3 className="font-serif text-xl sm:text-2xl mb-3 sm:mb-4">
                  Our Mission
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  To empower Indian MSMEs by providing a world-class B2B
                  platform that facilitates meaningful connections with
                  international buyers, enabling businesses to expand their
                  global footprint and contribute to India's economic growth.
                </p>
              </div>
              <div className="bg-muted/30 p-6 sm:p-8 rounded-lg scroll-animate animation-delay-100">
                <h3 className="font-serif text-xl sm:text-2xl mb-3 sm:mb-4">
                  Our Vision
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  To establish IGTF as the leading trade platform in Asia,
                  recognized globally for connecting Indian excellence with
                  international markets, and driving the "Local to Global"
                  vision forward through sustainable business partnerships.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <ChatBot />
    </div>
  );
}

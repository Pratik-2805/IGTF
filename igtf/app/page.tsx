"use client";
import { ChatBot } from "@/components/chat-bot";
import { Navbar } from "@/components/navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      <div className="pt-20">
        {/* Hero Section with Video Background */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden animate-fade-in">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/background-video.mp4" type="video/mp4" />
          </video>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/75" />

          {/* Hero Content */}
          <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto animate-slide-up">
            <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 animate-fade-in-delay-1">
              Welcome To
            </p>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-10xl mb-8 text-balance animate-fade-in-delay-2">
              Indo Global Trade Fair
            </h1>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in-delay-3">
              <div className="h-px w-24 bg-white/50" />
              <p className="text-sm md:text-base tracking-widest uppercase">
                Save The Date
              </p>
              <div className="h-px w-24 bg-white/50" />
            </div>

            <h2 className="text-2xl md:text-4xl mb-8 font-light animate-fade-in-delay-4">
              16 Categories, 1 Platform, Inspiring Global Trade
            </h2>

            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-balance animate-fade-in-delay-5">
              December 2025 - Bombay Exhibitions Center
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-6">
              <a href="/visitors">
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-700 ease-out tracking-wider uppercase px-8 py-3 rounded-md hover:scale-105 transform text-lg font-medium">
                  Visitor Registration
                </button>
              </a>
              <a href="/exhibition">
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-700 ease-out tracking-wider uppercase px-8 py-3 rounded-md hover:scale-105 transform text-lg font-medium">
                  Exhibitor Registration
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Event Categories Ticker */}
        <section className="py-8 bg-primary text-primary-foreground overflow-hidden">
          <div className="whitespace-nowrap animate-scroll">
            <span className="inline-block px-8 text-lg">
              Hardware & Tools | Toys | Chemical | Electronics & Components |
              Auto Parts | Construction Material | Agriculture & Equipment's |
              Plastic & Packaging | Sports | Food & Beverage | Pharma | Surgical
              Devices | Gifting & Stationary | Furniture | Kitchen Wear | Spices
              | Footwear | Home Décor |
            </span>
          </div>
        </section>

        {/* PM Modi Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* PM Modi Image */}
              <div className="relative scroll-animate-zoom flex justify-center">
                {/*
          MODIFIED LINE:
          Changed 'md:w-2/3' to 'md:w-1/3' to make the image container
          half its previous width on medium (md) screens and larger.
        */}
                <div className="relative w-1/2 aspect-4/5 rounded-lg overflow-hidden border-8 border-white shadow-2xl">
                  <img
                    src="/pm-modi.webp"
                    alt="Hon'ble Prime Minister Shri Narendra Modi"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6 scroll-animate-right">
                <h3 className="font-serif text-3xl md:text-4xl">
                  Vision: Local to Global
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Inspired by Hon'ble Prime Minister Shri Narendra Modi's
                  visionary initiative
                </p>
                <blockquote className="border-l-4 border-primary pl-6 italic text-lg text-muted-foreground">
                  "Make in India, Make for the World - Let us transform local
                  craftsmanship into global excellence."
                </blockquote>
                <p className="text-muted-foreground leading-relaxed">
                  The Indo Global Trade Fair embodies this vision by creating a
                  powerful platform where Indian MSMEs can showcase their
                  capabilities to the world, fostering international
                  partnerships and driving economic growth through strategic
                  trade connections.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Quick Stats */}
        <section className="py-16 lg:py-24 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="scroll-animate">
                <div className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-primary mb-3">
                  400+
                </div>
                <p className="text-base sm:text-lg text-muted-foreground font-medium">
                  Exhibitors
                </p>
              </div>
              <div className="scroll-animate animation-delay-100">
                <div className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-primary mb-3">
                  6000+
                </div>
                <p className="text-base sm:text-lg text-muted-foreground font-medium">
                  Trade Buyers
                </p>
              </div>
              <div className="scroll-animate animation-delay-200">
                <div className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-primary mb-3">
                  40+
                </div>
                <p className="text-base sm:text-lg text-muted-foreground font-medium">
                  Countries
                </p>
              </div>
              <div className="scroll-animate animation-delay-300">
                <div className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-primary mb-3">
                  16
                </div>
                <p className="text-base sm:text-lg text-muted-foreground font-medium">
                  Sectors
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 px-4 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-6 text-balance px-4 font-bold">
              Ready to Expand Your Business Globally?
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 opacity-90 px-4 font-light leading-relaxed">
              Join India's premier B2B trade platform connecting manufacturers
              with international buyers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <a href="/exhibition" className="w-full sm:w-auto">
                <button className="w-full bg-white text-primary hover:bg-white/90 transition-all duration-500 ease-out px-8 py-3.5 rounded-md text-base sm:text-lg font-semibold tracking-wide shadow-lg hover:scale-105">
                  Become an Exhibitor
                </button>
              </a>
              <a href="/about" className="w-full sm:w-auto">
                <button className="w-full bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-500 ease-out px-8 py-3.5 rounded-md text-base sm:text-lg font-semibold tracking-wide hover:scale-105">
                  Learn More
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 bg-foreground text-background">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="font-serif text-xl sm:text-2xl mb-4 font-bold">
                  Indo Global Trade Fair
                </h4>
                <p className="text-sm text-background/80 leading-relaxed">
                  Connecting Indian Enterprise with the World through strategic
                  B2B trade platforms.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm sm:text-base text-background/80">
                  <li>
                    <a
                      href="/about"
                      className="hover:text-background transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/exhibition"
                      className="hover:text-background transition-colors"
                    >
                      Exhibition
                    </a>
                  </li>
                  <li>
                    <a
                      href="/categories"
                      className="hover:text-background transition-colors"
                    >
                      Categories
                    </a>
                  </li>
                  <li>
                    <a
                      href="/gallery"
                      className="hover:text-background transition-colors"
                    >
                      Gallery
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-4">Contact</h4>
                <ul className="space-y-2 text-sm sm:text-base text-background/80">
                  <li>Email: info@indoglobaltradefair.com</li>
                  <li>Phone: +91 XXX XXX XXXX</li>
                  <li>
                    <a
                      href="/career"
                      className="hover:text-background transition-colors"
                    >
                      Career Opportunities
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-center pt-8 border-t border-background/20 text-background/70 text-sm">
              <p>© 2025 Indo Global Trade Fair. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <ChatBot />
    </div>
  );
}

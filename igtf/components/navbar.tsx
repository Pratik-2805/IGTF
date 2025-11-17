"use client";

import type React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef } from "react";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [pressProgress, setPressProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const handleLogoMouseDown = () => {
    const startTime = Date.now();

    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / 3000) * 100, 100);
      setPressProgress(progress);
    }, 50);

    const timer = setTimeout(() => {
      router.push("/admin/login");
      setPressProgress(0);
      if (progressInterval.current) clearInterval(progressInterval.current);
    }, 3000);

    setPressTimer(timer);
  };

  const handleLogoMouseUp = () => {
    const wasShortPress = pressProgress < 100;

    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }

    setPressProgress(0);

    if (wasShortPress && pressProgress > 0) {
      router.push("/");
    }
  };

  const handleLogoClick = () => {
    if (pressProgress === 0) {
      router.push("/");
    }
  };

  const handleLogoTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleLogoMouseDown();
  };

  const handleLogoTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleLogoMouseUp();
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/exhibition", label: "Exhibition" },
    { href: "/categories", label: "Categories" },
    { href: "/visitors", label: "Visitors" },
    { href: "/gallery", label: "Gallery" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-70 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="relative">
            <button
              className="relative focus:outline-none cursor-pointer"
              onMouseDown={handleLogoMouseDown}
              onMouseUp={handleLogoMouseUp}
              onMouseLeave={handleLogoMouseUp}
              onClick={handleLogoClick}
              onTouchStart={handleLogoTouchStart}
              onTouchEnd={handleLogoTouchEnd}
              onTouchCancel={handleLogoMouseUp}
              aria-label="IGTF Logo - Press and hold for 3 seconds to access admin"
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Indo-Global-Trade-Fair-Logo--eqw9QSs9yPlSNoi4uIQ58jPR2grztu.webp"
                alt="IGTF Logo"
                className="h-14 w-auto select-none pointer-events-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />

              {/* Progress bar */}
              {pressProgress > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-100"
                    style={{ width: `${pressProgress}%` }}
                  />
                </div>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors duration-500 ${
                  pathname === link.href
                    ? "text-primary font-medium"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a href="/exhibition">
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-all duration-500 font-medium">
                Register Now
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-500 ${
                    pathname === link.href
                      ? "text-primary font-medium"
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="/exhibition" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-all duration-500 font-medium">
                  Register Now
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

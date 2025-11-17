import type React from "react";
import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ScrollAnimation } from "@/lib/scroll-animation";
// @ts-ignore: side-effect import of global CSS (Next.js app directory)
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title:
    "Indo Global Trade Fair 2025 - Where Indian Enterprise Meets the World",
  description:
    "Join the premier B2B platform connecting India's MSMEs with global markets. 16 sectors, 400+ exhibitors, 6000+ buyers from 40+ countries.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden max-w-screen`}
      >
        {children}
        <ScrollAnimation />
        <Analytics />
      </body>
    </html>
  );
}

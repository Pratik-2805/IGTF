export interface Registration {
  id: number;
  companyName: string;
  contactPerson: string;
  designation: string;
  email: string;
  contactNumber: string;
  product: string;
  address: string;
  companyLogo?: string;
  status: "pending" | "contacted" | "paid" | "rejected";
  createdAt: string;
}

export interface Event {
  id: number;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  time: string;
  exhibitors: number;
  buyers: number;
  countries: number;
  sectors: number;
  description: string;
  isPast: boolean;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export interface GalleryImage {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  type: "carousel" | "banner" | "gallery" | "exhibitor";
  displayOrder?: number;
}

export interface SiteSettings {
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroVideoUrl: string;
  heroCtaText: string;

  // About Section
  aboutTitle: string;
  aboutDescription: string;
  aboutImage: string;

  // Contact Information
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;

  // Footer
  footerTagline: string;
  socialMediaLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };

  // SEO
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

// Sample data - In production, this would come from your database
export const sampleRegistrations: Registration[] = [
  {
    id: 1,
    companyName: "Tech Solutions India Pvt Ltd",
    contactPerson: "Rajesh Kumar",
    designation: "Marketing Director",
    email: "rajesh@techsolutions.com",
    contactNumber: "+91 98765 43210",
    product: "Electronics & Components",
    address: "123 Tech Park, Bangalore, Karnataka 560001",
    companyLogo: "/placeholder.svg?height=100&width=100&text=Tech+Solutions",
    status: "paid",
    createdAt: "2024-12-10",
  },
  {
    id: 2,
    companyName: "Global Exports Co",
    contactPerson: "Priya Sharma",
    designation: "CEO",
    email: "priya@globalexports.com",
    contactNumber: "+91 87654 32109",
    product: "Toys",
    address: "456 Export House, Mumbai, Maharashtra 400001",
    companyLogo: "/placeholder.svg?height=100&width=100&text=Global+Exports",
    status: "contacted",
    createdAt: "2024-12-11",
  },
  {
    id: 3,
    companyName: "Innovative Hardware Ltd",
    contactPerson: "Amit Patel",
    designation: "Sales Manager",
    email: "amit@innovative.com",
    contactNumber: "+91 76543 21098",
    product: "Hardware & Tools",
    address: "789 Industrial Area, Ahmedabad, Gujarat 380001",
    status: "rejected",
    createdAt: "2024-12-09",
  },
  {
    id: 4,
    companyName: "Prime Construction Materials",
    contactPerson: "Suresh Reddy",
    designation: "Business Development Head",
    email: "suresh@primeconstruction.com",
    contactNumber: "+91 65432 10987",
    product: "Construction Material",
    address: "321 Builder's Plaza, Hyderabad, Telangana 500001",
    companyLogo:
      "/placeholder.svg?height=100&width=100&text=Prime+Construction",
    status: "pending",
    createdAt: "2024-12-12",
  },
  {
    id: 5,
    companyName: "Excel Toys Manufacturing",
    contactPerson: "Kavita Desai",
    designation: "Owner",
    email: "kavita@exceltoys.com",
    contactNumber: "+91 98765 11111",
    product: "Toys",
    address: "789 Toy Street, Delhi 110001",
    companyLogo: "/placeholder.svg?height=100&width=100&text=Excel+Toys",
    status: "paid",
    createdAt: "2024-12-13",
  },
];

export const sampleEvents: Event[] = [
  {
    id: 1,
    title: "IGTF Mumbai 2025",
    location: "Bombay Exhibitions Center, Mumbai, India",
    startDate: "2025-12-12",
    endDate: "2025-12-14",
    time: "10:00 AM - 7:00 PM",
    exhibitors: 400,
    buyers: 6000,
    countries: 40,
    sectors: 16,
    description: "The premier B2B trade fair in Mumbai",
    isPast: false,
  },
  {
    id: 2,
    title: "IGTF Dubai 2025",
    location: "Dubai Exhibition Center, Dubai, UAE",
    startDate: "2025-02-15",
    endDate: "2025-02-17",
    time: "10:00 AM - 7:00 PM",
    exhibitors: 400,
    buyers: 6000,
    countries: 40,
    sectors: 16,
    description: "International trade fair connecting Middle East and India",
    isPast: false,
  },
];

export const sampleCategories: Category[] = [
  {
    id: 1,
    name: "Hardware & Tools",
    description:
      "Industrial and commercial hardware, power tools, hand tools, and equipment",
    icon: "🔧",
  },
  {
    id: 2,
    name: "Toys",
    description:
      "Educational toys, electronic toys, games, and entertainment products",
    icon: "🧸",
  },
  {
    id: 3,
    name: "Chemical",
    description:
      "Industrial chemicals, specialty chemicals, and chemical products",
    icon: "⚗️",
  },
  {
    id: 4,
    name: "Electronics & Components",
    description:
      "Electronic components, consumer electronics, and digital devices",
    icon: "💻",
  },
  {
    id: 5,
    name: "Auto Parts",
    description: "Automotive parts, accessories, and vehicle components",
    icon: "🚗",
  },
  {
    id: 6,
    name: "Construction Material",
    description:
      "Building materials, construction equipment, and architectural products",
    icon: "🏗️",
  },
  {
    id: 7,
    name: "Agriculture & Equipment's",
    description: "Agricultural machinery, farming equipment, and agri-products",
    icon: "🌾",
  },
  {
    id: 8,
    name: "Plastic & Packaging",
    description:
      "Plastic products, packaging materials, and container solutions",
    icon: "📦",
  },
  {
    id: 9,
    name: "Sports",
    description: "Sports equipment, fitness gear, and athletic accessories",
    icon: "⚽",
  },
  {
    id: 10,
    name: "Food & Beverage",
    description: "Food products, beverages, and culinary equipment",
    icon: "🍽️",
  },
  {
    id: 11,
    name: "Pharma",
    description: "Pharmaceutical products, medicines, and healthcare solutions",
    icon: "💊",
  },
  {
    id: 12,
    name: "Surgical Devices",
    description:
      "Medical devices, surgical instruments, and healthcare equipment",
    icon: "🏥",
  },
  {
    id: 13,
    name: "Gifting & Stationary",
    description: "Gift items, stationery products, and office supplies",
    icon: "🎁",
  },
  {
    id: 14,
    name: "Furniture",
    description: "Home and office furniture, decor, and furnishing solutions",
    icon: "🪑",
  },
  {
    id: 15,
    name: "Kitchen Wear",
    description: "Kitchenware, cooking utensils, and culinary accessories",
    icon: "🍳",
  },
  {
    id: 16,
    name: "Spices",
    description: "Spices, herbs, and food ingredients",
    icon: "🌶️",
  },
];

export const sampleGallery: GalleryImage[] = [
  {
    id: 1,
    title: "Exhibition Hall 2024",
    imageUrl: "/exhibition-hall.png",
    description: "Main exhibition hall with exhibitors",
    type: "gallery",
    displayOrder: 1,
  },
  {
    id: 2,
    title: "Hero Banner - Mumbai Event",
    imageUrl: "/placeholder.svg?height=1080&width=1920&text=Mumbai+Event+2025",
    description: "Main hero banner for Mumbai exhibition",
    type: "banner",
    displayOrder: 1,
  },
  {
    id: 3,
    title: "Carousel Image 1",
    imageUrl: "/placeholder.svg?height=800&width=1200&text=Carousel+1",
    description: "First carousel image",
    type: "carousel",
    displayOrder: 1,
  },
];

export const defaultSiteSettings: SiteSettings = {
  heroTitle: "INDO GLOBAL TRADE FAIR 2025",
  heroSubtitle: "Connecting Indian Enterprise with Global Markets",
  heroVideoUrl: "/background-video.mp4",
  heroCtaText: "Register Now",
  aboutTitle: "About Indo Global Trade Fair",
  aboutDescription:
    "India's premier B2B trade platform connecting local excellence with global markets. Inspired by PM Modi's vision of Local to Global.",
  aboutImage: "/about-hero.jpg",
  contactEmail: "info@indoglobaltradefair.com",
  contactPhone: "+91 77381 04011",
  contactAddress: "Mumbai & Dubai",
  footerTagline:
    "Connecting Indian Enterprise with the World through strategic B2B trade platforms.",
  socialMediaLinks: {
    facebook: "https://facebook.com/igtf",
    twitter: "https://twitter.com/igtf",
    linkedin: "https://linkedin.com/company/igtf",
    instagram: "https://instagram.com/igtf",
  },
  metaTitle: "Indo Global Trade Fair 2025 | B2B Trade Platform",
  metaDescription:
    "Join India's premier B2B trade fair connecting manufacturers with global buyers across 16 sectors.",
  keywords: ["trade fair", "B2B exhibition", "India exports", "global trade"],
};

// Helper functions to get data
export function getRegistrations(): Registration[] {
  // In production, fetch from your database
  return sampleRegistrations;
}

export function getPaidExhibitors(): Registration[] {
  return sampleRegistrations.filter((r) => r.status === "paid");
}

export function getEvents(): Event[] {
  return sampleEvents;
}

export function getUpcomingEvents(): Event[] {
  return sampleEvents.filter((e) => !e.isPast);
}

export function getPastEvents(): Event[] {
  return sampleEvents.filter((e) => e.isPast);
}

export function getCategories(): Category[] {
  return sampleCategories;
}

export function getGalleryImages(type?: GalleryImage["type"]): GalleryImage[] {
  if (type) {
    return sampleGallery.filter((img) => img.type === type);
  }
  return sampleGallery;
}

export function getSiteSettings(): SiteSettings {
  return defaultSiteSettings;
}

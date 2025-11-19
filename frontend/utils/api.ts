// --- Configuration ---
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const URLS = {
  EXHIBITORS: `${BASE_URL}/exhibitor-registrations/`,
  VISITORS: `${BASE_URL}/visitor-registrations/`,
  EVENTS: `${BASE_URL}/events/`,
  CATEGORIES: `${BASE_URL}/categories/`,
  GALLERY: `${BASE_URL}/gallery/`,
};

// --- Helper ---
export const getAuthHeaders = (): Record<string, string> => {
  const accessToken = localStorage.getItem("accessToken");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return headers;
};

// --- Interfaces ---
export interface ExhibitorRegistration {
  id: number;
  company_name: string;
  contact_person_name: string;
  designation: string;
  email_address: string;
  contact_number: string;
  product_service: string;
  company_address: string;
  status: "pending" | "contacted" | "paid" | "rejected";
  created_at: string;
}

export interface VisitorRegistration {
  id: number;
  first_name: string;
  last_name: string;
  company_name: string;
  email_address: string;
  phone_number: string;
  industry_interest: string;
  created_at: string;
  status?: "contacted" | "paid" | "pending" | "rejected"; // optional
}

export interface Event {
  id: number;
  title: string;
  location: string;
  start_date: string;
  end_date: string;
  time: string;
  exhibitors: number;
  buyers: number;
  countries: number;
  sectors: number;
  description: string;
  is_past: boolean;
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
  image_url: string;
  description: string;
}

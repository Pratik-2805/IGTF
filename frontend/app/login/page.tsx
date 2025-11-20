"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_URL = `${BASE_URL}/token/`; // FIXED: correct endpoint

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save tokens
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("isAdminLoggedIn", "true");

        // Decode role from access token
        const decoded: any = jwtDecode(data.access);
        const role = decoded.role;

        if (!role) {
          setError("Role missing in access token");
          return;
        }

        // Save role (optional)
        localStorage.setItem("userRole", role);

        // Redirect based on role
        if (role === "admin") {
          router.push("/admin");
        } else if (role === "manager") {
          router.push("/manager");
        } else if (role === "sales") {
          router.push("/sales");
        } else {
          setError("Invalid role");
        }

      } else {
        if (res.status === 401) {
          setError("Invalid username or password");
        } else if (data.detail) {
          setError(data.detail);
        } else {
          setError("Login failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Check if the server is running.");
    } finally {
      setIsLoading(false);
    }
  };


    // Auto-fill for testing
    const useTestCredentials = () => {
      setUsername("admin");
      setPassword("admin123");
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-8">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Indo-Global-Trade-Fair-Logo--eqw9QSs9yPlSNoi4uIQ58jPR2grztu.webp"
              alt="Logo"
              className="h-16 w-auto mx-auto mb-6"
            />
            <h1 className="font-serif text-3xl mb-2">Admin Login</h1>
            <p className="text-muted-foreground">Sign in to continue</p>
          </div>

          {/* Card */}
          <div className="bg-muted/30 p-8 rounded-lg shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error */}
              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Username */}
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-background border border-border
                           focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Enter username"
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-background border border-border
                           focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Enter password"
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-md
                         hover:bg-primary/90 transition-all duration-500 font-medium
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  "Login"
                )}
              </button>

              {/* Dev credentials button */}
              {process.env.NODE_ENV === "development" && (
                <button
                  type="button"
                  onClick={useTestCredentials}
                  className="w-full bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 
                           transition-all duration-500 font-medium text-sm"
                >
                  Use Test Credentials
                </button>
              )}
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => router.push("/")}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground mt-6">
            <p>Use your Django Admin credentials</p>
          </div>
        </div>
      </div>
    );
  }

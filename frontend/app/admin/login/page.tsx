// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const API_URL = "http://127.0.0.1:8000/api/token/"; // Django JWT login endpoint

// export default function AdminLoginPage() {
//   const router = useRouter();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await fetch('http://localhost:8000/api/token/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem('accessToken', data.access);
//         localStorage.setItem('refreshToken', data.refresh);
//         router.push('/admin/dashboard');
//       } else {
//         setError('Invalid credentials');
//       }
//     } catch (err) {
//       setError('Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background px-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <img
//             src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Indo-Global-Trade-Fair-Logo--eqw9QSs9yPlSNoi4uIQ58jPR2grztu.webp"
//             alt="IGTF Logo"
//             className="h-16 w-auto mx-auto mb-6"
//           />
//           <h1 className="font-serif text-3xl mb-2">Admin Portal</h1>
//           <p className="text-muted-foreground">Sign in to access the admin dashboard</p>
//         </div>

//         <div className="bg-muted/30 p-8 rounded-lg shadow-xl">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && (
//               <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md text-sm">
//                 {error}
//               </div>
//             )}

//             <div>
//               <label htmlFor="username" className="block text-sm font-medium mb-2">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//                 className="w-full px-4 py-3 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-500 outline-none"
//                 placeholder="Enter username"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full px-4 py-3 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-500 outline-none"
//                 placeholder="Enter password"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-all duration-500 font-medium"
//             >
//               Sign In
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <button
//               onClick={() => router.push("/")}
//               className="text-sm text-muted-foreground hover:text-primary transition-colors duration-500"
//             >
//               Back to Homepage
//             </button>
//           </div>
//         </div>

//         <div className="text-center text-xs text-muted-foreground mt-6 space-y-1">
//           <p>Use your Django Admin credentials</p>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "http://127.0.0.1:8000/api/token/";

export default function AdminLoginPage() {
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
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        // Store tokens in localStorage
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        localStorage.setItem('isAdminLoggedIn', 'true');
        
        // Redirect to admin dashboard
        router.push('/admin/dashboard');
      } else {
        // Handle different error cases
        if (res.status === 401) {
          setError('Invalid username or password');
        } else if (data.detail) {
          setError(data.detail);
        } else {
          setError('Login failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please check if the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  // Test credentials button for development
  const useTestCredentials = () => {
    setUsername('admin');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Indo-Global-Trade-Fair-Logo--eqw9QSs9yPlSNoi4uIQ58jPR2grztu.webp"
            alt="IGTF Logo"
            className="h-16 w-auto mx-auto mb-6"
          />
          <h1 className="font-serif text-3xl mb-2">Admin Portal</h1>
          <p className="text-muted-foreground">Sign in to access the admin dashboard</p>
        </div>

        <div className="bg-muted/30 p-8 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-500 outline-none"
                placeholder="Enter username"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-500 outline-none"
                placeholder="Enter password"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-all duration-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Development helper - remove in production */}
            {process.env.NODE_ENV === 'development' && (
              <button
                type="button"
                onClick={useTestCredentials}
                className="w-full bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-all duration-500 font-medium text-sm"
              >
                Use Test Credentials
              </button>
            )}
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-500"
            >
              Back to Homepage
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground mt-6 space-y-1">
          <p>Use your Django Admin credentials</p>
          {process.env.NODE_ENV === 'development' && (
            <p className="text-yellow-600">
              Development: Make sure to create a superuser first
            </p>
          )}
        </div>

        {/* Debug info for development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-md">
            <h3 className="font-medium text-blue-800 mb-2">Debug Info:</h3>
            <p className="text-xs text-blue-700">
              API URL: {API_URL}
            </p>
            <p className="text-xs text-blue-700">
              To create admin user, run: python manage.py createsuperuser
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
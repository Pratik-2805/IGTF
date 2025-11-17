// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Search, LogOut, Filter, Plus, Edit, Trash2, X, Calendar, MapPin } from "lucide-react"

// interface Registration {
//   id: number
//   companyName: string
//   contactPerson: string
//   designation: string
//   email: string
//   contactNumber: string
//   product: string
//   address: string
//   status: "pending" | "contacted" | "paid" | "rejected"
//   createdAt: string
// }

// interface Event {
//   id: number
//   title: string
//   location: string
//   startDate: string
//   endDate: string
//   time: string
//   exhibitors: number
//   buyers: number
//   countries: number
//   sectors: number
//   description: string
//   isPast: boolean
// }

// interface Category {
//   id: number
//   name: string
//   description: string
//   icon: string
// }

// interface GalleryImage {
//   id: number
//   title: string
//   imageUrl: string
//   description: string
// }

// export default function AdminDashboard() {
//   const router = useRouter()
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [filterStatus, setFilterStatus] = useState<string>("all")
//   const [activeTab, setActiveTab] = useState<"registrations" | "events" | "categories" | "gallery">("registrations")
//   const [showModal, setShowModal] = useState(false)
//   const [editingItem, setEditingItem] = useState<any>(null)

//   // Sample data - replace with your actual database
//   const [registrations, setRegistrations] = useState<Registration[]>([
//     {
//       id: 1,
//       companyName: "Tech Solutions India Pvt Ltd",
//       contactPerson: "Rajesh Kumar",
//       designation: "Marketing Director",
//       email: "rajesh@techsolutions.com",
//       contactNumber: "+91 98765 43210",
//       product: "Electronics & Components",
//       address: "123 Tech Park, Bangalore, Karnataka 560001",
//       status: "paid",
//       createdAt: "2024-12-10",
//     },
//     {
//       id: 2,
//       companyName: "Global Exports Co",
//       contactPerson: "Priya Sharma",
//       designation: "CEO",
//       email: "priya@globalexports.com",
//       contactNumber: "+91 87654 32109",
//       product: "Toys",
//       address: "456 Export House, Mumbai, Maharashtra 400001",
//       status: "contacted",
//       createdAt: "2024-12-11",
//     },
//     {
//       id: 3,
//       companyName: "Innovative Hardware Ltd",
//       contactPerson: "Amit Patel",
//       designation: "Sales Manager",
//       email: "amit@innovative.com",
//       contactNumber: "+91 76543 21098",
//       product: "Hardware & Tools",
//       address: "789 Industrial Area, Ahmedabad, Gujarat 380001",
//       status: "rejected",
//       createdAt: "2024-12-09",
//     },
//     {
//       id: 4,
//       companyName: "Prime Construction Materials",
//       contactPerson: "Suresh Reddy",
//       designation: "Business Development Head",
//       email: "suresh@primeconstruction.com",
//       contactNumber: "+91 65432 10987",
//       product: "Construction Material",
//       address: "321 Builder's Plaza, Hyderabad, Telangana 500001",
//       status: "pending",
//       createdAt: "2024-12-12",
//     },
//   ])

//   const [events, setEvents] = useState<Event[]>([
//     {
//       id: 1,
//       title: "IGTF Mumbai 2025",
//       location: "Bombay Exhibitions Center, Mumbai, India",
//       startDate: "2025-12-12",
//       endDate: "2025-12-14",
//       time: "10:00 AM - 7:00 PM",
//       exhibitors: 400,
//       buyers: 6000,
//       countries: 40,
//       sectors: 16,
//       description: "The premier B2B trade fair in Mumbai",
//       isPast: false,
//     },
//     {
//       id: 2,
//       title: "IGTF Dubai 2025",
//       location: "Dubai Exhibition Center, Dubai, UAE",
//       startDate: "2025-02-15",
//       endDate: "2025-02-17",
//       time: "10:00 AM - 7:00 PM",
//       exhibitors: 400,
//       buyers: 6000,
//       countries: 40,
//       sectors: 16,
//       description: "International trade fair connecting Middle East and India",
//       isPast: false,
//     },
//   ])

//   const [categories, setCategories] = useState<Category[]>([
//     { id: 1, name: "Hardware & Tools", description: "Industrial and commercial hardware", icon: "🔧" },
//     { id: 2, name: "Toys", description: "Educational and entertainment toys", icon: "🧸" },
//     { id: 3, name: "Electronics & Components", description: "Electronic devices and components", icon: "💻" },
//   ])

//   const [gallery, setGallery] = useState<GalleryImage[]>([
//     {
//       id: 1,
//       title: "Exhibition Hall 2024",
//       imageUrl: "/exhibition-hall.png",
//       description: "Main exhibition hall with exhibitors",
//     },
//   ])

//   useEffect(() => {
//     // Check authentication
//     const isLoggedIn = localStorage.getItem("isAdminLoggedIn")
//     if (isLoggedIn === "true") {
//       setIsAuthenticated(true)
//     } else {
//       router.push("/admin/login")
//     }
//   }, [router])

//   const handleLogout = () => {
//     localStorage.removeItem("isAdminLoggedIn")
//     router.push("/")
//   }

//   const handleStatusChange = (id: number, newStatus: Registration["status"]) => {
//     setRegistrations((prev) => prev.map((reg) => (reg.id === id ? { ...reg, status: newStatus } : reg)))
//   }

//   const handleAddEvent = (formData: any) => {
//     const newEvent: Event = {
//       id: events.length + 1,
//       ...formData,
//       exhibitors: Number.parseInt(formData.exhibitors),
//       buyers: Number.parseInt(formData.buyers),
//       countries: Number.parseInt(formData.countries),
//       sectors: Number.parseInt(formData.sectors),
//     }
//     setEvents([...events, newEvent])
//     setShowModal(false)
//   }

//   const handleEditEvent = (formData: any) => {
//     setEvents(
//       events.map((event) =>
//         event.id === editingItem.id
//           ? {
//               ...formData,
//               id: event.id,
//               exhibitors: Number.parseInt(formData.exhibitors),
//               buyers: Number.parseInt(formData.buyers),
//               countries: Number.parseInt(formData.countries),
//               sectors: Number.parseInt(formData.sectors),
//             }
//           : event,
//       ),
//     )
//     setShowModal(false)
//     setEditingItem(null)
//   }

//   const handleDeleteEvent = (id: number) => {
//     if (confirm("Are you sure you want to delete this event?")) {
//       setEvents(events.filter((event) => event.id !== id))
//     }
//   }

//   const handleAddCategory = (formData: any) => {
//     const newCategory: Category = {
//       id: categories.length + 1,
//       ...formData,
//     }
//     setCategories([...categories, newCategory])
//     setShowModal(false)
//   }

//   const handleEditCategory = (formData: any) => {
//     setCategories(categories.map((cat) => (cat.id === editingItem.id ? { ...formData, id: cat.id } : cat)))
//     setShowModal(false)
//     setEditingItem(null)
//   }

//   const handleDeleteCategory = (id: number) => {
//     if (confirm("Are you sure you want to delete this category?")) {
//       setCategories(categories.filter((cat) => cat.id !== id))
//     }
//   }

//   const handleAddGalleryImage = (formData: any) => {
//     const newImage: GalleryImage = {
//       id: gallery.length + 1,
//       ...formData,
//     }
//     setGallery([...gallery, newImage])
//     setShowModal(false)
//   }

//   const handleEditGalleryImage = (formData: any) => {
//     setGallery(gallery.map((img) => (img.id === editingItem.id ? { ...formData, id: img.id } : img)))
//     setShowModal(false)
//     setEditingItem(null)
//   }

//   const handleDeleteGalleryImage = (id: number) => {
//     if (confirm("Are you sure you want to delete this image?")) {
//       setGallery(gallery.filter((img) => img.id !== id))
//     }
//   }

//   const getStatusColor = (status: Registration["status"]) => {
//     switch (status) {
//       case "paid":
//         return "bg-green-500/10 border-green-500 text-green-700"
//       case "contacted":
//         return "bg-blue-500/10 border-blue-500 text-blue-700"
//       case "rejected":
//         return "bg-red-500/10 border-red-500 text-red-700"
//       case "pending":
//         return "bg-yellow-500/10 border-yellow-500 text-yellow-700"
//       default:
//         return "bg-muted border-border"
//     }
//   }

//   const getStatusBadgeColor = (status: Registration["status"]) => {
//     switch (status) {
//       case "paid":
//         return "bg-green-500 text-white"
//       case "contacted":
//         return "bg-blue-500 text-white"
//       case "rejected":
//         return "bg-red-500 text-white"
//       case "pending":
//         return "bg-yellow-500 text-white"
//       default:
//         return "bg-muted text-foreground"
//     }
//   }

//   const filteredRegistrations = registrations.filter((reg) => {
//     const matchesSearch =
//       reg.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       reg.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       reg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       reg.product.toLowerCase().includes(searchQuery.toLowerCase())

//     const matchesFilter = filterStatus === "all" || reg.status === filterStatus

//     return matchesSearch && matchesFilter
//   })

//   const stats = {
//     total: registrations.length,
//     paid: registrations.filter((r) => r.status === "paid").length,
//     contacted: registrations.filter((r) => r.status === "contacted").length,
//     pending: registrations.filter((r) => r.status === "pending").length,
//     rejected: registrations.filter((r) => r.status === "rejected").length,
//   }

//   if (!isAuthenticated) {
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <img
//                 src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Indo-Global-Trade-Fair-Logo--eqw9QSs9yPlSNoi4uIQ58jPR2grztu.webp"
//                 alt="IGTF Logo"
//                 className="h-12 w-auto"
//               />
//               <div>
//                 <h1 className="font-serif text-2xl">Admin Dashboard</h1>
//                 <p className="text-sm opacity-90">Indo Global Trade Fair Management</p>
//               </div>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 bg-primary-foreground text-primary px-4 py-2 rounded-md hover:opacity-90 transition-all duration-500 font-medium"
//             >
//               <LogOut className="w-4 h-4" />
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="border-t border-primary-foreground/20">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex gap-1">
//               <button
//                 onClick={() => setActiveTab("registrations")}
//                 className={`px-6 py-3 font-medium transition-colors ${
//                   activeTab === "registrations"
//                     ? "bg-primary-foreground text-primary border-b-2 border-primary"
//                     : "text-primary-foreground/70 hover:text-primary-foreground"
//                 }`}
//               >
//                 Registrations
//               </button>
//               <button
//                 onClick={() => setActiveTab("events")}
//                 className={`px-6 py-3 font-medium transition-colors ${
//                   activeTab === "events"
//                     ? "bg-primary-foreground text-primary border-b-2 border-primary"
//                     : "text-primary-foreground/70 hover:text-primary-foreground"
//                 }`}
//               >
//                 Events
//               </button>
//               <button
//                 onClick={() => setActiveTab("categories")}
//                 className={`px-6 py-3 font-medium transition-colors ${
//                   activeTab === "categories"
//                     ? "bg-primary-foreground text-primary border-b-2 border-primary"
//                     : "text-primary-foreground/70 hover:text-primary-foreground"
//                 }`}
//               >
//                 Categories
//               </button>
//               <button
//                 onClick={() => setActiveTab("gallery")}
//                 className={`px-6 py-3 font-medium transition-colors ${
//                   activeTab === "gallery"
//                     ? "bg-primary-foreground text-primary border-b-2 border-primary"
//                     : "text-primary-foreground/70 hover:text-primary-foreground"
//                 }`}
//               >
//                 Gallery
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Registrations Tab */}
//         {activeTab === "registrations" && (
//           <>
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
//               <div className="bg-muted/30 p-6 rounded-lg">
//                 <p className="text-sm text-muted-foreground mb-1">Total Registrations</p>
//                 <p className="text-3xl font-bold">{stats.total}</p>
//               </div>
//               <div className="bg-green-500/10 border border-green-500 p-6 rounded-lg">
//                 <p className="text-sm text-green-700 mb-1">Paid</p>
//                 <p className="text-3xl font-bold text-green-700">{stats.paid}</p>
//               </div>
//               <div className="bg-blue-500/10 border border-blue-500 p-6 rounded-lg">
//                 <p className="text-sm text-blue-700 mb-1">Contacted</p>
//                 <p className="text-3xl font-bold text-blue-700">{stats.contacted}</p>
//               </div>
//               <div className="bg-yellow-500/10 border border-yellow-500 p-6 rounded-lg">
//                 <p className="text-sm text-yellow-700 mb-1">Pending</p>
//                 <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
//               </div>
//               <div className="bg-red-500/10 border border-red-500 p-6 rounded-lg">
//                 <p className="text-sm text-red-700 mb-1">Rejected</p>
//                 <p className="text-3xl font-bold text-red-700">{stats.rejected}</p>
//               </div>
//             </div>

//             {/* Search and Filter */}
//             <div className="bg-muted/30 p-6 rounded-lg mb-8">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="flex-1 relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                   <input
//                     type="text"
//                     placeholder="Search by company, contact person, email, or product..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-500 outline-none"
//                   />
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Filter className="w-5 h-5 text-muted-foreground" />
//                   <select
//                     value={filterStatus}
//                     onChange={(e) => setFilterStatus(e.target.value)}
//                     className="px-4 py-3 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-500 outline-none"
//                   >
//                     <option value="all">All Status</option>
//                     <option value="paid">Paid</option>
//                     <option value="contacted">Contacted</option>
//                     <option value="pending">Pending</option>
//                     <option value="rejected">Rejected</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Registrations List */}
//             <div className="space-y-4">
//               <h2 className="font-serif text-2xl mb-4">Exhibitor Registrations ({filteredRegistrations.length})</h2>

//               {filteredRegistrations.map((registration) => (
//                 <div
//                   key={registration.id}
//                   className={`border-2 rounded-lg p-6 transition-all duration-500 hover:shadow-lg ${getStatusColor(
//                     registration.status,
//                   )}`}
//                 >
//                   <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
//                     {/* Registration Details */}
//                     <div className="flex-1 space-y-4">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <h3 className="font-serif text-xl mb-1">{registration.companyName}</h3>
//                           <p className="text-sm text-muted-foreground">
//                             Registered on {new Date(registration.createdAt).toLocaleDateString()}
//                           </p>
//                         </div>
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(registration.status)}`}
//                         >
//                           {registration.status.toUpperCase()}
//                         </span>
//                       </div>

//                       <div className="grid md:grid-cols-2 gap-4">
//                         <div>
//                           <p className="text-sm text-muted-foreground mb-1">Contact Person</p>
//                           <p className="font-medium">{registration.contactPerson}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-muted-foreground mb-1">Designation</p>
//                           <p className="font-medium">{registration.designation}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-muted-foreground mb-1">Email</p>
//                           <p className="font-medium">{registration.email}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-muted-foreground mb-1">Contact Number</p>
//                           <p className="font-medium">{registration.contactNumber}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-muted-foreground mb-1">Product/Service</p>
//                           <p className="font-medium">{registration.product}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-muted-foreground mb-1">Address</p>
//                           <p className="font-medium">{registration.address}</p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Status Actions */}
//                     <div className="lg:w-48">
//                       <p className="text-sm font-medium mb-3">Update Status</p>
//                       <div className="space-y-2">
//                         <button
//                           onClick={() => handleStatusChange(registration.id, "pending")}
//                           className="w-full bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-all duration-500 text-sm font-medium"
//                         >
//                           Mark Pending
//                         </button>
//                         <button
//                           onClick={() => handleStatusChange(registration.id, "contacted")}
//                           className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-500 text-sm font-medium"
//                         >
//                           Mark Contacted
//                         </button>
//                         <button
//                           onClick={() => handleStatusChange(registration.id, "paid")}
//                           className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-500 text-sm font-medium"
//                         >
//                           Mark Paid
//                         </button>
//                         <button
//                           onClick={() => handleStatusChange(registration.id, "rejected")}
//                           className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-500 text-sm font-medium"
//                         >
//                           Mark Rejected
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               {filteredRegistrations.length === 0 && (
//                 <div className="text-center py-12 text-muted-foreground">
//                   <p>No registrations found matching your criteria.</p>
//                 </div>
//               )}
//             </div>
//           </>
//         )}

//         {activeTab === "events" && (
//           <div>
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="font-serif text-3xl">Manage Events</h2>
//               <button
//                 onClick={() => {
//                   setEditingItem(null)
//                   setShowModal(true)
//                 }}
//                 className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-all duration-500 font-medium"
//               >
//                 <Plus className="w-5 h-5" />
//                 Add New Event
//               </button>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               {events.map((event) => (
//                 <div key={event.id} className="bg-muted/30 p-6 rounded-lg shadow-lg">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h3 className="font-serif text-2xl mb-2">{event.title}</h3>
//                       <p className="text-sm text-muted-foreground flex items-center gap-2">
//                         <MapPin className="w-4 h-4" />
//                         {event.location}
//                       </p>
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => {
//                           setEditingItem(event)
//                           setShowModal(true)
//                         }}
//                         className="p-2 hover:bg-muted rounded-md transition-colors"
//                       >
//                         <Edit className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteEvent(event.id)}
//                         className="p-2 hover:bg-red-500/10 text-red-500 rounded-md transition-colors"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>

//                   <div className="space-y-3 mb-4">
//                     <div className="flex items-center gap-2">
//                       <Calendar className="w-4 h-4 text-primary" />
//                       <span className="text-sm">
//                         {new Date(event.startDate).toLocaleDateString()} -{" "}
//                         {new Date(event.endDate).toLocaleDateString()}
//                       </span>
//                     </div>
//                     <div className="text-sm text-muted-foreground">{event.time}</div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-3 text-sm border-t pt-4">
//                     <div>
//                       <span className="text-muted-foreground">Exhibitors:</span>{" "}
//                       <span className="font-medium">{event.exhibitors}+</span>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">Buyers:</span>{" "}
//                       <span className="font-medium">{event.buyers}+</span>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">Countries:</span>{" "}
//                       <span className="font-medium">{event.countries}+</span>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">Sectors:</span>{" "}
//                       <span className="font-medium">{event.sectors}</span>
//                     </div>
//                   </div>

//                   <p className="text-sm text-muted-foreground mt-4">{event.description}</p>

//                   <span
//                     className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-medium ${
//                       event.isPast ? "bg-gray-500 text-white" : "bg-green-500 text-white"
//                     }`}
//                   >
//                     {event.isPast ? "PAST EVENT" : "UPCOMING"}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "categories" && (
//           <div>
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="font-serif text-3xl">Manage Categories</h2>
//               <button
//                 onClick={() => {
//                   setEditingItem(null)
//                   setShowModal(true)
//                 }}
//                 className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-all duration-500 font-medium"
//               >
//                 <Plus className="w-5 h-5" />
//                 Add New Category
//               </button>
//             </div>

//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {categories.map((category) => (
//                 <div key={category.id} className="bg-muted/30 p-6 rounded-lg shadow-lg">
//                   <div className="flex justify-between items-start mb-4">
//                     <div className="text-4xl">{category.icon}</div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => {
//                           setEditingItem(category)
//                           setShowModal(true)
//                         }}
//                         className="p-2 hover:bg-muted rounded-md transition-colors"
//                       >
//                         <Edit className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteCategory(category.id)}
//                         className="p-2 hover:bg-red-500/10 text-red-500 rounded-md transition-colors"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                   <h3 className="font-serif text-xl mb-2">{category.name}</h3>
//                   <p className="text-sm text-muted-foreground">{category.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "gallery" && (
//           <div>
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="font-serif text-3xl">Manage Gallery</h2>
//               <button
//                 onClick={() => {
//                   setEditingItem(null)
//                   setShowModal(true)
//                 }}
//                 className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-all duration-500 font-medium"
//               >
//                 <Plus className="w-5 h-5" />
//                 Add New Image
//               </button>
//             </div>

//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {gallery.map((image) => (
//                 <div key={image.id} className="bg-muted/30 rounded-lg shadow-lg overflow-hidden">
//                   <div className="aspect-square relative">
//                     <img
//                       src={image.imageUrl || "/placeholder.svg"}
//                       alt={image.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="p-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <h3 className="font-medium">{image.title}</h3>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => {
//                             setEditingItem(image)
//                             setShowModal(true)
//                           }}
//                           className="p-1 hover:bg-muted rounded-md transition-colors"
//                         >
//                           <Edit className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteGalleryImage(image.id)}
//                           className="p-1 hover:bg-red-500/10 text-red-500 rounded-md transition-colors"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                     <p className="text-sm text-muted-foreground">{image.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-background">
//               <h3 className="font-serif text-2xl">
//                 {editingItem ? "Edit" : "Add New"}{" "}
//                 {activeTab === "events"
//                   ? "Event"
//                   : activeTab === "categories"
//                     ? "Category"
//                     : activeTab === "gallery"
//                       ? "Image"
//                       : ""}
//               </h3>
//               <button
//                 onClick={() => {
//                   setShowModal(false)
//                   setEditingItem(null)
//                 }}
//                 className="p-2 hover:bg-muted rounded-md transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <form
//               onSubmit={(e) => {
//                 e.preventDefault()
//                 const formData = new FormData(e.currentTarget)
//                 const data = Object.fromEntries(formData.entries())

//                 if (activeTab === "events") {
//                   editingItem ? handleEditEvent(data) : handleAddEvent(data)
//                 } else if (activeTab === "categories") {
//                   editingItem ? handleEditCategory(data) : handleAddCategory(data)
//                 } else if (activeTab === "gallery") {
//                   editingItem ? handleEditGalleryImage(data) : handleAddGalleryImage(data)
//                 }
//               }}
//               className="p-6 space-y-4"
//             >
//               {activeTab === "events" && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Event Title</label>
//                     <input
//                       type="text"
//                       name="title"
//                       defaultValue={editingItem?.title}
//                       required
//                       className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Location</label>
//                     <input
//                       type="text"
//                       name="location"
//                       defaultValue={editingItem?.location}
//                       required
//                       className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
//                     />
//                   </div>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Start Date</label>
//                       <input
//                         type="date"
//                         name="startDate"
//                         defaultValue={editingItem?.startDate}
//                         required
//                         className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2">End Date</label>
//                       <input
//                         type="date"
//                         name="endDate"
//                         defaultValue={editingItem?.endDate}
//                         required
//                         className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Time</label>
//                     <input
//                       type="text"
//                       name="time"
//                       defaultValue={editingItem?.time}
//                       placeholder="e.g., 10:00 AM - 7:00 PM"
//                       required
//                       className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
//                     />
//                   </div>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Exhibitors</label>
//                       <input
//                         type="number"
//                         name="exhibitors"
//                         defaultValue={editingItem?.exhibitors}
//                         required
//                         className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Buyers</label>
//                       <input
//                         type="number"
//                         name="buyers"
//                         defaultValue={editingItem?.buyers}
//                         required
//                         className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Countries</label>
//                       <input
//                         type="number"
//                         name="countries"
//                         defaultValue={editingItem?.countries}
//                         required
//                         className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Sectors</label>
//                       <input
//                         type="number"
//                         name="sectors"
//                         defaultValue={editingItem?.sectors}
//                         required
//                         className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Description</label>
//                     <textarea
//                       name="description"
//                       defaultValue={editingItem?.description}
//                       rows={3}
//                       required
//                       className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
//                     />
//                   </div>
//                   <div>
//                     <label className="flex items-center gap-2">
//                       <input type="checkbox" name="isPast" defaultChecked={editingItem?.isPast} className="w-4 h-4" />
//                       <span className="text-sm">Mark as Past Event</span>
//                     </label>
//                   </div>
//                 </>
//               )}

//               {activeTab === "categories" && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Category Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       defaultValue={editingItem?.name}
//                       required
//                       className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Icon (Emoji)</label>
//                     <input
//                       type="text"
//                       name="icon"
//                       defaultValue={editingItem?.icon}
//                       placeholder="e.g., 🔧"
//                       required
//                       className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Description</label>
//                     <textarea
//                       name="description"
//                       defaultValue={editingItem?.description}
//                       rows={3}
//                       required
//                       className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
//                     />
//                   </div>
//                 </>
//               )}

//               {activeTab === "gallery" && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Image Title</label>
//                     <input
//                       type="text"
//                       name="title"
//                       defaultValue={editingItem?.title}
//                       required
//                       className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Image URL</label>
//                     <input
//                       type="text"
//                       name="imageUrl"
//                       defaultValue={editingItem?.imageUrl}
//                       placeholder="/path/to/image.jpg or https://..."
//                       required
//                       className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
//                     />
//                     <p className="text-xs text-muted-foreground mt-1">
//                       Enter the image URL or upload to your server first
//                     </p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Description</label>
//                     <textarea
//                       name="description"
//                       defaultValue={editingItem?.description}
//                       rows={2}
//                       required
//                       className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
//                     />
//                   </div>
//                 </>
//               )}

//               <div className="flex gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowModal(false)
//                     setEditingItem(null)
//                   }}
//                   className="flex-1 px-6 py-3 rounded-md border border-border hover:bg-muted transition-all duration-500 font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-all duration-500 font-medium"
//                 >
//                   {editingItem ? "Update" : "Add"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }








"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, LogOut, Filter, Plus, Edit, Trash2, X, Calendar, MapPin, Upload, Users, Building } from "lucide-react"

// --- API Configuration ---
const API_BASE_URL = "http://localhost:8000/api"
const EXHIBITOR_REGISTRATION_URL = `${API_BASE_URL}/exhibitor-registrations/`
const VISITOR_REGISTRATION_URL = `${API_BASE_URL}/visitor-registrations/`
const EVENTS_URL = `${API_BASE_URL}/events/`
const CATEGORIES_URL = `${API_BASE_URL}/categories/`
const GALLERY_URL = `${API_BASE_URL}/gallery/`

// --- Utility Functions for API ---
const getAuthHeaders = (): Record<string, string> => {
  const accessToken = localStorage.getItem("accessToken")
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }
  return headers
}

// --- Interface Definitions ---
interface ExhibitorRegistration {
  id: number
  company_name: string
  contact_person_name: string
  designation: string
  email_address: string
  contact_number: string
  product_service: string
  company_address: string
  status: "pending" | "contacted" | "paid" | "rejected"
  created_at: string
}

interface VisitorRegistration {
  id: number
  First_name: string
  Last_name: string
  company_name: string
  email_address: string
  contact_number: string
  industry: string
  created_at: string
  updated_at: string
}

interface Event {
  id: number
  title: string
  location: string
  start_date: string
  end_date: string
  time: string
  exhibitors: number
  buyers: number
  countries: number
  sectors: number
  description: string
  is_past: boolean
  created_at: string
  updated_at: string
}

interface Category {
  id: number
  name: string
  description: string
  icon: string
  created_at: string
  updated_at: string
}

interface GalleryImage {
  id: number
  title: string
  image: string
  image_url: string
  description: string
  created_at: string
  updated_at: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [activeTab, setActiveTab] = useState<"exhibitors" | "visitors" | "events" | "categories" | "gallery">("exhibitors")
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [debugInfo, setDebugInfo] = useState<string>("Initializing...")
  const [imageFile, setImageFile] = useState<File | null>(null)

  // State for all data
  const [exhibitors, setExhibitors] = useState<ExhibitorRegistration[]>([])
  const [visitors, setVisitors] = useState<VisitorRegistration[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [gallery, setGallery] = useState<GalleryImage[]>([])

  // --- Data Fetching Functions ---
  const fetchExhibitors = useCallback(async () => {
    try {
      const response = await fetch(EXHIBITOR_REGISTRATION_URL, {
        headers: getAuthHeaders(),
      })
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
      const data = await response.json()
      let exhibitorsData = []
      
      if (data.results) {
        exhibitorsData = data.results
      } else if (Array.isArray(data)) {
        exhibitorsData = data
      } else {
        console.error("Unexpected API response format:", data)
        return
      }
      
      setExhibitors(exhibitorsData)
      
    } catch (error: any) {
      console.error("Failed to fetch exhibitors:", error)
      setDebugInfo(`Error: ${error.message}`)
    }
  }, [])

  const fetchVisitors = useCallback(async () => {
    try {
      const response = await fetch(VISITOR_REGISTRATION_URL, {
        headers: getAuthHeaders(),
      })
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
      const data = await response.json()
      let visitorsData = []
      
      if (data.results) {
        visitorsData = data.results
      } else if (Array.isArray(data)) {
        visitorsData = data
      } else {
        console.error("Unexpected API response format:", data)
        return
      }
      
      setVisitors(visitorsData)
      
    } catch (error: any) {
      console.error("Failed to fetch visitors:", error)
      setDebugInfo(`Error: ${error.message}`)
    }
  }, [])

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch(EVENTS_URL, {
        headers: getAuthHeaders(),
      })
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      setEvents(data.results || data)
    } catch (error: any) {
      console.error("Failed to fetch events:", error)
      setDebugInfo(`Error fetching events: ${error.message}`)
    }
  }, [])

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(CATEGORIES_URL, {
        headers: getAuthHeaders(),
      })
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      setCategories(data.results || data)
    } catch (error: any) {
      console.error("Failed to fetch categories:", error)
      setDebugInfo(`Error fetching categories: ${error.message}`)
    }
  }, [])

  const fetchGallery = useCallback(async () => {
    try {
      const response = await fetch(GALLERY_URL, {
        headers: getAuthHeaders(),
      })
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      setGallery(data.results || data)
    } catch (error: any) {
      console.error("Failed to fetch gallery:", error)
      setDebugInfo(`Error fetching gallery: ${error.message}`)
    }
  }, [])

  const fetchAllData = useCallback(async () => {
    setIsLoading(true)
    try {
      await Promise.all([
        fetchExhibitors(),
        fetchVisitors(),
        fetchEvents(),
        fetchCategories(),
        fetchGallery()
      ])
      setDebugInfo("All data loaded successfully")
    } catch (error) {
      console.error("Failed to fetch data:", error)
      setDebugInfo("Error loading data")
    } finally {
      setIsLoading(false)
    }
  }, [fetchExhibitors, fetchVisitors, fetchEvents, fetchCategories, fetchGallery])

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn")
    const accessToken = localStorage.getItem("accessToken")
    
    if (isLoggedIn === "true" && accessToken) {
      setIsAuthenticated(true)
      fetchAllData()
    } else {
      router.push("/admin/login")
    }
  }, [router, fetchAllData])

  // --- Authentication ---
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    router.push("/")
  }

  // --- CRUD Operations for Exhibitors ---
  const handleStatusChange = async (id: number, newStatus: ExhibitorRegistration["status"]) => {
    const originalExhibitors = [...exhibitors]
    
    setExhibitors(prev => prev.map(exhibitor => 
      exhibitor.id === id ? { ...exhibitor, status: newStatus } : exhibitor
    ))

    try {
      const response = await fetch(`${EXHIBITOR_REGISTRATION_URL}${id}/`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error("Failed to update status")
      
      await fetchExhibitors()
      setDebugInfo(`Successfully updated exhibitor ${id} to ${newStatus}`)
      
    } catch (error: any) {
      console.error("Error updating exhibitor status:", error)
      setExhibitors(originalExhibitors)
      setDebugInfo(`Error: ${error.message}`)
    }
  }

  // --- CRUD Operations for Visitors ---
  const handleDeleteVisitor = async (id: number) => {
    if (!confirm("Are you sure you want to delete this visitor registration?")) return

    try {
      const response = await fetch(`${VISITOR_REGISTRATION_URL}${id}/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })

      if (!response.ok) throw new Error("Failed to delete visitor")
      
      await fetchVisitors()
      setDebugInfo("Visitor registration deleted successfully")
    } catch (error: any) {
      console.error("Error deleting visitor:", error)
      setDebugInfo(`Error deleting visitor: ${error.message}`)
    }
  }

  // --- CRUD Operations for Events ---
  const handleAddEvent = async (formData: any) => {
    try {
      const response = await fetch(EVENTS_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...formData,
          exhibitors: parseInt(formData.exhibitors),
          buyers: parseInt(formData.buyers),
          countries: parseInt(formData.countries),
          sectors: parseInt(formData.sectors),
          is_past: formData.is_past === "on"
        }),
      })

      if (!response.ok) throw new Error("Failed to create event")
      
      await fetchEvents()
      setShowModal(false)
      setDebugInfo("Event created successfully")
    } catch (error: any) {
      console.error("Error creating event:", error)
      setDebugInfo(`Error creating event: ${error.message}`)
    }
  }

  const handleEditEvent = async (formData: any) => {
    try {
      const response = await fetch(`${EVENTS_URL}${editingItem.id}/`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...formData,
          exhibitors: parseInt(formData.exhibitors),
          buyers: parseInt(formData.buyers),
          countries: parseInt(formData.countries),
          sectors: parseInt(formData.sectors),
          is_past: formData.is_past === "on"
        }),
      })

      if (!response.ok) throw new Error("Failed to update event")
      
      await fetchEvents()
      setShowModal(false)
      setEditingItem(null)
      setDebugInfo("Event updated successfully")
    } catch (error: any) {
      console.error("Error updating event:", error)
      setDebugInfo(`Error updating event: ${error.message}`)
    }
  }

  const handleDeleteEvent = async (id: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      const response = await fetch(`${EVENTS_URL}${id}/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })

      if (!response.ok) throw new Error("Failed to delete event")
      
      await fetchEvents()
      setDebugInfo("Event deleted successfully")
    } catch (error: any) {
      console.error("Error deleting event:", error)
      setDebugInfo(`Error deleting event: ${error.message}`)
    }
  }

  // --- CRUD Operations for Categories ---
  const handleAddCategory = async (formData: any) => {
    try {
      const response = await fetch(CATEGORIES_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to create category")
      
      await fetchCategories()
      setShowModal(false)
      setDebugInfo("Category created successfully")
    } catch (error: any) {
      console.error("Error creating category:", error)
      setDebugInfo(`Error creating category: ${error.message}`)
    }
  }

  const handleEditCategory = async (formData: any) => {
    try {
      const response = await fetch(`${CATEGORIES_URL}${editingItem.id}/`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to update category")
      
      await fetchCategories()
      setShowModal(false)
      setEditingItem(null)
      setDebugInfo("Category updated successfully")
    } catch (error: any) {
      console.error("Error updating category:", error)
      setDebugInfo(`Error updating category: ${error.message}`)
    }
  }

  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    try {
      const response = await fetch(`${CATEGORIES_URL}${id}/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })

      if (!response.ok) throw new Error("Failed to delete category")
      
      await fetchCategories()
      setDebugInfo("Category deleted successfully")
    } catch (error: any) {
      console.error("Error deleting category:", error)
      setDebugInfo(`Error deleting category: ${error.message}`)
    }
  }

  // --- CRUD Operations for Gallery ---
  const handleAddGalleryImage = async (formData: any) => {
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('description', formData.description)
      if (imageFile) {
        formDataToSend.append('image', imageFile)
      }

      const response = await fetch(GALLERY_URL, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: formDataToSend,
      })

      if (!response.ok) throw new Error("Failed to create gallery image")
      
      await fetchGallery()
      setShowModal(false)
      setImageFile(null)
      setDebugInfo("Gallery image created successfully")
    } catch (error: any) {
      console.error("Error creating gallery image:", error)
      setDebugInfo(`Error creating gallery image: ${error.message}`)
    }
  }

  const handleEditGalleryImage = async (formData: any) => {
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('description', formData.description)
      if (imageFile) {
        formDataToSend.append('image', imageFile)
      }

      const response = await fetch(`${GALLERY_URL}${editingItem.id}/`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: formDataToSend,
      })

      if (!response.ok) throw new Error("Failed to update gallery image")
      
      await fetchGallery()
      setShowModal(false)
      setEditingItem(null)
      setImageFile(null)
      setDebugInfo("Gallery image updated successfully")
    } catch (error: any) {
      console.error("Error updating gallery image:", error)
      setDebugInfo(`Error updating gallery image: ${error.message}`)
    }
  }

  const handleDeleteGalleryImage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    try {
      const response = await fetch(`${GALLERY_URL}${id}/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })

      if (!response.ok) throw new Error("Failed to delete gallery image")
      
      await fetchGallery()
      setDebugInfo("Gallery image deleted successfully")
    } catch (error: any) {
      console.error("Error deleting gallery image:", error)
      setDebugInfo(`Error deleting gallery image: ${error.message}`)
    }
  }

  // --- UI Helper Functions ---
  const getStatusColor = (status: ExhibitorRegistration["status"]) => {
    switch (status) {
      case "paid": return "bg-green-500/10 border-green-500 text-green-700"
      case "contacted": return "bg-blue-500/10 border-blue-500 text-blue-700"
      case "rejected": return "bg-red-500/10 border-red-500 text-red-700"
      case "pending": return "bg-yellow-500/10 border-yellow-500 text-yellow-700"
      default: return "bg-muted border-border"
    }
  }

  const getStatusBadgeColor = (status: ExhibitorRegistration["status"]) => {
    switch (status) {
      case "paid": return "bg-green-500 text-white"
      case "contacted": return "bg-blue-500 text-white"
      case "rejected": return "bg-red-500 text-white"
      case "pending": return "bg-yellow-500 text-white"
      default: return "bg-muted text-foreground"
    }
  }

  // --- Data Filtering ---
  const filteredExhibitors = exhibitors.filter((exhibitor) => {
    const matchesSearch =
      exhibitor.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exhibitor.contact_person_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exhibitor.email_address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exhibitor.product_service?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = filterStatus === "all" || exhibitor.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const filteredVisitors = visitors.filter((visitor) => {
    const matchesSearch =
      visitor.First_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.Last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.email_address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.industry?.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch
  })

  const stats = {
    totalExhibitors: exhibitors.length,
    paidExhibitors: exhibitors.filter((r) => r.status === "paid").length,
    contactedExhibitors: exhibitors.filter((r) => r.status === "contacted").length,
    pendingExhibitors: exhibitors.filter((r) => r.status === "pending").length,
    rejectedExhibitors: exhibitors.filter((r) => r.status === "rejected").length,
    totalVisitors: visitors.length,
  }

  if (!isAuthenticated) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-xl font-medium mb-4">Loading Dashboard Data...</p>
          <p className="text-sm text-muted-foreground">{debugInfo}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Indo-Global-Trade-Fair-Logo--eqw9QSs9yPlSNoi4uIQ58jPR2grztu.webp"
                alt="IGTF Logo"
                className="h-12 w-auto"
              />
              <div>
                <h1 className="font-serif text-2xl">Admin Dashboard</h1>
                <p className="text-sm opacity-90">Indo Global Trade Fair Management</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-primary-foreground text-primary px-4 py-2 rounded-md hover:opacity-90 transition-all duration-500 font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab("exhibitors")}
                className={`px-6 py-3 font-medium transition-colors flex items-center gap-2 ${
                  activeTab === "exhibitors"
                    ? "bg-primary-foreground text-primary border-b-2 border-primary"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
              >
                <Building className="w-4 h-4" />
                Exhibitors
              </button>
              <button
                onClick={() => setActiveTab("visitors")}
                className={`px-6 py-3 font-medium transition-colors flex items-center gap-2 ${
                  activeTab === "visitors"
                    ? "bg-primary-foreground text-primary border-b-2 border-primary"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
              >
                <Users className="w-4 h-4" />
                Visitors
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === "events"
                    ? "bg-primary-foreground text-primary border-b-2 border-primary"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
              >
                Events
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === "categories"
                    ? "bg-primary-foreground text-primary border-b-2 border-primary"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => setActiveTab("gallery")}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === "gallery"
                    ? "bg-primary-foreground text-primary border-b-2 border-primary"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
              >
                Gallery
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Debug Info */}
        <div className="bg-blue-100 border border-blue-400 p-4 rounded-lg mb-6">
          <h3 className="font-bold text-blue-800 mb-2">System Status</h3>
          <p className="text-sm text-blue-700">{debugInfo}</p>
          <div className="flex gap-2 mt-2">
            <button 
              onClick={fetchAllData}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              Refresh All Data
            </button>
          </div>
        </div>

        {/* Exhibitors Tab */}
        {activeTab === "exhibitors" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
              <div className="bg-muted/30 p-6 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total Exhibitors</p>
                <p className="text-3xl font-bold">{stats.totalExhibitors}</p>
              </div>
              <div className="bg-green-500/10 border border-green-500 p-6 rounded-lg">
                <p className="text-sm text-green-700 mb-1">Paid</p>
                <p className="text-3xl font-bold text-green-700">{stats.paidExhibitors}</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500 p-6 rounded-lg">
                <p className="text-sm text-blue-700 mb-1">Contacted</p>
                <p className="text-3xl font-bold text-blue-700">{stats.contactedExhibitors}</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500 p-6 rounded-lg">
                <p className="text-sm text-yellow-700 mb-1">Pending</p>
                <p className="text-3xl font-bold text-yellow-700">{stats.pendingExhibitors}</p>
              </div>
              <div className="bg-red-500/10 border border-red-500 p-6 rounded-lg">
                <p className="text-sm text-red-700 mb-1">Rejected</p>
                <p className="text-3xl font-bold text-red-700">{stats.rejectedExhibitors}</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500 p-6 rounded-lg">
                <p className="text-sm text-purple-700 mb-1">Total Visitors</p>
                <p className="text-3xl font-bold text-purple-700">{stats.totalVisitors}</p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-muted/30 p-6 rounded-lg mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by company, contact person, email, or product..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-500 outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-muted-foreground" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-500 outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="paid">Paid</option>
                    <option value="contacted">Contacted</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Exhibitors List */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl mb-4">Exhibitor Registrations ({filteredExhibitors.length})</h2>

              {filteredExhibitors.map((exhibitor) => (
                <div
                  key={exhibitor.id}
                  className={`border-2 rounded-lg p-6 transition-all duration-500 hover:shadow-lg ${getStatusColor(
                    exhibitor.status,
                  )}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Exhibitor Details */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-serif text-xl mb-1">{exhibitor.company_name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Registered on {new Date(exhibitor.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(exhibitor.status)}`}
                        >
                          {exhibitor.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Contact Person</p>
                          <p className="font-medium">{exhibitor.contact_person_name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Designation</p>
                          <p className="font-medium">{exhibitor.designation}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Email</p>
                          <p className="font-medium">{exhibitor.email_address}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Contact Number</p>
                          <p className="font-medium">{exhibitor.contact_number}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Product/Service</p>
                          <p className="font-medium">{exhibitor.product_service}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Address</p>
                          <p className="font-medium">{exhibitor.company_address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Status Actions */}
                    <div className="lg:w-48">
                      <p className="text-sm font-medium mb-3">Update Status</p>
                      <div className="space-y-2">
                        <button
                          onClick={() => handleStatusChange(exhibitor.id, "pending")}
                          className={`w-full px-4 py-2 rounded-md transition-all duration-500 text-sm font-medium ${
                            exhibitor.status === "pending" 
                              ? "bg-yellow-600 text-white cursor-not-allowed" 
                              : "bg-yellow-500 text-white hover:bg-yellow-600"
                          }`}
                          disabled={exhibitor.status === "pending"}
                        >
                          {exhibitor.status === "pending" ? "Currently Pending" : "Mark Pending"}
                        </button>
                        <button
                          onClick={() => handleStatusChange(exhibitor.id, "contacted")}
                          className={`w-full px-4 py-2 rounded-md transition-all duration-500 text-sm font-medium ${
                            exhibitor.status === "contacted" 
                              ? "bg-blue-600 text-white cursor-not-allowed" 
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                          disabled={exhibitor.status === "contacted"}
                        >
                          {exhibitor.status === "contacted" ? "Currently Contacted" : "Mark Contacted"}
                        </button>
                        <button
                          onClick={() => handleStatusChange(exhibitor.id, "paid")}
                          className={`w-full px-4 py-2 rounded-md transition-all duration-500 text-sm font-medium ${
                            exhibitor.status === "paid" 
                              ? "bg-green-600 text-white cursor-not-allowed" 
                              : "bg-green-500 text-white hover:bg-green-600"
                          }`}
                          disabled={exhibitor.status === "paid"}
                        >
                          {exhibitor.status === "paid" ? "Currently Paid" : "Mark Paid"}
                        </button>
                        <button
                          onClick={() => handleStatusChange(exhibitor.id, "rejected")}
                          className={`w-full px-4 py-2 rounded-md transition-all duration-500 text-sm font-medium ${
                            exhibitor.status === "rejected" 
                              ? "bg-red-600 text-white cursor-not-allowed" 
                              : "bg-red-500 text-white hover:bg-red-600"
                          }`}
                          disabled={exhibitor.status === "rejected"}
                        >
                          {exhibitor.status === "rejected" ? "Currently Rejected" : "Mark Rejected"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredExhibitors.length === 0 && exhibitors.length > 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No exhibitors found matching your search criteria.</p>
                  <p className="text-sm mt-2">Try changing your search query or filter.</p>
                </div>
              )}

              {exhibitors.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No exhibitor registrations found in the system.</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Visitors Tab */}
        {activeTab === "visitors" && (
          <>
            {/* Stats Card */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-purple-500/10 border border-purple-500 p-6 rounded-lg">
                <p className="text-sm text-purple-700 mb-1">Total Visitors</p>
                <p className="text-3xl font-bold text-purple-700">{stats.totalVisitors}</p>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total Exhibitors</p>
                <p className="text-3xl font-bold">{stats.totalExhibitors}</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500 p-6 rounded-lg">
                <p className="text-sm text-blue-700 mb-1">Contacted Exhibitors</p>
                <p className="text-3xl font-bold text-blue-700">{stats.contactedExhibitors}</p>
              </div>
              <div className="bg-green-500/10 border border-green-500 p-6 rounded-lg">
                <p className="text-sm text-green-700 mb-1">Paid Exhibitors</p>
                <p className="text-3xl font-bold text-green-700">{stats.paidExhibitors}</p>
              </div>
            </div>

            {/* Search */}
            <div className="bg-muted/30 p-6 rounded-lg mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name, company, email, or industry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Visitors List */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl mb-4">Visitor Registrations ({filteredVisitors.length})</h2>

              {filteredVisitors.map((visitor) => (
                <div
                  key={visitor.id}
                  className="border-2 rounded-lg p-6 transition-all duration-500 hover:shadow-lg bg-blue-500/10 border-blue-500"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Visitor Details */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-serif text-xl mb-1">
                            {visitor.First_name} {visitor.Last_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Registered on {new Date(visitor.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
                          VISITOR
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Company</p>
                          <p className="font-medium">{visitor.company_name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Industry</p>
                          <p className="font-medium">{visitor.industry}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Email</p>
                          <p className="font-medium">{visitor.email_address}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Contact Number</p>
                          <p className="font-medium">{visitor.contact_number}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:w-48">
                      <p className="text-sm font-medium mb-3">Actions</p>
                      <div className="space-y-2">
                        <button
                          onClick={() => handleDeleteVisitor(visitor.id)}
                          className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-500 text-sm font-medium"
                        >
                          Delete Registration
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredVisitors.length === 0 && visitors.length > 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No visitors found matching your search criteria.</p>
                  <p className="text-sm mt-2">Try changing your search query.</p>
                </div>
              )}

              {visitors.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No visitor registrations found in the system.</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-3xl">Manage Events ({events.length})</h2>
              <button
                onClick={() => {
                  setEditingItem(null)
                  setShowModal(true)
                }}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-all duration-500 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add New Event
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-muted/30 p-6 rounded-lg shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-serif text-2xl mb-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(event)
                          setShowModal(true)
                        }}
                        className="p-2 hover:bg-muted rounded-md transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-2 hover:bg-red-500/10 text-red-500 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm">
                        {new Date(event.start_date).toLocaleDateString()} -{" "}
                        {new Date(event.end_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">{event.time}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm border-t pt-4">
                    <div>
                      <span className="text-muted-foreground">Exhibitors:</span>{" "}
                      <span className="font-medium">{event.exhibitors}+</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Buyers:</span>{" "}
                      <span className="font-medium">{event.buyers}+</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Countries:</span>{" "}
                      <span className="font-medium">{event.countries}+</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Sectors:</span>{" "}
                      <span className="font-medium">{event.sectors}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4">{event.description}</p>

                  <span
                    className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-medium ${
                      event.is_past ? "bg-gray-500 text-white" : "bg-green-500 text-white"
                    }`}
                  >
                    {event.is_past ? "PAST EVENT" : "UPCOMING"}
                  </span>
                </div>
              ))}

              {events.length === 0 && (
                <div className="text-center py-12 text-muted-foreground col-span-2">
                  <p>No events found.</p>
                  <p className="text-sm mt-2">Click "Add New Event" to create your first event.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-3xl">Manage Categories ({categories.length})</h2>
              <button
                onClick={() => {
                  setEditingItem(null)
                  setShowModal(true)
                }}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-all duration-500 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add New Category
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div key={category.id} className="bg-muted/30 p-6 rounded-lg shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-4xl">{category.icon}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(category)
                          setShowModal(true)
                        }}
                        className="p-2 hover:bg-muted rounded-md transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-2 hover:bg-red-500/10 text-red-500 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-serif text-xl mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              ))}

              {categories.length === 0 && (
                <div className="text-center py-12 text-muted-foreground col-span-3">
                  <p>No categories found.</p>
                  <p className="text-sm mt-2">Click "Add New Category" to create your first category.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-3xl">Manage Gallery ({gallery.length})</h2>
              <button
                onClick={() => {
                  setEditingItem(null)
                  setShowModal(true)
                }}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-all duration-500 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add New Image
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((image) => (
                <div key={image.id} className="bg-muted/30 rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={image.image_url || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{image.title}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingItem(image)
                            setShowModal(true)
                          }}
                          className="p-1 hover:bg-muted rounded-md transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteGalleryImage(image.id)}
                          className="p-1 hover:bg-red-500/10 text-red-500 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{image.description}</p>
                  </div>
                </div>
              ))}

              {gallery.length === 0 && (
                <div className="text-center py-12 text-muted-foreground col-span-3">
                  <p>No gallery images found.</p>
                  <p className="text-sm mt-2">Click "Add New Image" to upload your first image.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-background">
              <h3 className="font-serif text-2xl">
                {editingItem ? "Edit" : "Add New"}{" "}
                {activeTab === "events"
                  ? "Event"
                  : activeTab === "categories"
                    ? "Category"
                    : activeTab === "gallery"
                      ? "Image"
                      : ""}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false)
                  setEditingItem(null)
                  setImageFile(null)
                }}
                className="p-2 hover:bg-muted rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const data = Object.fromEntries(formData.entries())

                if (activeTab === "events") {
                  editingItem ? handleEditEvent(data) : handleAddEvent(data)
                } else if (activeTab === "categories") {
                  editingItem ? handleEditCategory(data) : handleAddCategory(data)
                } else if (activeTab === "gallery") {
                  editingItem ? handleEditGalleryImage(data) : handleAddGalleryImage(data)
                }
              }}
              className="p-6 space-y-4"
            >
              {activeTab === "events" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Event Title</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={editingItem?.title}
                      required
                      className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      defaultValue={editingItem?.location}
                      required
                      className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Start Date</label>
                      <input
                        type="date"
                        name="start_date"
                        defaultValue={editingItem?.start_date}
                        required
                        className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">End Date</label>
                      <input
                        type="date"
                        name="end_date"
                        defaultValue={editingItem?.end_date}
                        required
                        className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Time</label>
                    <input
                      type="text"
                      name="time"
                      defaultValue={editingItem?.time}
                      placeholder="e.g., 10:00 AM - 7:00 PM"
                      required
                      className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Exhibitors</label>
                      <input
                        type="number"
                        name="exhibitors"
                        defaultValue={editingItem?.exhibitors}
                        required
                        className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Buyers</label>
                      <input
                        type="number"
                        name="buyers"
                        defaultValue={editingItem?.buyers}
                        required
                        className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Countries</label>
                      <input
                        type="number"
                        name="countries"
                        defaultValue={editingItem?.countries}
                        required
                        className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Sectors</label>
                      <input
                        type="number"
                        name="sectors"
                        defaultValue={editingItem?.sectors}
                        required
                        className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      defaultValue={editingItem?.description}
                      rows={3}
                      required
                      className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        name="is_past" 
                        defaultChecked={editingItem?.is_past} 
                        className="w-4 h-4" 
                      />
                      <span className="text-sm">Mark as Past Event</span>
                    </label>
                  </div>
                </>
              )}

              {activeTab === "categories" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category Name</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editingItem?.name}
                      required
                      className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Icon (Emoji)</label>
                    <input
                      type="text"
                      name="icon"
                      defaultValue={editingItem?.icon}
                      placeholder="e.g., 🔧"
                      required
                      className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      defaultValue={editingItem?.description}
                      rows={3}
                      required
                      className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                    />
                  </div>
                </>
              )}

              {activeTab === "gallery" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Image Title</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={editingItem?.title}
                      required
                      className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      required={!editingItem}
                      className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                    {editingItem && !imageFile && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Current image: {editingItem.image}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      defaultValue={editingItem?.description}
                      rows={2}
                      required
                      className="w-full px-4 py-2 rounded-md bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingItem(null)
                    setImageFile(null)
                  }}
                  className="flex-1 px-6 py-3 rounded-md border border-border hover:bg-muted transition-all duration-500 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-all duration-500 font-medium"
                >
                  {editingItem ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
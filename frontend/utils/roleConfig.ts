export type UserRole = "admin" | "manager" | "sales";

// Tabs each role can access
export const roleTabs: Record<UserRole, string[]> = {
  admin: ["exhibitors", "visitors", "events", "categories", "gallery","manage-team"],
  manager: ["exhibitors", "visitors", "events", "categories", "gallery"],
  sales: ["exhibitors", "visitors"],
};

// Dashboard title for each role
export const roleTitles: Record<UserRole, string> = {
  admin: "Admin Dashboard",
  manager: "Manager Dashboard",
  sales: "Sales Dashboard",
};

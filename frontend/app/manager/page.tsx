import { Suspense } from "react";
import ManagerDashboardClient from "@/components/admin/ManagerDashboardClient";



export default function Page() {
  return (
    <Suspense>
      <ManagerDashboardClient />
    </Suspense>
  );
}

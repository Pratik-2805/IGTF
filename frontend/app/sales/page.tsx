import { Suspense } from "react";
import SalesDashboardClient from "@/components/admin/SalesDashboardClient";

export default function Page() {
  return (
    <Suspense>
      <SalesDashboardClient />
    </Suspense>
  );
}

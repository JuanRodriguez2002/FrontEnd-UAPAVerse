import type { ReactNode } from "react";
import { AdminDashboardPage } from "@/features/dashboard-admin/components/AdminDashboardPage";

export default function DashboardAdminLayout({ children }: { children: ReactNode }) {
  return <AdminDashboardPage>{children}</AdminDashboardPage>;
}

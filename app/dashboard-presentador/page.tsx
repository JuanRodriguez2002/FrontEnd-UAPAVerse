"use client";

import { PresenterDashboard } from "@/features/dashboard-presentador/components/PresenterDashboard";
import { usePresenterDashboard } from "@/features/dashboard-presentador/hooks/usePresenterDashboard";

export default function DashboardPresentadorPage() {
  const dashboard = usePresenterDashboard();

  return <PresenterDashboard {...dashboard} />;
}

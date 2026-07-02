"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { VisitorHeader } from "@/features/dashboard-visitante/components/ui/VisitorHeader";
import { VisitorSidebar } from "@/features/dashboard-visitante/components/ui/VisitorSidebar";

export default function DashboardVisitanteLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background font-hanken">
      <VisitorSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <VisitorHeader onOpenMenu={() => setSidebarOpen(true)} visitorName="María Pérez" />
        <main className="flex-1 px-5 py-6 sm:px-7 lg:px-10">{children}</main>
      </div>
    </div>
  );
}

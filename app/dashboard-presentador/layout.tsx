"use client";

import { useState } from "react";
import { PresenterSidebar } from "@/features/dashboard-presentador/components/ui/PresenterSidebar";
import { PresenterHeader } from "@/features/dashboard-presentador/components/ui/PresenterHeader";

export default function DashboardPresentadorLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background font-hanken">
      <PresenterSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <PresenterHeader
          onOpenMenu={() => setSidebarOpen(true)}
          presenterName="Daniela Ventura"
        />
        <main className="flex-1 px-5 py-6 sm:px-7 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}

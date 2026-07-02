"use client";

import { useEffect, useState } from "react";
import { PresenterSidebar } from "@/features/dashboard-presentador/components/ui/PresenterSidebar";
import { PresenterHeader } from "@/features/dashboard-presentador/components/ui/PresenterHeader";

export default function DashboardPresentadorLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [displayName, setDisplayName] = useState("Expositor");

  // Jalamos el nombre del usuario real que inició sesión (evita el texto estático)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.name) {
            setDisplayName(parsedUser.name);
          }
        } catch (err) {
          console.error("Error leyendo el nombre del usuario en el layout:", err);
        }
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-background font-hanken">
      <PresenterSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <PresenterHeader
          onOpenMenu={() => setSidebarOpen(true)}
          presenterName={displayName} // <-- Ahora muestra el nombre dinámico del localStorage
        />
        <main className="flex-1 px-5 py-6 sm:px-7 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
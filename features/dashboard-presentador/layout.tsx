import React from 'react';

export const metadata = {
  title: 'Dashboard Expositor | Feria Tecnológica',
  description: 'Espacio exclusivo para presentadores de tecnología.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-slate-50 min-h-screen text-slate-900 antialiased font-sans">
        {/* Navbar */}
        <nav className="bg-slate-900 text-white py-4 px-6 sticky top-0 z-50 shadow-md border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
              <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                TechDashboard
              </span>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md border border-slate-700">
                Módulo Expositor
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400 hidden sm:inline">Presentador Registrado</span>
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-sm text-white shadow-lg shadow-blue-500/20">
                EX
              </div>
            </div>
          </div>
        </nav>
        
        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto p-4 md:p-8 animate-fade-in">
          {children}
        </main>
      </body>
    </html>
  );
}
import React from 'react';
import FormularioStand from './components/FormularioStand';
import PanelEstadisticas from './components/PanelEstadisticas';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Encabezado Principal */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          Gestión de Alta Tecnológica
        </h1>
        <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-2xl">
          Configura tu stand virtual, gestiona tus entregables técnicos en tiempo real y evalúa las propuestas de vinculación empresarial.
        </p>
      </div>

      {/* Grid Distributivo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Columna del Formulario (2/3 de ancho) */}
        <div className="lg:col-span-2 space-y-6">
          <FormularioStand />
        </div>

        {/* Columna de Analíticas y Propuestas (1/3 de ancho) */}
        <div className="lg:col-span-1 space-y-6">
          <PanelEstadisticas />
        </div>
      </div>
    </div>
  );
}
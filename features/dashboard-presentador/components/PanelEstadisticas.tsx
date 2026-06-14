'use client';

import React, { useState } from 'react';

export default function PanelEstadisticas() {
  const [propuestas, setPropuestas] = useState([
    { id: '1', empresa: 'Nexus Capital', tipo: 'Inversión Directa', estado: 'pendiente' },
    { id: '2', empresa: 'Alpha Industries', tipo: 'Acuerdo de Transferencia', estado: 'pendiente' },
    { id: '3', empresa: 'TechVentures SA', tipo: 'Alianza Estratégica', estado: 'pendiente' },
  ]);

  const [vistaGrafico, setVistaGrafico] = useState<'semana' | 'mes'>('semana');

  const accionarPropuesta = (id: string, decision: 'aceptada' | 'declinada') => {
    setPropuestas(prev => prev.map(p => p.id === id ? { ...p, estado: decision } : p));
  };

  const datosGrafico = {
    semana: [
      { label: 'Lun', visitas: 38, empresas: 5 },
      { label: 'Mar', visitas: 72, empresas: 12 },
      { label: 'Mié', visitas: 55, empresas: 8 },
      { label: 'Jue', visitas: 91, empresas: 17 },
      { label: 'Vie', visitas: 64, empresas: 10 },
      { label: 'Sáb', visitas: 28, empresas: 3 },
      { label: 'Dom', visitas: 19, empresas: 2 },
    ],
    mes: [
      { label: 'Sem 1', visitas: 210, empresas: 34 },
      { label: 'Sem 2', visitas: 340, empresas: 58 },
      { label: 'Sem 3', visitas: 290, empresas: 47 },
      { label: 'Sem 4', visitas: 412, empresas: 71 },
    ],
  };

  const datos = datosGrafico[vistaGrafico];
  const maxVisitas = Math.max(...datos.map(d => d.visitas));

  const empresasInteresadas = [
    { nombre: 'Nexus Capital', sector: 'Fintech', visitas: 14, interes: 'Alto', color: '#34d399' },
    { nombre: 'Alpha Industries', sector: 'Manufactura', visitas: 9, interes: 'Medio', color: '#fbbf24' },
    { nombre: 'TechVentures SA', sector: 'Deep Tech', visitas: 7, interes: 'Alto', color: '#34d399' },
    { nombre: 'GlobalSeed Fund', sector: 'Capital de Riesgo', visitas: 5, interes: 'Medio', color: '#fbbf24' },
    { nombre: 'Innova Corp', sector: 'Consultoría', visitas: 3, interes: 'Bajo', color: 'rgba(255,255,255,0.3)' },
  ];

  const propuestasPendientes = propuestas.filter(p => p.estado === 'pendiente').length;

  const Label = ({ children }: { children: React.ReactNode }) => (
    <div style={{
      fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)',
      letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 10,
    }}>
      {children}
    </div>
  );

  return (
    <div style={{ background: '#0a0f2e', minHeight: '100vh', display: 'flex', fontFamily: 'sans-serif' }}>

      {/* Sidebar */}
      <div style={{ width: 190, background: '#080d27', padding: '20px 0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '0 16px 24px', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Presentador</div>
          <div style={{ fontSize: 10, color: 'rgba(251, 253, 255, 0.35)', letterSpacing: '0.08em' }}>UAPA VERSE</div>
        </div>
        <nav style={{ padding: '16px 0', flex: 1 }}>
          {[
            { label: 'Publish Stand' },
            { label: 'My Stands' },
            { label: 'Results', active: true },
            { label: 'Messages'},
            { label: 'Settings'},
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px',
              fontSize: 12,
              color: item.active ? '#fff' : 'rgba(255,255,255,0.45)',
              background: item.active ? 'rgba(99,102,241,0.18)' : 'transparent',
              borderLeft: item.active ? '2px solid #6366f1' : '2px solid transparent',
              cursor: 'pointer',
            }}>
              <span>{item.icon}</span> {item.label}
            </div>
          ))}
        </nav>
        <div style={{ padding: '16px', borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', fontSize: 12, color: 'rgba(255,255,255,0.45)', cursor: 'pointer' }}>
             Logout
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '28px 28px 28px 24px', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>PANEL DE ESTADISTICAS</h1>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
              Visitas e interés de empresas en tu stand virtual.
            </p>
          </div>
          <button style={{
            background: 'transparent', border: '0.5px solid rgba(255,255,255,0.25)',
            color: 'rgba(255,255,255,0.7)', fontSize: 11, padding: '7px 14px',
            borderRadius: 8, cursor: 'pointer', letterSpacing: '0.05em', fontFamily: 'inherit',
          }}>
            EXPORTAR DATOS
          </button>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 14 }}>
          {[
            { label: 'Visitas Totales al Stand', valor: '2,845', badge: '↑ +16% esta semana', badgeColor: '#34d399', icon: '👁️' },
            { label: 'Empresas Interesadas', valor: '57', badge: '↑ +8 nuevas', badgeColor: '#34d399', icon: '🏢' },
            { label: 'Tiempo Promedio en Stand', valor: '4m 20s', badge: '↑ +2m al promedio', badgeColor: '#34d399', icon: '⏱️' },
            { label: 'Propuestas Recibidas', valor: String(propuestas.length), badge: `${propuestasPendientes} pendientes`, badgeColor: '#a5b4fc', icon: '🤝' },
          ].map(kpi => (
            <div key={kpi.label} style={{
              background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)',
              borderRadius: 14, padding: '16px 18px', position: 'relative',
            }}>
              <span style={{ position: 'absolute', top: 14, right: 14, fontSize: 16, opacity: 0.25 }}>{kpi.icon}</span>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                {kpi.label}
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {kpi.valor}
              </div>
              <div style={{ fontSize: 10, color: kpi.badgeColor, marginTop: 8 }}>{kpi.badge}</div>
            </div>
          ))}
        </div>

        {/* Fila media */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14, marginBottom: 14 }}>

          {/* Gráfico */}
          <div style={{
            background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)',
            borderRadius: 14, padding: 20,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>Visitas al Stand</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>Tráfico diario de visitantes</div>
              </div>
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.07)', borderRadius: 6, overflow: 'hidden' }}>
                {(['semana', 'mes'] as const).map(v => (
                  <button key={v} onClick={() => setVistaGrafico(v)} style={{
                    fontSize: 11, padding: '4px 10px', border: 'none', cursor: 'pointer',
                    background: vistaGrafico === v ? 'rgba(99,102,241,0.5)' : 'transparent',
                    color: vistaGrafico === v ? '#fff' : 'rgba(255,255,255,0.4)',
                    fontFamily: 'inherit',
                  }}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
              {datos.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: 4 }}>
                  <div style={{
                    width: '100%', borderRadius: '5px 5px 0 0',
                    height: `${Math.round((d.visitas / maxVisitas) * 110)}px`,
                    background: 'rgba(99,102,241,0.65)',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
                      width: 7, height: 7, borderRadius: '50%',
                      background: '#34d399',
                      boxShadow: '0 0 5px rgba(52,211,153,0.7)',
                    }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              {datos.map((d, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{d.label}</div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 16, marginTop: 12, paddingTop: 12, borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(99,102,241,0.65)' }} />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>Visitas</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399' }} />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>Empresas interesadas</span>
              </div>
            </div>
          </div>

          {/* Interés por sector */}
          <div style={{
            background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)',
            borderRadius: 14, padding: 20,
          }}>
            <Label>Interés por sector</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { sector: 'Capital de Riesgo', pct: 38, color: 'rgba(99,102,241,0.75)' },
                { sector: 'Deep Tech', pct: 27, color: 'rgba(139,92,246,0.75)' },
                { sector: 'Manufactura', pct: 20, color: 'rgba(236,72,153,0.65)' },
                { sector: 'Consultoría', pct: 15, color: 'rgba(99,102,241,0.35)' },
              ].map(s => (
                <div key={s.sector}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{s.sector}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{s.pct}%</span>
                  </div>
                  <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 4 }}>
                    <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fila inferior */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

          {/* Empresas que visitaron */}
          <div style={{
            background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)',
            borderRadius: 14, padding: 20,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <Label>Empresas que visitaron tu stand</Label>
              <span style={{
                fontSize: 10, background: 'rgba(99,102,241,0.2)', color: '#a5b4fc',
                padding: '3px 9px', borderRadius: 6, fontWeight: 600,
              }}>
                {empresasInteresadas.length} empresas
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {empresasInteresadas.map((emp, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '0.5px solid rgba(255,255,255,0.07)',
                  borderRadius: 10,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: 'rgba(99,102,241,0.15)',
                      border: '0.5px solid rgba(99,102,241,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, color: '#a5b4fc', fontWeight: 700, flexShrink: 0,
                    }}>
                      {emp.nombre.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{emp.nombre}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>{emp.sector}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{emp.visitas}</div>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>visitas</div>
                    </div>
                    <span style={{
                      fontSize: 10, padding: '2px 8px', borderRadius: 6, fontWeight: 600,
                      color: emp.color,
                      background: emp.interes === 'Alto'
                        ? 'rgba(52,211,153,0.1)'
                        : emp.interes === 'Medio'
                          ? 'rgba(251,191,36,0.1)'
                          : 'rgba(255,255,255,0.05)',
                      border: `0.5px solid ${emp.color}40`,
                    }}>
                      {emp.interes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Propuestas */}
          <div style={{
            background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)',
            borderRadius: 14, padding: 20,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <Label>Propuestas de empresas</Label>
              <span style={{
                fontSize: 10, background: 'rgba(99,102,241,0.2)', color: '#a5b4fc',
                padding: '3px 9px', borderRadius: 6, fontWeight: 600,
              }}>
                {propuestasPendientes} activas
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {propuestas.map(prop => (
                <div key={prop.id} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '0.5px solid rgba(255,255,255,0.08)',
                  borderRadius: 10, padding: '12px 14px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: prop.estado === 'pendiente' ? 10 : 0 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{prop.empresa}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{prop.tipo}</div>
                    </div>
                    {prop.estado !== 'pendiente' && (
                      <span style={{
                        fontSize: 10, padding: '2px 8px', borderRadius: 6, fontWeight: 600,
                        textTransform: 'uppercase' as const,
                        background: prop.estado === 'aceptada' ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.06)',
                        color: prop.estado === 'aceptada' ? '#34d399' : 'rgba(255,255,255,0.35)',
                        border: prop.estado === 'aceptada' ? '0.5px solid rgba(52,211,153,0.25)' : 'none',
                      }}>
                        {prop.estado}
                      </span>
                    )}
                  </div>
                  {prop.estado === 'pendiente' && (
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        onClick={() => accionarPropuesta(prop.id, 'aceptada')}
                        style={{
                          flex: 1, padding: '6px 0', background: '#6366f1', color: '#fff',
                          fontSize: 11, fontWeight: 500, border: 'none', borderRadius: 7,
                          cursor: 'pointer', fontFamily: 'inherit',
                        }}
                      >
                        Aceptar Contacto
                      </button>
                      <button
                        onClick={() => accionarPropuesta(prop.id, 'declinada')}
                        style={{
                          padding: '6px 12px', background: 'transparent',
                          color: 'rgba(255,255,255,0.4)', fontSize: 11,
                          border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 7,
                          cursor: 'pointer', fontFamily: 'inherit',
                        }}
                      >
                        Declinar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
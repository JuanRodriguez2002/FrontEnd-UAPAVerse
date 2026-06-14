'use client';

import React, { useState } from 'react';

const wavePath = (points: Array<[number, number]>) => {
  if (!points.length) return '';
  return points.slice(1).reduce((path, [x, y], i) => {
    const [prevX, prevY] = points[i];
    const mid = (x - prevX) / 2;
    return `${path} C ${prevX + mid} ${prevY}, ${x - mid} ${y}, ${x} ${y}`;
  }, `M ${points[0][0]} ${points[0][1]}`);
};

export default function PanelEstadisticas() {
  const [vistaGrafico, setVistaGrafico] = useState<'semana' | 'mes'>('semana');
  const [propuestas, setPropuestas] = useState([
    { id: '1', empresa: 'Nexus Capital', tipo: 'Inversion directa', estado: 'pendiente' },
    { id: '2', empresa: 'Alpha Industries', tipo: 'Acuerdo de transferencia', estado: 'pendiente' },
    { id: '3', empresa: 'TechVentures SA', tipo: 'Alianza estrategica', estado: 'pendiente' },
  ]);

  const datosGrafico = {
    semana: [
      { label: 'Lun', visitas: 38, empresas: 5 },
      { label: 'Mar', visitas: 72, empresas: 12 },
      { label: 'Mie', visitas: 55, empresas: 8 },
      { label: 'Jue', visitas: 91, empresas: 17 },
      { label: 'Vie', visitas: 64, empresas: 10 },
      { label: 'Sab', visitas: 28, empresas: 3 },
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
  const maxEmpresas = Math.max(...datos.map(d => d.empresas));
  const propuestasPendientes = propuestas.filter(p => p.estado === 'pendiente').length;
  const empresaPoints = datos
    .map((d, i) => {
      const x = datos.length === 1 ? 0 : 40 + (i / (datos.length - 1)) * 860;
      const y = 245 - (d.empresas / maxEmpresas) * 165;
      return [x, y] as [number, number];
    });
  const visitPoints = datos
    .map((d, i) => {
      const x = datos.length === 1 ? 0 : 40 + (i / (datos.length - 1)) * 860;
      const y = 252 - (d.visitas / maxVisitas) * 178;
      return [x, y] as [number, number];
    });
  const visitWavePath = wavePath(visitPoints);
  const empresaWavePath = wavePath(empresaPoints);
  const visitAreaPath = `${visitWavePath} L 900 270 L 40 270 Z`;

  const empresasInteresadas = [
    { nombre: 'Nexus Capital', sector: 'Fintech', visitas: 14, interes: 'Alto', color: '#34d399' },
    { nombre: 'Alpha Industries', sector: 'Manufactura', visitas: 9, interes: 'Medio', color: '#fbbf24' },
    { nombre: 'TechVentures SA', sector: 'Deep Tech', visitas: 7, interes: 'Alto', color: '#34d399' },
    { nombre: 'GlobalSeed Fund', sector: 'Capital de Riesgo', visitas: 5, interes: 'Medio', color: '#fbbf24' },
    { nombre: 'Innova Corp', sector: 'Consultoria', visitas: 3, interes: 'Bajo', color: 'rgba(255,255,255,0.38)' },
  ];

  const fuentesTrafico = [
    { canal: 'Lobby principal', pct: 42, color: '#67e8f9' },
    { canal: 'Buscador interno', pct: 26, color: '#a78bfa' },
    { canal: 'Agenda de demos', pct: 19, color: '#f0abfc' },
    { canal: 'Invitaciones', pct: 13, color: '#34d399' },
  ];

  const zonasStand = [
    { zona: 'Demo interactiva', visitas: 884, retencion: '5m 12s', estado: 'Fuerte' },
    { zona: 'Descargas', visitas: 621, retencion: '2m 48s', estado: 'Estable' },
    { zona: 'Networking', visitas: 513, retencion: '4m 03s', estado: 'Alto' },
  ];

  const embudo = [
    { paso: 'Visitantes', valor: 2845, pct: 100 },
    { paso: 'Interesados', valor: 57, pct: 72 },
    { paso: 'Contactos', valor: 24, pct: 46 },
    { paso: 'Propuestas', valor: propuestas.length, pct: 28 },
  ];

  const objetivos = [
    { label: 'Meta de visitas', actual: '2,845', meta: '3,500', pct: 81 },
    { label: 'Meta de empresas', actual: '57', meta: '75', pct: 76 },
    { label: 'Meta de propuestas', actual: String(propuestas.length), meta: '8', pct: 38 },
  ];

  const alertas = [
    { title: 'Alta intencion detectada', text: 'Nexus Capital y TechVentures repitieron visita.', tone: '#34d399' },
    { title: 'Documentos populares', text: 'El brochure tecnico concentra 41% de descargas.', tone: '#67e8f9' },
    { title: 'Seguimiento sugerido', text: 'Hay 3 propuestas pendientes por responder.', tone: '#fbbf24' },
  ];

  const accionarPropuesta = (id: string, decision: 'aceptada' | 'declinada') => {
    setPropuestas(prev => prev.map(p => (p.id === id ? { ...p, estado: decision } : p)));
  };

  return (
    <section style={adminPanelSt}>
      <div style={topbarSt}>
        <div>
          <div style={commandLabelSt}>✣ Centro de comando</div>
          <h2 style={pageTitleSt}>Panel de Estadisticas</h2>
          <p style={pageSubtitleSt}>Visitas, interes comercial y oportunidades generadas por tu stand.</p>
        </div>

        <div style={topActionsSt}>
          <label style={searchSt}>
            <span style={{ color: 'rgba(255,255,255,0.42)', fontSize: 14 }}>⌕</span>
            <input placeholder="Buscar en reportes..." style={searchInputSt} />
          </label>
          <button style={iconButtonSt}>◔</button>
          <button style={exportButtonSt}>Exportar datos</button>
        </div>
      </div>

      <div style={kpiGridSt}>
        {[
          { label: 'Visitas totales', valor: '2,845', badge: '+16% esta semana', icon: '◌', tone: '#67e8f9' },
          { label: 'Empresas interesadas', valor: '57', badge: '+8 nuevas', icon: '▤', tone: '#34d399' },
          { label: 'Tiempo promedio', valor: '4m 20s', badge: '+2m al promedio', icon: '◷', tone: '#c084fc' },
          { label: 'Propuestas recibidas', valor: String(propuestas.length), badge: `${propuestasPendientes} pendientes`, icon: '◇', tone: '#fbbf24' },
        ].map(kpi => (
          <article key={kpi.label} style={kpiCardSt}>
            <div style={kpiIconSt(kpi.tone)}>{kpi.icon}</div>
            <span style={kpiBadgeSt(kpi.tone)}>{kpi.badge}</span>
            <div style={kpiLabelSt}>{kpi.label}</div>
            <div style={kpiValueSt}>{kpi.valor}</div>
            <div style={periodTextSt}>vs. periodo anterior</div>
          </article>
        ))}
      </div>

      <div style={mainGridSt}>
        <article style={analyticsCardSt}>
          <div style={cardHeaderSt}>
            <div>
              <div style={sectionLabelSt}>⌁ Live analytics</div>
              <h3 style={cardTitleSt}>Visitas al stand</h3>
              <p style={cardSubtitleSt}>Trafico diario de visitantes y empresas interesadas.</p>
            </div>
            <div style={segmentedSt}>
              {(['semana', 'mes'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setVistaGrafico(v)}
                  style={{
                    ...segmentButtonSt,
                    background: vistaGrafico === v ? 'rgba(103,232,249,0.16)' : 'transparent',
                    color: vistaGrafico === v ? '#67e8f9' : 'rgba(255,255,255,0.46)',
                    borderColor: vistaGrafico === v ? 'rgba(103,232,249,0.35)' : 'transparent',
                  }}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div style={chartWrapSt}>
            <svg width="100%" height="300" viewBox="0 0 940 300" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
              <defs>
                <linearGradient id="adminArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(103,232,249,0.42)" />
                  <stop offset="62%" stopColor="rgba(139,92,246,0.2)" />
                  <stop offset="100%" stopColor="rgba(6,11,41,0)" />
                </linearGradient>
                <linearGradient id="adminLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#67e8f9" />
                  <stop offset="58%" stopColor="#a5b4fc" />
                  <stop offset="100%" stopColor="#f0abfc" />
                </linearGradient>
                <linearGradient id="visitLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="55%" stopColor="#67e8f9" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
                <filter id="adminGlow">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {[76, 126, 176, 226, 276].map(y => (
                <line key={y} x1="0" x2="940" y1={y} y2={y} stroke="rgba(255,255,255,0.07)" strokeDasharray="6 8" />
              ))}
              <path d={visitAreaPath} fill="url(#adminArea)" />
              <path d={visitWavePath} fill="none" stroke="url(#visitLine)" strokeWidth="2.6" filter="url(#adminGlow)" strokeLinecap="round" strokeLinejoin="round" />
              <path d={empresaWavePath} fill="none" stroke="url(#adminLine)" strokeWidth="2.3" filter="url(#adminGlow)" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
            </svg>

            <div style={axisLayerSt}>
              {datos.map(d => (
                <span key={d.label} style={xAxisSt}>{d.label}</span>
              ))}
            </div>
          </div>

          <div style={legendSt}>
            <span style={legendItemSt}><i style={legendDotSt('#67e8f9')} />Visitas</span>
            <span style={legendItemSt}><i style={legendDotSt('#f0abfc')} />Empresas interesadas</span>
            <span style={legendItemSt}><i style={legendDotSt('#fbbf24')} />Propuestas pendientes</span>
          </div>
        </article>

        <article style={activityCardSt}>
          <div style={cardHeaderSt}>
            <div>
              <div style={sectionLabelSt}>Actividad reciente</div>
              <p style={cardSubtitleSt}>Eventos importantes del sistema.</p>
            </div>
            <span style={livePillSt}>● En vivo</span>
          </div>
          <div style={{ display: 'grid', gap: 18, marginTop: 18 }}>
            {[
              { icon: '▤', title: 'Nueva empresa interesada', text: 'Nexus Capital visito el stand.', time: 'Hace 4 min', color: '#67e8f9' },
              { icon: '◇', title: 'Propuesta recibida', text: `${propuestasPendientes} propuestas pendientes de revision.`, time: 'Hace 18 min', color: '#f0abfc' },
              { icon: '◷', title: 'Tiempo promedio actualizado', text: 'La permanencia subio a 4m 20s.', time: 'Hace 42 min', color: '#34d399' },
              { icon: '▣', title: 'Pico de actividad registrado', text: '57 empresas interesadas acumuladas.', time: 'Hace 1 h', color: '#fbbf24' },
              { icon: '⌁', title: 'Zona destacada', text: 'Demo interactiva lidera la retencion.', time: 'Hace 2 h', color: '#a78bfa' },
            ].map(item => (
              <div key={item.title} style={activityItemSt}>
                <div style={activityIconSt(item.color)}>{item.icon}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: 12 }}>{item.title}</div>
                  <div style={activityTextSt}>{item.text}</div>
                </div>
                <span style={activityTimeSt}>{item.time}</span>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div style={insightGridSt}>
        <article style={dataCardSt}>
          <div style={cardHeaderSt}>
            <div>
              <div style={sectionLabelSt}>Embudo de conversion</div>
              <p style={cardSubtitleSt}>Del trafico inicial a propuestas recibidas.</p>
            </div>
            <span style={softPillSt}>28% final</span>
          </div>
          <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
            {embudo.map(item => (
              <div key={item.paso}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ color: 'rgba(226,232,240,0.68)', fontSize: 12 }}>{item.paso}</span>
                  <strong style={{ color: '#fff', fontSize: 12 }}>{item.valor.toLocaleString()}</strong>
                </div>
                <div style={miniTrackSt}>
                  <div style={{
                    width: `${item.pct}%`,
                    height: '100%',
                    borderRadius: 999,
                    background: 'linear-gradient(90deg,#67e8f9,#a78bfa,#f0abfc)',
                    boxShadow: '0 0 16px rgba(103,232,249,0.36)',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article style={dataCardSt}>
          <div style={cardHeaderSt}>
            <div>
              <div style={sectionLabelSt}>Fuentes de trafico</div>
              <p style={cardSubtitleSt}>Origen de visitantes dentro del evento.</p>
            </div>
            <span style={softPillSt}>4 canales</span>
          </div>
          <div style={{ display: 'grid', gap: 14, marginTop: 18 }}>
            {fuentesTrafico.map(fuente => (
              <div key={fuente.canal}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ color: 'rgba(226,232,240,0.68)', fontSize: 12 }}>{fuente.canal}</span>
                  <strong style={{ color: fuente.color, fontSize: 12 }}>{fuente.pct}%</strong>
                </div>
                <div style={miniTrackSt}>
                  <div style={{
                    width: `${fuente.pct}%`,
                    height: '100%',
                    borderRadius: 999,
                    background: fuente.color,
                    boxShadow: `0 0 16px ${fuente.color}88`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article style={dataCardSt}>
          <div style={cardHeaderSt}>
            <div>
              <div style={sectionLabelSt}>Rendimiento por zona</div>
              <p style={cardSubtitleSt}>Secciones del stand con mayor respuesta.</p>
            </div>
            <span style={softPillSt}>Top 3</span>
          </div>
          <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
            {zonasStand.map(zona => (
              <div key={zona.zona} style={zoneRowSt}>
                <div>
                  <div style={{ color: '#fff', fontWeight: 850, fontSize: 12 }}>{zona.zona}</div>
                  <div style={mutedSt}>{zona.retencion} promedio</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#67e8f9', fontWeight: 950 }}>{zona.visitas}</div>
                  <div style={mutedSt}>{zona.estado}</div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div style={bottomGridSt}>
        <article style={dataCardSt}>
          <div style={cardHeaderSt}>
            <div>
              <div style={sectionLabelSt}>Empresas que visitaron tu stand</div>
              <p style={cardSubtitleSt}>Lista de visitantes con nivel de interes.</p>
            </div>
            <span style={softPillSt}>{empresasInteresadas.length} empresas</span>
          </div>

          <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
            {empresasInteresadas.map(emp => (
              <div key={emp.nombre} style={companyRowSt}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={avatarSt}>{emp.nombre.charAt(0)}</div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 800, fontSize: 12 }}>{emp.nombre}</div>
                    <div style={mutedSt}>{emp.sector}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#fff', fontWeight: 900 }}>{emp.visitas}</div>
                    <div style={mutedSt}>visitas</div>
                  </div>
                  <span style={{
                    ...statusPillSt,
                    color: emp.color,
                    borderColor: `${emp.color}55`,
                    background: emp.interes === 'Alto' ? 'rgba(52,211,153,0.1)' : emp.interes === 'Medio' ? 'rgba(251,191,36,0.1)' : 'rgba(255,255,255,0.05)',
                  }}>
                    {emp.interes}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article style={dataCardSt}>
          <div style={cardHeaderSt}>
            <div>
              <div style={sectionLabelSt}>Propuestas de empresas</div>
              <p style={cardSubtitleSt}>Gestiona los contactos recibidos.</p>
            </div>
            <span style={softPillSt}>{propuestasPendientes} activas</span>
          </div>

          <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
            {propuestas.map(prop => (
              <div key={prop.id} style={proposalSt}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 800, fontSize: 12 }}>{prop.empresa}</div>
                    <div style={mutedSt}>{prop.tipo}</div>
                  </div>
                  {prop.estado !== 'pendiente' && (
                    <span style={{
                      ...statusPillSt,
                      color: prop.estado === 'aceptada' ? '#34d399' : 'rgba(255,255,255,0.46)',
                      borderColor: prop.estado === 'aceptada' ? 'rgba(52,211,153,0.36)' : 'rgba(255,255,255,0.12)',
                    }}>
                      {prop.estado}
                    </span>
                  )}
                </div>
                {prop.estado === 'pendiente' && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button onClick={() => accionarPropuesta(prop.id, 'aceptada')} style={primaryButtonSt}>Aceptar contacto</button>
                    <button onClick={() => accionarPropuesta(prop.id, 'declinada')} style={secondaryButtonSt}>Declinar</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>
      </div>

      <div style={bottomGridSt}>
        <article style={dataCardSt}>
          <div style={cardHeaderSt}>
            <div>
              <div style={sectionLabelSt}>Objetivos del evento</div>
              <p style={cardSubtitleSt}>Progreso frente a las metas definidas.</p>
            </div>
            <span style={softPillSt}>Seguimiento</span>
          </div>
          <div style={{ display: 'grid', gap: 14, marginTop: 18 }}>
            {objetivos.map(obj => (
              <div key={obj.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ color: 'rgba(226,232,240,0.68)', fontSize: 12 }}>{obj.label}</span>
                  <strong style={{ color: '#fff', fontSize: 12 }}>{obj.actual} / {obj.meta}</strong>
                </div>
                <div style={miniTrackSt}>
                  <div style={{
                    width: `${obj.pct}%`,
                    height: '100%',
                    borderRadius: 999,
                    background: 'linear-gradient(90deg,#34d399,#67e8f9,#a78bfa)',
                    boxShadow: '0 0 16px rgba(103,232,249,0.32)',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article style={dataCardSt}>
          <div style={cardHeaderSt}>
            <div>
              <div style={sectionLabelSt}>Alertas inteligentes</div>
              <p style={cardSubtitleSt}>Senales relevantes para priorizar acciones.</p>
            </div>
            <span style={softPillSt}>3 nuevas</span>
          </div>
          <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
            {alertas.map(alerta => (
              <div key={alerta.title} style={alertRowSt(alerta.tone)}>
                <div style={alertDotSt(alerta.tone)} />
                <div>
                  <div style={{ color: '#fff', fontWeight: 850, fontSize: 12 }}>{alerta.title}</div>
                  <div style={mutedSt}>{alerta.text}</div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

const adminPanelSt: React.CSSProperties = {
  display: 'grid',
  gap: 18,
  color: '#e8eaf6',
  background:
    'linear-gradient(rgba(103,232,249,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(103,232,249,0.035) 1px, transparent 1px)',
  backgroundSize: '38px 38px',
};

const topbarSt: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 20,
  alignItems: 'center',
  padding: '0 0 18px',
  borderBottom: '1px solid rgba(103,232,249,0.12)',
};

const commandLabelSt: React.CSSProperties = {
  color: '#d8b4fe',
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
};

const pageTitleSt: React.CSSProperties = {
  color: '#fff',
  margin: '6px 0 2px',
  fontSize: 28,
  lineHeight: 1,
  fontWeight: 950,
  letterSpacing: '-0.04em',
};

const pageSubtitleSt: React.CSSProperties = {
  color: 'rgba(226,232,240,0.62)',
  margin: 0,
  fontSize: 13,
};

const topActionsSt: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
};

const searchSt: React.CSSProperties = {
  width: 260,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  gap: 9,
  padding: '0 13px',
  border: '1px solid rgba(148,163,184,0.18)',
  borderRadius: 12,
  background: '#0b132b',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
};

const searchInputSt: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  background: 'transparent',
  border: 0,
  outline: 'none',
  color: '#fff',
  fontSize: 12,
};

const iconButtonSt: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 12,
  border: '1px solid rgba(148,163,184,0.18)',
  background: '#0b132b',
  color: '#f0abfc',
  cursor: 'pointer',
};

const exportButtonSt: React.CSSProperties = {
  height: 40,
  padding: '0 15px',
  borderRadius: 12,
  border: '1px solid rgba(103,232,249,0.24)',
  background: 'linear-gradient(135deg, rgba(103,232,249,0.15), rgba(124,58,237,0.18))',
  color: '#dffbff',
  fontWeight: 850,
  fontSize: 12,
  cursor: 'pointer',
};

const kpiGridSt: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: 14,
};

const kpiCardSt: React.CSSProperties = {
  position: 'relative',
  minHeight: 132,
  padding: '20px 20px 18px',
  borderRadius: 16,
  border: '1px solid rgba(103,232,249,0.17)',
  background: '#0b132b',
  boxShadow: '0 24px 60px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.06)',
  overflow: 'hidden',
};

const kpiIconSt = (tone: string): React.CSSProperties => ({
  width: 38,
  height: 38,
  display: 'grid',
  placeItems: 'center',
  borderRadius: 11,
  color: tone,
  border: `1px solid ${tone}44`,
  background: `${tone}14`,
  boxShadow: `0 0 24px ${tone}18`,
  marginBottom: 18,
});

const kpiBadgeSt = (tone: string): React.CSSProperties => ({
  position: 'absolute',
  top: 18,
  right: 18,
  color: tone,
  background: `${tone}14`,
  border: `1px solid ${tone}22`,
  borderRadius: 999,
  padding: '4px 8px',
  fontSize: 10,
  fontWeight: 850,
});

const kpiLabelSt: React.CSSProperties = {
  color: 'rgba(226,232,240,0.62)',
  fontSize: 12,
  marginBottom: 7,
};

const kpiValueSt: React.CSSProperties = {
  color: '#fff',
  fontSize: 26,
  lineHeight: 1,
  fontWeight: 950,
  letterSpacing: '-0.03em',
};

const periodTextSt: React.CSSProperties = {
  color: 'rgba(148,163,184,0.45)',
  fontSize: 9,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  marginTop: 12,
};

const mainGridSt: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.75fr) minmax(300px, 0.85fr)',
  gap: 16,
};

const analyticsCardSt: React.CSSProperties = {
  minHeight: 410,
  padding: 24,
  borderRadius: 18,
  border: '1px solid rgba(103,232,249,0.16)',
  background: '#0b132b',
  boxShadow: '0 24px 70px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.06)',
  overflow: 'hidden',
};

const activityCardSt: React.CSSProperties = {
  ...analyticsCardSt,
  minHeight: 410,
};

const cardHeaderSt: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 14,
};

const sectionLabelSt: React.CSSProperties = {
  color: '#93c5fd',
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
};

const cardTitleSt: React.CSSProperties = {
  color: '#fff',
  fontSize: 18,
  margin: '10px 0 4px',
  fontWeight: 900,
};

const cardSubtitleSt: React.CSSProperties = {
  color: 'rgba(226,232,240,0.54)',
  fontSize: 12,
  margin: '4px 0 0',
};

const segmentedSt: React.CSSProperties = {
  display: 'flex',
  padding: 3,
  borderRadius: 11,
  background: '#0b132b',
  border: '1px solid rgba(255,255,255,0.08)',
};

const segmentButtonSt: React.CSSProperties = {
  border: '1px solid transparent',
  borderRadius: 8,
  padding: '7px 12px',
  fontSize: 11,
  fontWeight: 850,
  cursor: 'pointer',
};

const chartWrapSt: React.CSSProperties = {
  position: 'relative',
  height: 300,
  marginTop: 22,
  borderRadius: 14,
  overflow: 'hidden',
};

const axisLayerSt: React.CSSProperties = {
  position: 'absolute',
  left: 20,
  right: 20,
  bottom: 10,
  display: 'flex',
  justifyContent: 'space-between',
  pointerEvents: 'none',
};

const xAxisSt: React.CSSProperties = {
  color: 'rgba(226,232,240,0.36)',
  fontSize: 10,
  textAlign: 'center',
};

const legendSt: React.CSSProperties = {
  display: 'flex',
  gap: 26,
  paddingTop: 18,
  color: 'rgba(226,232,240,0.48)',
  fontSize: 11,
};

const legendItemSt: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 7,
};

const legendDotSt = (color: string): React.CSSProperties => ({
  width: 7,
  height: 7,
  display: 'inline-block',
  borderRadius: '50%',
  background: color,
  boxShadow: `0 0 12px ${color}`,
});

const livePillSt: React.CSSProperties = {
  color: '#34d399',
  fontSize: 10,
  fontWeight: 900,
  textTransform: 'uppercase',
};

const activityItemSt: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '38px minmax(0, 1fr) auto',
  alignItems: 'center',
  gap: 12,
};

const activityIconSt = (color: string): React.CSSProperties => ({
  width: 36,
  height: 36,
  display: 'grid',
  placeItems: 'center',
  color,
  borderRadius: 12,
  border: `1px solid ${color}33`,
  background: `${color}12`,
});

const activityTextSt: React.CSSProperties = {
  color: 'rgba(226,232,240,0.48)',
  fontSize: 11,
  marginTop: 3,
};

const activityTimeSt: React.CSSProperties = {
  color: 'rgba(148,163,184,0.42)',
  fontSize: 9,
};

const bottomGridSt: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 16,
};

const insightGridSt: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 16,
};

const dataCardSt: React.CSSProperties = {
  padding: 20,
  borderRadius: 18,
  border: '1px solid rgba(103,232,249,0.15)',
  background: '#0b132b',
  boxShadow: '0 20px 52px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
};

const softPillSt: React.CSSProperties = {
  color: '#67e8f9',
  background: 'rgba(103,232,249,0.1)',
  border: '1px solid rgba(103,232,249,0.2)',
  borderRadius: 999,
  padding: '4px 10px',
  fontSize: 10,
  fontWeight: 900,
};

const companyRowSt: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  padding: '12px 13px',
  background: '#0b132b',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 13,
};

const avatarSt: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 12,
  display: 'grid',
  placeItems: 'center',
  color: '#e0f2fe',
  fontWeight: 950,
  background: '#0b132b',
  border: '1px solid rgba(103,232,249,0.2)',
};

const mutedSt: React.CSSProperties = {
  color: 'rgba(226,232,240,0.43)',
  fontSize: 11,
  marginTop: 3,
};

const miniTrackSt: React.CSSProperties = {
  height: 8,
  borderRadius: 999,
  background: '#0b132b',
  border: '1px solid rgba(255,255,255,0.04)',
  overflow: 'hidden',
};

const zoneRowSt: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 12,
  padding: '13px 14px',
  borderRadius: 13,
  background: '#0b132b',
  border: '1px solid rgba(103,232,249,0.1)',
};

const alertRowSt = (tone: string): React.CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: '10px 1fr',
  gap: 12,
  alignItems: 'center',
  padding: '13px 14px',
  borderRadius: 13,
  background: `${tone}0D`,
  border: `1px solid ${tone}22`,
});

const alertDotSt = (tone: string): React.CSSProperties => ({
  width: 9,
  height: 9,
  borderRadius: '50%',
  background: tone,
  boxShadow: `0 0 14px ${tone}`,
});

const statusPillSt: React.CSSProperties = {
  fontSize: 10,
  padding: '4px 9px',
  borderRadius: 999,
  fontWeight: 900,
  border: '1px solid rgba(255,255,255,0.12)',
};

const proposalSt: React.CSSProperties = {
  padding: '14px 15px',
  borderRadius: 13,
  background: '#0b132b',
  border: '1px solid rgba(255,255,255,0.08)',
};

const primaryButtonSt: React.CSSProperties = {
  flex: 1,
  padding: '8px 0',
  background: 'linear-gradient(90deg,#67e8f9,#a78bfa)',
  color: '#041127',
  border: 0,
  borderRadius: 9,
  fontSize: 11,
  fontWeight: 950,
  cursor: 'pointer',
};

const secondaryButtonSt: React.CSSProperties = {
  padding: '8px 12px',
  background: 'transparent',
  color: 'rgba(226,232,240,0.55)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 9,
  fontSize: 11,
  cursor: 'pointer',
};

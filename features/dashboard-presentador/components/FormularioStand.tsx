'use client';

import React, { useState } from 'react';
import PanelEstadisticas from './PanelEstadisticas';

const wavePath = (points: Array<[number, number]>) => {
  if (!points.length) return '';
  return points.slice(1).reduce((path, [x, y], i) => {
    const [prevX, prevY] = points[i];
    const mid = (x - prevX) / 2;
    return `${path} C ${prevX + mid} ${prevY}, ${x - mid} ${y}, ${x} ${y}`;
  }, `M ${points[0][0]} ${points[0][1]}`);
};

type Section =
  | 'Dashboard'
  | 'Publicar stand'
  | 'Actualizar stand'
  | 'Mis stands'
  | 'Estadisticas'
  | 'Mensajes'
  | 'Agenda'
  | 'Configuracion';

export default function FormularioStand() {
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [teamInput, setTeamInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeStatus, setActiveStatus] = useState('Activo');
  const [activeTab, setActiveTab] = useState<'vis' | 'int'>('vis');
  const [activeSection, setActiveSection] = useState<Section>('Actualizar stand');

  const visData = [38, 55, 72, 60, 100, 80, 90];
  const intData = [22, 40, 55, 42, 88, 65, 72];
  const chartData = activeTab === 'vis' ? visData : intData;
  const maxVal = Math.max(...chartData);
  const days = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
  const conversionData = [18, 32, 28, 45, 64, 58, 76];
  const heatData = [20, 62, 35, 76, 44, 88, 52, 70, 26, 95, 58, 40];
  const chartPoints = chartData.map((v, i) => [i * 48, 104 - v] as [number, number]);
  const conversionPoints = conversionData.map((v, i) => [i * 48, 96 - v] as [number, number]);
  const zonePoints = heatData.map((v, i) => [i * 27, 88 - v * 0.68] as [number, number]);
  const chartWavePath = wavePath(chartPoints);
  const chartAreaPath = `${chartWavePath} L 288 118 L 0 118 Z`;
  const pulseWavePath = wavePath([[0, 108], ...conversionPoints, [288, 24]]);
  const zoneWavePath = wavePath(zonePoints);

  const workspaceItems: Array<{ icon: string; label: Section }> = [
    { icon: '◎', label: 'Dashboard' },
    { icon: '+', label: 'Publicar stand' },
    { icon: '✎', label: 'Actualizar stand' },
    { icon: '▣', label: 'Mis stands' },
    { icon: '◫', label: 'Estadisticas' },
  ];

  const eventItems: Array<{ icon: string; label: Section; badge?: string }> = [
    { icon: '◉', label: 'Mensajes', badge: '3' },
    { icon: '▷', label: 'Agenda' },
    { icon: '⚙', label: 'Configuracion' },
  ];

  const addMember = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const v = teamInput.trim();
    if (!v) return;
    setTeamMembers(prev => [...prev, v]);
    setTeamInput('');
  };

  const removeMember = (i: number) => {
    setTeamMembers(prev => prev.filter((_, idx) => idx !== i));
  };

  const save = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    }, 1400);
  };

  const renderNavButton = (item: { icon: string; label: Section; badge?: string }) => {
    const isActive = activeSection === item.label;

    return (
      <button
        key={item.label}
        onClick={() => setActiveSection(item.label)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 10px',
          borderRadius: 10,
          cursor: 'pointer',
          background: isActive ? 'rgba(0,229,255,0.12)' : 'transparent',
          color: isActive ? '#67e8f9' : 'rgba(255,255,255,0.45)',
          border: isActive ? '1px solid rgba(34,211,238,0.38)' : '1px solid transparent',
          boxShadow: isActive ? '0 0 18px rgba(34,211,238,0.12)' : 'none',
          fontSize: 13,
          textAlign: 'left',
          width: '100%',
        }}
      >
        <span style={{ fontSize: 14 }}>{item.icon}</span>
        {item.label}
        {item.badge && (
          <span style={{
            marginLeft: 'auto',
            background: 'rgba(96,165,250,0.16)',
            color: '#93c5fd',
            fontSize: 10,
            padding: '1px 7px',
            borderRadius: 99,
            fontWeight: 700,
          }}>
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  const renderHeader = (title: string, subtitle: string) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>
          {title}{' '}
          <span style={{
            background: 'linear-gradient(90deg,#00e5ff,#3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            UAPA Verse
          </span>
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', margin: '6px 0 0' }}>{subtitle}</p>
      </div>
      <span style={{
        background: 'rgba(78,202,154,0.12)',
        border: '1px solid rgba(78,202,154,0.3)',
        color: '#4eca9a',
        fontSize: 12,
        padding: '4px 12px',
        borderRadius: 99,
        fontWeight: 600,
      }}>
        ✓ Publicado
      </span>
    </div>
  );

  const renderMetrics = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
      {[
        { label: 'Visitantes', value: '1,245', sub: '+12% esta semana', color: '#4eca9a' },
        { label: 'Interacciones', value: '324', sub: '+7% esta semana', color: '#4eca9a' },
        { label: 'Documentos', value: '18', sub: 'Hace 2 dias', color: 'rgba(255,255,255,0.35)' },
        { label: 'Ranking', value: '#12', sub: '+4 posiciones', color: '#f5a623' },
      ].map(m => (
        <div key={m.label} style={metricCardSt}>
          <div style={smallLabelSt}>{m.label}</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{m.value}</div>
          <div style={{ fontSize: 10, color: m.color, marginTop: 4 }}>{m.sub}</div>
        </div>
      ))}
    </div>
  );

  const renderCharts = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr 0.8fr', gap: 12 }}>
      <div style={neonPanelSt}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={chartLabelSt}>Flujo semanal</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>Comparativa del stand</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {(['vis', 'int'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '6px 13px',
                borderRadius: 9,
                cursor: 'pointer',
                fontSize: 11,
                background: activeTab === tab ? 'rgba(0,229,255,0.14)' : 'rgba(255,255,255,0.03)',
                color: activeTab === tab ? '#67e8f9' : 'rgba(255,255,255,0.42)',
                border: activeTab === tab ? '1px solid rgba(34,211,238,0.45)' : '1px solid rgba(255,255,255,0.07)',
                boxShadow: activeTab === tab ? '0 0 18px rgba(34,211,238,0.18)' : 'none',
              }}>
                {tab === 'vis' ? 'Visitantes' : 'Interacciones'}
              </button>
            ))}
          </div>
        </div>
        <div style={lineChartBoxSt}>
          <svg width="100%" height="126" viewBox="0 0 288 118" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mainTrendLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00e5ff" />
                <stop offset="55%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#c432ff" />
              </linearGradient>
              <linearGradient id="mainTrendArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0,229,255,0.42)" />
                <stop offset="58%" stopColor="rgba(139,92,246,0.2)" />
                <stop offset="100%" stopColor="rgba(196,50,255,0)" />
              </linearGradient>
              <filter id="mainTrendGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {[22, 48, 74, 100].map(y => (
              <line key={y} x1="0" x2="288" y1={y} y2={y} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 7" />
            ))}
            <path d={chartAreaPath} fill="url(#mainTrendArea)" />
            <path d={chartWavePath} fill="none" stroke="url(#mainTrendLine)" strokeWidth="2.4" filter="url(#mainTrendGlow)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {days.map((d, i) => (
            <span key={d} style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 9,
              color: chartData[i] === maxVal ? '#67e8f9' : 'rgba(255,255,255,0.28)',
              fontWeight: chartData[i] === maxVal ? 700 : 400,
            }}>
              {d}
            </span>
          ))}
        </div>
      </div>

      <div style={neonPanelSt}>
        <div style={chartLabelSt}>Pulso de conversion</div>
        <div style={{ height: 120, marginTop: 12, position: 'relative' }}>
          <svg width="100%" height="120" viewBox="0 0 288 110" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pulseLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff9900" />
                <stop offset="52%" stopColor="#f6c05c" />
                <stop offset="100%" stopColor="#d8bc97" />
              </linearGradient>
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {[20, 50, 80].map(y => (
              <line key={y} x1="0" x2="288" y1={y} y2={y} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 7" />
            ))}
            <path d={pulseWavePath} fill="none" stroke="url(#pulseLine)" strokeWidth="2.3" filter="url(#lineGlow)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ position: 'absolute', right: 4, top: 2, fontSize: 24, fontWeight: 800, color: '#fff' }}>76%</div>
          <div style={{ position: 'absolute', right: 6, top: 32, fontSize: 10, color: '#67e8f9' }}>+18.4%</div>
        </div>
      </div>

      <div style={neonPanelSt}>
        <div style={chartLabelSt}>Alcance</div>
        <div style={{ height: 126, display: 'grid', placeItems: 'center', position: 'relative' }}>
          <svg width="116" height="116" viewBox="0 0 116 116">
            <circle cx="58" cy="58" r="44" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
            <circle cx="58" cy="58" r="44" fill="none" stroke="#c432ff" strokeWidth="10" strokeLinecap="round" strokeDasharray="214 276" transform="rotate(-90 58 58)" style={{ filter: 'drop-shadow(0 0 10px rgba(196,50,255,0.72))' }} />
            <circle cx="58" cy="58" r="29" fill="none" stroke="#00e5ff" strokeWidth="8" strokeLinecap="round" strokeDasharray="128 182" transform="rotate(-90 58 58)" style={{ filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.75))' }} />
          </svg>
          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>78</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>score</div>
          </div>
        </div>
      </div>

      <div style={{ ...neonPanelSt, gridColumn: '1 / -1', padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={chartLabelSt}>Mapa de actividad por zona</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>Lobby - Demo - Networking - Descargas</div>
        </div>
        <div style={{ height: 116, position: 'relative' }}>
          <svg width="100%" height="116" viewBox="0 0 300 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="zoneTrendLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="48%" stopColor="#67e8f9" />
                <stop offset="100%" stopColor="#c432ff" />
              </linearGradient>
              <filter id="zoneTrendGlow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {[24, 48, 72, 96].map(y => (
              <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgba(255,255,255,0.07)" strokeDasharray="5 8" />
            ))}
            <path d={zoneWavePath} fill="none" stroke="url(#zoneTrendLine)" strokeWidth="2.4" filter="url(#zoneTrendGlow)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 12 }}>
          {[
            ['Lobby', '88%', '1,024 visitas'],
            ['Demo', '95%', '884 visitas'],
            ['Networking', '70%', '513 visitas'],
            ['Descargas', '62%', '621 acciones'],
          ].map(([zone, pct, detail]) => (
            <div key={zone} style={zoneInfoCardSt}>
              <div style={smallLabelSt}>{zone}</div>
              <div style={{ color: '#fff', fontWeight: 900, fontSize: 18 }}>{pct}</div>
              <div style={mutedTextSt}>{detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStandForm = (mode: 'publish' | 'update') => (
    <div style={panelSt}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>
            {mode === 'publish' ? 'Publicar nuevo stand' : 'Publicar / actualizar stand'}
          </h2>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: '4px 0 0' }}>
            {mode === 'publish' ? 'Crea tu espacio desde cero.' : 'Actualiza tu espacio en el metaverso tecnologico.'}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {[
            ['Calidad del perfil', mode === 'publish' ? '0%' : '86%'],
            ['Recursos cargados', mode === 'publish' ? '0' : '18'],
            ['Revisiones', mode === 'publish' ? 'Nueva' : '2 pendientes'],
            ['Visibilidad sugerida', 'Publica'],
          ].map(([label, value]) => (
            <div key={label} style={{ padding: 12, borderRadius: 13, background: '#0b132b', border: '1px solid rgba(103,232,249,0.12)' }}>
              <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
              <div style={{ color: '#fff', fontWeight: 850, marginTop: 6 }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {[
            { label: 'Nombre del proyecto', placeholder: 'Ej. MediSync AI', type: 'text' },
            { label: 'Categoria', placeholder: '', type: 'select' },
            { label: 'Visibilidad', placeholder: '', type: 'select2' },
          ].map(f => (
            <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label style={labelSt}>{f.label}</label>
              {f.type === 'text' && <input placeholder={f.placeholder} style={inputSt} />}
              {f.type === 'select' && (
                <select style={inputSt}>
                  <option>Tecnologia</option>
                  <option>Educacion</option>
                  <option>Salud</option>
                  <option>Finanzas</option>
                </select>
              )}
              {f.type === 'select2' && (
                <select style={inputSt}>
                  <option>Publica</option>
                  <option>Solo invitados</option>
                  <option>Privada</option>
                </select>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label style={labelSt}>Descripcion</label>
            <textarea rows={2} placeholder="Que hace tu proyecto y que problema resuelve" style={{ ...inputSt, resize: 'none' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label style={labelSt}>Pagina web</label>
            <input placeholder="https://miproyecto.com" style={inputSt} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label style={labelSt}>Redes sociales</label>
            <input placeholder="@miproyecto" style={inputSt} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label style={labelSt}>Integrantes del equipo</label>
            <input value={teamInput} onChange={e => setTeamInput(e.target.value)} onKeyDown={addMember} placeholder="Nombre + Enter para anadir" style={inputSt} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
              {teamMembers.map((m, i) => {
                const ini = m.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
                return (
                  <div key={i} style={chipSt}>
                    <div style={avatarSt}>{ini}</div>
                    {m}
                    <button onClick={() => removeMember(i)} style={closeButtonSt}>x</button>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label style={labelSt}>Logo</label>
            <div style={uploadSt} onClick={() => document.getElementById('logo-inp')?.click()}>
              <span style={{ fontSize: 18, display: 'block', marginBottom: 4, color: 'rgba(255,255,255,0.25)' }}>↑</span>
              PNG / JPG hasta 5 MB
              <input id="logo-inp" type="file" style={{ display: 'none' }} accept="image/*" />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label style={labelSt}>Documentos</label>
            <div style={uploadSt} onClick={() => document.getElementById('docs-inp')?.click()}>
              <span style={{ fontSize: 18, display: 'block', marginBottom: 4, color: 'rgba(255,255,255,0.25)' }}>+</span>
              PDF / DOCX hasta 20 MB
              <input id="docs-inp" type="file" style={{ display: 'none' }} multiple />
            </div>
          </div>
        </div>

        <div>
          <label style={{ ...labelSt, display: 'block', marginBottom: 8 }}>Estado del stand</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Activo', 'En revision', 'Publicado'].map(s => (
              <button key={s} onClick={() => setActiveStatus(s)} style={{
                flex: 1,
                padding: '8px',
                borderRadius: 10,
                cursor: 'pointer',
                fontSize: 13,
                background: activeStatus === s ? 'rgba(0,229,255,0.12)' : 'transparent',
                border: activeStatus === s ? '1px solid rgba(34,211,238,0.45)' : '1px solid rgba(255,255,255,0.1)',
                color: activeStatus === s ? '#67e8f9' : 'rgba(255,255,255,0.4)',
              }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 12 }}>
          <div style={{ padding: 16, borderRadius: 14, border: '1px solid rgba(103,232,249,0.13)', background: 'rgba(0,229,255,0.045)' }}>
            <div style={chartLabelSt}>Checklist de publicacion</div>
            {['Descripcion clara del proyecto', 'Logo y documentos cargados', 'Equipo vinculado', 'Canales de contacto activos'].map((item, i) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 10, color: 'rgba(255,255,255,0.68)', fontSize: 12 }}>
                <span style={{ ...dotSt, background: i < 2 || mode === 'update' ? '#34d399' : '#fbbf24' }} />
                {item}
              </div>
            ))}
          </div>
          <div style={{ padding: 16, borderRadius: 14, border: '1px solid rgba(96,165,250,0.18)', background: '#0b132b' }}>
            <div style={chartLabelSt}>Vista previa</div>
            <h3 style={{ color: '#fff', fontSize: 15, margin: '12px 0 6px' }}>Stand inmersivo</h3>
            <p style={mutedTextSt}>Se mostrara en Lobby, buscador interno y agenda de demos.</p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 4, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <button style={secondaryButtonSt}>Cancelar</button>
          <button disabled={saving} onClick={save} style={{ ...primaryButtonSt, opacity: saving ? 0.6 : 1 }}>
            {saving ? 'Guardando...' : mode === 'publish' ? 'Crear y publicar' : 'Guardar y publicar'}
          </button>
        </div>

        {saved && (
          <div style={successSt}>✓ Stand actualizado correctamente.</div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeSection === 'Dashboard') {
      return (
        <>
          {renderHeader('Dashboard', 'Resumen general de tu presencia en el metaverso tecnologico.')}
          {renderMetrics()}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
            <div>{renderCharts()}</div>
            <div style={panelSt}>
              <h2 style={sectionTitleSt}>Actividad reciente</h2>
              {['Nuevo visitante desde Demo', 'Documento descargado', 'Mensaje recibido', 'Ranking subio 4 posiciones'].map(item => (
                <div key={item} style={listItemSt}>
                  <span style={dotSt} />
                  <span>{item}</span>
                </div>
              ))}
              <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={chartLabelSt}>Estado operativo</div>
                {[
                  ['Sincronizacion', '98%'],
                  ['Solicitudes atendidas', '24/31'],
                  ['Tiempo activo', '99.8%'],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, color: 'rgba(255,255,255,0.68)', fontSize: 12 }}>
                    <span>{label}</span>
                    <strong style={{ color: '#67e8f9' }}>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      );
    }

    if (activeSection === 'Publicar stand') {
      return (
        <>
          {renderHeader('Publicar stand', 'Crea un nuevo espacio para mostrar tu proyecto.')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              ['Paso 1', 'Completa la informacion base'],
              ['Paso 2', 'Sube identidad visual y documentos'],
              ['Paso 3', 'Publica para revision del evento'],
            ].map(([step, text]) => (
              <div key={step} style={panelSt}>
                <div style={chartLabelSt}>{step}</div>
                <p style={{ ...mutedTextSt, marginTop: 10 }}>{text}</p>
              </div>
            ))}
          </div>
          {renderStandForm('publish')}
        </>
      );
    }

    if (activeSection === 'Actualizar stand') {
      return (
        <>
          {renderHeader('Gestion de', 'Administra tu presencia en el metaverso tecnologico.')}
          {renderMetrics()}
          {renderCharts()}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              ['SEO del stand', 'Titulo, categoria y etiquetas optimizadas.'],
              ['Recursos publicos', '18 documentos disponibles para visitantes.'],
              ['Revision pendiente', '2 cambios esperan aprobacion del equipo.'],
            ].map(([title, text]) => (
              <div key={title} style={panelSt}>
                <div style={chartLabelSt}>{title}</div>
                <p style={{ ...mutedTextSt, marginTop: 10 }}>{text}</p>
              </div>
            ))}
          </div>
          {renderStandForm('update')}
        </>
      );
    }

    if (activeSection === 'Mis stands') {
      return (
        <>
          {renderHeader('Mis stands', 'Consulta y administra tus espacios publicados.')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { name: 'ExpoTech 2026', estado: 'Publicado', visitas: '1,245', leads: '57', salud: 'Optimo' },
              { name: 'MediSync AI', estado: 'En revision', visitas: '684', leads: '21', salud: 'Validando' },
              { name: 'Cyber Lab', estado: 'Borrador', visitas: '0', leads: '0', salud: 'Pendiente' },
            ].map((stand, i) => (
              <div key={stand.name} style={panelSt}>
                <div style={chartLabelSt}>Stand #{i + 1}</div>
                <h2 style={sectionTitleSt}>{stand.name}</h2>
                <p style={mutedTextSt}>Estado: {stand.estado}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 16 }}>
                  {[
                    ['Visitas', stand.visitas],
                    ['Leads', stand.leads],
                    ['Salud', stand.salud],
                  ].map(([label, value]) => (
                    <div key={label} style={{ padding: 10, borderRadius: 12, background: '#0b132b', border: '1px solid rgba(103,232,249,0.12)' }}>
                      <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: 10 }}>{label}</div>
                      <div style={{ color: '#fff', fontWeight: 800, fontSize: 12, marginTop: 4 }}>{value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
                  <button style={primaryButtonSt}>Editar</button>
                  <button style={secondaryButtonSt}>Ver</button>
                </div>
              </div>
            ))}
          </div>
          <div style={panelSt}>
            <div style={chartLabelSt}>Resumen del portafolio</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 14 }}>
              {[
                ['Publicados', '1'],
                ['En revision', '1'],
                ['Borradores', '1'],
                ['Leads totales', '78'],
              ].map(([label, value]) => (
                <div key={label} style={{ padding: 12, borderRadius: 12, background: '#0b132b', border: '1px solid rgba(103,232,249,0.12)' }}>
                  <div style={mutedTextSt}>{label}</div>
                  <div style={{ color: '#fff', fontWeight: 900, fontSize: 20, marginTop: 4 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }

    if (activeSection === 'Estadisticas') {
      return (
        <>
          <PanelEstadisticas />
        </>
      );
    }

    if (activeSection === 'Mensajes') {
      return (
        <>
          {renderHeader('Mensajes', 'Conversaciones recientes con visitantes y aliados.')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {[
              ['Sin leer', '3'],
              ['Prioridad alta', '2'],
              ['Reuniones solicitadas', '4'],
              ['Tiempo respuesta', '12m'],
            ].map(([label, value]) => (
              <div key={label} style={metricCardSt}>
                <div style={smallLabelSt}>{label}</div>
                <div style={{ color: '#fff', fontSize: 24, fontWeight: 900 }}>{value}</div>
              </div>
            ))}
          </div>
          <div style={panelSt}>
            {[
              'Ana Torres quiere una demo del producto.',
              'Equipo CADESOFT solicito brochure.',
              'Nuevo contacto desde zona Networking.',
              'Nexus Capital pidio una reunion privada.',
              'TechVentures marco tu propuesta como favorita.',
            ].map((msg, i) => (
              <div key={msg} style={listItemSt}>
                <div style={avatarSt}>{['AT', 'CA', 'NC', 'NX', 'TV'][i]}</div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700 }}>{msg}</div>
                  <div style={mutedTextSt}>Prioridad {i < 2 ? 'alta' : 'media'} · Hace {i + 1} hora{i ? 's' : ''}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }

    if (activeSection === 'Agenda') {
      return (
        <>
          {renderHeader('Agenda', 'Organiza tus charlas, demos y reuniones del evento.')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              ['Eventos de hoy', '3'],
              ['Asistentes esperados', '66'],
              ['Bloques disponibles', '5'],
            ].map(([label, value]) => (
              <div key={label} style={metricCardSt}>
                <div style={smallLabelSt}>{label}</div>
                <div style={{ color: '#fff', fontSize: 24, fontWeight: 900 }}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { item: '10:00 - Demo tecnica', sala: 'Sala Demo A', asistentes: '18 inscritos', estado: 'Lista' },
              { item: '13:30 - Reunion con inversionistas', sala: 'Networking privado', asistentes: '6 confirmados', estado: 'Prioritaria' },
              { item: '16:00 - Pitch en auditorio virtual', sala: 'Auditorio 2', asistentes: '42 inscritos', estado: 'En agenda' },
            ].map(evento => (
              <div key={evento.item} style={panelSt}>
                <div style={chartLabelSt}>Programado</div>
                <h2 style={sectionTitleSt}>{evento.item}</h2>
                <p style={mutedTextSt}>{evento.sala} · {evento.asistentes} · {evento.estado}</p>
              </div>
            ))}
          </div>
        </>
      );
    }

    return (
      <>
        {renderHeader('Configuracion', 'Ajusta permisos, notificaciones y preferencias del stand.')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            ['Rol actual', 'Administrador'],
            ['Seguridad', '2FA activo'],
            ['Integraciones', '4 conectadas'],
          ].map(([label, value]) => (
            <div key={label} style={metricCardSt}>
              <div style={smallLabelSt}>{label}</div>
              <div style={{ color: '#fff', fontSize: 20, fontWeight: 900 }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={panelSt}>
          {[
            'Notificaciones por correo',
            'Modo publico del stand',
            'Permitir mensajes de visitantes',
            'Aprobacion manual de propuestas',
            'Mostrar metricas al equipo',
            'Activar alertas de alto trafico',
          ].map(item => (
            <label key={item} style={{ ...listItemSt, justifyContent: 'space-between', cursor: 'pointer' }}>
              <span>{item}</span>
              <input type="checkbox" defaultChecked style={{ accentColor: '#00e5ff' }} />
            </label>
          ))}
        </div>
      </>
    );
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      background:
        'radial-gradient(circle at 80% 10%, rgba(0,229,255,0.12), transparent 28%), radial-gradient(circle at 35% 70%, rgba(96,165,250,0.12), transparent 26%), #0b132b',
      color: '#e8eaf6',
      fontSize: 14,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <aside style={sidebarSt}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px 20px' }}>
          <div style={logoSt}>UV</div>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}>
            UAPA <span style={{ color: '#67e8f9' }}>VERSE</span>
          </span>
        </div>

        <div style={menuLabelSt}>Espacio de trabajo</div>
        {workspaceItems.map(renderNavButton)}

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '12px 0' }} />

        <div style={menuLabelSt}>Evento</div>
        {eventItems.map(renderNavButton)}

        <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 8px' }}>
            <div style={smallLogoSt}>ET</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>ExpoTech 2026</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4eca9a', display: 'inline-block' }} />
                Publicado
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main style={{ flex: 1, minWidth: 0, height: '100vh', overflowY: 'auto' }}>
        <div style={{ padding: '28px 32px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

const sidebarSt: React.CSSProperties = {
  width: 220,
  borderRight: '1px solid rgba(255,255,255,0.07)',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 12px',
  gap: 2,
  background: '#0b132b',
  zIndex: 10,
};

const logoSt: React.CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: '50%',
  background: 'linear-gradient(135deg,#00e5ff,#3b82f6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 11,
  fontWeight: 800,
  color: '#fff',
  boxShadow: '0 0 22px rgba(0,229,255,0.28)',
};

const smallLogoSt: React.CSSProperties = {
  ...logoSt,
  width: 30,
  height: 30,
  fontSize: 10,
};

const menuLabelSt: React.CSSProperties = {
  fontSize: 10,
  color: 'rgba(255,255,255,0.25)',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  padding: '0 8px 8px',
};

const inputSt: React.CSSProperties = {
  background: '#0b132b',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '9px 12px',
  fontSize: 13,
  color: '#e8eaf6',
  outline: 'none',
  fontFamily: 'sans-serif',
  width: '100%',
  boxSizing: 'border-box',
};

const labelSt: React.CSSProperties = {
  fontSize: 11,
  color: 'rgba(255,255,255,0.5)',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  fontWeight: 600,
};

const uploadSt: React.CSSProperties = {
  background: '#0b132b',
  border: '1px dashed rgba(255,255,255,0.12)',
  borderRadius: 10,
  padding: '14px 10px',
  textAlign: 'center',
  cursor: 'pointer',
  color: 'rgba(255,255,255,0.3)',
  fontSize: 12,
};

const panelSt: React.CSSProperties = {
  background: '#0b132b',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: 20,
  padding: '24px 26px',
  boxShadow: '0 18px 42px rgba(0,0,0,0.22)',
};

const metricCardSt: React.CSSProperties = {
  background: '#0b132b',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 14,
  padding: '12px 16px',
};

const smallLabelSt: React.CSSProperties = {
  fontSize: 10,
  color: 'rgba(255,255,255,0.35)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: 6,
};

const neonPanelSt: React.CSSProperties = {
  background:
    'linear-gradient(145deg, #0b132b, #0b132b), radial-gradient(circle at top right, rgba(0,229,255,0.14), transparent 42%)',
  border: '1px solid rgba(103,232,249,0.16)',
  borderRadius: 16,
  padding: '16px 18px',
  boxShadow: '0 0 0 1px rgba(96,165,250,0.06), 0 18px 42px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.06)',
  overflow: 'hidden',
};

const lineChartBoxSt: React.CSSProperties = {
  height: 126,
  padding: '6px 0 0',
  background: 'linear-gradient(180deg, rgba(34,211,238,0.07), transparent)',
  borderRadius: 10,
  overflow: 'hidden',
};

const zoneInfoCardSt: React.CSSProperties = {
  padding: 12,
  borderRadius: 12,
  background: 'linear-gradient(145deg, rgba(11,19,43,0.98), rgba(24,18,54,0.92))',
  border: '1px solid rgba(196,50,255,0.16)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
};

const chartLabelSt: React.CSSProperties = {
  fontSize: 10,
  color: '#67e8f9',
  textTransform: 'uppercase',
  letterSpacing: '0.11em',
  fontWeight: 800,
  textShadow: '0 0 12px rgba(103,232,249,0.45)',
};

const sectionTitleSt: React.CSSProperties = {
  color: '#fff',
  fontSize: 17,
  fontWeight: 800,
  margin: '8px 0 4px',
};

const mutedTextSt: React.CSSProperties = {
  color: 'rgba(255,255,255,0.42)',
  fontSize: 12,
  margin: 0,
};

const listItemSt: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '12px 0',
  color: 'rgba(255,255,255,0.72)',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
};

const dotSt: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: '#67e8f9',
  boxShadow: '0 0 14px rgba(103,232,249,0.8)',
};

const chipSt: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 5,
  background: 'rgba(0,229,255,0.12)',
  border: '1px solid rgba(34,211,238,0.28)',
  borderRadius: 99,
  padding: '3px 10px 3px 5px',
  fontSize: 11,
  color: 'rgba(255,255,255,0.76)',
};

const avatarSt: React.CSSProperties = {
  width: 22,
  height: 22,
  borderRadius: '50%',
  background: 'linear-gradient(135deg,#00e5ff,#3b82f6)',
  fontSize: 9,
  fontWeight: 800,
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const closeButtonSt: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'rgba(255,255,255,0.35)',
  fontSize: 11,
  padding: 0,
  lineHeight: 1,
};

const primaryButtonSt: React.CSSProperties = {
  padding: '9px 18px',
  borderRadius: 10,
  border: 'none',
  background: 'linear-gradient(90deg,#00e5ff,#3b82f6)',
  color: '#fff',
  fontSize: 13,
  fontWeight: 800,
  cursor: 'pointer',
};

const secondaryButtonSt: React.CSSProperties = {
  padding: '9px 18px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'transparent',
  color: 'rgba(255,255,255,0.52)',
  fontSize: 13,
  cursor: 'pointer',
};

const successSt: React.CSSProperties = {
  background: 'rgba(78,202,154,0.1)',
  border: '1px solid rgba(78,202,154,0.25)',
  borderRadius: 10,
  padding: '11px 14px',
  color: '#4eca9a',
  fontSize: 13,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};
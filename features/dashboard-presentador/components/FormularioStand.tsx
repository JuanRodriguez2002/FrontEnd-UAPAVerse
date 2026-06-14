'use client';

import React, { useState } from 'react';

export default function FormularioStand() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div style={{ background: '#0a0f2e', minHeight: '100vh', display: 'flex', fontFamily: 'sans-serif' }}>

      {/* Sidebar */}
      <div style={{ width: 190, background: '#080d27', padding: '20px 0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '0 16px 24px', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Exhibitor Hub</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>CADESOFT PARTNER</div>
        </div>
        <nav style={{ padding: '16px 0', flex: 1 }}>
          {[
            { label: 'Publish Stand', icon: '🚀', active: true },
            { label: 'My Stands', icon: '🗂️' },
            { label: 'Results', icon: '📊' },
            { label: 'Messages', icon: '💬' },
            { label: 'Settings', icon: '⚙️' },
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
            <span>🚪</span> Logout
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '28px 28px 28px 24px', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>Publish Stand</h1>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
            La información se sincroniza de forma inmediata al ecosistema de la feria.
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '0.5px solid rgba(255,255,255,0.1)',
          borderRadius: 16,
          padding: 28,
          maxWidth: 680,
        }}>

          {/* Card header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 10,
              background: 'rgba(99,102,241,0.2)',
              border: '0.5px solid rgba(99,102,241,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="20" height="20" fill="none" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>Tu Stand de Innovación</h2>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>
                La información se sincroniza de forma inmediata al ecosistema de la feria.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Campo: Nombre Comercial */}
            <div>
              <label style={{
                display: 'block', fontSize: 10, fontWeight: 700,
                color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em',
                textTransform: 'uppercase', marginBottom: 8,
              }}>
                Nombre Comercial del Proyecto
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Sistema Cuántico de Encriptación de Datos"
                style={{
                  width: '100%', padding: '10px 14px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '0.5px solid rgba(255,255,255,0.12)',
                  borderRadius: 10, color: '#fff', fontSize: 13,
                  outline: 'none', fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(99,102,241,0.6)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
              />
            </div>

            {/* Campo: Propuesta de Valor */}
            <div>
              <label style={{
                display: 'block', fontSize: 10, fontWeight: 700,
                color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em',
                textTransform: 'uppercase', marginBottom: 8,
              }}>
                Propuesta de Valor Técnica
              </label>
              <textarea
                rows={4}
                required
                placeholder="Detalla el problema que resuelves, el TRL de la tecnología y tus ventajas competitivas..."
                style={{
                  width: '100%', padding: '10px 14px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '0.5px solid rgba(255,255,255,0.12)',
                  borderRadius: 10, color: '#fff', fontSize: 13,
                  outline: 'none', fontFamily: 'inherit', resize: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(99,102,241,0.6)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
              />
            </div>

            {/* Campo: Documentos */}
            <div>
              <label style={{
                display: 'block', fontSize: 10, fontWeight: 700,
                color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em',
                textTransform: 'uppercase', marginBottom: 8,
              }}>
                Documentos y Entregables Públicos
              </label>
              <div style={{
                border: '1.5px dashed rgba(255,255,255,0.12)',
                borderRadius: 10, padding: '24px 16px',
                textAlign: 'center', cursor: 'pointer',
                background: 'rgba(255,255,255,0.03)',
                position: 'relative',
                transition: 'border-color 0.15s',
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(99,102,241,0.5)')}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.12)')}
              >
                <input type="file" multiple style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                <svg width="32" height="32" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ margin: '0 auto 10px' }}>
                  <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
                  Arrastra tus archivos o{' '}
                  <span style={{ color: '#a5b4fc', textDecoration: 'underline' }}>búscalos localmente</span>
                </p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 6 }}>
                  Soporta PDFs, Blueprints y Whitepapers (Max. 50MB)
                </p>
              </div>
            </div>

            {/* Botón submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '11px 16px',
                background: loading ? 'rgba(99,102,241,0.5)' : '#6366f1',
                color: '#fff', fontSize: 13, fontWeight: 600,
                border: 'none', borderRadius: 10, cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'background 0.15s',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#5457d8'; }}
              onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#6366f1'; }}
            >
              {loading ? (
                <div style={{
                  width: 18, height: 18,
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite',
                }} />
              ) : (
                <>
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  Guardar y Desplegar Cambios
                </>
              )}
            </button>
          </form>

          {/* Success banner */}
          {success && (
            <div style={{
              marginTop: 16, padding: '12px 16px',
              background: 'rgba(52,211,153,0.1)',
              border: '0.5px solid rgba(52,211,153,0.25)',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#34d399', flexShrink: 0,
                boxShadow: '0 0 6px rgba(52,211,153,0.6)',
              }} />
              <span style={{ fontSize: 12, color: '#34d399', fontWeight: 500 }}>
                Cambios inyectados al servidor y propagados en tiempo real de forma exitosa.
              </span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}
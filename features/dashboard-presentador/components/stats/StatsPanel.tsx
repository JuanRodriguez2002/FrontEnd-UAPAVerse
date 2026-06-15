"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Building2, Eye, MessageSquare } from "lucide-react";
import type { PresenterStats } from "@/features/dashboard-presentador/services/standService";

type StatsPanelProps = {
  stats: PresenterStats | null;
  loading: boolean;
};

const METRICS = [
  { key: "totalVisitas" as const, growthKey: "visitasGrowth" as const, label: "Total de visitas", Icon: Eye, tone: "from-[#1f97e7]/25 to-[#1f97e7]/5 text-primary", glow: "bg-[#1f97e7]" },
  { key: "empresasInteresadas" as const, growthKey: "empresasGrowth" as const, label: "Empresas interesadas", Icon: Building2, tone: "from-[#a300ec]/25 to-[#a300ec]/5 text-secondary", glow: "bg-[#a300ec]" },
  { key: "propuestasRecibidas" as const, growthKey: "propuestasGrowth" as const, label: "Propuestas recibidas", Icon: MessageSquare, tone: "from-[#5aa8ff]/25 to-[#5aa8ff]/5 text-[#79ddff]", glow: "bg-[#5aa8ff]" },
];

/* ── helpers ── */
function buildPath(data: number[], W: number, H: number) {
  if (data.length < 2) return { line: "", area: "" };
  const max = Math.max(...data, 1);
  const pts = data.map((v, i) => ({ x: (i / (data.length - 1)) * W, y: H - (v / max) * (H * 0.85) - H * 0.05 }));
  const line = pts.map((p, i) => {
    if (i === 0) return `M${p.x},${p.y}`;
    const prev = pts[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `C${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`;
  }).join(" ");
  const area = `${line} L${pts.at(-1)!.x},${H} L0,${H} Z`;
  return { line, area };
}

function pathLength(d: string): number {
  if (typeof document === "undefined" || !d) return 1000;
  try {
    const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
    el.setAttribute("d", d);
    return el.getTotalLength() || 1000;
  } catch { return 1000; }
}

/* ── Animated line chart ── */
function LineChart({ stats }: { stats: PresenterStats }) {
  const W = 700; const H = 200;
  const [drawn, setDrawn] = useState(false);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; dia: string; visitas: number; propuestas: number } | null>(null);

  const vData = stats.tendencia14Dias.map((d) => d.visitas);
  const pData = stats.tendencia14Dias.map((d) => d.propuestas * 8);
  const vPath = buildPath(vData, W, H);
  const pPath = buildPath(pData, W, H);
  const vLen = useRef(0);
  const pLen = useRef(0);

  useEffect(() => {
    vLen.current = pathLength(vPath.line);
    pLen.current = pathLength(pPath.line);
    const t = setTimeout(() => setDrawn(true), 120);
    return () => clearTimeout(t);
  }, [vPath.line, pPath.line]);

  const maxV = Math.max(...vData, 1);
  const pts = stats.tendencia14Dias.map((d, i) => ({
    x: (i / (stats.tendencia14Dias.length - 1)) * W,
    y: H - (d.visitas / maxV) * (H * 0.85) - H * 0.05,
    ...d,
  }));

  return (
    <div className="relative">
      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 min-w-[7rem] rounded-xl border border-white/10 bg-[#09164b]/95 px-3 py-2 shadow-xl backdrop-blur text-xs"
          style={{ left: `${(tooltip.x / W) * 100}%`, top: `${(tooltip.y / H) * 100 - 28}%`, transform: "translate(-50%,-100%)" }}
        >
          <p className="font-space font-bold text-neon-white">{tooltip.dia}</p>
          <p className="text-[#ffb86b]">Visitas: <span className="font-bold">{tooltip.visitas}</span></p>
          <p className="text-[#5aa8ff]">Propuestas: <span className="font-bold">{tooltip.propuestas}</span></p>
        </div>
      )}

      <div className="relative h-52 w-full">
        <div className="absolute inset-0 flex flex-col justify-between pb-7">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border-t border-dashed border-white/[0.07]" />
          ))}
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="relative h-[calc(100%-1.75rem)] w-full"
          preserveAspectRatio="none"
          onMouseLeave={() => setTooltip(null)}
        >
          <defs>
            <linearGradient id="sg-v" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffb86b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffb86b" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sg-p" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#5aa8ff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#5aa8ff" stopOpacity="0" />
            </linearGradient>
            <filter id="glow-line">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* areas */}
          <path d={vPath.area} fill="url(#sg-v)" style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.8s ease" }} />
          <path d={pPath.area} fill="url(#sg-p)" style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.8s ease 0.2s" }} />

          {/* lines — animated draw */}
          <path d={vPath.line} fill="none" stroke="#ffb86b" strokeWidth="2.5" strokeLinecap="round"
            filter="url(#glow-line)"
            style={{
              strokeDasharray: vLen.current,
              strokeDashoffset: drawn ? 0 : vLen.current,
              transition: `stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)`,
            }}
          />
          <path d={pPath.line} fill="none" stroke="#5aa8ff" strokeWidth="2.5" strokeLinecap="round"
            filter="url(#glow-line)"
            style={{
              strokeDasharray: pLen.current,
              strokeDashoffset: drawn ? 0 : pLen.current,
              transition: `stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1) 0.15s`,
            }}
          />

          {/* hover points */}
          {pts.map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="18" fill="transparent"
              onMouseEnter={() => setTooltip({ x: pt.x, y: pt.y, dia: pt.dia, visitas: pt.visitas, propuestas: pt.propuestas })}
            />
          ))}
          {tooltip && (
            <circle cx={tooltip.x} cy={tooltip.y} r="5" fill="#000c43" stroke="#ffb86b" strokeWidth="3"
              style={{ filter: "drop-shadow(0 0 6px #ffb86b)" }}
            />
          )}
        </svg>

        <div className="absolute bottom-0 left-0 right-0 flex justify-between font-space text-[9px] text-[#667495]">
          {stats.tendencia14Dias.map((d) => <span key={d.dia}>{d.dia}</span>)}
        </div>
      </div>

      <div className="mt-4 flex gap-5 border-t border-white/[0.07] pt-4">
        <div className="flex items-center gap-2"><span className="h-2 w-5 rounded-full bg-[#ffb86b]" /><span className="font-space text-[10px] text-[#8f9bb8]">visitas</span></div>
        <div className="flex items-center gap-2"><span className="h-2 w-5 rounded-full bg-[#5aa8ff]" /><span className="font-space text-[10px] text-[#8f9bb8]">propuestas</span></div>
      </div>
    </div>
  );
}

/* ── Animated donut ── */
function DonutChart({ sectors }: { sectors: PresenterStats["porSector"] }) {
  const SIZE = 160; const r = 58; const cx = SIZE / 2; const cy = SIZE / 2;
  const circ = 2 * Math.PI * r;
  const [drawn, setDrawn] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => { const t = setTimeout(() => setDrawn(true), 250); return () => clearTimeout(t); }, []);

  /* pre-compute offsets (needs stable cumulative, not inside render map) */
  const segments = sectors.reduce<{ sector: string; pct: number; color: string; offset: number }[]>((acc, s) => {
    const prev = acc.at(-1);
    const cumPct = prev ? 100 - (prev.offset / circ) * 100 - prev.pct : 0;
    acc.push({ ...s, offset: circ - (cumPct / 100) * circ });
    return acc;
  }, []);

  const hovSector = hovered ? sectors.find((s) => s.sector === hovered) : null;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">
      <div className="relative shrink-0">
        <svg width={SIZE} height={SIZE}>
          {/* track */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="18" />
          {segments.map(({ sector, pct, color, offset }) => {
            const dash = drawn ? (pct / 100) * circ : 0;
            const isHov = hovered === sector;
            return (
              <circle key={sector} cx={cx} cy={cy} r={r}
                fill="none"
                stroke={color}
                strokeWidth={isHov ? 22 : 16}
                strokeDasharray={`${dash} ${circ - dash}`}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${cx} ${cy})`}
                onMouseEnter={() => setHovered(sector)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  transition: `stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1) ${sectors.indexOf(sectors.find(s=>s.sector===sector)!) * 0.08}s, stroke-width 0.2s ease`,
                  cursor: "pointer",
                  filter: isHov ? `drop-shadow(0 0 10px ${color})` : "none",
                }}
              />
            );
          })}
          {/* center fill */}
          <circle cx={cx} cy={cy} r={r - 14} fill="#000837" />
          {/* center text */}
          {hovSector ? (
            <>
              <text x={cx} y={cy - 6} textAnchor="middle" fill="white" fontSize="18" fontWeight="800" fontFamily="Sora, sans-serif">{hovSector.pct}%</text>
              <text x={cx} y={cy + 12} textAnchor="middle" fill="#8f9bb8" fontSize="9" fontFamily="Space Grotesk, sans-serif">{hovSector.sector}</text>
            </>
          ) : (
            <>
              <text x={cx} y={cy - 4} textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="Sora, sans-serif">Sector</text>
              <text x={cx} y={cy + 12} textAnchor="middle" fill="#657394" fontSize="9" fontFamily="Space Grotesk, sans-serif">Hover para ver</text>
            </>
          )}
        </svg>
      </div>

      <ul className="flex-1 w-full space-y-1.5 min-w-0">
        {sectors.map(({ sector, pct, color }) => (
          <li key={sector}
            className={`flex cursor-default items-center gap-2 rounded-xl px-2 py-1.5 transition-colors duration-150 ${hovered === sector ? "bg-white/5" : "hover:bg-white/[0.03]"}`}
            onMouseEnter={() => setHovered(sector)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 5px ${color}` }} />
            <span className="truncate text-xs text-[#8f9bb8]">{sector}</span>
            <span className="ml-auto shrink-0 font-space text-xs font-bold text-neon-white">{pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Animated bar chart ── */
function BarChart({ data }: { data: PresenterStats["visitasPorHora"] }) {
  const [drawn, setDrawn] = useState(false);
  const [tooltip, setTooltip] = useState<{ idx: number; hora: string; visitas: number } | null>(null);
  const maxV = Math.max(...data.map((d) => d.visitas), 1);
  const H = 120;
  const BAR_W = 18;
  const GAP = 28;
  const TOTAL_W = data.length * (BAR_W + GAP);

  useEffect(() => { const t = setTimeout(() => setDrawn(true), 300); return () => clearTimeout(t); }, []);

  return (
    <div className="relative" onMouseLeave={() => setTooltip(null)}>
      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 rounded-xl border border-white/10 bg-[#09164b]/95 px-3 py-2 text-xs shadow-xl backdrop-blur"
          style={{ left: `${((tooltip.idx * (BAR_W + GAP) + BAR_W / 2) / TOTAL_W) * 100}%`, top: 0, transform: "translateX(-50%)" }}
        >
          <p className="font-space font-bold text-neon-white">{tooltip.hora}:00 h</p>
          <p className="text-[#ffb86b]">{tooltip.visitas} visitas</p>
        </div>
      )}

      <svg viewBox={`0 0 ${TOTAL_W} ${H}`} className="w-full" style={{ height: `${H}px` }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="bar-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffca80" />
            <stop offset="100%" stopColor="#ff8c42" />
          </linearGradient>
          <linearGradient id="bar-grad-hov" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffe0a0" />
            <stop offset="100%" stopColor="#ff6b1a" />
          </linearGradient>
        </defs>
        {data.map(({ hora, visitas }, i) => {
          const barH = drawn ? (visitas / maxV) * (H - 8) : 0;
          const x = i * (BAR_W + GAP) + GAP / 2;
          const isHov = tooltip?.idx === i;
          return (
            <rect key={hora}
              x={x} y={H - barH} width={BAR_W} height={barH} rx="4"
              fill={isHov ? "url(#bar-grad-hov)" : "url(#bar-grad)"}
              opacity={isHov ? 1 : 0.85}
              onMouseEnter={() => setTooltip({ idx: i, hora, visitas })}
              style={{
                transition: `y ${0.5 + i * 0.035}s cubic-bezier(0.34,1.56,0.64,1), height ${0.5 + i * 0.035}s cubic-bezier(0.34,1.56,0.64,1)`,
                filter: isHov ? "drop-shadow(0 0 8px rgba(255,184,107,0.8))" : "none",
                cursor: "pointer",
              }}
            />
          );
        })}
      </svg>

      <div className="mt-2 flex justify-between font-space text-[9px] text-[#667495]">
        {data.map(({ hora }) => <span key={hora}>{hora}h</span>)}
      </div>
    </div>
  );
}

/* ── Main StatsPanel ── */
export function StatsPanel({ stats, loading }: StatsPanelProps) {
  const [counters, setCounters] = useState({ totalVisitas: 0, empresasInteresadas: 0, propuestasRecibidas: 0 });

  useEffect(() => {
    if (!stats) return;
    const targets = { totalVisitas: stats.totalVisitas, empresasInteresadas: stats.empresasInteresadas, propuestasRecibidas: stats.propuestasRecibidas };
    const duration = 1200;
    const start = performance.now();
    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCounters({
        totalVisitas: Math.round(targets.totalVisitas * ease),
        empresasInteresadas: Math.round(targets.empresasInteresadas * ease),
        propuestasRecibidas: Math.round(targets.propuestasRecibidas * ease),
      });
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [stats]);

  const cardClass = "rounded-2xl border border-white/10 bg-[#0e1a4f]/60 p-6 shadow-[0_8px_30px_rgba(0,4,35,0.22),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl";

  return (
    <div className="space-y-5">

      {/* ── Metric cards con conteo animado ── */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {METRICS.map(({ key, growthKey, label, Icon, tone, glow }) => {
          const growth = stats?.[growthKey] ?? 0;
          return (
            <article key={key}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e1a4f]/60 p-5 shadow-[0_16px_50px_rgba(0,4,35,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary/25 cursor-default"
            >
              <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${glow} opacity-10 blur-3xl transition group-hover:opacity-30`} />
              <div className="mb-5 flex items-start justify-between">
                <div className={`rounded-xl border border-white/10 bg-gradient-to-br p-2.5 ${tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="flex items-center gap-1 rounded-full bg-[#77f6c6]/10 px-2 py-1 font-space text-[10px] font-bold text-[#77f6c6]">
                  <ArrowUpRight className="h-3 w-3" />{growth}%
                </span>
              </div>
              <p className="text-xs font-semibold text-[#8f9bb8]">{label}</p>
              {loading ? (
                <div className="mt-2 h-8 w-24 animate-pulse rounded-lg bg-white/10" />
              ) : (
                <p className="mt-1 font-sora text-2xl font-extrabold tracking-tight text-neon-white tabular-nums">
                  {counters[key].toLocaleString("en-US")}
                </p>
              )}
              <p className="mt-3 font-space text-[9px] uppercase tracking-[0.15em] text-[#657394]">vs. semana anterior</p>
            </article>
          );
        })}
      </section>

      {/* ── Fila 1: Línea (izq) + Donut (der) ── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_380px]">
        <section className={cardClass}>
          <h2 className="mb-4 font-sora text-base font-bold text-neon-white">Tendencia últimos 14 días</h2>
          {loading || !stats ? (
            <div className="h-52 animate-pulse rounded-xl bg-white/5" />
          ) : (
            <LineChart stats={stats} />
          )}
        </section>

        <section className={cardClass}>
          <h2 className="mb-5 font-sora text-base font-bold text-neon-white">Por sector</h2>
          {loading || !stats ? (
            <div className="h-52 animate-pulse rounded-xl bg-white/5" />
          ) : (
            <DonutChart sectors={stats.porSector} />
          )}
        </section>
      </div>

      {/* ── Fila 2: Barras por hora (ancho completo) ── */}
      <section className={cardClass}>
        <h2 className="mb-5 font-sora text-base font-bold text-neon-white">Visitas por hora del día</h2>
        {loading || !stats ? (
          <div className="h-36 animate-pulse rounded-xl bg-white/5" />
        ) : (
          <BarChart data={stats.visitasPorHora} />
        )}
      </section>
    </div>
  );
}

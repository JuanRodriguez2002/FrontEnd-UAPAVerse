import { Activity, MoreHorizontal } from "lucide-react";
import type { AdminDashboardContent } from "@/features/dashboard-admin/services/adminDashboardService";

type GlobalActivityChartProps = {
  content: AdminDashboardContent["chart"];
};

const summaryToneClasses = {
  green: "bg-[#77f6c6]",
  blue: "bg-primary",
  purple: "bg-secondary",
  orange: "bg-[#ffca80]",
};

export function GlobalActivityChart({ content }: GlobalActivityChartProps) {
  return (
    <section
      id={content.sectionId}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e1a4f]/55 p-5 shadow-[0_18px_60px_rgba(0,4,35,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-6"
    >
      <div className="absolute right-16 top-10 h-36 w-36 rounded-full bg-primary-container/10 blur-[70px]" />
      <div className="relative mb-6 flex items-start justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Activity className="h-4 w-4" />
            </span>
            <p className="font-space text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70">
              {content.eyebrow}
            </p>
          </div>
          <h2 className="font-sora text-lg font-bold text-neon-white">{content.title}</h2>
          <p className="mt-1 text-xs text-[#8190b0]">{content.description}</p>
        </div>
        <button aria-label={content.optionsLabel} className="rounded-lg p-2 text-[#7180a5] hover:bg-white/5 hover:text-white">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="relative h-64 w-full">
        <div className="absolute inset-0 flex flex-col justify-between pb-7">
          {Array.from({ length: content.gridLines }).map((_, index) => (
            <div key={index} className="border-t border-dashed border-white/[0.07]" />
          ))}
        </div>
        <svg viewBox="0 0 800 250" className="relative h-full w-full" preserveAspectRatio="none" aria-label={content.ariaLabel}>
          <defs>
            <linearGradient id="activityArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#5aa8ff" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#5aa8ff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="activityLine" x1="0" x2="1">
              <stop offset="0%" stopColor="#98cbff" />
              <stop offset="100%" stopColor="#e6b4ff" />
            </linearGradient>
            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d={content.areaPath}
            fill="url(#activityArea)"
          />
          <path
            d={content.linePath}
            fill="none"
            stroke="url(#activityLine)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#lineGlow)"
          />
          {content.highlightPoints.map((point) => (
            <circle key={`${point.x}-${point.y}`} cx={point.x} cy={point.y} r="5" fill="#000c43" stroke="#e6b4ff" strokeWidth="3" />
          ))}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between font-space text-[9px] text-[#667495]">
          {content.hours.map((hour) => <span key={hour}>{hour}</span>)}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/[0.07] pt-5 sm:grid-cols-4">
        {content.summary.map(({ label, value, tone }) => (
          <div key={label}>
            <div className="mb-1.5 flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${summaryToneClasses[tone]}`} />
              <span className="text-[10px] text-[#7f8dab]">{label}</span>
            </div>
            <p className="font-space text-sm font-bold text-neon-white">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

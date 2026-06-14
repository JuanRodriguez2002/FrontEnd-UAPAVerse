import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Clock3,
  FolderKanban,
  MousePointerClick,
  Settings,
  Store,
  Users,
  type LucideIcon,
} from "lucide-react";
import type {
  AdminDashboardContent,
  AdminDashboardStats,
  AdminIconKey,
} from "@/features/dashboard-admin/services/adminDashboardService";

type MetricCardsProps = {
  content: AdminDashboardContent["metrics"];
  stats: AdminDashboardStats | null;
  loading: boolean;
};

const iconByKey: Record<AdminIconKey, LucideIcon> = {
  activity: MousePointerClick,
  clock: Clock3,
  dashboard: Users,
  interactions: MousePointerClick,
  projects: FolderKanban,
  reports: BarChart3,
  security: Clock3,
  settings: Settings,
  stand: Store,
  users: Users,
};

const toneClasses = {
  blue: { tone: "from-[#1f97e7]/25 to-[#1f97e7]/5 text-primary", glow: "bg-[#1f97e7]" },
  purple: { tone: "from-[#a300ec]/25 to-[#a300ec]/5 text-secondary", glow: "bg-[#a300ec]" },
  cyan: { tone: "from-[#5aa8ff]/25 to-[#5aa8ff]/5 text-[#79ddff]", glow: "bg-[#5aa8ff]" },
  orange: { tone: "from-[#ffb86b]/20 to-[#ffb86b]/5 text-[#ffc27d]", glow: "bg-[#ffb86b]" },
};

export function MetricCards({ content, stats, loading }: MetricCardsProps) {
  return (
    <section id={content.sectionId} className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {content.items.map(({ key, growthKey, label, icon, format, tone }) => {
        const rawValue = stats?.[key] ?? 0;
        const value = format === "compact" ? `${(rawValue / 1000).toFixed(1)}K` : rawValue.toLocaleString("en-US");
        const growth = stats?.[growthKey] ?? 0;
        const Icon = iconByKey[icon];
        const classes = toneClasses[tone];
        const positive = growth >= 0;
        const TrendIcon = positive ? ArrowUpRight : ArrowDownRight;

        return (
          <article
            key={label}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e1a4f]/60 p-5 shadow-[0_16px_50px_rgba(0,4,35,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary/25"
          >
            <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${classes.glow} opacity-10 blur-3xl transition group-hover:opacity-20`} />
            <div className="mb-5 flex items-start justify-between">
              <div className={`rounded-xl border border-white/10 bg-gradient-to-br p-2.5 ${classes.tone}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span
                className={`flex items-center gap-1 rounded-full px-2 py-1 font-space text-[10px] font-bold ${
                  positive ? "bg-[#77f6c6]/10 text-[#77f6c6]" : "bg-[#ffb86b]/10 text-[#ffc27d]"
                }`}
              >
                <TrendIcon className="h-3 w-3" />
                {Math.abs(growth)}%
              </span>
            </div>
            <p className="text-xs font-semibold text-[#8f9bb8]">{label}</p>
            {loading ? (
              <div className="mt-2 h-8 w-24 animate-pulse rounded-lg bg-white/10" />
            ) : (
              <p className="mt-1 font-sora text-2xl font-extrabold tracking-tight text-neon-white">{value}</p>
            )}
            <p className="mt-3 font-space text-[9px] uppercase tracking-[0.15em] text-[#657394]">
              {content.comparisonLabel}
            </p>
          </article>
        );
      })}
    </section>
  );
}

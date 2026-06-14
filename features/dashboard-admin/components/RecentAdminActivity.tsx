import { Activity, Radio, ShieldCheck, Store, User } from "lucide-react";
import type {
  AdminActivity,
  AdminDashboardContent,
} from "@/features/dashboard-admin/services/adminDashboardService";

type RecentAdminActivityProps = {
  content: AdminDashboardContent["recentActivity"];
  activity: AdminActivity[];
  loading: boolean;
};

const activityStyle = {
  user: { icon: User, classes: "bg-primary/10 text-primary border-primary/20" },
  stand: { icon: Store, classes: "bg-secondary/10 text-secondary border-secondary/20" },
  security: { icon: ShieldCheck, classes: "bg-[#77f6c6]/10 text-[#77f6c6] border-[#77f6c6]/20" },
  system: { icon: Radio, classes: "bg-[#ffca80]/10 text-[#ffca80] border-[#ffca80]/20" },
};

export function RecentAdminActivity({ content, activity, loading }: RecentAdminActivityProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#0e1a4f]/55 p-5 shadow-[0_18px_60px_rgba(0,4,35,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary">
            <Activity className="h-4.5 w-4.5" />
          </span>
          <div>
            <h2 className="font-sora text-base font-bold text-neon-white">{content.title}</h2>
            <p className="mt-0.5 text-[10px] text-[#8190b0]">{content.description}</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 font-space text-[9px] font-bold uppercase tracking-wider text-[#77f6c6]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#77f6c6]" />
          {content.liveLabel}
        </span>
      </div>

      <div className="relative space-y-4 before:absolute before:bottom-4 before:left-[17px] before:top-4 before:w-px before:bg-gradient-to-b before:from-primary/30 before:via-secondary/20 before:to-transparent">
        {loading
          ? Array.from({ length: content.loadingRows }).map((_, index) => <div key={index} className="h-12 animate-pulse rounded-xl bg-white/5" />)
          : activity.map((item) => {
              const { icon: Icon, classes } = activityStyle[item.type];
              return (
                <article key={item.id} className="relative flex items-start gap-3">
                  <div className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${classes}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-[#e9edff]">{item.title}</p>
                      <span className="shrink-0 font-space text-[8px] text-[#647293]">{item.time}</span>
                    </div>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#7f8dab]">{item.description}</p>
                  </div>
                </article>
              );
            })}
      </div>
    </section>
  );
}

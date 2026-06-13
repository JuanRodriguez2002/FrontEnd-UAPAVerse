import { Bell, Menu, Search, Sparkles } from "lucide-react";
import type { AdminDashboardContent } from "@/features/dashboard-admin/services/adminDashboardService";

type AdminHeaderProps = {
  content: AdminDashboardContent["header"];
  onOpenMenu: () => void;
};

export function AdminHeader({ content, onOpenMenu }: AdminHeaderProps) {
  return (
    <header className="flex flex-col gap-5 border-b border-white/10 px-5 py-5 sm:px-7 lg:flex-row lg:items-center lg:justify-between lg:px-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMenu}
          className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-primary lg:hidden"
          aria-label={content.openMenuLabel}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            <span className="font-space text-[10px] font-bold uppercase tracking-[0.24em] text-secondary/80">
              {content.eyebrow}
            </span>
          </div>
          <h1 className="font-sora text-2xl font-extrabold tracking-tight text-neon-white sm:text-3xl">
            {content.title}
          </h1>
          <p className="mt-1 text-xs text-[#8f9bb8] sm:text-sm">
            {content.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <label className="relative hidden min-w-64 items-center md:flex">
          <Search className="absolute left-3.5 h-4 w-4 text-[#7482a5]" />
          <input
            type="search"
            placeholder={content.searchPlaceholder}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-xs text-white outline-none transition placeholder:text-[#697797] focus:border-primary/40 focus:bg-primary/5"
          />
        </label>
        <button
          className="relative rounded-xl border border-white/10 bg-white/5 p-2.5 text-[#adbad5] transition hover:border-primary/30 hover:text-primary"
          aria-label={content.notificationsLabel}
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(230,180,255,0.9)]" />
        </button>
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-container to-secondary-container font-space text-xs font-bold text-white shadow-primary-glow">
            {content.admin.initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-bold text-neon-white">{content.admin.name}</p>
            <p className="font-space text-[9px] uppercase tracking-wider text-primary/60">{content.admin.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

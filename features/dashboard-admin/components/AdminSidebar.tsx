"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Store,
  Users,
  X,
} from "lucide-react";
import type {
  AdminDashboardContent,
  AdminIconKey,
} from "@/features/dashboard-admin/services/adminDashboardService";

type AdminSidebarProps = {
  content: AdminDashboardContent["sidebar"];
  open: boolean;
  onClose: () => void;
};

const iconByKey: Record<AdminIconKey, typeof Activity> = {
  activity: Activity,
  clock: Activity,
  dashboard: LayoutDashboard,
  interactions: Activity,
  projects: FolderKanban,
  reports: BarChart3,
  security: ShieldCheck,
  settings: Settings,
  stand: Store,
  users: Users,
};

export function AdminSidebar({ content, open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <button
          aria-label={content.closeMenuLabel}
          className="fixed inset-0 z-30 bg-[#000837]/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/10 bg-[#000837]/95 px-4 py-5 backdrop-blur-2xl transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-primary/30 bg-primary/10 shadow-primary-glow">
              <Image
                src={content.logoSrc}
                alt={content.logoAlt}
                width={80}
                height={80}
                className="h-full w-full object-contain p-1"
                priority
              />
            </div>
            <div>
              <p className="font-sora text-sm font-extrabold tracking-[0.18em] text-neon-white">
                {content.brand}
              </p>
              <p className="font-space text-[10px] uppercase tracking-[0.24em] text-primary/70">
                {content.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-primary/70 hover:bg-white/5 hover:text-white lg:hidden"
            aria-label={content.closeSidebarLabel}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="my-6 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

        <p className="mb-3 px-3 font-space text-[10px] font-bold uppercase tracking-[0.22em] text-outline">
          {content.navigationTitle}
        </p>
        <nav className="space-y-1.5">
          {content.navigation.map(({ id, label, href, icon }) => {
            const Icon = iconByKey[icon];
            const active = pathname === href;

            return (
              <Link
                key={id}
                href={href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all ${
                  active
                    ? "border border-primary/25 bg-gradient-to-r from-primary/20 to-secondary/10 text-neon-white shadow-primary-glow"
                    : "border border-transparent text-[#9ca9c6] hover:border-white/10 hover:bg-white/5 hover:text-neon-white"
                }`}
              >
                {active && (
                  <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-primary shadow-[0_0_10px_rgba(152,203,255,0.9)]" />
                )}
                <Icon
                  className={`h-4.5 w-4.5 ${
                    active ? "text-primary" : "text-[#7180a5] group-hover:text-primary"
                  }`}
                />
                {label}
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shadow-primary-glow" />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <div className="mb-4 rounded-2xl border border-secondary/20 bg-gradient-to-br from-secondary/10 to-primary/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-secondary" />
              <span className="font-space text-[10px] font-bold uppercase tracking-[0.16em] text-secondary">
                {content.security.title}
              </span>
            </div>
            <div className="mb-2 flex items-center justify-between text-xs text-[#aeb8d0]">
              <span>{content.security.label}</span>
              <span className="text-[#77f6c6]">{content.security.value}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-container to-[#77f6c6]"
                style={{ width: `${content.security.progress}%` }}
              />
            </div>
          </div>

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#9ca9c6] transition hover:bg-error/10 hover:text-error">
            <LogOut className="h-4 w-4" />
            {content.logoutLabel}
          </button>
        </div>
      </aside>
    </>
  );
}

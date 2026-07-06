"use client";

import { useEffect, useState } from "react";
import { Ban, ChevronDown, Eye, MoreHorizontal, Users } from "lucide-react";
import type {
  AdminDashboardContent,
  AdminUser,
  AdminUserRole,
} from "@/features/dashboard-admin/services/adminDashboardService";

type UsersManagementTableProps = {
  content: AdminDashboardContent["users"];
  users: AdminUser[];
  loading: boolean;
  onAction: (message: string) => void;
  onChangeRole: (userId: string, role: AdminUserRole) => Promise<string>;
  onRequestBan: (user: AdminUser) => void;
  onViewDetails: (user: AdminUser) => void;
};

const statusClasses = {
  Activo: "bg-[#77f6c6]/10 text-[#77f6c6] border-[#77f6c6]/20",
  Pendiente: "bg-[#ffca80]/10 text-[#ffca80] border-[#ffca80]/20",
  Baneado: "bg-error/10 text-error border-error/20",
};

const PAGE_SIZE = 8;

export function UsersManagementTable({
  content,
  users,
  loading,
  onAction,
  onChangeRole,
  onRequestBan,
  onViewDetails,
}: UsersManagementTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE));
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const paginatedUsers = users.slice(pageStart, pageStart + PAGE_SIZE);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  useEffect(() => {
    setCurrentPage(1);
  }, [users]);

  const handleRoleChange = async (userId: string, role: AdminUserRole) => {
    onAction(await onChangeRole(userId, role));
  };

  return (
    <section
      id={content.sectionId}
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#0e1a4f]/55 shadow-[0_18px_60px_rgba(0,4,35,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary">
            <Users className="h-4.5 w-4.5" />
          </span>
          <div>
            <h2 className="font-sora text-base font-bold text-neon-white">{content.title}</h2>
            <p className="mt-0.5 text-[10px] text-[#8190b0]">{content.description}</p>
          </div>
        </div>
        <button className="hidden rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 font-space text-[10px] font-bold uppercase tracking-wider text-primary transition hover:bg-primary/20 sm:block">
          {content.viewAllLabel}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b border-white/[0.07] font-space text-[9px] uppercase tracking-[0.16em] text-[#697797]">
              {content.columns.map((column, index) => (
                <th
                  key={column}
                  className={`${index === 0 || index === content.columns.length - 1 ? "px-6" : "px-4"} py-3 font-bold ${
                    index === content.columns.length - 1 ? "text-right" : ""
                  }`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {loading
              ? Array.from({ length: content.loadingRows }).map((_, index) => (
                  <tr key={index}>
                    <td colSpan={content.columns.length} className="px-6 py-4">
                      <div className="h-10 animate-pulse rounded-xl bg-white/5" />
                    </td>
                  </tr>
                ))
              : paginatedUsers.map((user, index) => (
                  <tr key={user.id} className="group transition hover:bg-primary/[0.035]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-bold text-white ${
                            (pageStart + index) % 2 === 0
                              ? "border-primary/25 bg-gradient-to-br from-primary-container/80 to-primary-container/25"
                              : "border-secondary/25 bg-gradient-to-br from-secondary-container/80 to-secondary-container/25"
                          }`}
                        >
                          {user.initials}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#e9edff]">{user.name}</p>
                          <p className="mt-0.5 text-[10px] text-[#7180a5]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <label className="relative inline-flex items-center">
                        <select
                          defaultValue={user.role}
                          onChange={(event) => void handleRoleChange(user.id, event.target.value as AdminUserRole)}
                          className="appearance-none rounded-lg border border-white/10 bg-white/5 py-1.5 pl-2.5 pr-7 text-[10px] font-semibold text-[#bdc7de] outline-none transition hover:border-primary/25 focus:border-primary/40"
                          aria-label={`${content.actionLabels.changeRole} ${user.name}`}
                        >
                          {content.availableRoles.map((role) => <option key={role} value={role} className="bg-[#0e1a4f]">{role}</option>)}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-2 h-3 w-3 text-primary/60" />
                      </label>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[9px] font-bold ${statusClasses[user.status]}`}>
                        <span className="h-1 w-1 rounded-full bg-current" />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-space text-[10px] text-[#8190b0]">{user.lastActive}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onViewDetails(user)}
                          title={content.actionLabels.details}
                          className="rounded-lg p-2 text-[#8190b0] transition hover:bg-primary/10 hover:text-primary"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => onRequestBan(user)}
                          title={content.actionLabels.ban}
                          className="rounded-lg p-2 text-[#8190b0] transition hover:bg-error/10 hover:text-error"
                        >
                          <Ban className="h-3.5 w-3.5" />
                        </button>
                        <button title={content.actionLabels.more} className="rounded-lg p-2 text-[#8190b0] transition hover:bg-white/5 hover:text-white">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/[0.07] px-5 py-4 font-space text-[10px] font-bold uppercase tracking-wider text-[#8190b0] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <button
          type="button"
          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          disabled={isFirstPage || loading}
          className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-primary transition hover:bg-primary/20 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.03] disabled:text-[#596888]"
        >
          Anterior
        </button>
        <span className="text-center">
          Página {currentPage} de {totalPages}
        </span>
        <button
          type="button"
          onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
          disabled={isLastPage || loading}
          className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-primary transition hover:bg-primary/20 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.03] disabled:text-[#596888]"
        >
          Siguiente
        </button>
      </div>
    </section>
  );
}

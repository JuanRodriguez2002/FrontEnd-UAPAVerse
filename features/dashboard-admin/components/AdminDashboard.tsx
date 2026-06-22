"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  FolderKanban,
  RefreshCw,
  Settings,
  ShieldCheck,
  TriangleAlert,
  X,
  type LucideIcon,
} from "lucide-react";
import { AdminActionModal } from "@/features/dashboard-admin/components/AdminActionModal";
import { AdminConfirmModal } from "@/features/dashboard-admin/components/AdminConfirmModal";
import { AdminDetailsModal } from "@/features/dashboard-admin/components/AdminDetailsModal";
import { AdminHeader } from "@/features/dashboard-admin/components/AdminHeader";
import { AdminSidebar } from "@/features/dashboard-admin/components/AdminSidebar";
import { GlobalActivityChart } from "@/features/dashboard-admin/components/GlobalActivityChart";
import { MetricCards } from "@/features/dashboard-admin/components/MetricCards";
import { RecentAdminActivity } from "@/features/dashboard-admin/components/RecentAdminActivity";
import { StandsManagement } from "@/features/dashboard-admin/components/StandsManagement";
import { UsersManagementTable } from "@/features/dashboard-admin/components/UsersManagementTable";
import type {
  AdminActivity,
  AdminDashboardContent,
  AdminDashboardStats,
  AdminIconKey,
  AdminPlaceholderKey,
  AdminStand,
  AdminStandUpdateInput,
  AdminUser,
  AdminUserRole,
} from "@/features/dashboard-admin/services/adminDashboardService";

type AdminDashboardProps = {
  children: ReactNode;
  stats: AdminDashboardStats | null;
  users: AdminUser[];
  stands: AdminStand[];
  activity: AdminActivity[];
  content: AdminDashboardContent | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  onChangeUserRole: (userId: string, role: AdminUserRole) => Promise<string>;
  onBanUser: (userId: string) => Promise<string>;
  onViewUserDetails: (userId: string) => Promise<string>;
  onViewStandDetails: (standId: string) => Promise<string>;
  onApproveStand: (standId: string) => Promise<string>;
  onEditStand: (standId: string, update: AdminStandUpdateInput) => Promise<string>;
  onDeleteStand: (standId: string) => Promise<string>;
};

export type AdminDashboardSection = "dashboard" | "usuarios" | "stands" | AdminPlaceholderKey;

type AdminDashboardContextValue = {
  stats: AdminDashboardStats | null;
  users: AdminUser[];
  stands: AdminStand[];
  activity: AdminActivity[];
  content: AdminDashboardContent;
  loading: boolean;
  onAction: (message: string) => void;
  onChangeUserRole: (userId: string, role: AdminUserRole) => Promise<string>;
  onRequestUserBan: (user: AdminUser) => void;
  onViewUserDetails: (user: AdminUser) => void;
  onViewStandDetails: (stand: AdminStand) => void;
  onRequestStandApprove: (stand: AdminStand) => void;
  onRequestStandEdit: (stand: AdminStand) => void;
  onRequestStandDelete: (stand: AdminStand) => void;
};

const AdminDashboardContext = createContext<AdminDashboardContextValue | null>(null);

const iconByKey: Record<AdminIconKey, LucideIcon> = {
  activity: Activity,
  clock: Activity,
  dashboard: Activity,
  interactions: Activity,
  projects: FolderKanban,
  reports: BarChart3,
  security: ShieldCheck,
  settings: Settings,
  stand: Activity,
  users: Activity,
};

function useAdminDashboardContext() {
  const context = useContext(AdminDashboardContext);

  if (!context) {
    throw new Error("AdminDashboardSectionContent must be used inside AdminDashboard.");
  }

  return context;
}

export function AdminDashboard({
  children,
  stats,
  users,
  stands,
  activity,
  content,
  loading,
  error,
  refresh,
  onChangeUserRole,
  onBanUser,
  onViewUserDetails,
  onViewStandDetails,
  onApproveStand,
  onEditStand,
  onDeleteStand,
}: AdminDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [userModal, setUserModal] = useState<"details" | "ban" | null>(null);
  const [selectedStand, setSelectedStand] = useState<AdminStand | null>(null);
  const [standModal, setStandModal] = useState<"details" | "approve" | "edit" | "delete" | null>(null);

  useEffect(() => {
    if (!actionMessage || !content) return;

    const timeout = window.setTimeout(() => setActionMessage(null), content.toast.duration);
    return () => window.clearTimeout(timeout);
  }, [actionMessage, content]);

  if (!content) {
    return <div className="min-h-screen animate-pulse bg-background" />;
  }

  const closeUserModal = () => {
    setUserModal(null);
    setSelectedUser(null);
  };

  const closeStandModal = () => {
    setStandModal(null);
    setSelectedStand(null);
  };

  const runConfirmedAction = async (action: () => Promise<string>, closeModal: () => void) => {
    setActionMessage(await action());
    closeModal();
  };

  const userDetailFields = selectedUser
    ? content.modals.userDetails.fields.map((field) => ({
        label: field.label,
        value: String(selectedUser[field.key]),
      }))
    : [];

  const standDetailFields = selectedStand
    ? content.modals.standDetails.fields.map((field) => ({
        label: field.label,
        value: String(selectedStand[field.key]),
      }))
    : [];

  const contextValue: AdminDashboardContextValue = {
    stats,
    users,
    stands,
    activity,
    content,
    loading,
    onAction: setActionMessage,
    onChangeUserRole,
    onRequestUserBan: (user) => {
      setSelectedUser(user);
      setUserModal("ban");
    },
    onViewUserDetails: (user) => {
      setSelectedUser(user);
      setUserModal("details");
      void onViewUserDetails(user.id).then(setActionMessage);
    },
    onViewStandDetails: (stand) => {
      setSelectedStand(stand);
      setStandModal("details");
      void onViewStandDetails(stand.id).then(setActionMessage);
    },
    onRequestStandApprove: (stand) => {
      setSelectedStand(stand);
      setStandModal("approve");
    },
    onRequestStandEdit: (stand) => {
      setSelectedStand(stand);
      setStandModal("edit");
    },
    onRequestStandDelete: (stand) => {
      setSelectedStand(stand);
      setStandModal("delete");
    },
  };

  return (
    <AdminDashboardContext.Provider value={contextValue}>
      <div className="min-h-screen bg-background font-hanken text-[#dce4f8] selection:bg-primary/25">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-52 top-20 h-[420px] w-[420px] rounded-full bg-primary-container/[0.08] blur-[120px]" />
          <div className="absolute -right-44 top-1/3 h-[420px] w-[420px] rounded-full bg-secondary-container/[0.08] blur-[130px]" />
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(152,203,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(152,203,255,0.12) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "linear-gradient(to bottom, black, transparent 82%)",
            }}
          />
        </div>

        <div className="relative flex min-h-screen">
          <AdminSidebar
            content={content.sidebar}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <div className="min-w-0 flex-1">
            <AdminHeader content={content.header} onOpenMenu={() => setSidebarOpen(true)} />

            <main className="mx-auto max-w-[1700px] space-y-5 px-5 py-6 sm:px-7 lg:px-10 lg:py-8">
              {error && (
                <div className="flex flex-col gap-3 rounded-2xl border border-error/25 bg-error/10 p-4 text-sm text-error sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <TriangleAlert className="h-5 w-5 shrink-0" />
                    <span>{content.error.message}</span>
                  </div>
                  <button
                    onClick={() => void refresh()}
                    className="flex items-center justify-center gap-2 rounded-lg border border-error/25 px-3 py-2 font-space text-[10px] font-bold uppercase tracking-wider transition hover:bg-error/10"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    {content.error.retryLabel}
                  </button>
                </div>
              )}

              {children}

              <footer className="flex flex-col gap-2 border-t border-white/[0.07] py-4 font-space text-[9px] uppercase tracking-[0.16em] text-[#596888] sm:flex-row sm:items-center sm:justify-between">
                <span>{content.footer.version}</span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#77f6c6] shadow-[0_0_8px_rgba(119,246,198,0.8)]" />
                  {content.footer.status}
                </span>
              </footer>
            </main>
          </div>
        </div>

        {actionMessage && (
          <div className="fixed bottom-5 right-5 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-[#77f6c6]/25 bg-[#071747]/95 p-4 shadow-[0_14px_45px_rgba(0,0,0,0.4),0_0_25px_rgba(119,246,198,0.12)] backdrop-blur-xl">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#77f6c6]" />
            <div>
              <p className="font-space text-[9px] font-bold uppercase tracking-[0.16em] text-[#77f6c6]">{content.toast.title}</p>
              <p className="mt-1 text-xs text-[#c8d2e8]">{actionMessage}</p>
            </div>
            <button onClick={() => setActionMessage(null)} className="ml-2 text-[#7180a5] hover:text-white" aria-label={content.toast.closeLabel}>
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        <AdminDetailsModal
          open={userModal === "details" && Boolean(selectedUser)}
          eyebrow={content.modals.userDetails.eyebrow}
          title={content.modals.userDetails.title}
          subject={selectedUser?.name ?? ""}
          closeLabel={content.modals.common.closeLabel}
          fields={userDetailFields}
          onClose={closeUserModal}
        />

        <AdminConfirmModal
          open={userModal === "ban" && Boolean(selectedUser)}
          eyebrow={content.modals.banUser.eyebrow}
          title={content.modals.banUser.title}
          description={content.modals.banUser.description}
          subject={selectedUser?.name ?? ""}
          confirmLabel={content.modals.banUser.confirmLabel}
          cancelLabel={content.modals.common.cancelLabel}
          closeLabel={content.modals.common.closeLabel}
          onClose={closeUserModal}
          onConfirm={() => {
            if (selectedUser) void runConfirmedAction(() => onBanUser(selectedUser.id), closeUserModal);
          }}
        />

        <AdminDetailsModal
          open={standModal === "details" && Boolean(selectedStand)}
          eyebrow={content.modals.standDetails.eyebrow}
          title={content.modals.standDetails.title}
          subject={selectedStand?.name ?? ""}
          closeLabel={content.modals.common.closeLabel}
          fields={standDetailFields}
          onClose={closeStandModal}
        />

        <AdminConfirmModal
          open={standModal === "approve" && Boolean(selectedStand)}
          eyebrow={content.modals.approveStand.eyebrow}
          title={content.modals.approveStand.title}
          description={content.modals.approveStand.description}
          subject={selectedStand?.name ?? ""}
          confirmLabel={content.modals.approveStand.confirmLabel}
          cancelLabel={content.modals.common.cancelLabel}
          closeLabel={content.modals.common.closeLabel}
          tone="success"
          onClose={closeStandModal}
          onConfirm={() => {
            if (selectedStand) void runConfirmedAction(() => onApproveStand(selectedStand.id), closeStandModal);
          }}
        />

        <AdminConfirmModal
          open={standModal === "delete" && Boolean(selectedStand)}
          eyebrow={content.modals.deleteStand.eyebrow}
          title={content.modals.deleteStand.title}
          description={content.modals.deleteStand.description}
          subject={selectedStand?.name ?? ""}
          confirmLabel={content.modals.deleteStand.confirmLabel}
          cancelLabel={content.modals.common.cancelLabel}
          closeLabel={content.modals.common.closeLabel}
          onClose={closeStandModal}
          onConfirm={() => {
            if (selectedStand) void runConfirmedAction(() => onDeleteStand(selectedStand.id), closeStandModal);
          }}
        />

        <AdminActionModal
          open={standModal === "edit" && Boolean(selectedStand)}
          eyebrow={content.modals.editStand.eyebrow}
          title={content.modals.editStand.title}
          description={content.modals.editStand.description}
          submitLabel={content.modals.editStand.submitLabel}
          cancelLabel={content.modals.common.cancelLabel}
          closeLabel={content.modals.common.closeLabel}
          fields={content.modals.editStand.fields}
          initialValues={Object.fromEntries(
            content.modals.editStand.fields.map((field) => [
              field.key,
              selectedStand ? String(selectedStand[field.key]) : "",
            ]),
          )}
          onClose={closeStandModal}
          onSubmit={(values) => {
            if (selectedStand) {
              void runConfirmedAction(
                () =>
                  onEditStand(selectedStand.id, {
                    name: values.name,
                    company: values.company,
                    category: values.category,
                  }),
                closeStandModal,
              );
            }
          }}
        />
      </div>
    </AdminDashboardContext.Provider>
  );
}

function AdminDashboardOverview() {
  const { stats, activity, content, loading } = useAdminDashboardContext();

  return (
    <>
      <MetricCards content={content.metrics} stats={stats} loading={loading} />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(330px,0.75fr)]">
        <GlobalActivityChart content={content.chart} />
        <RecentAdminActivity content={content.recentActivity} activity={activity} loading={loading} />
      </div>

      <div className="grid items-start gap-5 2xl:grid-cols-[minmax(0,1.5fr)_minmax(400px,0.8fr)]">
        <AdminUsersSection />
        <AdminStandsSection />
      </div>
    </>
  );
}

function AdminUsersSection() {
  const {
    content,
    users,
    loading,
    onAction,
    onChangeUserRole,
    onRequestUserBan,
    onViewUserDetails,
  } = useAdminDashboardContext();

  return (
    <UsersManagementTable
      content={content.users}
      users={users}
      loading={loading}
      onAction={onAction}
      onChangeRole={onChangeUserRole}
      onRequestBan={onRequestUserBan}
      onViewDetails={onViewUserDetails}
    />
  );
}

function AdminStandsSection() {
  const {
    content,
    stands,
    loading,
    onViewStandDetails,
    onRequestStandApprove,
    onRequestStandEdit,
    onRequestStandDelete,
  } = useAdminDashboardContext();

  return (
    <StandsManagement
      content={content.stands}
      stands={stands}
      loading={loading}
      onViewDetails={onViewStandDetails}
      onRequestApprove={onRequestStandApprove}
      onRequestEdit={onRequestStandEdit}
      onRequestDelete={onRequestStandDelete}
    />
  );
}

function AdminPlaceholderSection({ section }: { section: AdminPlaceholderKey }) {
  const { content } = useAdminDashboardContext();
  const placeholder = content.placeholders[section];
  const Icon = iconByKey[placeholder.icon];

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#0e1a4f]/55 shadow-[0_18px_60px_rgba(0,4,35,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
      <div className="px-5 py-8 sm:px-7 lg:px-9 lg:py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-primary-glow">
            <Icon className="h-5 w-5" />
          </span>
          <div className="max-w-3xl">
            <p className="font-space text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
              {placeholder.eyebrow}
            </p>
            <h2 className="mt-3 font-sora text-2xl font-extrabold text-neon-white sm:text-3xl">
              {placeholder.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#9ca9c6]">{placeholder.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AdminDashboardSectionContent({ section }: { section: AdminDashboardSection }) {
  if (section === "dashboard") return <AdminDashboardOverview />;
  if (section === "usuarios") return <AdminUsersSection />;
  if (section === "stands") {
    return (
      <div className="max-w-5xl">
        <AdminStandsSection />
      </div>
    );
  }

  return <AdminPlaceholderSection section={section} />;
}

"use client";

import type { ReactNode } from "react";
import { AdminDashboard } from "@/features/dashboard-admin/components/AdminDashboard";
import {
  approveAdminStand,
  banAdminUser,
  changeAdminUserRole,
  deleteAdminStand,
  editAdminStand,
  viewAdminStandDetails,
  viewAdminUserDetails,
} from "@/features/dashboard-admin/actions/adminDashboardActions";
import { useAdminDashboard } from "@/features/dashboard-admin/hooks/useAdminDashboard";
import type {
  AdminStandUpdateInput,
  AdminUserRole,
} from "@/features/dashboard-admin/services/adminDashboardService";

type AdminDashboardPageProps = {
  children: ReactNode;
};

export function AdminDashboardPage({ children }: AdminDashboardPageProps) {
  const dashboard = useAdminDashboard();

  return (
    <AdminDashboard
      {...dashboard}
      onChangeUserRole={async (userId: string, role: AdminUserRole) =>
        (await changeAdminUserRole(userId, role)).message
      }
      onBanUser={async (userId: string) => (await banAdminUser(userId)).message}
      onViewUserDetails={async (userId: string) => (await viewAdminUserDetails(userId)).message}
      onViewStandDetails={async (standId: string) => (await viewAdminStandDetails(standId)).message}
      onApproveStand={async (standId: string) => (await approveAdminStand(standId)).message}
      onEditStand={async (standId: string, update: AdminStandUpdateInput) =>
        (await editAdminStand(standId, update)).message
      }
      onDeleteStand={async (standId: string) => (await deleteAdminStand(standId)).message}
    >
      {children}
    </AdminDashboard>
  );
}

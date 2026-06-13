import {
  approveStand,
  disableAdminUser,
  getAdminUserDetails,
  getAdminStandDetails,
  markStandForDeletion,
  prepareStandEditor,
  updateAdminUserRole,
  type AdminStandUpdateInput,
  type AdminUserRole,
} from "@/features/dashboard-admin/services/adminDashboardService";

export async function changeAdminUserRole(userId: string, role: AdminUserRole) {
  return updateAdminUserRole(userId, role);
}

export async function banAdminUser(userId: string) {
  return disableAdminUser(userId);
}

export async function viewAdminUserDetails(userId: string) {
  return getAdminUserDetails(userId);
}

export async function approveAdminStand(standId: string) {
  return approveStand(standId);
}

export async function viewAdminStandDetails(standId: string) {
  return getAdminStandDetails(standId);
}

export async function editAdminStand(standId: string, update: AdminStandUpdateInput) {
  return prepareStandEditor(standId, update);
}

export async function deleteAdminStand(standId: string) {
  return markStandForDeletion(standId);
}

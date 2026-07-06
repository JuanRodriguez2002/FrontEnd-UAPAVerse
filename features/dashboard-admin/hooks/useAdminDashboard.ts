"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ADMIN_DASHBOARD_LOAD_ERROR,
  getAdminDashboardStats,
  getAdminDashboardContent,
  getAdminStands,
  getAdminUsers,
  getRecentAdminActivity,
  type AdminActivity,
  type AdminDashboardStats,
  type AdminDashboardContent,
  type AdminStand,
  type AdminUser,
} from "@/features/dashboard-admin/services/adminDashboardService";

export function useAdminDashboard() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stands, setStands] = useState<AdminStand[]>([]);
  const [activity, setActivity] = useState<AdminActivity[]>([]);
  const [content, setContent] = useState<AdminDashboardContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [adminUsers, adminStands, recentActivity, dashboardContent] = await Promise.all([
        getAdminUsers(),
        getAdminStands(),
        getRecentAdminActivity(),
        getAdminDashboardContent(),
      ]);
      const dashboardStats = await getAdminDashboardStats(adminUsers, adminStands);

      setStats(dashboardStats);
      setUsers(adminUsers);
      setStands(adminStands);
      setActivity(recentActivity);
      setContent(dashboardContent);
    } catch {
      setError(ADMIN_DASHBOARD_LOAD_ERROR);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  return {
    stats,
    users,
    stands,
    activity,
    content,
    loading,
    error,
    refresh: loadDashboard,
  };
}

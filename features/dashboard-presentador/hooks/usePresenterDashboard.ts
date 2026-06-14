"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getStands,
  getPresenterStats,
  saveStand,
  deleteStand,
  type PresenterStats,
} from "@/features/dashboard-presentador/services/standService";
import {
  getProposals,
  updateProposalStatus,
} from "@/features/dashboard-presentador/services/proposalService";
import type { Stand, StandFormData } from "@/features/dashboard-presentador/types/stand";
import type { Proposal, ProposalStatus } from "@/features/dashboard-presentador/types/proposal";

export function usePresenterDashboard() {
  const [stands, setStands] = useState<Stand[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [stats, setStats] = useState<PresenterStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [s, p, st] = await Promise.all([getStands(), getProposals(), getPresenterStats()]);
      setStands(s);
      setProposals(p);
      setStats(st);
    } catch {
      setError("Error al cargar los datos. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleSaveStand(data: StandFormData, id?: string) {
    const updated = await saveStand(data, id);
    setStands((prev) =>
      id ? prev.map((s) => (s.id === id ? updated : s)) : [...prev, updated]
    );
    const newStats = await getPresenterStats();
    setStats(newStats);
  }

  async function handleDeleteStand(id: string) {
    await deleteStand(id);
    setStands((prev) => prev.filter((s) => s.id !== id));
    const newStats = await getPresenterStats();
    setStats(newStats);
  }

  async function handleUpdateProposal(id: string, status: ProposalStatus) {
    const updated = await updateProposalStatus(id, status);
    setProposals((prev) => prev.map((p) => (p.id === id ? updated : p)));
  }

  return {
    stands,
    proposals,
    stats,
    loading,
    error,
    refresh: load,
    onSaveStand: handleSaveStand,
    onDeleteStand: handleDeleteStand,
    onUpdateProposal: handleUpdateProposal,
  };
}

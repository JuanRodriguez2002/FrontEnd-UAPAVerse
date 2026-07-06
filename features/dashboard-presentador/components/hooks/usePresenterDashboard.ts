"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PresenterStats, ApiProject, CreateProjectInput } from "@/features/dashboard-presentador/services/standService";
import {
  fetchPresenterStands,
  fetchPresenterStats,
  createOrUpdateStand,
  removeStand,
  fetchProposals,
  respondToProposal,
} from "@/features/dashboard-presentador/actions/presenterActions";
import type { Proposal, ProposalStatus } from "@/features/dashboard-presentador/types/proposal";

const AUTO_REFRESH_INTERVAL = 60_000;

export function usePresenterDashboard() {
  const [stands, setStands] = useState<ApiProject[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [stats, setStats] = useState<PresenterStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);
    try {
      const [s, p, st] = await Promise.all([
        fetchPresenterStands(),
        fetchProposals(),
        fetchPresenterStats(),
      ]);
      setStands(s);
      setProposals(p);
      setStats(st);
    } catch {
      setError("Error al cargar los datos. Inténtalo de nuevo.");
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    timerRef.current = setInterval(() => void load(true), AUTO_REFRESH_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [load]);

  async function handleSaveStand(data: CreateProjectInput, id?: string | number) {
    const updated = await createOrUpdateStand(data, id);
    setStands((prev) =>
      id ? prev.map((s) => (s.id === Number(id) ? updated : s)) : [...prev, updated]
    );
    const newStats = await fetchPresenterStats();
    setStats(newStats);
  }

  async function handleDeleteStand(id: string | number) {
    await removeStand(id);
    setStands((prev) => prev.filter((s) => s.id !== Number(id)));
    const newStats = await fetchPresenterStats();
    setStats(newStats);
  }

  async function handleUpdateProposal(id: string, status: ProposalStatus) {
    const updated = await respondToProposal(id, status);
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

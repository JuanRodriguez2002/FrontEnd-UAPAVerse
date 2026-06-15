"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { StandForm } from "@/features/dashboard-presentador/components/forms/StandForm";
import { createOrUpdateStand, fetchPresenterStands } from "@/features/dashboard-presentador/actions/presenterActions";
import { useEffect, useState } from "react";
import type { Stand } from "@/features/dashboard-presentador/types/stand";

export function CrearStandPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const [stand, setStand] = useState<Stand | null>(null);

  useEffect(() => {
    if (!editId) return;
    fetchPresenterStands().then((stands) => {
      const found = stands.find((s) => s.id === editId) ?? null;
      setStand(found);
    });
  }, [editId]);

  return (
    <StandForm
      stand={stand}
      onSave={async (data, id) => {
        await createOrUpdateStand(data, id);
        router.push("/dashboard-presentador");
      }}
    />
  );
}

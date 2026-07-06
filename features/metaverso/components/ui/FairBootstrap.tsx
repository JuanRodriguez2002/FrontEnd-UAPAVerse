"use client";

import { useEffect } from "react";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";

export function FairBootstrap() {
  const loadCatalog = useUapaStore((s) => s.loadCatalog);

  useEffect(() => {
    void loadCatalog();
  }, [loadCatalog]);

  return null;
}

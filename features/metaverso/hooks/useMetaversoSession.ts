"use client";

import { useCallback, useEffect, useState } from "react";
import { METAVERSO_SESSION_CHANGED_EVENT } from "@/features/metaverso/lib/auth-config";
import type { MetaversoSession } from "@/features/metaverso/types/session";
import {
  canStartStandConversation,
  getDashboardPathForSession,
  isMetaversoLoggedIn,
  readMetaversoSession,
} from "@/features/metaverso/utils/session";

export function useMetaversoSession() {
  const [session, setSession] = useState<MetaversoSession>(() => ({
    token: null,
    user: null,
  }));

  const refresh = useCallback(() => {
    setSession(readMetaversoSession());
  }, []);

  useEffect(() => {
    refresh();

    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    window.addEventListener(METAVERSO_SESSION_CHANGED_EVENT, refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
      window.removeEventListener(METAVERSO_SESSION_CHANGED_EVENT, refresh);
    };
  }, [refresh]);

  return {
    token: session.token,
    user: session.user,
    isLoggedIn: isMetaversoLoggedIn(session),
    canStartConversation: canStartStandConversation(session),
    dashboardPath: getDashboardPathForSession(session),
    refresh,
  };
}

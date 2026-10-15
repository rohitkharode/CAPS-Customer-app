import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { read, subscribe } from "../services/mockDb";
import { DEFAULT_SETTINGS } from "../lib/config";

// Keep one context instance across hot reloads so providers and consumers always match.
const AppCtx = globalThis.__capsAppCtx || (globalThis.__capsAppCtx = createContext(null));
const DRAFT_KEY = "caps_draft_v1";
const emptyDraft = {
  shopId: null,
  document: null,
  settings: DEFAULT_SETTINGS,
  tier: null,
  paymentMethod: null,
};

export function AppProvider({ children }) {
  const [hydrated, setHydrated] = useState(false);
  const [db, setDb] = useState(null);
  const [draft, setDraftState] = useState(emptyDraft);

  useEffect(() => {
    setDb(read());
    try {
      const d = sessionStorage.getItem(DRAFT_KEY);
      if (d) setDraftState({ ...emptyDraft, ...JSON.parse(d) });
    } catch {
      /* ignore corrupt draft */
    }
    setHydrated(true);
    return subscribe((next) => setDb(next));
  }, []);

  const setDraft = useCallback((patch) => {
    setDraftState((prev) => {
      const next = typeof patch === "function" ? patch(prev) : { ...prev, ...patch };
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(next));
      return next;
    });
  }, []);
  const clearDraft = useCallback(() => {
    sessionStorage.removeItem(DRAFT_KEY);
    setDraftState(emptyDraft);
  }, []);

  const value = useMemo(() => {
    const user = db ? db.users.find((u) => u.id === db.session) || null : null;
    const notifications = db?.notifications || [];
    return {
      hydrated,
      user,
      orders: db?.orders || [],
      notifications,
      unread: notifications.filter((n) => !n.read).length,
      prefs: db?.prefs || {},
      draft,
      setDraft,
      clearDraft,
    };
  }, [hydrated, db, draft, setDraft, clearDraft]);

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const v = useContext(AppCtx);
  if (!v) throw new Error("useApp must be used inside AppProvider");
  return v;
}

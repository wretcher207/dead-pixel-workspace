"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type TeachingCtx = { enabled: boolean; toggle: () => void };

const Ctx = createContext<TeachingCtx>({ enabled: false, toggle: () => {} });

export function TeachingModeProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("build-ritual:teaching-mode");
    if (stored === "true") setEnabled(true);
  }, []);

  const toggle = () => {
    setEnabled((v) => {
      const next = !v;
      localStorage.setItem("build-ritual:teaching-mode", String(next));
      return next;
    });
  };

  return <Ctx.Provider value={{ enabled, toggle }}>{children}</Ctx.Provider>;
}

export const useTeachingMode = () => useContext(Ctx);

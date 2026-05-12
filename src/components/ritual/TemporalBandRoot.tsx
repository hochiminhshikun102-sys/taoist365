"use client";

import { createContext, useContext, useEffect, useLayoutEffect, type ReactNode } from "react";
import { type TemporalBand, useTemporalBand } from "@/lib/temporal-band";

const TemporalBandContext = createContext<TemporalBand>("midday");

export function useTemporalBandValue(): TemporalBand {
  return useContext(TemporalBandContext);
}

/** One interval for the whole tree; sets `data-temporal-band` on `<html>` for CSS drift. */
export function TemporalBandRoot({ children }: { children: ReactNode }) {
  const band = useTemporalBand();

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-temporal-band", band);
    return () => {
      document.documentElement.removeAttribute("data-temporal-band");
    };
  }, [band]);

  useEffect(() => {
    const root = document.documentElement;
    const timers = [
      window.setTimeout(() => root.setAttribute("data-open-duration", "settled"), 8 * 60 * 1000),
      window.setTimeout(() => root.setAttribute("data-open-duration", "long"), 36 * 60 * 1000),
    ];

    root.setAttribute("data-open-duration", "fresh");

    return () => {
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
      root.removeAttribute("data-open-duration");
    };
  }, []);

  return <TemporalBandContext.Provider value={band}>{children}</TemporalBandContext.Provider>;
}

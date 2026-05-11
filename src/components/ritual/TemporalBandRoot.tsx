"use client";

import { createContext, useContext, useLayoutEffect, type ReactNode } from "react";
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

  return <TemporalBandContext.Provider value={band}>{children}</TemporalBandContext.Provider>;
}

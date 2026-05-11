"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PERSONAL_RESIDUE_KEYS } from "@/lib/personal-residue-keys";

/** Quiet link to last ritual opened in this browser—local echo only. */
export function LastRitualEcho() {
  const [echo, setEcho] = useState<{ path: string; title: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
      const path = localStorage.getItem(PERSONAL_RESIDUE_KEYS.lastRitualPath);
      const title = localStorage.getItem(PERSONAL_RESIDUE_KEYS.lastRitualTitle);
        if (path && title) setEcho({ path, title });
    } catch {
        setEcho(null);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!echo) return null;

  return (
    <p className="mt-4 max-w-2xl text-xs leading-7 text-text-muted/58">
      In this browser you last opened{" "}
      <Link href={echo.path} className="text-text-secondary underline-offset-4 hover:underline">
        {echo.title}
      </Link>
      —a local echo only; nothing counts visits or nags you to return.
    </p>
  );
}

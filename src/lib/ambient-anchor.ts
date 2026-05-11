"use client";

import { useLayoutEffect, useState } from "react";

/**
 * Anonymous atmosphere token only — not identity, not analytics.
 * Persists one of four recurring motifs so the space can feel gently stable between visits.
 */
export type AmbientAnchor = "cup" | "paper" | "linen" | "wood";

const STORAGE_KEY = "taoist365.ambient-anchor.v1";

export const AMBIENT_ANCHOR_ORDER: AmbientAnchor[] = ["cup", "paper", "linen", "wood"];

const ANCHOR_TO_ITEM_ID: Record<AmbientAnchor, string> = {
  cup: "tea-cup-warmth",
  paper: "folded-paper-note",
  linen: "linen-sheet-edge",
  wood: "wood-light-line",
};

function randomAnchor(): AmbientAnchor {
  return AMBIENT_ANCHOR_ORDER[Math.floor(Math.random() * AMBIENT_ANCHOR_ORDER.length)]!;
}

/** Read or create token; client-only. */
export function readPersistedAmbientAnchor(): AmbientAnchor {
  if (typeof window === "undefined") return "linen";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "cup" || raw === "paper" || raw === "linen" || raw === "wood") return raw;
    const next = randomAnchor();
    window.localStorage.setItem(STORAGE_KEY, next);
    return next;
  } catch {
    return "linen";
  }
}

export function anchorPrimaryItemId(anchor: AmbientAnchor): string {
  return ANCHOR_TO_ITEM_ID[anchor];
}

export function anchorPhaseIndex(anchor: AmbientAnchor): number {
  return Math.max(0, AMBIENT_ANCHOR_ORDER.indexOf(anchor));
}

/** Rotate a small list so a different line leads — subconscious motif shift, not user targeting. */
export function rotateByAnchor<T>(items: readonly T[], anchor: AmbientAnchor): T[] {
  const arr = [...items];
  if (arr.length === 0) return arr;
  const shift = anchorPhaseIndex(anchor) % arr.length;
  if (shift === 0) return arr;
  return [...arr.slice(shift), ...arr.slice(0, shift)];
}

/**
 * Defaults to a stable SSR value, then syncs from localStorage after mount so hydration matches
 * server HTML while return visits still gain a quiet recurring motif.
 */
export function useAmbientAnchor(): AmbientAnchor {
  const [anchor, setAnchor] = useState<AmbientAnchor>("linen");
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- anonymous atmosphere token from localStorage; not profiling
    setAnchor(readPersistedAmbientAnchor());
  }, []);
  return anchor;
}


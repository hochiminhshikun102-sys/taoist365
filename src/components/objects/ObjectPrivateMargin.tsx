"use client";

import { useEffect, useState } from "react";
import { PERSONAL_RESIDUE_KEYS } from "@/lib/personal-residue-keys";

const MAX_CHARS = 640;

function readMargins(): Record<string, string> {
  try {
    const raw = localStorage.getItem(PERSONAL_RESIDUE_KEYS.objectsMargin);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed as Record<string, string>;
  } catch {
    return {};
  }
}

function writeMargins(next: Record<string, string>) {
  try {
    localStorage.setItem(PERSONAL_RESIDUE_KEYS.objectsMargin, JSON.stringify(next));
  } catch {
    // Quota / privacy mode.
  }
}

/** Optional per-object note—local only; not favorites or wishlist UI. */
export function ObjectPrivateMargin({ objectId }: { objectId: string }) {
  const [value, setValue] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      const margins = readMargins();
      setValue(margins[objectId] ?? "");
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [objectId]);

  useEffect(() => {
    if (!ready) return;
    const trimmed = value.slice(0, MAX_CHARS);
    const margins = readMargins();
    if (trimmed.length === 0) {
      delete margins[objectId];
    } else {
      margins[objectId] = trimmed;
    }
    writeMargins(margins);
  }, [value, ready, objectId]);

  return (
    <div className="mt-6 border-t border-border-subtle/22 pt-5">
      <label htmlFor={`margin-${objectId}`} className="text-[0.65rem] uppercase tracking-[0.14em] text-text-muted/72">
        Private margin
      </label>
      <p className="mt-1.5 text-[0.68rem] leading-5 text-text-muted/55">
        A short line for yourself—only in this browser. Not a favorite list or wishlist; the site never receives it.
      </p>
      <textarea
        id={`margin-${objectId}`}
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, MAX_CHARS))}
        disabled={!ready}
        spellCheck={false}
        rows={2}
        aria-label={`Private margin for ${objectId}`}
        className="taoist-ritual-shell mt-3 w-full resize-y rounded-xl border border-border-subtle/26 bg-background/72 p-3 font-mono text-xs leading-6 text-text-secondary outline-none ring-0 placeholder:text-text-muted/40 focus:border-border-subtle/44 disabled:opacity-60"
        placeholder={ready ? "Optional—real-world reminder, phrase, or quiet reference." : ""}
      />
    </div>
  );
}

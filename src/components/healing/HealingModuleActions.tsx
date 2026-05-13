"use client";

import { useState } from "react";

type HealingModuleActionsProps = {
  moduleId: string;
  title: string;
};

export function HealingModuleActions({ moduleId, title }: HealingModuleActionsProps) {
  const storageKey = `reverent-inquiry-healing-module-${moduleId}`;
  const legacyStorageKey = `taoist365-healing-module-${moduleId}`;
  const [saved, setSaved] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(storageKey) === "saved" || window.localStorage.getItem(legacyStorageKey) === "saved";
  });
  const [shared, setShared] = useState(false);

  function toggleSaved() {
    const next = !saved;
    setSaved(next);
    if (next) {
      window.localStorage.setItem(storageKey, "saved");
    } else {
      window.localStorage.removeItem(storageKey);
      window.localStorage.removeItem(legacyStorageKey);
    }
  }

  async function shareModule() {
    const url = `${window.location.origin}${window.location.pathname}#${moduleId}`;
    if (navigator.share) {
      await navigator.share({ title, url });
    } else {
      await navigator.clipboard.writeText(url);
      setShared(true);
      window.setTimeout(() => setShared(false), 1600);
    }
  }

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={toggleSaved}
        className="rounded-md border border-border-subtle bg-white/54 px-3 py-2 text-xs text-text-secondary hover:bg-white"
      >
        {saved ? "Saved here" : "Save"}
      </button>
      <button
        type="button"
        onClick={shareModule}
        className="rounded-md border border-border-subtle bg-white/54 px-3 py-2 text-xs text-text-secondary hover:bg-white"
      >
        {shared ? "Link copied" : "Share"}
      </button>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";

export type OaDesktopLocale = "zh-CN" | "en";

const STORAGE_KEYS = ["dohara.oa.language", "dohara-oa-language"] as const;
const EVENT = "dohara-oa-language";

function readStoredLocale(): OaDesktopLocale {
  try {
    for (const key of STORAGE_KEYS) {
      const value = localStorage.getItem(key);
      if (value === "en" || value === "zh-CN") return value;
    }
  } catch {
    /* preview-safe */
  }
  return "zh-CN";
}

export function oaDesktopPick(locale: OaDesktopLocale, zh: string, en: string) {
  return locale === "en" ? en : zh;
}

/** Reads the existing OA language keys. Does not change Shell. */
export function useOaDesktopLocale() {
  const [locale, setLocaleState] = useState<OaDesktopLocale>("zh-CN");

  useEffect(() => {
    function sync() {
      setLocaleState(readStoredLocale());
    }
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(EVENT, sync);
    };
  }, []);

  const setLocale = useCallback((next: OaDesktopLocale) => {
    setLocaleState(next);
    try {
      for (const key of STORAGE_KEYS) localStorage.setItem(key, next);
      window.dispatchEvent(new Event(EVENT));
    } catch {
      /* preview-safe */
    }
  }, []);

  const t = useCallback((zh: string, en: string) => oaDesktopPick(locale, zh, en), [locale]);

  return { locale, setLocale, t };
}

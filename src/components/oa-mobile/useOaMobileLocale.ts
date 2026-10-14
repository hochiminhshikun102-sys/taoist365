"use client";

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** Matches OA Publish language storage (`dohara.oa.language`). */
export type OaMobileLang = "zh-CN" | "en";

const STORAGE_KEY = "dohara.oa.language";

type LocaleApi = {
  lang: OaMobileLang;
  t: (zh: string, en: string) => string;
  toggleLanguage: () => void;
};

const OaMobileLocaleContext = createContext<LocaleApi | null>(null);

export function OaMobileLocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<OaMobileLang>("zh-CN");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "zh-CN") setLang(stored);
    } catch {
      /* storage unavailable — keep default */
    }
  }, []);

  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = prev;
    };
  }, [lang]);

  const t = useCallback((zh: string, en: string) => (lang === "en" ? en : zh), [lang]);

  const toggleLanguage = useCallback(() => {
    setLang((prev) => {
      const next: OaMobileLang = prev === "en" ? "zh-CN" : "en";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ lang, t, toggleLanguage }), [lang, t, toggleLanguage]);

  return createElement(OaMobileLocaleContext.Provider, { value }, children);
}

export function useOaMobileLocale(): LocaleApi {
  const ctx = useContext(OaMobileLocaleContext);
  if (!ctx) {
    throw new Error("useOaMobileLocale must be used within OaMobileLocaleProvider");
  }
  return ctx;
}

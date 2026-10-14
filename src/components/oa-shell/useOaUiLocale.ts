"use client";

import { useCallback, useEffect, useState } from "react";

/** Same key as existing OA language switch (Publish and other OA surfaces). */
export const OA_LANGUAGE_STORAGE_KEY = "dohara.oa.language";
export const OA_LANGUAGE_EVENT = "dohara-oa-language";

export type OaUiLocale = "zh-CN" | "en";

export function oaPick(locale: OaUiLocale, zh: string, en: string) {
  return locale === "en" ? en : zh;
}

/** Prefer one language when a leftover mixed `English · 中文` string is still in fixtures. */
export function oaSplitMixed(text: string, locale: OaUiLocale) {
  const parts = text
    .replace(/\s+/g, " ")
    .trim()
    .split(/\s*·\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length < 2) return text;
  const zhParts = parts.filter((part) => /[\u4e00-\u9fff]/.test(part));
  const enParts = parts.filter((part) => !/[\u4e00-\u9fff]/.test(part));
  if (locale === "en") return enParts.join(" · ") || text;
  return zhParts.join(" · ") || text;
}

function readStoredLocale(): OaUiLocale {
  try {
    const value = window.localStorage.getItem(OA_LANGUAGE_STORAGE_KEY);
    if (value === "en" || value === "zh-CN") return value;
  } catch {
    /* storage unavailable — stay on OA default */
  }
  return "zh-CN";
}

export function useOaUiLocale() {
  const [locale, setLocaleState] = useState<OaUiLocale>("zh-CN");

  useEffect(() => {
    const initial = readStoredLocale();
    setLocaleState(initial);
    document.documentElement.lang = initial === "en" ? "en" : "zh-CN";
    function onStorage(event: StorageEvent) {
      if (event.key && event.key !== OA_LANGUAGE_STORAGE_KEY) return;
      setLocaleState(readStoredLocale());
    }
    function onCustom() {
      setLocaleState(readStoredLocale());
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener(OA_LANGUAGE_EVENT, onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(OA_LANGUAGE_EVENT, onCustom);
    };
  }, []);

  const setLocale = useCallback((next: OaUiLocale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(OA_LANGUAGE_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(OA_LANGUAGE_EVENT));
    document.documentElement.lang = next === "en" ? "en" : "zh-CN";
  }, []);

  return { locale, setLocale, isZh: locale === "zh-CN" };
}

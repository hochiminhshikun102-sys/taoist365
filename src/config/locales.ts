export const defaultLocale = "en" as const;

export const locales = [
  "en",
  "fr",
  "de",
  "es",
  "pt",
  "tr",
  "ar",
  "ms",
  "vi",
  "id",
  "fil",
  "ja",
  "ko",
  "zh-tw",
] as const;

export type Locale = (typeof locales)[number];

export type LocaleDefinition = {
  code: Locale;
  label: string;
  nativeLabel: string;
  htmlLang: string;
  ogLocale: string;
  dir: "ltr" | "rtl";
};

export const localeDefinitions: Record<Locale, LocaleDefinition> = {
  en: { code: "en", label: "English", nativeLabel: "English", htmlLang: "en", ogLocale: "en_US", dir: "ltr" },
  fr: { code: "fr", label: "French", nativeLabel: "Francais", htmlLang: "fr", ogLocale: "fr_FR", dir: "ltr" },
  de: { code: "de", label: "German", nativeLabel: "Deutsch", htmlLang: "de", ogLocale: "de_DE", dir: "ltr" },
  es: { code: "es", label: "Spanish", nativeLabel: "Espanol", htmlLang: "es", ogLocale: "es_ES", dir: "ltr" },
  pt: { code: "pt", label: "Portuguese", nativeLabel: "Portugues", htmlLang: "pt", ogLocale: "pt_PT", dir: "ltr" },
  tr: { code: "tr", label: "Turkish", nativeLabel: "Turkce", htmlLang: "tr", ogLocale: "tr_TR", dir: "ltr" },
  ar: { code: "ar", label: "Arabic", nativeLabel: "Arabic", htmlLang: "ar", ogLocale: "ar_AR", dir: "rtl" },
  ms: { code: "ms", label: "Malay", nativeLabel: "Malay", htmlLang: "ms", ogLocale: "ms_MY", dir: "ltr" },
  vi: { code: "vi", label: "Vietnamese", nativeLabel: "Tieng Viet", htmlLang: "vi", ogLocale: "vi_VN", dir: "ltr" },
  id: { code: "id", label: "Indonesian", nativeLabel: "Bahasa Indonesia", htmlLang: "id", ogLocale: "id_ID", dir: "ltr" },
  fil: { code: "fil", label: "Filipino", nativeLabel: "Filipino", htmlLang: "fil", ogLocale: "en_PH", dir: "ltr" },
  ja: { code: "ja", label: "Japanese", nativeLabel: "Japanese", htmlLang: "ja", ogLocale: "ja_JP", dir: "ltr" },
  ko: { code: "ko", label: "Korean", nativeLabel: "Korean", htmlLang: "ko", ogLocale: "ko_KR", dir: "ltr" },
  "zh-tw": {
    code: "zh-tw",
    label: "Traditional Chinese",
    nativeLabel: "Traditional Chinese",
    htmlLang: "zh-Hant-TW",
    ogLocale: "zh_TW",
    dir: "ltr",
  },
};

export const localizedStaticPaths = [
  "",
  "about",
  "healing",
  "windkeep",
  "quiet-receiving",
  "live",
  "objects",
  "guidance",
  "inquiry",
  "driftbox",
  "journal",
  "quiet-extracts",
  "quiet-notes",
  "daily-verse",
  "shipping",
  "refund",
  "privacy",
  "cookie",
  "wind-seeker-intro",
  "search",
] as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localePath(locale: Locale, path = "") {
  const cleanPath = path.replace(/^\/+/, "").replace(/\/+$/, "");
  return cleanPath ? `/${locale}/${cleanPath}` : `/${locale}`;
}

export function localizedAlternates(path = "") {
  return Object.fromEntries(locales.map((locale) => [localeDefinitions[locale].htmlLang, localePath(locale, path)]));
}

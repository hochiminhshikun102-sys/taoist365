import { enMessages } from "@/messages/en";
import { defaultLocale, type Locale } from "@/config/locales";

export type MessageNamespace = typeof enMessages;

const messages: Record<Locale, MessageNamespace> = {
  en: enMessages,
  fr: enMessages,
  de: enMessages,
  es: enMessages,
  pt: enMessages,
  tr: enMessages,
  ar: enMessages,
  ms: enMessages,
  vi: enMessages,
  id: enMessages,
  fil: enMessages,
  ja: enMessages,
  ko: enMessages,
  "zh-tw": enMessages,
};

export function getMessages(locale: Locale = defaultLocale) {
  return messages[locale] ?? messages[defaultLocale];
}


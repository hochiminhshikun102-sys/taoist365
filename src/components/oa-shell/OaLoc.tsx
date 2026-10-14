"use client";

import { oaPick, oaSplitMixed, useOaUiLocale } from "./useOaUiLocale";

type Props = {
  zh?: string;
  en?: string;
  mixed?: string;
};

export function OaLoc({ zh = "", en = "", mixed }: Props) {
  const { locale } = useOaUiLocale();
  if (mixed) return oaSplitMixed(mixed, locale);
  return oaPick(locale, zh, en);
}

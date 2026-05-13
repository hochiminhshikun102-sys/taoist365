import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isLocale, localeDefinitions, locales, type Locale } from "@/config/locales";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const definition = localeDefinitions[locale as Locale];

  return (
    <div lang={definition.htmlLang} dir={definition.dir} data-locale={locale}>
      {children}
    </div>
  );
}


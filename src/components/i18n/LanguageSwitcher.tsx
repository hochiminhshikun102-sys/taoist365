import Link from "next/link";
import { localeDefinitions, locales, localePath, type Locale } from "@/config/locales";

export function LanguageSwitcher({
  currentLocale,
  path = "",
}: Readonly<{
  currentLocale: Locale;
  path?: string;
}>) {
  return (
    <nav aria-label="Language" className="flex flex-wrap gap-2 text-xs">
      {locales.map((locale) => {
        const definition = localeDefinitions[locale];
        const active = locale === currentLocale;

        return (
          <Link
            key={locale}
            href={localePath(locale, path)}
            hrefLang={definition.htmlLang}
            aria-current={active ? "page" : undefined}
            className={`rounded-md border px-2.5 py-1.5 ${
              active
                ? "border-foreground bg-foreground text-white"
                : "border-border-subtle bg-white text-text-secondary hover:border-border-default hover:text-foreground"
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}

import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Boring footer utilities—ordinary long-lived website texture, not brand theater. */
export function SiteColophon() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle/20 bg-background/90">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-10">
        <nav aria-label="Site" className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-text-muted/85">
          <Link href="/" className="transition hover:text-text-secondary">
            Home
          </Link>
          <Link href="/objects" className="transition hover:text-text-secondary">
            Objects
          </Link>
          <Link href="/desk" className="transition hover:text-text-secondary">
            Desk
          </Link>
          <Link href="/inquiry" className="transition hover:text-text-secondary">
            Mail
          </Link>
          <Link href="/guidance" className="transition hover:text-text-secondary">
            Pause
          </Link>
          <Link href="/rituals" className="transition hover:text-text-secondary">
            Rituals
          </Link>
          <a href="/sitemap.xml" className="transition hover:text-text-secondary">
            Sitemap
          </a>
        </nav>
        <p className="text-[0.68rem] leading-6 text-text-muted/55">
          © {year} {siteConfig.siteName} · {siteConfig.domain}
        </p>
      </div>
      <div className="mx-auto max-w-3xl space-y-2 px-6 pb-8 pt-0 sm:px-10">
        <p className="text-[0.62rem] leading-[1.55] text-text-muted/42">{siteConfig.maintenanceLine}</p>
        <p className="text-[0.62rem] leading-[1.55] text-text-muted/38">{siteConfig.browserSideLine}</p>
        <p className="text-[0.62rem] leading-[1.55] text-text-muted/34">{siteConfig.slowHumanLine}</p>
        <p className="text-[0.62rem] leading-[1.55] text-text-muted/30">{siteConfig.lightDependencyFootLine}</p>
      </div>
    </footer>
  );
}

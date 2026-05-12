import Link from "next/link";
import { CartLink } from "@/components/commerce/CartLink";
import { experienceRoutes } from "@/config/experience-routes";

const navPaths = experienceRoutes.filter((route) => route.path !== "/rituals/homepage");

export function CalmNavigation() {
  return (
    <header className="sticky top-0 z-20 border-b border-border-subtle/25 bg-background/92">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5 sm:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span
            aria-hidden
            className="h-6 w-10 shrink-0 bg-[url('/brand/production/air-mark.svg')] bg-contain bg-center bg-no-repeat opacity-70"
          />
          <div className="leading-tight">
            <p className="text-xs tracking-[0.12em] text-text-muted uppercase">
              Reverent Inquiry
            </p>
            <p className="text-[10px] text-text-muted/80">taoist365.com</p>
          </div>
        </Link>

        <div className="flex max-w-[min(100%,42rem)] flex-wrap items-center justify-end gap-2 sm:gap-3">
          <Link
            href="/collections"
            className="taoist-quiet-action rounded-lg border border-transparent px-2.5 py-1.5 text-xs text-text-muted transition hover:text-text-secondary"
          >
            Collections
          </Link>
          <Link
            href="/objects"
            className="taoist-quiet-action rounded-lg border border-transparent px-2.5 py-1.5 text-xs text-text-muted transition hover:text-text-secondary"
          >
            Objects
          </Link>
          <Link
            href="/desk"
            className="taoist-quiet-action rounded-lg border border-transparent px-2.5 py-1.5 text-xs text-text-muted transition hover:text-text-secondary"
          >
            Desk
          </Link>
          <Link
            href="/inquiry"
            className="taoist-quiet-action rounded-lg border border-transparent px-2.5 py-1.5 text-xs text-text-muted transition hover:text-text-secondary"
          >
            Mail
          </Link>
          <Link
            href="/guidance"
            className="taoist-quiet-action rounded-lg border border-transparent px-2.5 py-1.5 text-xs text-text-muted transition hover:text-text-secondary"
          >
            Pause
          </Link>
          {navPaths.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="taoist-quiet-action rounded-lg border border-transparent px-2.5 py-1.5 text-xs text-text-muted transition hover:text-text-secondary"
            >
              {item.navLabel}
            </Link>
          ))}
          <CartLink />
        </div>
      </nav>
    </header>
  );
}

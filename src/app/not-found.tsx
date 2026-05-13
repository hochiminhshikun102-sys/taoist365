import Link from "next/link";
import { CalmNavigation } from "@/components/navigation";
import { SiteColophon } from "@/components/site/SiteColophon";

export default function NotFoundPage() {
  return (
    <>
      <CalmNavigation />
      <main className="min-h-[70svh] bg-background">
        <div className="room-section-y-standard mx-auto w-full max-w-4xl px-6 sm:px-10">
          <p className="text-xs uppercase tracking-[0.14em] text-text-muted">Page not found</p>
          <h1 className="mt-4 text-4xl leading-tight text-foreground sm:text-5xl">This address has no room yet.</h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-text-secondary">
            The site can still be entered quietly from the main rooms. Nothing needs to be recovered here.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="rounded-md border border-border-subtle bg-white/54 px-4 py-3 text-sm text-text-secondary hover:bg-white">
              Home
            </Link>
            <Link href="/healing" className="rounded-md border border-border-subtle bg-white/46 px-4 py-3 text-sm text-text-secondary hover:bg-white">
              Healing
            </Link>
            <Link href="/objects" className="rounded-md border border-border-subtle bg-white/46 px-4 py-3 text-sm text-text-secondary hover:bg-white">
              Objects
            </Link>
          </div>
        </div>
      </main>
      <SiteColophon />
    </>
  );
}

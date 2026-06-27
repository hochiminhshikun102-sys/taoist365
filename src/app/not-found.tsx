import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-[70svh] bg-background">
      <div className="mx-auto w-full max-w-4xl px-6 py-24 sm:px-10">
        <p className="text-xs uppercase tracking-[0.14em] text-text-muted">Page not found</p>
        <h1 className="mt-4 text-4xl leading-tight text-foreground sm:text-5xl">This address is not available.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-text-secondary">
          Please return to an available page and continue browsing.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-md border border-border-subtle bg-white/54 px-4 py-3 text-sm text-text-secondary hover:bg-white">
            Home
          </Link>
          <Link href="/store" className="rounded-md border border-border-subtle bg-white/46 px-4 py-3 text-sm text-text-secondary hover:bg-white">
            Store
          </Link>
        </div>
      </div>
    </main>
  );
}

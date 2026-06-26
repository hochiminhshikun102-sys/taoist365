import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PublishedIntakeObjects } from "@/components/object-intake/PublishedIntakeObjects";
import { commerceCollections, formatPrice, objectsForCollection } from "@/config/operational-commerce";
import { newArrivalObjects, seasonalThemes } from "@/config/frontstage-operations";

export const metadata: Metadata = {
  title: "Collections",
  description: "Dohara object collections for quiet rooms, desks, rituals, and seasons.",
};

export default function CollectionsPage() {
  const arrivals = newArrivalObjects(8);

  return (
    <main className="min-h-full bg-background">
      <div className="room-section-y-standard mx-auto w-full max-w-6xl px-6 sm:px-10">
        <p className="text-xs text-text-muted/85">Collections</p>
        <h1 className="mt-3 max-w-2xl text-3xl leading-tight text-foreground sm:text-4xl">Browse objects by room use.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-text-secondary">
          Four simple entries: wind, desk, ritual, and seasonal objects. Each collection leads to real object pages and cart flow.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link href="/search" className="rounded-lg border border-border-subtle bg-white/52 px-3 py-2 text-text-secondary hover:bg-white/70">
            Search
          </Link>
          <Link href="/new-arrivals" className="rounded-lg border border-border-subtle bg-white/52 px-3 py-2 text-text-secondary hover:bg-white/70">
            New arrivals
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {commerceCollections.map((collection) => {
            const objects = objectsForCollection(collection.id);
            const lead = objects[0];
            const motionLead = objects.find((object) => object.title.includes("Wind Bell") || object.title.includes("Window Bell")) ?? lead;

            return (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className="quiet-air-touch overflow-hidden rounded-[0.9rem_1.1rem_0.96rem_1rem] border border-border-subtle bg-white/52 transition hover:bg-white/68"
              >
                {motionLead ? (
                  <div className="product-motion-surface min-h-[18rem] overflow-hidden border-b border-border-subtle bg-white">
                    <Image src={motionLead.media.motion} alt={motionLead.media.alt} fill unoptimized className="object-cover opacity-[0.86]" sizes="(max-width: 768px) 90vw, 40vw" />
                    <div className="product-motion-surface__light" aria-hidden />
                    <div className="product-motion-surface__shadow" aria-hidden />
                  </div>
                ) : null}
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.12em] text-text-muted">{objects.length} objects</p>
                  <h2 className="mt-2 text-2xl text-foreground">{collection.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{collection.summary}</p>
                  {lead ? (
                    <p className="mt-4 text-sm text-foreground">
                      Featured: {lead.title} / {formatPrice(lead.priceCents)}
                    </p>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>

        <section className="mt-12 border-t border-border-subtle pt-8">
          <div className="mb-5 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted">New inside collections</p>
              <h2 className="mt-2 text-2xl text-foreground">Recently added objects</h2>
            </div>
            <Link href="/new-arrivals" className="hidden text-sm text-text-muted underline-offset-4 hover:text-foreground hover:underline sm:block">
              Full shelf
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {arrivals.slice(0, 4).map((object) => (
              <Link key={object.id} href={`/objects/${object.id}`} className="quiet-air-touch rounded-lg border border-border-subtle bg-white/48 p-4 hover:bg-white/68">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border-subtle bg-white">
                  <Image src={object.media.hero} alt={object.media.alt} fill className="object-cover opacity-[0.88]" sizes="(max-width: 768px) 90vw, 22vw" />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.12em] text-text-muted">{object.collectionTitle}</p>
                <p className="mt-2 text-sm text-foreground">{object.title}</p>
              </Link>
            ))}
          </div>
        </section>

        <PublishedIntakeObjects />

        <section className="mt-12 border-t border-border-subtle pt-8">
          <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Seasonal themes</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {seasonalThemes.map((theme) => (
              <Link key={theme.id} href={theme.href} className="quiet-air-touch rounded-lg border border-border-subtle bg-white/46 p-4 hover:bg-white/68">
                <h2 className="text-base text-foreground">{theme.title}</h2>
                <p className="mt-3 text-xs leading-6 text-text-muted">{theme.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-4 border-t border-border-subtle pt-8 sm:grid-cols-3">
          <p className="text-sm leading-7 text-text-secondary">Small-stock objects with current material photos.</p>
          <p className="text-sm leading-7 text-text-secondary">Order requests are reviewed by a human before payment.</p>
          <p className="text-sm leading-7 text-text-secondary">Shipping is confirmed plainly before anything is charged.</p>
        </section>
      </div>
    </main>
  );
}

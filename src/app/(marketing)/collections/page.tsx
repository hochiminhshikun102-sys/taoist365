import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { commerceCollections, formatPrice, objectsForCollection } from "@/config/operational-commerce";

export const metadata: Metadata = {
  title: "Collections",
  description: "Taoist365 object collections for quiet rooms, desks, rituals, and seasons.",
};

export default function CollectionsPage() {
  return (
    <main className="min-h-full bg-background">
      <div className="room-section-y-standard mx-auto w-full max-w-6xl px-6 sm:px-10">
        <p className="text-xs text-text-muted/85">Collections</p>
        <h1 className="mt-3 max-w-2xl text-3xl leading-tight text-foreground sm:text-4xl">Browse objects by room use.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-text-secondary">
          Four simple entries: wind, desk, ritual, and seasonal objects. Each collection leads to real object pages and cart flow.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {commerceCollections.map((collection) => {
            const objects = objectsForCollection(collection.id);
            const lead = objects[0];

            return (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className="quiet-air-touch rounded-lg border border-border-subtle bg-white/52 p-5 transition hover:bg-white/68"
              >
                {lead ? (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border-subtle bg-white">
                    <Image src={lead.media.hero} alt={lead.media.alt} fill className="object-cover opacity-[0.88]" sizes="(max-width: 768px) 90vw, 40vw" />
                  </div>
                ) : null}
                <p className="mt-5 text-xs uppercase tracking-[0.12em] text-text-muted">{objects.length} objects</p>
                <h2 className="mt-2 text-2xl text-foreground">{collection.title}</h2>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{collection.summary}</p>
                {lead ? (
                  <p className="mt-4 text-sm text-foreground">
                    Featured: {lead.title} / {formatPrice(lead.priceCents)}
                  </p>
                ) : null}
              </Link>
            );
          })}
        </div>

        <section className="mt-12 grid gap-4 border-t border-border-subtle pt-8 sm:grid-cols-3">
          <p className="text-sm leading-7 text-text-secondary">Small-stock objects with current material photos.</p>
          <p className="text-sm leading-7 text-text-secondary">Order requests are reviewed by a human before payment.</p>
          <p className="text-sm leading-7 text-text-secondary">Shipping is confirmed plainly before anything is charged.</p>
        </section>
      </div>
    </main>
  );
}

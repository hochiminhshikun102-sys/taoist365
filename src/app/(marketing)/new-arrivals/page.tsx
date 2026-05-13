import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/config/operational-commerce";
import { newArrivalObjects } from "@/config/frontstage-operations";

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "Recently added Reverent Inquiry objects.",
};

export default function NewArrivalsPage() {
  const arrivals = newArrivalObjects(24);

  return (
    <main className="min-h-full bg-background">
      <div className="room-section-y-standard mx-auto w-full max-w-6xl px-6 sm:px-10">
        <p className="text-xs text-text-muted/85">New arrivals</p>
        <h1 className="mt-3 max-w-2xl text-3xl leading-tight text-foreground sm:text-4xl">Recently added objects.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-text-secondary">
          New product links appear here in order. It is an operational shelf, not a drop calendar.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {arrivals.map((object) => (
            <Link key={object.id} href={`/objects/${object.id}`} className="quiet-air-touch rounded-lg border border-border-subtle bg-white/50 p-4 transition hover:bg-white/70">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border-subtle bg-white">
                <Image src={object.media.hero} alt={object.media.alt} fill className="object-cover opacity-[0.88]" sizes="(max-width: 768px) 90vw, 22vw" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.12em] text-text-muted">{object.collectionTitle}</p>
              <h2 className="mt-2 text-lg leading-tight text-foreground">{object.title}</h2>
              <p className="mt-2 text-sm text-text-secondary">{formatPrice(object.priceCents)}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

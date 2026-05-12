import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { BrowserHostnameFoot } from "@/components/density/BrowserHostnameFoot";
import { commerceObjects, formatPrice } from "@/config/operational-commerce";

export const metadata: Metadata = {
  title: "Objects",
  description: "Pieces on taoist365.com; mail if one should come nearer.",
  openGraph: {
    title: `Objects - ${siteConfig.siteName}`,
    description: "Objects on taoist365.com; humans reply by mail.",
    url: `${siteConfig.metadataBase}/objects`,
  },
};

export default function ObjectsPage() {
  return (
    <main className="min-h-full bg-background">
      <div className="room-section-y-standard relative mx-auto w-full max-w-3xl px-6 sm:px-10">
        <p className="text-xs text-text-muted/85">Objects</p>
        <h1 className="mt-3 max-w-2xl text-3xl leading-tight text-foreground sm:text-4xl">Objects</h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-text-secondary">{siteConfig.objectsObtainableIntroLine}</p>
        <p className="mt-4 max-w-2xl text-sm leading-8 text-text-secondary">
          <Link href="/inquiry" className="text-foreground underline-offset-4 hover:underline">
            Mail
          </Link>{" "}
          to ask about a piece when one should come nearer.
        </p>
        <p className="mt-3 max-w-2xl text-xs leading-7 text-text-muted/72">{siteConfig.permanenceLine}</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link href="/collections" className="rounded-lg border border-border-subtle bg-white/52 px-3 py-2 text-text-secondary hover:bg-white/70">
            Collections
          </Link>
          <Link href="/cart" className="rounded-lg border border-border-subtle bg-white/52 px-3 py-2 text-text-secondary hover:bg-white/70">
            Cart
          </Link>
        </div>

        <section
          id="driftbox"
          className="relative mt-10 scroll-mt-28 border-l border-border-subtle/70 pl-5"
          aria-label="Driftbox inside Windkeep"
        >
          <div className="wind-residue-object wind-residue-object--faint pointer-events-none absolute right-0 top-0 hidden aspect-[5/4] w-[5.4rem] rounded-[0.56rem_0.74rem_0.62rem_0.68rem] sm:block">
            <Image src="/objects-living/风铃001.jpg" alt="" fill className="object-cover" sizes="7rem" />
          </div>
          <p className="text-xs uppercase tracking-[0.14em] text-text-muted/72">Driftbox</p>
          <p className="mt-3 max-w-2xl text-sm leading-8 text-text-secondary">
            A quiet shelf note for things that have moved on. If something should come nearer, mail can receive the
            note and the object can keep going through ordinary hands.
          </p>
        </section>

        <ul className="room-object-stack mt-10">
          {commerceObjects.map((object) => {
            return (
              <li
                key={object.id}
                id={object.id}
                className="browser-air-presence human-residue-presence taoist-ritual-shell object-resting-surface scroll-mt-28 rounded-2xl border border-border-subtle bg-surface p-6 sm:p-7"
              >
                <p className="text-xs text-text-muted/80">{object.collectionTitle}</p>
                <h2 className="mt-2 text-xl text-foreground">{object.title}</h2>
                <p className="mt-1 text-[0.65rem] leading-5 text-text-muted/52">
                  {object.shippingState} / {object.stock} available
                </p>
                <p className="mt-5 text-sm leading-8 text-text-secondary">{object.atmosphereLine}</p>
                <div className="mt-6">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border-subtle bg-white">
                    <Image src={object.media.hero} alt={object.media.alt} fill className="object-cover opacity-[0.9]" sizes="(max-width: 768px) 90vw, 42rem" />
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link href={`/objects/${object.id}`} className="text-sm text-foreground underline-offset-4 hover:underline">
                    Details
                  </Link>
                  <p className="text-sm text-text-secondary">{formatPrice(object.priceCents)}</p>
                  <AddToCartButton
                    id={object.id}
                    title={object.title}
                    priceCents={object.priceCents}
                    image={object.media.hero}
                    disabled={object.stock <= 0}
                  />
                </div>
              </li>
            );
          })}
        </ul>

        <BrowserHostnameFoot />

        <p className="room-mt-standard text-xs leading-7 text-text-muted/75">
          <Link href="/guidance" className="text-text-secondary underline-offset-4 hover:underline">
            Pause
          </Link>
          {" / "}
          <Link href="/inquiry" className="text-text-secondary underline-offset-4 hover:underline">
            Mail
          </Link>
        </p>
      </div>
    </main>
  );
}

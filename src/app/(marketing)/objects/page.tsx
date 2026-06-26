import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PublishedIntakeObjects } from "@/components/object-intake/PublishedIntakeObjects";
import { productRuntimeObjects } from "@/config/product-runtime";
import { buildSeoGeoMetadata } from "@/lib/seo-geo-runtime";

export const metadata: Metadata = buildSeoGeoMetadata({
  title: "Objects - Dohara",
  description: "A breathable object room for quiet living objects and passing things.",
  path: "/objects",
  kind: "product",
  phrases: ["quiet living objects", "object runtime", "nearby objects", "passing things"],
});

const visibleObjects = productRuntimeObjects.filter((object) => object.runtimeKind === "commerce").slice(0, 24);
const passingObjects = productRuntimeObjects.filter((object) => object.runtimeKind !== "commerce").slice(0, 8);

export default function ObjectsPage() {
  return (
    <main className="ri-runtime-coherence min-h-full bg-[#f7fbfc] text-foreground">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_34%_at_50%_0%,rgba(207,232,242,0.22),transparent_72%),linear-gradient(180deg,#f3fbff_0%,#fffefb_50%,#f7faf8_100%)]" />
        <div className="relative mx-auto w-full max-w-[92rem] px-5 py-10 sm:px-8 lg:px-10">
          <section className="ri-breath-section grid gap-10 py-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
            <div>
              <Link href="/" className="text-sm text-text-muted">
                Dohara
              </Link>
              <p className="mt-10 text-sm text-text-muted">Objects</p>
              <h1 className="mt-5 max-w-xl font-[var(--font-display-serif)] text-5xl font-normal leading-[1.04] text-foreground sm:text-6xl">
                Things that can live nearby.
              </h1>
              <p className="ri-quiet-copy mt-6 max-w-xl text-sm leading-8 text-text-secondary">
                A quiet room of real objects, each attached to one RI object runtime. Commerce stays secondary to placement, time, and use.
              </p>
            </div>
            <div className="ri-air-motion-surface ri-image-climate relative min-h-[20rem] overflow-hidden rounded-[1.1rem] border border-[#c7d7df]/42 bg-white/70 shadow-[0_24px_70px_rgba(38,61,78,0.055)]">
              <Image src={visibleObjects[0]?.media[0]?.src ?? "/homepage-hero/windkeep-lantern-sea.png"} alt="" fill priority className="object-cover opacity-[0.88]" sizes="(max-width: 1024px) 92vw, 54vw" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.2),rgba(255,255,255,0.02)),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(246,251,251,0.2))]" />
            </div>
          </section>

          <section className="ri-breath-section border-t border-[#d7e5ea]/58 py-10">
            <div className="mb-7 flex items-end justify-between gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-text-muted">Object Room</p>
                <h2 className="mt-3 font-[var(--font-display-serif)] text-3xl font-normal text-foreground">Current nearby objects.</h2>
              </div>
              <Link href="/windkeep" className="hidden text-sm text-text-muted hover:text-foreground sm:block">
                Windkeep
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {visibleObjects.map((object, index) => (
                <Link
                  key={object.object_id}
                  href={`/objects/${object.object_id}`}
                  className={`quiet-air-touch browser-air-presence ri-image-climate overflow-hidden rounded-lg border border-[#c7d7df]/40 bg-white/66 shadow-[0_14px_38px_rgba(38,61,78,0.04)] ${
                    index % 4 === 1 ? "lg:translate-y-5" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] bg-white/80">
                    <Image src={object.media[0]?.src ?? "/homepage-hero/windkeep-lantern-sea.png"} alt={object.name} fill className="object-cover opacity-[0.88]" sizes="(max-width: 768px) 92vw, 22vw" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-text-muted">{object.object_id}</p>
                    <h3 className="mt-3 text-xl leading-tight text-foreground">{object.name}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-text-secondary">{object.oneLine}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <p className="text-sm text-foreground/72">{object.priceLine}</p>
                      <span className="rounded-full border border-[#d7e5ea]/58 bg-white/58 px-2.5 py-1 text-[0.68rem] text-text-muted">
                        {object.quietRealityLabel}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <PublishedIntakeObjects />

          <section className="ri-breath-section border-t border-[#d7e5ea]/58 py-10">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.16em] text-text-muted">Passing Things</p>
              <h2 className="mt-3 font-[var(--font-display-serif)] text-3xl font-normal text-foreground">Objects already moving through time.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {passingObjects.map((object) => (
                <Link key={object.object_id} href={`/objects/${object.object_id}`} className="quiet-air-touch rounded-lg border border-[#d7e5ea]/50 bg-white/54 p-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-white/80">
                    <Image src={object.media[0]?.src ?? "/homepage-hero/windkeep-lantern-sea.png"} alt={object.name} fill className="object-cover opacity-[0.86]" sizes="22vw" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-foreground">{object.name}</p>
                  <p className="mt-2 text-xs leading-6 text-text-muted">{object.timeLayer.windkeep}</p>
                  <p className="mt-1 text-xs leading-6 text-text-muted">{object.quietRealityLabel}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

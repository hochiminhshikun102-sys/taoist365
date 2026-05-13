import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import {
  commerceObjects,
  formatPrice,
  globalCommerceRegions,
  globalPackagingStandard,
  objectById,
  quietPairingsForObjectId,
} from "@/config/operational-commerce";

type ObjectPageProps = {
  params: Promise<{ objectId: string }>;
};

export function generateStaticParams() {
  return commerceObjects.map((object) => ({ objectId: object.id }));
}

export async function generateMetadata({ params }: ObjectPageProps): Promise<Metadata> {
  const { objectId } = await params;
  const object = objectById(objectId);

  return {
    title: object?.title ?? "Object",
    description: object?.subtitle ?? "Reverent Inquiry object.",
  };
}

export default async function ObjectDetailPage({ params }: ObjectPageProps) {
  const { objectId } = await params;
  const object = objectById(objectId);

  if (!object) {
    return null;
  }

  const related = quietPairingsForObjectId(object.id, 3);
  const sellingTags = [object.collectionTitle, "USD base", object.stock > 0 ? "Small stock" : "Unavailable"];
  const skuOptions = [
    { label: "Version", value: object.subtitle },
    { label: "Material", value: object.materials[0] ?? "Material confirmed before shipping" },
    { label: "Package", value: "Protective carton or padded mailer with product card" },
    { label: "Quantity", value: "1-9 pieces through cart" },
  ];
  const faqItems = [
    {
      question: "Are these final product photos?",
      answer: "This page uses the current Reverent Inquiry product material set. Multi-angle, detail, placement, and package views can be replaced as better production photos arrive.",
    },
    {
      question: "When does it ship?",
      answer: object.shippingNote,
    },
    {
      question: "Can this ship internationally?",
      answer: "The product page uses USD as the base price and keeps region, duties, and carrier notes ready for confirmation before payment capture.",
    },
    {
      question: "Can I ask before ordering?",
      answer: "Yes. Mail can confirm stock, dimensions, materials, region fit, and packing before payment or shipment.",
    },
  ];

  return (
    <main className="min-h-full bg-background">
      <div className="room-section-y-standard mx-auto w-full max-w-6xl px-6 sm:px-10">
        <section className="grid gap-8 lg:grid-cols-[0.58fr_0.42fr]" aria-label="Product top">
          <div>
            <Link href={`/collections/${object.collection}`} className="text-xs text-text-muted underline-offset-4 hover:underline">
              {object.collectionTitle}
            </Link>
            <div className="mt-5 grid gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border-subtle bg-white">
                <Image src={object.media.hero} alt={object.media.alt} fill className="object-cover opacity-[0.92]" sizes="(max-width: 1024px) 92vw, 56vw" priority />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { src: object.media.hero, label: "Main view" },
                  { src: object.media.placement, label: "Placement" },
                  { src: object.media.detail, label: "Detail" },
                ].map((image) => (
                  <div key={image.label} className="rounded-lg border border-border-subtle bg-white/58 p-2">
                    <div className="relative aspect-square overflow-hidden rounded-md bg-white">
                      <Image src={image.src} alt={`${object.title} ${image.label}`} fill className="object-cover opacity-[0.88]" sizes="12rem" />
                    </div>
                    <p className="mt-2 text-[0.68rem] text-text-muted">{image.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-xs leading-6 text-text-muted">{object.media.caption}</p>
            <div className="product-motion-surface mt-5 overflow-hidden rounded-lg border border-border-subtle bg-white/46">
              <Image src={object.media.motion} alt="" fill unoptimized className="object-cover opacity-[0.82]" sizes="(max-width: 1024px) 92vw, 56vw" />
              <div className="product-motion-surface__light" aria-hidden />
              <div className="product-motion-surface__shadow" aria-hidden />
              <p className="absolute bottom-4 left-4 right-4 z-[1] text-xs leading-6 text-white/86">
                Slow placement motion surface from real product material.
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-border-subtle bg-white/58 p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Product</p>
              <h1 className="mt-4 text-3xl leading-tight text-foreground sm:text-4xl">{object.title}</h1>
              <p className="mt-3 text-base leading-8 text-text-secondary">{object.subtitle}</p>
              <p className="mt-4 text-sm leading-8 text-text-secondary">{object.atmosphereLine}</p>
              <p className="mt-5 text-3xl text-foreground">{formatPrice(object.priceCents)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {sellingTags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border-subtle bg-white/64 px-3 py-1 text-xs text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 border-t border-border-subtle pt-5">
                <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Options</p>
                <div className="mt-4 space-y-3">
                  {skuOptions.map((option) => (
                    <div key={option.label} className="grid gap-2 sm:grid-cols-[5.4rem_1fr]">
                      <p className="text-xs text-text-muted">{option.label}</p>
                      <p className="rounded-md border border-border-subtle bg-white/54 px-3 py-2 text-sm leading-6 text-text-secondary">
                        {option.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-border-subtle pt-5">
                <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Service</p>
                <div className="mt-4 grid gap-3">
                  <p className="text-sm leading-7 text-text-secondary">{object.shippingNote}</p>
                  <p className="text-sm leading-7 text-text-secondary">Returns are handled by mail for damaged, incorrect, or clearly mismatched items.</p>
                  <p className="text-sm leading-7 text-text-secondary">Stock, dimensions, materials, and regional packing can be confirmed before shipment.</p>
                </div>
              </div>

              <div className="mt-6">
                <AddToCartButton
                  id={object.id}
                  title={object.title}
                  priceCents={object.priceCents}
                  image={object.media.hero}
                  disabled={object.archiveState === "quiet-archive" || object.stock <= 0}
                />
                <p className="mt-3 text-xs leading-6 text-text-muted">
                  {object.stock} available / {object.shippingState}
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-12 border-t border-border-subtle pt-10" aria-label="Product details">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Details</p>
            <h2 className="mt-3 text-2xl text-foreground">Material, placement, and room fit</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border-subtle bg-white">
                <Image src={object.media.placement} alt={`${object.title} placement photograph`} fill className="object-cover opacity-[0.9]" sizes="(max-width: 1024px) 92vw, 44vw" />
              </div>
              <figcaption className="mt-3 text-xs leading-6 text-text-muted">Atmosphere and placement surface.</figcaption>
            </figure>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border-subtle bg-white">
                <Image src={object.media.detail} alt={`${object.title} material detail`} fill className="object-cover opacity-[0.9]" sizes="(max-width: 1024px) 92vw, 44vw" />
              </div>
              <figcaption className="mt-3 text-xs leading-6 text-text-muted">Material and close detail surface.</figcaption>
            </figure>
          </div>

          <figure className="mt-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border-subtle bg-white">
              <Image src={object.media.package} alt={`${object.title} packaging reference`} fill className="object-cover opacity-[0.9]" sizes="(max-width: 1024px) 92vw, 56rem" />
            </div>
            <figcaption className="mt-3 text-xs leading-6 text-text-muted">
              Packaging reference for global order preparation.
            </figcaption>
          </figure>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <section className="rounded-lg border border-border-subtle bg-white/54 p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Materials</p>
              <ul className="mt-4 space-y-2">
                {object.materials.map((material) => (
                  <li key={material} className="text-sm leading-7 text-text-secondary">
                    {material}
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-lg border border-border-subtle bg-white/54 p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Dimensions</p>
              <p className="mt-4 text-sm leading-7 text-text-secondary">{object.dimensions}</p>
            </section>
            <section className="rounded-lg border border-border-subtle bg-white/54 p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Placement</p>
              <p className="mt-4 text-sm leading-7 text-text-secondary">{object.placement}</p>
            </section>
          </div>

          <div className="mt-6 rounded-lg border border-border-subtle bg-white/48 p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Description</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {object.detailSurfaces.map((surface) => (
              <p key={surface} className="text-sm leading-7 text-text-secondary">
                {surface}
              </p>
            ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-5 border-t border-border-subtle pt-10 lg:grid-cols-[0.42fr_0.58fr]" aria-label="Reviews and FAQ">
          <div className="rounded-lg border border-border-subtle bg-white/48 p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Reviews</p>
            <h2 className="mt-3 text-2xl text-foreground">Owner notes</h2>
            <p className="mt-4 text-sm leading-7 text-text-secondary">
              Owner photos and real feedback will be added after internal testing and first fulfilled orders.
            </p>
            <div className="mt-5 grid gap-3">
              <p className="rounded-md border border-border-subtle bg-white/54 p-3 text-xs leading-6 text-text-muted">
                Reserved for real owner use, not seeded marketing reviews.
              </p>
              <p className="rounded-md border border-border-subtle bg-white/54 p-3 text-xs leading-6 text-text-muted">
                Owner photo area will accept room photos, placement notes, and fit comments.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border-subtle bg-white/48 p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">FAQ</p>
            <div className="mt-4 divide-y divide-border-subtle">
              {faqItems.map((item) => (
                <section key={item.question} className="py-4 first:pt-0 last:pb-0">
                  <h3 className="text-sm text-foreground">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">{item.answer}</p>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-border-subtle bg-white/48 p-5" aria-label="Trust notes">
          <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Policy notes</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {object.trustNotes.map((note) => (
              <p key={note} className="text-xs leading-6 text-text-muted">
                {note}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-5 border-t border-border-subtle pt-10 lg:grid-cols-[0.45fr_0.55fr]" aria-label="Global order readiness">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Global readiness</p>
            <h2 className="mt-3 text-2xl text-foreground">Sizing, packing, and region handoff</h2>
            <p className="mt-4 text-sm leading-7 text-text-secondary">
              The page stays in English with USD base pricing. Currency, shipping-rule, compliance, and localization hooks
              are reserved so future regions do not require a page rebuild.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-lg border border-border-subtle bg-white/48 p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Packaging standard</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {globalPackagingStandard.map((item) => (
                  <p key={item} className="text-xs leading-6 text-text-muted">
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {globalCommerceRegions.slice(0, 4).map((region) => (
                <section key={region.region} className="rounded-lg border border-border-subtle bg-white/46 p-4">
                  <p className="text-xs text-foreground">{region.region}</p>
                  <p className="mt-2 text-xs leading-6 text-text-muted">{region.shippingHook}</p>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 border-t border-border-subtle pt-8" aria-label="Related objects">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Quiet pairing</p>
              <h2 className="mt-3 text-2xl text-foreground">Objects that can share the room</h2>
            </div>
            <Link href={`/collections/${object.collection}`} className="hidden text-sm text-text-muted underline-offset-4 hover:text-foreground hover:underline sm:block">
              Same collection
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {related.map((item) =>
              item ? (
                <Link key={item.id} href={`/objects/${item.id}`} className="quiet-air-touch rounded-lg border border-border-subtle bg-white/52 p-4 hover:bg-white/68">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border-subtle bg-white">
                    <Image src={item.media.hero} alt={item.media.alt} fill className="object-cover opacity-[0.88]" sizes="30vw" />
                  </div>
                  <p className="mt-3 text-sm text-foreground">{item.title}</p>
                  <p className="mt-2 text-xs text-text-muted">{formatPrice(item.priceCents)}</p>
                </Link>
              ) : null,
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

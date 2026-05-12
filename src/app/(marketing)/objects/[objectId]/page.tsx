import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { commerceObjects, formatPrice, objectById } from "@/config/operational-commerce";

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
    description: object?.subtitle ?? "Taoist365 object.",
  };
}

export default async function ObjectDetailPage({ params }: ObjectPageProps) {
  const { objectId } = await params;
  const object = objectById(objectId);

  if (!object) {
    return null;
  }

  const related = object.relatedIds.map((id) => objectById(id)).filter(Boolean);

  return (
    <main className="min-h-full bg-background">
      <div className="room-section-y-standard mx-auto w-full max-w-6xl px-6 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.58fr_0.42fr]">
          <section>
            <Link href={`/collections/${object.collection}`} className="text-xs text-text-muted underline-offset-4 hover:underline">
              {object.collectionTitle}
            </Link>
            <h1 className="mt-4 text-3xl leading-tight text-foreground sm:text-4xl">{object.title}</h1>
            <p className="mt-4 text-base leading-8 text-text-secondary">{object.subtitle}</p>
            <p className="mt-5 text-sm leading-8 text-text-secondary">{object.atmosphereLine}</p>
          </section>

          <aside className="rounded-lg border border-border-subtle bg-white/58 p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Purchase</p>
            <p className="mt-3 text-3xl text-foreground">{formatPrice(object.priceCents)}</p>
            <p className="mt-2 text-sm text-text-secondary">
              {object.stock} available / {object.shippingState}
            </p>
            <div className="mt-5">
              <AddToCartButton
                id={object.id}
                title={object.title}
                priceCents={object.priceCents}
                image={object.media.hero}
                disabled={object.archiveState === "quiet-archive" || object.stock <= 0}
              />
            </div>
          </aside>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.64fr_0.36fr]">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border-subtle bg-white">
              <Image src={object.media.hero} alt={object.media.alt} fill className="object-cover opacity-[0.9]" sizes="(max-width: 1024px) 92vw, 56vw" priority />
            </div>
            <p className="mt-3 text-xs leading-6 text-text-muted">{object.media.caption}</p>
            <div className="mt-5 rounded-lg border border-border-subtle bg-white/46 p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Video surface</p>
              <p className="mt-3 text-sm leading-7 text-text-secondary">
                Slow loop slot prepared for light, fabric, paper, or object shadow drift. Connect media storage to attach
                an actual video file.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <section className="rounded-lg border border-border-subtle bg-white/54 p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Material</p>
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
        </div>

        <section className="mt-10 rounded-lg border border-border-subtle bg-white/48 p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Details</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {object.detailSurfaces.map((surface) => (
              <p key={surface} className="text-sm leading-7 text-text-secondary">
                {surface}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-10 border-t border-border-subtle pt-8">
          <h2 className="text-2xl text-foreground">Related objects</h2>
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

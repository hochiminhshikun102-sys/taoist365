import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  collectionById,
  commerceCollections,
  formatPrice,
  objectsForCollection,
  type CommerceCollectionId,
} from "@/config/operational-commerce";

type CollectionPageProps = {
  params: Promise<{ collectionId: string }>;
};

export function generateStaticParams() {
  return commerceCollections.map((collection) => ({ collectionId: collection.id }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { collectionId } = await params;
  const collection = collectionById(collectionId);

  return {
    title: collection?.title ?? "Collection",
    description: collection?.summary ?? "Reverent Inquiry collection.",
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collectionId } = await params;
  const collection = collectionById(collectionId);
  const objects = objectsForCollection(collectionId as CommerceCollectionId);

  if (!collection) {
    return null;
  }

  const heroObject = objects.find((object) => object.title.includes("Wind Bell") || object.title.includes("Window Bell")) ?? objects[0];
  const editorialObjects = objects.slice(0, 6);

  return (
    <main className="min-h-full bg-background">
      <div className="room-section-y-standard mx-auto w-full max-w-6xl px-6 sm:px-10">
        <Link href="/collections" className="text-xs text-text-muted underline-offset-4 hover:underline">
          Collections
        </Link>
        <h1 className="mt-4 max-w-2xl text-3xl leading-tight text-foreground sm:text-4xl">{collection.title}</h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-text-secondary">{collection.entry}</p>
        {heroObject ? (
          <section className="mt-10 grid gap-6 overflow-hidden rounded-[0.92rem_1.16rem_1rem_1.08rem] border border-border-subtle bg-white/50 p-5 lg:grid-cols-[0.56fr_0.44fr]">
            <div className="product-motion-surface min-h-[20rem] overflow-hidden rounded-md border border-border-subtle bg-white">
              <Image src={heroObject.media.motion} alt={heroObject.media.alt} fill unoptimized className="object-cover opacity-[0.9]" sizes="(max-width: 1024px) 92vw, 52vw" />
              <div className="product-motion-surface__light" aria-hidden />
              <div className="product-motion-surface__shadow" aria-hidden />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Collection cinema</p>
              <h2 className="mt-3 text-2xl text-foreground">{heroObject.title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary">{heroObject.atmosphereLine}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border-subtle bg-white">
                  <Image src={heroObject.media.placement} alt={`${heroObject.title} placement`} fill className="object-cover opacity-[0.88]" sizes="18rem" />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border-subtle bg-white">
                  <Image src={heroObject.media.package} alt={`${heroObject.title} packaging`} fill className="object-cover opacity-[0.88]" sizes="18rem" />
                </div>
              </div>
              <p className="mt-5 text-sm text-foreground">{formatPrice(heroObject.priceCents)}</p>
            </div>
          </section>
        ) : null}

        <section className="mt-10 grid gap-4 border-t border-border-subtle pt-8 sm:grid-cols-3">
          {editorialObjects.slice(0, 3).map((object) => (
            <Link key={object.id} href={`/objects/${object.id}`} className="quiet-air-touch rounded-lg border border-border-subtle bg-white/48 p-4 transition hover:bg-white/68">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border-subtle bg-white">
                <Image src={object.media.detail} alt={`${object.title} detail`} fill className="object-cover opacity-[0.9]" sizes="30vw" />
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.12em] text-text-muted">Surface</p>
              <h2 className="mt-2 text-lg text-foreground">{object.title}</h2>
            </Link>
          ))}
        </section>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {objects.map((object) => (
            <Link
              key={object.id}
              href={`/objects/${object.id}`}
              className="quiet-air-touch rounded-lg border border-border-subtle bg-white/54 p-4 transition hover:bg-white/70"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border-subtle bg-white">
                <Image src={object.media.hero} alt={object.media.alt} fill className="object-cover opacity-[0.9]" sizes="(max-width: 768px) 90vw, 28vw" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.12em] text-text-muted">{object.shippingState}</p>
              <h2 className="mt-2 text-xl text-foreground">{object.title}</h2>
              <p className="mt-2 text-sm leading-6 text-text-secondary">{object.subtitle}</p>
              <p className="mt-3 text-sm text-foreground">{formatPrice(object.priceCents)}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

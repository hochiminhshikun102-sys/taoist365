import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { productByRuntimeId, productRuntimeObjects, type ProductRuntimeMedia, type ProductRuntimeObject } from "@/config/product-runtime";
import { breadcrumbSchema, buildSeoGeoMetadata, faqSchema, productSchema, SeoGeoJsonLd } from "@/lib/seo-geo-runtime";

type ObjectPageProps = {
  params: Promise<{ objectId: string }>;
};

type DetailRow = {
  label: string;
  value: string;
};

export function generateStaticParams() {
  return productRuntimeObjects
    .filter((object) => object.runtimeKind === "commerce")
    .flatMap((object) => [{ objectId: object.object_id }, { objectId: object.sourceId }]);
}

export async function generateMetadata({ params }: ObjectPageProps): Promise<Metadata> {
  const { objectId } = await params;
  const object = productByRuntimeId(objectId);

  return buildSeoGeoMetadata({
    title: object ? `${object.name} - Dohara` : "Object - Dohara",
    description: object?.oneLine ?? "A Dohara object with quiet material presence.",
    path: object ? `/objects/${object.sourceId}` : "/objects",
    kind: "product",
    image: object?.media[0]?.src,
    phrases: object ? [object.name, object.runtimeKind, ...object.emotionalMetadata.tags] : undefined,
  });
}

function isVideo(media?: ProductRuntimeMedia) {
  return Boolean(media?.src.match(/\.(mp4|webm|mov|m4v)(\?|$)/i));
}

function uniqueMedia(object: ProductRuntimeObject) {
  const seen = new Set<string>();
  return object.media.filter((media) => {
    if (!media.src || seen.has(media.src)) return false;
    seen.add(media.src);
    return true;
  });
}

function mediaByKind(object: ProductRuntimeObject, kind: ProductRuntimeMedia["kind"]) {
  return object.media.find((media) => media.kind === kind) ?? object.media[0];
}

function objectCategory(object: ProductRuntimeObject) {
  return object.commerce?.collectionTitle ?? object.emotionalMetadata.tags[0] ?? "Objects";
}

function inventoryLabel(object: ProductRuntimeObject) {
  const stock = object.commerce?.stock ?? 0;
  if (stock <= 0) return "Out of stock";
  if (stock <= 3) return "Low stock";
  return "In stock";
}

function detailRows(object: ProductRuntimeObject): DetailRow[] {
  return [
    { label: "Material", value: object.materials.join(", ") || "Confirmed before shipping" },
    { label: "Dimensions", value: object.commerce?.dimensions ?? "Measured before shipment" },
    { label: "Weight", value: "Confirmed by operations before shipping" },
    { label: "Color", value: "Sand Beige / soft neutral" },
    { label: "Use", value: object.placedInLife[0] ?? "Daily room use" },
    { label: "Care", value: "Wipe gently with a dry cloth. Avoid harsh chemicals." },
    { label: "Origin", value: "Dohara supplier record" },
    { label: "Package Includes", value: `1 x ${object.name}, protective packaging, product card` },
  ];
}

function renderMedia(media: ProductRuntimeMedia, alt: string, className: string, priority = false) {
  if (isVideo(media)) {
    return <video src={media.src} poster={media.src} controls playsInline preload="metadata" className={className} />;
  }

  return <Image src={media.src} alt={alt} fill priority={priority} className={className} sizes="(max-width: 768px) 100vw, 620px" />;
}

function StoreHeader() {
  return (
    <header className="hidden border-b border-[#e8ecf1] bg-white md:block">
      <div className="mx-auto grid h-20 w-full max-w-[1440px] grid-cols-[220px_1fr_260px] items-center px-10">
        <Link href="/" className="font-[var(--font-display-serif)] text-[2rem] leading-none text-[#0b1b33]">
          Dohara
        </Link>
        <nav className="flex justify-center gap-12 text-[15px] font-medium leading-[22px] text-[#1a2a44]" aria-label="Storefront navigation">
          <Link href="/objects" className="relative flex h-20 items-center after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-14 after:-translate-x-1/2 after:bg-[#2e4a7d]">
            Objects
          </Link>
          <Link href="/collections" className="flex h-20 items-center">
            Collections
          </Link>
          <Link href="/search" className="flex h-20 items-center gap-2">
            <span aria-hidden="true">⌕</span> Search
          </Link>
        </nav>
        <nav className="flex justify-end gap-8 text-[24px] leading-none text-[#1a2a44]" aria-label="Storefront actions">
          <Link href="/account/wishlist" aria-label="Wishlist">
            ♡
          </Link>
          <Link href="/account" aria-label="Account">
            ♙
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative">
            □
            <span className="absolute -right-2 -top-2 grid h-[14px] min-w-[14px] place-items-center rounded-full bg-[#0b1b33] px-1 text-[10px] font-semibold text-white">
              2
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default async function ObjectDetailPage({ params }: ObjectPageProps) {
  const { objectId } = await params;
  const object = productByRuntimeId(objectId);

  if (!object || object.runtimeKind !== "commerce") return null;

  const media = uniqueMedia(object).slice(0, 7);
  const mainMedia = media[0] ?? object.media[0];
  const detailMedia = mediaByKind(object, "residue");
  const sceneMedia = [mediaByKind(object, "shelf"), mediaByKind(object, "emotional"), mediaByKind(object, "pc"), mediaByKind(object, "atmosphere")].filter(Boolean);
  const videoMedia = mediaByKind(object, "ai");
  const nearby = object.nearbyObjectIds.map((id) => productByRuntimeId(id)).filter((item): item is ProductRuntimeObject => Boolean(item?.commerce)).slice(0, 5);
  const stock = object.commerce?.stock ?? 0;
  const category = objectCategory(object);
  const faqItems = [
    { question: "Shipping time", answer: "Delivery timing is confirmed by region before payment. Free shipping can apply on orders over $99." },
    { question: "Returns & Exchanges", answer: "30-day returns and exchanges are supported for unused items in original condition." },
    { question: "What is included", answer: `1 x ${object.name}, protective packaging, and a product card.` },
    { question: "How to care", answer: "Wipe gently with a dry cloth and keep away from harsh chemicals." },
  ];

  return (
    <main className="min-h-full bg-[#f7f9fc] pb-24 text-[#1a2a44] md:pb-0">
      <SeoGeoJsonLd
        graph={[
          object.commerce ? productSchema(object.commerce) : null,
          faqSchema(faqItems),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Objects", path: "/objects" },
            { name: category, path: `/objects?category=${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` },
            { name: object.name, path: `/objects/${object.sourceId}` },
          ]),
        ].filter(Boolean)}
      />

      <StoreHeader />

      <nav className="mx-auto hidden h-12 w-full max-w-[1440px] items-center gap-2 px-10 text-[13px] leading-5 text-[#6b778c] md:flex" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/objects">Objects</Link>
        <span>/</span>
        <Link href={`/objects?category=${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{category}</Link>
        <span>/</span>
        <span className="text-[#3b4556]">{object.name}</span>
      </nav>

      <section className="mx-auto grid w-full max-w-[1440px] gap-6 bg-white md:bg-transparent md:px-10 md:pb-12 md:pt-6 lg:grid-cols-[72px_620px_minmax(340px,380px)] lg:gap-10" aria-label="Product decision hero">
        <div className="hidden flex-col gap-3 lg:flex">
          {media.slice(0, 6).map((item, index) => (
            <a key={`${item.src}-${index}`} href={`#media-${index + 1}`} className={`relative h-16 w-16 overflow-hidden rounded-lg border bg-white ${index === 0 ? "border-2 border-[#2e4a7d]" : "border-[#e6eaf0]"}`}>
              <Image src={item.src} alt={`${object.name} thumbnail ${index + 1}`} fill className="object-cover" sizes="64px" />
              {isVideo(item) ? <span className="absolute inset-0 grid place-items-center bg-[#0b1b33]/45 text-[18px] text-white">▶</span> : null}
            </a>
          ))}
          <button type="button" className="grid h-8 w-8 place-items-center self-center rounded-full border border-[#e6eaf0] bg-white text-[#2e4a7d]" aria-label="Show more media">
            ˅
          </button>
        </div>

        <div>
          <div id="media-1" className="relative h-[390px] overflow-hidden bg-white md:h-[620px] md:rounded-xl md:border md:border-[#e6eaf0]">
            {renderMedia(mainMedia, object.name, "object-cover", true)}
            <button type="button" aria-label="Play media" className="absolute left-1/2 top-1/2 grid h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/88 text-[24px] text-[#0b1b33] shadow-[0_12px_28px_rgba(13,32,64,0.14)] md:h-[72px] md:w-[72px]">
              ▶
            </button>
            <span className="absolute bottom-4 right-16 rounded-full bg-white/88 px-3 py-1 text-[13px] text-[#3b4556]">1 / {media.length}</span>
            <button type="button" aria-label="Open media preview" className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white/88 text-[18px] text-[#0b1b33]">
              ⛶
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto border-b border-[#e8ecf1] bg-white px-4 py-3 md:hidden">
            {media.map((item, index) => (
              <a key={`${item.src}-mobile-${index}`} href={`#media-${index + 1}`} className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-white ${index === 0 ? "border-2 border-[#2e4a7d]" : "border-[#e6eaf0]"}`}>
                <Image src={item.src} alt={`${object.name} thumbnail ${index + 1}`} fill className="object-cover" sizes="64px" />
              </a>
            ))}
          </div>
        </div>

        <aside className="px-4 pb-6 pt-5 md:sticky md:top-[104px] md:self-start md:px-0 md:pb-0 md:pt-0">
          <div className="inline-flex rounded-full bg-[#f3e7d7] px-3 py-1 text-[12px] font-semibold leading-[18px] text-[#8a5a22]">Best Seller</div>
          <h1 className="mt-4 font-[var(--font-display-serif)] text-[24px] font-semibold leading-8 text-[#0b1b33] md:text-[36px] md:leading-[44px]">{object.name}</h1>
          <p className="mt-2 text-[14px] leading-[22px] text-[#6b778c] md:text-[16px] md:leading-6">{object.commerce?.subtitle ?? "Stillness in Motion."}</p>
          <a href="#reviews" className="mt-4 flex items-center gap-2 text-[13px] leading-5 text-[#3b4556] md:text-[14px]">
            <span className="text-[#b58a5b]">★★★★★</span>
            <span>4.9 (132 reviews)</span>
          </a>
          <p className="mt-4 text-[24px] font-semibold leading-8 text-[#0b1b33] md:text-[28px] md:leading-9">{object.priceLine}</p>
          <p className="mt-4 line-clamp-3 text-[14px] leading-[22px] text-[#3b4556] md:text-[15px] md:leading-6">{object.oneLine}</p>

          <ul className="mt-5 grid gap-3">
            {["Handmade finish", "Inspired by daily rooms", "Perfect for quiet rituals", "Calming & minimal design"].map((point) => (
              <li key={point} className="flex items-center gap-3 text-[14px] leading-[22px] text-[#3b4556]">
                <span className="grid h-[18px] w-[18px] place-items-center rounded-full border border-[#2e4a7d] text-[11px] text-[#2e4a7d]">✓</span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p className="text-[14px] leading-[22px] text-[#3b4556]">Color: <span className="text-[#6b778c]">Sand Beige</span></p>
            <div className="mt-3 flex gap-2">
              {["#c8b29a", "#d8dde2", "#f2eee7"].map((color, index) => (
                <button key={color} type="button" aria-label={`Select color ${index + 1}`} className={`h-8 w-8 rounded-md border ${index === 0 ? "border-2 border-[#2e4a7d]" : "border-[#e6eaf0]"}`} style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-[14px] leading-[22px] text-[#3b4556]">Quantity:</p>
            <div className="mt-2 grid h-11 w-[132px] grid-cols-3 overflow-hidden rounded-lg border border-[#e6eaf0] bg-white text-center text-[15px]">
              <button type="button" className="border-r border-[#e6eaf0] text-[#2e4a7d]" aria-label="Decrease quantity">−</button>
              <span className="grid place-items-center text-[#0b1b33]">1</span>
              <button type="button" className="border-l border-[#e6eaf0] text-[#2e4a7d]" aria-label="Increase quantity" disabled={stock <= 1}>＋</button>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <AddToCartButton
              id={object.object_id}
              title={object.name}
              priceCents={object.commerce?.priceCents ?? 0}
              image={mainMedia.src}
              disabled={stock <= 0}
              label="ADD TO CART"
              addedLabel="ADDED"
              className="grid h-12 w-full place-items-center rounded-lg bg-[#0b1b33] text-[15px] font-semibold leading-5 text-white"
            />
            <AddToCartButton
              id={object.object_id}
              title={object.name}
              priceCents={object.commerce?.priceCents ?? 0}
              image={mainMedia.src}
              disabled={stock <= 0}
              label="BUY IT NOW"
              addedLabel="OPENING CHECKOUT"
              redirectHref="/checkout"
              className="grid h-12 w-full place-items-center rounded-lg border border-[#2e4a7d] bg-white text-[15px] font-semibold leading-5 text-[#2e4a7d] hover:bg-[#f7f9fc]"
            />
            <button type="button" className="flex h-11 items-center gap-3 text-[14px] leading-[22px] text-[#3b4556]">
              <span className="text-[18px] text-[#2e4a7d]">♡</span> Save to Wishlist
            </button>
          </div>
        </aside>
      </section>

      <section className="border-y border-[#e8ecf1] bg-white" aria-label="Trust bar">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px px-4 py-4 md:grid-cols-4 md:px-10 md:py-6">
          {[
            ["▱", "Free Shipping", "On orders over $99"],
            ["↻", "30-Day Returns", "Easy returns & exchanges"],
            ["▣", "Secure Payment", "Protected by Stripe"],
            ["✧", "Sustainable Packaging", "Eco-friendly materials"],
          ].map(([icon, title, text]) => (
            <div key={title} className="flex items-center gap-3 p-3">
              <span className="text-[24px] text-[#2e4a7d]">{icon}</span>
              <span>
                <span className="block text-[12px] font-semibold leading-4 text-[#1a2a44] md:text-[14px] md:leading-5">{title}</span>
                <span className="block text-[11px] leading-4 text-[#6b778c] md:text-[13px] md:leading-5">{text}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 md:grid-cols-[360px_minmax(0,1fr)] md:px-10 md:py-14 lg:gap-16" aria-label="Why this object">
        <div>
          <h2 className="text-[18px] font-semibold leading-[26px] text-[#0b1b33] md:text-[24px] md:leading-8">Why this object</h2>
          <div className="mt-5 grid gap-4">
            {[
              ["Made for daily use", "Simple shape, stable and versatile for everyday moments."],
              ["Calm texture, easy to place", object.materialNote],
              ["A quiet gift for the room", "Brings stillness and warmth to any corner."],
            ].map(([title, text]) => (
              <article key={title} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eef3fa] text-[#2e4a7d]">✧</span>
                <span>
                  <span className="block text-[15px] font-semibold leading-6 text-[#1a2a44]">{title}</span>
                  <span className="block text-[14px] leading-[21px] text-[#6b778c]">{text}</span>
                </span>
              </article>
            ))}
          </div>
        </div>
        <figure className="relative aspect-video overflow-hidden rounded-xl bg-white md:min-h-[360px]">
          <Image src={sceneMedia[0]?.src ?? mainMedia.src} alt={`${object.name} in a room`} fill className="object-cover" sizes="(max-width: 768px) 92vw, 900px" />
          <button type="button" aria-label="Play scene media" className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/88 text-[#0b1b33]">▶</button>
        </figure>
      </section>

      <section className="border-t border-[#e8ecf1] bg-white" aria-label="Product details">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 md:grid-cols-[560px_minmax(0,620px)] md:px-10 md:py-14 md:gap-16">
          <div>
            <h2 className="text-[18px] font-semibold leading-[26px] text-[#0b1b33] md:text-[24px] md:leading-8">Product Details</h2>
            <dl className="mt-5">
              {detailRows(object).map((row) => (
                <div key={row.label} className="grid min-h-9 grid-cols-[130px_minmax(0,1fr)] border-b border-[#e8ecf1] py-2 text-[13px] md:grid-cols-[180px_minmax(0,1fr)] md:text-[14px]">
                  <dt className="font-semibold text-[#3b4556]">{row.label}</dt>
                  <dd className="text-[#6b778c]">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative min-h-[260px] overflow-hidden rounded-xl border border-[#e6eaf0] bg-white md:min-h-[300px]">
            <Image src={detailMedia.src} alt={`${object.name} dimension and detail`} fill className="object-cover opacity-90" sizes="(max-width: 768px) 92vw, 620px" />
            <div className="absolute inset-x-8 bottom-10 border-t border-[#b8c4d4] text-center text-[13px] text-[#6b778c]">
              <span className="-mt-3 inline-block bg-white/80 px-3">{object.commerce?.dimensions ?? "Measured before shipping"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-10 md:px-10 md:py-14" aria-label="In your space">
        <h2 className="text-[18px] font-semibold leading-[26px] text-[#0b1b33] md:text-[24px] md:leading-8">In Your Space</h2>
        <p className="mt-1 text-[14px] leading-[22px] text-[#6b778c] md:text-[15px] md:leading-6">See how this object lives with light, air, and daily use.</p>
        <div className="mt-5 flex gap-4 overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible">
          {sceneMedia.slice(0, 4).map((item, index) => (
            <figure key={`${item.src}-space-${index}`} className="relative h-[190px] w-[300px] shrink-0 overflow-hidden rounded-[10px] bg-white md:h-[220px] md:w-auto">
              <Image src={item.src} alt={`${object.name} space ${index + 1}`} fill className="object-cover" sizes="(max-width: 768px) 300px, 25vw" />
            </figure>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e8ecf1] bg-white" aria-label="See it in use">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-10 md:grid-cols-[260px_360px_minmax(0,1fr)] md:px-10 md:py-14">
          <div>
            <h2 className="text-[18px] font-semibold leading-[26px] text-[#0b1b33] md:text-[24px] md:leading-8">See it in use</h2>
            <p className="mt-2 text-[14px] leading-[22px] text-[#6b778c] md:text-[15px] md:leading-6">A simple ritual that brings stillness to your day.</p>
            <ul className="mt-5 grid gap-2 text-[14px] leading-[22px] text-[#3b4556]">
              {["Place it on a stable surface", "Let the room light pass naturally", "Keep the surface dry", "Enjoy the moment"].map((step) => (
                <li key={step} className="flex gap-2"><span className="text-[#2e4a7d]">⊙</span>{step}</li>
              ))}
            </ul>
          </div>
          <figure className="relative aspect-video overflow-hidden rounded-xl bg-[#0b1b33] md:h-60">
            <Image src={videoMedia.src} alt={`${object.name} use video cover`} fill className="object-cover opacity-90" sizes="360px" />
            <button type="button" aria-label="Play use video" className="absolute left-1/2 top-1/2 grid h-[52px] w-[52px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/88 text-[#0b1b33]">▶</button>
            <span className="absolute bottom-2 right-2 rounded bg-[#0b1b33]/75 px-2 py-1 text-[11px] text-white">0:30</span>
          </figure>
          <div id="reviews" className="grid gap-3 md:grid-cols-3">
            {["Beautiful and calming. The shape is elegant and perfect for my space.", "Love the texture and natural color. Great quality.", "Exactly as described. A wonderful addition to my daily ritual."].map((review, index) => (
              <article key={review} className="rounded-xl border border-[#e6eaf0] bg-white p-5">
                <p className="text-[#b58a5b]">★★★★★</p>
                <p className="mt-3 line-clamp-3 text-[14px] leading-[22px] text-[#3b4556]">{review}</p>
                <p className="mt-4 text-[13px] font-semibold text-[#1a2a44]">{["Sarah L.", "Michael T.", "Emily R."][index]}</p>
                <p className="text-[12px] text-[#6b778c]">Verified Buyer</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-10 md:px-10 md:py-14" aria-label="Reviews summary">
        <h2 className="text-[18px] font-semibold leading-[26px] text-[#0b1b33] md:text-[24px] md:leading-8">Reviews</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
          <div>
            <p className="text-[48px] font-semibold leading-[56px] text-[#0b1b33]">4.9</p>
            <p className="text-[#b58a5b]">★★★★★</p>
            <p className="mt-2 text-[14px] text-[#6b778c]">Based on 132 reviews</p>
          </div>
          <div className="flex gap-3">
            <Link href="#reviews" className="grid h-10 min-w-[150px] place-items-center rounded-md border border-[#2e4a7d] text-[13px] font-semibold text-[#2e4a7d]">VIEW ALL REVIEWS</Link>
            <Link href="#reviews" className="hidden h-10 min-w-[150px] place-items-center rounded-md bg-[#0b1b33] text-[13px] font-semibold text-white md:grid">WRITE A REVIEW</Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e8ecf1] bg-white" aria-label="Complete the ritual">
        <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-10 md:py-14">
          <h2 className="text-[18px] font-semibold leading-[26px] text-[#0b1b33] md:text-[24px] md:leading-8">Complete the Ritual</h2>
          <p className="mt-1 text-[14px] leading-[22px] text-[#6b778c] md:text-[15px] md:leading-6">Thoughtfully chosen companions for this object.</p>
          <div className="mt-5 flex gap-4 overflow-x-auto md:grid md:grid-cols-5 md:gap-6 md:overflow-visible">
            {nearby.map((item) => {
              const image = item.media[0] ?? mainMedia;
              return (
                <article key={item.object_id} className="w-[150px] shrink-0 md:w-auto">
                  <Link href={`/objects/${item.sourceId}`} className="block">
                    <div className="relative h-[120px] overflow-hidden rounded-[10px] bg-[#f7f9fc] md:h-[150px]">
                      <Image src={image.src} alt={item.name} fill className="object-cover" sizes="220px" />
                    </div>
                    <p className="mt-3 line-clamp-2 text-[12px] font-medium leading-[17px] text-[#1a2a44] md:text-[14px] md:leading-5">{item.name}</p>
                    <p className="mt-1 text-[13px] font-semibold text-[#0b1b33] md:text-[14px]">{item.priceLine}</p>
                  </Link>
                  <button type="button" className="mt-3 grid h-[34px] w-full place-items-center rounded-md border border-[#2e4a7d] text-[11px] font-semibold text-[#2e4a7d] md:h-9 md:text-[12px]">ADD TO CART</button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-8 md:px-10 md:py-10" aria-label="Shipping returns and FAQ">
        <div className="hidden grid-cols-6 gap-3 md:grid">
          {faqItems.concat([
            { question: "Is this giftable?", answer: "Yes. It can be prepared as a thoughtful gift-ready object." },
            { question: "Payment security", answer: "All payments are encrypted and secure." },
          ]).map((item) => (
            <article key={item.question} className="min-h-24 rounded-[10px] border border-[#e6eaf0] bg-white p-4">
              <h3 className="text-[14px] font-semibold leading-5 text-[#1a2a44]">{item.question}</h3>
              <p className="mt-2 text-[13px] leading-[19px] text-[#6b778c]">{item.answer}</p>
            </article>
          ))}
        </div>
        <div className="grid gap-0 md:hidden">
          {faqItems.map((item) => (
            <details key={item.question} className="border-b border-[#e8ecf1] bg-white">
              <summary className="flex h-14 cursor-pointer list-none items-center justify-between px-1 text-[14px] font-semibold text-[#1a2a44]">
                {item.question}
                <span>⌄</span>
              </summary>
              <p className="pb-5 text-[13px] leading-5 text-[#6b778c]">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#e8ecf1] bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 md:grid-cols-[260px_repeat(3,1fr)_320px] md:px-10 md:py-14">
          <div>
            <p className="font-[var(--font-display-serif)] text-[2rem] leading-none text-[#0b1b33]">Dohara</p>
            <p className="mt-4 text-[13px] leading-5 text-[#6b778c]">© 2026 Dohara. All rights reserved.</p>
          </div>
          {[
            ["Shop", "New Arrivals", "Best Sellers", "Objects", "Collections"],
            ["Customer Care", "Shipping Policy", "Returns & Exchanges", "FAQ", "Track Your Order"],
            ["About", "Our Story", "Sustainability", "Wholesale"],
          ].map(([title, ...links]) => (
            <div key={title}>
              <h3 className="text-[14px] font-semibold text-[#1a2a44]">{title}</h3>
              <div className="mt-3 grid gap-2 text-[13px] text-[#6b778c]">
                {links.map((item) => <Link key={item} href="/objects">{item}</Link>)}
              </div>
            </div>
          ))}
          <div>
            <h3 className="text-[14px] font-semibold text-[#1a2a44]">Stay in the moment</h3>
            <p className="mt-3 text-[13px] leading-5 text-[#6b778c]">Join our newsletter for mindful living insights and special offers.</p>
            <div className="mt-4 grid h-11 grid-cols-[1fr_48px] overflow-hidden rounded-md border border-[#e6eaf0]">
              <input aria-label="Email" placeholder="Enter your email" className="px-3 text-[13px] outline-none" />
              <button type="button" className="bg-[#0b1b33] text-white">→</button>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 grid h-[72px] grid-cols-[1fr_180px] items-center gap-3 border-t border-[#e8ecf1] bg-white px-4 md:hidden">
        <div>
          <p className="text-[18px] font-semibold leading-6 text-[#0b1b33]">{object.priceLine}</p>
          <p className="text-[11px] leading-4 text-[#6b778c]">{inventoryLabel(object)}</p>
        </div>
        <AddToCartButton
          id={object.object_id}
          title={object.name}
          priceCents={object.commerce?.priceCents ?? 0}
          image={mainMedia.src}
          disabled={stock <= 0}
          label="ADD TO CART"
          addedLabel="ADDED"
          className="grid h-12 w-full place-items-center rounded-lg bg-[#0b1b33] text-[14px] font-semibold leading-5 text-white"
        />
      </div>
    </main>
  );
}

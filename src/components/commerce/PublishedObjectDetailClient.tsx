"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import {
  isVideoMedia,
  publicObjectImage,
  publicObjectInventoryLabel,
  publicObjectPriceCents,
  publicObjectPriceLine,
  type PublicObject,
  type PublicObjectMedia,
} from "@/lib/public-objects";

type PublishedObjectDetailClientProps = {
  objectId: string;
};

export function PublishedObjectDetailClient({ objectId }: PublishedObjectDetailClientProps) {
  const [object, setObject] = useState<PublicObject | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/public/objects?object_id=${encodeURIComponent(objectId)}`, { cache: "no-store" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || "Object not found.");
        return;
      }
      setObject(data.object);
    }
    void load();
  }, [objectId]);

  const media = useMemo(() => uniqueMedia(object?.media || []), [object]);
  const mainMedia = media[0] || objectToMainMedia(object);

  if (error) {
    return (
      <main className="min-h-dvh bg-[#f7f9fc] px-5 py-12 text-[#1a2a44]">
        <section className="mx-auto max-w-3xl rounded-xl border border-[#e6eaf0] bg-white p-6">
          <p className="text-sm text-[#6b778c]">Dohara Objects</p>
          <h1 className="mt-3 text-3xl font-semibold">Object unavailable</h1>
          <p className="mt-3 text-sm text-[#6b778c]">{error}</p>
          <Link href="/objects" className="mt-5 inline-flex rounded-lg bg-[#0b1b33] px-4 py-3 text-sm text-white">Back to Objects</Link>
        </section>
      </main>
    );
  }

  if (!object) {
    return (
      <main className="min-h-dvh bg-[#f7f9fc] px-5 py-12 text-[#1a2a44]">
        <section className="mx-auto max-w-3xl rounded-xl border border-[#e6eaf0] bg-white p-6 text-sm text-[#6b778c]">Loading object...</section>
      </main>
    );
  }

  const stock = Number(object.inventory || 0);

  return (
    <main className="min-h-full bg-[#f7f9fc] pb-24 text-[#1a2a44] md:pb-0">
      <header className="hidden border-b border-[#e8ecf1] bg-white md:block">
        <div className="mx-auto grid h-20 w-full max-w-[1440px] grid-cols-[220px_1fr_260px] items-center px-10">
          <Link href="/" className="font-[var(--font-display-serif)] text-[2rem] leading-none text-[#0b1b33]">Dohara</Link>
          <nav className="flex justify-center gap-12 text-[15px] font-medium leading-[22px] text-[#1a2a44]" aria-label="Storefront navigation">
            <Link href="/objects" className="relative flex h-20 items-center after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-14 after:-translate-x-1/2 after:bg-[#2e4a7d]">Objects</Link>
            <Link href="/collections" className="flex h-20 items-center">Collections</Link>
            <Link href="/search" className="flex h-20 items-center">Search</Link>
          </nav>
          <nav className="flex justify-end gap-8 text-[24px] leading-none text-[#1a2a44]" aria-label="Storefront actions">
            <Link href="/account" aria-label="Account">{"\u2659"}</Link>
            <Link href="/cart" aria-label="Cart">{"\u25A1"}</Link>
          </nav>
        </div>
      </header>

      <nav className="mx-auto hidden h-12 w-full max-w-[1440px] items-center gap-2 px-10 text-[13px] leading-5 text-[#6b778c] md:flex" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/objects">Objects</Link>
        <span>/</span>
        <span className="text-[#3b4556]">{object.title}</span>
      </nav>

      <section className="mx-auto grid w-full max-w-[1440px] gap-6 bg-white md:bg-transparent md:px-10 md:pb-12 md:pt-6 lg:grid-cols-[72px_620px_minmax(340px,380px)] lg:gap-10">
        <div className="hidden flex-col gap-3 lg:flex">
          {media.slice(0, 6).map((item, index) => (
            <a key={`${item.url}-${index}`} href={`#media-${index + 1}`} className={`relative h-16 w-16 overflow-hidden rounded-lg border bg-white ${index === 0 ? "border-2 border-[#2e4a7d]" : "border-[#e6eaf0]"}`}>
              {isVideoMedia(item) ? <span className="grid h-full place-items-center bg-[#0b1b33] text-xs text-white">Video</span> : <Image src={item.url} alt={`${object.title} thumbnail ${index + 1}`} fill unoptimized className="object-cover" sizes="64px" />}
            </a>
          ))}
        </div>

        <div>
          <div id="media-1" className="relative h-[390px] overflow-hidden bg-white md:h-[620px] md:rounded-xl md:border md:border-[#e6eaf0]">
            {isVideoMedia(mainMedia) ? (
              <video src={mainMedia.url} controls playsInline preload="metadata" className="h-full w-full object-cover" />
            ) : (
              <Image src={mainMedia.url} alt={object.title} fill unoptimized priority className="object-cover" sizes="(max-width: 768px) 100vw, 620px" />
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto border-b border-[#e8ecf1] bg-white px-4 py-3 md:hidden">
            {media.map((item, index) => (
              <a key={`${item.url}-mobile-${index}`} href={`#media-${index + 1}`} className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-white ${index === 0 ? "border-2 border-[#2e4a7d]" : "border-[#e6eaf0]"}`}>
                {isVideoMedia(item) ? <span className="grid h-full place-items-center bg-[#0b1b33] text-[10px] text-white">Video</span> : <Image src={item.url} alt={`${object.title} thumbnail ${index + 1}`} fill unoptimized className="object-cover" sizes="64px" />}
              </a>
            ))}
          </div>
        </div>

        <aside className="px-4 pb-6 pt-5 md:sticky md:top-[104px] md:self-start md:px-0 md:pb-0 md:pt-0">
          <div className="inline-flex rounded-full bg-[#f3e7d7] px-3 py-1 text-[12px] font-semibold leading-[18px] text-[#8a5a22]">New Arrival</div>
          <h1 className="mt-4 font-[var(--font-display-serif)] text-[24px] font-semibold leading-8 text-[#0b1b33] md:text-[36px] md:leading-[44px]">{object.title}</h1>
          <p className="mt-2 text-[14px] leading-[22px] text-[#6b778c] md:text-[16px] md:leading-6">{object.subtitle || object.category || "Dohara object"}</p>
          <p className="mt-4 text-[24px] font-semibold leading-8 text-[#0b1b33] md:text-[28px] md:leading-9">{publicObjectPriceLine(object)}</p>
          <p className="mt-4 line-clamp-4 text-[14px] leading-[22px] text-[#3b4556] md:text-[15px] md:leading-6">{object.description || object.product_story || "Product details are confirmed by operations before shipment."}</p>
          <p className="mt-4 text-[14px] leading-[22px] text-[#6b778c]">{publicObjectInventoryLabel(object)}</p>

          <div className="mt-6 grid gap-3">
            <AddToCartButton
              id={object.object_id}
              title={object.title}
              priceCents={publicObjectPriceCents(object)}
              image={publicObjectImage(object)}
              disabled={stock <= 0}
              label="ADD TO CART"
              addedLabel="ADDED"
              className="grid h-12 w-full place-items-center rounded-lg bg-[#0b1b33] text-[15px] font-semibold leading-5 text-white"
            />
            <AddToCartButton
              id={object.object_id}
              title={object.title}
              priceCents={publicObjectPriceCents(object)}
              image={publicObjectImage(object)}
              disabled={stock <= 0}
              label="BUY IT NOW"
              addedLabel="OPENING CHECKOUT"
              redirectHref="/checkout"
              className="grid h-12 w-full place-items-center rounded-lg border border-[#2e4a7d] bg-white text-[15px] font-semibold leading-5 text-[#2e4a7d] hover:bg-[#f7f9fc]"
            />
          </div>
        </aside>
      </section>

      <section className="mx-auto grid w-full max-w-[1440px] gap-6 px-5 py-10 md:px-10">
        <div className="rounded-xl border border-[#e6eaf0] bg-white p-5">
          <h2 className="text-xl font-semibold text-[#0b1b33]">Product Story</h2>
          <p className="mt-3 text-sm leading-7 text-[#3b4556]">{object.product_story || object.description || "This product was published from the Dohara Object Intake pipeline."}</p>
          {object.tags?.length ? <div className="mt-4 flex flex-wrap gap-2">{object.tags.map((tag) => <span key={tag} className="rounded-full bg-[#f7f9fc] px-3 py-1 text-xs text-[#6b778c]">{tag}</span>)}</div> : null}
        </div>
      </section>
    </main>
  );
}

function uniqueMedia(media: PublicObjectMedia[]) {
  const seen = new Set<string>();
  return media.filter((item) => {
    if (!item.url || seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

function objectToMainMedia(object: PublicObject | null): PublicObjectMedia {
  return {
    id: "primary",
    type: "main",
    url: object ? publicObjectImage(object) : "/homepage-hero/windkeep-lantern-sea.png",
    mime_type: object?.primary_media_type || "image/png",
  };
}

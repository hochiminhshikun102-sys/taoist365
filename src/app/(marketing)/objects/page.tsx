import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { CartLink } from "@/components/commerce/CartLink";
import { commerceObjects, formatPrice } from "@/config/operational-commerce";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Objects",
  description: "A breathable object room for quiet living objects, gifts, desk pieces, and seasonal things.",
  openGraph: {
    title: `Objects - ${siteConfig.siteName}`,
    description: "A breathable object room for quiet living objects, gifts, desk pieces, and seasonal things.",
    url: `${siteConfig.metadataBase}/objects`,
  },
};

const categoryChips = [
  { label: "Wind Living", href: "/collections/wind-objects", image: "/objects-living/49.jpg" },
  { label: "Tea & Pause", href: "/collections/ritual-objects", image: "/objects-living/76.png" },
  { label: "Desk Objects", href: "/collections/quiet-desk", image: "/objects-living/85.jpg" },
  { label: "Quiet Gifts", href: "/collections/seasonal-collections", image: "/objects-living/12.jpg" },
  { label: "Healing", href: "/healing", image: "/objects-living/68.jpg" },
  { label: "POD Apparel", href: "/search?q=apparel", image: "/objects-derived/102-hero.webp" },
  { label: "Outdoor Wind", href: "/collections/wind-objects", image: "/objects-living/妞嬪酣鎼?01.jpg" },
  { label: "Seasonal Things", href: "/new-arrivals", image: "/objects-derived/103-hero.webp" },
] as const;

const heroSlides = [
  {
    title: "Things that let a room breathe.",
    body: "For lighter days and quieter spaces.",
    href: "/collections/wind-objects",
    image: "/objects-living/49.jpg",
  },
  {
    title: "A quieter way to begin the day.",
    body: "Tea, paper, light, and small useful things.",
    href: "/collections/quiet-desk",
    image: "/objects-living/76.png",
  },
  {
    title: "Objects for real moments.",
    body: "Selected pieces for home, desk, gift, and pause.",
    href: "/new-arrivals",
    image: "/objects-living/85.jpg",
  },
] as const;

const sidebarCategories = [
  ["All Objects", commerceObjects.length],
  ["Incense & Aroma", 168],
  ["Tea & Ceremony", 142],
  ["Crystals & Stones", 96],
  ["Home & Living", 236],
  ["Desk & Stationery", 198],
  ["Textiles & Linen", 124],
  ["Jewelry & Ornaments", 72],
  ["Outdoor & Wind", 88],
  ["POD Apparel", 64],
] as const;

const filters = ["Availability", "Price", "Material", "Origin", "Mood", "Color"] as const;

const editorialBanners = [
  {
    title: "The art of slow living",
    href: "/collections/quiet-desk",
    image: "/objects-living/76.png",
  },
  {
    title: "Objects for real moments",
    href: "/collections/seasonal-collections",
    image: "/objects-living/12.jpg",
  },
  {
    title: "Take the quiet outside",
    href: "/collections/wind-objects",
    image: "/objects-living/妞嬪酣鎼?01.jpg",
  },
] as const;

const guarantees = [
  { title: "Worldwide Shipping", body: "Free on orders over $120", mark: "ship" },
  { title: "30-Day Returns", body: "Simple and hassle-free", mark: "turn" },
  { title: "Crafted with Care", body: "Selected with intention", mark: "care" },
  { title: "Human Support", body: "Real replies when needed", mark: "mail" },
] as const;

function ObjectImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  return (
    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#f6f4ef]">
      <Image src={src} alt={alt} fill className="object-contain object-center" sizes={sizes} />
    </div>
  );
}

export default function ObjectsPage() {
  const featuredObjects = commerceObjects.slice(0, 12);

  return (
    <main className="min-h-full bg-[#fbfaf7] text-[#171514]">
      <header className="sticky top-0 z-30 border-b border-[#e8e2d8]/80 bg-[#fbfaf7]/94 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[94rem] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Reverent Inquiry home">
            <span
              aria-hidden
              className="h-5 w-10 bg-[url('/brand/production/air-mark.svg')] bg-contain bg-center bg-no-repeat opacity-80"
            />
            <span className="font-[var(--font-display-serif)] text-lg tracking-normal">Reverent Inquiry</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-[#423d36] lg:flex" aria-label="Objects navigation">
            <Link href="/healing">Healing</Link>
            <Link href="/live">Live</Link>
            <Link href="/search">Search</Link>
            <Link href="/collections">Collections</Link>
            <Link href="/new-arrivals">New</Link>
            <Link href="/objects" className="border-b border-[#171514] pb-1">
              Objects
            </Link>
            <Link href="/windkeep">Windkeep</Link>
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/search" aria-label="Search" className="hidden sm:inline">
              Search
            </Link>
            <Link href="/cart" aria-label="Wishlist" className="hidden sm:inline">
              Wishlist
            </Link>
            <CartLink />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[94rem] px-4 pt-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[1.35rem] border border-[#e6ded2] bg-[#f0f2f5]">
          <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
            <div className="flex min-h-[17rem] flex-col justify-center px-7 py-10 sm:px-12 lg:min-h-[24rem]">
              <p className="text-xs uppercase tracking-[0.16em] text-[#81786e]">Objects</p>
              <h1 className="mt-4 max-w-md font-[var(--font-display-serif)] text-4xl leading-[1.05] sm:text-5xl">
                {heroSlides[0].title}
              </h1>
              <p className="mt-5 max-w-sm text-sm leading-7 text-[#5e574f]">{heroSlides[0].body}</p>
              <Link href={heroSlides[0].href} className="mt-7 inline-flex w-fit items-center gap-3 text-sm underline underline-offset-4">
                Explore the collection <span aria-hidden>-&gt;</span>
              </Link>
              <div className="mt-9 flex gap-2" aria-hidden>
                <span className="h-1.5 w-1.5 rounded-full bg-[#171514]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#171514]/30" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#171514]/30" />
              </div>
            </div>
            <div className="relative flex min-h-[17rem] items-center justify-center bg-[#efe9df] lg:min-h-[24rem]">
              <Image
                src={heroSlides[0].image}
                alt=""
                fill
                priority
                className="object-contain object-center"
                sizes="(max-width: 1024px) 92vw, 54vw"
              />
            </div>
          </div>
          <button
            type="button"
            aria-label="Previous hero"
            className="absolute left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 rounded-full border border-[#d7d0c6] bg-white/84 text-lg text-[#4e473f] shadow-sm lg:block"
          >
            鈥?          </button>
          <button
            type="button"
            aria-label="Next hero"
            className="absolute right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 rounded-full border border-[#d7d0c6] bg-white/84 text-lg text-[#4e473f] shadow-sm lg:block"
          >
            鈥?          </button>
        </div>

        <nav className="mt-5 flex gap-4 overflow-x-auto pb-3" aria-label="Object categories">
          {categoryChips.map((category) => (
            <Link key={category.label} href={category.href} className="group min-w-[5.8rem] text-center">
              <span className="relative mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#f1eee8] ring-1 ring-[#e6ded2]">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  className="object-contain object-center"
                  sizes="4rem"
                />
              </span>
              <span className="mt-2 block text-xs text-[#4e473f] group-hover:text-[#171514]">{category.label}</span>
            </Link>
          ))}
        </nav>
      </section>

      <section className="mx-auto grid max-w-[94rem] gap-8 px-4 pb-14 pt-5 sm:px-6 lg:grid-cols-[15rem_1fr] lg:px-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#81786e]">Categories</p>
              <div className="mt-5 space-y-3">
                {sidebarCategories.map(([label, count]) => (
                  <Link key={label} href="/objects" className="flex items-center justify-between text-sm text-[#4e473f] hover:text-[#171514]">
                    <span>{label}</span>
                    <span className="text-xs text-[#81786e]">{count}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.16em] text-[#81786e]">Filter By</p>
                <button type="button" className="text-xs text-[#81786e]">
                  Reset All
                </button>
              </div>
              <label className="flex items-center gap-2 text-sm text-[#4e473f]">
                <input type="checkbox" className="h-4 w-4 rounded border-[#d7d0c6]" /> In Stock
              </label>
              <label className="mt-3 flex items-center gap-2 text-sm text-[#4e473f]">
                <input type="checkbox" className="h-4 w-4 rounded border-[#d7d0c6]" /> Pre-order
              </label>
              <div className="mt-5 divide-y divide-[#e7e0d6]">
                {filters.map((filter) => (
                  <button key={filter} type="button" className="flex w-full items-center justify-between py-3 text-sm text-[#4e473f]">
                    {filter}
                    <span aria-hidden>+</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-[var(--font-display-serif)] text-3xl leading-tight">All Objects</h2>
              <p className="mt-1 text-sm text-[#81786e]">{commerceObjects.length.toLocaleString()} items</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" className="rounded-lg border border-[#e0d8cd] bg-white px-3 py-2 text-sm text-[#4e473f] lg:hidden">
                Filter
              </button>
              <label className="hidden items-center gap-3 text-sm text-[#81786e] sm:flex">
                Sort by
                <select className="rounded-lg border border-[#e0d8cd] bg-white px-4 py-2 text-sm text-[#171514]">
                  <option>Featured</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {featuredObjects.slice(0, 8).map((object, index) => (
              <article key={object.id} className="overflow-hidden rounded-xl border border-[#e6ded2] bg-white shadow-[0_8px_22px_rgba(55,48,39,0.035)]">
                <Link href={`/objects/${object.id}`} className="relative block">
                  <ObjectImage src={object.media.hero} alt={object.media.alt} sizes="(max-width: 768px) 46vw, 20vw" />
                  {index < 2 ? (
                    <span className="absolute left-3 top-3 rounded bg-white px-2 py-1 text-[0.65rem] font-medium text-[#171514]">
                      {index === 0 ? "New" : "Loved"}
                    </span>
                  ) : null}
                </Link>
                <div className="p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-medium leading-5 text-[#171514]">{object.title}</h3>
                      <p className="mt-1 line-clamp-1 text-xs text-[#81786e]">{object.subtitle}</p>
                    </div>
                    <button type="button" aria-label={`Add ${object.title} to wishlist`} className="text-lg leading-none text-[#5e574f]">
                      鈾?                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{formatPrice(object.priceCents)}</p>
                    <AddToCartButton
                      id={object.id}
                      title={object.title}
                      priceCents={object.priceCents}
                      image={object.media.hero}
                      disabled={object.stock <= 0}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="my-6 grid gap-4 lg:grid-cols-3">
            {editorialBanners.map((banner) => (
              <Link
                key={banner.title}
                href={banner.href}
                className="group grid overflow-hidden rounded-xl border border-[#e6ded2] bg-[#efe8dc] md:grid-cols-[0.48fr_0.52fr]"
              >
                <div className="p-5">
                  <h3 className="font-[var(--font-display-serif)] text-2xl leading-tight text-white drop-shadow-sm lg:text-xl">
                    {banner.title}
                  </h3>
                  <span className="mt-4 inline-flex text-sm text-white underline underline-offset-4">Discover -&gt;</span>
                </div>
                <div className="relative flex aspect-[16/9] items-center justify-center bg-[#e6ded2]">
                  <Image src={banner.image} alt="" fill className="object-contain object-center" sizes="28vw" />
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {featuredObjects.slice(8).map((object) => (
              <article key={object.id} className="overflow-hidden rounded-xl border border-[#e6ded2] bg-white shadow-[0_8px_22px_rgba(55,48,39,0.035)]">
                <Link href={`/objects/${object.id}`} className="block">
                  <ObjectImage src={object.media.hero} alt={object.media.alt} sizes="(max-width: 768px) 46vw, 20vw" />
                </Link>
                <div className="p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-medium leading-5 text-[#171514]">{object.title}</h3>
                      <p className="mt-1 line-clamp-1 text-xs text-[#81786e]">{object.subtitle}</p>
                    </div>
                    <button type="button" aria-label={`Add ${object.title} to wishlist`} className="text-lg leading-none text-[#5e574f]">
                      鈾?                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{formatPrice(object.priceCents)}</p>
                    <AddToCartButton
                      id={object.id}
                      title={object.title}
                      priceCents={object.priceCents}
                      image={object.media.hero}
                      disabled={object.stock <= 0}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e6ded2] bg-white">
        <div className="mx-auto grid max-w-[94rem] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          {guarantees.map((item) => (
            <div key={item.title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e6ded2] text-[0.65rem] uppercase text-[#81786e]">
                {item.mark}
              </span>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-[#81786e]">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto grid max-w-[94rem] gap-8 border-t border-[#eee8df] px-4 py-9 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
          <div>
            <h2 className="font-[var(--font-display-serif)] text-2xl">Quiet updates, meaningful things.</h2>
            <p className="mt-3 max-w-sm text-sm leading-7 text-[#81786e]">
              Letters about new arrivals, slow living, and offerings that stay close to everyday life.
            </p>
          </div>
          <div className="grid gap-5 text-sm sm:grid-cols-4">
            {["Shipping", "Returns", "Human Support", "Crafted with Care"].map((item) => (
              <Link key={item} href={item === "Human Support" ? "/inquiry" : "/about"} className="text-[#4e473f] hover:text-[#171514]">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}


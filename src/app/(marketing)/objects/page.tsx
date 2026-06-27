import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PublishedObjectsGridClient } from "@/components/commerce/PublishedObjectsGridClient";
import { productRuntimeObjects, type ProductRuntimeObject } from "@/config/product-runtime";
import { buildSeoGeoMetadata } from "@/lib/seo-geo-runtime";

export const metadata: Metadata = buildSeoGeoMetadata({
  title: "Objects - Dohara",
  description: "DOHARA Objects is the storefront entry for browsing published goods by category, price, inventory, and product detail.",
  path: "/objects",
  kind: "product",
  phrases: ["Dohara objects", "product grid", "published goods", "storefront objects"],
});

const objectCategoryTree = [
  { label: "Everyday Wear", slug: "everyday-wear", count: "168", children: ["Men Wear", "Women Wear", "Soft Basics", "Layered Clothing"] },
  { label: "Footsteps", slug: "footsteps", count: "142", children: ["Daily Walk", "Urban Steps", "Active Motion", "Outdoor Walk"] },
  { label: "Carried Objects", slug: "carried-objects", count: "98", children: ["Daily Carry", "Travel Light", "Work Essentials", "Minimal Carry"] },
  { label: "Body Adornment", slug: "body-adornment", count: "84", children: ["Simple Jewelry", "Natural Stones", "Minimal Rings", "Quiet Bracelets"] },
  { label: "Living Space", slug: "living-space", count: "236", children: ["Room Objects", "Desk Atmosphere", "Kitchen Living", "Soft Lighting"] },
  { label: "Outdoor Movement", slug: "outdoor-movement", count: "88", children: ["Travel Objects", "Camping Life", "Hiking Gear", "Field Tools"] },
  { label: "Handmade Forms", slug: "handmade-forms", count: "196", children: ["Craft Objects", "Sculpted Forms", "Ritual Objects", "Natural Craft"] },
  { label: "Material Tools", slug: "material-tools", count: "124", children: ["Hardware Objects", "Building Materials", "Repair Tools", "Utility Parts"] },
  { label: "Seasonal Flow", slug: "seasonal-flow", count: "64", children: ["New Arrivals", "Seasonal Picks", "Limited Objects", "Special Drops"] },
  { label: "Quiet Essentials", slug: "quiet-essentials", count: "52", children: ["Everyday Objects", "Minimal Goods", "Soft Utility", "Neutral Items"] },
] as const;

const categoryLabels = {
  "wind-objects": "Objects & Craft",
  "quiet-desk": "Tools & Utility",
  "ritual-objects": "Home & Atmosphere",
  "seasonal-collections": "Seasonal Flow",
} as const;

const commerceObjects = productRuntimeObjects
  .filter((object) => object.runtimeKind === "commerce" && object.commerce?.archiveState !== "quiet-archive")
  .slice(0, 48);

const heroImage = "/objects/dohara-objects-hero-hd.png";
const mobileHeroImage = "/objects/dohara-objects-hero-mobile.png";

function uiCategoryForObject(object: ProductRuntimeObject) {
  return object.commerce ? categoryLabels[object.commerce.collection] : "Objects & Craft";
}

function inventoryStatus(stock: number) {
  if (stock <= 0) return "Out of stock";
  if (stock <= 3) return "Low stock";
  return "In stock";
}

function productImage(object: ProductRuntimeObject) {
  const image = object.media.find((media) => media.kind === "object") ?? object.media.find((media) => media.kind === "hero") ?? object.media[0];
  if (image?.src.startsWith("/objects-derived/") && image.src.endsWith("-hero.webp")) {
    return {
      ...image,
      src: image.src.replace("/objects-derived/", "/objects-card/").replace("-hero.webp", "-hero-card.webp"),
    };
  }

  return image;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function ObjectsPage() {
  return (
    <main className="min-h-full bg-white pb-16 text-[#1a2a44] md:pb-0">
      <header className="hidden border-b border-[#e8ecf1] bg-white md:block">
        <div className="grid h-[72px] w-full grid-cols-[48px_1fr_110px] items-center px-4 md:h-[104px] md:grid-cols-[240px_1fr_280px] md:px-[120px]">
          <button type="button" aria-label="Open menu" className="text-[24px] leading-none text-[#1a2a44] md:hidden">
            {"\u2630"}
          </button>
          <Link href="/" className="justify-self-center font-[var(--font-display-serif)] text-[2rem] leading-none text-[#0b1b33] md:justify-self-start md:text-[2.55rem]">
            Dohara
          </Link>

          <nav className="hidden justify-self-center md:flex md:items-center md:gap-12" aria-label="Storefront navigation">
            {[
              ["Objects", "/objects"],
              ["Collections", "/collections"],
              ["Search", "/search"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className={`relative flex h-[104px] items-center text-[17px] font-medium leading-6 ${
                  label === "Objects" ? "text-[#1a2a44] after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-16 after:-translate-x-1/2 after:bg-[#2e4a7d]" : "text-[#3b4556]"
                }`}
              >
                {label === "Search" ? <span className="mr-2 text-[18px]">{"\u2315"}</span> : null}
                {label}
              </Link>
            ))}
          </nav>

          <nav className="ml-auto flex items-center gap-4 text-[#1a2a44] md:gap-9" aria-label="Storefront actions">
            <Link href="/account/wishlist" aria-label="Wishlist" className="text-[24px] leading-none md:text-[27px]">
              {"\u2661"}
            </Link>
            <Link href="/account" aria-label="Account" className="hidden text-[24px] leading-none sm:inline md:text-[27px]">
              {"\u2659"}
            </Link>
            <Link href="/cart" aria-label="Cart" className="relative text-[24px] leading-none md:text-[27px]">
              {"\u25A1"}
              <span className="absolute -right-2 -top-2 grid h-[14px] min-w-[14px] place-items-center rounded-full bg-[#0b1b33] px-1 text-[10px] font-semibold leading-none text-white">
                2
              </span>
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative h-[232px] w-full overflow-hidden border-b border-[#e8ecf1] bg-white md:h-80">
        <Image src={mobileHeroImage} alt="Light as air. Made to last. Thoughtful objects for slower, more intentional living." fill priority className="object-contain object-center md:hidden" sizes="100vw" />
        <Image src={heroImage} alt="Light as air. Made to last. Thoughtful objects for slower, more intentional living." fill priority className="hidden object-cover object-center md:block" sizes="100vw" />
        <h1 className="sr-only">Light as air. Made to last.</h1>
        <p className="sr-only">Thoughtful objects for slower, more intentional living.</p>
        <Link href="#objects-grid" className="sr-only">
          Explore the collection
        </Link>
      </section>

      <div className="grid w-full bg-white md:grid-cols-[360px_minmax(0,1fr)] md:px-[120px]">
        <aside className="hidden border-r border-[#e8ecf1] py-8 pl-14 pr-8 md:block">
          <div className="sticky top-8">
            <h2 className="text-[18px] font-semibold leading-7 text-[#1a2a44]">Categories</h2>
            <nav className="mt-5 grid gap-1.5" aria-label="Object categories">
              <Link href="/objects" className="mb-1 flex h-[52px] items-center justify-between rounded-lg bg-[#eef4fa] px-4 text-[16px] font-medium leading-6 text-[#123a68]">
                <span>All Objects</span>
                <span className="text-[13px] font-normal text-[#5e738a]">1,268</span>
              </Link>
              {objectCategoryTree.map((category) => (
                <details key={category.slug} className="group" open={category.slug === "living-space"}>
                  <summary className="flex h-[52px] cursor-pointer list-none items-center justify-between rounded-lg px-4 text-[16px] font-medium leading-6 text-[#20324a] transition hover:bg-[#f6f9fc] group-open:bg-[#eef4fa] group-open:text-[#123a68]">
                    <Link
                      href={`/objects?category=${category.slug}`}
                      className="min-w-0 flex-1 truncate"
                    >
                      {category.label}
                    </Link>
                    <span className="ml-3 text-[13px] font-normal text-[#5e738a]">{category.count}</span>
                    <span className="ml-3 text-[14px] text-[#5e738a] transition group-open:rotate-90">{">"}</span>
                  </summary>
                  <div className="pb-1">
                    {category.children.map((child, childIndex) => {
                      const activeChild = category.slug === "living-space" && child === "Soft Lighting";
                      return (
                        <Link
                          key={child}
                          href={`/objects?category=${category.slug}&subcategory=${slugify(child)}`}
                          className={`ml-4 flex h-9 items-center justify-between border-l-2 py-1 pl-7 pr-4 text-[14px] font-normal leading-5 ${
                            activeChild ? "border-[#123a68] text-[#123a68]" : "border-transparent text-[#5e738a] hover:border-[#d8e2ec] hover:text-[#20324a]"
                          }`}
                        >
                          <span>{child}</span>
                          <span className="text-[12px] text-[#8a99aa]">{Math.max(6, Number(category.count) - childIndex * 11)}</span>
                        </Link>
                      );
                    })}
                  </div>
                </details>
              ))}
            </nav>

            <div className="mt-16 max-w-[210px]">
              <p className="text-[30px] leading-none text-[#6b778c]">{"\u2667"}</p>
              <p className="mt-5 text-[16px] font-medium leading-6 text-[#1a2a44]">Objects for slower moments.</p>
              <p className="mt-6 text-[15px] leading-[22px] text-[#6b778c]">Dohara</p>
            </div>
          </div>
        </aside>

        <section id="objects-grid" className="px-4 py-6 md:py-8 md:pl-8 md:pr-0">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:min-h-[72px]">
            <div>
              <h2 className="font-[var(--font-display-serif)] text-[24px] font-semibold leading-8 text-[#0b1b33] md:text-[36px] md:leading-[46px]">All Objects</h2>
              <p className="mt-1 hidden text-[16px] font-normal leading-6 text-[#6b778c] md:block">Thoughtful objects for everyday life.</p>
              <p className="mt-1 text-[14px] leading-5 text-[#6b778c] md:hidden">1,268 results</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="hidden text-[16px] leading-6 text-[#3b4556] md:block">1,268 results</p>
              <details className="relative">
                <summary className="flex h-10 cursor-pointer list-none items-center rounded-lg border border-[#e6eaf0] bg-white px-4 text-[14px] text-[#1a2a44] md:h-11 md:w-44 md:text-[15px]">
                  Sort by: Featured
                </summary>
                <div className="absolute right-0 z-20 mt-2 w-56 rounded-lg border border-[#e6eaf0] bg-white p-2 text-[15px] text-[#1a2a44] shadow-[0_12px_32px_rgba(13,32,64,0.08)]">
                  {["Featured", "Newest", "Price: Low to High", "Price: High to Low", "Most Saved", "Best Selling"].map((item) => (
                    <Link key={item} href={`/objects?sort=${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="block rounded-md px-3 py-2 hover:bg-[#f7f9fc]">
                      {item}
                    </Link>
                  ))}
                </div>
              </details>
              <details className="relative">
                <summary className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-lg border border-[#e6eaf0] bg-white px-4 text-[14px] text-[#1a2a44] md:h-11 md:w-[104px] md:text-[15px]">
                  <span aria-hidden="true">=</span> Filter
                </summary>
                <div className="fixed bottom-0 right-0 top-0 z-40 w-[86vw] max-w-[340px] border-l border-[#e8ecf1] bg-white p-5 shadow-[-16px_0_40px_rgba(13,32,64,0.08)] md:absolute md:bottom-auto md:right-0 md:top-auto md:mt-2 md:w-72 md:rounded-lg md:border md:p-4">
                  <p className="text-[18px] font-semibold text-[#1a2a44] md:text-[16px]">Filter</p>
                  <div className="mt-4 grid gap-1">
                    {objectCategoryTree.map((category) => (
                      <div key={category.slug} className="rounded-md">
                        <Link href={`/objects?category=${category.slug}`} className="block rounded-md px-3 py-2 text-[15px] font-medium text-[#1a2a44] hover:bg-[#f7f9fc]">
                          {category.label}
                        </Link>
                        <div className="grid gap-0.5 pl-4">
                          {category.children.map((child) => (
                            <Link key={child} href={`/objects?category=${category.slug}&subcategory=${slugify(child)}`} className="block rounded-md px-3 py-1.5 text-[13px] text-[#5e738a] hover:bg-[#f7f9fc]">
                              {child}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid gap-2">
                    <Link href="/objects" className="grid h-11 place-items-center rounded-lg bg-[#0b1b33] text-[14px] font-medium text-white">
                      Apply filters
                    </Link>
                    <Link href="/objects" className="grid h-10 place-items-center text-[14px] text-[#3b4556]">
                      Clear
                    </Link>
                  </div>
                </div>
              </details>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
            <PublishedObjectsGridClient />
            {commerceObjects.map((object) => {
              const image = productImage(object);
              const stock = object.commerce?.stock ?? 0;
              return (
                <article
                  key={object.object_id}
                  className="group relative overflow-hidden rounded-xl border border-[#e6eaf0] bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(13,32,64,0.08)]"
                >
                  <button type="button" aria-label={`Save ${object.name}`} className="absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-full text-[24px] leading-none text-[#2e4a7d] md:right-[14px] md:top-[14px]">
                    {"\u2661"}
                  </button>
                  <Link href={`/objects/${object.sourceId}`} className="block">
                    <div className="relative h-[150px] bg-[#f8fafc] md:h-[220px]">
                      {image ? (
                        <Image
                          src={image.src}
                          alt={object.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 44vw, (max-width: 1280px) 40vw, 320px"
                        />
                      ) : (
                        <div className="grid h-full place-items-center bg-[#f7f9fc] text-[14px] text-[#6b778c]">Image unavailable</div>
                      )}
                    </div>
                    <div className="px-3 pb-4 md:px-5 md:pb-5">
                      <p className="line-clamp-2 min-h-10 text-[14px] font-medium leading-5 text-[#1a2a44] md:min-h-12 md:text-[17px] md:leading-6">
                        {object.name}
                      </p>
                      <p className="mt-1.5 text-[15px] font-bold leading-6 text-[#0b1b33] md:text-[18px]">{object.priceLine}</p>
                      <div className="mt-1 flex items-center gap-2 text-[12.5px] leading-[18px] text-[#6b778c] md:text-[14px] md:leading-5">
                        <span className={`h-1.5 w-1.5 rounded-full ${stock > 0 ? "bg-[#2b6cb0]" : "bg-[#b8c0cb]"}`} />
                        <span>{inventoryStatus(stock)}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid h-16 grid-cols-5 border-t border-[#e8ecf1] bg-white text-[10px] text-[#3b4556] md:hidden" aria-label="Mobile navigation">
        {[
          ["Home", "/"],
          ["Objects", "/objects"],
          ["Collections", "/collections"],
          ["Search", "/search"],
          ["Account", "/account"],
        ].map(([label, href]) => (
          <Link key={label} href={href} className={`grid place-items-center py-2 ${label === "Objects" ? "text-[#2e4a7d]" : ""}`}>
            <span className="text-[21px] leading-none">{label === "Home" ? "\u2302" : label === "Objects" ? "\u25A6" : label === "Collections" ? "\u2661" : label === "Search" ? "\u2315" : "\u2659"}</span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}

import Link from "next/link";
import { VeluneProductCard } from "@/components/velune-store/VeluneProductCard";
import { VeluneStoreShell } from "@/components/velune-store/VeluneStoreShell";
import { veluneProducts, veluneSeries } from "@/lib/velune-store";

function seriesAnchor(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

export default function StorePage() {
  const tonics = veluneProducts.filter((product) => product.kind !== "object");
  const homeObjects = veluneProducts.filter((product) => product.kind === "object");
  const featured = [
    ...tonics.filter((product) => product.featured).slice(0, 4),
    ...homeObjects.filter((product) => product.featured).slice(0, 2),
  ];
  const bestSellers = [
    ...tonics.filter((product) => product.bestSeller).slice(0, 4),
    ...homeObjects.filter((product) => product.bestSeller).slice(0, 2),
  ];

  return (
    <VeluneStoreShell>
      <main>
        <section className="hero">
          <div className="wrap heroCard">
            <img src="/velune-storefront/assets/banners/velune-home-banner.jpg" alt="Velune Quiet Extracts botanical daily tonics" />
            <div className="heroCopy">
              <div>
                <div className="eyebrow">Velune Quiet Extracts</div>
                <h1 className="h1">Botanical daily tonics.</h1>
              <p className="copy">A calm, low-saturation storefront for botanical daily tonics and gentle home objects. USD pricing and United States shipping information are available throughout the store.</p>
              </div>
              <Link className="button" href="#shop">Shop the Collection</Link>
            </div>
          </div>
        </section>

        <div className="wrap chips">
          {veluneSeries.map((series) => <Link className="chip" key={series.key} href={`#${seriesAnchor(series.label)}`}>{series.label}</Link>)}
        </div>

        <section className="section" id="series">
          <div className="wrap">
            <div className="sectionHead"><div><div className="eyebrow">Store Collections</div><h2 className="h2">Botanical tonics and quiet home objects</h2></div></div>
            <div className="seriesGrid">
              {veluneSeries.map((series) => (
                <Link className="seriesCard" key={series.key} href={`#${seriesAnchor(series.label)}`}>
                  <img src={series.banner} alt={`${series.label} series banner`} loading="lazy" />
                  <div className="seriesBody"><h3>{series.label}</h3><p>{series.subtitle}</p></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="sectionHead"><div><div className="eyebrow">Featured Products</div><h2 className="h2">Quiet daily favorites</h2></div><Link href="#shop">View all</Link></div>
            <div className="grid">{featured.map((product) => <VeluneProductCard key={product.sku} product={product} />)}</div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="sectionHead"><div><div className="eyebrow">Best Sellers</div><h2 className="h2">Easy first choices</h2></div></div>
            <div className="grid">{bestSellers.map((product) => <VeluneProductCard key={product.sku} product={product} />)}</div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="sectionHead"><div><div className="eyebrow">Home Objects</div><h2 className="h2">Light, air, crystal, and room pieces</h2><p className="copy">Decorative non-therapeutic objects for shelves, windows, desks, and soft evening corners.</p></div></div>
            <div className="grid">{homeObjects.map((product) => <VeluneProductCard key={product.sku} product={product} />)}</div>
          </div>
        </section>

        <section className="section" id="shop">
          <div className="wrap">
            <div className="sectionHead"><div><div className="eyebrow">Product Grid</div><h2 className="h2">All Velune products</h2><p className="copy">Botanical daily tonics and home objects organized by clear store collections.</p></div></div>
          </div>
        </section>

        {veluneSeries.map((series) => (
          <section className="section" id={seriesAnchor(series.label)} key={series.key}>
            <div className="wrap">
              <div className="sectionHead"><div><div className="eyebrow">{series.label}</div><h2 className="h2">{series.subtitle}</h2><p className="copy">{series.tone}</p></div></div>
              <div className="grid">{veluneProducts.filter((product) => product.series === series.key).map((product) => <VeluneProductCard key={product.sku} product={product} />)}</div>
            </div>
          </section>
        ))}

        <section className="section">
          <div className="wrap">
            <div className="sectionHead"><div><div className="eyebrow">Reviews</div><h2 className="h2">Simple daily rituals</h2></div></div>
            <div className="reviewGrid">
              <div className="panel"><h3>Calm routine</h3><p>&quot;The tone feels clean, quiet, and easy to keep on the counter.&quot;</p></div>
              <div className="panel"><h3>Gentle packaging</h3><p>&quot;Soft colors, clear labels, and a simple daily format.&quot;</p></div>
              <div className="panel"><h3>Everyday use</h3><p>&quot;A low-pressure product line that feels appropriate for gifting.&quot;</p></div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap promiseGrid">
            <div className="panel"><h3>Shipping Promise</h3><p>United States standard delivery with clear processing and tracking information.</p></div>
            <div className="panel"><h3>Simple Returns</h3><p>Return review available for unopened products within the stated return window.</p></div>
            <div className="panel"><h3>Product Care</h3><p>Every product page includes usage, shipping, returns, and compliance notes.</p></div>
          </div>
        </section>
      </main>
    </VeluneStoreShell>
  );
}

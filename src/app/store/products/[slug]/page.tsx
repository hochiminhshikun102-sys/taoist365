import { notFound } from "next/navigation";
import { ProductPurchaseControls } from "@/components/velune-store/VeluneCart";
import { VeluneStoreShell } from "@/components/velune-store/VeluneStoreShell";
import { formatUsd, getVeluneProduct, veluneProducts } from "@/lib/velune-store";

export function generateStaticParams() {
  return veluneProducts.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getVeluneProduct(slug);
  if (!product) notFound();
  const isObject = product.kind === "object";

  return (
    <VeluneStoreShell>
      <main className="wrap productMain">
        <section className="gallery" aria-label="Product gallery">
          {product.images.map((image, index) => (
            <img key={image} src={image} alt={`${product.productName} product image ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} />
          ))}
        </section>
        <aside className="productInfo">
          <div className="sku">{product.sku} - {product.seriesLabel} Series</div>
          <h1 className="productTitle">{product.productName}</h1>
          <p className="copy">{product.description}</p>
          <div className="price">{formatUsd(product.price)} USD</div>
          <ProductPurchaseControls product={product} />
          <div className="details">
            <h3>Product Description</h3>
            <p>{product.shortLine}</p>
            {isObject ? (
              <>
                <h3>Materials</h3>
                <ul>{product.materials?.map((item) => <li key={item}>{item}</li>)}</ul>
                <h3>Care</h3>
                <ul>{product.care?.map((item) => <li key={item}>{item}</li>)}</ul>
              </>
            ) : (
              <>
                <h3>Ingredients</h3>
                <p>Please refer to the product label for complete ingredients and Supplement Facts. Final regulatory label information controls.</p>
                <h3>Suggested Use</h3>
                <ul><li>Use only as directed on the final product label.</li><li>Keep in a cool, dry place.</li><li>Keep out of reach of children.</li></ul>
              </>
            )}
            <h3>Shipping</h3>
            <ul><li>Currency: USD.</li><li>Current sales region: United States.</li><li>Estimated standard delivery: 5-8 business days after processing.</li></ul>
            <h3>Returns</h3>
            <p>Return review is available for unopened products in original condition within the stated return window.</p>
            {isObject ? (
              <>
                <h3>Decor Notice</h3>
                <p>This item is sold as a decorative home object. It is not a wellness, spiritual, medical, or therapeutic product.</p>
              </>
            ) : (
              <>
                <h3>Compliance Notice</h3>
                <p>These statements have not been evaluated by the U.S. FDA. This product is not intended to diagnose, treat, cure, or prevent any disease. Please consult a qualified professional before use if you are pregnant, nursing, taking medication, or under medical supervision.</p>
              </>
            )}
          </div>
        </aside>
      </main>
    </VeluneStoreShell>
  );
}

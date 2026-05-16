import Link from "next/link";
import { formatUsd, type VeluneProduct } from "@/lib/velune-store";

export function VeluneProductCard({ product }: { product: VeluneProduct }) {
  const alt = product.kind === "object" ? product.productName : `${product.productName} Velune Quiet Extract`;
  const cardImage = `/velune-storefront/assets/card-expanded/products/${product.slug}.jpg`;

  return (
    <article className="productCard">
      <Link href={`/store/products/${product.slug}`}>
        <figure>
          <img src={cardImage} alt={alt} loading="lazy" />
        </figure>
        <div className="cardBody">
          <div className="cardMeta">
            <span>{product.seriesLabel}</span>
            <span>{product.sku}</span>
          </div>
          <h3>{product.productName}</h3>
          <p>{product.shortLine}</p>
          <div className="price">{formatUsd(product.price)} USD</div>
        </div>
      </Link>
    </article>
  );
}

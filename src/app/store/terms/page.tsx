import { VeluneStoreShell } from "@/components/velune-store/VeluneStoreShell";

export default function StorePolicyPage() {
  return (
    <VeluneStoreShell>
      <main className="wrap section">
        <div className="eyebrow">Velune</div>
        <h1 className="productTitle">Terms of Service</h1>
        <div className="notice">
          <p>This storefront is provided for product review and storefront flow testing. Product information is for general wellness and lifestyle purposes only and is not medical advice. Payment activation is subject to merchant approval and compliance review.</p>
          <p>Currency: USD. Current sales region: United States.</p>
        </div>
      </main>
    </VeluneStoreShell>
  );
}

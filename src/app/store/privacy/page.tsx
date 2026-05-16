import { VeluneStoreShell } from "@/components/velune-store/VeluneStoreShell";

export default function StorePolicyPage() {
  return (
    <VeluneStoreShell>
      <main className="wrap section">
        <div className="eyebrow">Velune</div>
        <h1 className="productTitle">Privacy Policy</h1>
        <div className="notice">
          <p>Velune collects only the information needed to process product browsing, checkout requests, customer support, and compliance review. Customer data is handled for storefront operation and is not sold as a marketing list.</p>
          <p>Currency: USD. Current sales region: United States.</p>
        </div>
      </main>
    </VeluneStoreShell>
  );
}

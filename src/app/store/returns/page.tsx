import { VeluneStoreShell } from "@/components/velune-store/VeluneStoreShell";

export default function StorePolicyPage() {
  return (
    <VeluneStoreShell>
      <main className="wrap section">
        <div className="eyebrow">Velune</div>
        <h1 className="productTitle">Returns</h1>
        <div className="notice">
          <p>Customers may request a return review within 30 days of delivery for unopened products in original condition. Refunds are reviewed after the returned item is received. Shipping fees, taxes, and carrier costs may be handled according to the final order record and applicable law.</p>
          <p>Currency: USD. Current sales region: United States.</p>
        </div>
      </main>
    </VeluneStoreShell>
  );
}

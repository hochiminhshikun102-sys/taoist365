import { VeluneStoreShell } from "@/components/velune-store/VeluneStoreShell";

export default function StorePolicyPage() {
  return (
    <VeluneStoreShell>
      <main className="wrap section">
        <div className="eyebrow">Velune</div>
        <h1 className="productTitle">Shipping</h1>
        <div className="notice">
          <p>Velune currently supports standard delivery to United States addresses for review. Orders are prepared within 1-3 business days. Standard delivery is estimated at 5-8 business days after processing. Delivery estimates may vary by region, carrier conditions, and order review status.</p>
          <p>Currency: USD. Current sales region: United States.</p>
        </div>
      </main>
    </VeluneStoreShell>
  );
}

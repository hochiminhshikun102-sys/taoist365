import { VeluneStoreShell } from "@/components/velune-store/VeluneStoreShell";

export default function StorePolicyPage() {
  return (
    <VeluneStoreShell>
      <main className="wrap section">
        <div className="eyebrow">Velune</div>
        <h1 className="productTitle">Track Order</h1>
        <div className="notice">
          <p>Order tracking is available after shipment. Customers receive tracking information when the order is prepared and handed to the carrier.</p>
          <p>Currency: USD. Current sales region: United States.</p>
        </div>
      </main>
    </VeluneStoreShell>
  );
}

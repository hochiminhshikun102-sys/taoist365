import { CheckoutRuntime } from "@/components/velune-store/VeluneCart";
import { VeluneStoreShell } from "@/components/velune-store/VeluneStoreShell";

export default function CheckoutPage() {
  return (
    <VeluneStoreShell>
      <main className="wrap section">
        <div className="eyebrow">Checkout</div>
        <h1 className="productTitle">Checkout request</h1>
        <CheckoutRuntime />
      </main>
    </VeluneStoreShell>
  );
}

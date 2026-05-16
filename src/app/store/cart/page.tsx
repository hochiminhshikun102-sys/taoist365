import { CartRuntime } from "@/components/velune-store/VeluneCart";
import { VeluneStoreShell } from "@/components/velune-store/VeluneStoreShell";

export default function CartPage() {
  return (
    <VeluneStoreShell>
      <main className="wrap section">
        <div className="eyebrow">Shopping Bag</div>
        <h1 className="productTitle">Your Velune bag</h1>
        <CartRuntime />
      </main>
    </VeluneStoreShell>
  );
}

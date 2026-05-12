import type { Metadata } from "next";
import { OrderClient } from "@/components/commerce/OrderClient";

export const metadata: Metadata = {
  title: "Order",
  description: "Taoist365 order request.",
};

export default function OrderPage() {
  return (
    <main className="min-h-full bg-background">
      <div className="room-section-y-standard mx-auto w-full max-w-5xl px-6 sm:px-10">
        <p className="text-xs text-text-muted/85">Order</p>
        <h1 className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl">Create an order request.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-text-secondary">
          This static MVP records the order in the browser and prepares mail handoff. Payment can become live when a
          provider is connected.
        </p>
        <div className="mt-10">
          <OrderClient />
        </div>
      </div>
    </main>
  );
}

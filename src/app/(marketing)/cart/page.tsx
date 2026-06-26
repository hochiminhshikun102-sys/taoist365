import type { Metadata } from "next";
import { CartClient } from "@/components/commerce/CartClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "Dohara cart.",
};

export default function CartPage() {
  return (
    <main className="min-h-full bg-background">
      <div className="room-section-y-standard mx-auto w-full max-w-4xl px-6 sm:px-10">
        <p className="text-xs text-text-muted/85">Cart</p>
        <h1 className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl">Objects held for the room.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-text-secondary">
          Review quantities, keep browsing, or place nearby objects together before creating an order request for human confirmation.
        </p>
        <div className="mt-10">
          <CartClient />
        </div>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { cartSubtotal, readQuietCart, type QuietCartItem, writeQuietCart } from "@/lib/quiet-cart";
import { formatPrice } from "@/config/operational-commerce";

export function OrderClient() {
  const [items, setItems] = useState<QuietCartItem[]>(() => readQuietCart());
  const [submittedOrder, setSubmittedOrder] = useState<string | null>(null);

  const subtotal = cartSubtotal(items);
  const orderBody = useMemo(() => {
    const lines = items.map((item) => `${item.quantity} x ${item.title} - ${formatPrice(item.priceCents * item.quantity)}`);
    return [`Order request ${submittedOrder ?? ""}`, "", ...lines, "", `Subtotal: ${formatPrice(subtotal)}`].join("\n");
  }, [items, submittedOrder, subtotal]);

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = `T365-${Date.now().toString(36).toUpperCase()}`;
    setSubmittedOrder(id);
    window.localStorage.setItem(
      "taoist365-last-order",
      JSON.stringify({ id, items, subtotal, createdAt: new Date().toISOString() }),
    );
  }

  if (items.length === 0 && !submittedOrder) {
    return (
      <section className="rounded-lg border border-border-subtle bg-white/52 p-6">
        <p className="text-sm leading-7 text-text-secondary">An order needs at least one object.</p>
        <Link href="/collections" className="mt-4 inline-block text-sm text-foreground underline-offset-4 hover:underline">
          Browse collections
        </Link>
      </section>
    );
  }

  if (submittedOrder) {
    const href = `mailto:hello@taoist365.com?subject=${encodeURIComponent(`Order request ${submittedOrder}`)}&body=${encodeURIComponent(orderBody)}`;

    return (
      <section className="rounded-lg border border-border-subtle bg-white/58 p-6">
        <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Order request</p>
        <h2 className="mt-3 text-2xl text-foreground">{submittedOrder}</h2>
        <p className="mt-4 text-sm leading-7 text-text-secondary">
          The order request is saved in this browser. Send it by mail now; payment and shipping confirmation happen by
          human reply until a payment provider is connected.
        </p>
        <div className="mt-5 whitespace-pre-wrap rounded-md border border-border-subtle bg-white/62 p-4 text-xs leading-6 text-text-muted">
          {orderBody}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={href}
            className="taoist-quiet-action rounded-lg border border-foreground/12 bg-foreground px-5 py-3 text-sm text-white transition hover:bg-foreground/88"
          >
            Send order mail
          </a>
          <button
            type="button"
            onClick={() => {
              writeQuietCart([]);
              setItems([]);
            }}
            className="taoist-quiet-action rounded-lg border border-border-subtle bg-white/54 px-5 py-3 text-sm text-text-secondary transition hover:bg-white/72"
          >
            Clear cart
          </button>
        </div>
      </section>
    );
  }

  return (
    <form onSubmit={submitOrder} className="grid gap-5 lg:grid-cols-[0.58fr_0.42fr]">
      <section className="rounded-lg border border-border-subtle bg-white/54 p-5">
        <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Contact</p>
        <div className="mt-4 grid gap-3">
          <input required name="name" placeholder="Name" className="border border-border-subtle bg-white/70 px-3 py-2 text-sm outline-none" />
          <input required name="email" type="email" placeholder="Email" className="border border-border-subtle bg-white/70 px-3 py-2 text-sm outline-none" />
          <textarea required name="address" rows={4} placeholder="Shipping address" className="resize-y border border-border-subtle bg-white/70 px-3 py-2 text-sm outline-none" />
          <textarea name="note" rows={3} placeholder="Note, timing, or placement question" className="resize-y border border-border-subtle bg-white/70 px-3 py-2 text-sm outline-none" />
        </div>
      </section>

      <section className="rounded-lg border border-border-subtle bg-white/58 p-5">
        <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Order</p>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between gap-4 text-sm">
              <p className="text-text-secondary">
                {item.quantity} x {item.title}
              </p>
              <p className="text-foreground">{formatPrice(item.priceCents * item.quantity)}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 border-t border-border-subtle pt-4">
          <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Subtotal</p>
          <p className="mt-2 text-2xl text-foreground">{formatPrice(subtotal)}</p>
          <p className="mt-3 text-xs leading-6 text-text-muted">
            Payment provider is not connected yet. This MVP records an order request and prepares the mail handoff.
          </p>
        </div>
        <button
          type="submit"
          className="taoist-quiet-action mt-5 w-full rounded-lg border border-foreground/12 bg-foreground px-5 py-3 text-sm text-white transition hover:bg-foreground/88"
        >
          Create order request
        </button>
      </section>
    </form>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cartSubtotal, readQuietCart, type QuietCartItem, writeQuietCart } from "@/lib/quiet-cart";
import { formatPrice } from "@/config/operational-commerce";

export function CartClient() {
  const [items, setItems] = useState<QuietCartItem[]>(() => readQuietCart());

  function updateItems(nextItems: QuietCartItem[]) {
    setItems(nextItems);
    writeQuietCart(nextItems);
  }

  const subtotal = cartSubtotal(items);

  if (items.length === 0) {
    return (
      <section className="rounded-lg border border-border-subtle bg-white/52 p-6">
        <p className="text-sm leading-7 text-text-secondary">Cart is empty.</p>
        <Link href="/collections" className="mt-4 inline-block text-sm text-foreground underline-offset-4 hover:underline">
          Browse collections
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {items.map((item) => (
        <article key={item.id} className="grid gap-4 rounded-lg border border-border-subtle bg-white/54 p-4 sm:grid-cols-[7rem_1fr_auto]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border-subtle bg-white">
            <Image src={item.image} alt="" fill className="object-cover" sizes="7rem" />
          </div>
          <div>
            <Link href={`/objects/${item.id}`} className="text-base text-foreground hover:underline">
              {item.title}
            </Link>
            <p className="mt-2 text-sm text-text-secondary">{formatPrice(item.priceCents)}</p>
            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  updateItems(
                    items
                      .map((current) =>
                        current.id === item.id ? { ...current, quantity: Math.max(0, current.quantity - 1) } : current,
                      )
                      .filter((current) => current.quantity > 0),
                  )
                }
                className="h-8 w-8 rounded-md border border-border-subtle text-sm text-text-secondary"
                aria-label={`Decrease ${item.title}`}
              >
                -
              </button>
              <span className="min-w-8 text-center text-sm text-foreground">{item.quantity}</span>
              <button
                type="button"
                onClick={() =>
                  updateItems(
                    items.map((current) =>
                      current.id === item.id ? { ...current, quantity: Math.min(9, current.quantity + 1) } : current,
                    ),
                  )
                }
                className="h-8 w-8 rounded-md border border-border-subtle text-sm text-text-secondary"
                aria-label={`Increase ${item.title}`}
              >
                +
              </button>
            </div>
          </div>
          <p className="text-sm text-foreground sm:text-right">{formatPrice(item.priceCents * item.quantity)}</p>
        </article>
      ))}

      <div className="flex flex-col gap-4 rounded-lg border border-border-subtle bg-white/58 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Subtotal</p>
          <p className="mt-2 text-2xl text-foreground">{formatPrice(subtotal)}</p>
          <p className="mt-2 text-xs leading-6 text-text-muted">Shipping is confirmed in the order reply.</p>
        </div>
        <Link
          href="/order"
          className="taoist-quiet-action rounded-lg border border-foreground/12 bg-foreground px-5 py-3 text-center text-sm text-white transition hover:bg-foreground/88"
        >
          Order
        </Link>
      </div>
    </section>
  );
}

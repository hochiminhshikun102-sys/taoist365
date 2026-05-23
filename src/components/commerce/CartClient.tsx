"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cartSubtotal, readQuietCart, type QuietCartItem, writeQuietCart } from "@/lib/quiet-cart";
import { formatPrice, quietPairingsForCart } from "@/config/operational-commerce";

export function CartClient() {
  const [items, setItems] = useState<QuietCartItem[]>(() => readQuietCart());

  function updateItems(nextItems: QuietCartItem[]) {
    setItems(nextItems);
    writeQuietCart(nextItems);
  }

  const subtotal = cartSubtotal(items);
  const pairings = quietPairingsForCart(items.map((item) => item.id), 4);

  function addPairing(nextItem: QuietCartItem) {
    updateItems(
      items.some((item) => item.id === nextItem.id)
        ? items.map((item) =>
            item.id === nextItem.id ? { ...item, quantity: Math.min(item.quantity + 1, 9) } : item,
          )
        : [...items, nextItem],
    );
  }

  if (items.length === 0) {
    return (
      <section className="space-y-5">
        <div className="rounded-lg border border-border-subtle bg-white/52 p-6">
          <p className="text-sm leading-7 text-text-secondary">Cart is empty. It can stay empty while you look around.</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link href="/collections" className="text-sm text-foreground underline-offset-4 hover:underline">
              Browse collections
            </Link>
            <Link href="/objects" className="text-sm text-text-muted underline-offset-4 hover:text-foreground hover:underline">
              Browse objects
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border-subtle bg-white/42 p-4">
        <p className="text-sm leading-7 text-text-secondary">
          A holding space for objects that might share a room. No countdowns, no pressure.
        </p>
        <Link href="/collections" className="text-sm text-text-muted underline-offset-4 hover:text-foreground hover:underline">
          Continue browsing
        </Link>
      </div>

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
            <button
              type="button"
              onClick={() => updateItems(items.filter((current) => current.id !== item.id))}
              className="mt-3 text-xs text-text-muted underline-offset-4 hover:text-foreground hover:underline"
            >
              Remove quietly
            </button>
          </div>
          <p className="text-sm text-foreground sm:text-right">{formatPrice(item.priceCents * item.quantity)}</p>
        </article>
      ))}

      {pairings.length > 0 ? (
        <section className="rounded-lg border border-border-subtle bg-white/46 p-5" aria-label="Quiet pairings">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Quiet pairings</p>
              <h2 className="mt-2 text-xl text-foreground">Objects that can sit nearby</h2>
            </div>
            <Link href="/objects" className="text-sm text-text-muted underline-offset-4 hover:text-foreground hover:underline">
              See all objects
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pairings.map((object) => (
              <article key={object.id} className="rounded-lg border border-border-subtle bg-white/54 p-3">
                <Link href={`/objects/${object.id}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border-subtle bg-white">
                    <Image src={object.media.hero} alt={object.media.alt} fill className="object-cover opacity-[0.9]" sizes="14rem" />
                  </div>
                  <p className="mt-3 text-sm text-foreground">{object.title}</p>
                  <p className="mt-1 text-xs text-text-muted">{formatPrice(object.priceCents)}</p>
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    addPairing({
                      id: object.id,
                      title: object.title,
                      priceCents: object.priceCents,
                      image: object.media.hero,
                      quantity: 1,
                    })
                  }
                  className="mt-3 w-full rounded-md border border-border-subtle bg-white/62 px-3 py-2 text-xs text-text-secondary hover:bg-white"
                >
                  Hold with cart
                </button>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <div className="flex flex-col gap-4 rounded-lg border border-border-subtle bg-white/58 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Subtotal</p>
          <p className="mt-2 text-2xl text-foreground">{formatPrice(subtotal)}</p>
          <p className="mt-2 text-xs leading-6 text-text-muted">Shipping, region, and packaging are confirmed during secure checkout.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/collections" className="rounded-lg border border-border-subtle px-5 py-3 text-center text-sm text-text-secondary hover:bg-white/70">
            Keep browsing
          </Link>
          <Link
            href="/store/checkout"
            className="taoist-quiet-action rounded-lg border border-foreground/12 bg-foreground px-5 py-3 text-center text-sm text-white transition hover:bg-foreground/88"
          >
            Proceed to checkout
          </Link>
        </div>
      </div>
    </section>
  );
}

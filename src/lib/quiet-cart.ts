"use client";

export type QuietCartItem = {
  id: string;
  title: string;
  priceCents: number;
  quantity: number;
  image: string;
};

const cartKey = "taoist365-quiet-cart";

export function readQuietCart(): QuietCartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(cartKey);
    return stored ? (JSON.parse(stored) as QuietCartItem[]) : [];
  } catch {
    return [];
  }
}

export function writeQuietCart(items: readonly QuietCartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(cartKey, JSON.stringify(items));
  window.dispatchEvent(new Event("quiet-cart-change"));
}

export function addQuietCartItem(nextItem: QuietCartItem) {
  const current = readQuietCart();
  const existing = current.find((item) => item.id === nextItem.id);
  const updated = existing
    ? current.map((item) =>
        item.id === nextItem.id ? { ...item, quantity: Math.min(item.quantity + nextItem.quantity, 9) } : item,
      )
    : [...current, nextItem];

  writeQuietCart(updated);
}

export function cartSubtotal(items: readonly QuietCartItem[]) {
  return items.reduce((total, item) => total + item.priceCents * item.quantity, 0);
}

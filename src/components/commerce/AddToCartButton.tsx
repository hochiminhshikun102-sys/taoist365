"use client";

import { useState } from "react";
import { addQuietCartItem } from "@/lib/quiet-cart";

type AddToCartButtonProps = {
  id: string;
  title: string;
  priceCents: number;
  image: string;
  disabled?: boolean;
};

export function AddToCartButton({ id, title, priceCents, image, disabled = false }: AddToCartButtonProps) {
  const [state, setState] = useState<"idle" | "added">("idle");

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        addQuietCartItem({ id, title, priceCents, image, quantity: 1 });
        setState("added");
        window.setTimeout(() => setState("idle"), 1800);
      }}
      className="taoist-quiet-action rounded-lg border border-foreground/12 bg-foreground px-4 py-2.5 text-sm text-white transition hover:bg-foreground/88 disabled:cursor-not-allowed disabled:border-border-subtle disabled:bg-white/50 disabled:text-text-muted"
    >
      {disabled ? "Unavailable" : state === "added" ? "Added" : "Add to cart"}
    </button>
  );
}

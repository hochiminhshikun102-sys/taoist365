"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readQuietCart } from "@/lib/quiet-cart";

export function CartLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function sync() {
      setCount(readQuietCart().reduce((total, item) => total + item.quantity, 0));
    }

    sync();
    window.addEventListener("quiet-cart-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("quiet-cart-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return (
    <Link
      href="/cart"
      className="taoist-quiet-action rounded-lg border border-border-subtle bg-white/50 px-2.5 py-1.5 text-xs text-text-secondary transition hover:bg-white/70"
    >
      Cart{count > 0 ? ` ${count}` : ""}
    </Link>
  );
}

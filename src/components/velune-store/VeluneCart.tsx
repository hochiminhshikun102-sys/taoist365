"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { formatUsd, type VeluneProduct } from "@/lib/velune-store";

type CartItem = { sku: string; slug: string; name: string; price: number; qty: number };
type QuietCartItem = { id: string; title: string; priceCents: number; quantity: number; image: string };
type CheckoutCartItem = { sku: string; slug?: string; name: string; price: number; priceCents: number; qty: number };
type CheckoutActions = {
  confirm: () => Promise<{ error?: { message?: string } }>;
  getSession?: () => { total?: { total?: { amount?: number } } };
};
type StripePaymentElement = { mount: (target: HTMLElement | string) => void; destroy?: () => void };
type StripeRuntime = {
  initCheckoutElementsSdk: (config: {
    clientSecret: Promise<string>;
    elementsOptions?: Record<string, unknown>;
  }) => {
    on: (event: "change", callback: (session: { canConfirm?: boolean; total?: { total?: { amount?: number } } }) => void) => void;
    loadActions: () => Promise<{ type: string; actions?: CheckoutActions; error?: { message?: string } }>;
    createPaymentElement: () => StripePaymentElement;
  };
};

const CART_KEY = "velune_audit_cart";
const QUIET_CART_KEY = "taoist365-quiet-cart";
const BUILD_STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

declare global {
  interface Window {
    Stripe?: (key: string) => StripeRuntime;
  }
}

let stripeLoader: Promise<StripeRuntime> | null = null;
let publishableKeyLoader: Promise<string> | null = null;

async function getStripePublishableKey() {
  if (publishableKeyLoader) return publishableKeyLoader;

  publishableKeyLoader = fetch("/api/stripe-config", { cache: "no-store" })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Stripe publishable key is not configured.");
      return data.publishableKey as string;
    })
    .catch((error) => {
      if (BUILD_STRIPE_PUBLISHABLE_KEY) return BUILD_STRIPE_PUBLISHABLE_KEY;
      throw error;
    });

  return publishableKeyLoader;
}

async function loadStripe() {
  if (typeof window === "undefined") return Promise.reject(new Error("Stripe can only load in the browser."));
  const publishableKey = await getStripePublishableKey();
  if (window.Stripe) return Promise.resolve(window.Stripe(publishableKey));
  if (stripeLoader) return stripeLoader;

  stripeLoader = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-velune-stripe]");
    const script = existing || document.createElement("script");
    script.src = "https://js.stripe.com/dahlia/stripe.js";
    script.async = true;
    script.dataset.veluneStripe = "true";
    script.onload = () => {
      if (!window.Stripe) reject(new Error("Stripe.js did not initialize."));
      else resolve(window.Stripe(publishableKey));
    };
    script.onerror = () => reject(new Error("Unable to load Stripe.js."));
    if (!existing) document.head.appendChild(script);
  });

  return stripeLoader;
}

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(CART_KEY) || "[]") as CartItem[];
  } catch {
    return [];
  }
}

function writeCart(cart: CartItem[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("velune-cart-change"));
}

function readQuietCheckoutCart(): CheckoutCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const cart = JSON.parse(window.localStorage.getItem(QUIET_CART_KEY) || "[]") as QuietCartItem[];
    return cart.map((item) => ({
      sku: item.id,
      slug: item.id,
      name: item.title,
      price: item.priceCents / 100,
      priceCents: item.priceCents,
      qty: item.quantity,
    }));
  } catch {
    return [];
  }
}

function readCheckoutCart(): CheckoutCartItem[] {
  const quietCart = readQuietCheckoutCart();
  if (quietCart.length) return quietCart;
  return readCart().map((item) => ({ ...item, priceCents: item.price * 100 }));
}

function clearCheckoutCart() {
  writeCart([]);
  window.localStorage.removeItem(QUIET_CART_KEY);
  window.dispatchEvent(new Event("quiet-cart-change"));
}

export function CartCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const update = () => setCount(readCart().reduce((sum, item) => sum + item.qty, 0));
    update();
    window.addEventListener("velune-cart-change", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("velune-cart-change", update);
      window.removeEventListener("storage", update);
    };
  }, []);
  return <>{count}</>;
}

export function ProductPurchaseControls({ product }: { product: VeluneProduct }) {
  const [qty, setQty] = useState(1);
  const add = () => {
    const cart = readCart();
    const existing = cart.find((item) => item.sku === product.sku);
    if (existing) existing.qty += qty;
    else cart.push({ sku: product.sku, slug: product.slug, name: product.productName, price: product.price, qty });
    writeCart(cart);
  };
  const buyNow = () => {
    add();
    window.location.href = "/store/checkout";
  };
  return (
    <div className="qtyRow">
      <input
        aria-label="Quantity"
        type="number"
        min={1}
        max={12}
        value={qty}
        onChange={(event) => setQty(Math.max(1, Number(event.target.value) || 1))}
      />
      <button className="button" type="button" onClick={add}>Add to Cart</button>
      <button className="buttonSecondary" type="button" onClick={buyNow}>Buy Now</button>
    </div>
  );
}

export function CartRuntime() {
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    const update = () => setCart(readCart());
    update();
    window.addEventListener("velune-cart-change", update);
    return () => window.removeEventListener("velune-cart-change", update);
  }, []);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const remove = (sku: string) => writeCart(cart.filter((item) => item.sku !== sku));

  if (!cart.length) {
    return <div className="notice">Your bag is empty. <Link href="/store#shop">Return to the collection</Link>.</div>;
  }

  return (
    <>
      <table className="cartTable">
        <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Action</th></tr></thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.sku}>
              <td><Link href={`/store/products/${item.slug}`}>{item.name}</Link><br /><small>{item.sku}</small></td>
              <td>{item.qty}</td>
              <td>{formatUsd(item.price * item.qty)}</td>
              <td><button className="buttonSecondary" type="button" onClick={() => remove(item.sku)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="notice" style={{ marginTop: 16 }}>
        <strong>Estimated subtotal: {formatUsd(subtotal)} USD</strong><br />
        Shipping is currently limited to United States addresses for review.
      </div>
      <div style={{ marginTop: 16 }}>
        <Link className="button" href="/store/checkout">Proceed to Checkout</Link>
      </div>
    </>
  );
}

export function CheckoutRuntime() {
  const [cart, setCart] = useState<CheckoutCartItem[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "submitting" | "paid" | "error">("idle");
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("Pay now");
  const [canConfirm, setCanConfirm] = useState(false);
  const [actions, setActions] = useState<CheckoutActions | null>(null);
  const paymentElementRef = useRef<HTMLDivElement | null>(null);
  const mountedElementRef = useRef<StripePaymentElement | null>(null);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);

  useEffect(() => {
    queueMicrotask(() => setCart(readCheckoutCart()));
  }, []);

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) return;

    let active = true;
    queueMicrotask(() => {
      if (active) setStatus("loading");
    });
    fetch(`/api/session-status?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to confirm payment status.");
        return data;
      })
      .then((data) => {
        if (!active) return;
        if (data.status === "complete" || data.payment_status === "paid") {
          clearCheckoutCart();
          setCart([]);
          setStatus("paid");
          setMessage("Payment received. Your order is ready for review processing.");
        } else {
          setStatus("error");
          setMessage("Payment was not completed. Please try again or use another test card.");
        }
      })
      .catch((error) => {
        if (!active) return;
        setStatus("error");
        setMessage(error.message);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!cart.length || new URLSearchParams(window.location.search).has("session_id")) return;
    let active = true;

    async function initializeStripeCheckout() {
      try {
        setStatus("loading");
        setMessage("Loading secure Stripe checkout...");
        const stripe = await loadStripe();
        const clientSecret = fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ cart: cart.map(({ sku, name, priceCents, qty }) => ({ sku, name, priceCents, qty })) }),
        })
          .then(async (response) => {
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Unable to start Stripe checkout.");
            return data.clientSecret as string;
          });

        const checkout = stripe.initCheckoutElementsSdk({
          clientSecret,
          elementsOptions: {
            appearance: {
              theme: "stripe",
              variables: {
                colorPrimary: "#bfa675",
                colorText: "#2d2d2a",
                colorDanger: "#9e6b6b",
                borderRadius: "12px",
                fontFamily: "Inter, Arial, sans-serif",
              },
            },
          },
        });

        checkout.on("change", (session) => {
          if (!active) return;
          setCanConfirm(Boolean(session.canConfirm));
          const amount = session.total?.total?.amount;
          if (typeof amount === "number") setButtonText(`Pay ${formatUsd(amount / 100)}`);
        });

        const loadActionsResult = await checkout.loadActions();
        if (!active) return;
        if (loadActionsResult.type !== "success" || !loadActionsResult.actions) {
          throw new Error(loadActionsResult.error?.message || "Stripe checkout is not ready.");
        }

        setActions(loadActionsResult.actions);
        const amount = loadActionsResult.actions.getSession?.().total?.total?.amount;
        if (typeof amount === "number") setButtonText(`Pay ${formatUsd(amount / 100)}`);

        if (paymentElementRef.current) {
          mountedElementRef.current?.destroy?.();
          mountedElementRef.current = checkout.createPaymentElement();
          mountedElementRef.current.mount(paymentElementRef.current);
        }

        setStatus("ready");
        setMessage("");
      } catch (error) {
        if (!active) return;
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Unable to load Stripe checkout.");
      }
    }

    initializeStripeCheckout();

    return () => {
      active = false;
      mountedElementRef.current?.destroy?.();
      mountedElementRef.current = null;
    };
  }, [cart]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!actions) return;

    setStatus("submitting");
    setMessage("");

    const result = await actions.confirm();
    if (result.error) {
      setStatus("ready");
      setMessage(result.error.message || "Payment could not be completed.");
    }
  }

  if (!cart.length && status !== "paid") {
    return <div className="notice">Your bag is empty. <Link href="/store#shop">Return to the collection</Link>.</div>;
  }

  if (status === "paid") {
    return (
      <div className="checkoutLayout">
        <div className="notice successNotice">
          <strong>Payment received.</strong><br />
          {message}
        </div>
        <Link className="button" href="/store">Return to Velune Store</Link>
      </div>
    );
  }

  return (
    <div className="checkoutLayout">
      <div className="notice">
        <strong>Order summary: {formatUsd(subtotal)} USD</strong><br />
        Secure checkout is powered by Stripe. United States delivery only during review.
        <ul className="checkoutItems">
          {cart.map((item) => (
            <li key={item.sku}>
              {item.name} × {item.qty} <span>{formatUsd(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
      </div>

      <form className="stripeCheckoutForm" onSubmit={handleSubmit}>
        <div className="paymentBox">
          <h3>Payment</h3>
          <div ref={paymentElementRef} />
        </div>
        {message ? <div className={status === "error" ? "notice errorNotice" : "notice"}>{message}</div> : null}
        <button className="button" type="submit" disabled={!actions || !canConfirm || status === "loading" || status === "submitting"}>
          {status === "loading" ? "Loading checkout..." : status === "submitting" ? "Processing..." : buttonText}
        </button>
      </form>
    </div>
  );
}

"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { cartSubtotal, readQuietCart, type QuietCartItem, writeQuietCart } from "@/lib/quiet-cart";
import { formatPrice } from "@/config/operational-commerce";

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

const livePublishableKey =
  "pk_live_51TTn5jC2b4FFKE1qlUsTKcgstlXTqsZf9zBhbcJKJaV1PxlrIX4LcWnZ7vsDTNXYQcA6ZRzTaME0lp4gHFYFTlPd00BQwVEhuN";
const buildStripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || livePublishableKey;

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
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) return buildStripePublishableKey;
      const data = await response.json();
      if (!response.ok) return buildStripePublishableKey;
      return data.publishableKey as string;
    })
    .catch(() => buildStripePublishableKey);

  return publishableKeyLoader;
}

async function loadStripe() {
  if (typeof window === "undefined") return Promise.reject(new Error("Stripe can only load in the browser."));

  const publishableKey = await getStripePublishableKey();
  if (window.Stripe) return Promise.resolve(window.Stripe(publishableKey));
  if (stripeLoader) return stripeLoader;

  stripeLoader = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-dohara-stripe]");
    const script = existing || document.createElement("script");
    script.src = "https://js.stripe.com/dahlia/stripe.js";
    script.async = true;
    script.dataset.doharaStripe = "true";
    script.onload = () => {
      if (!window.Stripe) reject(new Error("Stripe.js did not initialize."));
      else resolve(window.Stripe(publishableKey));
    };
    script.onerror = () => reject(new Error("Unable to load Stripe.js."));
    if (!existing) document.head.appendChild(script);
  });

  return stripeLoader;
}

function clearCheckoutCart() {
  writeQuietCart([]);
  window.dispatchEvent(new Event("quiet-cart-change"));
}

export function DoharaCheckoutClient() {
  const [items, setItems] = useState<QuietCartItem[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "submitting" | "paid" | "error">("idle");
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("Pay now");
  const [canConfirm, setCanConfirm] = useState(false);
  const [actions, setActions] = useState<CheckoutActions | null>(null);
  const paymentElementRef = useRef<HTMLDivElement | null>(null);
  const mountedElementRef = useRef<StripePaymentElement | null>(null);
  const subtotal = useMemo(() => cartSubtotal(items), [items]);

  useEffect(() => {
    queueMicrotask(() => setItems(readQuietCart()));
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
        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          throw new Error("Payment status API is available after Cloudflare deployment. Local preview cannot confirm this session.");
        }
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to confirm payment status.");
        return data;
      })
      .then((data) => {
        if (!active) return;
        if (data.status === "complete" || data.payment_status === "paid") {
          clearCheckoutCart();
          setItems([]);
          setStatus("paid");
          setMessage("Payment received. Dohara will review fulfillment and prepare shipping.");
        } else {
          setStatus("error");
          setMessage("Payment was not completed. Please try again or use another card.");
        }
      })
      .catch((error) => {
        if (!active) return;
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Unable to confirm payment status.");
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!items.length || new URLSearchParams(window.location.search).has("session_id")) return;

    let active = true;

    async function initializeCheckout() {
      try {
        setStatus("loading");
        setMessage("Loading secure Stripe checkout...");
        const stripe = await loadStripe();
        const clientSecret = fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            source: "dohara_objects",
            cart: items.map((item) => ({
              sku: item.id,
              name: item.title,
              priceCents: item.priceCents,
              qty: item.quantity,
            })),
          }),
        }).then(async (response) => {
          const contentType = response.headers.get("content-type") || "";
          if (!contentType.includes("application/json")) {
            throw new Error("Stripe checkout API is available after Cloudflare deployment. Local preview cannot start live payment.");
          }
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
                colorPrimary: "#0B1B33",
                colorText: "#1A2A44",
                colorDanger: "#B42318",
                borderRadius: "8px",
                fontFamily: "Inter, Arial, sans-serif",
              },
            },
          },
        });

        checkout.on("change", (session) => {
          if (!active) return;
          setCanConfirm(Boolean(session.canConfirm));
          const amount = session.total?.total?.amount;
          if (typeof amount === "number") setButtonText(`Pay ${formatPrice(amount)}`);
        });

        const loadActionsResult = await checkout.loadActions();
        if (!active) return;
        if (loadActionsResult.type !== "success" || !loadActionsResult.actions) {
          throw new Error(loadActionsResult.error?.message || "Stripe checkout is not ready.");
        }

        setActions(loadActionsResult.actions);
        const amount = loadActionsResult.actions.getSession?.().total?.total?.amount;
        if (typeof amount === "number") setButtonText(`Pay ${formatPrice(amount)}`);

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

    initializeCheckout();

    return () => {
      active = false;
      mountedElementRef.current?.destroy?.();
      mountedElementRef.current = null;
    };
  }, [items]);

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

  if (!items.length && status !== "paid") {
    return (
      <section className="rounded-2xl border border-[#e6eaf0] bg-white p-8 shadow-[0_12px_32px_rgba(13,32,64,0.06)]">
        <h2 className="font-[var(--font-display-serif)] text-[30px] font-semibold leading-9 text-[#0b1b33]">Your checkout is empty.</h2>
        <p className="mt-3 text-[15px] leading-6 text-[#3b4556]">Add a Dohara object first, then return here for secure payment.</p>
        <Link href="/objects" className="mt-6 inline-grid h-12 place-items-center rounded-lg bg-[#0b1b33] px-6 text-[15px] font-semibold text-white">
          Browse Objects
        </Link>
      </section>
    );
  }

  if (status === "paid") {
    return (
      <section className="rounded-2xl border border-[#e6eaf0] bg-white p-8 shadow-[0_12px_32px_rgba(13,32,64,0.06)]">
        <p className="text-[13px] leading-5 text-[#6b778c]">Payment complete</p>
        <h2 className="mt-2 font-[var(--font-display-serif)] text-[34px] font-semibold leading-10 text-[#0b1b33]">Thank you.</h2>
        <p className="mt-4 text-[15px] leading-6 text-[#3b4556]">{message}</p>
        <Link href="/objects" className="mt-6 inline-grid h-12 place-items-center rounded-lg border border-[#2e4a7d] bg-white px-6 text-[15px] font-semibold text-[#2e4a7d]">
          Back to Objects
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.42fr)_minmax(360px,0.58fr)]">
      <section className="rounded-2xl border border-[#e6eaf0] bg-white p-6 shadow-[0_12px_32px_rgba(13,32,64,0.06)]">
        <p className="text-[13px] leading-5 text-[#6b778c]">Order summary</p>
        <h2 className="mt-2 text-[24px] font-semibold leading-8 text-[#0b1b33]">{formatPrice(subtotal)}</h2>
        <div className="mt-6 grid gap-4">
          {items.map((item) => (
            <div key={item.id} className="grid gap-1 border-b border-[#e8ecf1] pb-4">
              <div className="flex justify-between gap-4 text-[14px] leading-5 text-[#1a2a44]">
                <span>{item.title}</span>
                <span className="font-semibold text-[#0b1b33]">{formatPrice(item.priceCents * item.quantity)}</span>
              </div>
              <p className="text-[13px] leading-5 text-[#6b778c]">Qty {item.quantity}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 rounded-lg bg-[#eef3fa] p-3 text-[12px] leading-5 text-[#3b4556]">
          Secure payment is processed by Stripe. Shipping details are collected in checkout and reviewed before fulfillment.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-[#e6eaf0] bg-white p-6 shadow-[0_12px_32px_rgba(13,32,64,0.06)]">
        <p className="text-[13px] leading-5 text-[#6b778c]">Payment</p>
        <h2 className="mt-2 text-[24px] font-semibold leading-8 text-[#0b1b33]">Secure checkout</h2>
        <div className="mt-6 rounded-xl border border-[#e6eaf0] bg-white p-4">
          <div ref={paymentElementRef} />
        </div>
        {message ? <p className={`mt-4 rounded-lg p-3 text-[13px] leading-5 ${status === "error" ? "bg-[#fff1f0] text-[#b42318]" : "bg-[#eef3fa] text-[#3b4556]"}`}>{message}</p> : null}
        <button
          type="submit"
          disabled={!actions || !canConfirm || status === "loading" || status === "submitting"}
          className="mt-5 grid h-12 w-full place-items-center rounded-lg bg-[#0b1b33] text-[15px] font-semibold leading-5 text-white transition hover:bg-[#123a68] disabled:cursor-not-allowed disabled:bg-[#b8c4d4]"
        >
          {status === "loading" ? "Loading checkout..." : status === "submitting" ? "Processing..." : buttonText}
        </button>
      </form>
    </div>
  );
}

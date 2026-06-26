"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { cartSubtotal, readQuietCart, type QuietCartItem, writeQuietCart } from "@/lib/quiet-cart";
import { formatPrice } from "@/config/operational-commerce";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-[13px] font-semibold leading-5 text-[#1a2a44]">{children}</label>;
}

const inputClass =
  "mt-2 w-full rounded-lg border border-[#e6eaf0] bg-white px-4 py-3 text-[14px] leading-5 text-[#1a2a44] outline-none transition placeholder:text-[#8a99aa] focus:border-[#2e4a7d] focus:ring-4 focus:ring-[#eef3fa]";

export function OrderClient() {
  const [items, setItems] = useState<QuietCartItem[]>(() => readQuietCart());
  const [submittedOrder, setSubmittedOrder] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitNote, setSubmitNote] = useState("");

  const subtotal = cartSubtotal(items);
  const orderBody = useMemo(() => {
    const lines = items.map((item) => `${item.quantity} x ${item.title} - ${formatPrice(item.priceCents * item.quantity)}`);
    return [`Dohara order ${submittedOrder ?? ""}`, "", ...lines, "", `Subtotal: ${formatPrice(subtotal)}`].join("\n");
  }, [items, submittedOrder, subtotal]);

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setIsSubmitting(true);
    setSubmitNote("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          contact: {
            name: formData.get("name"),
            email: formData.get("email"),
            address: formData.get("address"),
            note: formData.get("note"),
          },
          items,
          subtotal,
          note: formData.get("note"),
        }),
      });
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error("ORDER_API_UNAVAILABLE");
      }
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to create order request.");

      const id = data.order_no || data.order?.id;
      setSubmittedOrder(id);
      window.localStorage.setItem(
        "taoist365-last-order",
        JSON.stringify({ id, items, subtotal, contact: data.order?.contact, createdAt: new Date().toISOString() }),
      );
      window.location.href = "/checkout";
    } catch (error) {
      const fallbackId = `DH-ORD-${Date.now().toString().slice(-7)}`;
      window.localStorage.setItem(
        "taoist365-last-order",
        JSON.stringify({
          id: fallbackId,
          items,
          subtotal,
          contact: {
            name: formData.get("name"),
            email: formData.get("email"),
            address: formData.get("address"),
            note: formData.get("note"),
          },
          createdAt: new Date().toISOString(),
          localFallback: true,
        }),
      );
      window.location.href = "/checkout";
    } finally {
      setIsSubmitting(false);
    }
  }

  if (items.length === 0 && !submittedOrder) {
    return (
      <section className="rounded-2xl border border-[#e6eaf0] bg-white p-8 shadow-[0_12px_32px_rgba(13,32,64,0.06)]">
        <p className="text-[13px] leading-5 text-[#6b778c]">Cart</p>
        <h2 className="mt-2 font-[var(--font-display-serif)] text-[30px] font-semibold leading-9 text-[#0b1b33]">Your order is empty.</h2>
        <p className="mt-3 max-w-xl text-[15px] leading-6 text-[#3b4556]">Choose an object first, then come back here to confirm delivery and payment preparation.</p>
        <Link href="/objects" className="mt-6 inline-grid h-12 place-items-center rounded-lg bg-[#0b1b33] px-6 text-[15px] font-semibold text-white">
          Browse Objects
        </Link>
      </section>
    );
  }

  if (submittedOrder) {
    const href = `mailto:hello@taoist365.com?subject=${encodeURIComponent(`Dohara order ${submittedOrder}`)}&body=${encodeURIComponent(orderBody)}`;

    return (
      <section className="rounded-2xl border border-[#e6eaf0] bg-white p-6 shadow-[0_12px_32px_rgba(13,32,64,0.06)] md:p-8">
        <p className="text-[13px] leading-5 text-[#6b778c]">Order request</p>
        <h2 className="mt-2 font-[var(--font-display-serif)] text-[32px] font-semibold leading-10 text-[#0b1b33]">{submittedOrder}</h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-6 text-[#3b4556]">
          Your order is saved. Dohara operations can now review stock, delivery, packaging, and payment confirmation.
        </p>
        <div className="mt-6 whitespace-pre-wrap rounded-xl border border-[#e6eaf0] bg-[#f7f9fc] p-4 text-[13px] leading-6 text-[#6b778c]">
          {orderBody}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={href} className="grid h-12 place-items-center rounded-lg bg-[#0b1b33] px-6 text-[15px] font-semibold text-white">
            Send order mail
          </a>
          <button
            type="button"
            onClick={() => {
              writeQuietCart([]);
              setItems([]);
            }}
            className="grid h-12 place-items-center rounded-lg border border-[#2e4a7d] bg-white px-6 text-[15px] font-semibold text-[#2e4a7d]"
          >
            Clear cart
          </button>
        </div>
      </section>
    );
  }

  return (
    <form onSubmit={submitOrder} className="grid gap-6 lg:grid-cols-[minmax(0,0.62fr)_minmax(340px,0.38fr)]">
      <section className="rounded-2xl border border-[#e6eaf0] bg-white p-5 shadow-[0_12px_32px_rgba(13,32,64,0.06)] md:p-7">
        <p className="text-[13px] leading-5 text-[#6b778c]">Contact & delivery</p>
        <h2 className="mt-2 text-[24px] font-semibold leading-8 text-[#0b1b33]">Delivery details</h2>
        <div className="mt-6 grid gap-5">
          <div>
            <FieldLabel>Name</FieldLabel>
            <input required name="name" placeholder="Full name" className={inputClass} />
          </div>
          <div>
            <FieldLabel>Email</FieldLabel>
            <input required name="email" type="email" placeholder="Email address" className={inputClass} />
          </div>
          <div>
            <FieldLabel>Shipping address</FieldLabel>
            <textarea required name="address" rows={5} placeholder="Street, city, state, postal code, country" className={`${inputClass} resize-y`} />
          </div>
          <div>
            <FieldLabel>Order note</FieldLabel>
            <textarea name="note" rows={4} placeholder="Delivery timing, gift note, or product question" className={`${inputClass} resize-y`} />
          </div>
        </div>
      </section>

      <aside className="rounded-2xl border border-[#e6eaf0] bg-white p-5 shadow-[0_12px_32px_rgba(13,32,64,0.06)] md:p-7 lg:sticky lg:top-24">
        <p className="text-[13px] leading-5 text-[#6b778c]">Order summary</p>
        <h2 className="mt-2 text-[24px] font-semibold leading-8 text-[#0b1b33]">Review objects</h2>

        <div className="mt-6 grid gap-4">
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-[72px_1fr] gap-4 border-b border-[#e8ecf1] pb-4">
              <div className="relative h-[72px] overflow-hidden rounded-lg bg-[#f7f9fc]">
                {item.image ? <Image src={item.image} alt={item.title} fill className="object-cover" sizes="72px" /> : null}
              </div>
              <div>
                <p className="line-clamp-2 text-[14px] font-medium leading-5 text-[#1a2a44]">{item.title}</p>
                <p className="mt-1 text-[13px] leading-5 text-[#6b778c]">Qty {item.quantity}</p>
                <p className="mt-2 text-[15px] font-semibold leading-5 text-[#0b1b33]">{formatPrice(item.priceCents * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 text-[14px] leading-5">
          <div className="flex justify-between text-[#6b778c]">
            <span>Subtotal</span>
            <span className="font-semibold text-[#0b1b33]">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-[#6b778c]">
            <span>Shipping</span>
            <span>Confirmed after address</span>
          </div>
          <div className="flex justify-between border-t border-[#e8ecf1] pt-4 text-[18px] font-semibold text-[#0b1b33]">
            <span>Total today</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>

        <p className="mt-4 rounded-lg bg-[#eef3fa] p-3 text-[12px] leading-5 text-[#3b4556]">
          You will continue to secure payment after the order is saved. Shipping and fulfillment are reviewed after payment confirmation.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-5 grid h-12 w-full place-items-center rounded-lg bg-[#0b1b33] text-[15px] font-semibold leading-5 text-white transition hover:bg-[#123a68] disabled:cursor-not-allowed disabled:bg-[#b8c4d4]"
        >
          {isSubmitting ? "Opening checkout..." : "Continue to secure payment"}
        </button>
        {submitNote ? <p className="mt-3 text-[13px] leading-5 text-[#b42318]">{submitNote}</p> : null}
      </aside>
    </form>
  );
}

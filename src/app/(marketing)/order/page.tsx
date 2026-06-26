import type { Metadata } from "next";
import Link from "next/link";
import { OrderClient } from "@/components/commerce/OrderClient";

export const metadata: Metadata = {
  title: "Order - Dohara",
  description: "Complete a Dohara order request with clear contact, delivery, and payment preparation details.",
};

function OrderHeader() {
  return (
    <header className="border-b border-[#e8ecf1] bg-white">
      <div className="mx-auto grid h-16 w-full max-w-[1440px] grid-cols-[48px_1fr_96px] items-center px-4 md:h-20 md:grid-cols-[220px_1fr_260px] md:px-10">
        <Link href="/objects" aria-label="Open objects" className="text-[24px] leading-none text-[#0b1b33] md:hidden">
          ☰
        </Link>
        <Link href="/" className="justify-self-center font-[var(--font-display-serif)] text-[1.9rem] leading-none text-[#0b1b33] md:justify-self-start md:text-[2rem]">
          Dohara
        </Link>
        <nav className="hidden justify-center gap-12 text-[15px] font-medium leading-[22px] text-[#1a2a44] md:flex" aria-label="Order navigation">
          <Link href="/objects">Objects</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/search" className="flex items-center gap-2">
            <span aria-hidden="true">⌕</span> Search
          </Link>
        </nav>
        <nav className="flex justify-end gap-5 text-[22px] leading-none text-[#1a2a44] md:gap-8 md:text-[24px]" aria-label="Order actions">
          <Link href="/account/wishlist" aria-label="Wishlist">♡</Link>
          <Link href="/cart" aria-label="Cart" className="relative">
            □
            <span className="absolute -right-2 -top-2 grid h-[14px] min-w-[14px] place-items-center rounded-full bg-[#0b1b33] px-1 text-[10px] font-semibold leading-none text-white">
              1
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default function OrderPage() {
  return (
    <main className="min-h-full bg-[#f7f9fc] text-[#1a2a44]">
      <OrderHeader />
      <section className="mx-auto w-full max-w-[1440px] px-4 py-8 md:px-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(320px,0.28fr)] lg:items-start">
          <div>
            <p className="text-[13px] leading-5 text-[#6b778c]">Checkout</p>
            <h1 className="mt-3 max-w-3xl font-[var(--font-display-serif)] text-[34px] font-semibold leading-[42px] text-[#0b1b33] md:text-[48px] md:leading-[58px]">
              Complete your Dohara order.
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-6 text-[#3b4556]">
              Confirm contact and delivery details. Payment stays prepared in this step and can be connected to the live provider when enabled.
            </p>
          </div>
          <aside className="rounded-2xl border border-[#e6eaf0] bg-white p-5 shadow-[0_12px_32px_rgba(13,32,64,0.06)]">
            <p className="text-[14px] font-semibold leading-5 text-[#0b1b33]">Secure order flow</p>
            <div className="mt-4 grid gap-3 text-[13px] leading-5 text-[#6b778c]">
              <p>Protected checkout preparation</p>
              <p>Delivery details reviewed before fulfillment</p>
              <p>Order record saved for operations</p>
            </div>
          </aside>
        </div>

        <div className="mt-8 md:mt-10">
          <OrderClient />
        </div>
      </section>
    </main>
  );
}

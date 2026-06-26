import type { Metadata } from "next";
import Link from "next/link";
import { DoharaCheckoutClient } from "@/components/commerce/DoharaCheckoutClient";

export const metadata: Metadata = {
  title: "Checkout - Dohara",
  description: "Secure Dohara checkout powered by Stripe.",
};

export default function CheckoutPage() {
  return (
    <main className="min-h-full bg-[#f7f9fc] text-[#1a2a44]">
      <header className="border-b border-[#e8ecf1] bg-white">
        <div className="mx-auto grid h-16 w-full max-w-[1440px] grid-cols-[48px_1fr_96px] items-center px-4 md:h-20 md:grid-cols-[220px_1fr_260px] md:px-10">
          <Link href="/objects" aria-label="Back to objects" className="text-[24px] leading-none text-[#0b1b33] md:hidden">
            ‹
          </Link>
          <Link href="/" className="justify-self-center font-[var(--font-display-serif)] text-[1.9rem] leading-none text-[#0b1b33] md:justify-self-start md:text-[2rem]">
            Dohara
          </Link>
          <nav className="hidden justify-center gap-12 text-[15px] font-medium leading-[22px] text-[#1a2a44] md:flex" aria-label="Checkout navigation">
            <Link href="/objects">Objects</Link>
            <Link href="/collections">Collections</Link>
            <Link href="/cart">Cart</Link>
          </nav>
          <nav className="flex justify-end gap-5 text-[22px] leading-none text-[#1a2a44] md:gap-8 md:text-[24px]" aria-label="Checkout actions">
            <Link href="/account/wishlist" aria-label="Wishlist">♡</Link>
            <Link href="/cart" aria-label="Cart">□</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto w-full max-w-[1440px] px-4 py-8 md:px-10 md:py-12">
        <p className="text-[13px] leading-5 text-[#6b778c]">Checkout</p>
        <h1 className="mt-3 max-w-3xl font-[var(--font-display-serif)] text-[34px] font-semibold leading-[42px] text-[#0b1b33] md:text-[48px] md:leading-[58px]">
          Secure Dohara payment.
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-6 text-[#3b4556]">
          Review your objects and complete payment through Stripe. Shipping and contact details are collected securely in checkout.
        </p>
        <div className="mt-8 md:mt-10">
          <DoharaCheckoutClient />
        </div>
      </section>
    </main>
  );
}

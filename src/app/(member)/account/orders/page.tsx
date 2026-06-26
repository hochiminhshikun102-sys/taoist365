import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Orders - Account",
  description: "Member order status and after-sales entry.",
};

export default function AccountOrdersPage() {
  return (
    <main className="min-h-dvh bg-[#F5F6F8] px-5 py-8 text-[#2D333A]">
      <section className="mx-auto grid w-full max-w-5xl gap-6">
        <header className="border-b border-[#D9DCE0] pb-6">
          <Link href="/account" className="text-sm text-[#6B7280]">Account</Link>
          <h1 className="mt-3 text-4xl font-semibold">My Orders</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280]">Reserved member order room for paid, packing, shipped, completed, return, and after-sales states.</p>
        </header>
        <div className="rounded-2xl border border-[#D9DCE0] bg-white p-5 text-sm leading-7 text-[#6B7280]">
          <p>Orders already enter the OA order queue. The member-side order view will read the same order runtime after account identity is connected.</p>
          <Link href="/order" className="mt-4 inline-flex text-[#947A66]">Open checkout flow</Link>
        </div>
      </section>
    </main>
  );
}

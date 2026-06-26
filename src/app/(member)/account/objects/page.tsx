import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Objects - Account",
  description: "Member objects kept, received, requested, or continuing through Windkeep.",
};

export default function AccountObjectsPage() {
  return (
    <main className="min-h-dvh bg-[#F5F6F8] px-5 py-8 text-[#2D333A]">
      <section className="mx-auto grid w-full max-w-5xl gap-6">
        <header className="border-b border-[#D9DCE0] pb-6">
          <Link href="/account" className="text-sm text-[#6B7280]">Account</Link>
          <h1 className="mt-3 text-4xl font-semibold">My Objects</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280]">Reserved member object room for purchased, kept, received, and Windkeep-continuing objects.</p>
        </header>
        <div className="rounded-2xl border border-[#D9DCE0] bg-white p-5 text-sm leading-7 text-[#6B7280]">
          <p>This page is reserved for the buyer member center. Published products stay in `/objects`; member-owned object state will be attached here later.</p>
          <Link href="/account/windkeep-supply" className="mt-4 inline-flex text-[#947A66]">Open Windkeep Supply</Link>
        </div>
      </section>
    </main>
  );
}

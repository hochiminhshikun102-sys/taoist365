import type { Metadata } from "next";
import Link from "next/link";

const rewardTracks = [
  ["Verification", "Member identity and supply permission review."],
  ["Level", "Future certified levels for shopping benefits and supply trust."],
  ["Discount", "Future member shopping discount and occasional object benefits."],
  ["Referral", "Future friend, neighbor, and referral reward tracking."],
  ["Rebate", "Future supply, consignment, and approved referral settlement."],
] as const;

export const metadata: Metadata = {
  title: "Rewards - Account",
  description: "Reserved member reward, referral, discount, and rebate layer.",
};

export default function AccountRewardsPage() {
  return (
    <main className="min-h-dvh bg-[#F5F6F8] px-5 py-8 text-[#2D333A]">
      <section className="mx-auto grid w-full max-w-5xl gap-6">
        <header className="border-b border-[#D9DCE0] pb-6">
          <Link href="/account" className="text-sm text-[#6B7280]">Account</Link>
          <h1 className="mt-3 text-4xl font-semibold">Rewards</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280]">Reserved reward layer for verified members, shopping benefits, referrals, neighbor supply, and future rebate settlement.</p>
        </header>
        <div className="grid gap-3 md:grid-cols-2">
          {rewardTracks.map(([title, note]) => (
            <article key={title} className="rounded-2xl border border-[#D9DCE0] bg-white p-5">
              <p className="text-sm font-semibold">{title}</p>
              <p className="mt-3 text-sm leading-7 text-[#6B7280]">{note}</p>
            </article>
          ))}
        </div>
        <div className="rounded-2xl border border-[#D9DCE0] bg-white p-5 text-sm leading-7 text-[#6B7280]">
          <p>Reward eligibility is already reserved on Windkeep source types through `reward_eligible=true`.</p>
          <Link href="/account/windkeep-supply" className="mt-4 inline-flex text-[#947A66]">Open Windkeep Supply</Link>
        </div>
      </section>
    </main>
  );
}

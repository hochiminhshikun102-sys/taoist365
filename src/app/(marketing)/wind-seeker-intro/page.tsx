import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WindSeekerCard, WindSeekerFrame, windSeekerIcon, windSeekerLogo } from "@/components/wind-seeker/WindSeekerShell";
import { buildSeoGeoMetadata } from "@/lib/seo-geo-runtime";

export const metadata: Metadata = buildSeoGeoMetadata({
  title: "Wind Seeker - Dohara",
  description: "Join Dohara Wind Seeker to discover, capture, and submit new objects through the AI intake pipeline.",
  path: "/wind-seeker-intro",
  kind: "wind-seeker",
  phrases: ["Wind Seeker", "global buyer", "object intake", "AI product upload"],
});

const joinCards = [
  ["Curators", "People with a clear eye for beautiful useful objects."],
  ["Local Finders", "Buyers who can source from markets, studios, stores, and trusted suppliers."],
  ["Careful Operators", "Partners who can provide real photos, source notes, and accurate details."],
] as const;

const workflow = [
  ["Capture", "Take or upload product media."],
  ["AI Draft", "Let Air Engine prepare title, category, tags, story, and risk hints."],
  ["Complete", "Add price, inventory, location, logistics, and source context."],
  ["Review", "Submit to Dohara review before an object can be published."],
] as const;

const doNotSubmit = ["Counterfeit goods", "Unsafe or restricted items", "Copyrighted photos without rights", "Objects with unclear source"];

export default function WindSeekerIntroPage() {
  return (
    <WindSeekerFrame active="dashboard" intro>
      <section className="relative overflow-hidden border-b border-[#D9E2EC] bg-[#F3F7FB]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(201,164,92,0.18),transparent_30%),linear-gradient(135deg,#F8FBFF_0%,#EAF3FE_52%,#F7F1E5_100%)]" />
        <div className="relative mx-auto grid min-h-[calc(100dvh-72px)] max-w-[1180px] items-center gap-10 px-5 py-14 lg:grid-cols-[0.55fr_0.45fr] lg:px-8">
          <div>
            <div className="relative h-16 w-72 max-w-full">
              <Image src={windSeekerLogo} alt="Wind Seeker" fill priority className="object-contain object-left" sizes="288px" />
            </div>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A45C]">Dohara Global Buyer Network</p>
            <h1 className="mt-5 font-[var(--font-display-serif)] text-5xl font-normal leading-[1.03] text-[#123A68] sm:text-6xl lg:text-7xl">
              Curated finds, carried by wind.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#5E738A]">
              Wind Seeker is the Dohara buyer-side intake system. It helps trusted finders capture objects, generate AI drafts,
              complete product facts, and send submissions into review without entering orders, after-sales, or Windkeep C2C flows.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/wind-seeker" className="rounded-full bg-[#123A68] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(18,58,104,0.18)]">
                Open Buyer Center
              </Link>
              <Link href="/wind-seeker/upload?step=capture" className="rounded-full border border-[#C9A45C] bg-white px-6 py-3 text-sm font-semibold text-[#123A68]">
                Start Upload
              </Link>
            </div>
          </div>
          <WindSeekerCard className="p-6">
            <div className="relative mx-auto h-48 w-48">
              <Image src={windSeekerIcon} alt="" fill priority className="object-contain" sizes="192px" />
            </div>
            <div className="mt-6 grid gap-3">
              {workflow.map(([title, body], index) => (
                <div key={title} className="grid grid-cols-[2.5rem_1fr] gap-4 rounded-2xl bg-[#F3F7FB] p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#C9A45C] text-sm font-semibold text-white">{index + 1}</span>
                  <div>
                    <p className="font-semibold text-[#123A68]">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#5E738A]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </WindSeekerCard>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] gap-6 px-5 py-10 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {joinCards.map(([title, body]) => (
            <WindSeekerCard key={title} className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">Who can join</p>
              <h2 className="mt-4 text-2xl font-semibold text-[#123A68]">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#5E738A]">{body}</p>
            </WindSeekerCard>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.55fr_0.45fr]">
          <WindSeekerCard className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">What to submit</p>
            <h2 className="mt-4 text-3xl font-semibold text-[#123A68]">Real media, source facts, and object story.</h2>
            <p className="mt-4 text-sm leading-7 text-[#5E738A]">
              P0 supports photos, short video, source link, price, inventory, location, logistics method, supplier note, and a short
              object story. Air Engine can prepare drafts, but review still decides whether an object enters Dohara.
            </p>
          </WindSeekerCard>
          <WindSeekerCard className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B84537]">Do not submit</p>
            <div className="mt-4 grid gap-3">
              {doNotSubmit.map((item) => (
                <p key={item} className="rounded-2xl bg-[#F8E8E4] px-4 py-3 text-sm font-medium text-[#B84537]">{item}</p>
              ))}
            </div>
          </WindSeekerCard>
        </div>
      </section>
    </WindSeekerFrame>
  );
}

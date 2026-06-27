"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { globalBuyerDepositPolicy } from "@/config/global-buyer-center";

const A = "/brand/production/homepage/final-air";
const applicationStorageKey = "ri-global-buyer-applications";

type BuyerApplication = {
  id: string;
  name: string;
  email: string;
  country: string;
  category: string;
  channel: string;
  experience: string;
  agreement: boolean;
  status: "Submitted" | "In Review" | "Approved" | "Returned";
  submittedAt: string;
};

const benefits = [
  ["Curated with Meaning", "Handpicked pieces with timeless beauty and story."],
  ["Global Shipping Support", "Operational support for region, shipping, and packaging."],
  ["Exclusive Benefits", "Commission, early access, buyer level, and settlement tools."],
  ["A Community", "A quieter network of global object finders."],
  ["Grow with Us", "Rules, help center, and backend support stay connected."],
] as const;

const categories = [
  ["Home & Living", "candle.webp"],
  ["Clothing & Textiles", "textile-chair.webp"],
  ["Beauty & Body", "scent-care.webp"],
  ["Jewelry & Accessories", "swan-crystal.webp"],
  ["Stationery & Gifts", "vase-flower.webp"],
  ["Wellness & Slow Living", "hero-pc-2.webp"],
] as const;

const steps = [
  ["01", "Apply", "Submit buyer identity and business context."],
  ["02", "Review", `Admin OS checks identity, ${globalBuyerDepositPolicy.onboardingDepositLabel} deposit, region, and risk.`],
  ["03", "Approve", "Buyer center opens after approval."],
  ["04", "Operate", "Publish, ship, settle, and handle after-sales."],
] as const;

function readApplications(): BuyerApplication[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(applicationStorageKey);
    return stored ? (JSON.parse(stored) as BuyerApplication[]) : [];
  } catch {
    return [];
  }
}

function writeApplications(applications: BuyerApplication[]) {
  window.localStorage.setItem(applicationStorageKey, JSON.stringify(applications));
}

function BuyerImage({ src, alt }: Readonly<{ src: string; alt: string }>) {
  return <Image src={`${A}/${src}`} alt={alt} width={760} height={520} className="h-full w-full object-cover" />;
}

export function GlobalBuyerLanding() {
  const [applications, setApplications] = useState<BuyerApplication[]>([]);
  const [form, setForm] = useState({
    name: "Wind Seeker",
    email: "buyer@example.com",
    country: "Japan",
    category: "Home & Living",
    channel: "Instagram / boutique journal",
    experience: "I find handmade ceramic, textile, and slow living objects from local markets.",
    agreement: true,
  });
  const latest = applications[0];

  useEffect(() => {
    setApplications(readApplications());
  }, []);

  const progress = useMemo(() => {
    if (!latest) return ["Ready", `Deposit ${globalBuyerDepositPolicy.onboardingDepositLabel}`, "Not submitted"];
    return ["Submitted", latest.status, `Deposit ${globalBuyerDepositPolicy.onboardingDepositLabel}`];
  }, [latest]);

  function submitApplication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.agreement) return;
    const next: BuyerApplication = {
      ...form,
      id: `BA-${Date.now().toString().slice(-6)}`,
      status: "Submitted",
      submittedAt: new Date().toISOString(),
    };
    const nextApplications = [next, ...applications].slice(0, 20);
    setApplications(nextApplications);
    writeApplications(nextApplications);
  }

  return (
    <main className="min-h-dvh bg-[#F5F6F8] text-[#2D333A]">
      <section className="grid min-h-dvh grid-rows-[auto_1fr] bg-white">
        <nav className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-6 border-b border-[#D9DCE0] px-6 py-5 text-sm">
          <div className="flex gap-5 text-[#6B7280]"><span>Global Buyer Program</span><span>Preview</span></div>
          <Link href="/" className="text-center text-xl font-semibold">Dohara</Link>
          <div className="flex justify-end gap-3">
            <Link href="/wind-seeker" className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-4 py-2">Buyer Center</Link>
            <Link href="/admin/wind-seeker-approval" className="rounded-xl border border-[#947A66] bg-[#947A66] px-4 py-2 text-white">Admin Review</Link>
          </div>
        </nav>

        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-6 py-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.16em] text-[#947A66]">Global Buyer Onboarding</p>
            <h1 className="mt-5 text-6xl font-semibold leading-[1.02] text-[#2D333A]">Global Buyers,<br />Bring beauty home.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#6B7280]">Apply, sign the platform agreement, and track review progress. The onboarding deposit is fixed at {globalBuyerDepositPolicy.onboardingDepositLabel}. The submitted application enters the Admin OS buyer review queue in this browser preview.</p>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {progress.map((item) => <div key={item} className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] p-4"><p className="text-sm font-semibold">{item}</p></div>)}
            </div>
          </div>

          <section id="apply" className="rounded-3xl border border-[#D9DCE0] bg-[#F5F6F8] p-6 shadow-[0_24px_80px_rgba(45,51,58,0.1)]">
            <div className="flex items-end justify-between gap-4 border-b border-[#D9DCE0] pb-5">
              <div>
                <p className="text-sm text-[#6B7280]">APPLY TO BECOME A BUYER</p>
                <h2 className="mt-2 text-3xl font-semibold">Buyer Application</h2>
              </div>
              <span className="rounded-full bg-[#A88C75]/12 px-3 py-1 text-sm text-[#6B5140]">Queue linked</span>
            </div>
            <form onSubmit={submitApplication} className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm">Name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 outline-none focus:border-[#947A66]" /></label>
              <label className="grid gap-2 text-sm">Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 outline-none focus:border-[#947A66]" /></label>
              <label className="grid gap-2 text-sm">Country<input value={form.country} onChange={(event) => setForm({ ...form, country: event.target.value })} className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 outline-none focus:border-[#947A66]" /></label>
              <label className="grid gap-2 text-sm">Primary Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 outline-none focus:border-[#947A66]">{categories.map(([category]) => <option key={category}>{category}</option>)}</select></label>
              <label className="grid gap-2 text-sm md:col-span-2">Channel / Storefront<input value={form.channel} onChange={(event) => setForm({ ...form, channel: event.target.value })} className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 outline-none focus:border-[#947A66]" /></label>
              <label className="grid gap-2 text-sm md:col-span-2">Object sourcing experience<textarea value={form.experience} onChange={(event) => setForm({ ...form, experience: event.target.value })} className="min-h-28 rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 outline-none focus:border-[#947A66]" /></label>
              <label className="flex items-center gap-3 rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 text-sm md:col-span-2"><input type="checkbox" checked={form.agreement} onChange={(event) => setForm({ ...form, agreement: event.target.checked })} /> I agree to the Platform Service Agreement and buyer review rules.</label>
              <div className="flex flex-wrap gap-3 md:col-span-2">
                <button type="submit" className="rounded-xl border border-[#947A66] bg-[#947A66] px-5 py-3 text-sm font-semibold text-white">Submit Application</button>
                <Link href="/wind-seeker" className="rounded-xl border border-[#D9DCE0] bg-white px-5 py-3 text-sm">Open Buyer Center</Link>
              </div>
            </form>
          </section>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10">
        <div className="grid gap-4 lg:grid-cols-5">
          {benefits.map(([title, copy]) => <article key={title} className="rounded-2xl border border-[#D9DCE0] bg-white p-5"><p className="font-semibold">{title}</p><p className="mt-2 text-sm leading-6 text-[#6B7280]">{copy}</p></article>)}
        </div>

        <section className="rounded-3xl border border-[#D9DCE0] bg-white p-6">
          <h2 className="text-3xl font-semibold">Explore What You Can Share</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {categories.map(([title, image]) => <article key={title} className="overflow-hidden rounded-xl border border-[#D9DCE0] bg-[#F5F6F8]"><div className="h-36"><BuyerImage src={image} alt={title} /></div><p className="p-3 text-center text-sm">{title}</p></article>)}
          </div>
        </section>

        <section className="rounded-3xl border border-[#D9DCE0] bg-white p-6">
          <h2 className="text-3xl font-semibold">Application Progress</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-4">
            {steps.map(([num, title, copy]) => <article key={num} className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] p-5"><p className="text-[#947A66]">{num}</p><h3 className="mt-3 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#6B7280]">{copy}</p></article>)}
          </div>
        </section>

        <section className="rounded-3xl border border-[#D9DCE0] bg-white p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-sm text-[#6B7280]">Local Preview Queue</p><h2 className="mt-2 text-3xl font-semibold">Submitted Applications</h2></div>
            <Link href="/admin/wind-seeker-approval" className="rounded-xl border border-[#947A66] bg-[#947A66] px-4 py-3 text-sm text-white">Review in Admin OS</Link>
          </div>
          <div className="mt-5 overflow-auto rounded-xl border border-[#D9DCE0]">
            <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
              <thead className="bg-[#EBEDEF] text-[#6B7280]"><tr><th className="px-3 py-3">ID</th><th className="px-3 py-3">Name</th><th className="px-3 py-3">Country</th><th className="px-3 py-3">Category</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Submitted</th></tr></thead>
              <tbody>
                {(applications.length ? applications : [{ id: "No application yet", name: "-", country: "-", category: "-", status: "Ready", submittedAt: "-" }]).map((item) => (
                  <tr key={item.id} className="border-t border-[#D9DCE0]"><td className="px-3 py-3">{item.id}</td><td className="px-3 py-3">{item.name}</td><td className="px-3 py-3">{item.country}</td><td className="px-3 py-3">{item.category}</td><td className="px-3 py-3">{item.status}</td><td className="px-3 py-3">{item.submittedAt.slice(0, 19)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

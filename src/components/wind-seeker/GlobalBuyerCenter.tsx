"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { EnrichedIntake } from "@/components/object-intake/ObjectIntakeTypes";
import { windSeekerSourceTypes } from "@/config/object-intake-source-types";
import { WindSeekerCard, WindSeekerFrame, WindSeekerStatusPill, windSeekerIcon } from "@/components/wind-seeker/WindSeekerShell";

const windSeekerBuyerId = "wind-seeker";
const windSeekerSourceTypeSet = new Set<string>(windSeekerSourceTypes);

function isWindSeekerIntake(row: EnrichedIntake) {
  return row.intake.buyer_id === windSeekerBuyerId || row.intake.submitted_by === windSeekerBuyerId || windSeekerSourceTypeSet.has(row.intake.source_type) || row.intake.supply_program === "wind_seeker";
}

export function GlobalBuyerCenter() {
  const [rows, setRows] = useState<EnrichedIntake[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/admin/object-intakes?status=all&buyer_id=${encodeURIComponent(windSeekerBuyerId)}&submitted_by=${encodeURIComponent(windSeekerBuyerId)}`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        setNote(data.error || "Unable to load Wind Seeker data.");
        return;
      }
      setRows((data.rows || []).filter(isWindSeekerIntake));
    }
    void load();
  }, []);

  const stats = useMemo(() => {
    const review = rows.filter((row) => row.intake.status === "review_pending" || row.review?.status === "pending").length;
    const revision = rows.filter((row) => row.intake.status === "revision_required" || row.review?.status === "revision_required").length;
    const published = rows.filter((row) => row.object).length;
    return [
      ["Submitted", rows.length.toString(), "Total objects in intake"],
      ["In Review", review.toString(), "Waiting for Dohara review"],
      ["Needs Fix", revision.toString(), "Requires buyer action"],
      ["Published", published.toString(), "Live object records"],
    ] as const;
  }, [rows]);

  const recent = rows.slice(0, 3);

  return (
    <WindSeekerFrame active="dashboard">
      <section className="grid gap-6 lg:grid-cols-[0.58fr_0.42fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">Wind Seeker Center</p>
          <h1 className="mt-4 font-[var(--font-display-serif)] text-5xl font-normal leading-tight text-[#123A68]">Discover. Upload. Review.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5E738A]">
            This is the buyer-side command center for new goods intake. Keep product discovery, media capture, AI drafts,
            review feedback, and product status in one place.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/wind-seeker/upload?step=capture" className="rounded-full bg-[#123A68] px-6 py-3 text-sm font-semibold text-white">Upload object</Link>
            <Link href="/wind-seeker/products" className="rounded-full border border-[#C9A45C] bg-white px-6 py-3 text-sm font-semibold text-[#123A68]">My products</Link>
          </div>
        </div>
        <WindSeekerCard className="p-6">
          <div className="flex items-center gap-5">
            <div className="relative h-24 w-24 shrink-0">
              <Image src={windSeekerIcon} alt="" fill priority className="object-contain" sizes="96px" />
            </div>
            <div>
              <p className="text-sm text-[#5E738A]">Current level</p>
              <h2 className="mt-1 text-2xl font-semibold text-[#123A68]">LV.2 Verified Seeker</h2>
              <p className="mt-3 text-sm leading-6 text-[#5E738A]">Complete real media, source notes, and review-ready details to unlock higher limits.</p>
            </div>
          </div>
          <div className="mt-5 h-2 rounded-full bg-[#EAF3FE]"><div className="h-full w-[62%] rounded-full bg-[#C9A45C]" /></div>
        </WindSeekerCard>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([label, value, helper]) => (
          <WindSeekerCard key={label} className="p-5">
            <p className="text-sm text-[#5E738A]">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-[#123A68]">{value}</p>
            <p className="mt-2 text-xs leading-5 text-[#5E738A]">{helper}</p>
          </WindSeekerCard>
        ))}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.45fr_0.55fr]">
        <WindSeekerCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">New seeker tasks</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#123A68]">Today checklist</h2>
            </div>
            <Link href="/wind-seeker/upload?step=capture" className="rounded-full bg-[#123A68] px-4 py-2 text-sm font-semibold text-white">Start</Link>
          </div>
          <div className="mt-5 grid gap-3">
            {["Upload one clear main photo or video", "Accept or edit AI generated draft", "Add price, inventory, location, and logistics", "Submit for review"].map((task, index) => (
              <div key={task} className="flex gap-3 rounded-2xl bg-[#F3F7FB] p-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#C9A45C] text-xs font-semibold text-white">{index + 1}</span>
                <p className="text-sm font-medium leading-6 text-[#223247]">{task}</p>
              </div>
            ))}
          </div>
        </WindSeekerCard>

        <WindSeekerCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">Recent product intake</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#123A68]">Latest objects</h2>
            </div>
            <Link href="/wind-seeker/products" className="text-sm font-semibold text-[#123A68]">View all</Link>
          </div>
          {note ? <p className="mt-4 rounded-2xl bg-[#F8E8E4] p-4 text-sm text-[#B84537]">{note}</p> : null}
          <div className="mt-5 grid gap-3">
            {recent.map((row) => (
              <Link key={row.intake.id} href={`/wind-seeker/products/detail?intakeId=${encodeURIComponent(row.intake.id)}`} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 rounded-2xl border border-[#D9E2EC] bg-white p-3">
                <span className="relative h-16 overflow-hidden rounded-xl bg-[#EAF3FE]">
                  <Image src={row.thumbnail_url} alt="" fill unoptimized className="object-cover" sizes="72px" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-[#123A68]">{row.draft?.draft_title || row.intake.original_title || row.intake.intake_no}</span>
                  <span className="mt-1 block text-xs text-[#5E738A]">{row.intake.intake_no}</span>
                </span>
                <WindSeekerStatusPill status={row.intake.status} />
              </Link>
            ))}
            {recent.length === 0 ? <p className="rounded-2xl bg-[#F3F7FB] p-4 text-sm text-[#5E738A]">No product intake yet. Start with one object upload.</p> : null}
          </div>
        </WindSeekerCard>
      </section>
    </WindSeekerFrame>
  );
}

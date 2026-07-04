"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { EnrichedIntake } from "@/components/object-intake/ObjectIntakeTypes";
import { windkeepMemberSupplySourceTypes, windSeekerSourceTypes } from "@/config/object-intake-source-types";
import { WindSeekerCard, WindSeekerFrame, WindSeekerStatusPill, windSeekerIcon } from "@/components/wind-seeker/WindSeekerShell";

const windSeekerSourceTypeSet = new Set<string>(windSeekerSourceTypes);
const windkeepMemberSupplySourceTypeSet = new Set<string>(windkeepMemberSupplySourceTypes);
const windSeekerBuyerId = "wind-seeker";
const tabs = ["all", "review_pending", "revision_required", "approved", "published"] as const;

function isWindSeekerIntake(row: EnrichedIntake) {
  const sourceType = row.intake.source_type;
  if (windkeepMemberSupplySourceTypeSet.has(sourceType)) return false;
  if (row.intake.commerce_channel === "windkeep_secondhand") return false;
  if (row.intake.supply_program === "windkeep" || row.intake.entry_surface === "member_center") return false;
  return row.intake.buyer_id === windSeekerBuyerId || row.intake.submitted_by === windSeekerBuyerId || windSeekerSourceTypeSet.has(sourceType) || row.intake.supply_program === "wind_seeker";
}

export function WindSeekerProductsClient() {
  const [rows, setRows] = useState<EnrichedIntake[]>([]);
  const [note, setNote] = useState("");
  const [tab, setTab] = useState<(typeof tabs)[number]>("all");

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/admin/object-intakes?status=all&buyer_id=${encodeURIComponent(windSeekerBuyerId)}&submitted_by=${encodeURIComponent(windSeekerBuyerId)}`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        setNote(data.error || "Unable to read products.");
        return;
      }
      setRows((data.rows || []).filter(isWindSeekerIntake));
    }
    void load();
  }, []);

  const filtered = useMemo(() => {
    if (tab === "all") return rows;
    if (tab === "published") return rows.filter((row) => row.object);
    return rows.filter((row) => row.intake.status === tab || row.review?.status === tab);
  }, [rows, tab]);

  return (
    <WindSeekerFrame active="products">
      <section className="grid gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">My Products</p>
            <h1 className="mt-4 font-[var(--font-display-serif)] text-4xl font-normal text-[#123A68] sm:text-5xl">Submission status</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5E738A]">Track uploaded objects, review feedback, Air Engine outputs, and published object IDs.</p>
          </div>
          <Link href="/wind-seeker/upload?step=capture" className="rounded-full bg-[#123A68] px-6 py-3 text-sm font-semibold text-white">Upload object</Link>
        </header>

        <WindSeekerCard className="p-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((item) => (
              <button key={item} type="button" onClick={() => setTab(item)} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === item ? "bg-[#123A68] text-white" : "bg-[#F3F7FB] text-[#5E738A]"}`}>
                {item}
              </button>
            ))}
          </div>
        </WindSeekerCard>

        {note ? <p className="rounded-2xl border border-[#D9E2EC] bg-white p-4 text-sm text-[#B84537]">{note}</p> : null}

        <div className="grid gap-4">
          {filtered.map((row) => {
            const title = row.draft?.draft_title || row.intake.original_title || row.intake.intake_no;
            const image = row.thumbnail_url || windSeekerIcon;
            return (
              <article key={row.intake.id} className="grid gap-4 rounded-[18px] border border-[#D9E2EC] bg-white p-4 shadow-[0_18px_48px_rgba(18,58,104,0.06)] md:grid-cols-[8rem_1fr_auto] md:items-center">
                <div className="relative h-32 overflow-hidden rounded-2xl bg-[#EAF3FE]">
                  <Image src={image} alt="" fill unoptimized className="object-cover" sizes="128px" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <WindSeekerStatusPill status={row.object ? "published" : row.intake.status} />
                    <span className="text-xs text-[#5E738A]">Air Engine: {row.intake.air_engine_status || "not_started"}</span>
                  </div>
                  <h2 className="mt-3 truncate text-2xl font-semibold text-[#123A68]">{title}</h2>
                  <p className="mt-2 text-sm text-[#5E738A]">{row.intake.intake_no} / {row.review?.status || "not in review"} / {row.object?.object_id || "not published"}</p>
                  <p className="mt-2 text-sm text-[#5E738A]">{row.draft?.price_suggestion || row.intake.original_price || "Price pending"}</p>
                </div>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  <Link href={`/wind-seeker/products/detail?intakeId=${encodeURIComponent(row.intake.id)}`} className="rounded-full border border-[#C9A45C] px-4 py-2 text-sm font-semibold text-[#123A68]">Open</Link>
                  {row.object ? <Link href={`/objects/${row.object.object_id}`} className="rounded-full bg-[#123A68] px-4 py-2 text-sm font-semibold text-white">Live object</Link> : null}
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <WindSeekerCard className="p-8 text-center">
            <p className="text-lg font-semibold text-[#123A68]">No objects in this status.</p>
            <p className="mt-2 text-sm text-[#5E738A]">Start one upload and it will appear here after intake creation.</p>
          </WindSeekerCard>
        ) : null}
      </section>
    </WindSeekerFrame>
  );
}

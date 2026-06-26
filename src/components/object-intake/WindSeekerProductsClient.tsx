"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { EnrichedIntake } from "@/components/object-intake/ObjectIntakeTypes";
import { windkeepMemberSupplySourceTypes, windSeekerSourceTypes } from "@/config/object-intake-source-types";

const windSeekerSourceTypeSet = new Set<string>(windSeekerSourceTypes);
const windkeepMemberSupplySourceTypeSet = new Set<string>(windkeepMemberSupplySourceTypes);

function isWindSeekerIntake(row: EnrichedIntake) {
  const sourceType = row.intake.source_type;
  if (windkeepMemberSupplySourceTypeSet.has(sourceType)) return false;
  if (row.intake.supply_program === "windkeep" || row.intake.entry_surface === "member_center") return false;

  return windSeekerSourceTypeSet.has(sourceType) || row.intake.supply_program === "wind_seeker" || row.intake.submitted_by === "wind-seeker";
}

export function WindSeekerProductsClient() {
  const [rows, setRows] = useState<EnrichedIntake[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/admin/object-intakes?status=all", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        setNote(data.error || "Unable to read products.");
        return;
      }
      setRows((data.rows || []).filter(isWindSeekerIntake));
    }
    void load();
  }, []);

  return (
    <main className="min-h-dvh bg-[#F5F6F8] px-5 py-8 text-[#2D333A]">
      <section className="mx-auto grid w-full max-w-5xl gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#D9DCE0] pb-6">
          <div>
            <a href="/wind-seeker" className="text-sm text-[#6B7280]">Wind Seeker</a>
            <h1 className="mt-3 text-4xl font-semibold">My Objects</h1>
            <p className="mt-3 text-sm leading-7 text-[#6B7280]">这里显示买手通过同一条 intake pipeline 提交的物件。</p>
          </div>
          <a href="/wind-seeker/upload" className="rounded-xl border border-[#947A66] bg-[#947A66] px-4 py-3 text-sm text-white">Upload Object</a>
        </header>

        {note ? <p className="rounded-xl border border-[#D9DCE0] bg-white p-4 text-sm text-[#6B7280]">{note}</p> : null}
        <div className="grid gap-4 md:grid-cols-2">
          {rows.map((row) => (
            <article key={row.intake.id} className="grid grid-cols-[7rem_1fr] gap-4 rounded-2xl border border-[#D9DCE0] bg-white p-4">
              <div className="relative h-28 overflow-hidden rounded-xl bg-[#EBEDEF]">
                <Image src={row.thumbnail_url} alt="" fill unoptimized className="object-cover" sizes="8rem" />
              </div>
              <div>
                <p className="text-xs text-[#6B7280]">{row.intake.intake_no} / {row.intake.status}</p>
                <h2 className="mt-2 text-xl font-semibold">{row.draft?.draft_title || row.intake.original_title}</h2>
                <p className="mt-2 text-sm text-[#6B7280]">{row.draft?.price_suggestion || row.intake.original_price}</p>
                <a href={`/wind-seeker/products/detail?intakeId=${encodeURIComponent(row.intake.id)}`} className="mt-3 inline-flex text-sm text-[#947A66]">Open intake</a>
                {row.object ? <a href={`/objects/${row.object.object_id}`} className="ml-4 mt-3 inline-flex text-sm text-[#947A66]">Open {row.object.object_id}</a> : null}
              </div>
            </article>
          ))}
        </div>
        {rows.length === 0 ? <p className="rounded-xl border border-[#D9DCE0] bg-white p-5 text-sm text-[#6B7280]">No buyer objects yet.</p> : null}
      </section>
    </main>
  );
}

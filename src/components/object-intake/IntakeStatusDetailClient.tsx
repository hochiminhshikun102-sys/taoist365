"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { EnrichedIntake } from "@/components/object-intake/ObjectIntakeTypes";
import { windkeepMemberSupplySourceTypes, windSeekerSourceTypes } from "@/config/object-intake-source-types";

type DetailMode = "wind_seeker" | "windkeep";

const windSeekerSourceTypeSet = new Set<string>(windSeekerSourceTypes);
const windkeepMemberSupplySourceTypeSet = new Set<string>(windkeepMemberSupplySourceTypes);

function isAllowed(row: EnrichedIntake, mode: DetailMode) {
  if (mode === "windkeep") {
    return row.intake.commerce_channel === "windkeep_secondhand" || row.intake.supply_program === "windkeep" || row.intake.entry_surface === "member_center" || windkeepMemberSupplySourceTypeSet.has(row.intake.source_type);
  }

  if (row.intake.commerce_channel === "windkeep_secondhand" || row.intake.supply_program === "windkeep" || row.intake.entry_surface === "member_center" || windkeepMemberSupplySourceTypeSet.has(row.intake.source_type)) return false;
  return row.intake.supply_program === "wind_seeker" || windSeekerSourceTypeSet.has(row.intake.source_type) || row.intake.submitted_by === "wind-seeker";
}

export function IntakeStatusDetailClient({ intakeId, mode }: Readonly<{ intakeId: string; mode: DetailMode }>) {
  const [row, setRow] = useState<EnrichedIntake | null>(null);
  const [note, setNote] = useState("Loading intake...");

  const backHref = mode === "windkeep" ? "/account/windkeep-supply" : "/wind-seeker/products";
  const title = mode === "windkeep" ? "Windkeep Supply Status" : "Wind Seeker Object Status";

  useEffect(() => {
    async function load() {
      if (!intakeId) {
        setNote("Missing intakeId.");
        return;
      }
      const response = await fetch(`/api/admin/object-intakes?intake_id=${encodeURIComponent(intakeId)}`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        setNote(data.error || "Unable to load intake.");
        return;
      }
      if (!isAllowed(data, mode)) {
        setNote(mode === "windkeep" ? "This is not a Windkeep secondhand intake." : "This is not a Wind Seeker new-goods intake.");
        return;
      }
      setRow(data);
      setNote("");
    }
    void load();
  }, [intakeId, mode]);

  const titleText = useMemo(() => row?.draft?.draft_title || row?.intake.original_title || intakeId, [intakeId, row]);

  return (
    <main className="min-h-dvh bg-[#F5F6F8] px-5 py-8 text-[#2D333A]">
      <section className="mx-auto grid w-full max-w-6xl gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#D9DCE0] pb-6">
          <div>
            <Link href={backHref} className="text-sm text-[#6B7280]">Back</Link>
            <p className="mt-5 text-sm text-[#6B7280]">{title}</p>
            <h1 className="mt-2 text-4xl font-semibold">{titleText}</h1>
          </div>
          {row?.object ? <Link href={`/objects/${row.object.object_id}`} className="rounded-xl border border-[#2D333A] px-4 py-3 text-sm">Open {row.object.object_id}</Link> : null}
        </header>

        {note ? <p className="rounded-2xl border border-[#D9DCE0] bg-white p-5 text-sm text-[#6B7280]">{note}</p> : null}

        {row ? (
          <article className="grid gap-5 lg:grid-cols-[0.42fr_0.58fr]">
            <section className="rounded-2xl border border-[#D9DCE0] bg-white p-5">
              <div className="relative min-h-80 overflow-hidden rounded-2xl bg-[#EBEDEF]">
                <Image src={row.thumbnail_url} alt="" fill unoptimized className="object-cover" sizes="34rem" />
              </div>
              <div className="mt-4 grid gap-2 text-sm leading-7 text-[#6B7280]">
                <p>{row.intake.intake_no} / {row.intake.source_type}</p>
                <p>{row.intake.entry_surface || "legacy"} / {row.intake.supply_program || "legacy"}</p>
                <p>{row.intake.commerce_channel || "commerce_new"} / {row.intake.goods_condition || "new"}</p>
                <p>Status: {row.intake.status}</p>
                <p>Air Engine: {row.intake.air_engine_status}</p>
              </div>
            </section>

            <section className="grid content-start gap-4">
              <div className="rounded-2xl border border-[#D9DCE0] bg-white p-5">
                <p className="text-sm font-semibold">Draft</p>
                <p className="mt-3 text-sm leading-7 text-[#6B7280]">{row.draft?.draft_description || row.intake.original_description || "No draft yet."}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {row.draft?.tags?.map((tag) => <span key={tag} className="rounded-full bg-[#F5F6F8] px-3 py-1 text-xs text-[#6B7280]">{tag}</span>)}
                </div>
              </div>

              <div className="rounded-2xl border border-[#D9DCE0] bg-white p-5">
                <p className="text-sm font-semibold">Review / Publish State</p>
                <div className="mt-3 grid gap-2 text-sm leading-7 text-[#6B7280]">
                  <p>Review: {row.review?.status || "not in queue"}</p>
                  <p>Published object: {row.object?.object_id || "not published"}</p>
                  <p>Media files: {row.media.length}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#D9DCE0] bg-white p-5">
                <p className="text-sm font-semibold">Audit</p>
                <div className="mt-3 grid gap-2">
                  {row.audit_logs.slice(0, 6).map((log) => <p key={log.id} className="rounded-xl bg-[#F5F6F8] p-3 text-xs leading-5 text-[#6B7280]">{log.created_at} / {log.action} / {log.note}</p>)}
                  {row.audit_logs.length === 0 ? <p className="text-sm text-[#6B7280]">No audit logs yet.</p> : null}
                </div>
              </div>
            </section>
          </article>
        ) : null}
      </section>
    </main>
  );
}

export function IntakeStatusDetailFromQuery({ mode }: Readonly<{ mode: DetailMode }>) {
  const searchParams = useSearchParams();
  return <IntakeStatusDetailClient intakeId={searchParams.get("intakeId") || ""} mode={mode} />;
}

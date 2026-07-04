"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { EnrichedIntake } from "@/components/object-intake/ObjectIntakeTypes";
import { windkeepMemberSupplySourceTypes, windSeekerSourceTypes } from "@/config/object-intake-source-types";
import { WindSeekerCard, WindSeekerFrame, WindSeekerStatusPill, windSeekerIcon } from "@/components/wind-seeker/WindSeekerShell";

type DetailMode = "wind_seeker" | "windkeep";

const windSeekerSourceTypeSet = new Set<string>(windSeekerSourceTypes);
const windkeepMemberSupplySourceTypeSet = new Set<string>(windkeepMemberSupplySourceTypes);

function isAllowed(row: EnrichedIntake, mode: DetailMode) {
  if (mode === "windkeep") {
    return row.intake.commerce_channel === "windkeep_secondhand" || row.intake.supply_program === "windkeep" || row.intake.entry_surface === "member_center" || windkeepMemberSupplySourceTypeSet.has(row.intake.source_type);
  }

  if (row.intake.commerce_channel === "windkeep_secondhand" || row.intake.supply_program === "windkeep" || row.intake.entry_surface === "member_center" || windkeepMemberSupplySourceTypeSet.has(row.intake.source_type)) return false;
  return row.intake.supply_program === "wind_seeker" || windSeekerSourceTypeSet.has(row.intake.source_type) || row.intake.submitted_by === "wind-seeker" || row.intake.buyer_id === "wind-seeker";
}

export function IntakeStatusDetailClient({ intakeId, mode }: Readonly<{ intakeId: string; mode: DetailMode }>) {
  const [row, setRow] = useState<EnrichedIntake | null>(null);
  const [note, setNote] = useState("Loading intake...");

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
        setNote(mode === "windkeep" ? "This is not a Windkeep secondhand intake." : "This is not a Wind Seeker object intake.");
        return;
      }
      setRow(data);
      setNote("");
    }
    void load();
  }, [intakeId, mode]);

  const titleText = useMemo(() => row?.draft?.draft_title || row?.intake.original_title || intakeId, [intakeId, row]);
  const image = row?.thumbnail_url || windSeekerIcon;

  if (mode === "windkeep") {
    return (
      <main className="min-h-dvh bg-[#F5F6F8] px-5 py-8 text-[#2D333A]">
        <section className="mx-auto grid w-full max-w-5xl gap-6">
          <Link href="/account/windkeep-supply" className="text-sm text-[#6B7280]">Back</Link>
          {note ? <p className="rounded-2xl border border-[#D9DCE0] bg-white p-5 text-sm text-[#6B7280]">{note}</p> : null}
          {row ? <DetailBody row={row} titleText={titleText} image={image} windkeep /> : null}
        </section>
      </main>
    );
  }

  return (
    <WindSeekerFrame active="products">
      <section className="grid gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link href="/wind-seeker/products" className="text-sm font-semibold text-[#5E738A]">Back to products</Link>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">Product detail feedback</p>
            <h1 className="mt-4 font-[var(--font-display-serif)] text-4xl font-normal text-[#123A68] sm:text-5xl">{titleText}</h1>
          </div>
          {row?.object ? <Link href={`/objects/${row.object.object_id}`} className="rounded-full bg-[#123A68] px-5 py-3 text-sm font-semibold text-white">Open {row.object.object_id}</Link> : null}
        </header>
        {note ? <p className="rounded-2xl border border-[#D9E2EC] bg-white p-5 text-sm text-[#5E738A]">{note}</p> : null}
        {row ? <DetailBody row={row} titleText={titleText} image={image} /> : null}
      </section>
    </WindSeekerFrame>
  );
}

function DetailBody({ row, titleText, image, windkeep = false }: Readonly<{ row: EnrichedIntake; titleText: string; image: string; windkeep?: boolean }>) {
  const [reviewMessage, setReviewMessage] = useState("");
  const [actionLog, setActionLog] = useState("Ready");
  const requiresRevision = row.review?.status === "revision_required" || row.intake.status === "revision_required";
  const whyReturned = row.draft?.risk_notes || row.intake.source_note || (requiresRevision ? "Reviewer requested additional confirmation before publishing." : "No return reason recorded.");
  const readyOutputs = row.air_engine_job?.ready_outputs || [];
  const missingOutputs = row.air_engine_job?.missing_outputs || [];
  const blockedOutputs = row.air_engine_job?.blocked_outputs || [];
  const mediaByType = row.media.reduce<Record<string, string>>((acc, media) => {
    acc[media.media_type] = media.status || "uploaded";
    return acc;
  }, {});
  const outputSlots = ["main", "detail", "scene", "pc", "mobile", "social", "motion"];

  return (
    <article className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
      <WindSeekerCard className="p-5">
        <div className="relative min-h-80 overflow-hidden rounded-[24px] bg-[#EAF3FE]">
          <Image src={image} alt="" fill unoptimized className="object-cover" sizes="480px" />
        </div>
        <div className="mt-5 grid gap-3 text-sm text-[#5E738A]">
          <p><strong className="text-[#123A68]">Intake:</strong> {row.intake.intake_no}</p>
          <p><strong className="text-[#123A68]">Source:</strong> {row.intake.source_type} / {row.intake.entry_surface || "wind_seeker"}</p>
          <p><strong className="text-[#123A68]">Platform:</strong> {row.intake.source_platform || "manual"} / {row.intake.source_snapshot?.source_item_id || "no source id"}</p>
          <p><strong className="text-[#123A68]">Air Engine:</strong> {row.intake.air_engine_status || "not_started"}</p>
          <p><strong className="text-[#123A68]">Rights:</strong> {row.intake.media_rights_status || "owned_or_original"} / rebuild: {row.intake.media_transform_required ? "required" : "not required"}</p>
          <p><strong className="text-[#123A68]">Media files:</strong> {row.media.length}</p>
          {row.intake.source_url ? <a href={row.intake.source_url} target="_blank" rel="noreferrer" className="break-all text-[#C9A45C]">Source URL: {row.intake.source_url}</a> : null}
        </div>
      </WindSeekerCard>

      <div className="grid content-start gap-4">
        <WindSeekerCard className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">Identity</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#123A68]">{titleText}</h2>
            </div>
            <WindSeekerStatusPill status={row.object ? "published" : row.intake.status} />
          </div>
          <p className="mt-4 text-sm leading-7 text-[#5E738A]">{row.draft?.draft_description || row.intake.original_description || "No draft description yet."}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {row.draft?.tags?.map((tag) => <span key={tag} className="rounded-full bg-[#F3F7FB] px-3 py-1 text-xs text-[#5E738A]">{tag}</span>)}
          </div>
        </WindSeekerCard>

        <WindSeekerCard className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">Review feedback</p>
          <div className="mt-4 grid gap-3 text-sm text-[#5E738A]">
            <p>Review status: <strong className="text-[#123A68]">{row.review?.status || "not in queue"}</strong></p>
            <p>Published object: <strong className="text-[#123A68]">{row.object?.object_id || "not published"}</strong></p>
            <p>Next action: <strong className="text-[#123A68]">{row.review?.status === "revision_required" ? "Fix and resubmit" : row.object ? "Live object available" : "Wait for review"}</strong></p>
          </div>
          <div className="mt-5 rounded-2xl bg-[#F3F7FB] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B84537]">Why returned</p>
            <p className="mt-2 text-sm leading-6 text-[#5E738A]">{whyReturned}</p>
          </div>
          {(row.intake.media_rights_status === "reference_only" || row.intake.media_transform_required) ? (
            <div className="mt-4 rounded-2xl border border-[#EDC7BE] bg-[#F8E8E4] p-4 text-sm leading-6 text-[#B84537]">
              This source is reference-only. Upload owned media or wait for Air Engine rebuild before Dohara can publish it.
            </div>
          ) : null}
          {!windkeep ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Link href={`/wind-seeker/upload?step=details&intakeId=${encodeURIComponent(row.intake.id)}`} className="rounded-full bg-[#123A68] px-5 py-3 text-center text-sm font-semibold text-white">
                Fix and resubmit
              </Link>
              <button type="button" onClick={() => setActionLog("Reviewer message drafted locally. Backend message thread is a P1 connection.")} className="rounded-full border border-[#C9A45C] bg-white px-5 py-3 text-sm font-semibold text-[#123A68]">
                Message Review
              </button>
              <Link href={`/wind-seeker/upload?step=capture&intakeId=${encodeURIComponent(row.intake.id)}`} className="rounded-full border border-[#D9E2EC] bg-white px-5 py-3 text-center text-sm font-semibold text-[#123A68]">
                Upload New Photo
              </Link>
            </div>
          ) : null}
          {!windkeep ? (
            <label className="mt-5 grid gap-2 text-sm">
              <span className="font-semibold text-[#123A68]">Message to review</span>
              <textarea
                value={reviewMessage}
                onChange={(event) => setReviewMessage(event.target.value)}
                placeholder="Ask about the review note or explain your revision."
                className="min-h-24 rounded-2xl border border-[#D9E2EC] bg-white px-4 py-3 outline-none focus:border-[#C9A45C]"
              />
            </label>
          ) : null}
          <p className="mt-3 rounded-2xl bg-[#EAF3FE] p-3 text-xs text-[#5E738A]">Action log: {actionLog}</p>
        </WindSeekerCard>

        <WindSeekerCard className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">Air Engine outputs</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {outputSlots.map((slot) => {
              const state = readyOutputs.includes(slot) ? "ready" : blockedOutputs.includes(slot) ? "blocked" : missingOutputs.includes(slot) ? "missing" : mediaByType[slot] || "not_started";
              const tone = state === "ready" || state === "air_engine_uploaded" ? "border-[#BFDCCD] bg-[#E1F0E9] text-[#2E8B68]" : state === "blocked" || state === "failed" ? "border-[#EDC7BE] bg-[#F8E8E4] text-[#B84537]" : "border-[#D9E2EC] bg-[#F3F7FB] text-[#5E738A]";
              return (
                <div key={slot} className={`rounded-2xl border p-4 ${tone}`}>
                  <p className="text-sm font-semibold">{slot}</p>
                  <p className="mt-1 text-xs">{state}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs leading-6 text-[#5E738A]">Next Air Engine action: {row.air_engine_job?.next_action || "No queued action recorded."}</p>
        </WindSeekerCard>

        <WindSeekerCard className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">Timeline</p>
          <div className="mt-4 grid gap-3">
            {row.audit_logs.slice(0, 8).map((log) => <p key={log.id} className="rounded-2xl bg-[#F3F7FB] p-3 text-xs leading-5 text-[#5E738A]">{log.created_at} / {log.action} / {log.note}</p>)}
            {row.audit_logs.length === 0 ? <p className="text-sm text-[#5E738A]">No timeline yet.</p> : null}
          </div>
        </WindSeekerCard>
      </div>
    </article>
  );
}

export function IntakeStatusDetailFromQuery({ mode }: Readonly<{ mode: DetailMode }>) {
  const searchParams = useSearchParams();
  return <IntakeStatusDetailClient intakeId={searchParams.get("intakeId") || ""} mode={mode} />;
}

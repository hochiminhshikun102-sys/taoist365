"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { EnrichedIntake } from "@/components/object-intake/ObjectIntakeTypes";

const statuses = ["all", "review_pending", "approved", "revision_required", "rejected", "published"] as const;

export function ObjectIntakeAdminQueue() {
  const [rows, setRows] = useState<EnrichedIntake[]>([]);
  const [activeId, setActiveId] = useState("");
  const [status, setStatus] = useState<(typeof statuses)[number]>("review_pending");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const active = useMemo(() => rows.find((row) => row.intake.id === activeId) ?? rows[0] ?? null, [activeId, rows]);

  async function loadRows(nextStatus = status) {
    setNote("");
    const response = await fetch(`/api/admin/object-intakes?status=${nextStatus}`, { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) {
      setNote(data.error || "Unable to read review queue.");
      return;
    }
    setRows(data.rows || []);
    if (!activeId && data.rows?.[0]) setActiveId(data.rows[0].intake.id);
  }

  useEffect(() => {
    void loadRows(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function review(action: "approve" | "reject" | "revision_required") {
    if (!active) return;
    setBusy(true);
    const response = await fetch(`/api/admin/object-intakes/${active.intake.id}/review`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action, review_notes: note || `Admin action: ${action}`, risk_level: "low" }),
    });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) {
      setNote(data.error || "Review action failed.");
      return;
    }
    setNote(`Review saved: ${data.status}`);
    await loadRows(status);
  }

  async function publish() {
    if (!active) return;
    setBusy(true);
    const response = await fetch(`/api/admin/object-intakes/${active.intake.id}/publish`, { method: "POST" });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) {
      setNote(data.error || "Publish failed.");
      return;
    }
    setNote(`Published ${data.object_id}. Path: ${data.path}`);
    setStatus("published");
  }

  return (
    <main className="min-h-dvh bg-[#F5F6F8] px-5 py-8 text-[#2D333A]">
      <section className="mx-auto grid w-full max-w-7xl gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#D9DCE0] pb-6">
          <div>
            <p className="text-sm text-[#6B7280]">VL Object Intake Pipeline</p>
            <h1 className="mt-2 text-4xl font-semibold">发布审核</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280]">统一治理全球买手、后台、老板和链接导入的物件。</p>
          </div>
          <a href="/admin/product-intake" className="rounded-xl border border-[#947A66] bg-[#947A66] px-4 py-3 text-sm text-white">宝贝入库</a>
        </header>

        <div className="flex flex-wrap gap-2">
          {statuses.map((item) => (
            <button key={item} type="button" onClick={() => setStatus(item)} className={`rounded-full border px-4 py-2 text-sm ${status === item ? "border-[#2D333A] bg-[#2D333A] text-white" : "border-[#D9DCE0] bg-white"}`}>
              {item}
            </button>
          ))}
        </div>

        <section className="grid gap-5 lg:grid-cols-[24rem_minmax(0,1fr)]">
          <div className="grid content-start gap-3">
            {rows.map((row) => (
              <button key={row.intake.id} type="button" onClick={() => setActiveId(row.intake.id)} className={`grid grid-cols-[4.5rem_1fr] gap-3 rounded-2xl border p-3 text-left ${active?.intake.id === row.intake.id ? "border-[#947A66] bg-[#F3ECE2]" : "border-[#D9DCE0] bg-white"}`}>
                <div className="relative h-20 overflow-hidden rounded-xl bg-[#EBEDEF]">
                  <Image src={row.thumbnail_url} alt="" fill unoptimized className="object-cover" sizes="5rem" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{row.intake.original_title || row.draft?.draft_title || row.intake.intake_no}</p>
                  <p className="mt-1 text-xs text-[#6B7280]">{row.intake.intake_no}</p>
                  <p className="mt-2 rounded-full bg-white px-2 py-1 text-xs text-[#6B7280]">{row.intake.status}</p>
                </div>
              </button>
            ))}
            {rows.length === 0 ? <div className="rounded-2xl border border-[#D9DCE0] bg-white p-5 text-sm text-[#6B7280]">No rows for this status.</div> : null}
          </div>

          {active ? (
            <article className="rounded-2xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(45,51,58,0.08)]">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#D9DCE0] pb-5">
                <div>
                  <p className="text-sm text-[#6B7280]">{active.intake.intake_no} / {active.intake.source_type}</p>
                  <h2 className="mt-2 text-3xl font-semibold">{active.draft?.draft_title || active.intake.original_title}</h2>
                  <p className="mt-2 text-sm text-[#6B7280]">Air Engine: {active.intake.air_engine_status} / Status: {active.intake.status}</p>
                </div>
                {active.object ? <a href={`/objects/${active.object.object_id}`} className="rounded-xl border border-[#2D333A] px-4 py-3 text-sm">Open {active.object.object_id}</a> : null}
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[0.44fr_0.56fr]">
                <div>
                  <div className="relative min-h-80 overflow-hidden rounded-2xl bg-[#EBEDEF]">
                    <Image src={active.thumbnail_url} alt="" fill unoptimized className="object-cover" sizes="36rem" />
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-[#6B7280]">
                    <p>Source: {active.intake.source_platform} {active.intake.source_url ? `/ ${active.intake.source_url}` : ""}</p>
                    <p>Price: {active.intake.original_price || active.draft?.price_suggestion} {active.intake.currency}</p>
                    <p>Inventory: {active.intake.inventory} / Location: {active.intake.location || active.intake.country || "unset"}</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <section className="rounded-2xl border border-[#D9DCE0] bg-[#F5F6F8] p-4">
                    <p className="text-sm font-semibold">AI Draft</p>
                    <p className="mt-3 text-sm leading-7">{active.draft?.draft_description || "No AI draft yet."}</p>
                    <div className="mt-3 flex flex-wrap gap-2">{active.draft?.tags?.map((tag) => <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs text-[#6B7280]">{tag}</span>)}</div>
                    <p className="mt-3 text-xs leading-6 text-[#6B7280]">{active.draft?.geo_summary}</p>
                  </section>

                  <textarea value={note} onChange={(event) => setNote(event.target.value)} className="min-h-24 rounded-2xl border border-[#D9DCE0] p-4 text-sm leading-7" placeholder="Review note / 审核备注" />

                  <div className="flex flex-wrap gap-3">
                    <button disabled={busy} type="button" onClick={() => review("approve")} className="rounded-xl border border-[#3E6446] bg-[#3E6446] px-4 py-3 text-sm text-white disabled:opacity-50">Approve</button>
                    <button disabled={busy} type="button" onClick={() => review("revision_required")} className="rounded-xl border border-[#947A66] px-4 py-3 text-sm disabled:opacity-50">Revision Required</button>
                    <button disabled={busy} type="button" onClick={() => review("reject")} className="rounded-xl border border-[#D95550] px-4 py-3 text-sm text-[#D95550] disabled:opacity-50">Reject</button>
                    <button disabled={busy || active.intake.status !== "approved"} type="button" onClick={publish} className="rounded-xl border border-[#2D333A] bg-[#2D333A] px-4 py-3 text-sm text-white disabled:opacity-50">Publish Object ID</button>
                  </div>

                  <section className="rounded-2xl border border-[#D9DCE0] bg-[#F5F6F8] p-4">
                    <p className="text-sm font-semibold">Audit Logs</p>
                    <div className="mt-3 grid gap-2">{active.audit_logs.slice(0, 6).map((log) => <p key={log.id} className="rounded-xl bg-white p-3 text-xs leading-5 text-[#6B7280]">{log.created_at} / {log.action} / {log.note}</p>)}</div>
                  </section>
                </div>
              </div>
            </article>
          ) : null}
        </section>
      </section>
    </main>
  );
}

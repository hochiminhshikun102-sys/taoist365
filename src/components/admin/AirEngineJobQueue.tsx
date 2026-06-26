"use client";

import { useEffect, useMemo, useState } from "react";

type AirEngineJob = {
  id: string;
  intake_id: string;
  object_id?: string;
  job_type: string;
  source_platform: string;
  source_url: string;
  commerce_channel?: string;
  goods_condition?: string;
  status: "pending" | "processing" | "ready" | "failed";
  priority?: string;
  media_rights_status?: string;
  transform_required?: boolean;
  requested_outputs?: string[];
  notes?: string;
  created_at: string;
  updated_at?: string;
  completed_at?: string;
};

const statuses = ["all", "pending", "processing", "ready", "failed"] as const;
const mutableStatuses = ["pending", "processing", "ready", "failed"] as const;

export function AirEngineJobQueue() {
  const [rows, setRows] = useState<AirEngineJob[]>([]);
  const [status, setStatus] = useState<(typeof statuses)[number]>("pending");
  const [activeId, setActiveId] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>({});

  const active = useMemo(() => rows.find((row) => row.id === activeId) ?? rows[0] ?? null, [activeId, rows]);

  async function loadRows(nextStatus = status) {
    setNote("");
    const params = new URLSearchParams();
    params.set("status", nextStatus);
    const response = await fetch(`/api/admin/air-engine/jobs?${params.toString()}`, { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) {
      setNote(data.error || "Unable to read Air Engine jobs.");
      return;
    }
    const nextRows = data.rows || [];
    setRows(nextRows);
    setCounts(data.counts || {});
    const nextActive = nextRows.find((row: AirEngineJob) => row.id === activeId) ?? nextRows[0] ?? null;
    setActiveId(nextActive?.id || "");
  }

  useEffect(() => {
    void loadRows(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function updateJob(nextStatus: AirEngineJob["status"]) {
    if (!active) return;
    setBusy(true);
    setNote("");
    const response = await fetch(`/api/admin/air-engine/jobs/${active.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: nextStatus, note: `Air Engine job marked ${nextStatus} by OA.` }),
    });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) {
      setNote(data.error || "Unable to update Air Engine job.");
      return;
    }
    setNote(`Updated ${data.job.id} to ${data.job.status}.`);
    await loadRows(status);
  }

  return (
    <main className="min-h-dvh bg-[#F5F6F8] px-5 py-8 text-[#2D333A]">
      <section className="mx-auto grid w-full max-w-7xl gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#D9DCE0] pb-6">
          <div>
            <p className="text-sm text-[#6B7280]">Reverent Inquiry Air Engine</p>
            <h1 className="mt-2 text-4xl font-semibold">AI素材处理队列</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6B7280]">
              External marketplace images are source references. This queue tracks source fetch, rights checks, rebuild requirements, and RI media outputs before publication.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/admin/product-intake" className="rounded-xl border border-[#947A66] bg-[#947A66] px-4 py-3 text-white">宝贝入库</a>
            <a href="/admin/publish-review" className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 text-[#6B7280]">发布审核</a>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-5">
          {statuses.map((item) => (
            <button key={item} type="button" onClick={() => setStatus(item)} className={`rounded-2xl border p-4 text-left ${status === item ? "border-[#2D333A] bg-[#2D333A] text-white" : "border-[#D9DCE0] bg-white text-[#2D333A]"}`}>
              <p className="text-sm opacity-80">{item}</p>
              <p className="mt-2 text-3xl font-semibold">{counts[item] ?? (item === "all" ? counts.all : 0) ?? 0}</p>
            </button>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-[25rem_minmax(0,1fr)]">
          <div className="grid content-start gap-3">
            {rows.map((job) => (
              <button key={job.id} type="button" onClick={() => setActiveId(job.id)} className={`rounded-2xl border p-4 text-left ${active?.id === job.id ? "border-[#947A66] bg-[#F3ECE2]" : "border-[#D9DCE0] bg-white"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{job.source_platform} / {job.job_type}</p>
                    <p className="mt-1 truncate text-xs text-[#6B7280]">{job.intake_id}</p>
                  </div>
                  <span className="rounded-full bg-white px-2 py-1 text-xs text-[#6B7280]">{job.status}</span>
                </div>
                <p className="mt-3 line-clamp-2 text-xs leading-5 text-[#6B7280]">{job.source_url}</p>
              </button>
            ))}
            {rows.length === 0 ? <div className="rounded-2xl border border-[#D9DCE0] bg-white p-5 text-sm text-[#6B7280]">No Air Engine jobs for this status.</div> : null}
          </div>

          {active ? (
            <article className="rounded-2xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(45,51,58,0.08)]">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#D9DCE0] pb-5">
                <div>
                  <p className="text-sm text-[#6B7280]">{active.id} / {active.status}</p>
                  <h2 className="mt-2 text-3xl font-semibold">{active.source_platform} source rebuild</h2>
                  <p className="mt-2 text-sm text-[#6B7280]">{active.commerce_channel || "commerce_new"} / {active.goods_condition || "new"} / {active.priority || "normal"}</p>
                </div>
                <a href={`/admin/publish-review`} className="rounded-xl border border-[#2D333A] px-4 py-3 text-sm">Open Review</a>
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[0.48fr_0.52fr]">
                <section className="rounded-2xl border border-[#D9DCE0] bg-[#F5F6F8] p-4">
                  <p className="text-sm font-semibold">Source</p>
                  <div className="mt-3 grid gap-2 text-sm leading-7 text-[#6B7280]">
                    <p>Intake: {active.intake_id}</p>
                    <p>Platform: {active.source_platform}</p>
                    <a href={active.source_url} target="_blank" rel="noreferrer" className="break-all text-[#947A66]">{active.source_url}</a>
                    <p>Rights: {active.media_rights_status || "reference_only"}</p>
                    <p>Transform required: {active.transform_required ? "yes" : "no"}</p>
                  </div>
                </section>

                <section className="rounded-2xl border border-[#D9DCE0] bg-[#F5F6F8] p-4">
                  <p className="text-sm font-semibold">Requested Outputs</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(active.requested_outputs || []).map((item) => <span key={item} className="rounded-full bg-white px-3 py-1 text-xs text-[#6B7280]">{item}</span>)}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#6B7280]">{active.notes || "No notes."}</p>
                </section>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {mutableStatuses.map((item) => (
                  <button key={item} disabled={busy} type="button" onClick={() => updateJob(item)} className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 text-sm disabled:opacity-50">
                    Mark {item}
                  </button>
                ))}
              </div>
              {note ? <p className="mt-4 rounded-xl border border-[#D9DCE0] bg-[#F5F6F8] p-4 text-sm text-[#6B7280]">{note}</p> : null}
            </article>
          ) : null}
        </section>
      </section>
    </main>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";

type AirEngineOutput = {
  media_type: string;
  label: string;
  dimensions: string;
  ratio: string;
  publishable: boolean;
  required: boolean;
  status: "ready" | "missing" | "blocked_reference_only" | string;
  media_id?: string;
  source_media_id?: string;
  url?: string;
  note?: string;
};

type AirEngineJob = {
  id: string;
  intake_id: string;
  object_id?: string;
  title?: string;
  source_type?: string;
  entry_surface?: string;
  identity_scope?: string;
  supply_program?: string;
  buyer_id?: string;
  submitted_by?: string;
  professional_buyer_required?: boolean;
  review_id?: string;
  review_status?: string;
  intake_status?: string;
  job_type: string;
  source_platform: string;
  source_url: string;
  commerce_channel?: string;
  goods_condition?: string;
  status: "pending" | "processing" | "ready" | "failed";
  priority?: string;
  media_rights_status?: string;
  transform_required?: boolean;
  rights_review_required?: boolean;
  source_capture_status?: string;
  source_parse_status?: string;
  source_item_id?: string;
  canonical_source_url?: string;
  air_engine_policy?: string;
  requested_outputs?: string[];
  output_manifest?: AirEngineOutput[];
  ready_outputs?: string[];
  blocked_outputs?: string[];
  missing_outputs?: string[];
  ready_count?: number;
  blocked_count?: number;
  missing_count?: number;
  next_action?: string;
  generated_media_ids?: string[];
  notes?: string;
  created_at: string;
  updated_at?: string;
  completed_at?: string;
};

const statuses = ["all", "pending", "processing", "ready", "failed"] as const;
const mutableStatuses = ["pending", "processing", "ready", "failed"] as const;
const uploadOutputTypes = ["main", "detail", "scene", "pc", "mobile", "social", "motion"] as const;
const outputFilters = [
  { value: "", label: "All output states" },
  { value: "missing_main", label: "Missing main" },
  { value: "main_ready", label: "Main ready" },
] as const;

const fallbackOutputs: AirEngineOutput[] = [
  { media_type: "main", label: "White product image", dimensions: "2400x2400", ratio: "1:1", publishable: true, required: true, status: "missing" },
  { media_type: "detail", label: "Detail image", dimensions: "1800x2400", ratio: "3:4", publishable: true, required: false, status: "missing" },
  { media_type: "scene", label: "Room scene image", dimensions: "2400x1600", ratio: "3:2", publishable: true, required: false, status: "missing" },
  { media_type: "pc", label: "Desktop hero image", dimensions: "3200x1800", ratio: "16:9", publishable: true, required: false, status: "missing" },
  { media_type: "mobile", label: "Mobile atmosphere image", dimensions: "1600x2400", ratio: "2:3", publishable: true, required: false, status: "missing" },
  { media_type: "social", label: "Social image", dimensions: "2400x1600", ratio: "3:2", publishable: true, required: false, status: "missing" },
  { media_type: "motion", label: "Loop video", dimensions: "1920x1080", ratio: "16:9", publishable: true, required: false, status: "missing" },
];

export function AirEngineJobQueue() {
  const [rows, setRows] = useState<AirEngineJob[]>([]);
  const [status, setStatus] = useState<(typeof statuses)[number]>("pending");
  const [outputState, setOutputState] = useState("");
  const [sourcePlatform, setSourcePlatform] = useState("");
  const [sourceType, setSourceType] = useState("");
  const [activeId, setActiveId] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploadBusy, setUploadBusy] = useState(false);
  const [uploadType, setUploadType] = useState<(typeof uploadOutputTypes)[number]>("main");
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [facets, setFacets] = useState<{ source_platforms?: string[]; source_types?: string[] }>({});

  const active = useMemo(() => rows.find((row) => row.id === activeId) ?? rows[0] ?? null, [activeId, rows]);
  const activeOutputs = active?.output_manifest?.length ? active.output_manifest : fallbackOutputs;

  async function loadRows(nextStatus = status) {
    setNote("");
    const params = new URLSearchParams();
    params.set("status", nextStatus);
    if (outputState) params.set("output_state", outputState);
    if (sourcePlatform) params.set("source_platform", sourcePlatform);
    if (sourceType) params.set("source_type", sourceType);
    const response = await fetch(`/api/admin/air-engine/jobs?${params.toString()}`, { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) {
      setNote(data.error || "Unable to read Air Engine jobs.");
      return;
    }
    const nextRows = data.rows || [];
    setRows(nextRows);
    setCounts(data.counts || {});
    setFacets(data.facets || {});
    const nextActive = nextRows.find((row: AirEngineJob) => row.id === activeId) ?? nextRows[0] ?? null;
    setActiveId(nextActive?.id || "");
  }

  useEffect(() => {
    void loadRows(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, outputState, sourcePlatform, sourceType]);

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
    const readyCount = data.job.ready_outputs?.length ?? 0;
    const blockedCount = data.job.blocked_outputs?.length ?? 0;
    setNote(`Updated ${data.job.id} to ${data.job.status}. Ready outputs: ${readyCount}; blocked: ${blockedCount}.`);
    await loadRows(status);
  }

  async function uploadOutput() {
    if (!active || !uploadFiles || uploadFiles.length === 0) {
      setNote("Choose an output file first.");
      return;
    }
    setUploadBusy(true);
    setNote("");
    const form = new FormData();
    form.set("media_type", uploadType);
    Array.from(uploadFiles).forEach((file) => form.append("files", file));
    const response = await fetch(`/api/admin/air-engine/jobs/${active.id}/outputs`, {
      method: "POST",
      body: form,
    });
    const data = await response.json();
    setUploadBusy(false);
    if (!response.ok) {
      setNote(data.error || "Unable to upload Air Engine output.");
      return;
    }
    setUploadFiles(null);
    setNote(`Uploaded ${data.rows?.length ?? 0} ${uploadType} output file(s).`);
    await loadRows(status);
  }

  return (
    <main className="min-h-dvh bg-[#F5F6F8] px-5 py-8 text-[#2D333A]">
      <section className="mx-auto grid w-full max-w-7xl gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#D9DCE0] pb-6">
          <div>
            <p className="text-sm text-[#6B7280]">Dohara Air Engine</p>
            <h1 className="mt-2 text-4xl font-semibold">AI Media Processing Queue</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6B7280]">
              Marketplace images are reference sources only. This queue tracks source capture, rights checks, rebuild requirements, and publishable Dohara media outputs before review.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/admin/product-intake" className="rounded-xl border border-[#947A66] bg-[#947A66] px-4 py-3 text-white">Product Intake</a>
            <a href="/admin/publish-review" className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 text-[#6B7280]">Publish Review</a>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-4 xl:grid-cols-8">
          {statuses.map((item) => (
            <button key={item} type="button" onClick={() => setStatus(item)} className={`rounded-2xl border p-4 text-left ${status === item ? "border-[#2D333A] bg-[#2D333A] text-white" : "border-[#D9DCE0] bg-white text-[#2D333A]"}`}>
              <p className="text-sm opacity-80">{item}</p>
              <p className="mt-2 text-3xl font-semibold">{counts[item] ?? (item === "all" ? counts.all : 0) ?? 0}</p>
            </button>
          ))}
          <MetricCard label="missing main" value={counts.missing_main ?? 0} />
          <MetricCard label="main ready" value={counts.main_ready ?? 0} />
          <MetricCard label="avg ready/job" value={counts.average_ready_outputs ?? 0} />
        </section>

        <section className="grid gap-3 rounded-2xl border border-[#D9DCE0] bg-white p-4 md:grid-cols-4">
          <label className="grid gap-2 text-sm text-[#6B7280]">
            Output state
            <select value={outputState} onChange={(event) => setOutputState(event.target.value)} className="rounded-xl border border-[#D9DCE0] bg-[#F5F6F8] px-3 py-3 text-[#2D333A]">
              {outputFilters.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-[#6B7280]">
            Source platform
            <select value={sourcePlatform} onChange={(event) => setSourcePlatform(event.target.value)} className="rounded-xl border border-[#D9DCE0] bg-[#F5F6F8] px-3 py-3 text-[#2D333A]">
              <option value="">All platforms</option>
              {(facets.source_platforms || []).map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-[#6B7280]">
            Source type
            <select value={sourceType} onChange={(event) => setSourceType(event.target.value)} className="rounded-xl border border-[#D9DCE0] bg-[#F5F6F8] px-3 py-3 text-[#2D333A]">
              <option value="">All source types</option>
              {(facets.source_types || []).map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <div className="flex items-end">
            <button type="button" onClick={() => { setStatus("all"); setOutputState(""); setSourcePlatform(""); setSourceType(""); }} className="w-full rounded-xl border border-[#D9DCE0] bg-[#F5F6F8] px-4 py-3 text-sm text-[#2D333A]">
              Clear filters
            </button>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[25rem_minmax(0,1fr)]">
          <div className="grid content-start gap-3">
            {rows.map((job) => (
              <button key={job.id} type="button" onClick={() => setActiveId(job.id)} className={`rounded-2xl border p-4 text-left ${active?.id === job.id ? "border-[#947A66] bg-[#F3ECE2]" : "border-[#D9DCE0] bg-white"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{job.title || job.source_item_id || job.id}</p>
                    <p className="mt-1 truncate text-xs text-[#6B7280]">{job.intake_id}</p>
                  </div>
                  <span className={statusClass(job.status)}>{job.status}</span>
                </div>
                <p className="mt-2 text-xs text-[#6B7280]">{job.source_type || "unknown_source"} / {job.entry_surface || "unset"} / {job.source_platform}</p>
                <p className="mt-1 text-xs text-[#6B7280]">Buyer: {job.buyer_id || "none"} / Submitted: {job.submitted_by || "unknown"}</p>
                <p className="mt-3 line-clamp-2 text-xs leading-5 text-[#6B7280]">{job.next_action || nextActionForJob(job)}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                  <span className="rounded-full bg-white px-2 py-1 text-[#557C5D]">ready {job.ready_count ?? job.ready_outputs?.length ?? 0}</span>
                  <span className="rounded-full bg-white px-2 py-1 text-[#9B4B4B]">blocked {job.blocked_count ?? job.blocked_outputs?.length ?? 0}</span>
                  <span className="rounded-full bg-white px-2 py-1 text-[#6B7280]">missing {job.missing_count ?? job.missing_outputs?.length ?? 0}</span>
                </div>
              </button>
            ))}
            {rows.length === 0 ? <div className="rounded-2xl border border-[#D9DCE0] bg-white p-5 text-sm text-[#6B7280]">No Air Engine jobs for this status.</div> : null}
          </div>

          {active ? (
            <article className="rounded-2xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(45,51,58,0.08)]">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#D9DCE0] pb-5">
                <div>
                  <p className="text-sm text-[#6B7280]">{active.id} / {active.status}</p>
                  <h2 className="mt-2 text-3xl font-semibold">{active.title || active.source_platform + " media rebuild"}</h2>
                  <p className="mt-2 text-sm text-[#6B7280]">{active.source_type || "unknown_source"} / {active.entry_surface || "unset"} / {active.commerce_channel || "commerce_new"} / {active.goods_condition || "new"} / {active.priority || "normal"}</p>
                  <p className="mt-2 text-sm text-[#6B7280]">Buyer: {active.buyer_id || "none"} / Submitted by: {active.submitted_by || "unknown"} / Pro buyer: {active.professional_buyer_required ? "yes" : "no"}</p>
                </div>
                <a href="/admin/publish-review" className="rounded-xl border border-[#2D333A] px-4 py-3 text-sm">Open Review</a>
              </div>

              <section className="mt-5 grid gap-3 md:grid-cols-4">
                <MetricCard label="ready outputs" value={active.ready_count ?? active.ready_outputs?.length ?? 0} />
                <MetricCard label="missing outputs" value={active.missing_count ?? active.missing_outputs?.length ?? 0} />
                <MetricCard label="blocked outputs" value={active.blocked_count ?? active.blocked_outputs?.length ?? 0} />
                <div className="rounded-2xl border border-[#D9DCE0] bg-[#F5F6F8] p-4">
                  <p className="text-sm text-[#6B7280]">Next action</p>
                  <p className="mt-2 text-lg font-semibold leading-6">{active.next_action || nextActionForJob(active)}</p>
                </div>
              </section>

              <div className="mt-5 grid gap-5 xl:grid-cols-[0.48fr_0.52fr]">
                <section className="rounded-2xl border border-[#D9DCE0] bg-[#F5F6F8] p-4">
                  <p className="text-sm font-semibold">Source and rights</p>
                  <div className="mt-3 grid gap-2 text-sm leading-7 text-[#6B7280]">
                    <p>Intake: {active.intake_id}</p>
                    <p>Review: {active.review_id || "not in review"} / {active.review_status || active.intake_status || "unknown"}</p>
                    <p>Updated: {active.updated_at || active.created_at}</p>
                    <p>Platform: {active.source_platform}</p>
                    <p>Source type: {active.source_type || "unknown"}</p>
                    <p>Entry: {active.entry_surface || "unset"} / Identity: {active.identity_scope || "unset"} / Supply: {active.supply_program || "unset"}</p>
                    <p>Buyer: {active.buyer_id || "none"} / Submitted by: {active.submitted_by || "unknown"}</p>
                    <p>Source ID: {active.source_item_id || "unparsed"}</p>
                    <p>Parse: {active.source_parse_status || "unset"} / Capture: {active.source_capture_status || "unset"}</p>
                    {active.source_url ? <a href={active.source_url} target="_blank" rel="noreferrer" className="break-all text-[#947A66]">{active.source_url}</a> : <p>Source URL: manual / none</p>}
                    {active.canonical_source_url ? <a href={active.canonical_source_url} target="_blank" rel="noreferrer" className="break-all text-[#947A66]">Canonical: {active.canonical_source_url}</a> : null}
                    <p>Rights: {active.media_rights_status || "reference_only"}</p>
                    <p>Transform required: {active.transform_required ? "yes" : "no"}</p>
                    <p>Policy: {active.air_engine_policy || "rebuild_or_replace_before_publish"}</p>
                  </div>

                  <div className="mt-5 rounded-2xl border border-[#D9DCE0] bg-white p-4">
                    <p className="text-sm font-semibold">Upload finished output</p>
                    <p className="mt-2 text-xs leading-5 text-[#6B7280]">Use this for manually edited files now. The same endpoint can be used later by the real AI beautifier.</p>
                    <div className="mt-4 grid gap-3">
                      <select value={uploadType} onChange={(event) => setUploadType(event.target.value as (typeof uploadOutputTypes)[number])} className="rounded-xl border border-[#D9DCE0] bg-white px-3 py-3 text-sm">
                        {uploadOutputTypes.map((item) => <option key={item} value={item}>{item}</option>)}
                      </select>
                      <input key={`${active.id}-${uploadType}-${uploadFiles?.length ?? 0}`} type="file" multiple accept="image/*,video/*" onChange={(event) => setUploadFiles(event.target.files)} className="rounded-xl border border-dashed border-[#C8B7A4] bg-[#F3ECE2] px-3 py-3 text-sm" />
                      <button type="button" disabled={uploadBusy} onClick={uploadOutput} className="rounded-xl border border-[#947A66] bg-[#947A66] px-4 py-3 text-sm text-white disabled:opacity-50">
                        {uploadBusy ? "Uploading..." : "Attach Output"}
                      </button>
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-[#D9DCE0] bg-[#F5F6F8] p-4">
                  <p className="text-sm font-semibold">Output acceptance</p>
                  <div className="mt-3 grid gap-2">
                    {activeOutputs.map((item) => (
                      <div key={item.media_type} className="rounded-xl border border-[#D9DCE0] bg-white p-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold">{item.media_type} - {item.label}</p>
                            <p className="mt-1 text-xs text-[#6B7280]">{item.dimensions} / {item.ratio}{item.required ? " / required" : ""}</p>
                          </div>
                          <span className={outputStatusClass(item.status)}>{formatOutputStatus(item.status)}</span>
                        </div>
                        {item.note ? <p className="mt-2 text-xs leading-5 text-[#6B7280]">{item.note}</p> : null}
                        {item.url ? <a href={item.url} target="_blank" rel="noreferrer" className="mt-2 block break-all text-xs text-[#947A66]">{item.media_id || item.url}</a> : null}
                      </div>
                    ))}
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

function statusClass(status: AirEngineJob["status"]) {
  if (status === "ready") return "rounded-full bg-[#E7F2E7] px-2 py-1 text-xs text-[#557C5D]";
  if (status === "failed") return "rounded-full bg-[#F7E4E4] px-2 py-1 text-xs text-[#9B4B4B]";
  if (status === "processing") return "rounded-full bg-[#FFF1D6] px-2 py-1 text-xs text-[#947A66]";
  return "rounded-full bg-white px-2 py-1 text-xs text-[#6B7280]";
}

function outputStatusClass(status: string) {
  if (status === "ready") return "rounded-full bg-[#E7F2E7] px-3 py-1 text-xs text-[#557C5D]";
  if (status === "blocked_reference_only") return "rounded-full bg-[#F7E4E4] px-3 py-1 text-xs text-[#9B4B4B]";
  return "rounded-full bg-[#F5F6F8] px-3 py-1 text-xs text-[#6B7280]";
}

function formatOutputStatus(status: string) {
  if (status === "blocked_reference_only") return "blocked";
  return status || "missing";
}

function MetricCard({ label, value }: Readonly<{ label: string; value: string | number }>) {
  return (
    <div className="rounded-2xl border border-[#D9DCE0] bg-white p-4 text-left">
      <p className="text-sm text-[#6B7280]">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-[#2D333A]">{value}</p>
    </div>
  );
}

function nextActionForJob(job: AirEngineJob) {
  if (job.status === "failed") return "Failed, retry required";
  if ((job.blocked_outputs?.length ?? 0) > 0 || job.media_rights_status === "reference_only" || job.transform_required) return "Blocked by reference-only source";
  if (job.missing_outputs?.includes("main")) return "Needs main output";
  if ((job.missing_outputs?.length ?? 0) > 0) return "Needs detail/scene outputs";
  return "Ready for review";
}

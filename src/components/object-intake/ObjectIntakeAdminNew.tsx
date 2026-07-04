"use client";

import { useState } from "react";
import { objectIntakeSourceDefinitions } from "@/config/object-intake-source-types";
import { marketplaceSourcePolicies, type MarketplaceSourcePlatform } from "@/config/marketplace-source-platforms";
import { productMediaUploadSpecs, type ProductMediaType } from "@/config/product-media-upload-specs";
import { ObjectIntakeBatchLinkImport } from "@/components/object-intake/ObjectIntakeBatchLinkImport";
import { LegacyProductSampleTest } from "@/components/object-intake/LegacyProductSampleTest";

type UploadState = "idle" | "creating" | "uploading" | "drafting" | "submitting" | "done" | "error";
type SourceLinkAnalysis = {
  ok: boolean;
  source_url: string;
  normalized_url: string;
  platform: string;
  source_product_id: string | null;
  draft: {
    title: string;
    description: string;
    category: string;
    tags: string[];
    suggested_price: number | null;
    currency: string;
    seo_title: string;
    geo_summary: string;
  };
  media: {
    media_usage: string;
    requires_rebuild: boolean;
    can_publish_directly: boolean;
  };
  risk: {
    copyright_risk: string;
    needs_manual_review: boolean;
    risk_notes: string[];
  };
  source_snapshot: Record<string, string | boolean | null>;
  next_required_actions: string[];
};

const sourcePlatforms = marketplaceSourcePolicies.map((policy) => policy.platform).filter((platform) => platform !== "auto");
const mediaUploadGroups = productMediaUploadSpecs;

export function ObjectIntakeAdminNew() {
  const [state, setState] = useState<UploadState>("idle");
  const [linkState, setLinkState] = useState<"idle" | "analyzing" | "ready" | "error">("idle");
  const [note, setNote] = useState("");
  const [mediaFiles, setMediaFiles] = useState<Partial<Record<ProductMediaType, FileList | null>>>({});
  const [created, setCreated] = useState<{ intake_id: string; intake_no: string; status: string; review_id?: string; air_engine_job_id?: string } | null>(null);
  const [sourceAnalysis, setSourceAnalysis] = useState<SourceLinkAnalysis | null>(null);
  const [form, setForm] = useState({
    source_type: "admin_upload",
    source_platform: "manual" as MarketplaceSourcePlatform,
    source_url: "",
    submitted_by: "admin-os",
    buyer_id: "",
    country: "",
    original_title: "",
    original_description: "",
    original_price: "",
    currency: "USD",
    category_hint: "wind-objects",
    supplier: "",
    location: "",
    logistics_method: "platform_logistics",
    inventory: "1",
    is_one_of_one: true,
  });

  function update(key: keyof typeof form, value: string | boolean) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateMedia(type: ProductMediaType, files: FileList | null) {
    setMediaFiles((current) => ({ ...current, [type]: files }));
  }

  async function analyzeLink() {
    setNote("");
    setSourceAnalysis(null);
    if (!form.source_url.trim()) {
      setLinkState("error");
      setNote("Paste a product source URL before analysis.");
      return;
    }

    try {
      setLinkState("analyzing");
      const response = await fetch("/api/object-intakes/parse-link", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: form.source_url, source: "oa" }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "Unable to analyze source link.");
      const analysis = data as SourceLinkAnalysis;
      const sourcePlatform = normalizePlatformForIntake(analysis.platform) as MarketplaceSourcePlatform;
      setSourceAnalysis(analysis);
      setForm((current) => ({
        ...current,
        source_type: sourcePlatform === "manual" ? current.source_type : "external_link",
        source_platform: sourcePlatform,
        source_url: analysis.normalized_url || current.source_url,
        original_title: current.original_title || analysis.draft.title || "",
        original_description: current.original_description || analysis.draft.description || "",
        original_price: current.original_price || (analysis.draft.suggested_price ? `$${analysis.draft.suggested_price}` : ""),
        currency: analysis.draft.currency || current.currency,
        category_hint: analysis.draft.category || current.category_hint,
      }));
      setLinkState("ready");
      setNote(`${analysis.platform} source analyzed. Draft filled. Media remains reference-only until rebuilt or replaced.`);
    } catch (error) {
      setLinkState("error");
      setNote(error instanceof Error ? error.message : "Source link analysis failed.");
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNote("");
    setCreated(null);

    try {
      setState("creating");
      const createResponse = await fetch("/api/object-intakes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, source_snapshot: sourceAnalysis?.source_snapshot, inventory: Number.parseInt(form.inventory, 10) || 1 }),
      });
      const createData = await createResponse.json();
      if (!createResponse.ok) throw new Error(createData.error || "Unable to create intake.");
      setCreated(createData);

      const uploadEntries = mediaUploadGroups
        .map((group) => ({ type: group.type, files: mediaFiles[group.type] }))
        .filter((entry) => entry.files && entry.files.length > 0);

      if (uploadEntries.length > 0) {
        const mediaForm = new FormData();
        for (const entry of uploadEntries) {
          setState("uploading");
          mediaForm.delete("files");
          mediaForm.set("media_type", entry.type);
          Array.from(entry.files || []).forEach((file) => mediaForm.append("files", file));
          const mediaResponse = await fetch(`/api/object-intakes/${createData.intake_id}/media`, { method: "POST", body: mediaForm });
          const mediaData = await mediaResponse.json();
          if (!mediaResponse.ok) throw new Error(mediaData.error || `Unable to upload ${entry.type} media.`);
        }
      }

      setState("drafting");
      const draftResponse = await fetch(`/api/object-intakes/${createData.intake_id}/ai-draft`, { method: "POST" });
      const draftData = await draftResponse.json();
      if (!draftResponse.ok) throw new Error(draftData.error || "Unable to generate AI draft.");

      setState("submitting");
      const reviewResponse = await fetch(`/api/object-intakes/${createData.intake_id}/submit-review`, { method: "POST" });
      const reviewData = await reviewResponse.json();
      if (!reviewResponse.ok) throw new Error(reviewData.error || "Unable to submit review.");

      const doneData = {
        ...createData,
        review_id: reviewData.review_id,
        air_engine_job_id: reviewData.air_engine_job_id || createData.air_engine_job_id,
      };
      setCreated(doneData);
      setState("done");
      setNote(`Intake ${createData.intake_no} entered review queue. Review: ${reviewData.review_id}. Air Engine job: ${doneData.air_engine_job_id || "created"}.`);
    } catch (error) {
      setState("error");
      setNote(error instanceof Error ? error.message : "Object intake failed.");
    }
  }

  return (
    <main className="min-h-dvh bg-[#F5F6F8] px-5 py-8 text-[#2D333A]">
      <section className="mx-auto grid w-full max-w-6xl gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#D9DCE0] pb-6">
          <div>
            <p className="text-sm text-[#6B7280]">Dohara Object Intake Pipeline</p>
            <h1 className="mt-2 text-4xl font-semibold">Product Intake</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280]">
              Create one product intake for OA operations. One submit creates the intake, uploads media, generates the AI draft, submits publish review, and creates the Air Engine job.
            </p>
          </div>
          <a href="/admin/publish-review" className="rounded-xl border border-[#947A66] bg-[#947A66] px-4 py-3 text-sm text-white">Open Publish Review</a>
        </header>

        <ObjectIntakeBatchLinkImport />

        <LegacyProductSampleTest />

        <form onSubmit={submit} className="grid gap-5 rounded-2xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(45,51,58,0.08)]">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm">Source Type<select value={form.source_type} onChange={(event) => update("source_type", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3">{objectIntakeSourceDefinitions.map((item) => <option key={item.type} value={item.type}>{item.type} - {item.label}</option>)}</select></label>
            <label className="grid gap-2 text-sm">Source Platform<select value={form.source_platform} onChange={(event) => update("source_platform", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3">{sourcePlatforms.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="grid gap-2 text-sm">Source URL<input value={form.source_url} onChange={(event) => update("source_url", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" placeholder="Optional reference link" /></label>
          </div>

          <section className="grid gap-3 rounded-2xl border border-[#D9DCE0] bg-[#F8F5EF] p-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">AI source link analysis</p>
                <p className="mt-2 text-xs leading-6 text-[#6B7280]">Paste one marketplace link, analyze it, then review the filled title, category, description, risk notes, and media rebuild status before creating the intake.</p>
              </div>
              <button type="button" onClick={analyzeLink} disabled={linkState === "analyzing"} className="rounded-xl border border-[#2D333A] bg-[#2D333A] px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">
                {linkState === "analyzing" ? "Analyzing link" : "Analyze Link"}
              </button>
            </div>
            {sourceAnalysis ? (
              <div className="grid gap-3 rounded-xl bg-white p-4 text-xs leading-6 text-[#6B7280] md:grid-cols-2">
                <p><strong className="text-[#2D333A]">Platform:</strong> {sourceAnalysis.platform} / {sourceAnalysis.source_product_id || "unparsed"}</p>
                <p><strong className="text-[#2D333A]">Media:</strong> {sourceAnalysis.media.media_usage} / rebuild required: {sourceAnalysis.media.requires_rebuild ? "yes" : "no"}</p>
                <p><strong className="text-[#2D333A]">Draft:</strong> {sourceAnalysis.draft.title}</p>
                <p><strong className="text-[#2D333A]">Risk:</strong> {sourceAnalysis.risk.risk_notes.join(" ")}</p>
              </div>
            ) : null}
          </section>

          <section className="grid gap-4 rounded-2xl border border-[#D9DCE0] bg-[#F8F5EF] p-4">
            <div>
              <p className="text-sm font-semibold">Product media modules</p>
              <p className="mt-2 text-xs leading-6 text-[#6B7280]">
                Upload production media by slot. Main is required before publish; detail, scene, PC, mobile, social, and motion can be filled through Air Engine.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {mediaUploadGroups.map((group) => (
                <label key={group.type} className="grid gap-2 rounded-xl border border-[#D9DCE0] bg-white p-4 text-sm">
                  <span className="flex items-center justify-between gap-3 font-semibold">
                    {group.title}
                    {group.required ? <span className="rounded-full bg-[#2D333A] px-2 py-1 text-[11px] text-white">Required</span> : null}
                  </span>
                  <span className="text-xs leading-5 text-[#6B7280]">{group.usage}</span>
                  <ul className="grid gap-1 text-xs leading-5 text-[#6B7280]">
                    {group.specs.map((spec) => <li key={spec}>- {spec}</li>)}
                  </ul>
                  <input type="file" multiple accept={group.accept} onChange={(event) => updateMedia(group.type, event.target.files)} className="mt-1 block w-full text-sm text-[#6B7280] file:mr-3 file:rounded-lg file:border file:border-[#D9DCE0] file:bg-[#EBEDEF] file:px-3 file:py-2 file:text-[#2D333A]" />
                </label>
              ))}
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">Original Title<input required value={form.original_title} onChange={(event) => update("original_title", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" /></label>
            <label className="grid gap-2 text-sm">Price<input value={form.original_price} onChange={(event) => update("original_price", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" placeholder="$48.00" /></label>
            <label className="grid gap-2 text-sm">Country / Place<input value={form.country} onChange={(event) => update("country", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" /></label>
            <label className="grid gap-2 text-sm">Location<input value={form.location} onChange={(event) => update("location", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" /></label>
            <label className="grid gap-2 text-sm">Category Hint<input value={form.category_hint} onChange={(event) => update("category_hint", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" /></label>
            <label className="grid gap-2 text-sm">Inventory<input value={form.inventory} onChange={(event) => update("inventory", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" /></label>
            <label className="grid gap-2 text-sm">Supplier<input value={form.supplier} onChange={(event) => update("supplier", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" /></label>
            <label className="grid gap-2 text-sm">Buyer ID<input value={form.buyer_id} onChange={(event) => update("buyer_id", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" /></label>
          </div>

          <label className="grid gap-2 text-sm">Original Description<textarea value={form.original_description} onChange={(event) => update("original_description", event.target.value)} className="min-h-28 rounded-xl border border-[#D9DCE0] px-4 py-3 leading-7" /></label>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={form.is_one_of_one} onChange={(event) => update("is_one_of_one", event.target.checked)} /> One-of-one object</label>
            <button disabled={state !== "idle" && state !== "done" && state !== "error"} type="submit" className="rounded-xl border border-[#2D333A] bg-[#2D333A] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">Create Intake + AI Draft + Air Engine + Review</button>
          </div>
        </form>

        <aside className="rounded-2xl border border-[#D9DCE0] bg-white p-5 text-sm leading-7 text-[#6B7280]">
          <p>Status: <strong className="text-[#2D333A]">{state}</strong></p>
          {created ? (
            <div className="grid gap-2">
              <p>Created: {created.intake_no} / {created.intake_id}</p>
              <p>Review: {created.review_id || "created"} / Air Engine: {created.air_engine_job_id || "created"}</p>
              <div className="flex flex-wrap gap-3">
                <a href="/admin/publish-review" className="rounded-xl border border-[#947A66] bg-[#947A66] px-4 py-2 text-white">Open Publish Review</a>
                <a href="/admin/ai-queue" className="rounded-xl border border-[#D9DCE0] bg-[#F5F6F8] px-4 py-2 text-[#2D333A]">Open Air Engine Queue</a>
              </div>
            </div>
          ) : null}
          {note ? <p>{note}</p> : null}
          <p className="mt-3">External source media is reference-only. Publish requires owned, uploaded, rebuilt, or approved Air Engine output media.</p>
        </aside>
      </section>
    </main>
  );
}

function normalizePlatformForIntake(platform: string) {
  if (platform === "unknown") return "other";
  if (platform === "pinduoduo") return "pdd";
  return platform;
}

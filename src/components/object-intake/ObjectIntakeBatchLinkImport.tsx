"use client";

import { useMemo, useState } from "react";

type BatchResult = {
  created?: Array<{ intake_id: string; intake_no: string; source_url: string; title: string }>;
  skipped?: Array<{ line: string; source_url?: string; reason: string }>;
  total?: number;
  error?: string;
};

const sourcePlatforms = ["taobao", "tmall", "1688", "other"] as const;

export function ObjectIntakeBatchLinkImport() {
  const [text, setText] = useState("");
  const [sourcePlatform, setSourcePlatform] = useState<(typeof sourcePlatforms)[number]>("taobao");
  const [categoryHint, setCategoryHint] = useState("wind-objects");
  const [supplier, setSupplier] = useState("");
  const [submitReview, setSubmitReview] = useState(true);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<BatchResult | null>(null);

  const lineCount = useMemo(() => text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).length, [text]);

  async function submit() {
    setBusy(true);
    setResult(null);
    const response = await fetch("/api/admin/object-intakes/batch-links", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text,
        source_platform: sourcePlatform,
        category_hint: categoryHint,
        supplier,
        submit_review: submitReview,
        generate_ai_draft: true,
      }),
    });
    const data = await response.json();
    setBusy(false);
    setResult(data);
  }

  return (
    <section className="grid gap-5 rounded-2xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(45,51,58,0.08)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#6B7280]">Batch source import</p>
          <h2 className="mt-2 text-2xl font-semibold">Taobao SKU link import</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[#6B7280]">
            Paste one source per line. Format can be a plain URL, or title + tab + URL + tab + price. External product images are treated as reference-only sources; publish-ready media must be rebuilt, replaced, or transformed through RI/Air Engine before listing.
          </p>
        </div>
        <span className="rounded-full bg-[#F5F6F8] px-3 py-1 text-xs text-[#6B7280]">{lineCount} rows</span>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <label className="grid gap-2 text-sm">
          Platform
          <select value={sourcePlatform} onChange={(event) => setSourcePlatform(event.target.value as typeof sourcePlatform)} className="rounded-xl border border-[#D9DCE0] px-4 py-3">
            {sourcePlatforms.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          Category
          <input value={categoryHint} onChange={(event) => setCategoryHint(event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" />
        </label>
        <label className="grid gap-2 text-sm">
          Supplier
          <input value={supplier} onChange={(event) => setSupplier(event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" placeholder="Optional" />
        </label>
        <label className="flex items-end gap-3 rounded-xl border border-[#D9DCE0] px-4 py-3 text-sm">
          <input type="checkbox" checked={submitReview} onChange={(event) => setSubmitReview(event.target.checked)} />
          Submit review
        </label>
      </div>

      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="min-h-56 rounded-2xl border border-[#D9DCE0] p-4 font-mono text-sm leading-7"
        placeholder={"https://item.taobao.com/item.htm?id=...\nHandmade ceramic vase\thttps://item.taobao.com/item.htm?id=...\t$48"}
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs leading-6 text-[#6B7280]">Created rows are marked `commerce_channel=commerce_new`, `goods_condition=new`, `media_rights_status=reference_only`, and `media_transform_required=true`.</p>
        <button type="button" disabled={busy || lineCount === 0} onClick={submit} className="rounded-xl border border-[#2D333A] bg-[#2D333A] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
          {busy ? "Importing..." : "Import Links"}
        </button>
      </div>

      {result ? (
        <div className="grid gap-3 rounded-2xl border border-[#D9DCE0] bg-[#F5F6F8] p-4 text-sm leading-7">
          {result.error ? <p className="text-[#A05D4E]">{result.error}</p> : null}
          <p>Created: <strong>{result.created?.length || 0}</strong> / Skipped: <strong>{result.skipped?.length || 0}</strong> / Total: <strong>{result.total || 0}</strong></p>
          {(result.created || []).slice(0, 8).map((item) => (
            <p key={item.intake_id} className="rounded-xl bg-white p-3 text-xs">{item.intake_no} / {item.title} / {item.source_url}</p>
          ))}
          {(result.skipped || []).length > 0 ? <p className="text-xs text-[#A05D4E]">Skipped rows are usually duplicates or missing URLs.</p> : null}
        </div>
      ) : null}
    </section>
  );
}

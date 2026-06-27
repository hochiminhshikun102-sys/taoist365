"use client";

import { useState } from "react";
import { productMediaUploadSpecs, type ProductMediaType } from "@/config/product-media-upload-specs";

const buyerMediaTypes: ProductMediaType[] = ["main", "original", "scene", "detail", "motion"];
const buyerMediaGroups = productMediaUploadSpecs.filter((spec) => buyerMediaTypes.includes(spec.type));
const windSeekerBuyerId = "wind-seeker";

export function WindSeekerUploadClient() {
  const [mediaFiles, setMediaFiles] = useState<Partial<Record<ProductMediaType, FileList | null>>>({});
  const [state, setState] = useState("ready");
  const [note, setNote] = useState("");
  const [form, setForm] = useState({
    original_title: "",
    original_description: "",
    original_price: "",
    country: "",
    location: "",
    category_hint: "wind-objects",
    inventory: "1",
    source_url: "",
  });

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateMedia(type: ProductMediaType, files: FileList | null) {
    setMediaFiles((current) => ({ ...current, [type]: files }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("creating");
    setNote("");

    try {
      const createResponse = await fetch("/api/object-intakes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          source_type: "buyer_upload",
          source_platform: form.source_url ? "other" : "manual",
          submitted_by: windSeekerBuyerId,
          buyer_id: windSeekerBuyerId,
          currency: "USD",
          inventory: Number.parseInt(form.inventory, 10) || 1,
          is_one_of_one: true,
        }),
      });
      const createData = await createResponse.json();
      if (!createResponse.ok) throw new Error(createData.error || "Unable to create buyer intake.");

      const uploadEntries = buyerMediaGroups
        .map((group) => ({ type: group.type, files: mediaFiles[group.type] }))
        .filter((entry) => entry.files && entry.files.length > 0);

      if (uploadEntries.length > 0) {
        for (const entry of uploadEntries) {
          setState("uploading");
          const mediaForm = new FormData();
          Array.from(entry.files || []).forEach((file) => mediaForm.append("files", file));
          mediaForm.append("media_type", entry.type);
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
      if (!reviewResponse.ok) throw new Error(reviewData.error || "Unable to submit buyer intake.");

      setState("done");
      setNote(`${createData.intake_no} submitted to review. Air Engine job: ${reviewData.air_engine_job_id || createData.air_engine_job_id || "created"}.`);
    } catch (error) {
      setState("error");
      setNote(error instanceof Error ? error.message : "Buyer upload failed.");
    }
  }

  return (
    <main className="min-h-dvh bg-[#F5F6F8] px-5 py-8 text-[#2D333A]">
      <section className="mx-auto grid w-full max-w-3xl gap-6">
        <header className="border-b border-[#D9DCE0] pb-6">
          <a href="/wind-seeker" className="text-sm text-[#6B7280]">Wind Seeker</a>
          <h1 className="mt-3 text-4xl font-semibold">One-click Product Intake</h1>
          <p className="mt-3 text-sm leading-7 text-[#6B7280]">买手上传进入同一条 Dohara Object Intake Pipeline。</p>
        </header>

        <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(45,51,58,0.08)]">
          <section className="grid gap-3 rounded-2xl border border-[#D9DCE0] bg-[#F8F5EF] p-4">
            <div>
              <p className="text-sm font-semibold">Dohara media standard</p>
              <p className="mt-2 text-xs leading-6 text-[#6B7280]">白底产品图优先按 2400 x 2400 上传；场景、细节和视频按用途分开，审核会更快。</p>
            </div>
            <div className="grid gap-3">
              {buyerMediaGroups.map((group) => (
                <label key={group.type} className="grid gap-2 rounded-xl border border-[#D9DCE0] bg-white p-4 text-sm">
                  <span className="flex items-center justify-between gap-3 font-semibold">
                    {group.title}
                    {group.required ? <span className="rounded-full bg-[#2D333A] px-2 py-1 text-[11px] text-white">优先</span> : null}
                  </span>
                  <span className="text-xs leading-5 text-[#6B7280]">{group.usage}</span>
                  <ul className="grid gap-1 text-xs leading-5 text-[#6B7280]">
                    {group.specs.slice(0, 3).map((spec) => <li key={spec}>- {spec}</li>)}
                  </ul>
                  <input type="file" multiple accept={group.accept} onChange={(event) => updateMedia(group.type, event.target.files)} className="rounded-xl border border-dashed border-[#947A66]/60 bg-[#F3ECE2] px-4 py-4 text-sm" />
                </label>
              ))}
            </div>
          </section>
          <label className="grid gap-2 text-sm">Object Title<input required value={form.original_title} onChange={(event) => update("original_title", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" /></label>
          <label className="grid gap-2 text-sm">Story / Source Note<textarea value={form.original_description} onChange={(event) => update("original_description", event.target.value)} className="min-h-28 rounded-xl border border-[#D9DCE0] px-4 py-3 leading-7" /></label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">Price USD<input value={form.original_price} onChange={(event) => update("original_price", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" /></label>
            <label className="grid gap-2 text-sm">Country<input value={form.country} onChange={(event) => update("country", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" /></label>
            <label className="grid gap-2 text-sm">Location<input value={form.location} onChange={(event) => update("location", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" /></label>
            <label className="grid gap-2 text-sm">Stock<input value={form.inventory} onChange={(event) => update("inventory", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" /></label>
          </div>
          <label className="grid gap-2 text-sm">Source Link Optional<input value={form.source_url} onChange={(event) => update("source_url", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" /></label>
          <button type="submit" disabled={state !== "ready" && state !== "done" && state !== "error"} className="rounded-xl border border-[#2D333A] bg-[#2D333A] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">Create Intake + AI Draft + Air Engine + Review</button>
        </form>

        <aside className="rounded-2xl border border-[#D9DCE0] bg-white p-5 text-sm leading-7 text-[#6B7280]">
          <p>Status: <strong className="text-[#2D333A]">{state}</strong></p>
          {note ? <p>{note}</p> : null}
          <a href="/wind-seeker/products" className="mt-3 inline-flex text-[#947A66]">View my intake products</a>
        </aside>
      </section>
    </main>
  );
}

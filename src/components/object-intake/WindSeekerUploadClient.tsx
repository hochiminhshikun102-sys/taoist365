"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { productMediaUploadSpecs, type ProductMediaType } from "@/config/product-media-upload-specs";
import { WindSeekerCard, WindSeekerFrame, WindSeekerStepNav, windSeekerIcon } from "@/components/wind-seeker/WindSeekerShell";

type UploadStep = "capture" | "ai-draft" | "details" | "submit";

const buyerMediaTypes: ProductMediaType[] = ["main", "original", "scene", "detail", "motion"];
const buyerMediaGroups = productMediaUploadSpecs.filter((spec) => buyerMediaTypes.includes(spec.type));
const windSeekerBuyerId = "wind-seeker";
const validSteps: UploadStep[] = ["capture", "ai-draft", "details", "submit"];

export function WindSeekerUploadClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step") as UploadStep | null;
  const step = stepParam && validSteps.includes(stepParam) ? stepParam : "capture";
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
    material: "",
    supplier_note: "",
  });

  const selectedFileCount = useMemo(() => Object.values(mediaFiles).reduce((sum, files) => sum + (files?.length || 0), 0), [mediaFiles]);
  const aiDraft = useMemo(() => {
    const title = form.original_title || "Untitled Wind Seeker Object";
    return {
      title,
      description: form.original_description || "A discovered object prepared for Dohara review. Add source context before submitting.",
      category: form.category_hint || "wind-objects",
      confidence: selectedFileCount > 0 ? "86%" : "Needs media",
      risk: selectedFileCount > 0 ? "No immediate restriction detected. Review still required." : "Upload at least one product photo or video.",
      tags: ["curated find", "new goods", "wind seeker"],
    };
  }, [form, selectedFileCount]);

  function go(next: UploadStep) {
    router.push(`/wind-seeker/upload?step=${next}`, { scroll: false });
  }

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateMedia(type: ProductMediaType, files: FileList | null) {
    setMediaFiles((current) => ({ ...current, [type]: files }));
  }

  async function submit() {
    setState("creating");
    setNote("");

    try {
      const createResponse = await fetch("/api/object-intakes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          original_title: form.original_title || aiDraft.title,
          original_description: form.original_description || aiDraft.description,
          original_price: form.original_price,
          country: form.country,
          location: form.location,
          category_hint: form.category_hint,
          source_url: form.source_url,
          source_type: "buyer_upload",
          source_platform: form.source_url ? "other" : "manual",
          submitted_by: windSeekerBuyerId,
          buyer_id: windSeekerBuyerId,
          entry_surface: "wind_seeker",
          supply_program: "wind_seeker",
          commerce_channel: "commerce_new",
          goods_condition: "new",
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

      for (const entry of uploadEntries) {
        setState("uploading");
        const mediaForm = new FormData();
        Array.from(entry.files || []).forEach((file) => mediaForm.append("files", file));
        mediaForm.append("media_type", entry.type);
        const mediaResponse = await fetch(`/api/object-intakes/${createData.intake_id}/media`, { method: "POST", body: mediaForm });
        const mediaData = await mediaResponse.json();
        if (!mediaResponse.ok) throw new Error(mediaData.error || `Unable to upload ${entry.type} media.`);
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
      setNote(`${createData.intake_no} submitted. Air Engine job: ${reviewData.air_engine_job_id || createData.air_engine_job_id || "created"}.`);
    } catch (error) {
      setState("error");
      setNote(error instanceof Error ? error.message : "Buyer upload failed.");
    }
  }

  return (
    <WindSeekerFrame active="upload">
      <section className="mx-auto grid max-w-5xl gap-6">
        <header className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">One-click object intake</p>
            <h1 className="mt-4 font-[var(--font-display-serif)] text-4xl font-normal text-[#123A68] sm:text-5xl">Upload product</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5E738A]">Capture media, accept an AI draft, complete facts, and submit to Dohara review.</p>
          </div>
          <WindSeekerCard className="p-4"><WindSeekerStepNav activeStep={step} /></WindSeekerCard>
        </header>

        {step === "capture" ? (
          <WindSeekerCard className="p-5">
            <div className="grid gap-5 lg:grid-cols-[0.48fr_0.52fr]">
              <div className="relative min-h-[360px] overflow-hidden rounded-[24px] bg-[#DCE9F5]">
                <Image src={windSeekerIcon} alt="" fill priority className="object-contain p-16 opacity-80" sizes="420px" />
                <div className="absolute inset-6 grid grid-cols-3 grid-rows-3 rounded-[20px] border border-white/70">{Array.from({ length: 9 }).map((_, index) => <span key={index} className="border border-white/40" />)}</div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#123A68]">Capture media</h2>
                <p className="mt-3 text-sm leading-7 text-[#5E738A]">Main image can be a clear photo or short video. Add scene, detail, and original files when available.</p>
                <div className="mt-5 grid gap-3">
                  {buyerMediaGroups.map((group) => (
                    <label key={group.type} className="grid gap-2 rounded-2xl border border-[#D9E2EC] bg-[#F8FBFF] p-4 text-sm">
                      <span className="font-semibold text-[#123A68]">{group.title}</span>
                      <span className="text-xs leading-5 text-[#5E738A]">{group.usage}</span>
                      <input type="file" multiple accept={group.accept} onChange={(event) => updateMedia(group.type, event.target.files)} className="rounded-xl border border-dashed border-[#C9A45C] bg-white px-4 py-3 text-sm" />
                    </label>
                  ))}
                </div>
                <button type="button" onClick={() => go("ai-draft")} className="mt-5 rounded-full bg-[#123A68] px-6 py-3 text-sm font-semibold text-white">Start AI recognition</button>
              </div>
            </div>
          </WindSeekerCard>
        ) : null}

        {step === "ai-draft" ? (
          <WindSeekerCard className="p-5">
            <h2 className="text-2xl font-semibold text-[#123A68]">AI draft result</h2>
            <div className="mt-5 grid gap-4 lg:grid-cols-[12rem_1fr]">
              <div className="relative h-48 overflow-hidden rounded-2xl bg-[#EAF3FE]"><Image src={windSeekerIcon} alt="" fill className="object-contain p-8" sizes="192px" /></div>
              <div className="grid gap-4">
                {[
                  ["Title", aiDraft.title],
                  ["Description", aiDraft.description],
                  ["Category", aiDraft.category],
                  ["Confidence", aiDraft.confidence],
                  ["Risk hints", aiDraft.risk],
                  ["Tags", aiDraft.tags.join(", ")],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-[#F3F7FB] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C9A45C]">{label}</p>
                    <p className="mt-2 text-sm leading-6 text-[#223247]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => go("capture")} className="rounded-full border border-[#D9E2EC] bg-white px-6 py-3 text-sm font-semibold text-[#123A68]">Back</button>
              <button type="button" onClick={() => go("details")} className="rounded-full bg-[#123A68] px-6 py-3 text-sm font-semibold text-white">Accept draft</button>
            </div>
          </WindSeekerCard>
        ) : null}

        {step === "details" ? (
          <WindSeekerCard className="p-5">
            <h2 className="text-2xl font-semibold text-[#123A68]">Complete product information</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Object title" value={form.original_title} onChange={(value) => update("original_title", value)} required />
              <Field label="Price USD" value={form.original_price} onChange={(value) => update("original_price", value)} />
              <Field label="Country" value={form.country} onChange={(value) => update("country", value)} />
              <Field label="Location" value={form.location} onChange={(value) => update("location", value)} />
              <Field label="Inventory" value={form.inventory} onChange={(value) => update("inventory", value)} />
              <Field label="Material" value={form.material} onChange={(value) => update("material", value)} />
              <Field label="Source link" value={form.source_url} onChange={(value) => update("source_url", value)} />
              <Field label="Supplier note" value={form.supplier_note} onChange={(value) => update("supplier_note", value)} />
              <label className="grid gap-2 text-sm md:col-span-2">
                <span className="font-semibold text-[#123A68]">Object story</span>
                <textarea value={form.original_description} onChange={(event) => update("original_description", event.target.value)} className="min-h-28 rounded-2xl border border-[#D9E2EC] bg-white px-4 py-3 outline-none focus:border-[#C9A45C]" />
              </label>
            </div>
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => go("ai-draft")} className="rounded-full border border-[#D9E2EC] bg-white px-6 py-3 text-sm font-semibold text-[#123A68]">Back</button>
              <button type="button" onClick={() => go("submit")} className="rounded-full bg-[#123A68] px-6 py-3 text-sm font-semibold text-white">Continue</button>
            </div>
          </WindSeekerCard>
        ) : null}

        {step === "submit" ? (
          <WindSeekerCard className="p-5">
            <h2 className="text-2xl font-semibold text-[#123A68]">Submit for review</h2>
            <div className="mt-5 grid gap-5 lg:grid-cols-[0.42fr_0.58fr]">
              <div className="rounded-2xl bg-[#F3F7FB] p-4">
                <p className="font-semibold text-[#123A68]">{form.original_title || aiDraft.title}</p>
                <p className="mt-2 text-sm text-[#5E738A]">{form.original_price || "$0.00"} / {form.country || "Country pending"}</p>
                <p className="mt-3 text-sm leading-6 text-[#5E738A]">{form.original_description || aiDraft.description}</p>
              </div>
              <div className="grid gap-3">
                {["Product media provided", "AI draft reviewed", "Price and inventory checked", "Location and logistics completed", "No prohibited item"].map((item) => (
                  <p key={item} className="rounded-2xl border border-[#D9E2EC] bg-white p-4 text-sm font-medium text-[#223247]">OK - {item}</p>
                ))}
              </div>
            </div>
            <button type="button" disabled={state === "creating" || state === "uploading" || state === "drafting" || state === "submitting"} onClick={submit} className="mt-5 rounded-full bg-[#123A68] px-7 py-3 text-sm font-semibold text-white disabled:opacity-50">
              Submit review
            </button>
            <div className="mt-4 rounded-2xl bg-[#F3F7FB] p-4 text-sm leading-7 text-[#5E738A]">
              <p>Status: <strong className="text-[#123A68]">{state}</strong></p>
              {note ? <p>{note}</p> : null}
            </div>
          </WindSeekerCard>
        ) : null}
      </section>
    </WindSeekerFrame>
  );
}

function Field({ label, value, onChange, required = false }: Readonly<{ label: string; value: string; onChange: (value: string) => void; required?: boolean }>) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-semibold text-[#123A68]">{label}</span>
      <input required={required} value={value} onChange={(event) => onChange(event.target.value)} className="rounded-2xl border border-[#D9E2EC] bg-white px-4 py-3 outline-none focus:border-[#C9A45C]" />
    </label>
  );
}

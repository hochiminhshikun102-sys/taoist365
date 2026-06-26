"use client";

import { useState } from "react";

type UploadState = "idle" | "creating" | "uploading" | "drafting" | "submitting" | "done" | "error";
type MediaType = "original" | "main" | "detail" | "scene" | "pc" | "mobile" | "social" | "motion";

const sourceTypes = ["admin_upload", "boss_upload", "buyer_upload", "external_link", "supplier_batch"] as const;
const sourcePlatforms = ["manual", "taobao", "tmall", "1688", "shopify", "etsy", "other"] as const;
const mediaUploadGroups: { type: MediaType; title: string; note: string }[] = [
  { type: "main", title: "Main image / 主图", note: "First product image for listing, search, collection, and cart." },
  { type: "original", title: "Original source / 原始素材", note: "Raw buyer, supplier, link, or boss upload files retained for trace." },
  { type: "detail", title: "Detail images / 细节图", note: "Material, texture, defects, package details, closeups." },
  { type: "scene", title: "Scene images / 场景图", note: "Room, desk, shelf, usage, atmosphere, placement." },
  { type: "pc", title: "PC page images / PC详情图", note: "Wide detail page sections and desktop marketing blocks." },
  { type: "mobile", title: "Mobile page images / 手机详情图", note: "Vertical mobile sections for product detail." },
  { type: "social", title: "Social exports / 社媒图", note: "Pinterest, Xiaohongshu, Instagram, ad/export versions." },
  { type: "motion", title: "Video or motion / 视频动效", note: "Short video, slow loop, product movement, packaging proof." },
];

export function ObjectIntakeAdminNew() {
  const [state, setState] = useState<UploadState>("idle");
  const [note, setNote] = useState("");
  const [mediaFiles, setMediaFiles] = useState<Partial<Record<MediaType, FileList | null>>>({});
  const [created, setCreated] = useState<{ intake_id: string; intake_no: string; status: string } | null>(null);
  const [form, setForm] = useState({
    source_type: "admin_upload",
    source_platform: "manual",
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

  function updateMedia(type: MediaType, files: FileList | null) {
    setMediaFiles((current) => ({ ...current, [type]: files }));
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
        body: JSON.stringify({ ...form, inventory: Number.parseInt(form.inventory, 10) || 1 }),
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

      setState("done");
      setNote(`Intake ${createData.intake_no} entered review queue.`);
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
            <p className="text-sm text-[#6B7280]">VL Object Intake Pipeline</p>
            <h1 className="mt-2 text-4xl font-semibold">Admin Upload</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280]">后台宝贝上传进入统一 object_intakes，不再作为孤立工具。</p>
          </div>
          <a href="/admin/object-intakes" className="rounded-xl border border-[#947A66] bg-[#947A66] px-4 py-3 text-sm text-white">Review Queue</a>
        </header>

        <form onSubmit={submit} className="grid gap-5 rounded-2xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(45,51,58,0.08)]">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm">Source Type<select value={form.source_type} onChange={(event) => update("source_type", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3">{sourceTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="grid gap-2 text-sm">Source Platform<select value={form.source_platform} onChange={(event) => update("source_platform", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3">{sourcePlatforms.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="grid gap-2 text-sm">Source URL<input value={form.source_url} onChange={(event) => update("source_url", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" placeholder="Optional link, first version saves only" /></label>
          </div>

          <section className="grid gap-4 rounded-2xl border border-[#D9DCE0] bg-[#F8F5EF] p-4">
            <div>
              <p className="text-sm font-semibold">Product media modules / 商品图片模块</p>
              <p className="mt-2 text-xs leading-6 text-[#6B7280]">Upload by page purpose. These files enter object_media first and can later be reused by the asset center and Air Engine.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {mediaUploadGroups.map((group) => (
                <label key={group.type} className="grid gap-2 rounded-xl border border-[#D9DCE0] bg-white p-4 text-sm">
                  <span className="font-semibold">{group.title}</span>
                  <span className="text-xs leading-5 text-[#6B7280]">{group.note}</span>
                  <input type="file" multiple accept="image/*,video/*" onChange={(event) => updateMedia(group.type, event.target.files)} className="mt-1 block w-full text-sm text-[#6B7280] file:mr-3 file:rounded-lg file:border file:border-[#D9DCE0] file:bg-[#EBEDEF] file:px-3 file:py-2 file:text-[#2D333A]" />
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
            <button disabled={state !== "idle" && state !== "done" && state !== "error"} type="submit" className="rounded-xl border border-[#2D333A] bg-[#2D333A] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">Create Intake + Submit Review</button>
          </div>
        </form>

        <aside className="rounded-2xl border border-[#D9DCE0] bg-white p-5 text-sm leading-7 text-[#6B7280]">
          <p>Status: <strong className="text-[#2D333A]">{state}</strong></p>
          {created ? <p>Created: {created.intake_no} / {created.intake_id}</p> : null}
          {note ? <p>{note}</p> : null}
          <p className="mt-3">Air Engine first version reserves status only. Link parsing first version stores source_url and source_platform only.</p>
        </aside>
      </section>
    </main>
  );
}

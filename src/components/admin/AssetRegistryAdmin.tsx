"use client";

import { useEffect, useMemo, useState } from "react";
import { productMediaUploadSpecs } from "@/config/product-media-upload-specs";

type AssetScope = "all" | "brand" | "product_media" | "social" | "prompt_pack" | "safe_area" | "object_intake" | "air_engine";

type AssetRecord = {
  id: string;
  scope: string;
  object_id?: string;
  intake_id?: string;
  file_name: string;
  public_url: string;
  mime_type: string;
  size: number;
  usage?: string;
  alt_text?: string;
  tags?: string[];
  status: string;
  created_at: string;
};

const scopes: { value: AssetScope; label: string }[] = [
  { value: "all", label: "All assets" },
  { value: "product_media", label: "Product media" },
  { value: "object_intake", label: "Object intake" },
  { value: "air_engine", label: "Air Engine" },
  { value: "brand", label: "Brand" },
  { value: "social", label: "Social" },
  { value: "prompt_pack", label: "Prompt packs" },
  { value: "safe_area", label: "Safe area" },
];

function formatSize(size: number) {
  if (!Number.isFinite(size) || size <= 0) return "0 KB";
  if (size > 1024 * 1024) return `${(size / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(size / 1024))} KB`;
}

export function AssetRegistryAdmin() {
  const [rows, setRows] = useState<AssetRecord[]>([]);
  const [scope, setScope] = useState<AssetScope>("product_media");
  const [query, setQuery] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [form, setForm] = useState({
    object_id: "",
    intake_id: "",
    usage: "product-gallery",
    alt_text: "",
    tags: "",
  });

  const endpoint = useMemo(() => {
    const params = new URLSearchParams();
    params.set("scope", scope);
    if (query.trim()) params.set("q", query.trim());
    return `/api/admin/assets?${params.toString()}`;
  }, [query, scope]);

  async function loadRows() {
    setNote("");
    const response = await fetch(endpoint, { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) {
      setNote(data.error || "Unable to read assets.");
      return;
    }
    setRows(data.rows || []);
  }

  useEffect(() => {
    void loadRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  async function uploadAssets(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!files || files.length === 0) {
      setNote("Choose at least one asset file.");
      return;
    }

    setBusy(true);
    setNote("");
    const body = new FormData();
    Array.from(files).forEach((file) => body.append("files", file));
    body.append("scope", scope === "all" ? "product_media" : scope);
    body.append("object_id", form.object_id);
    body.append("intake_id", form.intake_id);
    body.append("usage", form.usage);
    body.append("alt_text", form.alt_text);
    body.append("tags", form.tags);

    const response = await fetch("/api/admin/assets", { method: "POST", body });
    const data = await response.json();
    setBusy(false);

    if (!response.ok) {
      setNote(data.error || "Asset upload failed.");
      return;
    }

    setFiles(null);
    setNote(`${data.rows?.length || 0} asset(s) uploaded to registry.`);
    await loadRows();
  }

  return (
    <main className="min-h-dvh bg-[#F5F6F8] px-5 py-8 text-[#2D333A]">
      <section className="mx-auto grid w-full max-w-7xl gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#D9DCE0] pb-6">
          <div>
            <p className="text-sm text-[#6B7280]">VL Asset Registry</p>
            <h1 className="mt-2 text-4xl font-semibold">Media Asset Center</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6B7280]">
              A shared R2-backed registry for product media, Object Intake originals, Air Engine outputs, brand files, and social exports.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/admin/object-intakes/new" className="rounded-xl border border-[#947A66] bg-[#947A66] px-4 py-3 text-white">New object intake</a>
            <a href="/admin/object-intakes" className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 text-[#6B7280]">Review queue</a>
          </div>
        </header>

        <section className="grid gap-5 xl:grid-cols-[24rem_minmax(0,1fr)]">
          <form onSubmit={uploadAssets} className="grid content-start gap-4 rounded-2xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(45,51,58,0.08)]">
            <div>
              <p className="text-sm font-semibold">Upload to registry</p>
              <p className="mt-2 text-xs leading-6 text-[#6B7280]">Files are stored in R2 when the Cloudflare binding is available.</p>
            </div>

            <label className="grid gap-2 text-sm">
              Scope
              <select value={scope} onChange={(event) => setScope(event.target.value as AssetScope)} className="rounded-xl border border-[#D9DCE0] px-4 py-3">
                {scopes.filter((item) => item.value !== "all").map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
            </label>

            <label className="grid gap-2 text-sm">
              Files
              <input key={note} type="file" multiple accept="image/*,video/*,.pdf" onChange={(event) => setFiles(event.target.files)} className="rounded-xl border border-dashed border-[#947A66]/60 bg-[#F3ECE2] px-4 py-5 text-sm" />
            </label>

            <label className="grid gap-2 text-sm">
              Linked object_id
              <input value={form.object_id} onChange={(event) => setForm({ ...form, object_id: event.target.value })} className="rounded-xl border border-[#D9DCE0] px-4 py-3" placeholder="VL-OBJ-..." />
            </label>

            <label className="grid gap-2 text-sm">
              Linked intake_id
              <input value={form.intake_id} onChange={(event) => setForm({ ...form, intake_id: event.target.value })} className="rounded-xl border border-[#D9DCE0] px-4 py-3" placeholder="intake_..." />
            </label>

            <label className="grid gap-2 text-sm">
              Usage
              <input value={form.usage} onChange={(event) => setForm({ ...form, usage: event.target.value })} className="rounded-xl border border-[#D9DCE0] px-4 py-3" placeholder="main / gallery / scene / mobile / social" />
            </label>

            <label className="grid gap-2 text-sm">
              Notes / alt text
              <textarea value={form.alt_text} onChange={(event) => setForm({ ...form, alt_text: event.target.value })} className="min-h-24 rounded-xl border border-[#D9DCE0] px-4 py-3 text-sm leading-7" />
              <span className="text-xs leading-5 text-[#6B7280]">写清楚素材用途、真实尺寸、是否白底、是否需 Air Engine 补边/换背景/低饱和处理。</span>
            </label>

            <label className="grid gap-2 text-sm">
              Tags
              <input value={form.tags} onChange={(event) => setForm({ ...form, tags: event.target.value })} className="rounded-xl border border-[#D9DCE0] px-4 py-3" placeholder="ceramic, main, approved" />
            </label>

            <button disabled={busy} type="submit" className="rounded-xl border border-[#2D333A] bg-[#2D333A] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
              {busy ? "Uploading..." : "Upload assets"}
            </button>

            {note ? <p className="rounded-xl border border-[#D9DCE0] bg-[#F5F6F8] p-3 text-sm leading-6 text-[#6B7280]">{note}</p> : null}
          </form>

          <section className="grid gap-5">
          <section className="rounded-2xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(45,51,58,0.08)]">
            <div className="border-b border-[#D9DCE0] pb-4">
              <p className="text-sm text-[#6B7280]">RI Real Asset System</p>
              <h2 className="mt-2 text-2xl font-semibold">素材尺寸锁死标准</h2>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">所有真实素材尽量按此上传。RI 靠光、空气、留白、呼吸、风和真实感，不靠单纯高清。</p>
            </div>
            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              {productMediaUploadSpecs.map((spec) => (
                <article key={spec.type} className="rounded-xl border border-[#D9DCE0] bg-[#F5F6F8] p-4 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold">{spec.title}</h3>
                    <span className="rounded-full bg-white px-2 py-1 text-xs text-[#6B7280]">{spec.type}</span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-[#6B7280]">{spec.usage}</p>
                  <ul className="mt-3 grid gap-1 text-xs leading-5 text-[#6B7280]">
                    {spec.specs.map((item) => <li key={item}>- {item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(45,51,58,0.08)]">
            <div className="flex flex-col gap-3 border-b border-[#D9DCE0] pb-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm text-[#6B7280]">Registry</p>
                <h2 className="mt-2 text-3xl font-semibold">Registered assets</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-[12rem_1fr]">
                <select value={scope} onChange={(event) => setScope(event.target.value as AssetScope)} className="rounded-xl border border-[#D9DCE0] bg-[#F5F6F8] px-4 py-3 text-sm">
                  {scopes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
                <input value={query} onChange={(event) => setQuery(event.target.value)} className="rounded-xl border border-[#D9DCE0] bg-[#F5F6F8] px-4 py-3 text-sm" placeholder="Search file, tag, object_id" />
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {rows.map((asset) => (
                <article key={asset.id} className="overflow-hidden rounded-2xl border border-[#D9DCE0] bg-[#F5F6F8]">
                  <div className="grid aspect-[4/3] place-items-center overflow-hidden bg-white">
                    {asset.mime_type?.startsWith("image/") && asset.public_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={asset.public_url} alt={asset.alt_text || asset.file_name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="px-4 text-center text-sm text-[#6B7280]">{asset.mime_type || "asset"}</span>
                    )}
                  </div>
                  <div className="grid gap-2 p-4 text-sm">
                    <div className="flex items-start justify-between gap-3">
                      <p className="min-w-0 truncate font-semibold">{asset.file_name}</p>
                      <span className="shrink-0 rounded-full bg-white px-2 py-1 text-xs text-[#6B7280]">{asset.scope}</span>
                    </div>
                    <p className="text-xs text-[#6B7280]">{asset.id}</p>
                    <p className="text-xs text-[#6B7280]">{formatSize(asset.size)} / {asset.status}</p>
                    {asset.object_id ? <p className="text-xs text-[#6B7280]">Object: {asset.object_id}</p> : null}
                    {asset.usage ? <p className="text-xs text-[#6B7280]">Usage: {asset.usage}</p> : null}
                    <div className="flex flex-wrap gap-2">
                      {(asset.tags || []).map((tag) => <span key={tag} className="rounded-full bg-white px-2 py-1 text-xs text-[#6B7280]">{tag}</span>)}
                    </div>
                    {asset.public_url ? <a href={asset.public_url} target="_blank" className="text-xs text-[#2D333A] underline-offset-4 hover:underline">Open asset URL</a> : null}
                  </div>
                </article>
              ))}
            </div>

            {rows.length === 0 ? <div className="mt-5 rounded-2xl border border-[#D9DCE0] bg-[#F5F6F8] p-5 text-sm text-[#6B7280]">No assets in this scope yet.</div> : null}
          </section>
          </section>
        </section>
      </section>
    </main>
  );
}

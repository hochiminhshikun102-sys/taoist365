"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type PublishedAdminObject = {
  object_id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  price: string;
  currency: string;
  inventory: number;
  category: string;
  collection?: string;
  commerce_channel?: string;
  goods_condition?: string;
  tags?: string[];
  status: string;
  buyer_id?: string;
  primary_image_url?: string;
  primary_media_url?: string;
  primary_media_type?: string;
  media?: Array<{ id: string; type: string; url: string; mime_type: string }>;
  published_at?: string;
  updated_at?: string;
};

const statuses = ["all", "published", "archived"] as const;

export function PublishedObjectsAdmin() {
  const [rows, setRows] = useState<PublishedAdminObject[]>([]);
  const [activeId, setActiveId] = useState("");
  const [status, setStatus] = useState<(typeof statuses)[number]>("published");
  const [query, setQuery] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [edit, setEdit] = useState({ price: "", inventory: "" });

  const active = useMemo(() => rows.find((row) => row.object_id === activeId) ?? rows[0] ?? null, [activeId, rows]);
  const stats = useMemo(() => ({
    total: rows.length,
    inStock: rows.filter((row) => Number(row.inventory) > 0).length,
    videoFirst: rows.filter((row) => String(row.primary_media_type || "").startsWith("video/")).length,
  }), [rows]);

  async function loadRows() {
    setNote("");
    const params = new URLSearchParams();
    params.set("status", status);
    if (query.trim()) params.set("q", query.trim());
    const response = await fetch(`/api/admin/objects?${params.toString()}`, { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) {
      setNote(data.error || "Unable to read published objects.");
      return;
    }
    const nextRows = data.rows || [];
    setRows(nextRows);
    const nextActive = nextRows.find((row: PublishedAdminObject) => row.object_id === activeId) ?? nextRows[0] ?? null;
    setActiveId(nextActive?.object_id || "");
    setEdit({ price: nextActive?.price || "", inventory: String(nextActive?.inventory ?? 0) });
  }

  useEffect(() => {
    void loadRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (active) setEdit({ price: active.price || "", inventory: String(active.inventory ?? 0) });
  }, [active?.object_id]);

  async function updateObject(nextStatus = active?.status || "published") {
    if (!active) return;
    setBusy(true);
    setNote("");
    const response = await fetch(`/api/admin/objects/${active.object_id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        status: nextStatus,
        price: edit.price,
        inventory: edit.inventory,
        admin_note: `OA object update: ${nextStatus}`,
      }),
    });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) {
      setNote(data.error || "Object update failed.");
      return;
    }
    setNote(`Updated ${data.object.object_id}.`);
    await loadRows();
  }

  return (
    <main className="min-h-dvh bg-[#F5F6F8] px-5 py-8 text-[#2D333A]">
      <section className="mx-auto grid w-full max-w-7xl gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#D9DCE0] pb-6">
          <div>
            <p className="text-sm text-[#6B7280]">Commerce Runtime</p>
            <h1 className="mt-2 text-4xl font-semibold">已发布商品</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6B7280]">管理已经生成 object_id 的商品。新商品从宝贝入库进入，审核通过后在这里维护库存、价格和上下架状态。</p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/admin/product-intake" className="rounded-xl border border-[#947A66] bg-[#947A66] px-4 py-3 text-white">宝贝入库</a>
            <a href="/admin/publish-review" className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 text-[#6B7280]">发布审核</a>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-3">
          <StatCard label="当前列表" value={String(stats.total)} />
          <StatCard label="有库存" value={String(stats.inStock)} />
          <StatCard label="首屏视频" value={String(stats.videoFirst)} />
        </section>

        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void loadRows(); }} className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 text-sm" placeholder="Search title, object_id, category, tag" />
          <div className="flex flex-wrap gap-2">
            {statuses.map((item) => (
              <button key={item} type="button" onClick={() => setStatus(item)} className={`rounded-full border px-4 py-2 text-sm ${status === item ? "border-[#2D333A] bg-[#2D333A] text-white" : "border-[#D9DCE0] bg-white"}`}>
                {item}
              </button>
            ))}
            <button type="button" onClick={loadRows} className="rounded-full border border-[#947A66] bg-[#947A66] px-4 py-2 text-sm text-white">刷新</button>
          </div>
        </div>

        <section className="grid gap-5 lg:grid-cols-[24rem_minmax(0,1fr)]">
          <div className="grid content-start gap-3">
            {rows.map((object) => (
              <button key={object.object_id} type="button" onClick={() => setActiveId(object.object_id)} className={`grid grid-cols-[4.5rem_1fr] gap-3 rounded-2xl border p-3 text-left ${active?.object_id === object.object_id ? "border-[#947A66] bg-[#F3ECE2]" : "border-[#D9DCE0] bg-white"}`}>
                <div className="relative h-20 overflow-hidden rounded-xl bg-[#EBEDEF]">
                  <Image src={object.primary_image_url || "/homepage-hero/windkeep-lantern-sea.png"} alt="" fill unoptimized className="object-cover" sizes="5rem" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{object.title}</p>
                  <p className="mt-1 text-xs text-[#6B7280]">{object.object_id}</p>
                  <p className="mt-2 text-xs text-[#6B7280]">{object.price} / 库存 {object.inventory} / {object.status || "published"}</p>
                </div>
              </button>
            ))}
            {rows.length === 0 ? <div className="rounded-2xl border border-[#D9DCE0] bg-white p-5 text-sm text-[#6B7280]">No published objects yet.</div> : null}
          </div>

          {active ? (
            <article className="rounded-2xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(45,51,58,0.08)]">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#D9DCE0] pb-5">
                <div>
                  <p className="text-sm text-[#6B7280]">{active.object_id} / {active.category}</p>
                  <h2 className="mt-2 text-3xl font-semibold">{active.title}</h2>
                  <p className="mt-2 text-sm text-[#6B7280]">{active.status || "published"} / {active.collection || "unset"} / {active.commerce_channel || "commerce_new"} / {active.goods_condition || "new"}</p>
                </div>
                <a href={`/objects/${active.object_id}`} className="rounded-xl border border-[#2D333A] px-4 py-3 text-sm">打开前台</a>
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[0.44fr_0.56fr]">
                <div>
                  <div className="relative min-h-80 overflow-hidden rounded-2xl bg-[#EBEDEF]">
                    <Image src={active.primary_image_url || "/homepage-hero/windkeep-lantern-sea.png"} alt="" fill unoptimized className="object-cover" sizes="36rem" />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(active.tags || []).map((tag) => <span key={tag} className="rounded-full bg-[#F5F6F8] px-3 py-1 text-xs text-[#6B7280]">{tag}</span>)}
                  </div>
                </div>

                <div className="grid gap-4">
                  <section className="rounded-2xl border border-[#D9DCE0] bg-[#F5F6F8] p-4">
                    <p className="text-sm font-semibold">商品维护</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <label className="grid gap-2 text-sm">价格<input value={edit.price} onChange={(event) => setEdit({ ...edit, price: event.target.value })} className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3" /></label>
                      <label className="grid gap-2 text-sm">库存<input value={edit.inventory} onChange={(event) => setEdit({ ...edit, inventory: event.target.value })} className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3" /></label>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button disabled={busy} type="button" onClick={() => updateObject(active.status || "published")} className="rounded-xl border border-[#2D333A] bg-[#2D333A] px-4 py-3 text-sm text-white disabled:opacity-50">保存价格库存</button>
                      <button disabled={busy} type="button" onClick={() => updateObject("archived")} className="rounded-xl border border-[#A05D4E] px-4 py-3 text-sm text-[#A05D4E] disabled:opacity-50">下架</button>
                      <button disabled={busy} type="button" onClick={() => updateObject("published")} className="rounded-xl border border-[#3E6446] px-4 py-3 text-sm text-[#3E6446] disabled:opacity-50">重新发布</button>
                    </div>
                    {note ? <p className="mt-4 text-sm text-[#6B7280]">{note}</p> : null}
                  </section>

                  <section className="rounded-2xl border border-[#D9DCE0] bg-[#F5F6F8] p-4">
                    <p className="text-sm font-semibold">素材概览</p>
                    <div className="mt-3 grid gap-2 text-sm text-[#6B7280]">
                      <p>Primary media: {active.primary_media_type || "image fallback"}</p>
                      <p>Media files: {active.media?.length || 0}</p>
                      <p className="line-clamp-4 leading-7">{active.description || "No description."}</p>
                    </div>
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

function StatCard({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <article className="rounded-2xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(45,51,58,0.06)]">
      <p className="text-sm text-[#6B7280]">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </article>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { formatPrice } from "@/config/operational-commerce";

type OrderItem = {
  object_id: string;
  title: string;
  quantity: number;
  price_cents: number;
};

type CommerceOrder = {
  id: string;
  order_id: string;
  status: string;
  payment_status: string;
  fulfillment_status: string;
  contact: { name: string; email: string; address: string; note?: string };
  items: OrderItem[];
  subtotal_cents: number;
  currency: string;
  note?: string;
  admin_note?: string;
  tracking?: string;
  created_at: string;
  updated_at: string;
};

const statuses = ["all", "request_received", "confirmed", "payment_pending", "paid", "packing", "shipped", "completed", "cancelled"] as const;

export function OrderAdminQueue() {
  const [rows, setRows] = useState<CommerceOrder[]>([]);
  const [activeId, setActiveId] = useState("");
  const [status, setStatus] = useState<(typeof statuses)[number]>("all");
  const [query, setQuery] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const active = useMemo(() => rows.find((row) => row.order_id === activeId) ?? rows[0] ?? null, [activeId, rows]);

  async function loadRows() {
    const params = new URLSearchParams();
    params.set("status", status);
    if (query.trim()) params.set("q", query.trim());
    const response = await fetch(`/api/admin/orders?${params.toString()}`, { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) {
      setNote(data.error || "Unable to read orders.");
      return;
    }
    setRows(data.rows || []);
    if (!activeId && data.rows?.[0]) setActiveId(data.rows[0].order_id);
  }

  useEffect(() => {
    void loadRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function updateOrder(nextStatus: string) {
    if (!active) return;
    setBusy(true);
    const response = await fetch(`/api/admin/orders/${active.order_id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: nextStatus, admin_note: note || `Order moved to ${nextStatus}.` }),
    });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) {
      setNote(data.error || "Order update failed.");
      return;
    }
    setNote(`Updated ${data.order.id}.`);
    await loadRows();
  }

  return (
    <main className="min-h-dvh bg-[#F5F6F8] px-5 py-8 text-[#2D333A]">
      <section className="mx-auto grid w-full max-w-7xl gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#D9DCE0] pb-6">
          <div>
            <p className="text-sm text-[#6B7280]">Commerce Runtime</p>
            <h1 className="mt-2 text-4xl font-semibold">订单系统</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280]">前台订单请求进入后台队列，先人工确认库存、地址、物流和支付。</p>
          </div>
          <button type="button" onClick={loadRows} className="rounded-xl border border-[#947A66] bg-[#947A66] px-4 py-3 text-sm text-white">刷新订单</button>
        </header>

        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void loadRows(); }} className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 text-sm" placeholder="Search order, email, object_id" />
          <div className="flex flex-wrap gap-2">
            {statuses.map((item) => (
              <button key={item} type="button" onClick={() => setStatus(item)} className={`rounded-full border px-4 py-2 text-sm ${status === item ? "border-[#2D333A] bg-[#2D333A] text-white" : "border-[#D9DCE0] bg-white"}`}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <section className="grid gap-5 lg:grid-cols-[24rem_minmax(0,1fr)]">
          <div className="grid content-start gap-3">
            {rows.map((row) => (
              <button key={row.order_id} type="button" onClick={() => setActiveId(row.order_id)} className={`rounded-2xl border p-4 text-left ${active?.order_id === row.order_id ? "border-[#947A66] bg-[#F3ECE2]" : "border-[#D9DCE0] bg-white"}`}>
                <p className="font-semibold">{row.id}</p>
                <p className="mt-1 text-sm text-[#6B7280]">{row.contact?.name} / {row.contact?.email}</p>
                <p className="mt-2 text-sm">{formatPrice(row.subtotal_cents)} · {row.status}</p>
              </button>
            ))}
            {rows.length === 0 ? <div className="rounded-2xl border border-[#D9DCE0] bg-white p-5 text-sm text-[#6B7280]">No order requests yet.</div> : null}
          </div>

          {active ? (
            <article className="rounded-2xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(45,51,58,0.08)]">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#D9DCE0] pb-5">
                <div>
                  <p className="text-sm text-[#6B7280]">{active.order_id}</p>
                  <h2 className="mt-2 text-3xl font-semibold">{active.id}</h2>
                  <p className="mt-2 text-sm text-[#6B7280]">{active.status} / {active.payment_status} / {active.fulfillment_status}</p>
                </div>
                <p className="text-2xl">{formatPrice(active.subtotal_cents)}</p>
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[0.45fr_0.55fr]">
                <section className="rounded-2xl border border-[#D9DCE0] bg-[#F5F6F8] p-4">
                  <p className="text-sm font-semibold">Contact</p>
                  <div className="mt-3 grid gap-2 text-sm leading-7 text-[#6B7280]">
                    <p>{active.contact.name}</p>
                    <p>{active.contact.email}</p>
                    <p className="whitespace-pre-wrap">{active.contact.address}</p>
                    {active.contact.note ? <p className="whitespace-pre-wrap">{active.contact.note}</p> : null}
                  </div>
                </section>

                <section className="rounded-2xl border border-[#D9DCE0] bg-[#F5F6F8] p-4">
                  <p className="text-sm font-semibold">Items</p>
                  <div className="mt-3 grid gap-3">
                    {active.items.map((item) => (
                      <div key={`${active.order_id}-${item.object_id}`} className="rounded-xl bg-white p-3 text-sm">
                        <p className="font-semibold">{item.quantity} x {item.title}</p>
                        <p className="mt-1 text-xs text-[#6B7280]">{item.object_id} / {formatPrice(item.price_cents * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <textarea value={note} onChange={(event) => setNote(event.target.value)} className="mt-5 min-h-24 w-full rounded-2xl border border-[#D9DCE0] p-4 text-sm leading-7" placeholder="Admin note / 跟进备注" />
              <div className="mt-4 flex flex-wrap gap-3">
                {statuses.filter((item) => item !== "all").map((item) => (
                  <button key={item} disabled={busy} type="button" onClick={() => updateOrder(item)} className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 text-sm disabled:opacity-50">
                    {item}
                  </button>
                ))}
              </div>
              {note ? <p className="mt-4 text-sm text-[#6B7280]">{note}</p> : null}
            </article>
          ) : null}
        </section>
      </section>
    </main>
  );
}

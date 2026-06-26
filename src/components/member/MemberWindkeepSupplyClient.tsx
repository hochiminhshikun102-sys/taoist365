"use client";

import Link from "next/link";
import { useState } from "react";
import { windkeepMemberSupplySourceTypes, type ObjectIntakeSourceType } from "@/config/object-intake-source-types";

type SubmitState = "ready" | "creating" | "drafting" | "submitting" | "done" | "error";

export function MemberWindkeepSupplyClient() {
  const [state, setState] = useState<SubmitState>("ready");
  const [note, setNote] = useState("");
  const [created, setCreated] = useState<{ intake_id: string; intake_no: string } | null>(null);
  const [form, setForm] = useState({
    source_type: "windkeep_member" as ObjectIntakeSourceType,
    original_title: "",
    original_description: "",
    original_price: "",
    location: "",
    source_url: "",
  });

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("creating");
    setNote("");
    setCreated(null);

    try {
      const createResponse = await fetch("/api/object-intakes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          source_platform: form.source_url ? "other" : "manual",
          submitted_by: "member-center",
          member_id: "member-preview",
          currency: "USD",
          category_hint: "wind-objects",
          inventory: 1,
          is_one_of_one: true,
        }),
      });
      const createData = await createResponse.json();
      if (!createResponse.ok) throw new Error(createData.error || "Unable to create Windkeep supply intake.");
      setCreated(createData);

      setState("drafting");
      const draftResponse = await fetch(`/api/object-intakes/${createData.intake_id}/ai-draft`, { method: "POST" });
      const draftData = await draftResponse.json();
      if (!draftResponse.ok) throw new Error(draftData.error || "Unable to generate intake draft.");

      setState("submitting");
      const reviewResponse = await fetch(`/api/object-intakes/${createData.intake_id}/submit-review`, { method: "POST" });
      const reviewData = await reviewResponse.json();
      if (!reviewResponse.ok) throw new Error(reviewData.error || "Unable to submit intake.");

      setState("done");
      setNote(`${createData.intake_no} submitted to the shared review queue as Windkeep supply.`);
    } catch (error) {
      setState("error");
      setNote(error instanceof Error ? error.message : "Windkeep supply failed.");
    }
  }

  return (
    <main className="min-h-dvh bg-[#F5F6F8] px-5 py-8 text-[#2D333A]">
      <section className="mx-auto grid w-full max-w-5xl gap-6">
        <header className="border-b border-[#D9DCE0] pb-6">
          <Link href="/account" className="text-sm text-[#6B7280]">Account</Link>
          <p className="mt-5 text-sm text-[#6B7280]">Member Center / Windkeep</p>
          <h1 className="mt-2 text-4xl font-semibold">Windkeep Supply</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280]">
            Member supply, consignment, and neighbor referral enter the secondhand Windkeep channel. New-goods commerce stays with OA and Wind Seeker.
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-[1fr_0.72fr]">
          <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(45,51,58,0.08)]">
            <label className="grid gap-2 text-sm">
              Supply Type
              <select value={form.source_type} onChange={(event) => update("source_type", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3">
                {windkeepMemberSupplySourceTypes.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm">Object Name<input required value={form.original_title} onChange={(event) => update("original_title", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" /></label>
            <label className="grid gap-2 text-sm">Story / Condition<textarea value={form.original_description} onChange={(event) => update("original_description", event.target.value)} className="min-h-28 rounded-xl border border-[#D9DCE0] px-4 py-3 leading-7" /></label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm">Expected Price<input value={form.original_price} onChange={(event) => update("original_price", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" /></label>
              <label className="grid gap-2 text-sm">Location<input value={form.location} onChange={(event) => update("location", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" /></label>
            </div>
            <label className="grid gap-2 text-sm">Source Link Optional<input value={form.source_url} onChange={(event) => update("source_url", event.target.value)} className="rounded-xl border border-[#D9DCE0] px-4 py-3" /></label>
            <button type="submit" disabled={state !== "ready" && state !== "done" && state !== "error"} className="rounded-xl border border-[#2D333A] bg-[#2D333A] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
              Submit to Windkeep Review
            </button>
          </form>

          <aside className="grid content-start gap-4 rounded-2xl border border-[#D9DCE0] bg-white p-5 text-sm leading-7 text-[#6B7280]">
            <p>Status: <strong className="text-[#2D333A]">{state}</strong></p>
            {note ? <p>{note}</p> : null}
            {created ? <Link href={`/account/windkeep-supply/detail?intakeId=${encodeURIComponent(created.intake_id)}`} className="text-[#947A66]">Open {created.intake_no}</Link> : null}
            <div className="rounded-xl bg-[#F5F6F8] p-4">
              <p className="font-semibold text-[#2D333A]">Identity guardrail</p>
              <p className="mt-2">This page writes `commerce_channel=windkeep_secondhand`, `goods_condition=preowned`, and `supply_program=windkeep`.</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";

type LegacySample = {
  id: string;
  title: string;
  note: string;
};

const legacySamples: readonly LegacySample[] = [
  { id: "lavender-jellyfish-front-129", title: "Lavender Jellyfish", note: "seasonal plush sample" },
  { id: "line-octopus-104", title: "Line Octopus", note: "wind object sample" },
  { id: "listening-moon-figure-105", title: "Listening Moon Figure", note: "quiet desk sample" },
  { id: "gray-room-companion-front-108-1", title: "Gray Room Companion", note: "gray room figure" },
  { id: "long-ear-jellyfish-103", title: "Long Ear Jellyfish", note: "soft jellyfish form" },
];

export function LegacyProductSampleTest() {
  const [busyId, setBusyId] = useState("");
  const [note, setNote] = useState("");

  async function createSample(sourceObjectId: string) {
    setBusyId(sourceObjectId);
    setNote("");

    try {
      const response = await fetch("/api/admin/object-intakes/from-existing-object", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ source_object_id: sourceObjectId, actor_id: "admin-os" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to create legacy product intake.");

      setNote(`Created ${data.intake_no}. Opening publish review...`);
      window.location.assign("/admin/publish-review");
    } catch (error) {
      setNote(error instanceof Error ? error.message : "Legacy product sample failed.");
      setBusyId("");
    }
  }

  return (
    <section className="grid gap-4 rounded-2xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(45,51,58,0.08)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#6B7280]">Legacy Product Sample Test</p>
          <h2 className="mt-2 text-2xl font-semibold">Create one intake from an existing object</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
            Use one legacy plush figure to test the intake, review, and Air Engine queue loop. This creates one review item and one Air Engine job; it does not publish or bulk import.
          </p>
        </div>
        <a href="/admin/ai-queue" className="rounded-xl border border-[#D9DCE0] bg-[#F5F6F8] px-4 py-3 text-sm text-[#2D333A]">
          Air Engine Queue
        </a>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {legacySamples.map((sample) => (
          <div key={sample.id} className="grid gap-3 rounded-xl border border-[#D9DCE0] bg-[#F8F5EF] p-4">
            <div>
              <p className="text-sm font-semibold">{sample.title}</p>
              <p className="mt-1 text-xs leading-5 text-[#6B7280]">{sample.id}</p>
              <p className="mt-2 text-xs text-[#6B7280]">{sample.note}</p>
            </div>
            <button
              type="button"
              disabled={Boolean(busyId)}
              onClick={() => createSample(sample.id)}
              className="rounded-xl border border-[#947A66] bg-[#947A66] px-3 py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              {busyId === sample.id ? "Creating..." : "Create Intake Test"}
            </button>
          </div>
        ))}
      </div>

      {note ? <p className="rounded-xl border border-[#D9DCE0] bg-[#F5F6F8] px-4 py-3 text-sm text-[#6B7280]">{note}</p> : null}
    </section>
  );
}

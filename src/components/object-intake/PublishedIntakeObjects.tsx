"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { PublishedObject } from "@/components/object-intake/ObjectIntakeTypes";

export function PublishedIntakeObjects() {
  const [rows, setRows] = useState<PublishedObject[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/public/objects", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        setNote(data.error || "Pipeline objects are not available.");
        return;
      }
      setRows(data.rows || []);
    }
    void load();
  }, []);

  if (!note && rows.length === 0) return null;

  return (
    <section className="ri-breath-section border-t border-[#d7e5ea]/58 py-10">
      <div className="mb-7 flex items-end justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-text-muted">Object Intake Pipeline</p>
          <h2 className="mt-3 font-[var(--font-display-serif)] text-3xl font-normal text-foreground">Newly published object_id entries.</h2>
        </div>
        <Link href="/admin/object-intakes" className="hidden text-sm text-text-muted hover:text-foreground sm:block">
          Review Queue
        </Link>
      </div>
      {note ? <p className="rounded-lg border border-[#d7e5ea]/50 bg-white/54 p-4 text-sm text-text-muted">{note}</p> : null}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((object) => (
          <Link key={object.object_id} href={`/objects/${object.object_id}`} className="quiet-air-touch browser-air-presence ri-image-climate overflow-hidden rounded-lg border border-[#c7d7df]/40 bg-white/66 shadow-[0_14px_38px_rgba(38,61,78,0.04)]">
            <div className="relative aspect-[4/3] bg-white/80">
              <Image src={object.primary_image_url || "/homepage-hero/windkeep-lantern-sea.png"} alt={object.title} fill unoptimized className="object-cover opacity-[0.88]" sizes="(max-width: 768px) 92vw, 22vw" />
            </div>
            <div className="p-5">
              <p className="text-xs text-text-muted">{object.object_id}</p>
              <h3 className="mt-3 text-xl leading-tight text-foreground">{object.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-7 text-text-secondary">{object.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <p className="text-sm text-foreground/72">{object.price}</p>
                <span className="rounded-full border border-[#d7e5ea]/58 bg-white/58 px-2.5 py-1 text-[0.68rem] text-text-muted">
                  pipeline-published
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

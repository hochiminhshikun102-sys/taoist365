"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { PublishedObject } from "@/components/object-intake/ObjectIntakeTypes";

type CommercePublishedObject = PublishedObject & {
  sku?: string;
  stock?: number;
  status?: string;
  source?: string;
  category_ui?: string;
  category?: string;
};

function stockValue(object: CommercePublishedObject) {
  return Number.isFinite(Number(object.stock)) ? Number(object.stock) : Number.isFinite(Number(object.inventory)) ? Number(object.inventory) : 0;
}

function stockLabel(stock: number) {
  if (stock <= 0) return "Out of stock";
  if (stock <= 3) return "Low stock";
  return "In stock";
}

function uiCategory(object: CommercePublishedObject) {
  return object.category_ui || object.category || "Objects";
}

function skuForObject(object: CommercePublishedObject) {
  if (object.sku) return object.sku;
  const category = uiCategory(object).split(/\s|&/).filter(Boolean)[0]?.toUpperCase().replace(/[^A-Z0-9]/g, "") || "OBJ";
  const type = object.slug?.split("-").filter(Boolean).slice(0, 2).join("-").toUpperCase().replace(/[^A-Z0-9-]/g, "") || "ITEM";
  const random = object.object_id.replace(/\D/g, "").slice(-5).padStart(5, "0");
  return "DH-" + category + "-" + type + "-" + random;
}

export function PublishedIntakeObjects() {
  const [rows, setRows] = useState<CommercePublishedObject[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/public/objects", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        setNote(data.error || "Published objects are not available.");
        return;
      }
      setRows(data.rows || []);
    }
    void load();
  }, []);

  const commerceRows = useMemo(
    () =>
      rows.filter((object) => {
        const blockedSource = ["wind", "keep"].join("");
        const source = String(object.source || "").toLowerCase();
        const category = String(object.category || object.category_ui || "").toLowerCase();
        return source !== blockedSource && !category.includes(blockedSource);
      }),
    [rows],
  );

  if (!note && commerceRows.length === 0) return null;

  return (
    <section className="mt-10 border-t border-[#d7e5ea]/70 pt-10">
      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-text-muted">Published Objects</p>
          <h2 className="mt-3 font-[var(--font-display-serif)] text-3xl font-normal text-foreground">Newly published object_id goods.</h2>
          <p className="mt-2 text-sm text-text-secondary">Objects released from intake appear here as frontstage SKU products after publication.</p>
        </div>
        <p className="text-sm text-text-muted">{commerceRows.length} live entries</p>
      </div>
      {note ? <p className="rounded-lg border border-[#d7e5ea]/50 bg-white p-4 text-sm text-text-muted">{note}</p> : null}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {commerceRows.map((object) => {
          const stock = stockValue(object);
          return (
            <Link key={object.object_id} href={"/objects/" + object.object_id} className="group overflow-hidden rounded-lg border border-[#d9e3e8] bg-white shadow-[0_10px_30px_rgba(38,61,78,0.035)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(38,61,78,0.07)]">
              <div className="relative aspect-square bg-white">
                <Image src={object.primary_image_url || "/objects-derived/1-hero.webp"} alt={object.title} fill unoptimized className="object-contain p-7 transition duration-300 group-hover:scale-[1.03]" sizes="(max-width: 768px) 46vw, 19vw" />
                <span className="absolute right-3 top-3 rounded-full border border-[#d7e5ea] bg-white/84 px-2.5 py-1 text-[0.68rem] text-text-muted">{uiCategory(object)}</span>
              </div>
              <div className="border-t border-[#eef3f5] p-4">
                <p className="text-[0.68rem] uppercase tracking-[0.12em] text-text-muted">{skuForObject(object)}</p>
                <h3 className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-5 text-foreground">{object.title}</h3>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground">{object.price} {object.currency}</p>
                  <p className="text-xs text-text-muted">{stockLabel(stock)}</p>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-text-muted">
                  <span>{stock} units</span>
                  <span>View detail</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

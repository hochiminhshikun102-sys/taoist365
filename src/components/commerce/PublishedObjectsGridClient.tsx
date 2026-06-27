"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  publicObjectImage,
  publicObjectInventoryLabel,
  publicObjectPath,
  publicObjectPriceLine,
  type PublicObject,
} from "@/lib/public-objects";

export function PublishedObjectsGridClient() {
  const [rows, setRows] = useState<PublicObject[]>([]);

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/public/objects?commerce_channel=commerce_new", { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json();
      setRows(data.rows || []);
    }
    void load();
  }, []);

  if (rows.length === 0) return null;

  return (
    <>
      {rows.map((object) => {
        const stock = Number(object.inventory || 0);
        return (
          <article
            key={object.object_id}
            className="group relative overflow-hidden rounded-xl border border-[#e6eaf0] bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(13,32,64,0.08)]"
          >
            <button type="button" aria-label={`Save ${object.title}`} className="absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-full text-[24px] leading-none text-[#2e4a7d] md:right-[14px] md:top-[14px]">
              {"\u2661"}
            </button>
            <Link href={publicObjectPath(object)} className="block">
              <div className="relative h-[150px] bg-[#f8fafc] md:h-[220px]">
                <Image
                  src={publicObjectImage(object)}
                  alt={object.title}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 768px) 44vw, (max-width: 1280px) 40vw, 320px"
                />
              </div>
              <div className="px-3 pb-4 md:px-5 md:pb-5">
                <p className="line-clamp-2 min-h-10 text-[14px] font-medium leading-5 text-[#1a2a44] md:min-h-12 md:text-[17px] md:leading-6">
                  {object.title}
                </p>
                <p className="mt-1.5 text-[15px] font-bold leading-6 text-[#0b1b33] md:text-[18px]">{publicObjectPriceLine(object)}</p>
                <div className="mt-1 flex items-center gap-2 text-[12.5px] leading-[18px] text-[#6b778c] md:text-[14px] md:leading-5">
                  <span className={`h-1.5 w-1.5 rounded-full ${stock > 0 ? "bg-[#2b6cb0]" : "bg-[#b8c0cb]"}`} />
                  <span>{publicObjectInventoryLabel(object)}</span>
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </>
  );
}

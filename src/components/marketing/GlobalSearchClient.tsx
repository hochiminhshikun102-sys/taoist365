"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { frontstageSearchEntries } from "@/config/frontstage-operations";
import type { PublishedObject } from "@/components/object-intake/ObjectIntakeTypes";

const entries = frontstageSearchEntries();

type SearchEntry = {
  id: string;
  type: string;
  title: string;
  summary: string;
  href: string;
  image?: string;
};

export function GlobalSearchClient() {
  const [query, setQuery] = useState("");
  const [publishedObjects, setPublishedObjects] = useState<SearchEntry[]>([]);
  const normalizedQuery = query.trim().toLowerCase();

  useEffect(() => {
    let cancelled = false;

    fetch("/api/public/objects?include_tests=1", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : { rows: [] }))
      .then((data: { rows?: PublishedObject[] }) => {
        if (cancelled) return;

        setPublishedObjects(
          (data.rows || []).map((object) => ({
            id: `published-${object.object_id}`,
            type: `Published object / ${object.object_id}`,
            title: object.title,
            summary: [
              object.subtitle,
              object.description,
              object.category,
              object.tags?.join(" "),
              object.object_id,
            ]
              .filter(Boolean)
              .join(" "),
            href: `/objects/${object.object_id}`,
            image: object.primary_image_url,
          })),
        );
      })
      .catch(() => {
        if (!cancelled) setPublishedObjects([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const allEntries = useMemo(() => [...publishedObjects, ...entries], [publishedObjects]);

  const results = useMemo(() => {
    if (!normalizedQuery) return allEntries.slice(0, 18);

    return allEntries
      .filter((entry) => `${entry.type} ${entry.title} ${entry.summary}`.toLowerCase().includes(normalizedQuery))
      .slice(0, 36);
  }, [allEntries, normalizedQuery]);

  return (
    <section className="space-y-6">
      <label className="block rounded-lg border border-border-subtle bg-white/56 p-4">
        <span className="text-xs uppercase tracking-[0.12em] text-text-muted">Search</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="wind bell, desk, linen, draw..."
          className="mt-3 w-full border-0 bg-transparent text-2xl text-foreground outline-none placeholder:text-text-muted/45"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((entry) => (
          <Link key={entry.id} href={entry.href} className="quiet-air-touch rounded-lg border border-border-subtle bg-white/50 p-4 transition hover:bg-white/70">
            {entry.image ? (
              <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-md border border-border-subtle bg-white">
                <Image src={entry.image} alt="" fill className="object-cover opacity-[0.88]" sizes="(max-width: 768px) 90vw, 30vw" />
              </div>
            ) : null}
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">{entry.type}</p>
            <h2 className="mt-2 text-lg leading-tight text-foreground">{entry.title}</h2>
            <p className="mt-3 line-clamp-3 text-sm leading-7 text-text-secondary">{entry.summary}</p>
          </Link>
        ))}
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border border-border-subtle bg-white/48 p-5">
          <p className="text-sm leading-7 text-text-secondary">No exact match. Try a material, room, object type, or collection name.</p>
        </div>
      ) : null}
    </section>
  );
}

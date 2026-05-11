"use client";

import Link from "next/link";
import { useMemo } from "react";
import { type AmbientAnchor, useAmbientAnchor } from "@/lib/ambient-anchor";
import { resolvePreferredShelfId, type TemporalBand } from "@/lib/temporal-band";
import { useTemporalBandValue } from "@/components/ritual/TemporalBandRoot";
import { livedWithLine } from "@/data/human-object-relationship/system";
import type { RitualInventoryItem } from "@/data/ritual-inventory/system";
import { ritualCatalogEchoByInventoryId } from "@/data/taoist365-objects-collection/ritual-catalog-echo";
import { applySlowShelfDrift, circulationEchoForInventoryId } from "@/data/living-presence-runtime/system";
import { useWorldRuntime } from "@/lib/use-world-runtime";

interface RitualShelfProps {
  title?: string;
  items: RitualInventoryItem[];
  note?: string;
  /** When true, quiet links to /objects#… where ritual ids map to catalog (no pitch). */
  showCatalogEcho?: boolean;
}

/** Temporal light on the same lived-with object — not a separate “effect voice”. */
function tactileFor(itemId: string, band: TemporalBand): string {
  const base = livedWithLine(itemId);
  if (band === "night" || band === "evening") {
    if (itemId === "tea-cup-warmth") {
      return "Set back before it dried; after dark the rim cools first while the base still holds a little warmth.";
    }
    if (itemId === "linen-sheet-edge") {
      return "Left half-open; the loose edge eases a little further into night air.";
    }
  }
  if (band === "morning" || band === "midday") {
    if (itemId === "folded-paper-note") {
      return "Stopped mid-fold; morning light finds the fibers a little drier, still unsmoothed.";
    }
    if (itemId === "ceramic-window-bowl") {
      return "Sits nearer the glass; thinner morning light keeps the glaze matte where the sill reaches.";
    }
  }
  if (band === "afternoon") {
    if (itemId === "wood-light-line") {
      return "Stays along the same board; afternoon gathers warmth in one patient band along the grain.";
    }
  }
  return base;
}

function orderShelfForAtmosphere<T extends { id: string }>(
  items: readonly T[],
  anchor: AmbientAnchor,
  band: TemporalBand,
): T[] {
  const idSet = new Set(items.map((i) => i.id));
  const preferred = resolvePreferredShelfId(anchor, band, idSet);
  if (!preferred) return [...items];
  const match = items.filter((i) => i.id === preferred);
  const rest = items.filter((i) => i.id !== preferred);
  return [...match, ...rest];
}

export function RitualShelf({ title = "Around the room", items, note, showCatalogEcho = true }: RitualShelfProps) {
  const anchor = useAmbientAnchor();
  const band = useTemporalBandValue();
  const { presence, rhythm, inertia, structuralSilence } = useWorldRuntime();
  const dayKey = presence.dayKey;
  const ordered = useMemo(() => {
    const drifted = applySlowShelfDrift(items, dayKey);
    return orderShelfForAtmosphere(drifted, anchor, band);
  }, [items, anchor, band, dayKey]);

  const circulationEcho = useMemo(
    () => (ordered[0] ? circulationEchoForInventoryId(ordered[0].id, dayKey) : null),
    [ordered, dayKey],
  );

  return (
    <section className="living-shelf taoist-quiet-field mt-5 rounded-xl border border-border-subtle bg-surface px-4 py-5 sm:px-5">
      <p className="text-xs text-text-muted/82">{title}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {ordered.map((item) => {
          const echoes = showCatalogEcho ? ritualCatalogEchoByInventoryId[item.id] : undefined;
          return (
            <article
              key={item.id}
              className="rounded-lg border border-border-subtle bg-surface px-3 py-3 sm:px-4"
            >
              <p className="text-sm leading-8 text-text-secondary">{item.name}</p>
              <p className="mt-1 text-[0.7rem] leading-5 text-text-muted/75">{tactileFor(item.id, band)}</p>
              {echoes?.length ? (
                <ul className="mt-2 space-y-1 border-t border-border-subtle/14 pt-2">
                  {echoes.map((echo) => (
                    <li key={echo.catalogId} className="text-[0.62rem] leading-5 text-text-muted/58">
                      {echo.line}{" "}
                      <Link className="text-text-muted/72 underline-offset-2 hover:underline" href={`/objects#${echo.catalogId}`}>
                        catalog anchor
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          );
        })}
      </div>
      {note ? <p className="mt-4 text-xs leading-7 text-text-muted/90">{note}</p> : null}
      {circulationEcho && !structuralSilence.structuralAbsence.hideRitualTrace ? (
        <p className="mt-3 text-[0.65rem] leading-6 text-text-muted/56">{circulationEcho}</p>
      ) : null}
      <p className="mt-3 text-[0.62rem] leading-6 text-text-muted/50">{rhythm.unfinishedLine}</p>
      {!structuralSilence.structuralAbsence.hideRitualTrace ? (
        <p className="mt-2 text-[0.62rem] leading-6 text-text-muted/46">{inertia.ritualSilenceLine}</p>
      ) : null}
    </section>
  );
}

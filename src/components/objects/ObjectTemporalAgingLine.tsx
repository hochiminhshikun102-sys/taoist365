"use client";

import { pickObjectAgingLine } from "@/data/living-presence-runtime/system";
import { pickObjectTouchSediment } from "@/data/world-materialization/object-touch-sediment";
import { useWorldRuntime } from "@/lib/use-world-runtime";

type Props = { catalogPieceId: string };

/** Thin aging residue - materials continuing, not heritage branding. */
export function ObjectTemporalAgingLine({ catalogPieceId }: Props) {
  const { presence, aging } = useWorldRuntime();
  const dayKey = presence.dayKey;
  const line = pickObjectAgingLine(catalogPieceId, dayKey);
  const touch = pickObjectTouchSediment(catalogPieceId, aging.ageStateId, dayKey);

  return (
    <div className="mt-2 space-y-1.5">
      <p className="text-[0.62rem] leading-5 text-text-muted/46 italic">{line}</p>
      <p className="text-[0.6rem] leading-[1.55] text-text-muted/42">{touch}</p>
    </div>
  );
}

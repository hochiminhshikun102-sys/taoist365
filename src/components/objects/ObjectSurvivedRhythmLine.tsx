"use client";

import { pickObjectSurvivedRhythm } from "@/data/human-rhythm-runtime/system";
import { useWorldRuntime } from "@/lib/use-world-runtime";

type Props = { catalogPieceId: string };

export function ObjectSurvivedRhythmLine({ catalogPieceId }: Props) {
  const { presence, rhythm, aging, inertia, lowSignalHumanity } = useWorldRuntime();
  const line = pickObjectSurvivedRhythm(catalogPieceId, presence.dayKey, rhythm.worldId);

  return (
    <p className="mt-2 text-[0.62rem] leading-5 text-text-muted/48">
      Rhythm in the room · {line} {aging.backgroundObjectLine} {inertia.objectPermanenceLine} {lowSignalHumanity.objectBackgroundLine}
    </p>
  );
}

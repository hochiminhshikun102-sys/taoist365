import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export type AntiDramaAudit = {
  allowPoeticDensity: boolean;
  allowLonelinessTone: boolean;
  maxEmotiveBlocks: number;
  note: string;
};

export function antiDrama(age: WorldAgeStateId): AntiDramaAudit {
  const strict = age === "worn-in-cycle" || age === "old-browser-period" || age === "long-static-period";
  return strict
    ? {
        allowPoeticDensity: false,
        allowLonelinessTone: false,
        maxEmotiveBlocks: 1,
        note: "Keep language ordinary, low-drama, and minimally self-aware.",
      }
    : {
        allowPoeticDensity: false,
        allowLonelinessTone: false,
        maxEmotiveBlocks: 2,
        note: "Avoid stage-lit framing; prefer plain long-term residue language.",
      };
}

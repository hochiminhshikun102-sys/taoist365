import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import { dailyIndex } from "@/lib/living-day-key";

export type ResidueSuppressionTier = "off" | "light" | "strong";

export function residueSuppressionTier(
  age: WorldAgeStateId,
  dayKey: string,
  structural: StructuralSilenceBundle,
): ResidueSuppressionTier {
  const i = dailyIndex(`${dayKey}:res-supp:${age}`, 100);
  const fat = structural.explanationFatigue;
  const tired = fat.ritual === "minimal" && fat.mail === "minimal" && fat.objects === "minimal";
  if (tired && i > 55) return "strong";
  if (i > 72 || fat.mail === "minimal") return "light";
  return "off";
}

export function residueSuppressionLine(tier: ResidueSuppressionTier): string | null {
  if (tier === "off") return null;
  if (tier === "light") return "Some residue lines stay back today—world not re-explaining every echo.";
  return "Heavy residue suppression: fewer stacked echoes; silence carries continuity.";
}

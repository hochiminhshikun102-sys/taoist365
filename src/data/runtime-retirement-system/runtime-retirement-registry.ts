import { dailyIndex } from "@/lib/living-day-key";

export type RuntimeChannelId =
  | "guidanceResidue"
  | "humanTraces"
  | "ritualTeaching"
  | "mailExplain"
  | "objectMemory"
  | "browserRevisit";

export type RetirementPhase = "foreground" | "passive" | "residualOnly" | "backgroundPermanent" | "retired" | "archivePresence";

export type ChannelRetirement = Record<RuntimeChannelId, RetirementPhase>;

function phaseFromRank(r: number): RetirementPhase {
  if (r > 0.85) return "retired";
  if (r > 0.7) return "backgroundPermanent";
  if (r > 0.52) return "residualOnly";
  if (r > 0.35) return "passive";
  return "foreground";
}

export function resolveRuntimeRetirementRegistry(dayKey: string, pressure: number): ChannelRetirement {
  const h = dailyIndex(`${dayKey}:rr-reg`, 100);
  const rank = (offset: number) => Math.min(1, pressure + offset * 0.04 + (h > 70 ? 0.12 : 0));
  return {
    guidanceResidue: phaseFromRank(rank(0)),
    humanTraces: phaseFromRank(rank(1)),
    ritualTeaching: phaseFromRank(rank(0)),
    mailExplain: phaseFromRank(rank(1)),
    objectMemory: phaseFromRank(rank(2)),
    browserRevisit: phaseFromRank(rank(0)),
  };
}

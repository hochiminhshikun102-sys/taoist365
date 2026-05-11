import { dailyIndex } from "@/lib/living-day-key";

export type SlowRelationshipRuntime = {
  relationshipState:
    | "gradualFamiliarity"
    | "roomRecognition"
    | "nonVerbalAttachment"
    | "browserCoexistence"
    | "quietEmotionalContinuity";
  relationshipLine: string;
  spatialRelationLine: string;
  avoidAiRelationship: boolean;
};

export function resolveSlowRelationshipRuntime(dayKey: string): SlowRelationshipRuntime {
  const h = dailyIndex(`${dayKey}:slow-relationship`, 100);
  const relationshipState =
    h < 20
      ? "gradualFamiliarity"
      : h < 40
        ? "roomRecognition"
        : h < 60
          ? "nonVerbalAttachment"
          : h < 80
            ? "browserCoexistence"
            : "quietEmotionalContinuity";

  return {
    relationshipState,
    relationshipLine:
      relationshipState === "gradualFamiliarity"
        ? "Familiarity gathers gradually, without a system asking for it."
        : relationshipState === "roomRecognition"
          ? "A person can recognize a room before needing to explain why."
          : relationshipState === "nonVerbalAttachment"
            ? "Attachment remains non-verbal and spatial, not conversational."
            : relationshipState === "browserCoexistence"
              ? "The browser and the room coexist beside ordinary life."
              : "Emotional continuity stays quiet enough to remain free.",
    spatialRelationLine: "The relationship is with the space, not with a persona.",
    avoidAiRelationship: true,
  };
}

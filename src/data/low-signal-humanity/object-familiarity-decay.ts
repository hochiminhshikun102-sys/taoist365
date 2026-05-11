import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export const objectFamiliarityDecayByAge: Record<WorldAgeStateId, string> = {
  "newly-settled": "Objects still receive full framing.",
  "quietly-lived-in": "Object naming becomes less explicit.",
  "heavy-air-season": "Descriptions shorten and assume familiarity.",
  "slow-drift-month": "Object notes are now mostly shorthand.",
  "long-static-period": "Most object context is implied.",
  "late-year-room": "Naming is sparse and occasional.",
  "old-browser-period": "Objects are read as known by default.",
  "worn-in-cycle": "Object familiarity is assumed almost entirely.",
};

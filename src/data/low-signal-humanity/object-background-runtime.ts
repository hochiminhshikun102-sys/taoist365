import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export const objectBackgroundRuntimeByAge: Record<WorldAgeStateId, string> = {
  "newly-settled": "Object layer still reads foreground.",
  "quietly-lived-in": "Tray and mug start to behave as defaults.",
  "heavy-air-season": "Linen and paper shift into room texture.",
  "slow-drift-month": "Object layer is mostly background support.",
  "long-static-period": "Objects now anchor layout more than copy.",
  "late-year-room": "Object emphasis continues thinning.",
  "old-browser-period": "Objects persist with little active framing.",
  "worn-in-cycle": "Object presence is infrastructural.",
};

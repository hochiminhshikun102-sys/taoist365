import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export const objectBackgroundingByAge: Record<WorldAgeStateId, string> = {
  "newly-settled": "Objects are still described directly.",
  "quietly-lived-in": "Objects are less centered and more positional.",
  "heavy-air-season": "Objects are treated as room surfaces first.",
  "slow-drift-month": "Objects are increasingly backgrounded.",
  "long-static-period": "Mug and tray now read as page infrastructure.",
  "late-year-room": "Linen and notebook are mostly implied, not highlighted.",
  "old-browser-period": "Objects remain visible but rarely foregrounded.",
  "worn-in-cycle": "Object layer now behaves like stable room geometry.",
};

"use client";

import { useWorldRuntime } from "@/lib/use-world-runtime";
import type { LivingPresenceBundle } from "@/data/living-presence-runtime/system";

/** Same-day climate bundle — prefer `useWorldRuntime` when you also need human rhythm. */
export function useLivingPresenceRuntime(): LivingPresenceBundle {
  return useWorldRuntime().presence;
}

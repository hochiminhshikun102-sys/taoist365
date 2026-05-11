import { dailyIndex } from "@/lib/living-day-key";
import type { WorldStateId } from "@/data/living-presence-runtime/same-day-world-state";
import type { BackgroundPageDensity } from "./background-page-density";

const energies: readonly BackgroundPageDensity[] = ["low", "quiet", "heavy", "thin", "faded", "still", "warm", "empty", "residual"];

export function pageEnergy(dayKey: string, worldStateId: WorldStateId): BackgroundPageDensity {
  return energies[dailyIndex(dayKey + ":page-energy:" + worldStateId, energies.length)]!;
}

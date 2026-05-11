import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import { taoist365ObjectsCatalog } from "@/data/taoist365-objects-collection/system";
import { dailyIndex } from "@/lib/living-day-key";
import { materialImperfectionLine } from "./material-imperfection";
import { objectQuietRetirementLine } from "./object-retirement";
import { objectRestStateLine } from "./object-rest-state";
import { ownershipTransferLine } from "./ownership-transfer-runtime";
import { realAvailabilityLine } from "./real-availability";
import { realObjectDisappearanceLine } from "./real-object-disappearance";
import { realStorageRealityLine } from "./real-storage-reality";
import { shelfThinningLine } from "./shelf-thinning";
import { smallBatchAgingLine } from "./small-batch-aging";

export type RealObjectPresenceBundle = {
  dayKey: string;
  shelfThinningLine: string;
  smallBatchAgingLine: string;
  objectQuietRetirementLine: string;
  realObjectDisappearanceLine: string;
  materialImperfectionLine: string;
  ownershipTransferLine: string;
  realStorageRealityLine: string;
  objectRestStateLine: string;
  /** One catalog anchor line when day picks it */
  catalogEchoLine: string | null;
};

export function resolveRealObjectPresenceBundle(dayKey: string, aging: WorldAgingBundle): RealObjectPresenceBundle {
  void aging;
  const idx = dailyIndex(`${dayKey}:rop-echo`, taoist365ObjectsCatalog.length);
  const piece = taoist365ObjectsCatalog[idx];
  const catalogEchoLine = realAvailabilityLine(piece?.id ?? "", dayKey);
  return {
    dayKey,
    shelfThinningLine: shelfThinningLine(dayKey),
    smallBatchAgingLine: smallBatchAgingLine(),
    objectQuietRetirementLine: objectQuietRetirementLine(),
    realObjectDisappearanceLine: realObjectDisappearanceLine(),
    materialImperfectionLine: materialImperfectionLine(),
    ownershipTransferLine: ownershipTransferLine(),
    realStorageRealityLine: realStorageRealityLine(),
    objectRestStateLine: objectRestStateLine(),
    catalogEchoLine,
  };
}

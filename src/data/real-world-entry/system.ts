import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import { dailyForgetfulnessLine } from "./daily-forgetfulness";
import { mailToRoomTransitionLine } from "./mail-to-room-transition";
import { objectBecomesNormalLine } from "./object-becomes-normal";
import { objectNoLongerSpecialLine } from "./object-no-longer-special";
import { ordinaryUseTransferLine } from "./ordinary-use-transfer";
import { realObjectOwnershipLine } from "./real-object-ownership";
import { realRoomEntryLine } from "./real-room-entry";

export type RealWorldEntryBundle = {
  dayKey: string;
  realRoomEntryLine: string;
  realObjectOwnershipLine: string;
  ordinaryUseTransferLine: string;
  mailToRoomTransitionLine: string;
  objectBecomesNormalLine: string;
  dailyForgetfulnessLine: string;
  objectNoLongerSpecialLine: string;
};

export function resolveRealWorldEntryBundle(structuralSilence: StructuralSilenceBundle): RealWorldEntryBundle {
  return {
    dayKey: structuralSilence.dayKey,
    realRoomEntryLine: realRoomEntryLine(),
    realObjectOwnershipLine: realObjectOwnershipLine(),
    ordinaryUseTransferLine: ordinaryUseTransferLine(),
    mailToRoomTransitionLine: mailToRoomTransitionLine(),
    objectBecomesNormalLine: objectBecomesNormalLine(),
    dailyForgetfulnessLine: dailyForgetfulnessLine(),
    objectNoLongerSpecialLine: objectNoLongerSpecialLine(),
  };
}

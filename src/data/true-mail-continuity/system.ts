import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import { longThreadSedimentLine } from "./long-thread-runtime";
import { mailPausesLine } from "./mail-pauses";
import { noServicePipelineLine } from "./no-service-pipeline";
import { oldThreadReopenLine } from "./old-thread-reopen";
import { plainHumanReplyLine } from "./plain-human-reply";
import { shelfRevisitLine } from "./shelf-revisit-runtime";
import { slowReplyRealityLine } from "./slow-reply-reality";
import { unevenCorrespondenceLine } from "./uneven-correspondence";

export type TrueMailContinuityBundle = {
  dayKey: string;
  longThreadSedimentLine: string;
  slowReplyRealityLine: string;
  unevenCorrespondenceLine: string;
  shelfRevisitLine: string;
  mailPausesLine: string;
  oldThreadReopenLine: string;
  plainHumanReplyLine: string;
  noServicePipelineLine: string;
};

export function resolveTrueMailContinuityBundle(structuralSilence: StructuralSilenceBundle): TrueMailContinuityBundle {
  return {
    dayKey: structuralSilence.dayKey,
    longThreadSedimentLine: longThreadSedimentLine(),
    slowReplyRealityLine: slowReplyRealityLine(),
    unevenCorrespondenceLine: unevenCorrespondenceLine(),
    shelfRevisitLine: shelfRevisitLine(),
    mailPausesLine: mailPausesLine(),
    oldThreadReopenLine: oldThreadReopenLine(),
    plainHumanReplyLine: plainHumanReplyLine(),
    noServicePipelineLine: noServicePipelineLine(),
  };
}

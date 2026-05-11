import { mailBackgroundContinuityLine } from "./mail-background-continuity";
import { mailNoResolutionLine } from "./mail-no-resolution";
import { mailNonServiceMemoryLine } from "./mail-non-service-memory";
import { mailOrdinarySedimentLine } from "./mail-ordinary-sediment";
import { mailPassiveCorrespondenceLine } from "./mail-passive-correspondence";
import { mailPermanentPresenceLine } from "./mail-permanent-presence";
import { mailQuietDefaultnessLine } from "./mail-quiet-defaultness";
import { mailThreadSilenceLine } from "./mail-thread-silence";
import { mailThreadWeatheringLine } from "./mail-thread-weathering";

export type MailPermanentThreadBundle = {
  mailPermanentPresenceLine: string;
  mailThreadSilenceLine: string;
  mailNoResolutionLine: string;
  mailOrdinarySedimentLine: string;
  mailNonServiceMemoryLine: string;
  mailBackgroundContinuityLine: string;
  mailQuietDefaultnessLine: string;
  mailPassiveCorrespondenceLine: string;
  mailThreadWeatheringLine: string;
};

export function resolveMailPermanentThreadBundle(): MailPermanentThreadBundle {
  return {
    mailPermanentPresenceLine: mailPermanentPresenceLine(),
    mailThreadSilenceLine: mailThreadSilenceLine(),
    mailNoResolutionLine: mailNoResolutionLine(),
    mailOrdinarySedimentLine: mailOrdinarySedimentLine(),
    mailNonServiceMemoryLine: mailNonServiceMemoryLine(),
    mailBackgroundContinuityLine: mailBackgroundContinuityLine(),
    mailQuietDefaultnessLine: mailQuietDefaultnessLine(),
    mailPassiveCorrespondenceLine: mailPassiveCorrespondenceLine(),
    mailThreadWeatheringLine: mailThreadWeatheringLine(),
  };
}

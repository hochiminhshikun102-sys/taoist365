import { mailAmbientHumanityLine } from "./mail-ambient-humanity";
import { mailBackgroundPresenceLine } from "./mail-background-presence";
import { mailNoResolutionRuntimeLine } from "./mail-no-resolution-runtime";
import { mailNonServiceDefaultnessLine } from "./mail-non-service-defaultness";
import { mailPassiveThreadLine } from "./mail-passive-thread";
import { mailQuietReturnLine } from "./mail-quiet-return";
import { mailRoomContinuityLine } from "./mail-room-continuity";
import { mailShelfPresenceLine } from "./mail-shelf-presence";
import { mailThreadWeatherLine } from "./mail-thread-weather";

export type MailBackgroundContinuityBundle = {
  mailBackgroundPresenceLine: string;
  mailThreadWeatherLine: string;
  mailRoomContinuityLine: string;
  mailPassiveThreadLine: string;
  mailNonServiceDefaultnessLine: string;
  mailShelfPresenceLine: string;
  mailAmbientHumanityLine: string;
  mailNoResolutionRuntimeLine: string;
  mailQuietReturnLine: string;
};

export function resolveMailBackgroundContinuityBundle(): MailBackgroundContinuityBundle {
  return {
    mailBackgroundPresenceLine: mailBackgroundPresenceLine(),
    mailThreadWeatherLine: mailThreadWeatherLine(),
    mailRoomContinuityLine: mailRoomContinuityLine(),
    mailPassiveThreadLine: mailPassiveThreadLine(),
    mailNonServiceDefaultnessLine: mailNonServiceDefaultnessLine(),
    mailShelfPresenceLine: mailShelfPresenceLine(),
    mailAmbientHumanityLine: mailAmbientHumanityLine(),
    mailNoResolutionRuntimeLine: mailNoResolutionRuntimeLine(),
    mailQuietReturnLine: mailQuietReturnLine(),
  };
}

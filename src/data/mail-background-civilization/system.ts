import { ambientMailDefaultnessLine } from "./ambient-mail-defaultness";
import { backgroundThreadEquilibriumLine } from "./background-thread-equilibrium";
import { longLivedMailBalanceLine } from "./long-lived-mail-balance";
import { mailCivilizationRuntimeLine } from "./mail-civilization-runtime";
import { mailRetreatGovernorLine } from "./mail-retreat-governor";
import { mailSilencePressureLine } from "./mail-silence-pressure";
import { nonServiceCorrespondenceLine } from "./non-service-correspondence";
import { passiveThreadCivilizationLine } from "./passive-thread-civilization";
import { threadAgingEquilibriumLine } from "./thread-aging-equilibrium";

export type MailBackgroundCivilizationBundle = {
  mailCivilizationRuntimeLine: string;
  backgroundThreadEquilibriumLine: string;
  mailRetreatGovernorLine: string;
  ambientMailDefaultnessLine: string;
  mailSilencePressureLine: string;
  threadAgingEquilibriumLine: string;
  nonServiceCorrespondenceLine: string;
  passiveThreadCivilizationLine: string;
  longLivedMailBalanceLine: string;
};

export function resolveMailBackgroundCivilizationBundle(): MailBackgroundCivilizationBundle {
  return {
    mailCivilizationRuntimeLine: mailCivilizationRuntimeLine(),
    backgroundThreadEquilibriumLine: backgroundThreadEquilibriumLine(),
    mailRetreatGovernorLine: mailRetreatGovernorLine(),
    ambientMailDefaultnessLine: ambientMailDefaultnessLine(),
    mailSilencePressureLine: mailSilencePressureLine(),
    threadAgingEquilibriumLine: threadAgingEquilibriumLine(),
    nonServiceCorrespondenceLine: nonServiceCorrespondenceLine(),
    passiveThreadCivilizationLine: passiveThreadCivilizationLine(),
    longLivedMailBalanceLine: longLivedMailBalanceLine(),
  };
}

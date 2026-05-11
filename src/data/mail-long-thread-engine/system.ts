import { mailBackgroundThreadingLine } from "./mail-background-threading";
import { mailLowExplanationLine } from "./mail-low-explanation";
import { mailNoStartNoEndLine } from "./mail-no-start-no-end";
import { mailNonServiceRuntimeLine } from "./mail-non-service-runtime";
import { mailOrdinaryReturnLine } from "./mail-ordinary-return";
import { mailPresenceWithoutFollowupLine } from "./mail-presence-without-followup";
import { mailShelfAgingLine } from "./mail-shelf-aging";
import { mailSoftContinuationLine } from "./mail-soft-continuation";
import { mailThreadDefaultnessLine } from "./mail-thread-defaultness";

export type MailLongThreadEngineBundle = {
  mailThreadDefaultnessLine: string;
  mailNoStartNoEndLine: string;
  mailShelfAgingLine: string;
  mailSoftContinuationLine: string;
  mailLowExplanationLine: string;
  mailOrdinaryReturnLine: string;
  mailNonServiceRuntimeLine: string;
  mailPresenceWithoutFollowupLine: string;
  mailBackgroundThreadingLine: string;
};

export function resolveMailLongThreadEngineBundle(): MailLongThreadEngineBundle {
  return {
    mailThreadDefaultnessLine: mailThreadDefaultnessLine(),
    mailNoStartNoEndLine: mailNoStartNoEndLine(),
    mailShelfAgingLine: mailShelfAgingLine(),
    mailSoftContinuationLine: mailSoftContinuationLine(),
    mailLowExplanationLine: mailLowExplanationLine(),
    mailOrdinaryReturnLine: mailOrdinaryReturnLine(),
    mailNonServiceRuntimeLine: mailNonServiceRuntimeLine(),
    mailPresenceWithoutFollowupLine: mailPresenceWithoutFollowupLine(),
    mailBackgroundThreadingLine: mailBackgroundThreadingLine(),
  };
}

import { mailDefaultingLine } from "./mail-defaulting";
import { oldThreadRuntimeLine } from "./old-thread-runtime";
import { quietHumanReplyLine } from "./quiet-human-reply";
import { shelfAgingRuntimeLine } from "./shelf-aging-runtime";
import { slowReopenRuntimeLine } from "./slow-reopen-runtime";
import { subjectFamiliarityLine } from "./subject-familiarity";
import { threadBackgroundingLine } from "./thread-backgrounding";
import { unevenReplyRuntimeLine } from "./uneven-reply-runtime";

export type MailThreadAgingBundle = {
  oldThreadRuntimeLine: string;
  slowReopenRuntimeLine: string;
  subjectFamiliarityLine: string;
  mailDefaultingLine: string;
  unevenReplyRuntimeLine: string;
  shelfAgingRuntimeLine: string;
  quietHumanReplyLine: string;
  threadBackgroundingLine: string;
};

export function resolveMailThreadAgingBundle(): MailThreadAgingBundle {
  return {
    oldThreadRuntimeLine: oldThreadRuntimeLine(),
    slowReopenRuntimeLine: slowReopenRuntimeLine(),
    subjectFamiliarityLine: subjectFamiliarityLine(),
    mailDefaultingLine: mailDefaultingLine(),
    unevenReplyRuntimeLine: unevenReplyRuntimeLine(),
    shelfAgingRuntimeLine: shelfAgingRuntimeLine(),
    quietHumanReplyLine: quietHumanReplyLine(),
    threadBackgroundingLine: threadBackgroundingLine(),
  };
}

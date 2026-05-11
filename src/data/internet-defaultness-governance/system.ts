import { ambientTabGovernanceLine } from "./ambient-tab-governance";
import { browserBackgroundGovernanceLine } from "./browser-background-governance";
import { browserPresenceGovernorLine } from "./browser-presence-governor";
import { defaultOpenStateLine } from "./default-open-state";
import { hostnameGovernanceLine } from "./hostname-governance";
import { longLivedPageGovernanceLine } from "./long-lived-page-governance";
import { nonEventInternetRulesLine } from "./non-event-internet-rules";
import { quietUrlBehaviorLine } from "./quiet-url-behavior";
import { urlDefaultnessGovernorLine } from "./url-defaultness-governor";

export type InternetDefaultnessGovernanceBundle = {
  hostnameGovernanceLine: string;
  urlDefaultnessGovernorLine: string;
  browserBackgroundGovernanceLine: string;
  ambientTabGovernanceLine: string;
  longLivedPageGovernanceLine: string;
  nonEventInternetRulesLine: string;
  browserPresenceGovernorLine: string;
  defaultOpenStateLine: string;
  quietUrlBehaviorLine: string;
};

export function resolveInternetDefaultnessGovernanceBundle(): InternetDefaultnessGovernanceBundle {
  return {
    hostnameGovernanceLine: hostnameGovernanceLine(),
    urlDefaultnessGovernorLine: urlDefaultnessGovernorLine(),
    browserBackgroundGovernanceLine: browserBackgroundGovernanceLine(),
    ambientTabGovernanceLine: ambientTabGovernanceLine(),
    longLivedPageGovernanceLine: longLivedPageGovernanceLine(),
    nonEventInternetRulesLine: nonEventInternetRulesLine(),
    browserPresenceGovernorLine: browserPresenceGovernorLine(),
    defaultOpenStateLine: defaultOpenStateLine(),
    quietUrlBehaviorLine: quietUrlBehaviorLine(),
  };
}

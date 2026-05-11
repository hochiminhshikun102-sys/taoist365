import { antiConversationRuntimeLine } from "./anti-conversation-runtime";
import { guidanceWeatherGovernanceLine } from "./guidance-weather-governance";
import { interactionFatigueLine } from "./interaction-fatigue";
import { interactionRetirementLine } from "./interaction-retirement";
import { noResolutionGovernanceLine } from "./no-resolution-governance";
import { nonResponsePrinciplesLine } from "./non-response-principles";
import { nonSessionGovernanceLine } from "./non-session-governance";
import { passivePresenceGovernorLine } from "./passive-presence-governor";
import { passiveRoomPresenceLine } from "./passive-room-presence";

export type PostInteractionGovernanceBundle = {
  interactionRetirementLine: string;
  nonSessionGovernanceLine: string;
  passivePresenceGovernorLine: string;
  guidanceWeatherGovernanceLine: string;
  antiConversationRuntimeLine: string;
  nonResponsePrinciplesLine: string;
  passiveRoomPresenceLine: string;
  noResolutionGovernanceLine: string;
  interactionFatigueLine: string;
};

export function resolvePostInteractionGovernanceBundle(): PostInteractionGovernanceBundle {
  return {
    interactionRetirementLine: interactionRetirementLine(),
    nonSessionGovernanceLine: nonSessionGovernanceLine(),
    passivePresenceGovernorLine: passivePresenceGovernorLine(),
    guidanceWeatherGovernanceLine: guidanceWeatherGovernanceLine(),
    antiConversationRuntimeLine: antiConversationRuntimeLine(),
    nonResponsePrinciplesLine: nonResponsePrinciplesLine(),
    passiveRoomPresenceLine: passiveRoomPresenceLine(),
    noResolutionGovernanceLine: noResolutionGovernanceLine(),
    interactionFatigueLine: interactionFatigueLine(),
  };
}

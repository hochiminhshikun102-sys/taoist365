import { ambientGuidanceDefaultnessLine } from "./ambient-guidance-defaultness";
import { antiConversationFinalizationLine } from "./anti-conversation-finalization";
import { guidanceAmbientCollapseLine } from "./guidance-ambient-collapse";
import { guidanceRetreatSocietyLine } from "./guidance-retreat-society";
import { nonDialogueFinalizationLine } from "./non-dialogue-finalization";
import { nonResolutionWeatherLine } from "./non-resolution-weather";
import { passiveRoomWeatherLine } from "./passive-room-weather";
import { weatherGuidanceRuntimeLine } from "./weather-guidance-runtime";
import { weatherOnlyEquilibriumLine } from "./weather-only-equilibrium";

export type GuidanceWeatherFinalizationBundle = {
  weatherGuidanceRuntimeLine: string;
  nonDialogueFinalizationLine: string;
  guidanceAmbientCollapseLine: string;
  passiveRoomWeatherLine: string;
  guidanceRetreatSocietyLine: string;
  weatherOnlyEquilibriumLine: string;
  antiConversationFinalizationLine: string;
  ambientGuidanceDefaultnessLine: string;
  nonResolutionWeatherLine: string;
};

export function resolveGuidanceWeatherFinalizationBundle(): GuidanceWeatherFinalizationBundle {
  return {
    weatherGuidanceRuntimeLine: weatherGuidanceRuntimeLine(),
    nonDialogueFinalizationLine: nonDialogueFinalizationLine(),
    guidanceAmbientCollapseLine: guidanceAmbientCollapseLine(),
    passiveRoomWeatherLine: passiveRoomWeatherLine(),
    guidanceRetreatSocietyLine: guidanceRetreatSocietyLine(),
    weatherOnlyEquilibriumLine: weatherOnlyEquilibriumLine(),
    antiConversationFinalizationLine: antiConversationFinalizationLine(),
    ambientGuidanceDefaultnessLine: ambientGuidanceDefaultnessLine(),
    nonResolutionWeatherLine: nonResolutionWeatherLine(),
  };
}

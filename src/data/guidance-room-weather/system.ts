import { guidanceAmbientWeatherLine } from "./guidance-ambient-weather";
import { guidanceBackgroundAwarenessLine } from "./guidance-background-awareness";
import { guidanceLightTouchRuntimeLine } from "./guidance-light-touch-runtime";
import { guidanceNoConclusionLine } from "./guidance-no-conclusion";
import { guidanceNonResponseLine } from "./guidance-non-response";
import { guidancePresenceWithoutDialogueLine } from "./guidance-presence-without-dialogue";
import { guidanceRoomAirLine } from "./guidance-room-air";
import { guidanceWeatherRuntimeLine } from "./guidance-weather-runtime";
import { roomWeatherGuidanceLine } from "./room-weather-guidance";

export type GuidanceRoomWeatherBundle = {
  guidanceWeatherRuntimeLine: string;
  guidanceRoomAirLine: string;
  guidanceNonResponseLine: string;
  guidancePresenceWithoutDialogueLine: string;
  guidanceBackgroundAwarenessLine: string;
  guidanceAmbientWeatherLine: string;
  guidanceLightTouchRuntimeLine: string;
  guidanceNoConclusionLine: string;
  roomWeatherGuidanceLine: string;
};

export function resolveGuidanceRoomWeatherBundle(): GuidanceRoomWeatherBundle {
  return {
    guidanceWeatherRuntimeLine: guidanceWeatherRuntimeLine(),
    guidanceRoomAirLine: guidanceRoomAirLine(),
    guidanceNonResponseLine: guidanceNonResponseLine(),
    guidancePresenceWithoutDialogueLine: guidancePresenceWithoutDialogueLine(),
    guidanceBackgroundAwarenessLine: guidanceBackgroundAwarenessLine(),
    guidanceAmbientWeatherLine: guidanceAmbientWeatherLine(),
    guidanceLightTouchRuntimeLine: guidanceLightTouchRuntimeLine(),
    guidanceNoConclusionLine: guidanceNoConclusionLine(),
    roomWeatherGuidanceLine: roomWeatherGuidanceLine(),
  };
}

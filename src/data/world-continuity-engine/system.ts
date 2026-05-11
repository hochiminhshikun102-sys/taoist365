import { ambientPageMemoryLine } from "./ambient-page-memory";
import { backgroundTabLongevityLine } from "./background-tab-longevity";
import { browserReturnSilenceLine } from "./browser-return-silence";
import { continuousPresenceRuntimeLine } from "./continuous-presence-runtime";
import { continuityNonEventInternetLine } from "./non-event-internet";
import { defaultOpenRuntimeLine } from "./default-open-runtime";
import { hostnamePermanenceRuntimeLine } from "./hostname-permanence-runtime";
import { passiveUrlFamiliarityLine } from "./passive-url-familiarity";
import { revisitWithoutEventLine } from "./revisit-without-event";
import { siteReturnInertiaLine } from "./site-return-inertia";
import { worldContinuityBoundariesLine } from "./world-continuity-boundaries";

export type WorldContinuityEngineBundle = {
  continuousPresenceRuntimeLine: string;
  defaultOpenRuntimeLine: string;
  siteReturnInertiaLine: string;
  ambientPageMemoryLine: string;
  passiveUrlFamiliarityLine: string;
  revisitWithoutEventLine: string;
  browserReturnSilenceLine: string;
  continuityNonEventInternetLine: string;
  hostnamePermanenceRuntimeLine: string;
  backgroundTabLongevityLine: string;
  worldContinuityBoundariesLine: string;
};

export function resolveWorldContinuityEngineBundle(): WorldContinuityEngineBundle {
  return {
    continuousPresenceRuntimeLine: continuousPresenceRuntimeLine(),
    defaultOpenRuntimeLine: defaultOpenRuntimeLine(),
    siteReturnInertiaLine: siteReturnInertiaLine(),
    ambientPageMemoryLine: ambientPageMemoryLine(),
    passiveUrlFamiliarityLine: passiveUrlFamiliarityLine(),
    revisitWithoutEventLine: revisitWithoutEventLine(),
    browserReturnSilenceLine: browserReturnSilenceLine(),
    continuityNonEventInternetLine: continuityNonEventInternetLine(),
    hostnamePermanenceRuntimeLine: hostnamePermanenceRuntimeLine(),
    backgroundTabLongevityLine: backgroundTabLongevityLine(),
    worldContinuityBoundariesLine: worldContinuityBoundariesLine(),
  };
}

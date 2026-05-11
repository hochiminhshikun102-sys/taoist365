import { ambientTabFamiliarityLine } from "./ambient-tab-familiarity";
import { backgroundUrlExistenceLine } from "./background-url-existence";
import { browserDefaultAirLine } from "./browser-default-air";
import { hostnameAirRuntimeLine } from "./hostname-air-runtime";
import { internetDefaultEnvironmentLine } from "./internet-default-environment";
import { longLivedBrowserSpaceLine } from "./long-lived-browser-space";
import { nonEventPageReturnLine } from "./non-event-page-return";
import { passiveUrlMemoryLine } from "./passive-url-memory";
import { quietHostnamePresenceLine } from "./quiet-hostname-presence";

export type LongLivedInternetDefaultnessBundle = {
  hostnameAirRuntimeLine: string;
  passiveUrlMemoryLine: string;
  browserDefaultAirLine: string;
  ambientTabFamiliarityLine: string;
  nonEventPageReturnLine: string;
  longLivedBrowserSpaceLine: string;
  quietHostnamePresenceLine: string;
  backgroundUrlExistenceLine: string;
  internetDefaultEnvironmentLine: string;
};

export function resolveLongLivedInternetDefaultnessBundle(): LongLivedInternetDefaultnessBundle {
  return {
    hostnameAirRuntimeLine: hostnameAirRuntimeLine(),
    passiveUrlMemoryLine: passiveUrlMemoryLine(),
    browserDefaultAirLine: browserDefaultAirLine(),
    ambientTabFamiliarityLine: ambientTabFamiliarityLine(),
    nonEventPageReturnLine: nonEventPageReturnLine(),
    longLivedBrowserSpaceLine: longLivedBrowserSpaceLine(),
    quietHostnamePresenceLine: quietHostnamePresenceLine(),
    backgroundUrlExistenceLine: backgroundUrlExistenceLine(),
    internetDefaultEnvironmentLine: internetDefaultEnvironmentLine(),
  };
}

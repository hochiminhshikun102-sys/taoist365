import { ambientEnvironmentRuntimeLine } from "./ambient-environment-runtime";
import { ambientPageWeatherLine } from "./ambient-page-weather";
import { backgroundTabExistenceLine } from "./background-tab-existence";
import { internetEnvironmentBoundariesLine } from "./internet-environment-boundaries";
import { nonInterfaceRuntimeLine } from "./non-interface-runtime";
import { nonPerformativeBrowserSpaceLine } from "./non-performative-browser-space";
import { passiveOpenEnvironmentLine } from "./passive-open-environment";
import { quietBrowserAirLine } from "./quiet-browser-air";
import { quietEnvironmentContinuityLine } from "./quiet-environment-continuity";
import { softWindowPresenceLine } from "./soft-window-presence";

export type AmbientInternetEnvironmentBundle = {
  ambientEnvironmentRuntimeLine: string;
  quietBrowserAirLine: string;
  backgroundTabExistenceLine: string;
  softWindowPresenceLine: string;
  nonInterfaceRuntimeLine: string;
  ambientPageWeatherLine: string;
  passiveOpenEnvironmentLine: string;
  quietEnvironmentContinuityLine: string;
  nonPerformativeBrowserSpaceLine: string;
  internetEnvironmentBoundariesLine: string;
};

export function resolveAmbientInternetEnvironmentBundle(): AmbientInternetEnvironmentBundle {
  return {
    ambientEnvironmentRuntimeLine: ambientEnvironmentRuntimeLine(),
    quietBrowserAirLine: quietBrowserAirLine(),
    backgroundTabExistenceLine: backgroundTabExistenceLine(),
    softWindowPresenceLine: softWindowPresenceLine(),
    nonInterfaceRuntimeLine: nonInterfaceRuntimeLine(),
    ambientPageWeatherLine: ambientPageWeatherLine(),
    passiveOpenEnvironmentLine: passiveOpenEnvironmentLine(),
    quietEnvironmentContinuityLine: quietEnvironmentContinuityLine(),
    nonPerformativeBrowserSpaceLine: nonPerformativeBrowserSpaceLine(),
    internetEnvironmentBoundariesLine: internetEnvironmentBoundariesLine(),
  };
}

import { ambientTabCivilizationLine } from "./ambient-tab-civilization";
import { ambientUrlDefaultnessLine } from "./ambient-url-defaultness";
import { backgroundBrowserEquilibriumLine } from "./background-browser-equilibrium";
import { browserBackgroundSocietyLine } from "./browser-background-society";
import { hostnameDefaultnessEquilibriumLine } from "./hostname-defaultness-equilibrium";
import { internetEnvironmentRuntimeLine } from "./internet-environment-runtime";
import { longLivedUrlCivilizationLine } from "./long-lived-url-civilization";
import { nonEventEnvironmentLine } from "./non-event-environment";
import { passiveSiteStabilityLine } from "./passive-site-stability";

export type InternetEnvironmentCivilizationBundle = {
  internetEnvironmentRuntimeLine: string;
  backgroundBrowserEquilibriumLine: string;
  ambientTabCivilizationLine: string;
  hostnameDefaultnessEquilibriumLine: string;
  longLivedUrlCivilizationLine: string;
  passiveSiteStabilityLine: string;
  nonEventEnvironmentLine: string;
  browserBackgroundSocietyLine: string;
  ambientUrlDefaultnessLine: string;
};

export function resolveInternetEnvironmentCivilizationBundle(): InternetEnvironmentCivilizationBundle {
  return {
    internetEnvironmentRuntimeLine: internetEnvironmentRuntimeLine(),
    backgroundBrowserEquilibriumLine: backgroundBrowserEquilibriumLine(),
    ambientTabCivilizationLine: ambientTabCivilizationLine(),
    hostnameDefaultnessEquilibriumLine: hostnameDefaultnessEquilibriumLine(),
    longLivedUrlCivilizationLine: longLivedUrlCivilizationLine(),
    passiveSiteStabilityLine: passiveSiteStabilityLine(),
    nonEventEnvironmentLine: nonEventEnvironmentLine(),
    browserBackgroundSocietyLine: browserBackgroundSocietyLine(),
    ambientUrlDefaultnessLine: ambientUrlDefaultnessLine(),
  };
}

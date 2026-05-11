import { ambientUrlExistenceLine } from "./ambient-url-existence";
import { backgroundOpenPresenceLine } from "./background-open-presence";
import { defaultExistenceRuntimeLine } from "./default-existence-runtime";
import { defaultInternetBehaviorLine } from "./default-internet-behavior";
import { ordinaryBrowserReturnLine } from "./ordinary-browser-return";
import { passiveWorldPersistenceLine } from "./passive-world-persistence";
import { quietTabCoexistenceLine } from "./quiet-tab-coexistence";
import { silentSiteContinuityLine } from "./silent-site-continuity";
import { siteWithoutAnnouncementLine } from "./site-without-announcement";
import { worldNonArrivalLine } from "./world-non-arrival";

export type WorldDefaultExistenceBundle = {
  defaultExistenceRuntimeLine: string;
  backgroundOpenPresenceLine: string;
  silentSiteContinuityLine: string;
  ambientUrlExistenceLine: string;
  ordinaryBrowserReturnLine: string;
  quietTabCoexistenceLine: string;
  passiveWorldPersistenceLine: string;
  siteWithoutAnnouncementLine: string;
  defaultInternetBehaviorLine: string;
  worldNonArrivalLine: string;
};

export function resolveWorldDefaultExistenceBundle(): WorldDefaultExistenceBundle {
  return {
    defaultExistenceRuntimeLine: defaultExistenceRuntimeLine(),
    backgroundOpenPresenceLine: backgroundOpenPresenceLine(),
    silentSiteContinuityLine: silentSiteContinuityLine(),
    ambientUrlExistenceLine: ambientUrlExistenceLine(),
    ordinaryBrowserReturnLine: ordinaryBrowserReturnLine(),
    quietTabCoexistenceLine: quietTabCoexistenceLine(),
    passiveWorldPersistenceLine: passiveWorldPersistenceLine(),
    siteWithoutAnnouncementLine: siteWithoutAnnouncementLine(),
    defaultInternetBehaviorLine: defaultInternetBehaviorLine(),
    worldNonArrivalLine: worldNonArrivalLine(),
  };
}

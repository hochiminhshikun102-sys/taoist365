import { backgroundSiteRuntimeLine } from "./background-site-runtime";
import { browserDefaultnessLine } from "./browser-defaultness";
import { forgottenOpenTabLine } from "./forgotten-open-tab";
import { hostnamePermanenceLine } from "./hostname-permanence";
import { longOpenTabRuntimeLine } from "./long-open-tab-runtime";
import { oldPageMemoryLine } from "./old-page-memory";
import { persistentPageRuntimeLine } from "./persistent-page-runtime";
import { stableUrlRuntimeLine } from "./stable-url-runtime";
import { unchangedPageRuntimeLine } from "./unchanged-page-runtime";

export type QuietInternetPermanenceBundle = {
  unchangedPageRuntimeLine: string;
  stableUrlRuntimeLine: string;
  longOpenTabRuntimeLine: string;
  browserDefaultnessLine: string;
  oldPageMemoryLine: string;
  hostnamePermanenceLine: string;
  backgroundSiteRuntimeLine: string;
  forgottenOpenTabLine: string;
  persistentPageRuntimeLine: string;
};

export function resolveQuietInternetPermanenceBundle(): QuietInternetPermanenceBundle {
  return {
    unchangedPageRuntimeLine: unchangedPageRuntimeLine(),
    stableUrlRuntimeLine: stableUrlRuntimeLine(),
    longOpenTabRuntimeLine: longOpenTabRuntimeLine(),
    browserDefaultnessLine: browserDefaultnessLine(),
    oldPageMemoryLine: oldPageMemoryLine(),
    hostnamePermanenceLine: hostnamePermanenceLine(),
    backgroundSiteRuntimeLine: backgroundSiteRuntimeLine(),
    forgottenOpenTabLine: forgottenOpenTabLine(),
    persistentPageRuntimeLine: persistentPageRuntimeLine(),
  };
}

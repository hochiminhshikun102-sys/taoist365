import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import { bookmarkBarRuntimeLine } from "./bookmark-bar-runtime";
import { browserAutocompleteMemoryLine } from "./browser-autocomplete-memory";
import { cachedFamiliarityLine } from "./cached-familiarity";
import { hostnameAgingPlainLine } from "./hostname-aging";
import { internetBackgroundPresenceLine } from "./internet-background-presence";
import { oldPageStabilityLine } from "./old-page-stability";
import { oldUrlAgingPlainLine } from "./old-url-runtime";
import { quietRevisitLine } from "./quiet-revisit-runtime";
import { tabReturnFatigueLine } from "./tab-return-fatigue";

export type RealInternetAgingBundle = {
  dayKey: string;
  oldUrlAgingPlainLine: string;
  browserAutocompleteMemoryLine: string;
  bookmarkBarRuntimeLine: string;
  tabReturnFatigueLine: string;
  cachedFamiliarityLine: string;
  hostnameAgingPlainLine: string;
  oldPageStabilityLine: string;
  quietRevisitLine: string;
  internetBackgroundPresenceLine: string;
};

export function resolveRealInternetAgingBundle(structuralSilence: StructuralSilenceBundle): RealInternetAgingBundle {
  return {
    dayKey: structuralSilence.dayKey,
    oldUrlAgingPlainLine: oldUrlAgingPlainLine(),
    browserAutocompleteMemoryLine: browserAutocompleteMemoryLine(),
    bookmarkBarRuntimeLine: bookmarkBarRuntimeLine(),
    tabReturnFatigueLine: tabReturnFatigueLine(),
    cachedFamiliarityLine: cachedFamiliarityLine(),
    hostnameAgingPlainLine: hostnameAgingPlainLine(),
    oldPageStabilityLine: oldPageStabilityLine(),
    quietRevisitLine: quietRevisitLine(),
    internetBackgroundPresenceLine: internetBackgroundPresenceLine(),
  };
}

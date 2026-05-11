import { backgroundBrowserPresenceLine } from "./background-browser-presence";
import { bookmarkMemoryRuntimeLine } from "./bookmark-memory-runtime";
import { browserHabitSedimentLine } from "./browser-habit-sediment";
import { hostnameShapeMemoryLine } from "./hostname-shape-memory";
import { lateNightOpenRuntimeLine } from "./late-night-open-runtime";
import { passiveWindowMemoryLine } from "./passive-window-memory";
import { quietRefocusRuntimeLine } from "./quiet-refocus-runtime";
import { tabReturnRuntimeLine } from "./tab-return-runtime";
import { urlAutocompleteRuntimeLine } from "./url-autocomplete-runtime";

export type BrowserRealityExpansionBundle = {
  bookmarkMemoryRuntimeLine: string;
  tabReturnRuntimeLine: string;
  hostnameShapeMemoryLine: string;
  urlAutocompleteRuntimeLine: string;
  browserHabitSedimentLine: string;
  lateNightOpenRuntimeLine: string;
  backgroundBrowserPresenceLine: string;
  quietRefocusRuntimeLine: string;
  passiveWindowMemoryLine: string;
};

export function resolveBrowserRealityExpansionBundle(): BrowserRealityExpansionBundle {
  return {
    bookmarkMemoryRuntimeLine: bookmarkMemoryRuntimeLine(),
    tabReturnRuntimeLine: tabReturnRuntimeLine(),
    hostnameShapeMemoryLine: hostnameShapeMemoryLine(),
    urlAutocompleteRuntimeLine: urlAutocompleteRuntimeLine(),
    browserHabitSedimentLine: browserHabitSedimentLine(),
    lateNightOpenRuntimeLine: lateNightOpenRuntimeLine(),
    backgroundBrowserPresenceLine: backgroundBrowserPresenceLine(),
    quietRefocusRuntimeLine: quietRefocusRuntimeLine(),
    passiveWindowMemoryLine: passiveWindowMemoryLine(),
  };
}

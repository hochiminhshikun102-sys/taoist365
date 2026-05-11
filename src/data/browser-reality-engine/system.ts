import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import type { WorldInertiaBundle } from "@/data/world-inertia-runtime/system";
import type { WorldRegulationBundle } from "@/data/world-regulation-engine/system";
import type { WorldStabilityBundle } from "@/data/world-stability-governance/system";
import { dailyIndex } from "@/lib/living-day-key";
import { resolveAmbientRevisitRuntime } from "./ambient-revisit-runtime";
import { resolveBackgroundBrowserRuntime } from "./background-browser-runtime";
import { resolveBookmarkMemoryRuntime } from "./bookmark-memory-runtime";
import { resolveBrowserAgingRuntime } from "./browser-aging-runtime";
import { resolveBrowserResidueRuntime } from "./browser-residue-runtime";
import { resolveBrowserSilenceRuntime } from "./browser-silence-runtime";
import { resolveForgottenTabRuntime } from "./forgotten-tab-runtime";
import { resolveHostnameFamiliarity } from "./hostname-familiarity";
import { resolveLongTabRuntime } from "./long-tab-runtime";
import { resolveObjectInternetSediment, type ObjectInternetSediment } from "./object-internet-sediment";
import { resolveOldUrlRuntime } from "./old-url-runtime";
import { resolveReopenPresenceRuntime } from "./reopen-presence-runtime";
import { resolveTabSurvivalRuntime } from "./tab-survival-runtime";
import { returnWithoutPurposeLine } from "./return-without-purpose";
import { nonUrgentReopenReminder } from "./non-urgent-reopen";

export type GuidancePassiveSurface = {
  /** Session reads as passive open state — not a guided flow */
  passiveOpenGuidance: boolean;
  hideRoutes: boolean;
  hideClosureBlock: boolean;
  hideContinueReflection: boolean;
  hideClimateRhythmLayers: boolean;
  /** When set, caps noticing after other gates */
  maxNoticingHardCap: number | null;
  minimalExitLabel: string;
};

export type BrowserRealityBundle = {
  dayKey: string;
  longTab: ReturnType<typeof resolveLongTabRuntime>;
  bookmarkMemory: ReturnType<typeof resolveBookmarkMemoryRuntime>;
  hostname: ReturnType<typeof resolveHostnameFamiliarity>;
  reopen: ReturnType<typeof resolveReopenPresenceRuntime>;
  backgroundBrowser: ReturnType<typeof resolveBackgroundBrowserRuntime>;
  forgottenTab: ReturnType<typeof resolveForgottenTabRuntime>;
  oldUrl: ReturnType<typeof resolveOldUrlRuntime>;
  browserAging: ReturnType<typeof resolveBrowserAgingRuntime>;
  tabSurvival: ReturnType<typeof resolveTabSurvivalRuntime>;
  browserResidue: ReturnType<typeof resolveBrowserResidueRuntime>;
  ambientRevisit: ReturnType<typeof resolveAmbientRevisitRuntime>;
  browserSilence: ReturnType<typeof resolveBrowserSilenceRuntime>;
  returnWithoutPurposeLine: string;
  nonUrgentReopenLine: string;
  objectInternetSediment: ObjectInternetSediment;
  guidancePassiveSurface: GuidancePassiveSurface;
};

function resolveGuidancePassiveSurface(
  dayKey: string,
  structural: StructuralSilenceBundle,
  worldRegulation: WorldRegulationBundle,
  browserSilence: ReturnType<typeof resolveBrowserSilenceRuntime>,
): GuidancePassiveSurface {
  const h = dailyIndex(`${dayKey}:g-passive`, 100);
  const ultra =
    worldRegulation.breathing.breathingMode === "residualOnly" ||
    structural.pageEnergy === "empty" ||
    structural.pageEnergy === "residual";
  const passiveOpenGuidance = ultra || (browserSilence.passiveOpenState && h > 80);
  return {
    passiveOpenGuidance,
    hideRoutes: passiveOpenGuidance || worldRegulation.breathing.breathingMode === "almostStill",
    hideClosureBlock: passiveOpenGuidance,
    hideContinueReflection: passiveOpenGuidance,
    hideClimateRhythmLayers: passiveOpenGuidance && h > 55,
    maxNoticingHardCap: passiveOpenGuidance ? (h % 2 === 0 ? 0 : 1) : null,
    minimalExitLabel: h % 3 === 0 ? "Enough for tonight." : "Enough for now.",
  };
}

export function resolveBrowserRealityBundle(
  structuralSilence: StructuralSilenceBundle,
  worldRegulation: WorldRegulationBundle,
  aging: WorldAgingBundle,
  inertia: WorldInertiaBundle,
  worldStability: WorldStabilityBundle,
): BrowserRealityBundle {
  void inertia;
  const dayKey = structuralSilence.dayKey;
  const mode = worldRegulation.breathing.breathingMode;
  const longTab = resolveLongTabRuntime(dayKey, mode);
  const bookmarkMemory = resolveBookmarkMemoryRuntime(dayKey);
  const hostname = resolveHostnameFamiliarity(dayKey);
  const reopen = resolveReopenPresenceRuntime(dayKey);
  const backgroundBrowser = resolveBackgroundBrowserRuntime(dayKey, mode);
  const forgottenTab = resolveForgottenTabRuntime(dayKey);
  const oldUrl = resolveOldUrlRuntime(dayKey, aging.ageStateId);
  const browserAging = resolveBrowserAgingRuntime(dayKey);
  const tabSurvival = resolveTabSurvivalRuntime(dayKey);
  const browserResidue = resolveBrowserResidueRuntime(dayKey);
  const ambientRevisit = resolveAmbientRevisitRuntime(dayKey);
  const browserSilence = resolveBrowserSilenceRuntime(dayKey, structuralSilence);
  const objectInternetSediment = resolveObjectInternetSediment(
    worldRegulation.objectPermanence.regulatedForegroundIds,
    dayKey,
    worldStability.foregroundFriction,
  );
  const guidancePassiveSurface = resolveGuidancePassiveSurface(dayKey, structuralSilence, worldRegulation, browserSilence);

  return {
    dayKey,
    longTab,
    bookmarkMemory,
    hostname,
    reopen,
    backgroundBrowser,
    forgottenTab,
    oldUrl,
    browserAging,
    tabSurvival,
    browserResidue,
    ambientRevisit,
    browserSilence,
    returnWithoutPurposeLine: returnWithoutPurposeLine(dayKey),
    nonUrgentReopenLine: nonUrgentReopenReminder(dayKey),
    objectInternetSediment,
    guidancePassiveSurface,
  };
}

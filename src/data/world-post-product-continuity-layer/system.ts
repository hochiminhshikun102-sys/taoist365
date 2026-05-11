import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import type { RuntimeRetirementBundle } from "@/data/runtime-retirement-system/system";
import { resolveBrowserRealityExpansionBundle, type BrowserRealityExpansionBundle } from "@/data/browser-reality-expansion/system";
import { resolveGuidanceQuietCollapseBundle, type GuidanceQuietCollapseBundle } from "@/data/guidance-quiet-collapse/system";
import { resolveMailLongThreadEngineBundle, type MailLongThreadEngineBundle } from "@/data/mail-long-thread-engine/system";
import { resolveNonEventInternetLayerBundle, type NonEventInternetLayerBundle } from "@/data/non-event-internet-layer/system";
import {
  resolveObjectBackgroundContinuityBundle,
  type ObjectBackgroundContinuityBundle,
} from "@/data/object-background-continuity/system";
import { resolveWorldContinuityEngineBundle, type WorldContinuityEngineBundle } from "@/data/world-continuity-engine/system";
import {
  resolveWorldStillnessStabilizationBundle,
  type WorldStillnessStabilizationBundle,
} from "@/data/world-stillness-stabilization/system";
import { resolvePermanenceThinningPass, type PermanenceThinningPass } from "./permanence-thinning-pass";

/** Post-product continuity: long URL, non-event web, background objects, quiet guidance/mail, browser habit — one hook field. */
export type WorldPostProductContinuityBundle = {
  continuity: WorldContinuityEngineBundle;
  nonEvent: NonEventInternetLayerBundle;
  objectBackground: ObjectBackgroundContinuityBundle;
  guidanceQuiet: GuidanceQuietCollapseBundle;
  mailLongThread: MailLongThreadEngineBundle;
  stillnessStabilization: WorldStillnessStabilizationBundle;
  browserExpansion: BrowserRealityExpansionBundle;
  permanencePass: PermanenceThinningPass;
};

export function resolveWorldPostProductContinuityBundle(
  structuralSilence: StructuralSilenceBundle,
  aging: WorldAgingBundle,
  runtimeRetirement: RuntimeRetirementBundle,
): WorldPostProductContinuityBundle {
  const stillnessStabilization = resolveWorldStillnessStabilizationBundle(aging, runtimeRetirement);
  const permanencePass = resolvePermanenceThinningPass(aging, runtimeRetirement, stillnessStabilization);
  return {
    continuity: resolveWorldContinuityEngineBundle(),
    nonEvent: resolveNonEventInternetLayerBundle(),
    objectBackground: resolveObjectBackgroundContinuityBundle(aging),
    guidanceQuiet: resolveGuidanceQuietCollapseBundle(structuralSilence, aging, runtimeRetirement),
    mailLongThread: resolveMailLongThreadEngineBundle(),
    stillnessStabilization,
    browserExpansion: resolveBrowserRealityExpansionBundle(),
    permanencePass,
  };
}

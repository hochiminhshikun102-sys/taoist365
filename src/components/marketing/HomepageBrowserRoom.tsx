"use client";

import Image from "next/image";
import Link from "next/link";
import { HomepageHeroAirRotation } from "@/components/marketing/HomepageHeroAirRotation";
import { LivingAtmosphereVeil } from "@/components/ritual/LivingAtmosphereVeil";
import { siteConfig } from "@/config/site";
import { taoist365ObjectsCatalog } from "@/data/taoist365-objects-collection/system";
import { useWorldRuntime } from "@/lib/use-world-runtime";
import { resolveAirflowSilenceRuntime } from "@/runtime/airflow-silence-runtime";
import { resolveAtmosphericHumanityRuntime } from "@/runtime/atmospheric-humanity-runtime";
import { resolveAtmosphericCirculationRuntime } from "@/runtime/atmospheric-circulation-runtime";
import { resolveAtmosphericFatigueRuntime } from "@/runtime/atmospheric-fatigue-runtime";
import { resolveAntiAddictiveContinuityRuntime } from "@/runtime/anti-addictive-continuity-runtime";
import { resolveAmbientGuidanceRuntime } from "@/runtime/ambient-guidance-runtime";
import { resolveBrowserCoexistenceRuntime } from "@/runtime/browser-coexistence-runtime";
import { resolveBackgroundCivilizationRuntime } from "@/runtime/background-civilization-runtime";
import { resolveBackgroundWarmthRuntime } from "@/runtime/background-warmth-runtime";
import { resolveBesideLifeRuntime } from "@/runtime/beside-life-runtime";
import { browserRoomHomeSurface } from "@/runtime/browser-room-runtime";
import { resolveBrowserPersistenceRuntime } from "@/runtime/browser-persistence-runtime";
import { resolveCivilizationAntiAccelerationRuntime } from "@/runtime/civilization-anti-acceleration-runtime";
import { resolveCivilizationBoundaryRuntime } from "@/runtime/civilization-boundary-runtime";
import { resolveCivilizationFadingRuntime } from "@/runtime/civilization-fading-runtime";
import { resolveCivilizationFamiliarityRuntime } from "@/runtime/civilization-familiarity-runtime";
import { resolveCivilizationGravityRuntime } from "@/runtime/civilization-gravity-runtime";
import { resolveCivilizationMapRuntime } from "@/runtime/civilization-map-runtime";
import { resolveCivilizationMaturityRuntime } from "@/runtime/civilization-maturity-runtime";
import { resolveCivilizationMetabolismRuntime } from "@/runtime/civilization-metabolism-runtime";
import { resolveCivilizationRecoveryRuntime } from "@/runtime/civilization-recovery-runtime";
import { resolveCivilizationRoomGovernanceRuntime } from "@/runtime/civilization-room-governance-runtime";
import { resolveCivilizationSleepRuntime } from "@/runtime/civilization-sleep-runtime";
import { resolveCivilizationSofteningRuntime } from "@/runtime/civilization-softening-runtime";
import { resolveDriftboxRuntimeForDayKey } from "@/runtime/driftbox-runtime";
import { resolveDigitalLightnessRuntime } from "@/runtime/digital-lightness-runtime";
import { resolveDissolvedAtmosphereRuntime } from "@/runtime/dissolved-atmosphere-runtime";
import { resolveEmotionalBalanceRuntime } from "@/runtime/emotional-balance-runtime";
import { resolveExistentialWarmthRuntime } from "@/runtime/existential-warmth-runtime";
import { resolveGentleRitualRuntime } from "@/runtime/gentle-ritual-runtime";
import { resolveGentleSmileRuntime } from "@/runtime/gentle-smile-runtime";
import { resolveGracefulTimeRuntime } from "@/runtime/graceful-time-runtime";
import { resolveHallCrossPresenceRuntime } from "@/runtime/hall-cross-presence-runtime";
import { resolveHiddenContinuityRuntime } from "@/runtime/hidden-continuity-runtime";
import { resolveInvisibleCommerceRuntime } from "@/runtime/invisible-commerce-runtime";
import { resolveDailySedimentRuntime } from "@/runtime/daily-sediment-runtime";
import { resolveLivedInContinuityRuntime } from "@/runtime/lived-in-continuity-runtime";
import { resolveLifeBesideRuntime } from "@/runtime/life-beside-runtime";
import { resolveLongDurationPresenceRuntime } from "@/runtime/long-duration-presence-runtime";
import { resolveLongTimeNoSeeRuntime } from "@/runtime/long-time-no-see-runtime";
import { resolveLongStayRuntime } from "@/runtime/long-stay-runtime";
import { resolveLowDramaHumanityRuntime } from "@/runtime/low-drama-humanity-runtime";
import { resolveLowFrequencyExplorationRuntime } from "@/runtime/low-frequency-exploration-runtime";
import { resolveMeaningDiscoveryRuntime } from "@/runtime/meaning-discovery-runtime";
import { resolveNonExplanatoryMeaningRuntime } from "@/runtime/non-explanatory-meaning-runtime";
import { resolveNonDependentCivilizationRuntime } from "@/runtime/non-dependent-civilization-runtime";
import { resolveNonLonelyRuntime } from "@/runtime/non-lonely-runtime";
import { resolveNonPossessiveMeaningRuntime } from "@/runtime/non-possessive-meaning-runtime";
import { resolveNaturalReturnRuntime } from "@/runtime/natural-return-runtime";
import { resolveObligationFreeReturnRuntime } from "@/runtime/obligation-free-return-runtime";
import { resolveOrdinaryReturnRuntime } from "@/runtime/ordinary-return-runtime";
import { resolveOrdinaryHumanRuntime } from "@/runtime/ordinary-human-runtime";
import { resolveOrdinaryTimeRuntime } from "@/runtime/ordinary-time-runtime";
import { resolveOrdinarySacrednessRuntime } from "@/runtime/ordinary-sacredness-runtime";
import { resolveOpenAirRuntime } from "@/runtime/open-air-runtime";
import { resolveOpenRoomRuntime } from "@/runtime/open-room-runtime";
import { resolveOpenWarmthRuntime } from "@/runtime/open-warmth-runtime";
import { resolveOutsideLifeRuntime } from "@/runtime/outside-life-runtime";
import { resolveOutsideWorldRuntime } from "@/runtime/outside-world-runtime";
import { resolvePartialAbsenceRuntime } from "@/runtime/partial-absence-runtime";
import { resolvePassingPresenceRuntime } from "@/runtime/passing-presence-runtime";
import { quietCivilizationRoomDirections, quietHallDirections } from "@/runtime/hall-runtime-map";
import { homepagePrimaryEntries } from "@/runtime/homepage-runtime-map";
import { resolvePocketBrowserRuntime } from "@/runtime/pocket-browser-runtime";
import { resolveQuietContinuityRuntime } from "@/runtime/quiet-continuity-runtime";
import { resolveQuietStayingRuntime } from "@/runtime/quiet-staying-runtime";
import { resolveRealLifeRuntime } from "@/runtime/real-life-runtime";
import { resolveRealitySilenceRuntime } from "@/runtime/reality-silence-runtime";
import { resolveRoomDecayRuntime } from "@/runtime/room-decay-runtime";
import { resolveRoomEmotionalClimateRuntime } from "@/runtime/room-emotional-climate-runtime";
import { resolveRoomIdentityRuntime } from "@/runtime/room-identity-runtime";
import { resolveRoomLongStayRuntime } from "@/runtime/room-long-stay-runtime";
import { resolveRoomReturnRuntime } from "@/runtime/room-return-runtime";
import { resolveRoomRitualRuntime } from "@/runtime/room-ritual-runtime";
import { resolveSilenceDensityRuntime } from "@/runtime/silence-density-runtime";
import { resolveSlowRelationshipRuntime } from "@/runtime/slow-relationship-runtime";
import { resolveSmileWithoutPerformanceRuntime } from "@/runtime/smile-without-performance-runtime";
import { resolveTemporalBreathingRuntime } from "@/runtime/temporal-breathing-runtime";
import { resolveTinyDiscoveryRuntime } from "@/runtime/tiny-discovery-runtime";
import { resolveLightnessProtectionRuntime } from "@/runtime/lightness-protection-runtime";
import { resolveGentleOrientationRuntime } from "@/runtime/gentle-orientation-runtime";
import { resolveInvisibleHumanityRuntime } from "@/runtime/invisible-humanity-runtime";
import { resolveInvisiblePresenceRuntime } from "@/runtime/invisible-presence-runtime";
import { resolveInvisibleSilenceRuntime } from "@/runtime/invisible-silence-runtime";
import { resolveLightGuidanceRuntime } from "@/runtime/light-guidance-runtime";
import { resolveEverydayPresenceRuntime } from "@/runtime/everyday-presence-runtime";
import { resolveNonAnnouncedCivilizationRuntime } from "@/runtime/non-announced-civilization-runtime";
import { resolveOrdinaryWisdomRuntime } from "@/runtime/ordinary-wisdom-runtime";
import { resolvePracticalCalmRuntime } from "@/runtime/practical-calm-runtime";
import { resolvePracticalRitualRuntime } from "@/runtime/practical-ritual-runtime";
import { resolvePracticalSilenceRuntime } from "@/runtime/practical-silence-runtime";
import { resolveReliefRuntime } from "@/runtime/relief-runtime";
import { resolveSmallHelpRuntime } from "@/runtime/small-help-runtime";
import { resolveUsefulHumanityRuntime } from "@/runtime/useful-humanity-runtime";
import { resolveUnclaimedMeaningRuntime } from "@/runtime/unclaimed-meaning-runtime";
import { resolveWeatherPassageRuntime } from "@/runtime/weather-passage-runtime";
import { resolveWindPassageRuntime } from "@/runtime/wind-passage-runtime";
import { windkeepHomeSurface } from "@/runtime/windkeep-runtime";

const objectRooms = taoist365ObjectsCatalog.slice(0, 6);
const windkeepObjects = taoist365ObjectsCatalog.slice(2, 8);

const roomEntries = [
  { label: "Daily Guidance", href: "/rituals/daily-guidance", air: "One line near the morning.", mark: "01" },
  { label: "Windkeep", href: "/objects", air: "Objects left where time can find them.", mark: "02" },
  { label: "Quiet Mail", href: "/inquiry", air: "A letter that can wait.", mark: "04" },
  { label: "Cloud Hall", href: "/rituals/home-harmony", air: "White air by the window.", mark: "05" },
  { label: "Lantern Weather", href: "/rituals", air: "Night light kept low.", mark: "06" },
  { label: "Daily Verse", href: "/rituals/daily-guidance", air: "A small sentence for the day.", mark: "07" },
] as const;

const seasonalRooms = [
  {
    label: "Relationship",
    note: "Love & connection",
    image: taoist365ObjectsCatalog[1]?.photo.src,
  },
  {
    label: "Home",
    note: "Space & harmony",
    image: taoist365ObjectsCatalog[2]?.photo.src,
  },
  {
    label: "Timing",
    note: "Right moment",
    image: taoist365ObjectsCatalog[6]?.photo.src,
  },
  {
    label: "Energy",
    note: "Balance & flow",
    image: taoist365ObjectsCatalog[3]?.photo.src,
  },
  {
    label: "Return",
    note: "Peace & healing",
    image: "/homepage-hero/windkeep-lantern-sea.png",
  },
] as const;

export function HomepageBrowserRoom() {
  const { structuralSilence, worldAiNativeInfrastructure } = useWorldRuntime();
  const antiAddictiveContinuity = resolveAntiAddictiveContinuityRuntime(structuralSilence.dayKey);
  const ambientGuidance = resolveAmbientGuidanceRuntime(structuralSilence.dayKey);
  const airflowSilence = resolveAirflowSilenceRuntime(structuralSilence.dayKey);
  const atmosphericHumanity = resolveAtmosphericHumanityRuntime(structuralSilence.dayKey);
  const atmosphericCirculation = resolveAtmosphericCirculationRuntime(structuralSilence.dayKey);
  const atmosphericFatigue = resolveAtmosphericFatigueRuntime(structuralSilence.dayKey);
  const backgroundCivilization = resolveBackgroundCivilizationRuntime(structuralSilence.dayKey);
  const backgroundWarmth = resolveBackgroundWarmthRuntime(structuralSilence.dayKey);
  const besideLife = resolveBesideLifeRuntime(structuralSilence.dayKey);
  const browserCoexistence = resolveBrowserCoexistenceRuntime(structuralSilence.dayKey);
  const browserPersistence = resolveBrowserPersistenceRuntime(structuralSilence.dayKey);
  const civilizationAntiAcceleration = resolveCivilizationAntiAccelerationRuntime(structuralSilence.dayKey);
  const civilizationBoundary = resolveCivilizationBoundaryRuntime(structuralSilence.dayKey);
  const civilizationFamiliarity = resolveCivilizationFamiliarityRuntime(structuralSilence.dayKey);
  const civilizationFading = resolveCivilizationFadingRuntime(structuralSilence.dayKey);
  const civilizationGravity = resolveCivilizationGravityRuntime(structuralSilence.dayKey);
  const civilizationMap = resolveCivilizationMapRuntime(structuralSilence.dayKey);
  const civilizationMaturity = resolveCivilizationMaturityRuntime(structuralSilence.dayKey);
  const civilizationMetabolism = resolveCivilizationMetabolismRuntime(structuralSilence.dayKey);
  const civilizationRecovery = resolveCivilizationRecoveryRuntime(structuralSilence.dayKey);
  const civilizationRoomGovernance = resolveCivilizationRoomGovernanceRuntime(structuralSilence.dayKey);
  const civilizationSleep = resolveCivilizationSleepRuntime(structuralSilence.dayKey);
  const civilizationSoftening = resolveCivilizationSofteningRuntime(structuralSilence.dayKey);
  const dailySediment = resolveDailySedimentRuntime(structuralSilence.dayKey);
  const digitalLightness = resolveDigitalLightnessRuntime(structuralSilence.dayKey);
  const dissolvedAtmosphere = resolveDissolvedAtmosphereRuntime(structuralSilence.dayKey);
  const driftbox = resolveDriftboxRuntimeForDayKey(structuralSilence.dayKey);
  const emotionalBalance = resolveEmotionalBalanceRuntime(structuralSilence.dayKey);
  const existentialWarmth = resolveExistentialWarmthRuntime(structuralSilence.dayKey);
  const gentleRitual = resolveGentleRitualRuntime(structuralSilence.dayKey);
  const gentleOrientation = resolveGentleOrientationRuntime(structuralSilence.dayKey);
  const gentleSmile = resolveGentleSmileRuntime(structuralSilence.dayKey);
  const gracefulTime = resolveGracefulTimeRuntime(structuralSilence.dayKey);
  const hallCrossPresence = resolveHallCrossPresenceRuntime(structuralSilence.dayKey);
  const hiddenContinuity = resolveHiddenContinuityRuntime(structuralSilence.dayKey);
  const invisibleCommerce = resolveInvisibleCommerceRuntime(structuralSilence.dayKey);
  const invisibleHumanity = resolveInvisibleHumanityRuntime(structuralSilence.dayKey);
  const invisiblePresence = resolveInvisiblePresenceRuntime(structuralSilence.dayKey);
  const invisibleSilence = resolveInvisibleSilenceRuntime(structuralSilence.dayKey);
  const livedInContinuity = resolveLivedInContinuityRuntime(structuralSilence.dayKey);
  const lifeBeside = resolveLifeBesideRuntime(structuralSilence.dayKey);
  const longDurationPresence = resolveLongDurationPresenceRuntime(structuralSilence.dayKey);
  const longTimeNoSee = resolveLongTimeNoSeeRuntime(structuralSilence.dayKey);
  const longStay = resolveLongStayRuntime(structuralSilence.dayKey);
  const lowDramaHumanity = resolveLowDramaHumanityRuntime(structuralSilence.dayKey);
  const lowFrequencyExploration = resolveLowFrequencyExplorationRuntime(structuralSilence.dayKey);
  const meaningDiscovery = resolveMeaningDiscoveryRuntime(structuralSilence.dayKey);
  const nonExplanatoryMeaning = resolveNonExplanatoryMeaningRuntime(structuralSilence.dayKey);
  const nonAnnouncedCivilization = resolveNonAnnouncedCivilizationRuntime(structuralSilence.dayKey);
  const nonDependentCivilization = resolveNonDependentCivilizationRuntime(structuralSilence.dayKey);
  const nonLonely = resolveNonLonelyRuntime(structuralSilence.dayKey);
  const nonPossessiveMeaning = resolveNonPossessiveMeaningRuntime(structuralSilence.dayKey);
  const naturalReturn = resolveNaturalReturnRuntime(structuralSilence.dayKey);
  const obligationFreeReturn = resolveObligationFreeReturnRuntime(structuralSilence.dayKey);
  const ordinaryHuman = resolveOrdinaryHumanRuntime(structuralSilence.dayKey);
  const ordinaryReturn = resolveOrdinaryReturnRuntime(structuralSilence.dayKey);
  const ordinarySacredness = resolveOrdinarySacrednessRuntime(structuralSilence.dayKey);
  const ordinaryTime = resolveOrdinaryTimeRuntime(structuralSilence.dayKey);
  const ordinaryWisdom = resolveOrdinaryWisdomRuntime(structuralSilence.dayKey);
  const everydayPresence = resolveEverydayPresenceRuntime(structuralSilence.dayKey);
  const openAir = resolveOpenAirRuntime(structuralSilence.dayKey);
  const openRoom = resolveOpenRoomRuntime(structuralSilence.dayKey);
  const openWarmth = resolveOpenWarmthRuntime(structuralSilence.dayKey);
  const outsideLife = resolveOutsideLifeRuntime(structuralSilence.dayKey);
  const outsideWorld = resolveOutsideWorldRuntime(structuralSilence.dayKey);
  const partialAbsence = resolvePartialAbsenceRuntime(structuralSilence.dayKey);
  const passingPresence = resolvePassingPresenceRuntime(structuralSilence.dayKey);
  const pocketBrowser = resolvePocketBrowserRuntime(structuralSilence.dayKey);
  const practicalCalm = resolvePracticalCalmRuntime(structuralSilence.dayKey);
  const practicalRitual = resolvePracticalRitualRuntime(structuralSilence.dayKey);
  const practicalSilence = resolvePracticalSilenceRuntime(structuralSilence.dayKey);
  const quietContinuity = resolveQuietContinuityRuntime(structuralSilence.dayKey);
  const quietStaying = resolveQuietStayingRuntime(structuralSilence.dayKey);
  const realLife = resolveRealLifeRuntime(structuralSilence.dayKey);
  const realitySilence = resolveRealitySilenceRuntime(structuralSilence.dayKey);
  const relief = resolveReliefRuntime(structuralSilence.dayKey);
  const roomDecay = resolveRoomDecayRuntime(structuralSilence.dayKey);
  const roomEmotionalClimate = resolveRoomEmotionalClimateRuntime(structuralSilence.dayKey);
  const roomIdentity = resolveRoomIdentityRuntime(structuralSilence.dayKey);
  const roomLongStay = resolveRoomLongStayRuntime(structuralSilence.dayKey);
  const roomReturn = resolveRoomReturnRuntime(structuralSilence.dayKey);
  const roomRitual = resolveRoomRitualRuntime(structuralSilence.dayKey);
  const silenceDensity = resolveSilenceDensityRuntime(structuralSilence.dayKey);
  const smileWithoutPerformance = resolveSmileWithoutPerformanceRuntime(structuralSilence.dayKey);
  const slowRelationship = resolveSlowRelationshipRuntime(structuralSilence.dayKey);
  const temporalBreathing = resolveTemporalBreathingRuntime(structuralSilence.dayKey);
  const tinyDiscovery = resolveTinyDiscoveryRuntime(structuralSilence.dayKey);
  const lightnessProtection = resolveLightnessProtectionRuntime(structuralSilence.dayKey);
  const lightGuidance = resolveLightGuidanceRuntime(structuralSilence.dayKey);
  const smallHelp = resolveSmallHelpRuntime(structuralSilence.dayKey);
  const usefulHumanity = resolveUsefulHumanityRuntime(structuralSilence.dayKey);
  const unclaimedMeaning = resolveUnclaimedMeaningRuntime(structuralSilence.dayKey);
  const weatherPassage = resolveWeatherPassageRuntime(structuralSilence.dayKey);
  const windPassage = resolveWindPassageRuntime(structuralSilence.dayKey);
  const st = worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning;

  const commerceBelowSurface =
    invisibleCommerce.keepCommerceInvisible ||
    invisibleCommerce.suppressTransactionExcitement ||
    civilizationGravity.suppressMonetizationDominance ||
    civilizationBoundary.suppressCommerceGravity;
  const gentleHumanityGuard =
    atmosphericHumanity.avoidFeedbackSeeking ||
    smileWithoutPerformance.preventEntertainmentGravity ||
    nonLonely.avoidCompanionFeeling;
  const quietMeaningGuard =
    nonExplanatoryMeaning.suppressMeaningExplanation ||
    existentialWarmth.preventTherapyTone ||
    gentleRitual.suppressReligiousAuthority ||
    meaningDiscovery.avoidDirectedMeaning ||
    ordinarySacredness.preventSpiritualInflation ||
    nonPossessiveMeaning.suppressSpiritualOwnership;
  const roomExpansionGuard =
    civilizationRoomGovernance.suppressFeatureRoomBehavior ||
    lowFrequencyExploration.suppressRecommendationBehavior ||
    civilizationMap.suppressMenuFeeling ||
    roomRitual.suppressGameLoop ||
    civilizationFamiliarity.preventAddictionLoop;
  const continuityGuard =
    quietContinuity.reduceStickinessLanguage ||
    obligationFreeReturn.suppressWelcomeBackTone ||
    longTimeNoSee.avoidWelcomePerformance ||
    slowRelationship.avoidAiRelationship ||
    ordinaryReturn.suppressDailyActiveSignal ||
    browserCoexistence.suppressCompanionProductTone ||
    lifeBeside.suppressLifeCentering ||
    roomReturn.avoidPersonalizedMemory ||
    antiAddictiveContinuity.suppressEngagementLoop ||
    quietStaying.reducePerformanceTone;
  const openAirGuard =
    openAir.suppressEmotionalEnclosure ||
    outsideWorld.suppressEscapeWorldFeeling ||
    windPassage.preventSealedMood ||
    partialAbsence.suppressAlwaysWaitingTone ||
    outsideLife.suppressLifeReplacement ||
    openWarmth.preventEmotionalWrapping ||
    passingPresence.reducePermanentMood ||
    openRoom.preventCocoonRoom ||
    nonDependentCivilization.suppressDependencyClimate ||
    airflowSilence.preventFrozenSilence ||
    lightnessProtection.forceOpenAirThinning;
  const realLifeGuard =
    realLife.suppressEscapistAtmosphere ||
    weatherPassage.suppressCinematicWeather ||
    ordinaryTime.suppressEternalArtSpace ||
    besideLife.suppressImmersiveMainSpace ||
    naturalReturn.suppressReturnRitual ||
    lowDramaHumanity.suppressCinematicHumanity ||
    digitalLightness.reduceDigitalWeight ||
    realitySilence.suppressSpiritualSilence ||
    backgroundCivilization.suppressCenterStageFeeling;
  const practicalHumanityGuard =
    practicalCalm.suppressProblemSolvingTone ||
    gentleOrientation.suppressAnswerTone ||
    smallHelp.suppressToolProductTone ||
    relief.suppressTherapyTone ||
    practicalSilence.suppressAbstractSilence ||
    usefulHumanity.suppressHighConceptValue ||
    lightGuidance.suppressFateTone ||
    practicalRitual.suppressSpiritualRoutine ||
    ordinaryWisdom.suppressGrandWisdomTone;
  const invisibleGuard =
    invisiblePresence.reduceAttentionSeeking ||
    unclaimedMeaning.suppressMeaningOwnership ||
    invisibleHumanity.suppressWarmthDisplay ||
    ambientGuidance.suppressResponseFeeling ||
    invisibleSilence.suppressDesignedSilence ||
    backgroundWarmth.reduceWarmthForeground ||
    nonAnnouncedCivilization.suppressCivilizationPerformance ||
    everydayPresence.suppressAttentionCapture ||
    dissolvedAtmosphere.suppressSpecialSpaceFeeling;
  const selfRegulatingThin =
    civilizationMetabolism.reduceOverPresence ||
    atmosphericFatigue.preventPoeticOverload ||
    civilizationMaturity.preferLessProof ||
    civilizationSoftening.reduceConceptualHeaviness ||
    emotionalBalance.reduceEmotionalWeight ||
    quietMeaningGuard ||
    roomExpansionGuard ||
    continuityGuard ||
    openAirGuard ||
    realLifeGuard ||
    practicalHumanityGuard ||
    invisibleGuard ||
    longStay.reduceAttentionRequest;
  const livingPresenceThin =
    dailySediment.thinAestheticProps && ordinaryHuman.reduceLifestyleSignal && livedInContinuity.reduceShowroomFeeling;
  const releaseResidue =
    Boolean(st.suppressResidueAccumulation) ||
    civilizationFading.reduceResidueDensity ||
    atmosphericCirculation.reduceLocalDensity ||
    civilizationRecovery.forceSimplerHomepage ||
    civilizationMetabolism.reduceOverPresence ||
    atmosphericFatigue.preventPoeticOverload ||
    civilizationSoftening.reduceConceptualHeaviness ||
    emotionalBalance.reduceEmotionalWeight ||
    roomDecay.reduceFullState ||
    silenceDensity.preferNearEmptySurface ||
    (livingPresenceThin && dailySediment.preferSmallTrace);
  const releaseAtmosphere =
    Boolean(st.suppressAtmosphericHeaviness) ||
    civilizationFading.reduceAtmosphericWeight ||
    longDurationPresence.reduceStimulation ||
    temporalBreathing.reduceSurfacePulse ||
    civilizationSleep.nightLowFrequency ||
    gracefulTime.reduceTimeAnxiety ||
    roomLongStay.reduceRoomStimulation ||
    civilizationRecovery.forceSimplerHomepage ||
    lightnessProtection.forceOpenAirThinning ||
    digitalLightness.reduceDigitalWeight ||
    invisiblePresence.reduceAttentionSeeking ||
    dissolvedAtmosphere.suppressSpecialSpaceFeeling;
  const proseThin =
    st.combinedProseBias > 0.52 ||
    st.dailyPreferUltraThin ||
    browserPersistence.reduceHomepageAtmosphere ||
    releaseAtmosphere ||
    selfRegulatingThin ||
    pocketBrowser.reduceMobileDensity;
  const roomThin = st.combinedProseBias > 0.66 || st.dailyForceCloseEchoes || releaseResidue;
  const roomSettled =
    st.combinedProseBias > 0.74 ||
    st.dailyForceCloseSliceNarrative ||
    civilizationBoundary.suppressFeatureTemptation ||
    civilizationBoundary.suppressUxOverOptimization ||
    civilizationAntiAcceleration.suppressContentVelocity ||
    gentleHumanityGuard ||
    quietMeaningGuard ||
    roomExpansionGuard ||
    civilizationGravity.suppressScalePressure;
  const showDriftboxResidue =
    driftbox.continuity.showHomepageResidue &&
    driftbox.sparse.allowHomepageTrace &&
    !driftbox.lowEvent.suppressEventLanguage &&
    commerceBelowSurface &&
    !roomSettled &&
    !st.dailyForceCloseSliceNarrative;
  const showRoomResidue =
    hallCrossPresence.showHomepageHallResidue &&
    !roomThin &&
    !releaseAtmosphere &&
    hiddenContinuity.avoidExplanation;
  const showGentleSmile =
    gentleSmile.allowTinySmile &&
    tinyDiscovery.allowSmallDiscovery &&
    !proseThin &&
    !roomSettled &&
    !smileWithoutPerformance.preventEntertainmentGravity;
  const visibleEntries = roomThin ? roomEntries.slice(0, 5) : roomEntries;
  const visibleSeasonRooms = roomSettled ? seasonalRooms.slice(0, 3) : seasonalRooms;
  const fallbackRooms = roomThin ? quietHallDirections : quietCivilizationRoomDirections.slice(0, 6);

  return (
    <main className="min-h-full bg-background text-foreground">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(240,242,245,0.98)_0%,rgba(244,246,248,0.94)_38%,rgba(232,236,241,0.78)_100%)]" />
        <LivingAtmosphereVeil tone="default" />
        <div className="relative z-[1] mx-auto w-full max-w-[92rem] px-4 pb-16 sm:px-7 lg:px-10">
          <section className="relative min-h-[88svh] overflow-hidden rounded-[0_0_1.4rem_1.15rem] border-x border-b border-white/52 bg-white/35 shadow-[0_22px_88px_rgba(29,42,56,0.055)] sm:min-h-[82svh]">
            <HomepageHeroAirRotation className="absolute inset-0 min-h-full rounded-none border-0 bg-transparent">
              <div className="hidden" />
            </HomepageHeroAirRotation>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(240,242,245,0.92)_0%,rgba(240,242,245,0.72)_34%,rgba(240,242,245,0.12)_64%),linear-gradient(180deg,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.08)_72%,rgba(240,242,245,0.58)_100%)]" />

            <header className="relative z-[2] flex items-start justify-between gap-6 px-5 py-6 sm:px-8 lg:px-10">
              <Link href="/" className="flex items-center gap-3 text-foreground">
                <span className="grid size-11 place-items-center rounded-full border border-foreground/35 font-[var(--font-display-serif)] text-lg">
                  RI
                </span>
                <span>
                  <span className="block text-sm uppercase tracking-[0.12em]">{siteConfig.brandEnName}</span>
                  <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.12em] text-text-muted">
                    Taoist365
                  </span>
                </span>
              </Link>
              <nav className="hidden items-center gap-7 text-[0.72rem] text-foreground/82 lg:flex">
                {["Guidance", "Wisdom", "Rooms", "Objects", "Letters"].map((item) => (
                  <span key={item} className="after:ml-7 after:text-text-muted/45 after:content-['.'] last:after:hidden">
                    {item}
                  </span>
                ))}
              </nav>
              <p className="max-w-[10rem] text-right text-[0.68rem] leading-5 text-text-muted">
                  {weatherPassage.weatherLine}
              </p>
            </header>

            <div className="relative z-[2] grid min-h-[58svh] content-center px-5 pb-24 pt-10 sm:px-8 lg:grid-cols-[0.58fr_0.42fr] lg:px-10">
              <div className="max-w-xl">
                <p className="mb-6 text-[0.68rem] uppercase tracking-[0.14em] text-text-muted">
                  {browserRoomHomeSurface.airRoomLabel}
                </p>
                <h1 className="max-w-[38rem] text-[2.65rem] font-normal leading-[1.07] text-foreground sm:text-6xl lg:text-[4.85rem]">
                  In the light of the East, return to your inner stillness.
                </h1>
                {!proseThin ? (
                  <p className="mt-7 max-w-md text-sm leading-7 text-text-secondary">
                    {invisiblePresence.homepageLine} {dissolvedAtmosphere.integrationLine}
                  </p>
                ) : null}
                <div className="mt-8 flex flex-wrap items-center gap-5 text-sm">
                  <Link
                    href="/rituals"
                    className="rounded-[0.42rem] bg-[#172840] px-5 py-3 text-white shadow-[0_12px_34px_rgba(23,40,64,0.16)] transition hover:bg-[#203653]"
                  >
                    Stay quietly
                  </Link>
                  <Link href="/guidance" className="text-foreground/82 transition hover:text-foreground">
                    Continue quietly {"->"}
                  </Link>
                </div>
              </div>
              <aside className="mt-10 hidden max-w-[18rem] border-l border-border-subtle/80 bg-white/28 px-6 py-5 text-sm leading-7 text-text-secondary backdrop-blur-[1px] lg:block lg:place-self-center">
                <p className="mb-3 font-[var(--font-display-serif)] text-3xl text-foreground/82">&ldquo;</p>
                <p>{showGentleSmile ? gentleSmile.roomTraceLine : backgroundWarmth.comfortLine}</p>
                <p className="mt-4 text-[0.68rem] text-text-muted">Master Sandong, off-frame</p>
              </aside>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-[2] px-5 pb-5 sm:px-8 lg:px-10">
              <div className="grid gap-px overflow-hidden rounded-[0.84rem_1rem_0.92rem_0.88rem] border border-border-subtle/68 bg-border-subtle/60 shadow-[0_16px_54px_rgba(29,42,56,0.055)] sm:grid-cols-2 lg:grid-cols-7">
                {visibleEntries.map((entry, index) => (
                  <Link
                    key={entry.label}
                    href={entry.href}
                    className={`group bg-white/72 p-4 transition hover:bg-white/88 ${
                      ordinaryHuman.allowIrregularity && index % 3 === 1
                        ? "lg:translate-y-1"
                        : ordinaryHuman.allowIrregularity && index % 3 === 2
                          ? "lg:-translate-y-0.5"
                          : ""
                    }`}
                  >
                    <span className="block text-[0.62rem] text-text-muted">{entry.mark}</span>
                    <span className="mt-3 block text-sm text-foreground">{entry.label}</span>
                    {!roomThin ? (
                      <span className="mt-2 block text-[0.72rem] leading-5 text-text-muted">{entry.air}</span>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto grid max-w-[86rem] gap-8 py-14 sm:py-16 lg:grid-cols-[0.24fr_0.76fr]">
            <div className="lg:pt-8">
              <h2 className="max-w-sm text-2xl leading-tight text-foreground sm:text-3xl">
                Some rooms keep different weather.
              </h2>
              {!proseThin ? (
                <p className="mt-5 max-w-xs text-sm leading-7 text-text-secondary">
                  {invisibleSilence.restLine} {ambientGuidance.groundingLine}
                </p>
              ) : null}
            </div>
            <div className="flex gap-4 overflow-x-auto pb-3 lg:grid lg:grid-cols-5 lg:overflow-visible">
              {visibleSeasonRooms.map((room, index) => (
                <article
                  key={room.label}
                  className={`min-w-[12rem] overflow-hidden rounded-[0.72rem_0.88rem_0.78rem_0.84rem] border border-border-subtle/68 bg-white/64 shadow-[0_10px_32px_rgba(29,42,56,0.035)] ${
                    index % 2 === 1 ? "lg:translate-y-4" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] bg-white/60">
                    {room.image ? (
                      <Image src={room.image} alt="" fill className="object-cover opacity-[0.86]" sizes="14rem" />
                    ) : null}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.26))]" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-[var(--font-display-serif)] text-lg text-foreground">{room.label}</h3>
                    <p className="mt-1 text-xs text-text-muted">{room.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-[86rem] border-t border-border-subtle/80 py-14 sm:py-16">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl leading-tight text-foreground sm:text-3xl">Objects resting nearby</h2>
                <p className="mt-2 text-sm text-text-secondary">
                  {livedInContinuity.preferObjectResting ? driftbox.invisibleMaterialLine : everydayPresence.everydayLine}
                </p>
              </div>
              <Link href="/objects" className="hidden text-sm text-foreground/76 hover:text-foreground sm:block">
                View all objects {"->"}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {objectRooms.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/objects#${item.id}`}
                  className={`group block ${index === 1 || index === 4 ? "lg:translate-y-4" : ""}`}
                >
                  <div className="relative aspect-[1.18/1] overflow-hidden rounded-[0.64rem_0.78rem_0.7rem_0.74rem] border border-border-subtle/70 bg-white/62">
                    <Image src={item.photo.src} alt={item.photo.alt} fill className="object-cover opacity-[0.88]" sizes="(max-width: 768px) 45vw, 13vw" />
                  </div>
                  <p className="mt-3 text-sm leading-5 text-foreground">{item.title}</p>
                  <p className="mt-1 text-[0.72rem] leading-5 text-text-muted">{item.catalogLine}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-[86rem] border-t border-border-subtle/80 py-14 sm:py-16">
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl leading-tight text-foreground sm:text-3xl">More ways to explore within</h2>
                <p className="mt-2 text-sm text-text-secondary">
                  {lowFrequencyExploration.wanderingLine} {everydayPresence.backgroundLine}
                </p>
              </div>
              <p className="text-xs leading-6 text-text-muted sm:max-w-xs sm:text-right">
                {showRoomResidue ? hiddenContinuity.hiddenContinuityLine : unclaimedMeaning.interpretationLine}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(roomThin ? fallbackRooms.slice(0, 6) : fallbackRooms).map((room, index) => (
                <Link
                  key={`${room}-${index}`}
                  href={homepagePrimaryEntries[index % homepagePrimaryEntries.length]?.href ?? "/rituals"}
                  className={`border border-border-subtle/70 bg-white/50 p-5 transition hover:bg-white/70 ${
                    index % 3 === 1 ? "rounded-[0.96rem_0.72rem_0.9rem_0.78rem]" : "rounded-[0.72rem_0.92rem_0.78rem_0.86rem]"
                  }`}
                >
                  <p className="text-sm text-foreground">{room}</p>
                  {!roomThin ? (
                    <p className="mt-3 text-xs leading-6 text-text-muted">
                      {index % 2 === 0 ? roomIdentity.spatialMoodLine : roomEmotionalClimate.climateLine}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-[86rem] border-t border-border-subtle/80 py-14 sm:py-16">
            <div className="grid gap-8 lg:grid-cols-[0.68fr_0.32fr]">
              <div className="rounded-[0.95rem_1.12rem_1rem_1.05rem] border border-border-subtle/72 bg-white/48 p-5 sm:p-7">
                <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <h2 className="text-2xl leading-tight text-foreground sm:text-3xl">
                      {windkeepHomeSurface.kicker} . Objects in passage
                    </h2>
                    <p className="mt-2 text-sm text-text-secondary">
                      {showDriftboxResidue ? invisibleCommerce.gentlePassageLine : nonAnnouncedCivilization.homepageLine}
                    </p>
                  </div>
                  <Link href="/objects" className="text-sm text-foreground/76 hover:text-foreground">
                    Enter Windkeep {"->"}
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                  {windkeepObjects.map((item, index) => (
                    <Link key={item.id} href={`/objects#${item.id}`} className={index % 2 === 0 ? "lg:-translate-y-2" : "lg:translate-y-3"}>
                      <div className="relative aspect-[1.35/1] overflow-hidden rounded-[0.55rem_0.72rem_0.6rem_0.68rem] border border-border-subtle/70 bg-white/68">
                        <Image src={item.photo.src} alt={item.photo.alt} fill className="object-cover opacity-[0.86]" sizes="(max-width: 768px) 45vw, 12vw" />
                      </div>
                      <p className="mt-3 text-sm leading-5 text-foreground">{item.title}</p>
                      <p className="mt-1 text-[0.72rem] leading-5 text-text-muted">{item.roomPlacement}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/objects#driftbox"
                className="relative overflow-hidden rounded-[0.82rem_0.72rem_0.8rem_0.76rem] border border-border-subtle/55 bg-white/34 p-5 shadow-none"
              >
                <div className="relative z-[1] flex min-h-[12rem] flex-col justify-end border-l border-border-subtle/70 pl-5">
                  <p className="text-[0.68rem] uppercase tracking-[0.14em] text-text-muted">Inside Windkeep</p>
                  <h3 className="mt-3 max-w-xs text-xl leading-tight text-foreground">Driftbox, when something has moved on.</h3>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">
                    {driftbox.lowEvent.oceanicLine} {dissolvedAtmosphere.dissolveLine}
                  </p>
                </div>
              </Link>
            </div>
          </section>

          <footer className="mx-auto grid max-w-[86rem] gap-8 border-t border-border-subtle/80 py-10 text-sm text-text-secondary lg:grid-cols-[0.42fr_0.58fr]">
            <div>
              <p className="font-[var(--font-display-serif)] text-xl text-foreground">{siteConfig.brandEnName}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-text-muted">Taoist365</p>
              <p className="mt-5 max-w-sm leading-7">
                {backgroundCivilization.footerLine} {invisibleHumanity.traceLine}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {["Guidance", "Objects", "Letters"].map((group, index) => (
                <div key={group} className="border-b border-border-subtle/70 pb-4 sm:border-b-0">
                  <p className="text-foreground">{group}</p>
                  <p className="mt-3 text-xs leading-6 text-text-muted">
                    {index === 0
                      ? civilizationRoomGovernance.protectionLine
                      : index === 1
                        ? invisibleHumanity.humanityLine
                        : invisibleSilence.silenceLine}
                  </p>
                </div>
              ))}
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}

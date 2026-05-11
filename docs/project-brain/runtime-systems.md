# Runtime Systems

## QUICK CONTEXT BOOTSTRAP

- Twenty-six top-level fields behind `useWorldRuntime()` include **`worldEcologyCalibration`**（**`ecologyCalibratedStructuralThinning`**，生态中间叠化）、**`worldCivilizationStabilization`**（输出 **`civilizationStabilizedStructuralThinning`** = **intermediate civilization stabilization pass / transitional stabilization / non-final atmosphere layer**）与 **`worldAiNativeInfrastructure`**（**`invisibleInfrastructureStructuralThinning`** = **sole UI atmosphere thinning read / final invisible infrastructure pass**）—still deterministic, static-export safe, no user memory. **组件禁止**把文明层 pass 当作终端氛围依据（见 `terminology-governance.md`）。
- Outputs are day-deterministic from key + state inputs; static-export safe; no user memory or network as source of truth.
- Bundles are not marketing copy, random spectacle, or personalization hooks.
- When fields change, update this doc and resolve overlaps (especially guidance + structural silence) in code or `next-steps.md`.

## THIS DOCUMENT DEFINES

The runtime contract, bundle list, and field map for the **Taoist-inspired lifestyle guidance system**.

## CORE PRINCIPLES

- Support **ritual calm** and **breathable interfaces**: subtle drift, no feed loops or dramatic spikes.
- Same inputs → same outputs; absence is explicit and deterministic, never a loading glitch.

## SYSTEM DETAILS

### Runtime contract

- Deterministic by day key and state inputs
- Static-export compatible
- No backend dependency
- No user identity memory
- No growth-loop UI behavior

### Aggregator

`useWorldRuntime()` returns:

- `presence: LivingPresenceBundle`
- `rhythm: HumanRhythmBundle`
- `aging: WorldAgingBundle`
- `inertia: WorldInertiaBundle`
- `lowSignalHumanity: LowSignalHumanityBundle`
- `structuralSilence: StructuralSilenceBundle`
- `materialization: WorldMaterializationBundle`
- `worldDensity: WorldDensityCalibrationBundle`
- `worldRegulation: WorldRegulationBundle`
- `worldStability: WorldStabilityBundle`
- `browserReality: BrowserRealityBundle`
- `worldStabilityEngine: WorldStabilityEngineBundle`
- `runtimeRetirement: RuntimeRetirementBundle`
- `lowRefreshInternet: LowRefreshInternetBundle`
- `internetSedimentMaturity: InternetSedimentMaturityBundle`
- `antiSystemSelfAwareness: AntiSystemSelfAwarenessBundle`
- `realInternetDefaultness: RealInternetDefaultnessBundle`
- `worldMaturity: WorldMaturityLayerBundle` — `freeze`, `realObjectPresence`, `trueMail`, `realInternetAging`, `stillnessGovernor`, `realWorldEntry`
- `worldQuietPermanence: WorldQuietPermanenceLayerBundle` — `retirementEngine`, `quietInternet`, `objectPermanence`, `guidanceDissolution`, `mailThreadAging`, `stillnessReinforcement`
- `worldPostProductContinuity: WorldPostProductContinuityBundle` — `continuity`, `nonEvent`, `objectBackground`, `guidanceQuiet`, `mailLongThread`, `stillnessStabilization`, `browserExpansion`, `permanencePass`
- `worldDefaultExistence: WorldDefaultExistenceLayerBundle` — `defaultExistence`, `passiveCoexistence`, `objectRoomDissolution`, `guidancePostInteraction`, `mailPermanentThread`, `quietEquilibrium`, `internetDefaultnessEngine`, `structuralThinning`（base pass）
- `worldAmbientInternet: WorldAmbientInternetLayerBundle` — `ambientInternetEnvironment`, `interfaceDissolution`, `objectEnvironmentAbsorption`, `guidanceRoomWeather`, `mailBackgroundContinuity`, `worldEnvironmentalEquilibrium`, `longLivedInternetDefaultness`, **`ambientStructuralThinning`**（= base + ambient extreme pass；供 §23 叠化）
- `worldGovernance: WorldGovernanceLayerBundle` — `worldGovernanceEngine`, `runtimeEcology`, `silenceGovernance`, `postInteractionGovernance`, `objectGovernance`, `internetDefaultnessGovernance`, `worldSelfRestraint`, **`governedStructuralThinning`**（供 §24 继续叠化）
- `worldEcologyCalibration: WorldEcologyCalibrationLayerBundle` — `worldEcologyCalibration`, `longLivedInternetStability`, `silencePriority`, `guidanceEcologyGovernance`, `objectEcologyGovernance`, `mailLowThreadGovernance`, `internetDefaultnessStability`, **`ecologyCalibratedStructuralThinning`**（供 §25 叠化）
- `worldCivilizationStabilization: WorldCivilizationStabilizationLayerBundle` — `runtimeSociety`, `civilizationStability`, `silenceCivilization`, `guidanceWeatherFinalization`, `objectCivilizationGovernance`, `mailBackgroundCivilization`, `internetEnvironmentCivilization`, **`civilizationStabilizedStructuralThinning`**（供 §26 叠化）
- `worldAiNativeInfrastructure: WorldAiNativeInfrastructureLayerBundle` — `aiRuntimeOrchestration`, `aiGovernanceInfrastructure`, `civilizationContinuityInfrastructure`, `aiRuntimeSocietyGovernance`, `lowAwarenessInternet`, `aiNativeCommerce`, `aiCivilizationStability`, **`invisibleInfrastructureStructuralThinning`**（**UI 最终变薄**）

### 1) Living Presence

Path: `src/data/living-presence-runtime/*`

Core fields: `dayKey`, `monthPacific`, `worldId`, `worldLabel`, `resonance`, `visualProfile`, `weatherDriftLine`, `seasonalRoomLine`, `ambientPresenceLine`, `roomTemperatureLine`, `analogTimeLine`, `browserTemporalLine`, `mailTemporalLine`, `humanRoomTemporalLine`, `antiFeedReminder`

Purpose: shared same-day room baseline across pages.

### 2) Human Rhythm

Path: `src/data/human-rhythm-runtime/*`

Core fields: `atmosphereSummary`, `unfinishedLine`, `interruptionLine`, `silenceLine`, `domesticLine`, `relocationLine`, `exhaustionLine`, `householdFlowLine`, `lightCycleLine`, optional `lateNightLine`, `sleepResidueLine`, `coLivingLine`, `guidanceRhythmLine`, `mailRhythmLine`

Purpose: daily-life rhythm (not character or lore).

### 3) World Aging

Path: `src/data/world-aging-runtime/*`

Core fields: `ageStateId`, `ageLabel`, `sedimentLine`, optional `forgettingLine`, `backgroundObjectLine`, `roomDustLine`, optional `slowMemoryRecurrence`, `layoutAgeLine`, `ritualAgingLine`, `guidanceFatigueLine`, `mailSedimentLine`, `antiRetroLine`, `index`

Purpose: long-lived weight without fake archive theater.

### 4) World Inertia

Path: `src/data/world-inertia-runtime/*`

Core fields: `silenceDensity`, `longStillnessLine`, `ambientRepetitionLine`, `backgroundPresenceLine`, `guidanceMinimal`, `ritualSilenceLine`, `objectBackgroundLine`, `objectSilenceLine`, `objectPermanenceLine`, `layoutStabilityLine`, `mailSedimentLine`, `antiOverwritingAudit`

Purpose: stable, low-refresh world—less “trying” over time.

### 5) Low Signal Humanity

Path: `src/data/low-signal-humanity/*`

Core fields: `residualPresenceLine`, `quietReturnLine`, `anonymousTraceLine`, `usageSedimentLine`, `humanEnergyLine`, `sedimentWindow`, object-level fields, `guidanceFalloff`, `ritualBackgroundLine`, `mailThreadSedimentLine`, `structuralMemoryLine`, `humanSignalMemoryLine`, `signalFalloff`, `antiDramaAudit`

Purpose: sparse anonymous traces—no fake social layer (see `low-signal-humanity.md`).

### 6) Structural Silence Engine

Path: `src/data/structural-silence-engine/*`

Core fields: `pageEnergy`, `pageDensity`, `structuralAbsence`, `sectionFallthroughLine`, `ambientVisibility`, `slowRotation`, `silenceThresholds`, `passiveLayout`, `ritualAbsence`, `guidanceFragmentation`, `objectFade`, `residueWindow`, `boundary`, `explanationFatigue`

Purpose: maturity through intentional absence and page energy.

### 7) World Materialization

Path: `src/data/world-materialization/*`

Core bundle fields: `dayKey`, `worldStateId`, `ageStateId`, `weathering` (light/surface/paper/room/residue lines), `surfaceMemory` (home | objects | desk | mail), `roomAir` (home | guidance | mail | objects | ritual | desk), `paperAgingLine`, `ambientMaterialDensityLine`, `domesticSurfaceLine`, `physicalSilenceLine`, `lightFalloffLine`, `quietLightPhysicsLine`, `browserGlowLine`, `visualAging`, `textureBudget`, `textureFatigueAuditLine`, `materialBoundaryLine`

Purpose: ordinary long-use **physical** room grammar—air, light falloff, surface memory, touch sediment, anti–lifestyle-porn boundaries—implemented as **copy + layout hooks**, not CSS filters or animation.

### 8) World Density Calibration

Path: `src/data/world-density-calibration/*`

Core fields: `densityBudget`, `sectionMatrix` (per-page section keys), `mutualExclusion`, `residueSuppressionTier` / `residueSuppressionLine`, `explanationRetirement`, `ambientFreeze`, `guidanceCollapse`, `ritualQuiet`, `mailDefaulting`, `homeThinning`, `longTabPresenceLine`, `browserFamiliarityLine`, `worldExhaustionLine`, `stabilityPressure`, `antiOverdesignLine`, `lowRefreshMultiplier`, `lowRefreshGovernorLine`; plus `objectSilenceWindow()` for catalog foreground cadence.

Purpose: long-lived URL maturity—**default silence**, runtime **mutual exclusion**, explanation **retirement**, and **absence-as-structure** (not hidden loading).

### 9) World Regulation Engine

Path: `src/data/world-regulation-engine/*`

Core bundle fields: `dayKey`, `ageStateId`, `priority`, `fatigue`, `crossRuntimeSuppression`, `breathing`, `restWindows`, `softCollapse`, `understatement`, `foregroundPressure`, `narrativeOverflow`, `residualBalance`, `attentionWithdrawal`, `worldRestraintLine`, `antiPerformanceReminder`, `objectPermanence` (`regulatedForegroundIds`, `objectForegroundCap`, permanence lines).

Purpose: **deterministic restraint** across runtimes—which voices step back when others are loud; thin-day posture; overflow audit; anti-performance tone guard; foreground object quota.

Resolution: `resolveWorldRegulationBundle(presence, rhythm, aging, inertia, lowSignalHumanity, structuralSilence, materialization, worldDensity)` — **after** `worldDensity`.

UI touchpoints (current): `ObjectRuntimeGate`, `GuidanceSessionClient`, `LivingDailyBand`, `MailTemporalPresence`, `WorldRegulationPresenceStrip` (Home, Objects).

See: `world-regulation.md`, `world-breathing.md`, `runtime-hierarchy.md`, `silence-governance.md`, `anti-performance.md`, `object-backgrounding.md`, `absence-policy.md`.

### 10) World Stability Governance

Path: `src/data/world-stability-governance/*`

Core bundle: `stabilityBudget`, `runtimeRetirementPressure`, `foregroundFriction`, `ambientGovernorLine`, `changeResistance`, `slowEvolutionLine`.

Purpose: **world resists churn**—higher friction for foreground novelty; feeds browser-reality **object sediment** narrowing.

### 11) Browser Reality Engine

Path: `src/data/browser-reality-engine/*`

Core bundle: long-tab, bookmark/hostname familiarity, reopen moods, background/forgotten tab, old-URL feel, browser aging, tab survival, residue, ambient revisit, browser silence, object internet sediment (`sedimentForegroundIds`), **guidance passive surface**.

Purpose: **long-lived URL + tab semantics**—not “active product”; no server memory; sediment is structural, not personalized.

See: `browser-reality.md`, `long-tab-presence.md`, `hostname-familiarity.md`, `non-urgent-internet.md`, `internet-sediment.md`, `passive-open-states.md`, `world-stability.md`.

### 12) World Stability Engine

Path: `src/data/world-stability-engine/*` — lock, long-form freeze, static pressure, unchanged structure, layout memory; **`engineStabilityScalar`** feeds retirement pressure.

### 13) Runtime Retirement System

Path: `src/data/runtime-retirement-system/*` — registry, lifecycle, object retirement (**1–3** `rareForegroundObjects`), world fatigue/rest, guidance retirement surface. See `runtime-retirement.md`, `object-retirement.md`, `passive-worlds.md`.

### 14) Low Refresh Internet

Path: `src/data/low-refresh-internet/*` — `low-refresh-internet.md`.

### 15) Internet Sediment Maturity

Path: `src/data/internet-sediment-maturity/*` — hostname aging, revisit thickness, old tab residue (browser-side metaphor only).

### 16) Anti–System Self Awareness

Path: `src/data/anti-system-self-awareness/*` — `anti-meta-governance.md`.

### 17) Real Internet Defaultness

Path: `src/data/real-internet-defaultness/*` — `internet-defaultness.md`.

### 18) World Maturity Layer (composed)

Path: `src/data/world-maturity-layer/system.ts` resolving, in order:

- `world-freeze-system` — stability map, retirement matrix alignment, freeze boundaries (`world-freeze.md`, policy siblings).
- `real-object-presence` — shelf thinning, quiet retirement language, no scarcity marketing (`real-object-existence.md`).
- `true-mail-continuity` — long-thread, uneven reply, no service pipeline (`true-mail-continuity.md`).
- `real-internet-aging` — plain old-URL / tab / hostname copy (`real-internet-aging.md`).
- `world-stillness-governor` — change pressure, prose density governor, anti-expansion (`stillness-governance.md`).
- `real-world-entry` — life takes over objects (charter in `real-object-existence.md`).

UI: `WorldMaturityStrip` (Home), `MailContinuityStrip` (Mail), `RealObjectPresencePanel` (Objects).

### 19) World Quiet Permanence Layer (composed)

Path: `src/data/world-quiet-permanence-layer/system.ts` — composes:

- `runtime-retirement-engine` — policy stage + retirement lines (complements `runtime-retirement-system`; see `runtime-retirement-engine.md`).
- `quiet-internet-permanence` — plain long-URL / tab / hostname defaultness (`quiet-internet-permanence.md`, `long-lived-site-behavior.md`).
- `object-permanence-engine` — object-as-infrastructure bias + `objectProseThinBias` (`object-permanence.md`).
- `guidance-dissolution` — extra caps on noticing, optional route/closure retirement (`guidance-dissolution.md`).
- `mail-thread-aging` — long-thread aging lines (`mail-thread-aging.md`).
- `world-stillness-reinforcement` — stillness scalar + reinforcement copy (`world-stillness-reinforcement.md`).

UI: `LongTabPresenceNote` (quiet internet line), `MailContinuityStrip` (thread aging line on half of days), `ObjectPermanenceStrip` (Objects), `GuidanceSessionClient` (dissolution caps / routes / closure).

See also: `world-defaultness.md`.

### 20) World Post-Product Continuity Layer (composed)

Path: `src/data/world-post-product-continuity-layer/system.ts` — composes:

- `world-continuity-engine` — long-unbroken URL / tab continuity (`world-continuity.md`).
- `non-event-internet-layer` — non-campaign, non-update energy (`non-event-web.md`).
- `object-background-continuity` — catalog exits center stage (`background-object-governance.md`).
- `guidance-quiet-collapse` — weather-first collapse policy (`guidance-collapse-policy.md`).
- `mail-long-thread-engine` — sediment mail (`mail-thread-presence.md`).
- `world-stillness-stabilization` — self-quieting stack (`world-stillness-equilibrium.md`).
- `browser-reality-expansion` — extra browser-habit lines (`browser-reality-principles.md`).
- **`permanencePass`** (`permanence-thinning-pass.ts`) — Phase H UI thinning: fewer Daily blocks, sparser maturity strip, thinner Mail/Objects, stacked with `guidanceDissolution` on Guidance (`post-product-internet.md`, `quiet-permanence.md`, `default-presence-philosophy.md`).

### 21) World Default Existence Layer (composed)

Path: `src/data/world-default-existence-layer/system.ts` — composes:

- `world-default-existence` — 无 arrival / 无「发现」叙事（`default-existence-principles.md`, `post-interaction-internet.md`）。
- `passive-internet-coexistence` — 后台 tab 共存（`passive-web-coexistence.md`）。
- `object-room-dissolution` — 物体溶解进房间（`object-room-assimilation.md`）。
- `guidance-post-interaction` — 后交互 guidance 文案（`guidance-dissolution-philosophy.md`）。
- `mail-permanent-thread` — 永久低线程 mail（`mail-permanence-logic.md`）。
- `world-quiet-equilibrium` — 自稳压力（`world-quiet-equilibrium.md`, `anti-expansion-governance.md`）。
- `internet-defaultness-engine` — 默认网址行为（`long-lived-url-behavior.md`, `internet-defaultness.md`）。
- **`structuralThinning`** — Phase H 重度：`combinedProseBias`、`dailyPreferUltraThin`、`guidanceStackWeatherOnly` 等（叠在 `permanencePass` 上）。

UI（变薄以 §26 **`invisibleInfrastructureStructuralThinning`** 为准）: `LivingDailyBand`, `WorldMaturityStrip`, `GuidanceSessionClient`, `MailContinuityStrip`, `MailTemporalPresence`, `RealObjectPresencePanel`, `ObjectPermanenceStrip`。

### 22) World Ambient Internet Layer (composed)

Path: `src/data/world-ambient-internet-layer/system.ts` — composes:

- `ambient-internet-environment` — tab-as-room, background tab, non-performative space (`ambient-internet.md`, `environmental-presence.md`).
- `interface-dissolution-engine` — interface thinning vocabulary (`post-interface-web.md`).
- `object-environment-absorption` — objects as room infrastructure (`object-environment-assimilation.md`).
- `guidance-room-weather` — guidance as weather, not dialogue (`guidance-as-weather.md`).
- `mail-background-continuity` — mail as shelf continuity (`background-human-continuity.md`).
- `world-environmental-equilibrium` — restraint / backgrounding language (`environmental-equilibrium.md`).
- `long-lived-internet-defaultness` — hostname air, long-tab defaultness (`default-browser-presence.md`).
- **`ambientStructuralThinning`** — `extreme-structural-thinning-pass.ts`: stacks on §21 `structuralThinning` using `equilibriumPressure`; feeds **`governedStructuralThinning`** (§23) → **`ecologyCalibratedStructuralThinning`** (§24) → **`civilizationStabilizedStructuralThinning`** (§25) → **`invisibleInfrastructureStructuralThinning`** (§26).

See: `internet-environment-principles.md`, `quiet-environment-governance.md`.

### 23) World Governance Layer (composed)

Path: `src/data/world-governance-layer/system.ts` — composes:

- `world-governance-engine` — boundaries, anti-productization, anti-feed, anti-SaaS posture (`world-governance.md`, `anti-productization-rules.md`).
- `runtime-ecology-engine` — mutual suppression vocabulary (`runtime-ecology.md`).
- `silence-governance-system` — formal absence / residue retirement (`silence-governance.md`).
- `post-interaction-governance` — interaction retirement, weather-first (`post-interaction-governance.md`).
- `object-governance-engine` — anti-catalog, room infrastructure (`object-governance.md`).
- `internet-defaultness-governance` — quiet URL / tab posture (`internet-defaultness-governance.md`).
- `world-self-restraint` — expansion resistance (`self-restraint-philosophy.md`).
- **`governedStructuralThinning`** — `extreme-governance-thinning-pass.ts`: stacks on **`ambientStructuralThinning`** using fatigue + `pageEnergy` + structural absence pressure (`long-term-non-deformation.md`); feeds §24 → §25 → §26 thinning chain.

### 24) World Ecology Calibration Layer (composed)

Path: `src/data/world-ecology-calibration-layer/system.ts` — composes:

- `world-ecology-calibration` — mutual bandwidth / retreat vocabulary (`world-ecology-calibration.md`, `runtime-ecology-principles.md`).
- `long-lived-internet-stability` — stable URL posture (`long-lived-site-stability.md`).
- `silence-priority-system` — silence-first charter (`silence-priority.md`).
- `guidance-ecology-governance` — weather-not-AI (`guidance-ecology-governance.md`).
- `object-ecology-governance` — anti-catalog stability (`object-ecology-governance.md`).
- `mail-low-thread-governance` — shelf mail (`mail-low-thread-governance.md`).
- `internet-defaultness-stability` — background URL equilibrium (`internet-defaultness-stability.md`).
- **`ecologyCalibratedStructuralThinning`** — `extreme-ecology-calibration-thinning-pass.ts`: stacks on **`governedStructuralThinning`** using guidance fragmentation + `worldRegulation.breathing` + `foregroundPressure` + `permanencePass.proseCollapseBias` (`ambient-runtime-equilibrium.md`, `default-presence-governance.md`); feeds §25 **`civilizationStabilizedStructuralThinning`** → §26 **`invisibleInfrastructureStructuralThinning`**。

### 25) World Civilization Stabilization Layer (composed) — **non-final**

Path: `src/data/world-civilization-stabilization-layer/system.ts` — composes:

- `runtime-society-engine` — coexistence / retreat etiquette (`runtime-society.md`).
- `civilization-stability-engine` — long-horizon noise resistance (`civilization-stability.md`).
- `silence-civilization-system` — silence-first civilization charter (`silence-civilization.md`).
- `guidance-weather-finalization` — guidance as room weather (`guidance-weather-finalization.md`).
- `object-civilization-governance` — room-structure objects (`object-civilization-governance.md`).
- `mail-background-civilization` — correspondence sediment (`mail-background-civilization.md`).
- `internet-environment-civilization` — browser-environment posture (`internet-environment-civilization.md`).
- **`civilizationStabilizedStructuralThinning`** — `extreme-civilization-stabilization-thinning-pass.ts`: **intermediate / transitional stabilization only**; stacks on **`ecologyCalibratedStructuralThinning`** using `explanationFatigue` + `crossRuntimeSuppression` (`ambient-civilization-equilibrium.md`, `long-lived-civilization-presence.md`, `default-environment-governance.md`, `terminology-governance.md`); feeds §26 **`invisibleInfrastructureStructuralThinning`**。**Not** a UI-terminal atmosphere layer.

### 26) World AI Native Infrastructure Layer (composed) — **UI-final thinning**

Path: `src/data/world-ai-native-infrastructure-layer/system.ts` — composes:

- `ai-runtime-orchestration` — 不可见编排语言（orchestration，无面板）（`ai-runtime-orchestration.md`）。
- `ai-governance-infrastructure` — 治理基础设施：边界先于表面（`ai-governance-infrastructure.md`）。
- `civilization-continuity-infrastructure` — 世界连续性，而非用户画像（`civilization-continuity.md`, `civilization-continuity-principles.md`）。
- `ai-runtime-society-governance` — runtime 群落自治语气（`runtime-society-governance.md`）。
- `low-awareness-internet` — 低意识互联网默认（`low-awareness-internet.md`）。
- `ai-native-commerce` — 低信号商业（low-signal commerce）（`ai-native-commerce.md`）。
- `ai-civilization-stability` — 长期稳定压扩张（`long-lived-ai-environment.md`）。
- **`invisibleInfrastructureStructuralThinning`** — `extreme-invisible-infrastructure-thinning-pass.ts`: stacks on **`civilizationStabilizedStructuralThinning`** using `guidanceFragmentation` weather/route/single-line bias (`invisible-infrastructure.md`, `default-presence-infrastructure.md`).

## MAINTENANCE NOTES

- Prefer composing overlapping outputs in components over competing “winner” logic per feature.
- Document precedence where two bundles touch the same UI; use `next-steps.md` for a formal conflict matrix when needed.
- Keep absence deterministic and readable—never error- or loading-shaped.

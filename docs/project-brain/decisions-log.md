# Decisions Log

## QUICK CONTEXT BOOTSTRAP

- Append-only shipped choices for the **Taoist-inspired lifestyle guidance system**—stops every thread from relitigating architecture.
- Factual receipts, not aspiration; log after behavior exists, in short entries.
- Do not plan the future here or paste full specs—link sibling brain files instead.
- Add a dated block when runtime or **breathable interfaces** boundaries change materially.

## THIS DOCUMENT DEFINES

What was finalized and when, anchoring **emotional continuity** of decisions for humans and AI.

## CORE PRINCIPLES

- Prefer dated, scoped bullets over long essays.
- **Permanent boundaries** stay explicit until a real rule change warrants editing them.

## SYSTEM DETAILS

### 2026-05-09 — Guidance Operating Layer Introduced

- State-first bounded flow: `/guidance` + `/guidance/session`.
- Replaced `guidance-operating-system` path with `guidance-operating-layer`.
- 12+ entry states; weather / routing / pause boundaries.

### 2026-05-09 — Living Presence Runtime Introduced

- Shared same-day world state across core pages.
- Weather drift, seasonal room, analog time, browser temporal residue; slow shelf / object circulation primitives.

### 2026-05-09 — Human Rhythm Runtime Introduced

- Unfinished domesticity, interruption, silence density, late-night continuity, sleep residue; relocation, exhaustion; sparse co-living trace (non-character).

### 2026-05-09 — World Aging Runtime Introduced

- World age states and index controls; sediment, forgetting, drift, room dust, long recurrence; guidance fatigue and ritual aging lines.

### 2026-05-09 — World Inertia Runtime Introduced

- Silence density, long stillness; guidance minimal behavior and route falloff; object backgrounding / silence / permanence; layout stability; anti-overwriting audit.

### 2026-05-09 — Low Signal Humanity Runtime Introduced

- **Low-signal humanity** layer with anti-drama guardrails; memory and mail sediment; passive continuity over loud expression.

### 2026-05-09 — Structural Silence Engine Introduced

- Deterministic absence, fallthrough, ambient visibility; guidance fragmentation; object foreground gating; page energy; `structuralSilence` on `useWorldRuntime`.

### 2026-05-09 — Project Governance / Structured Memory Architecture

Institutional baseline recorded. Taoist365 established:

- `docs/project-brain/` as permanent source of truth for product intent and runtime posture.
- `memory-protocol.md` as the governance layer over that corpus.
- Bootstrap recovery system (`QUICK CONTEXT BOOTSTRAP` sections) for rapid thread alignment.
- Thread startup protocol (read order before substantive work).
- Emotional consistency safeguards (terminology, boundaries, propagation rules).
- Runtime documentation hierarchy (field inventory vs. architecture vs. domain meaning).
- This log as the canonical decision registry; append on ship, do not relitigate settled rows in chat.

Purpose: reduce AI forgetting, emotional drift, philosophy conflicts, unprompted redesign, and context fragmentation.

### 2026-05-09 — Homepage Emotional Consistency Pass

Home (`src/app/(marketing)/page.tsx` and related living/guidance components) adjusted for calmer reading, not new behavior:

- Less dashboard / SaaS energy in hero and section shells.
- Softer typography rhythm (weight, scale, line height) on headline and downstream blocks.
- More breathing space between hero cluster, living band, and echo stack.
- Fewer visible system labels (“strip,” “Loading,” shouty uppercase cues) where they read as product chrome.
- Low-signal copy and layout read as one continuous room tone, not stacked widgets.
- Quieter borders and spacing so UI signals less insistence.
- Overall posture leans further into **quiet ritual atmosphere** and **breathable interfaces** without changing routes or runtime contracts.

### 2026-05-09 — World Materialization Layer

- New deterministic bundle `materialization` from `src/data/world-materialization/` (`resolveWorldMaterializationBundle`), wired through `useWorldRuntime()`.
- Prose pools for weathering, surface memory, room air (incl. desk), light falloff, quiet light, browser glow, paper aging, domestic surfaces, physical silence, visual aging (copy tier), texture budget, touch sediment per object id, and anti-aestheticization boundaries.
- Surfaces: Home hero band; Objects (`ObjectsPageMaterial`); Desk (`DeskPageMaterial`); Guidance arrival + session rhythm banner; Mail shelf block; object aging lines gain touch sediment.
- Still static export, no backend, no personalization, no motion or filter “physics.”

### 2026-05-09 — World Density Calibration + Long-Lived Maturity

- `worldDensity` bundle from `src/data/world-density-calibration/`, resolved **after** `structuralSilence` / inertia / aging and wired in `useWorldRuntime()`.
- Density budgets, section absence matrix, runtime mutual exclusion, residue suppression, explanation retirement, ambient freeze, guidance collapse (routes optional / noticing optional), ritual quiet, mail defaulting, home thinning, long-tab + browser familiarity, world exhaustion, anti-overdesign audit, low-refresh governor.
- UI: `StructuralAbsenceGate` and related `src/components/density/*`; Home / Objects / Desk / Guidance arrival / Mail band / Daily / Guidance session / Objects gate consume `worldDensity`.
- `ObjectRuntimeGate` also respects `objectSilenceWindow` foreground cadence.

### 2026-05-09 — World Regulation Engine (self-regulating world)

- New package `src/data/world-regulation-engine/` with `resolveWorldRegulationBundle()` composed from priority matrix, fatigue balancer, cross-runtime suppression, breathing, ambient rest windows, soft collapse, page understatement, foreground pressure, narrative overflow, residual balance, attention withdrawal, world restraint line, anti-performance reminder, and object permanence (regulated foreground ids, cap 2–4).
- **`worldRegulation`** wired through `useWorldRuntime()` after `worldDensity`.
- UI: `ObjectRuntimeGate` intersects catalog with `regulatedForegroundIds`; `GuidanceSessionClient` tightens noticing under suppression/overflow and respects `guidanceUnderstatement`; `LivingDailyBand` respects human-trace suppression, echo/overflow gates, ultra-thin daily for `almostStill`/`residualOnly`; `MailTemporalPresence` thins under `mailUnderstatement`; `WorldRegulationPresenceStrip` on Home and Objects for low-frequency regulation lines.
- Brain docs: `world-regulation.md`, `world-breathing.md`, `runtime-hierarchy.md`, `silence-governance.md`, `anti-performance.md`, `object-backgrounding.md`, `absence-policy.md`.

### 2026-05-09 — Browser Reality & World Stability

- `src/data/world-stability-governance/`: `resolveWorldStabilityGovernanceBundle` — stability budget, runtime retirement pressure, **foreground friction**, ambient governor, change resistance, slow evolution line; resolved after `worldRegulation`, before browser layer.
- `src/data/browser-reality-engine/`: long-tab, bookmark/hostname, reopen/return-without-purpose, background & forgotten tab, old URL & browser aging, tab survival, residue, ambient revisit, browser silence, **object internet sediment** (`sedimentForegroundIds`), **guidance passive surface**; `resolveBrowserRealityBundle` takes `worldStability` for friction-fed sediment.
- `useWorldRuntime()`: adds **`worldStability`**, **`browserReality`**.
- UI: `ObjectRuntimeGate` also requires **`sedimentForegroundIds`**; `LongTabPresenceNote`, `LivingDailyBand`, `GuidanceArrivalClimate`, `MailTemporalPresence`, `BrowserHostnameFoot` (Objects), `BrowserDeskRealityStrip` (Desk); `GuidanceSessionClient` passive open path + `GuidanceSessionRhythmBanner` hidden when passive.
- Docs: `browser-reality.md`, `long-tab-presence.md`, `internet-sediment.md`, `passive-open-states.md`, `world-stability.md`, `hostname-familiarity.md`, `non-urgent-internet.md`.

### 2026-05-09 — Runtime Retirement & World Stabilization (final arc)

- New packages: `runtime-retirement-system/` (registry, lifecycle, fatigue `active|thinning|tired|resting|almostAbsent`, rest days, object retirement **1–3** `rareForegroundObjects`, guidance ultra-minimal surface), `world-stability-engine/` (stability lock, static pressure, `engineStabilityScalar` feeding retirement pressure), `low-refresh-internet/`, `internet-sediment-maturity/`, `anti-system-self-awareness/`, `real-internet-defaultness/`.
- `useWorldRuntime()` extended with six bundles; `resolveRuntimeRetirementBundle` takes `worldStabilityEngine` + `browserReality`; retirement pressure scaled by engine scalar.
- `ObjectRuntimeGate`: requires `runtimeRetirement.objectRetirement.rareForegroundObjects` (cap ≤3).
- `GuidanceSessionClient`: `guidanceRetirement.ultraMinimalRoom` branch (weather + optional label + line + home); `forceZeroNoticing`; `skipRoutes` with ultra minimal; rhythm banner hidden when ultra minimal; anti-meta footer on rare days.
- `LivingDailyBand`, `MailTemporalPresence`, `WorldRegulationPresenceStrip`, `BrowserHostnameFoot`: rest / low-refresh / anti-meta / defaultness lines.
- Docs: `runtime-retirement.md`, `world-stability-engine.md`, `low-refresh-internet.md`, `internet-defaultness.md`, `passive-worlds.md`, `object-retirement.md`, `anti-meta-governance.md`.

### 2026-05-09 — World ecology calibration / long-lived internet stability

- 新目录（Phase A–G）：`world-ecology-calibration/`, `long-lived-internet-stability/`, `silence-priority-system/`, `guidance-ecology-governance/`, `object-ecology-governance/`, `mail-low-thread-governance/`, `internet-defaultness-stability/`；由 **`world-ecology-calibration-layer/system.ts`** 聚合。
- **`ecologyCalibratedStructuralThinning`**：`extreme-ecology-calibration-thinning-pass.ts` 叠在 **`governedStructuralThinning`** 上，输入 `guidanceFragmentation`、`worldRegulation.breathing`、`foregroundPressure`、`permanencePass.proseCollapseBias`（**中间输出**，供文明稳定化层继续叠化）。
- `useWorldRuntime()` 新增 **`worldEcologyCalibration`**；UI **不再**以该字段为最终变薄（见「World civilization stabilization」条）。
- 文档：见 README「Ecology calibration」索引；`runtime-systems.md` §24；`world-ecology-calibration.md` 等；更新 `runtime-hierarchy.md`, `architecture.md`, `next-steps.md`。

### 2026-05-09 — World governance / long-term non-deformation

- 新目录（Phase A–G）：`world-governance-engine/`, `runtime-ecology-engine/`, `silence-governance-system/`, `post-interaction-governance/`, `object-governance-engine/`, `internet-defaultness-governance/`, `world-self-restraint/`；由 **`world-governance-layer/system.ts`** 聚合。
- **`governedStructuralThinning`**：`extreme-governance-thinning-pass.ts` 叠在 **`worldAmbientInternet.ambientStructuralThinning`** 上，输入 `runtimeRetirement.worldFatigue`、`structuralSilence.pageEnergy`、structural absence 掩码。
- `useWorldRuntime()` 新增 **`worldGovernance`**；UI 变薄后经 ecology → civilization → **`worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning`**（见 AI-native infrastructure 条）。
- 文档：`world-governance.md`, `runtime-ecology.md`, `long-term-non-deformation.md`, `post-interaction-governance.md`, `object-governance.md`, `internet-defaultness-governance.md`, `self-restraint-philosophy.md`, `ambient-presence-charter.md`, `anti-productization-rules.md`；`silence-governance.md` 增补 bundle 说明；更新 README、`runtime-systems.md` §23、`runtime-hierarchy.md`、`architecture.md`、`next-steps.md`。

### 2026-05-09 — Post-human interface / ambient internet environment

- 新目录（Phase A–G）：`ambient-internet-environment/`, … `long-lived-internet-defaultness/`；由 **`world-ambient-internet-layer/system.ts`** 聚合。
- **`ambientStructuralThinning`**：`extreme-structural-thinning-pass.ts` 叠在 `worldDefaultExistence.structuralThinning` 上，并消费 `quietEquilibrium.equilibriumPressure`。
- `useWorldRuntime()` 新增 **`worldAmbientInternet`**；再经 governance → ecology calibration → civilization stabilization 叠化为 UI 最终变薄（见 civilization stabilization 条）。
- Home：`LivingDailyBand` / `WorldMaturityStrip` 在高 bias 日略收边框与标题/说明对比（仍可读）。
- 文档：`ambient-internet.md`, `post-interface-web.md`, `environmental-presence.md`, `object-environment-assimilation.md`, `guidance-as-weather.md`, `background-human-continuity.md`, `internet-environment-principles.md`, `environmental-equilibrium.md`, `default-browser-presence.md`, `quiet-environment-governance.md`；更新 README、`runtime-systems.md` §22、`runtime-hierarchy.md`、`architecture.md`、`next-steps.md`。

### 2026-05-09 — World default existence / post-interaction internet

- 新目录：`world-default-existence/`, `passive-internet-coexistence/`, `object-room-dissolution/`, `guidance-post-interaction/`, `mail-permanent-thread/`, `world-quiet-equilibrium/`, `internet-defaultness-engine/`，由 `world-default-existence-layer/system.ts` 聚合；**`structuralThinning`** 叠在 `permanencePass` 之上（重度变薄）。
- `useWorldRuntime()` 仅新增 **`worldDefaultExistence`** 字段。
- UI：`LivingDailyBand`（ultra-thin / echo / slice）、`WorldMaturityStrip`（bonus 模数）、`GuidanceSessionClient`（weather-only / 硬关 routes·closure）、`MailContinuityStrip`、`MailTemporalPresence`、`RealObjectPresencePanel`、`ObjectPermanenceStrip`。
- 文档：见 README 索引；`runtime-systems.md` §21；`post-interaction-internet.md`、`default-existence-principles.md` 等；更新 `internet-defaultness.md` 说明 engine 扩展层。

### 2026-05-09 — Post-product world continuity (composed + thinning pass)

- New dirs: `world-continuity-engine/`, `non-event-internet-layer/`, `object-background-continuity/`, `guidance-quiet-collapse/`, `mail-long-thread-engine/`, `world-stillness-stabilization/`, `browser-reality-expansion/`, composed in `world-post-product-continuity-layer/` with **`permanencePass`** (`permanence-thinning-pass.ts`) for Phase H UI thinning—**no new routes or product shells**.
- `useWorldRuntime()` adds **`worldPostProductContinuity`** only.
- UI: `LivingDailyBand` (collapsed world-age / inertia / low-signal blocks; human rhythm + echo gates; shareable figcaption), `WorldMaturityStrip` (rarer via `maturityStripModulus`), `MailContinuityStrip`, `RealObjectPresencePanel`, `ObjectPermanenceStrip`, `GuidanceSessionClient` (stacked `guidanceQuiet` on dissolution).
- Docs: `post-product-internet.md`, `world-continuity.md`, `non-event-web.md`, `background-object-governance.md`, `guidance-collapse-policy.md`, `mail-thread-presence.md`, `browser-reality-principles.md`, `world-stillness-equilibrium.md`, `quiet-permanence.md`, `default-presence-philosophy.md`; README, `runtime-systems.md` (§20), `runtime-hierarchy.md`, `architecture.md`, `next-steps.md` updated.

### 2026-05-09 — World retirement & quiet permanence (composed)

- New data dirs: `runtime-retirement-engine/`, `quiet-internet-permanence/`, `object-permanence-engine/`, `guidance-dissolution/`, `mail-thread-aging/`, `world-stillness-reinforcement/`, composed by `world-quiet-permanence-layer/system.ts`.
- `useWorldRuntime()` adds **`worldQuietPermanence`** only (no six additional top-level fields).
- Guidance: `GuidanceSessionClient` respects `guidanceDissolution.noticingUpperBound`, `dissolveRoutes`, `dissolveClosureCopy`.
- Mail / Home / Objects: `MailContinuityStrip`, `LongTabPresenceNote`, `ObjectPermanenceStrip` consume sub-bundles.
- Docs: `runtime-retirement-engine.md`, `quiet-internet-permanence.md`, `object-permanence.md`, `guidance-dissolution.md`, `mail-thread-aging.md`, `world-stillness-reinforcement.md`, `world-defaultness.md`, `long-lived-site-behavior.md`; README, `runtime-systems.md`, `runtime-hierarchy.md`, `architecture.md`, `next-steps.md` updated.

### 2026-05-09 — World stabilization & maturity layer (composed)

- New data dirs: `world-freeze-system/`, `real-object-presence/`, `true-mail-continuity/`, `real-internet-aging/`, `world-stillness-governor/`, `real-world-entry/`, aggregated by `world-maturity-layer/system.ts`.
- `useWorldRuntime()` adds **`worldMaturity`** only (no six extra top-level bundles).
- UI: `WorldMaturityStrip` (Home under `LivingDailyBand`), `MailContinuityStrip` (`/inquiry`), `RealObjectPresencePanel` (`/objects`).
- Docs: `world-freeze.md`, `real-object-existence.md`, `real-internet-aging.md`, `true-mail-continuity.md`, `stillness-governance.md`, `runtime-retirement-policy.md`, `foreground-policy.md`, `background-policy.md`, `permanent-absence-policy.md`; README / `runtime-systems.md` / `runtime-hierarchy.md` / `architecture.md` / `next-steps.md` updated.

### 2026-05-09 — World civilization stabilization / runtime society

- 新目录（Phase A–G，文明稳定化）：`runtime-society-engine/`, `civilization-stability-engine/`, `silence-civilization-system/`, `guidance-weather-finalization/`, `object-civilization-governance/`, `mail-background-civilization/`, `internet-environment-civilization/`；由 **`world-civilization-stabilization-layer/system.ts`** 聚合。
- **`civilizationStabilizedStructuralThinning`**：`extreme-civilization-stabilization-thinning-pass.ts` 叠在 **`ecologyCalibratedStructuralThinning`** 上，并摄入 `structuralSilence.explanationFatigue`、`worldRegulation.crossRuntimeSuppression` 等共存信号；抬高 ultra-thin / weather-only / mail process retirement 等压力（Phase H 取向，无新 UI）。
- `useWorldRuntime()` 新增 **`worldCivilizationStabilization`**；初版 UI 读 **`civilizationStabilizedStructuralThinning`**，随后由 **AI-native infrastructure** 层 supersede（见下条）。
- 文档：`runtime-society.md`, `civilization-stability.md`, `silence-civilization.md`, `guidance-weather-finalization.md`, `object-civilization-governance.md`, `mail-background-civilization.md`, `internet-environment-civilization.md`, `ambient-civilization-equilibrium.md`, `long-lived-civilization-presence.md`, `default-environment-governance.md`；更新 README、`runtime-systems.md` §25、`runtime-hierarchy.md`、`architecture.md`、`next-steps.md`。

### 2026-05-09 — AI-native civilization infrastructure / invisible infrastructure pass

- 新目录（Phase A–G）：`ai-runtime-orchestration/`, `ai-governance-infrastructure/`, `civilization-continuity-infrastructure/`, `ai-runtime-society-governance/`, `low-awareness-internet/`, `ai-native-commerce/`, `ai-civilization-stability/`；由 **`world-ai-native-infrastructure-layer/system.ts`** 聚合（纯数据文案束 + 数字 pass，无 assistant / companion / 面板 UI）。
- **`invisibleInfrastructureStructuralThinning`**：`extreme-invisible-infrastructure-thinning-pass.ts` 叠在 **`civilizationStabilizedStructuralThinning`** 上，利用 `guidanceFragmentation`（weather-only / route / single-line / minimal-ending 倾向）抬高默认安静与 ultra-thin（Phase H，无新路由与组件面）。
- `useWorldRuntime()` 新增 **`worldAiNativeInfrastructure`**；Daily / Guidance / Objects / Mail / Home maturity strip 等变薄组件改为读 **`invisibleInfrastructureStructuralThinning`**。
- 文档：见 README「AI-native civilization infrastructure」索引；`ai-runtime-orchestration.md` 等十篇；更新 `runtime-systems.md` §26、`runtime-hierarchy.md`、`architecture.md`、`next-steps.md`。

### 2026-05-09 — AI-native civilization governance consolidation

- **Terminology lock**：全局统一 **`civilizationStabilizedStructuralThinning`** 为 **intermediate civilization stabilization / transitional stabilization / non-final atmosphere layer**；**UI 唯一终端变薄**字段为 **`invisibleInfrastructureStructuralThinning`**（见 `terminology-governance.md`）。复查 **`src/components`**：无组件以文明层 pass 为终端读数。
- **Brain expansion**：新增 `runtime-civilizations/*`（七文明定义）、`browser-civilization/*`（含 **browser room theory**）、`drift-detection/*`（偏移 checklist）、`anti-companion-governance.md`、`governance-priority-system.md`。
- **Copy guardrail pass**：减少可见文案中的 **assistant / copilot** 范式用词，改用 **chat-shell / conversational shell** 等中性否定（metadata 与数据句）。
- 更新：`README.md`、`architecture.md`、`runtime-systems.md`、`runtime-hierarchy.md`。

### 2026-05-09 — Post-infrastructure stabilization（世界冻结 / 沉积 / 默认存在）

- **World freeze & sediment docs**：新增 `world-freeze/`、`civilization-sediment/`、`post-interaction-internet/`、`url-civilization/`、`anti-hyper-activity/`、`runtime-equilibrium/`、`civilization-stewardship/`、`drift-simulations/`（共 **47** 篇专题文档）。
- **Root canonicalization**：`docs/architecture.md` 重写为 **project-brain 指针**，剔除 legacy SaaS / personalization / retention / workflow agents 叙事；`docs/orchestrator-policy.md` 标记 superseded。
- **AI invisibility & visible thinning III**：下调可见「AI / companion」措辞（如 room weather、anti-companion strip、边界列表）；Home `LivingDailyBand` 标签由 product-ish 「Today's slice」改为 **Same-day residue**，fallback/sr-only 用语减弱「准备/系统感」。
- 更新：`README.md`、`project-brain/architecture.md`、`decisions-log.md`。

### 2026-05-09 — Soft humanity infrastructure（柔软人性 / 不索取温度）

- **Constitution & theory docs**：新增 `softness-without-extraction/`、`passive-humanity/`、`room-breathing/`、`anti-sterile-restraint/`、`environmental-care/`、`long-lived-humanity/`、`civilization-temperature/`；**drift-detection** 增补 sterile / cold / conceptual / vacuum / over-minimalism / humanity-loss 六篇。
- **Governance**：`governance-priority-system.md` 锁定 **Softness without extraction** 与 priority lock 同级；**工程语言净化**：`retention-engine`→`continuity-engine`、`personalization-engine`→`environmental-adaptation-engine`、`orchestrator.ts`→`atmosphere-coordinator.ts`（`coordinateGuidanceAtmosphere`）；治理文案模块 `quiet-room-boundary` / `low-demand-atmosphere`；`CompanionProfile`→`RoomAdjacentProfile`；`AttentionWithdrawal.antiRetentionLine`→`lowPressurePresenceLine`；`oldCompanionlessTab`→`oldQuietTab`。
- **Visible humanity pass**：`guidance-engine` follow-up 变软义务感；`mail-defaulting`、world regulation strip、site 注释对齐 **非索取** 语义；`ai-governance-infrastructure`：`antiCompanionEnforcementLine`→`quietRoomEnforcementLine`（`quiet-room-enforcement.ts`）。
- **Policy path**：新增 `docs/atmosphere-coordinator-policy.md`；`docs/orchestrator-policy.md` 仅为重定向桩。
- 更新：`README.md`、`taoist365/README.md`、`project-brain/architecture.md`、`long-tab-presence.md`、`modules/README.md`。

### 2026-05-09 — Lived-in world pass（被生活过的世界 / 残留与重力）

- **Brain**：新增 `lived-in-world/`、`human-residue/`、`room-gravity/`、`anti-design-showcase/`、`object-ecology/`、`browser-residue/`、`human-scale/`（共 **50** 篇）；索引更新 `README.md`、`architecture.md`。
- **Export cleanse II**：`docs/export/index.md`、`SYSTEM_MAP.md`、`FILE_STRUCTURE.md`、`PHASE_SUMMARY.md`、`MASTER_ARCHITECTURE.md`（ARCHIVE 顶栏 + 引擎/协调器现名）；canonical 指向 project-brain。
- **Engineering tokens**：`human-presence` / `human-warmth` avoid 列表更名（去 companion / personalization 字面）；首页 surface / shells **emotionalShift** 改为 **quiet environmental adaptation**；默认治理与 touch sediment 注释去除 personalization 措辞。
- **Lived-in UI**：`globals.css` 增加 `.lived-room-frame` 微不对称内边距；`/` `main` 挂载该类（房间重力，非对称展板）。
- **Softness lock**：全程不增加交互/AI；残留感仅 via 文档约束 + 既有气氛 CSS + 轻微版面不对称。

### 2026-05-09 — Low-level life signals（低层生活信号 / 房间代谢）

- **Brain**：新增 `low-level-life-signals/`、`room-metabolism/`、`non-performative-humanity/`、`anti-over-design/`、`daily-residue/`、`micro-atmosphere/`、`life-scale/`、`engineering-humility/`（共 **56** 篇）；更新 `README.md`、`architecture.md`。
- **Low-signal UI**：`(marketing)/layout.tsx` 包裹 **`lived-room-frame`**（全 marketing 路由）；首页 `main` 取消重复 padding；`LivingHumanRhythmHero`→`LivingHumanRhythmOpening`；section key `home-human-rhythm-opening`；`HomeThinning.heroStabilityLine`→`openingStabilityLine`。
- **Engineering humility（字面）**：设计密度档位 **`immersive`→`settled`**；rhythm token **`introToOpening`/`openingToGuidance`**；surface **`calm-opening`**；shell **`CalmOpeningShell`**；live-motion **`allowOpeningSurfaceAutoplay`**；去除 `src` 内 **premium/luxury/cinematic/hero/immersive** 等展览用语（含 DS avoid 键、区域 `wordingStyle` **`refined-minimal`**、边界文案键名 **`noStagedLoneliness`** / **`noFakeVintageDust`**）。
- **宪法**：仍服从 softness-without-extraction；无新交互、无新功能。

### 2026-05-09 — Real runtime integration（运行时吸收 / 反宣言）

- **Brain**：新增 `runtime-absorption/`、`runtime-room-gravity/`、`low-consciousness-ui/`、`runtime-humanity/`、`anti-manifesto/`、`engineering-silence/`（共 **42** 篇）；索引更新 `README.md`、`architecture.md`。
- **Rhythm consumption**：`surface-spacing/system.ts` 合并 **`roomRhythm: rhythmTokens`**（单一 TS 消费面）；`globals.css` 增加 **`marketing-runtime-shell`** 与 **`room-section-y-standard` / `room-section-y-airy`**（注释要求与 `rhythm.ts` 同步）；`(marketing)/layout` 挂载 **`marketing-runtime-shell`**。
- **Anti-manifesto / 密度下降**：首页 Notes 去掉 **signature atmosphere** 拼装句，改为 **低信号人性** 单行；drop `signatureAtmosphere` import。
- **Low-signal routing**：`experience-routes` **navLabel** 改为日常词（Scroll sketch / Draw / Daily note / Room notes）；**brandLayer** 统一 **brand-expression**。
- **原则**：本阶段以 **runtime absorption** 为主，**不**再扩张文明叙事篇幅。

### 2026-05-09 — Content reserve purge era（内容储备清退 / post-atmosphere）

- **Brain**：新增 **`runtime-anti-reactivation.md`**；`README.md` 索引。
- **living-content**：**`daily-slices`** 重写为 **16 条扁平切片**，移除 **`arrivalEcho` / `longTermEcho` / `humanRoomEcho` / `timeSedimentEcho`** 储备字段；**`home-linger`** 改为 **四条域名事实句**。
- **UI**：**`LivingHomeLinger`** 标题改为 **Linger**。
- **Regions**：**`wordingStyle`** 去掉 **`warm-reflective` / `wisdom-calm`**，改为 **`plain-neutral` / `plain-minimal`**。
- **Guidance**：**`guidance-rhythm`** 阶段名去 **reflection** 字面；CTA **utility 化**。
- **Data hygiene**：**`human-room` / `human-arrival` / `human-rhythm-boundaries` / `time-sediment-presence`** 去除 **melancholy / sacred / emotional weather** 等 grep 高风险字面（保留边界语义）。

### 2026-05-09 — Data silence era（数据静默 / low-expression ecology）

- **Brain**：无新目录；延续 **`runtime-humanity-maintenance.md`** 原则。
- **LivingDailyBand**：移除 **`useWorldRuntime`** 叠层（气候 / rhythm / age / inertia / echo / shareable block）；仅 **Pacific 日键 + slice 三句 + 可选 anchor 链接**。
- **Quiet human / world depth / seasonal**：数据 **扁平、物理化**；**QuietHumanPresence** 空 `shelter` 不渲染。
- **Inertia**：**`long-stillness` / `ambient-repetition` / `background-presence` / `structural-inertia.skeletonNote`** 塌缩为 **状态句**；**`LivingHumanRhythmOpening`**、**`GuidanceSessionRhythmBanner`**、**`LivingInertiaNote`** 仅保留 **layout 一行级**输出。
- **Commerce / ritual objects / micro-presence**：**`gentleCommercePresence`**、**`ritualObjectLayer`**、**`microPresenceFragments`** **utility 化**。
- **Reflection**：**`guidance-content`** 中 **`reflectionPrompt(s)`** 改为 **`—`**（空白占位）。
- **Skeleton**：**`experience-skeleton/homepage/shells.ts`** **`emotionalShiftGoal`** 去戏剧化措辞。

### 2026-05-09 — Copy collapse era（文案塌缩 / runtime-first）

- **Brain**：仅 **`runtime-humanity-maintenance.md`**（LOW-EXPANSION）；`README.md` 索引一行。
- **Objects**：页面前言与 governance 块移除；条目仅 **placement + 图 + mail 块**（塌缩说明书层）。
- **Mail**：页压缩为 **抬头 + 地址卡 + 站点脚注链接**。
- **Pause**：去掉 **`GuidanceArrivalClimate`** 挂载；**`guidanceArrival` / metadata** 缩短；**session** 描述家常化。
- **Rituals 索引 + live prototypes**：标题与阶段提示 **去戏剧化**；**`guidance-content`** 数组整体 **utility 化**；按钮文案 **Next**。
- **首页**：Living room / Things / Pause 段 **删长叙述**；移除 **`reflectionLanguageLayer`** 引用。

### 2026-05-09 — Silent naturalization era（静默自然化 / governance invisibility）

- **Brain**：**LOW-EXPANSION MODE** — 无新目录；仅维护本条。
- **Runtime**：`(marketing)` 壳 **`runtime-room-shell`**（保留 `.marketing-runtime-shell` 选择器别名）；`(experience)` **`ExperienceContinuityShell`** 内层同等壳 + **单层**背景渐变（减叠层）；**`loading.tsx`**（marketing / experience）静默占位；导航去掉 **backdrop-blur**。
- **Rhythm**：`globals.css` 扩展 **`room-section-y-compact`**、**`room-opening-y`**、**`room-pause-*`**、**`room-inner-y-tight`**、**`room-object-stack`**、**`object-resting-surface`**、**`room-mt-standard`** / **`room-mb-reflection`** / **`room-my-standard`**；首页 / Mail / Pause / Desk / Objects / rituals 索引 / live prototypes **主纵向节奏**改消费上述类；气氛 veil **更慢、更低对比**。
- **Humility**：Pause session Suspense fallback 改为极简 **`…`**（去小品式等候文案）。

### 2026-05-11 — Ritual terminal thinning pass

- **Runtime discipline**：`RitualsTemporalEcho` now reads only `worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning` for UI-terminal thinning; intermediate civilization / ecology / governance passes remain data-layer inputs only.
- **Ritual density**：ritual index echo can retire age, silence, background, and quiet-density lines on high prose-bias days while keeping the same page, same route, and same deterministic runtime structure.
- **Boundary**：no rebuild, no new surface, no new runtime layer; this is continuation of the existing Browser Civilization Runtime.

### 2026-05-11 — Homepage civilization runtime stabilization

- **Homepage shell**：`/` now renders through `HomepageBrowserRoom`, a client runtime continuation that keeps the same route, assets, and homepage structure while allowing the surface to read `worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning`.
- **Browser room thinning**：high prose-bias / ultra-thin days reduce homepage labels, entry notes, hero residue prose, Windkeep explanation, object shelf density, room photo count, and quiet hall count without deleting the runtime or adding new architecture.
- **Hero posture**：homepage opening is treated as Browser Room Opening rather than hero banner; framing is more off-center, lower-shadow, less carded, and less statement-driven.
- **Windkeep continuity**：Windkeep remains object passage / shelf residue / browser continuity, not marketplace or product campaign behavior.
- **Boundary**：no homepage rebuild, no landing page redesign, no new framework, no new runtime layer.

### 2026-05-11 — Driftbox runtime initialization

- **Runtime mapping**：initialized `driftbox-runtime.ts`, `driftbox-object-state.ts`, and `driftbox-continuity.ts` under `src/runtime/` as a Windkeep Continuity Layer mapping, not business logic.
- **Object passage**：Driftbox states describe passed objects, quiet claiming, archive residue, and next-owner continuation without bids, countdowns, resale, or marketplace rhythm.
- **Homepage presence**：Homepage receives Driftbox only as low-frequency continuity residue inside the existing Windkeep area; no new homepage module, feature block, or entry card.
- **Boundary**：Driftbox is a long-lived time-object drift mailbox layer inside Browser Civilization, not auction, ecommerce, or a trading system.

### 2026-05-11 — Windkeep sediment expansion / Driftbox deepening

- **Sediment runtime**：added `driftbox-sediment-runtime.ts` for previous keeper marks, archived object residue, passed-object echoes, and sparse homepage sediment; no database history, timeline, feed, or transaction record.
- **Object continuity runtime**：added `object-continuity-runtime.ts` to describe long-term object drift states (`stillTraveling`, `restingTemporarily`, `passedQuietly`, `waitingForNextKeeper`, `continuityPreserved`) without commerce status language.
- **Windkeep storage posture**：`windkeep-runtime.ts` now frames Windkeep as Browser Civilization Storage Layer / shelf persistence instead of a feature surface.
- **Homepage thinning**：Driftbox remains a low-frequency continuity residue inside the existing Windkeep area and is further reduced on high prose-bias / ultra-thin runtime days.
- **Boundary**：no marketplace redesign, no app surface, no homepage module, no ecommerce runtime.

### 2026-05-11 — Browser civilization persistence phase

- **Browser time presence**：added `browser-persistence-runtime.ts` for daylight drift, room temperature, late-night / morning persistence, and browser inertia; no dramatic day-night switch or scene engine.
- **Quiet halls cross-presence**：added `hall-cross-presence-runtime.ts` so halls can carry low-frequency residue from one another without recommendations, feeds, or related-product behavior.
- **Windkeep object aging**：added `object-aging-runtime.ts` and composed it into `windkeep-runtime.ts`; object aging is material calm / softened edges / sediment, not fake retro or antique styling.
- **Driftbox quiet waiting**：added `quiet-waiting-runtime.ts` and composed it into Driftbox; waiting is unresolved continuity and next-keeper absence, not countdown, auction tension, or claim pressure.
- **Homepage persistence**：Homepage absorbs these runtimes as sparse text residues only: top-right time presence, Windkeep aging note, Driftbox waiting fragment, hall cross-presence, and browser inertia. All remain subject to `invisibleInfrastructureStructuralThinning`.
- **Boundary**：no appification, no homepage module stack, no marketplace runtime, no landing page redesign.

### 2026-05-11 — Browser civilization stabilization mega phase

- **Civilization fading**：added `civilization-fading-runtime.ts` so residue can soften, silence can recover, and old traces can become almost forgotten without clear/reset/archive-mechanics language.
- **Long-open inertia expansion**：expanded `browser-persistence-runtime.ts` with browser still-open durations, room-air shift, and passive browser continuity; this remains faint page existence, not screensaver or weather UI.
- **Windkeep deep time**：added `windkeep-deep-time-runtime.ts` and composed it into Windkeep; objects gain settled calm, repeated handling softness, room-adapted material presence, and seasonal sediment without lore or collectible metadata.
- **Driftbox sparse civilization**：added `driftbox-sparse-runtime.ts` and composed it into Driftbox; empty-room intervals and rare appearances now suppress claim surface and protect Driftbox from becoming busy.
- **Pocket browser**：added `pocket-browser-runtime.ts` to bias mobile toward one-hand calm, pocket silence, bed-edge presence, and lower density without app shell or sticky action behavior.
- **Human absence**：added `human-absence-runtime.ts` for recently-left warmth, chair silence, still-air continuity, and after-presence without centering the human as a companion target.
- **Civilization boundary**：added `civilization-boundary-runtime.ts` to suppress growth pressure, commerce gravity, engagement gravity, optimization obsession, and feature creep.
- **Invisible thinning expansion**：extended `StructuralThinningPass` with optional runtime overgrowth / residue accumulation / atmospheric heaviness / feature temptation governance fields, and populated them in `invisibleInfrastructureStructuralThinning`.
- **Homepage absorption**：Homepage consumes all new layers only as sparse fading/absence/bleed traces, with `invisibleInfrastructureStructuralThinning` and civilization fading allowed to remove most traces on dense days.
- **Boundary**：no rebuild, no framework, no appification, no marketplace, no onboarding, no feed, no notification, no recommendation engine, no memory product, no AI companion.

### 2026-05-11 — Atmospheric infrastructure civilization phase

- **Atmospheric circulation**：added `atmospheric-circulation-runtime.ts` so room-to-room air migration, carryover, unresolved silence, and browser air redistribution can exist as low-pressure infrastructure, not animation or feature logic.
- **Silence density**：added `silence-density-runtime.ts`; silence now has light / warm / distant / unresolved / inhabited / near-empty / late-night / pre-dawn density states and can thin homepage surface when the room needs near-emptiness.
- **Room presence without memory**：added `room-presence-runtime.ts`; the room remembers air, desk continuity, previous atmospheric traces, and long-open presence without user profiles, personalized history, tracking, or memory feed behavior.
- **Windkeep settlement**：added `object-settlement-runtime.ts` and composed it into Windkeep; objects become room-adjusted, materially settled, familiar, still, and quietly belonging rather than displayed as products.
- **Driftbox low-event layer**：added `driftbox-low-event-runtime.ts` and composed it into Driftbox; drift remains sparse, unresolved, silent, and non-celebratory with no auction, claim pressure, or event-platform rhythm.
- **Season / duration / recovery**：added `browser-season-runtime.ts`, `long-duration-presence-runtime.ts`, and `civilization-recovery-runtime.ts` so the browser room can carry faint seasonal air, ultra-long-open calmness, visual recovery, residue thinning, and self-lightening.
- **Invisible commerce / gravity resistance / soft humanity**：added `invisible-commerce-runtime.ts`, `civilization-gravity-runtime.ts`, and `soft-humanity-runtime.ts` to keep stewardship behind the surface, suppress startup / optimization / monetization gravity, and keep Master Sandong as residue presence rather than a centered figure.
- **Homepage absorption**：Homepage only receives sparse atmospheric lines inside existing areas; no new homepage module, no page architecture change, no app shell, no dashboard, no marketplace surface.
- **Boundary**：Atmospheric Infrastructure Civilization is climate mapping, not functionality; Taoist365 remains a long-lived browser atmospheric civilization.

### 2026-05-11 — Self-regulating browser civilization phase

- **Civilization metabolism**：added `civilization-metabolism-runtime.ts` so atmosphere, residue, continuity, silence, and climate can digest themselves before runtime weight accumulates.
- **Temporal breathing**：added `temporal-breathing-runtime.ts`; time now carries slow expansion, quiet contraction, late-night slowing, pre-dawn emptiness, and seasonal breathing without visual animation.
- **Atmospheric fatigue prevention**：added `atmospheric-fatigue-runtime.ts` to reopen air, restore low density, prevent poetic overload, and recover browser freshness through thinning rather than new treatment.
- **Civilization sleep**：added `civilization-sleep-runtime.ts` so late night / after-midnight surfaces can enter low-frequency sleeping climate without dark mode, cinematic lighting, or theme switching.
- **Room ecology**：added `browser-room-ecology-runtime.ts` so Quiet Halls behave as a room ecology with coexistence, atmosphere carrying, climate migration, silence compatibility, and spatial equilibrium; no recommendation logic.
- **Anti-acceleration and maturity**：added `civilization-anti-acceleration-runtime.ts` and `civilization-maturity-runtime.ts` to suppress feature rush, content velocity, optimization momentum, and proof-seeking as the civilization grows.
- **Long stay**：added `long-stay-runtime.ts`; long-open browser presence becomes passive comfort, quiet returnability, low-interaction persistence, and companionship without companion behavior.
- **Extended boundary layers**：`invisible-commerce-runtime.ts` now supports non-event commerce / quiet object transfer; `soft-humanity-runtime.ts` supports warmth without presence; `civilization-boundary-runtime.ts` now suppresses UX over-optimization, over-explanation, emotional manipulation, retention engineering, addictive loops, and hyper-personalization; `driftbox-low-event-runtime.ts` now supports oceanic silence and sparse object tides.
- **Homepage absorption**：Homepage uses these self-regulating signals only to reduce density, lower event language, and emit rare bottom-of-room traces; no new module, no new route, no dashboard, no marketplace, no engagement engineering.
- **Boundary**：Self-regulating civilization means ecological autonomy and self-lightening, not alive-product behavior or active-user optimization.

### 2026-05-11 — Gentle humanity civilization phase

- **Gentle smile**：added `gentle-smile-runtime.ts` and `smile-without-performance-runtime.ts`; smile is a tiny human lightness, room trace, or non-performative delight, never a joke system, entertainment feed, cute industry, or emotional optimization loop.
- **Human imperfection**：added `human-imperfection-runtime.ts` so tiny asymmetry, delayed settling, unfinishedness, and room irregularity can soften AI-perfect surfaces without creating fake chaos.
- **Warm silence**：added `warm-silence-runtime.ts`; silence can be inhabited, familiar, late-night warm, and comfortable so Taoist365 does not become cold as it becomes quieter.
- **Tiny discovery**：added `tiny-discovery-runtime.ts`; discovery is slow noticing of subtle room change, small object movement, soft atmosphere shift, or hidden warmth fragment, not a reward mechanic.
- **Non-lonely without companion**：added `non-lonely-runtime.ts`; the browser room can feel like other humans quietly exist somewhere without becoming AI companionship, dependency, or social simulation.
- **Room tenderness**：added `room-tenderness-runtime.ts`; Quiet Halls can carry chair-side tenderness, folded-fabric warmth, steam-softened air, rain-after quietness, and object-rest softness without sentimentality.
- **Civilization softening and gentle return**：added `civilization-softening-runtime.ts` and `gentle-return-runtime.ts` to reduce conceptual heaviness, keep depth approachable, and let return visits feel like “it is still here” without onboarding or welcome-back performance.
- **Atmospheric humanity maturity**：added `atmospheric-humanity-runtime.ts`; mature warmth, non-needy humanity, restrained softness, and quiet emotional stability protect the site from seeking emotional feedback.
- **Gentle passage commerce**：extended `invisible-commerce-runtime.ts` with warm object transfer, appreciation exchange, human-scale value flow, and gentle passage language; commerce remains infrastructure, not transaction excitement.
- **Homepage absorption**：Homepage receives these signals only as sparse warmth, tiny room trace, gentle return, and soft hall tenderness inside existing sections; no new feature block, no entertainment layer, no therapy copy, no companion persona.
- **Boundary**：Gentle Humanity means simple + slight smile; it is not comedy, meme, social platform, emotional manipulation, healing content industry, or AI companionship.

### 2026-05-11 — Quiet meaning civilization phase

- **Quiet meaning**：added `quiet-meaning-runtime.ts`; meaning can appear as unresolved traces, almost-symbolic moments, quiet resonance, existence warmth, and soft continuity without being explained or claimed.
- **Meaning without explanation**：added `non-explanatory-meaning-runtime.ts`; atmosphere, wind, time, residue, object settlement, and drift can be felt before language, with explicit suppression of meaning explanation.
- **Existential warmth**：added `existential-warmth-runtime.ts`; ordinary life can feel slightly lighter without therapy tone, advice, reassurance scripts, or life-answer behavior.
- **Graceful time**：added `graceful-time-runtime.ts`; time passing can become soft, fading, calm, non-urgent, and peacefully incomplete instead of anxious.
- **Unfinished humanity**：added `unfinished-humanity-runtime.ts`; Taoist365 accepts unresolved continuity, unfinished traces, incomplete room stories, imperfection persistence, and gentle incompletion without offering completion.
- **Meaningful silence**：added `meaningful-silence-runtime.ts`; silence can be inhabited, emotionally held, quietly resonant, and low-pressure without becoming empty coldness or instruction.
- **Small human ritual**：added `gentle-ritual-runtime.ts`; repeated browser gestures can feel lightly ritual without religion, spiritual authority, doctrine, or sacred framing above ordinary life.
- **Emotional balance**：added `emotional-balance-runtime.ts`; lightness recovery, emotional thinning, calm redistribution, warmth-air balance, and anti-melancholy stabilization prevent meaning from becoming heavy, literary, or therapeutic.
- **Meaning discovery**：added `meaning-discovery-runtime.ts`; meaning can emerge through accidental resonance, symbolic continuity, personal interpretation, and low-pressure recognition, while the user forms the relationship freely.
- **Ordinary sacredness and non-possession**：added `ordinary-sacredness-runtime.ts` and `non-possessive-meaning-runtime.ts`; ordinary things can become quietly precious without spiritual inflation, and users can leave without guilt or emotional ownership.
- **Homepage absorption**：Homepage receives quiet meaning only as sparse unresolved traces, meaningful silence, graceful time, gentle ritual, and non-possessive return; no spiritual authority, no life advice, no answer product, no pseudo-spirituality.
- **Boundary**：Quiet Meaning is climate, not output. Taoist365 never tells the user what life means.

### 2026-05-11 — Civilization room expansion phase

- **Room governance**：added `civilization-room-governance-runtime.ts` to keep future Quiet Rooms spatial, low-pressure, sparse, and protected from feature-room / productivity-room behavior.
- **Room seeds**：added `quiet-room-seeds.ts` with the first ten civilization room seeds: The Empty Chair, Rain Holding Room, Lantern Weather, Tea Steam Room, Half-Remembered Hall, Wind Passage, Quiet Correspondence, Dust & Light, The Slow Drawer, and Returning Air.
- **Room identity**：added `room-identity-runtime.ts`; rooms carry atmospheric personality, silence temperament, warmth variation, temporal identity, emotional climate, and spatial mood continuity.
- **Low-frequency exploration**：added `low-frequency-exploration-runtime.ts`; rooms are found by accidental discovery, quiet wandering, sparse navigation, and non-optimized discovery rather than recommendation logic.
- **Hidden continuity**：added `hidden-continuity-runtime.ts`; rooms can share subtle echoes, hidden residue, distant traces, low-visibility memory, and cross-room climate without explaining their relation.
- **Civilization wandering**：added `civilization-wandering-runtime.ts`; purposeless navigation, browser drifting, lingering, and non-goal exploration are legitimate room behaviors.
- **Long-stay rooms**：added `room-long-stay-runtime.ts`; some rooms can support passive room companionship, long-open calmness, non-fatiguing stillness, browser-side air, and quiet visual breathing without companion mechanics.
- **Room rituals**：added `room-ritual-runtime.ts`; room gestures are repeated soft actions and ordinary continuity habits, not gameplay loops.
- **Room decay**：added `room-decay-runtime.ts`; rooms can fade, soften, reopen silence, calm visually, thin temporally, and age gently instead of staying at full presence.
- **Civilization map**：added `civilization-map-runtime.ts`; room topology is a constellation / small quiet city, not a menu, funnel, or feature grid.
- **Room climate and familiarity**：added `room-emotional-climate-runtime.ts` and `civilization-familiarity-runtime.ts`; room emotion is air, while long-term familiarity stays non-addictive and low-pressure.
- **Homepage absorption**：the existing Quiet Halls area now reads as sparse Quiet Civilization Rooms / room constellation residue; no new homepage section, no room dashboard, no matrix, no feed.
- **Boundary**：Room expansion means civilization ecology. Rooms are spaces for wandering and staying, not tools, modules, productivity surfaces, or engagement loops.

### 2026-05-11 — Living presence core pass

- **Lived-in continuity**：added `lived-in-continuity-runtime.ts`; homepage can now carry long-stayed room air, quiet return, objects left in place, browser-left-open feeling, and settled human traces without fake cozy staging.
- **Daily sediment**：added `daily-sediment-runtime.ts`; ordinary desk-side traces, folded paper calm, window stillness, repeated small gestures, and browser-lived air can gently reduce styled-atmosphere pressure.
- **Ordinary humanity**：added `ordinary-human-runtime.ts`; human-scale placement, non-performative traces, slight irregularity, ordinary existence, and lived unevenness protect Taoist365 from showroom / lifestyle / overly perfect design signals.
- **Homepage calibration**：homepage copy and existing room entrances now lean toward desk, window, object-resting, and long-open room continuity; no new module, no homepage architecture change, no function expansion.
- **Boundary**：Living presence means people seem to have quietly lived here. It is not luxury lifestyle, fake vintage, Pinterest room styling, or a higher-end atmosphere prototype.

### 2026-05-11 — Quiet continuity civilization phase

- **Quiet continuity**：added `quiet-continuity-runtime.ts`; Taoist365 can carry calm long-term continuity, non-demanding persistence, familiar browser existence, soft temporal relationship, and low-pressure return without stickiness language.
- **Return without obligation**：added `obligation-free-return-runtime.ts` and `long-time-no-see-runtime.ts`; absence is accepted, re-entry stays quiet, and long-time-no-see warmth becomes “the wind is still here” rather than welcome-back performance.
- **Slow spatial relationship**：added `slow-relationship-runtime.ts`, `browser-coexistence-runtime.ts`, and `life-beside-runtime.ts`; continuity is with the space beside ordinary life, not with an AI persona or companion product.
- **Ordinary return gestures**：added `ordinary-return-runtime.ts` and `room-return-runtime.ts`; returning can be a small browser gesture or remembered room air without daily-active mechanics, personalized memory, route ownership, or habit pressure.
- **Anti-addictive safeguards**：added `anti-addictive-continuity-runtime.ts` and `quiet-staying-runtime.ts`; continuity is protected from loops, compulsive checking, urgency reinforcement, streak logic, and performance-driven longevity.
- **Object continuity through time**：extended `object-continuity-runtime.ts`, `windkeep-runtime.ts`, and `driftbox-runtime.ts` with long-term object familiarity, temporal stewardship traces, and quiet recognition through keepers.
- **Homepage calibration**：existing homepage surfaces now say “come back quietly,” “the wind is still here,” and “you can be gone a long while”; no new homepage module, no retention mechanic, no companion layer.
- **Boundary**：Quiet Continuity is long-term relation without possession. It is not loyalty, engagement, emotional dependency, streaks, reminders, or push-based return design.

### 2026-05-11 — Open-air browser civilization phase

- **Open air**：added `open-air-runtime.ts`; atmosphere now carries moving air, unfinished openness, breathable continuity, non-enclosed feeling, and gentle external connection so the civilization cannot wrap around the visitor.
- **Outside world continuity**：added `outside-world-runtime.ts` and `outside-life-runtime.ts`; daylight, weather, external time, ordinary life, and real-world priority stay connected to the browser room.
- **Wind passage and partial absence**：added `wind-passage-runtime.ts` and `partial-absence-runtime.ts`; the room can feel ventilated, non-sealed, partly absent, autonomous, and not always waiting for the user.
- **Non-enclosing warmth**：added `open-warmth-runtime.ts`, `passing-presence-runtime.ts`, and `open-room-runtime.ts`; warmth, presence, and Quiet Rooms remain passable, temporary, and open rather than cocoon-like.
- **Dependency boundary**：added `non-dependent-civilization-runtime.ts`; continuity supports free movement and rejects emotional locking, digital dependency, and capturing atmosphere.
- **Airflow silence and lightness**：added `airflow-silence-runtime.ts` and `lightness-protection-runtime.ts`; silence stays breathable, and long-term civilization maturity is protected from density, conceptual weight, over-poetry, and atmospheric thickening.
- **Homepage calibration**：homepage language now points outward: “Let the air through,” “Go back to life,” outside daylight, open room transitions, and distance-with-warmth; no new module, no sanctuary framing, no companion atmosphere.
- **Boundary**：Open-Air Civilization means the room is good to stay in but easy to leave. Taoist365 remains connected to ordinary life and never becomes an emotional enclosure or digital refuge dependency.

### 2026-05-11 — Real-life adjacent civilization phase

- **Real-life adjacency**：added `real-life-runtime.ts`; Taoist365 now treats itself as a browser-side layer beside ordinary days, real-world continuity, and daily-world coexistence rather than another world.
- **Weather and time**：added `weather-passage-runtime.ts` and `ordinary-time-runtime.ts`; daylight, cloudy afternoons, rain passing, evening dimness, weekday calm, slow mornings, and late browser glow enter as ordinary rhythm, not cinematic weather or eternal art space.
- **Beside-life placement**：added `beside-life-runtime.ts` and `background-civilization-runtime.ts`; the civilization stays peripheral, ambient, background-capable, and non-central so real life remains in front.
- **Natural leave / return**：added `natural-return-runtime.ts`; leaving, forgetting, and returning stay ordinary non-events without ceremony, guilt, or emotional framing.
- **Low-drama humanity**：added `low-drama-humanity-runtime.ts`; humanity is practical, ordinary, non-poetic, and non-cinematic so the site does not drift into filmic spirituality.
- **Digital lightness and reality silence**：added `digital-lightness-runtime.ts` and `reality-silence-runtime.ts`; browser simplicity, anti-overdesign, practical calm, ordinary silence, and non-sacred stillness protect the room from spiritualized quiet.
- **Objects in life**：extended `object-continuity-runtime.ts`, `windkeep-runtime.ts`, and `driftbox-runtime.ts`; object continuity now emphasizes real-life traces, practical humanity, ordinary material continuity, daily use, and non-collector atmosphere.
- **Homepage calibration**：homepage now says “Keep it beside the day” and “Continue the day,” with weather passing, normal-day rhythm, practical warmth, and background persistence; no new section, no escapist world, no spiritual destination.
- **Boundary**：Real-Life Adjacent Civilization means Taoist365 is a small browser window beside life. It does not replace reality, become a browser utopia, or turn silence into spiritual refuge.

### 2026-05-11 — Practical humanity civilization phase

- **Practical calm**：added `practical-calm-runtime.ts`; the room can make an ordinary day a little lighter through non-intrusive usefulness and quiet practical comfort without claiming to solve problems.
- **Gentle orientation and light guidance**：added `gentle-orientation-runtime.ts` and `light-guidance-runtime.ts`; guidance now points toward small situational clarity, low-pressure perspective, and ordinary-life reflection without answers, destiny tone, or authority.
- **Small help and relief**：added `small-help-runtime.ts` and `relief-runtime.ts`; the site can offer tiny useful gestures, low-friction support, pressure thinning, and emotional decompression without becoming a tool product or therapy surface.
- **Practical silence and useful humanity**：added `practical-silence-runtime.ts` and `useful-humanity-runtime.ts`; silence becomes lived and useful enough to return to life, while humanity prioritizes human-scale usefulness over atmosphere.
- **Practical ritual and ordinary wisdom**：added `practical-ritual-runtime.ts` and `ordinary-wisdom-runtime.ts`; repeated gestures stay non-spiritual, and wisdom becomes ordinary lived perspective rather than grand insight.
- **Everyday object passage**：extended `object-continuity-runtime.ts`, `windkeep-runtime.ts`, and `driftbox-runtime.ts`; Windkeep and Driftbox now emphasize useful material humanity, everyday passage, practical value, and objects that keep helping across ordinary days.
- **Homepage calibration**：homepage now says “Make the day lighter” and “Get a little direction,” with visible copy oriented toward small help, relief, ordinary usefulness, and low-pressure guidance; no productivity layer, no AI assistant layer, no self-improvement framing.
- **Boundary**：Practical Humanity means Taoist365 offers a small human relief beside real life. It does not optimize life, manage tasks, promise transformation, or become a wisdom temple.

### 2026-05-11 — Invisible browser civilization phase

- **Invisible presence**：added `invisible-presence-runtime.ts`; presence becomes soft, unnoticed, low-visibility, background, and non-performative rather than attention-seeking.
- **Unclaimed meaning**：added `unclaimed-meaning-runtime.ts`; meaning stays free-floating, unsystemized, user-owned, non-authoritative, and open instead of being defined by the site.
- **Invisible humanity and warmth**：added `invisible-humanity-runtime.ts` and `background-warmth-runtime.ts`; warmth, care, and tenderness now retreat to margins and background comfort rather than being displayed.
- **Ambient guidance and silence**：added `ambient-guidance-runtime.ts` and `invisible-silence-runtime.ts`; guidance becomes room-air orientation, while silence remains ordinary, natural, and non-designed.
- **Non-announced civilization**：added `non-announced-civilization-runtime.ts`; Taoist365 now actively suppresses conceptual display, civilization performance, and atmosphere showcase behavior.
- **Everyday presence and dissolved atmosphere**：added `everyday-presence-runtime.ts` and `dissolved-atmosphere-runtime.ts`; the site blends into ordinary life as low-attention browser-side presence rather than a special destination.
- **Quiet material culture**：extended `object-continuity-runtime.ts`, `windkeep-runtime.ts`, and `driftbox-runtime.ts`; Windkeep and Driftbox now emphasize unnoticed continuity, ordinary material passage, and things people keep using.
- **Homepage calibration**：homepage now says “Stay quietly” and “Continue quietly”; warmth, guidance, silence, objects, and meaning all move into background lines; no atmosphere showcase, no conceptual performance, no “look how calm this is.”
- **Boundary**：Invisible Civilization means Taoist365 does not prove its own existence. It remains present, useful only lightly, and increasingly air-like.

### 2026-05-12 — Long-term quiet existence pass

- **Homepage low-consciousness**：primary actions, room entries, and Windkeep links were thinned toward plain browser links; no new homepage section, no new runtime, no organism expansion.
- **Long-open softness**：the hero shell now carries a faint CSS-only browser softness layer, reducing fresh showroom polish without retro styling or nostalgia.
- **Driftbox / Windkeep usability**：Driftbox copy moved from named-system explanation toward a quiet shelf note; Windkeep remains object passage, not marketplace, feed, or collector surface.
- **Site copy cleanup**：`siteConfig` user-facing lines were converted to stable ASCII punctuation and plainer sentences so long-open pages do not surface encoding noise or overdesigned phrasing.
- **Boundary**：This pass is stabilization only. Reverent Inquiry should keep feeling like an ordinary browser place beside life, not a new civilization layer or branded atmosphere showcase.

### 2026-05-12 — Quiet browser persistence final pass

- **Persistence cleanup**：remaining visible mojibake in route and ritual entry copy was removed so old tabs do not surface broken text.
- **Low-expectation entry**：homepage and ritual entry actions were softened from opening / experience language toward plain passing-through links.
- **Driftbox thinning**：homepage Driftbox presentation now reads as a shelf continuation rather than a named-system headline.
- **Brand persistence check**：front-end brand calls remain on `/brand/production/*`; old Yewen-era marks stay out of production UI.
- **Boundary**：Final pre-thread pass only. No runtime, organism, section, or atmosphere vocabulary was added.

### Permanent boundaries

- No chatbot-first UI or SaaS dashboard framing.
- No fake archive / date / history theater.
- No social or community simulation.
- No cinematic loneliness or mysticism framing.
- No per-user memory or adaptive profiling runtime.

## MAINTENANCE NOTES

- Ship a phase → append a dated section; adjust **Permanent boundaries** only when the rule truly changes.
- Point readers to `runtime-systems.md` or `architecture.md` for field- or route-level detail.

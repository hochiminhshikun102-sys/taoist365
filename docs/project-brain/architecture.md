# Architecture

## QUICK CONTEXT BOOTSTRAP

- Maps the **Taoist-inspired lifestyle guidance system** in code: routes, zones, and where `useWorldRuntime()` holds **emotional continuity** and a **quiet ritual atmosphere**.
- One aggregator hook, ~60s tick, day-deterministic bundles; static export; no chat-shell or funnel routing.
- Structural silence: pages may be intentionally incomplete; absence is world-state, not error or loading.
- Keep this file aligned when folders or integration components move.

## THIS DOCUMENT DEFINES

Next.js layout, routing, and runtime composition so **breathable interfaces** stay coherent across surfaces.

## CORE PRINCIPLES

- **Breathable interfaces**: calm pages that feel like slow rooms, not software demanding attention.
- Reject app-shell SaaS, chat-app patterns, and continuous product funnels.
- “Liveness” is client-side, deterministic, and shared across pages for the same Pacific day—supporting **ritual calm** and **low-signal humanity**.

## SYSTEM DETAILS

### Project shape

Taoist365 is a static Next.js app with long-lived surfaces and deterministic browser-side runtime overlays.

High-level zones:

- `src/app/(marketing)` — Home, Objects, Guidance, Desk, Mail
- `src/app/(experience)` — Ritual pages
- `src/components` — composable page layers
- `src/data` — deterministic runtime and content systems
- `src/lib` — `useWorldRuntime` and day-key helpers

### Routing model

Primary routes:

- `/` (Home)
- `/guidance`, `/guidance/session`
- `/objects`
- `/rituals`, `/rituals/draw-a-lot`, `/rituals/daily-guidance`, `/rituals/home-harmony`
- `/inquiry` (Mail)
- `/desk`

### Runtime composition

`src/lib/use-world-runtime.ts` aggregates bundles: deterministic resolution, ~1 minute refresh where clock-sensitive, one object for all client components—avoiding per-page timer drift. Order tail: … → **`worldDefaultExistence`** → **`worldAmbientInternet`** → **`worldGovernance`** → **`worldEcologyCalibration`** → **`worldCivilizationStabilization`** → **`worldAiNativeInfrastructure`** (see `runtime-hierarchy.md`).

### Deterministic time foundation

- Pacific day key (`getLivingDayKey()`)
- World climate (`worldStateIdForDayKey()`)
- World age (`worldAgeStateId()`)

Higher runtimes derive from these keys plus local hour only where specified.

### Key integration components

- **Home:** `LivingDailyBand`（`permanencePass` + **`worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning`** 叠化 Daily），`WorldMaturityStrip`（基础模数 + `maturityStripModulusBonus` from **`invisibleInfrastructureStructuralThinning`**），`LivingHumanRhythmOpening`, `LowSignalHumanityStrip`, `LivingHomeTemporalAtmosphere`, `RoomAirPresence`, `MaterialSurfaceResidue`, `LightFalloffNote`, `PhysicalSilenceLayer`, `MaterialWeatheringBlock` (`src/components/material/*`), `WorldRegulationPresenceStrip`, `LongTabPresenceNote` (browser reality lines)
- **Guidance:** `GuidanceSessionClient`（`guidanceDissolution` + `guidanceQuiet` + **`worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning`** 天气-only / 硬关 routes-closure）, `GuidanceArrivalClimate`, `GuidanceSessionRhythmBanner`
- **Objects:** `ObjectRuntimeGate`, `ObjectTemporalAgingLine`, `ObjectSurvivedRhythmLine`, `RealObjectPresencePanel`（`objectRoomDissolution` + **`worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning`**）, `ObjectPermanenceStrip`, `WorldRegulationPresenceStrip`, `BrowserHostnameFoot`
- **Desk:** `BrowserDeskRealityStrip`
- **Ritual / Mail:** `RitualShelf`, `RitualsTemporalEcho`, `MailTemporalPresence`（`mailRetireDenseProcessBlock`）, `MailContinuityStrip`（`combinedProseBias`）—二者均叠 **`worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning`**

### Structural silence (summary)

Some blocks, routes, or foreground objects may be absent on a given day—by design, not failure. See `world-aging-inertia.md` and `runtime-systems.md` for mechanics.

### AI-native civilization organization（AI 原生文明组织）

- **Positioning**: Taoist365 is **AI-native civilization infrastructure**—a long-lived, deterministic, low-awareness URL environment—not a traditional startup SaaS narrative, not a chat-shell company, not a social platform (see `governance-priority-system.md`).
- **Thinning terminal discipline**: UI **only** reads **`worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning`** as the **final atmosphere thinning** field. **`civilizationStabilizedStructuralThinning`** is an **intermediate / transitional / non-final** pass—must never be documented as UI-terminal (`terminology-governance.md`).
- **Brain maps**: runtime civilizations → `runtime-civilizations/`；browser room theory → `browser-civilization/`；drift monitoring vocabulary → `drift-detection/`；anti-companion rules → `anti-companion-governance.md`。

### Post-infrastructure stabilization（后基础设施稳定化）

- **World freeze protocol**: `world-freeze/world-freeze-protocol.md` — 不追求无限进化；**世界老化 ≠ 产品迭代**。
- **Civilization sediment**: `civilization-sediment/` — 沉积感，非 timeline / 非用户记忆系统。
- **Post-interaction internet**: `post-interaction-internet/` — coexistence internet，低互动文明。
- **Long-lived URL theory**: `url-civilization/` — **url-as-place**，禁止 companion 式「在等你」。
- **Anti-hyper-activity**: `anti-hyper-activity/` — 低索取互联网。
- **Runtime equilibrium**: `runtime-equilibrium/` — equilibrium-first，禁止 maximize everything。
- **Civilization stewardship**: `civilization-stewardship/` — **Civilization Steward**，守世界而非做增长。
- **Collapse simulations**: `drift-simulations/` — 崩塌路径识别。

### Soft humanity infrastructure（柔软人性基础设施）

- **Constitution**: `softness-without-extraction/softness-without-extraction.md` — **不索取的柔软**，与 `governance-priority-system.md` 同级。
- **Passive traces**: `passive-humanity/`、`long-lived-humanity/` — 人味在环境余温，不在人格表演。
- **Room breathing**: `room-breathing/` — 极低频气氛漂移，非动效炫技。
- **Anti-sterile**: `anti-sterile-restraint/` — 防止冷神殿 / 无菌极简 / 情绪真空（极端克制也是一种 drift）。
- **Environmental care**: `environmental-care/` — 关照在房间层，禁止绑定式关怀话术。
- **Temperature governance**: `civilization-temperature/` — **CTI（Civilization Temperature Index）** 锚文档见 `restrained-warmth-index.md`。
- **Cold / humanity drift checks**: `drift-detection/sterile-restraint-drift.md` 等六篇增补。

### Lived-in world（被生活过的世界）

- **Theory**: `lived-in-world/lived-in-world-principles.md` — 安静生活过 ≠ 做旧炫技；允许微不完美与残留感。
- **Human residue**: `human-residue/` — 人存在 **留下来**，不 **表演出来**。
- **Room gravity**: `room-gravity/` — 布局像家具聚散，非展板对齐。
- **Anti-showcase**: `anti-design-showcase/` — 反 Dribbble / 美术馆 / status-minimal 霸权。
- **Object ecology**: `object-ecology/` — 物件 resting，非 spotlight SKU。
- **Browser residue**: `browser-residue/` — 旧标签、网址即房间的语感。
- **Human scale**: `human-scale/` — 反纪念碑尺度；宜人长期待着。

### Low-level life signals（低层生活信号）

- **Theory**: `low-level-life-signals/low-level-life-signals.md` — 生命感 **泄露** 非 **展示**；禁 cozy manipulation / IG 美学。
- **Room metabolism**: `room-metabolism/` — 房间 **缓慢代谢**，非「系统在跑」的表演。
- **Non-performative humanity（顶层目录）**: `non-performative-humanity/` — 与人味文件夹 `passive-humanity/` 互补；策展式柔软红线。
- **Anti-over-design**: `anti-over-design/` — 反像素级自觉与气氛演出。
- **Quiet daily residue**: `daily-residue/` — 非事件性日常；反神秘宏大。
- **Micro-atmosphere**: `micro-atmosphere/` — 微气候迁移；禁可察觉动效与 spectacle。
- **Life scale**: `life-scale/` — 反电影化 / 神话界面；普通安静尺度。
- **Engineering humility**: `engineering-humility/` — 反 runtime / 架构 / AI 自觉炫耀。

### Real runtime integration（真实运行时整合）

- **Absorption**: `runtime-absorption/` — 文明规则 **消化进** bundle/token/CSS，不前台「执行哲学」。
- **Runtime room gravity**: `runtime-room-gravity/` — 重力绑 **layout 行为**（间距变量、密度），非纯理论。
- **Low-consciousness UI**: `low-consciousness-ui/` — UI **不自恋**；像天然浏览器表面。
- **Runtime humanity**: `runtime-humanity/` — 人味优先 **非语言通道**（密度/气候/留白）。
- **Anti-manifesto**: `anti-manifesto/` — 反世界观展演与知性虚荣。
- **Engineering silence**: `engineering-silence/` — 运行时可感知噪声清零取向。
- **Shipped hooks**: `surfaceSpacing.roomRhythm` ← `rhythmTokens`；**`runtime-room-shell`**（兼 `.marketing-runtime-shell` 别名）+ **`room-section-y-*`** / **`room-opening-y`** / **`room-pause-*`** / **`room-object-stack`** 等（`globals.css`，与 `rhythm.ts` 数值锁定同步）；`(experience)` 内容区经 **`ExperienceContinuityShell`** 内层挂载同一壳。

## MAINTENANCE NOTES

- Do not add server memory, auth, or profiling backends.
- Do not imitate feeds or “live” social surfaces.
- Keep runtime modules small and composable; new systems belong in `runtime-systems.md` before wide use.

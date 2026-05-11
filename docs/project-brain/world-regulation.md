# World Regulation Engine

## Purpose

`src/data/world-regulation-engine/` is the **cross-runtime governor**: it does not add marketing prose; it **composes** outputs from presence, rhythm, aging, inertia, low-signal humanity, structural silence, materialization, and world density into a single **`WorldRegulationBundle`** resolved by `resolveWorldRegulationBundle()`.

Same calendar inputs → same bundle. No randomness, no user memory.

## Entry point

- **`resolveWorldRegulationBundle(...)`** in `system.ts` — the only composition root for this layer.
- Consumed as **`worldRegulation`** on `useWorldRuntime()` after `worldDensity`.
- **`worldStability`**, **`worldStabilityEngine`**, **`browserReality`**, **`runtimeRetirement`** resolve **after** this bundle; object foreground visible in UI is **`regulatedForegroundIds` ∩ `sedimentForegroundIds` ∩ `rareForegroundObjects`** (see `object-retirement.md`, `internet-sediment.md`, `object-backgrounding.md`).

## Submodules (responsibilities)

| Module | Role |
|--------|------|
| `runtime-priority-matrix.ts` | Which runtime families take precedence on a given age + day key. |
| `runtime-fatigue-balancer.ts` | Loads (materialization, age, inertia, low-signal, …) used by suppression and caps. |
| `cross-runtime-suppression.ts` | Boolean switches: fewer human traces, tighter guidance, smaller object foreground cap, thinner daily prose, sparser ritual traces. |
| `world-breathing-runtime.ts` | `breathingMode`, openness / pressure / quietness — “thin day” posture, not animation. |
| `ambient-rest-windows.ts` | Long hold windows (14–90d) for copy and foreground cadence semantics. |
| `soft-collapse-runtime.ts` | Soft collapse hints aligned with structural silence. |
| `page-understatement-runtime.ts` | Per-route understatement flags (home, guidance, mail, objects, ritual, daily). |
| `foreground-pressure-runtime.ts` | Scalar pressure feeding object permanence cap. |
| `narrative-overflow-runtime.ts` | Overflow metrics + `overflowAuditLine` when prose stacks too hot. |
| `residual-balance-runtime.ts` | Which residual **channels** may speak loudly today (max 1–2 foreground slots). |
| `attention-withdrawal-runtime.ts` | Non-urgency, anti-retention, background persistence lines. |
| `world-restraint-runtime.ts` | Single restraint summary line. |
| `anti-performance-runtime.ts` | Reminder against self-conscious minimalism / “slow web” cosplay tone. |
| `object-permanence-runtime.ts` | `regulatedForegroundIds`, cap 2–4, infrastructure lines — catalog honest, foreground scarce. |

## Suppression matrix (high level)

- **High materialization load + age** → `reduceHumanTraces` (Daily human blocks step back).
- **High low-signal load** → `tightenGuidanceCollapse` (fewer noticing lines).
- **High age load** → `reduceObjectForegroundCap` (fewer regulated foreground object cards).
- **High inertia load** → `thinDailyProse` (understatement on Daily + echo stack).
- **Materialization + inertia** → `sparseRitualTraces` (ritual-adjacent density policy).

Details live in `cross-runtime-suppression.ts` and `runtime-fatigue-balancer.ts`; keep this file aligned when those thresholds change.

## UI integration (current)

- **`ObjectRuntimeGate`**: structural foreground ∩ silence window ∩ **`regulatedForegroundIds`**.
- **`GuidanceSessionClient`**: caps noticing with suppression + overflow; hides state explainer when `guidanceUnderstatement`; optional regulation footer.
- **`LivingDailyBand`**: human blocks respect `reduceHumanTraces`; echo stack respects overflow + `dailyUnderstatement`; ultra-thin breath modes collapse age/inertia/slice narrative.
- **`MailTemporalPresence`**: `mailUnderstatement` thins explanatory stack.
- **`WorldRegulationPresenceStrip`**: Home + Objects — thin breath, residual restraint, rare anti-performance.

## Absence policy

Absence here is **deterministic world state**, not loading failure. See `absence-policy.md` and `silence-governance.md`.

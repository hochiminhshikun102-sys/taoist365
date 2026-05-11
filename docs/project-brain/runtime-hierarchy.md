# Runtime Hierarchy

## Stack order (resolution)

1. **Living presence** — same-day room baseline (`dayKey`, climate lines).
2. **Human rhythm** — domestic rhythm lines.
3. **World aging** — sediment, fatigue, layout age.
4. **World inertia** — stillness, repeat windows, guidance minimal hints.
5. **Low-signal humanity** — sparse traces, guidance falloff, sediment windows.
6. **Structural silence** — page energy, absence matrix, object fade lists, fragmentation.
7. **World materialization** — physical room grammar (air, paper, light, surfaces).
8. **World density calibration** — section matrix, mutual exclusion, guidance collapse, mail defaulting, etc. **Depends on** structural silence + inertia + aging.
9. **World regulation** — **depends on all above**; outputs suppression, breathing, understatement, overflow, residual balance, attention withdrawal, object permanence cap, anti-performance reminder.
10. **World stability governance** — depends on structural silence, aging, world regulation; outputs friction and stability lines.
11. **Browser reality** — depends on regulation + inertia + stability; outputs tab/hostname/reopen/sediment/guidance passive flags.

`useWorldRuntime()` order ends with: … → **`worldDefaultExistence`** → **`worldAmbientInternet`** → **`worldGovernance`** → **`worldEcologyCalibration`**（→ **`ecologyCalibratedStructuralThinning`**）→ **`worldCivilizationStabilization`**（→ **`civilizationStabilizedStructuralThinning`**，**intermediate / non-final atmosphere pass**）→ **`worldAiNativeInfrastructure`**（→ **`invisibleInfrastructureStructuralThinning`**，**sole UI atmosphere thinning read / UI-final**）。术语口径：`terminology-governance.md`。

## Precedence (when two bundles touch the same UI)

1. **Structural absence** (`structuralSilence`, `worldDensity.sectionMatrix`) — hard hide of sections.
2. **World density** — mutual exclusion, explanation retirement, guidance collapse flags.
3. **World regulation** — cross-runtime suppression, narrative overflow caps, object `regulatedForegroundIds`, per-page understatement.

If a field seems to “fight,” document the interaction in `decisions-log.md` and encode the winner in one place (prefer regulation layer for cross-cutting caps). **`permanencePass`** thins UI **after** regulation/density; it must not override hard structural absence gates. **`ambientStructuralThinning`**, **`governedStructuralThinning`**, **`ecologyCalibratedStructuralThinning`**, **`civilizationStabilizedStructuralThinning`**, and **`invisibleInfrastructureStructuralThinning`** stack thinning only—they must not override structural absence or regulation hard gates.

## What must not skip the stack

New “world” behaviors should not bypass `worldDensity` or `worldRegulation` when they remove or add copy on Home, Guidance, Daily, Mail, or Objects — otherwise two features will disagree on the same pixel.

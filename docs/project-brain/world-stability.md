# World Stability Governance

## Definition

**World stability governance** models the site’s **resistance to change**: fewer foreground slots, higher friction for new prose stacks, stronger bias toward absence and retirement—not growth.

## Implementation

- Path: `src/data/world-stability-governance/`
- Root: `resolveWorldStabilityGovernanceBundle(structuralSilence, aging, worldRegulation)` in `system.ts`
- On `useWorldRuntime()` as **`worldStability`**, resolved **after** `worldRegulation`, **before** `browserReality`.

## Fields

| Field | Role |
|-------|------|
| `stabilityBudget` | Scalar budget for how much “new” the day tolerates. |
| `runtimeRetirementPressure` | Bias toward retiring dense runtime voices. |
| `foregroundFriction` | Feeds **object sediment** narrowing + policy tone. |
| `ambientGovernorLine` | One-line governor copy. |
| `changeResistance` | Structural resistance tied to page energy. |
| `slowEvolutionLine` | Plain statement: evolution is slow, not shipped weekly. |

## Interaction

- **`foregroundFriction`** reduces `sedimentForegroundIds` length in `browser-reality-engine/object-internet-sediment.ts`.
- Does **not** add new prose channels; it **tightens** existing ones.

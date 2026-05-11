# World Breathing

## Concept

**Breathing** describes how much verbal and structural “lung capacity” the site claims for a given Pacific day — **not** CSS animation or pulsing UI.

It answers: *Is the world speaking in full paragraphs, or holding one thin layer open?*

## Implementation

- **`WorldBreathing`** from `world-breathing-runtime.ts`, embedded in `WorldRegulationBundle.breathing`.
- Fields: `breathingMode`, `worldBreathingLine`, `pageOpenness`, `responsePressure`, `ambientQuietness`.

## Modes (`BreathingMode`)

| Mode | Meaning |
|------|---------|
| `expanded` | More sections may appear without crowding. |
| `thinner` | Fewer blocks, more air. |
| `faded` | Shape stays; voice lowers. |
| `almostStill` | One or two surfaces carry the day. |
| `residualOnly` | Quiet traces + climate foreground only. |

Primary driver: **`structuralSilence.pageEnergy`** with a small deterministic nudge from day key + age.

## UI hooks

- **`LivingDailyBand`**: `residualOnly` / `almostStill` trigger **ultra-thin daily** layout (compressed age/inertia, shortened slice narrative, shareable kept for a stable anchor).
- **`WorldRegulationPresenceStrip`** / **Guidance session footer**: show `worldBreathingLine` when mode is thinner than `expanded`.
- **`GuidanceSessionClient`**: `residualOnly` (and very quiet page energy) combines with **`browserReality.guidancePassiveSurface`** and **`runtimeRetirement.guidanceRetirement`** for **passive / ultra-minimal session**—see `passive-open-states.md`, `passive-worlds.md`, `runtime-retirement.md`.

## Non-goals

- No “breathing” as a gamified wellness metaphor in UI chrome.
- No liveness indicators tied to user presence.

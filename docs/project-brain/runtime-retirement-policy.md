# Runtime Retirement Policy

## Two layers

1. **`runtime-retirement-system`** — operational registry: channel phases, fatigue, rest, rare object foreground cap, guidance ultra-minimal branches. See `runtime-retirement.md`, `object-retirement.md`.
2. **`world-freeze-system` / `runtime-retirement-matrix`** — **policy map**: which runtime families sit in permanent foreground, background, rare resurfacing, or permanent absence once the world is mature; `freezeEmphasis` derives from the retirement bundle so freeze copy and retirement state stay aligned.

## Rule

New behavior should **not** add another top-level hook in `useWorldRuntime()` for every small policy file. Prefer subpackages under `world-maturity-layer` (or similar compositors) and **one** aggregated field.

## Precedence

When retirement says “rest” and freeze says “rare,” UI should prefer **rest / thinning** over loud explanation—document exceptions in `decisions-log.md`.

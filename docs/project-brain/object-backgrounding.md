# Object Backgrounding

## Policy

Objects are **room infrastructure**, not a catalog that must fully parade every day.

## Mechanics

1. **`structuralSilence.objectFade.foregroundObjects`** — candidate set that *may* surface.
2. **`objectSilenceWindow`** (world density) — per-piece cadence; some days a piece does not foreground.
3. **`worldRegulation.objectPermanence`** — **`objectForegroundCap`** (2–4) and **`regulatedForegroundIds`** — deterministic subset of eligible pieces for the day.

`ObjectRuntimeGate` requires all three: structural membership, regulated id, and silence window allow.

## Lines

- `objectPermanenceLine`, `objectNoLongerAnnouncedLine`, `objectInfrastructureLine` — remind that foreground scarcity is intentional, not a bug.

## Non-goals

- No “complete catalog always visible” requirement.
- No dynamic reordering for conversion; order comes from catalog + deterministic filters.

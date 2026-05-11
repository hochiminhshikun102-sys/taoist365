# Guidance Dissolution

## Role

Extra **deterministic** tightening on `/guidance/session` so the stack can stop “trying to complete” the visitor: optional **`noticingUpperBound`**, **`dissolveRoutes`**, **`dissolveClosureCopy`**. Inputs: structural silence (including existing `weatherOnlyMode`), world age stillness weight, runtime fatigue.

## Code

- `src/data/guidance-dissolution/*`
- `worldQuietPermanence.guidanceDissolution`

## UI

`GuidanceSessionClient` applies dissolution **after** existing caps: `Math.min(maxLinesRaw, noticingUpperBound)` when set; ORs `dissolveRoutes` / `dissolveClosureCopy` into existing skip flags.

## Tuning

Thresholds live in `guidance-dissolution/system.ts`; prefer rare strong effect over daily flattening.

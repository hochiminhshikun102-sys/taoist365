# Runtime Retirement Engine

## Role

Policy and copy layer that sits **beside** `runtime-retirement-system`: names permanent vs soft vs background retirement, rare return, and channel-specific retirement lines. It reads `pressure` and `worldFatigue` from the existing bundle and emits a **`stage`** (`vocal` → `permanenceQuiet`) plus flat English lines.

## Code

- `src/data/runtime-retirement-engine/*`
- Composed through `resolveWorldQuietPermanenceLayerBundle` → `worldQuietPermanence.retirementEngine`

## Rules (charter)

- **Permanent retirement:** anti-meta / runtime-awareness / system explanation prose (enforced also by freeze + anti-meta bundles).
- **Soft / background:** guidance residue, ritual teaching tone, anti-overdesign / anti-performance, dense object explanation—thin with age, not deleted as gimmick.

## UI

No dedicated strip yet; available to components via `useWorldRuntime().worldQuietPermanence.retirementEngine`.

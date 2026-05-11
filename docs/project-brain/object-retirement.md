# Object Retirement

## Policy

Objects **exit catalog logic** as primary identity: most pieces live in **permanent background** or **residual**; only **1–3** may `rareForeground` on a given day.

## Data

- `runtimeRetirement.objectRetirement` from `object-retirement-runtime.ts`
- Fields: `rareForegroundObjects`, `permanentBackgroundObjects`, `retiredObjects`, `residualOnlyObjects`, `objectRetirementCap`

## Gate

`ObjectRuntimeGate` requires id ∈ **`rareForegroundObjects`** (after structural, regulation, sediment, silence window).

## Why foreground must shrink

Foreground is **attention**; long URLs keep **one or two familiar things** visible—everything else is **internet background matter**.

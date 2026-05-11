# World Freeze

## Purpose

After maturity, the site treats some voices as **fixed tiers**—permanent foreground, semi-foreground, background, rare resurfacing, and **permanent absence**—not random churn. Data lives under `src/data/world-freeze-system/` and is composed into `worldMaturity.freeze` via `src/data/world-maturity-layer/system.ts`.

## Rules (design intent)

- **Permanent foreground (almost daily):** room weather, browser familiarity, world breathing, shareable residue, hostname familiarity—implemented across existing presence / browser bundles; freeze layer names the policy, not a second weather system.
- **Semi-foreground:** daily residue, object coordinate, ritual traces.
- **Background:** human interruption, mail sediment, object aging, touch sediment.
- **Rare resurfacing:** anti-meta, anti-overdesign, anti-performance, runtime awareness—sparse, not spectacle.
- **Permanent absence:** no “system explains itself,” no runtime talk, no worldbuilding self-narration, no AI-aware prose (`permanent-absence-policy.md`).

## Bundle surface (`WorldFreezeBundle`)

- `stabilityMap`, `retirementMatrix`, `freezeEmphasis` — structural map + matrix tied to `runtime-retirement-system`.
- Copy lines: `foregroundPermanenceLine`, `longLivedBlocksLine`, `ambientBackgroundLayersLine`, `rareResurfacingLine`, `structuralFamiliarityLine`, `permanentAbsencePolicyLine`, `slowReturnLine`, `worldFreezeBoundariesLine`.

## UI

- `WorldMaturityStrip` (Home) samples freeze + stillness + old-page stability—thinned by day index so it does not become a feed.

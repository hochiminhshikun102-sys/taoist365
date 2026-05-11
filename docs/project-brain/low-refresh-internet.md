# Low Refresh Internet

## Definition

**Low refresh internet** (for this domain) means: **no continuous update feeling**—the page may read the same for a long time; the browser tab is the continuity surface, not a feed.

## Implementation

- Path: `src/data/low-refresh-internet/`
- `resolveLowRefreshInternetBundle(structuralSilence, fatigueLevel)` → lines such as `refreshLagLine`, `oldPageStillOpenLine`, `unchangedButAliveLine`, `lowRefreshComfortLine`.

## Bans

- “今天新了什么”, version hype, activity dashboards.

## UI

- `LivingDailyBand` shows `refreshLagLine` on deterministic high-index days.

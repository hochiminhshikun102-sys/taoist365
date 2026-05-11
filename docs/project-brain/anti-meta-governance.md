# Anti–Meta Governance

## Goal

Prevent **system self-awareness**: the site narrating its own quietness, cleverness, “future internet” status, digital monastery aesthetic, or slow-web elitism.

## Implementation

- Path: `src/data/anti-system-self-awareness/`
- `resolveAntiSystemSelfAwarenessBundle(dayKey)` → rotating **`antiMetaReminder`** + **`showAntiMetaFooter`** (rare, deterministic).

## Tone

- Plain, flat, slightly boring—**utility copy**, not manifesto.

## UI

- Footer-class lines on **Guidance session**, **Mail**, **Home/Objects strips**, **`BrowserHostnameFoot`** when `showAntiMetaFooter` is true—**low frequency** by design.

## Relation to world regulation

`worldRegulation.antiPerformanceReminder` handles **anti-performance** posture; **anti-system-self-awareness** handles **anti-meta / anti-cleverness** explicitly.

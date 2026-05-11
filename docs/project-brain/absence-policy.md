# Absence Policy

## Long-lived URL vs active product

**Long-lived URL:** pages may be thin, repeat, or still; the domain and structure remain recognizable without pushing return visits.

**Active product:** urgency, streaks, feeds, “you might like,” continuous novelty — **out of scope**.

## Deterministic absence

- Every absence maps to **inputs** (`dayKey`, bundles, thresholds), not to runtime errors.
- Prefer returning **null** for gated subtrees (e.g. `ObjectRuntimeGate`) over empty layout shells.

## What may go quiet

| Surface | May retract |
|---------|-------------|
| Home | Density-gated sections; regulation strip only on thin days. |
| Guidance | Noticing lines, state explainer, routes; never remove weather + entry context in reflect phase. |
| Daily | Human + echo blocks; keep same-day climate + shareable on thin days. |
| Mail | Long sediment paragraphs under `mailUnderstatement`. |
| Objects | Individual cards; keep page framing and links. |

## Copy bans (retention / growth)

- “今日推荐”, “继续探索”, “你可能喜欢”, streak language, chat companion framing.

## “Background existence”

The site **does not compete for attention** — see `attention-withdrawal-runtime` fields and `WorldRegulationPresenceStrip` / Guidance footer for optional non-urgency lines.

## Long URL habit (browser)

**Long-lived URL sense** = hostname + routes + **low refresh** + **passive tab** semantics (`browser-reality.md`, `non-urgent-internet.md`) — not changelog energy or “we keep improving for you.”

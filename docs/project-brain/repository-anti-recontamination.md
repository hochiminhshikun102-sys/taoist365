# Repository anti-recontamination protocol

Extends `symbolic-anti-reactivation.md` to **folder trees**, **package ergonomics**, and **module naming**. Goal: new work stays **ordinary long-lived web infra**, not “lab civilization.”

## Forbidden repository semantics (new code)

Avoid introducing **new** paths or public identifiers containing:

- **Atmosphere / mood engineering:** `atmosphere-*`, `*-atmosphere`, `atmospheric-*`, `ambient-intelligence`
- **Emotional runtime:** `emotional-*` as a **directory prefix** or module family name (`emotional-ui`, `emotional-density`, …)
- **World simulation:** `world-runtime`, `world-depth`, `civilization-*`, `existential-*`
- **Sacred / transcendence:** `sacred-*`, `oracle-*`, `mystic-*`
- **High-consciousness voice packs:** `core-voice`, `ritual-invitations`, `humanity-language` (prefer `interface-copy`, `flow-copy`, `tone-copy`, …)
- **Ritual as folder prefix:** `ritual-*` under `design-system/` or `language/` (flows may keep `/rituals/` **routes** for URLs)

## Preferred neutral buckets

| Concern | Example bucket names |
|--------|----------------------|
| Layout / spacing | `layout-*`, `surface-*`, `spacing`, `motion-layout` |
| Copy | `interface-copy`, `flow-copy`, `tone-copy`, `continuity-copy`, `plain-copy`, `session-copy` |
| Timing | `tokens/step-timing`, `step-motion` |
| Density | `layout-density`, `content-density` |
| Recognition / motion zones | `flow-recognition`, `motion-layout` |

## Review checklist (PR)

1. No new `world-*` **runtime package** without an ADR in `decisions-log.md`.
2. Design-system additions use **structural** nouns, not personality nouns.
3. Run trace grep from phase K before merge (see latest infra phase report).

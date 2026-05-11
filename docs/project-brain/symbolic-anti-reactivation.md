# Symbolic anti-reactivation protocol

Companion to `runtime-anti-reactivation.md`. Prevents **high-consciousness naming** from returning inside tokens, enums, route semantics, data keys, agent IDs, and internal comments—not only marketing copy.

## Forbidden symbolic vocab (runtime)

Do **not** introduce new identifiers or enum variants containing:

- **Reflective family:** `reflective`, `reflection`, `reflectivePause`, `reflectionGap`, `reflection_support`, `reflection-agent`
- **Atmosphere family:** `atmospheric-anchor`, `emotional-memory`, `ambient-consciousness`, `world-depth` (as internal module naming)
- **Ritual transcendence:** `sacred`, `mystical`, `spiritual`, `oracle`, `transcendence`, `awakening`, `inner-journey`
- **Civilization self-awareness:** `civilization-runtime`, `intelligent-runtime`, `existential-layer`, `advanced-presence`
- **Premium cognition:** `immersive`, `cinematic`, `profound`, `meaningful`, `wisdom`, `contemplative`, `deep-presence`, `inner-stillness`

Allowed neutral substitutes include: `standard`, `steady`, `pause`, `session`, `continuity`, `layout`, `between-step`, `quiet`, `ordinary`, `off-frame`, `shell`, `spacing`.

## Lint / review guidance

1. Before merging structural PRs, grep `src/` for the forbidden tokens above (extend list when drift appears).
2. Prefer **plain structural names** for design-system keys (`continuity-gap`, `layout-bridge`, `betweenStepPauseMs`).
3. Agent and mode strings must stay **instrumental** (`session-agent`, `session_support`), not persona theater.
4. Docs under `docs/project-brain/**` may discuss anti-sacred or anti-cinematic ideas **as critique**; avoid reintroducing these words into **runtime symbols** even when docs mention them.

## Drift signals

- New folders named `*atmosphere*`, `*reflection*`, `*world-depth*` under `src/data` or `src/runtime`.
- Tokens whose names imply emotional choreography (`emotionalBreathingRoom`, `sacred-spacing`).
- Spacing enums that encode personality (`reflectiveDensity`) instead of layout (`steady`, `compact`).

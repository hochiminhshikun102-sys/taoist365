# Guidance System

## QUICK CONTEXT BOOTSTRAP

- Guidance in this **Taoist-inspired lifestyle guidance system** is a bounded room pause—not chat, not a chat-shell—preserving **ritual calm** and **emotional continuity**.
- State-first flow; no personas or typing UI; must respect inertia, **low-signal humanity** falloff, and structural silence.
- Avoid therapy scripts, gamified “sessions,” dependency framing, or omniscient guide voices.
- Keep fragmentation and route visibility rules aligned with the components that consume them.

## THIS DOCUMENT DEFINES

`/guidance` and `/guidance/session`: flow, data paths, runtime gates, and voice for **breathable interfaces**.

## CORE PRINCIPLES

- Guidance is not dialogue: finite session, soft continuation doors, **quiet ritual atmosphere**.
- Voice: short, spacious, unresolved; non-therapeutic, non-authoritative, non-sales.
- No chat-shell persona, bubbles, infinite thread, or “you need this product” framing.

## SYSTEM DETAILS

### Routes

- `/guidance` — arrival and framing
- `/guidance/session` — bounded state flow

### Session shape

1. State selection  
2. Reflect (weather + noticing)  
3. Optional routes  
4. Pause ending  

### Data sources

- `src/data/guidance-operating-layer/*`
- `src/data/living-presence-runtime/system.ts` — climate **emotional continuity**
- `src/data/human-rhythm-runtime/system.ts` — life rhythm **emotional continuity**
- `src/data/world-aging-runtime/system.ts` — guidance fatigue
- `src/data/world-inertia-runtime/system.ts` — minimal routes / lines
- `src/data/low-signal-humanity/system.ts` — signal falloff
- `src/data/structural-silence-engine/system.ts` — fragmentation, route collapse

### Runtime fields (guidance-relevant)

- `guidanceMinimal.maxLines` — noticing cap
- `guidanceMinimal.showRoutes` — offer route list or not
- `guidanceFragmentation.singleLineMode` — one-line reflect
- `guidanceFragmentation.weatherOnlyMode` — weather-only allowed
- `guidanceFragmentation.routeCollapse` — drop route section
- `guidanceFalloff.allowSecondRound` — second line permission
- `guidanceFalloff.allowRoute` — route permission under falloff
- `guidanceFalloff.line` — minimal fallback line

### Voice: avoid

- “I understand you deeply,” coach/therapy scripts, hype, emotional conversion copy.

## MAINTENANCE NOTES

- New guidance UI stays finite-session; no open-ended input as primary mode.
- Shorter flows still need calm, explicit exits.
- Routes remain optional by runtime, not mandatory.

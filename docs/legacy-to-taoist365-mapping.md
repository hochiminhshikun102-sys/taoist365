# Legacy-to-Taoist365 Mapping

## Purpose
This document maps **legacy Manus mechanisms** into the current Taoist365 system without inheriting legacy emotional climate.

Rule of integration:
- Extract mechanism
- Discard old mood
- Rebuild inside Taoist365 rhythm, atmosphere, language, and identity systems

---

## 1) Legacy Interaction Mapping Summary

### Legacy Mechanisms Detected
- Draw flow state progression (`idle -> shaking -> drawing -> result`)
- User action before outcome reveal
- Multi-block result rendering
- Re-draw loop affordance

### Taoist365 Target Mapping
- `src/design-system/tokens/ritual-timing.ts`
- `src/components/experience/ReflectionPause.ts`
- `src/design-system/layout-density/system.ts`
- `src/design-system/interaction-states/system.ts`
- `src/prototypes/ritual-interactions/draw-a-lot/flow.ts`

### Mapping Decisions
## Directly adaptable
- State-machine style progression (as structure only)
- Action-before-reveal ritual logic

## Must be slowed down
- Legacy shake phase timing and response frequency
- Transition intervals between reveal layers

## Must be de-stimulated
- Glow/pulse emphasis during draw
- High-contrast ¡°result hit¡± moments

## Must be re-rhythmized
- Result block ordering must insert reflection silence before continuation
- Repeat draw should become boundary-aware optional continuation

### Integration Directive
Preserve **sequencing intelligence**, replace **kinetic tone** with Taoist365 calm cadence.

---

## 2) Legacy Surface Mapping Summary

### Legacy Surfaces
- Home: carousel + grid + commerce + trust + newsletter
- Oracle entry: reading matrix + AI guide banner
- Draw-a-lot: dramatic hero + action + full results + product recommendation

### Taoist365 Surface Targets
- `src/experience-skeleton/*`
- `src/surfaces/*`
- `src/live-prototypes/*`

### Mapping by Layer
## Homepage
Legacy section breadth can inform narrative segmentation, but all sections must be rebuilt under:
- calm entry first
- silence ratio guarantees
- low CTA pressure

## Draw-a-Lot
Legacy flow phases map to Taoist365 draw surface zones:
- arrival
- settle
- breathing interaction
- layered reveal
- reflection silence
- optional continuation

## Daily/Home Harmony
Legacy has no strong equivalent; use only structural decomposition patterns, not visual semantics.

### Non-portable Surface Elements
- Dashboard-like module density
- Commerce wall behavior
- Assistant-first entry blocks

---

## 3) Legacy Language Drift Summary

### Legacy Language Drift Types
- Marketing urgency (unlock now, subscribe prompts)
- Assistant framing (AI guide language)
- Mystical-authoritative wording
- Conversion-led CTA copy
- Startup UX command cadence

### Taoist365 Language Mapping
- `src/language/core-voice/`
- `src/language/ritual-invitations/`
- `src/language/guidance-tone/`
- `src/language/reflection-layer/`
- `src/language/continuation-language/`
- `src/language/non-marketing-copy/`

### Rewrite Mapping Rules
- Imperative CTA -> gentle invitation
- certainty claim -> uncertainty-tolerant guidance
- conversion push -> optional continuation
- assistant instruction -> reflective companionship at distance
- promotional close -> calm aftertone

### Linguistic Keep/Drop
## Keep
- Path clarity and reading option clarity

## Drop
- ¡°chat with AI guide¡± framing
- urgency hooks, scarcity triggers
- authority/fate language

---

## 4) Commerce Rhythm Reconstruction Summary

### Legacy Commerce Pattern
- Product grid pressure
- Recommendation merged too early into ritual result
- Frequent sales CTA and offer rhythm

### Taoist365 Commerce Target
Ritual-first commerce rhythm:
- atmosphere before product
- reflection before recommendation
- optional discovery after pause

### Mapping to Current Systems
- `src/design-system/non-commercial-atmosphere/`
- `src/design-system/calm-hierarchy/`
- `src/design-system/surface-spacing/`
- `src/design-system/ritual-objects/`

### Decompression Actions
1. Move product exposure after reflection zone
2. Reduce grid saturation and CTA count per viewport
3. Convert recommendation language to low-pressure discovery
4. Integrate objects as atmospheric anchors, not showcase cards
5. Preserve user autonomy with pause/return language

### Strict Avoid
- Funnel pacing
- CTA stacking
- TikTok commerce rhythm

---

## 5) Visual Decontamination Summary

### Legacy Elements to Remove
- Black-gold pressure contrast
- Glow-heavy mystical spectacle
- Dramatic hero urgency
- SaaS card-wall structure
- Assistant/chat UI framing

### Re-adaptation Targets
- `src/design-system/color-temperature/`
- `src/design-system/material-surfaces/`
- `src/design-system/calm-hierarchy/`
- `src/design-system/spatial-warmth/`
- `src/design-system/signature-atmosphere/`

### Decontamination Rules
1. Replace dramatic contrast with warm-linen temperature bands
2. Replace visual effects with material calmness and matte depth
3. Replace aggressive focal hierarchy with one gentle focus per viewport
4. Replace spectacle motion with stillness-preserving motion zones
5. Remove assistant affordances from primary ritual pathways

---

## 6) Homepage Reconstruction Summary

### Legacy Ideas Worth Keeping (as abstract structure)
- Multi-section narrative organization
- Distinct ritual path entry points
- Modular section composition logic

### Must Be Fully Rebuilt
- Hero behavior (no autoplay urgency emphasis)
- Conversion architecture (remove subscribe/sales pressure sequencing)
- Visual style climate (remove luxury-mystical performance cues)
- AI entry framing (remove chat-first guidance path)

### Taoist365 Homepage Reconstruction Direction
From: marketing homepage
To: ritual environment entry

Target sequence:
1. emotional arrival
2. calm orientation
3. ritual path invitation
4. atmosphere deepening
5. soft personalization
6. optional continuation

---

## 7) Final Recommendation: Legacy Assets Worth Integrating

## Worth integrating (high value)
- Interaction state sequencing logic for draw rituals
- Modular composition architecture (CMS-level flexibility)
- Data structures for lots/recommendation linking
- Path organization principles for ritual entry discoverability

## Integrate only after rebuild (medium value)
- Homepage narrative section blueprint
- Oracle path taxonomy and route clarity
- Recommendation placement logic (post-reflection only)

## Do not integrate (low/negative value)
- Legacy visual mood (dark-gold, glow, spectacle)
- Assistant/chat framing
- Conversion-first copy and CTA rhythm
- Commerce pressure patterns and product-grid dominance

## Integration Policy
Any legacy element enters Taoist365 only if it passes these gates:
1. Compatible with ritual timing and reflection pause
2. Compatible with calm hierarchy and low-pressure identity
3. Compatible with non-marketing language system
4. Compatible with signature atmosphere and spatial warmth

If any gate fails, rebuild or reject.

# MASTER ARCHITECTURE

> **ARCHIVE — export snapshot**：以 **`docs/project-brain/`** 为单一真理源。下文保留历史措辞；**当前代码**已迁移：**`environmental-adaptation-engine`**（原 personalization-engine）、**`continuity-engine`**（原 retention-engine）、**`atmosphere-coordinator.ts`** / **`coordinateGuidanceAtmosphere`**（原 orchestrator）。见 **`docs/atmosphere-coordinator-policy.md`**。

## 1) Project Positioning
Taoist365 is a **Taoist-inspired global lifestyle guidance system** for modern daily living.

It is explicitly **not**:
- a generic chatbot
- a therapy platform
- a fortune-telling engine
- an AI companion dependency product

Core product promise:
- calm guidance
- ritual continuity
- emotional pacing
- restrained calm atmosphere (not luxury-showcase framing)
- healthy distance from synthetic rapport

## 2) AI Core Architecture
AI Core composes **capability engines** behind **`coordinateGuidanceAtmosphere`** — atmosphere coordination, not growth orchestration.

### Capability Engines
- `guidance-engine`: non-deterministic, emotionally safe guidance
- `ritual-engine`: ritual actions and paced ritual steps
- `environmental-adaptation-engine`: quiet tone / cadence adaptation from context (not user profiling products)
- `recommendation-engine`: gentle next actions with boundary-aware language
- `continuity-engine`: optional continuation copy without comeback pressure

### Domain-Oriented Composition
Feature surfaces (Draw a Lot, Moon Block, Five Elements, Home Harmony, etc.) consume engines rather than implementing isolated logic.

## 3) Atmosphere coordinator
Main file: `src/server/ai-pipeline/atmosphere-coordinator.ts`

Responsibilities:
1. Resolve regional policy + A/B bucket
2. Apply regional adaptation constraints
3. Evaluate memory policy boundaries
4. Run capability engines
5. Build ritual rhythm
6. Assess interaction health
7. Compose final response with safety and tone constraints

Success criteria:
- calmness and reflection quality
- healthy pacing
- visitor autonomy
- no dependency loops

## 4) Policy System
Policy layer location: `src/policies/`

Design goals:
- configurable
- versioned
- regionalized
- A/B-capable
- regulation-ready

Regions:
- global
- us
- eu
- middle-east
- southeast-asia
- latin-america
- australia

Policy dimensions (region-overridable):
- tone intensity
- ritual depth
- recommendation pacing
- wording sensitivity
- symbolism density
- session pacing

Invariant:
- core AI personality cannot be changed by region policy

## 5) Regional Adaptation
Regional layer location: `src/regions/`

Allowed adaptation:
- wording
- pacing
- onboarding cadence
- visual warmth
- ritual intensity

Not allowed:
- changing core AI personality
- changing safety baseline
- adding dependency cues

## 6) Interaction Health System
Layer: `src/server/interaction-health/`

Purpose:
- interaction pacing
- cooldown suggestion
- reflective pause
- soft slowdown
- ritual spacing
- healthy session boundaries

Important boundary:
- no psychological profiling
- no dependency classification
- no mental-state scoring

## 7) Ritual Rhythm System
Layer: `src/modules/ritual-rhythm/`

Controls:
- daily guidance cadence
- follow-up spacing
- recommendation gap
- session boundary minutes
- reflective pause timing

Principle:
- paced ritual interactions, not infinite chat loops

## 8) AI Personality Definition
Primary references:
- `docs/ai-personality.md`
- `src/regions/core-personality.ts`

Role:
- **Guide**

Traits:
- calm
- quietly confident
- observant
- reflective
- emotionally intelligent
- warm minimal
- gently leading
- spacious
- refined
- grounded

Avoid:
- authority tone
- over-friendliness
- dependency cues
- motivational speaker style
- productivity coach style
- therapy simulation

## 9) Emotional UI System
Layer: `src/design-system/emotional-ui/`

Defines:
- calm spacing
- breathing layout
- soft hierarchy
- emotional contrast
- ritual reveal timing
- warm minimal interaction
- visual silence areas

Anti-patterns:
- dense layout
- dashboard feeling
- app overload
- productivity UI
- gamification feeling

## 10) Motion System
References:
- `src/design-system/motion/ritual-motion.ts`
- `docs/motion-system.md`

Defines:
- reveal cadence
- quiet transition timing
- ritual pacing
- interaction softness
- hover restraint

Avoids:
- bounce
- flashy motion
- gaming motion
- dopamine UI motion
- aggressive transitions

## 11) Typography System
Layer: `src/design-system/typography/`

Defines:
- display typography (restrained editorial)
- ritual quote typography
- guidance typography
- reflective paragraph spacing
- soft emphasis system

Direction:
- calm restraint
- warm minimalism
- breathable reading rhythm

## 12) Experience Principles
Reference: `docs/experience-principles.md`

Core principles:
- calm before conversion
- ritual before transaction
- atmosphere before explanation
- reflection before recommendation
- breathing before information
- guidance before persuasion

## 13) Homepage Experience Architecture
Reference: `docs/home-experience-architecture.md`

Homepage sequence:
1. emotional entry
2. calm opening
3. guidance invitation
4. ritual discovery
5. product atmosphere
6. home harmony
7. daily rhythm
8. soft onboarding
9. gentle continuation

Homepage role:
- entry to ritual space, not tool landing and not hard-sell commerce front

## 14) Global Commerce Strategy
Reference: `docs/global-commerce-strategy.md`

Core strategy:
- US as primary brand anchor
- region-compatible lifestyle expression for EU/AU/ME/LATAM/SEA
- global shipping logic
- China supply chain leverage
- integrated moat = AI + content + culture + supply chain

Brand category framing:
- global lifestyle brand
- not local spiritual service

## 15) Canonical Document List
- `docs/architecture.md`
- `docs/design-system.md`
- `docs/design-principles.md`
- `docs/motion-system.md`
- `docs/ai-safety-tone.md`
- `docs/atmosphere-coordinator-policy.md`（`docs/orchestrator-policy.md` 为重定向桩）
- `docs/memory-policy.md`
- `docs/ai-personality.md`
- `docs/experience-principles.md`
- `docs/home-experience-architecture.md`
- `docs/global-commerce-strategy.md`
- `docs/page-plan.md`

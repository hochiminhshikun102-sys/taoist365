# FILE STRUCTURE

> This tree captures the current project structure for collaboration and onboarding.
> Large generated folders (`node_modules`, `.next`) are intentionally omitted.

## 1) Directory Tree
```text
taoist365/
���� docs/
��  ���� architecture.md
��  ���� design-system.md
��  ���� design-principles.md
��  ���� motion-system.md
��  ���� ai-safety-tone.md
��  ���� orchestrator-policy.md
��  ���� memory-policy.md
��  ���� ai-personality.md
��  ���� experience-principles.md
��  ���� home-experience-architecture.md
��  ���� global-commerce-strategy.md
��  ���� page-plan.md
��  ���� export/
��     ���� MASTER_ARCHITECTURE.md
��     ���� SYSTEM_MAP.md
��     ���� FILE_STRUCTURE.md
��     ���� PHASE_SUMMARY.md
��     ���� index.md
���� public/
��  ���� file.svg
��  ���� globe.svg
��  ���� next.svg
��  ���� vercel.svg
��  ���� window.svg
���� src/
��  ���� app/
��  ��  ���� (commerce)/
��  ��  ���� (experience)/
��  ��  ���� (marketing)/
��  ��  ���� (member)/
��  ��  ���� api/
��  ��  ���� globals.css
��  ��  ���� layout.tsx
��  ��  ���� page.tsx
��  ���� agents/
��  ��  ���� memory/policy.ts
��  ��  ���� orchestration/
��  ��  ���� reasoning/
��  ��  ���� router/
��  ��  ��  ���� index.ts
��  ��  ��  ���� route-emotional-flow.ts
��  ��  ���� tools/
��  ��  ���� workflows/
��  ��  ��  ���� daily-guidance-flow.ts
��  ��  ��  ���� ritual-realignment-flow.ts
��  ��  ��  ���� soft-follow-up-flow.ts
��  ��  ��  ���� index.ts
��  ��  ���� README.md
��  ��  ���� types.ts
��  ���� components/
��  ��  ���� patterns/
��  ��  ���� sections/
��  ��  ���� ui/
��  ���� config/
��  ��  ���� site.ts
��  ���� content/
��  ���� data/
��  ��  ���� lots/schema.ts
��  ��  ���� rituals/schema.ts
��  ��  ���� guidance-copy/schema.ts
��  ��  ���� symbolic-systems/schema.ts
��  ��  ���� personalized-templates/schema.ts
��  ��  ���� recommendation-mapping/schema.ts
��  ��  ���� README.md
��  ���� design-system/
��  ��  ���� docs/
��  ��  ���� emotional-density/
��  ��  ��  ���� index.ts
��  ��  ��  ���� system.ts
��  ��  ���� emotional-ui/
��  ��  ��  ���� index.ts
��  ��  ��  ���� system.ts
��  ��  ���� motion/
��  ��  ��  ���� tokens.ts
��  ��  ��  ���� ritual-motion.ts
��  ��  ���� themes/
��  ��  ���� tokens/
��  ��  ��  ���� colors.ts
��  ��  ��  ���� spacing.ts
��  ��  ��  ���� typography.ts
��  ��  ��  ���� rhythm.ts
��  ��  ���� typography/
��  ��     ���� index.ts
��  ��     ���� emotion.ts
��  ���� lib/
��  ��  ���� ai/safety.ts
��  ��  ���� analytics/
��  ��  ���� auth/
��  ��  ���� email/
��  ��  ���� i18n/
��  ��  ���� payment/
��  ��  ���� seo/
��  ��  ���� utils/
��  ���� modules/
��  ��  ���� domains/
��  ��  ��  ���� home-harmony/
��  ��  ��  ���� life-map/
��  ��  ��  ���� member-journey/
��  ��  ��  ���� rituals/
��  ��  ���� engines/
��  ��  ��  ���� guidance-engine/index.ts
��  ��  ��  ���� ritual-engine/index.ts
��  ��  ��  ���� environmental-adaptation-engine/index.ts
��  ��  ��  ���� recommendation-engine/index.ts
��  ��  ��  ���� continuity-engine/index.ts
��  ��  ��  ���� index.ts
��  ��  ���� ritual-rhythm/
��  ��  ��  ���� rhythm-engine.ts
��  ��  ��  ���� rhythm-guard.ts
��  ��  ��  ���� index.ts
��  ��  ���� README.md
��  ���� policies/
��  ��  ���� global/rules.ts
��  ��  ���� us/rules.ts
��  ��  ���� eu/rules.ts
��  ��  ���� middle-east/rules.ts
��  ��  ���� southeast-asia/rules.ts
��  ��  ���� latin-america/rules.ts
��  ��  ���� australia/rules.ts
��  ��  ���� shared/
��  ��  ��  ���� types.ts
��  ��  ��  ���� resolver.ts
��  ��  ���� README.md
��  ��  ���� index.ts
��  ���� prototypes/
��  ��  ���� ritual-interactions/
��  ��     ���� flows.ts
��  ��     ���� index.ts
��  ���� regions/
��  ��  ���� adaptations.ts
��  ��  ���� core-personality.ts
��  ��  ���� README.md
��  ��  ���� index.ts
��  ���� server/
��  ��  ���� actions/run-guidance-action.ts
��  ��  ���� ai-pipeline/
��  ��  ��  ���� validate-input.ts
��  ��  ��  ���� response-composer.ts
��  ��  ��  ���� atmosphere-coordinator.ts
��  ��  ���� interaction-health/
��  ��  ��  ���� assess-interaction-health.ts
��  ��  ��  ���� index.ts
��  ��  ��  ���� README.md
��  ��  ���� recommendation/choose-gentle-recommendation.ts
��  ��  ���� security/enforce-tone-safety.ts
��  ��  ���� README.md
��  ���� store/
��  ��  ���� session/types.ts
��  ��  ���� onboarding/types.ts
��  ��  ���� ritual-progress/types.ts
��  ��  ���� emotional-flow/types.ts
��  ��  ���� ai-interaction/types.ts
��  ��  ���� README.md
��  ���� styles/
��  ���� types/
��  ��  ���� ai-guidance.ts
��  ��  ���� emotional-guidance.ts
��  ��  ���� engines.ts
��  ���� README-style files in key layers for conventions
���� AGENTS.md
���� CLAUDE.md
���� README.md
���� eslint.config.mjs
���� next.config.ts
���� package.json
���� postcss.config.mjs
���� tsconfig.json
```

## 2) Core Directory Responsibilities
- `src/app`: route surfaces and global shell
- `src/modules`: business capability engines + domain composition + ritual rhythm
- `src/server`: secure orchestration, AI pipeline, safety, recommendation, health boundaries
- `src/policies`: region/version/A-B policy rule sets
- `src/regions`: regional expression adaptation with invariant core personality
- `src/design-system`: emotional UI foundations, tokens, motion, typography, density
- `src/prototypes`: interaction flow prototypes before final UI implementation
- `src/data`: structured ritual and guidance datasets
- `src/store`: client continuity state contracts
- `docs`: architecture, policy, design, experience, and strategy documentation

## 3) Collaboration Notes
- Add new architecture docs under `docs/` and include links in `docs/export/index.md`
- Keep region-specific policy changes inside `src/policies/*`
- Keep personality invariants centralized in `src/regions/core-personality.ts`
- Treat `src/server/ai-pipeline/atmosphere-coordinator.ts` as the canonical AI flow entry (`coordinateGuidanceAtmosphere`)

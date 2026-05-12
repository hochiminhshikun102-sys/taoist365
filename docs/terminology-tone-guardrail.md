# Terminology and Tone Guardrail System

## Purpose
A lightweight scanner to prevent terminology and tone drift across key user-facing text surfaces.

Target drift:
- assistantization
- fortune-telling wording
- startup/growth wording
- marketing pressure wording
- dashboard / marketplace / companion / productivity wording
- spiritual-platform or sanctuary wording

## Files
- Rules: `src/config/terminology-guardrail.json`
- Scanner: `scripts/terminology-guardrail.mjs`
- Command: `npm run guardrail:terminology`
- Runtime infrastructure alias: `npm run guardrail:runtime`
- Operating layer alias: `npm run guardrail:operating`
- Repository continuity alias: `npm run guardrail:continuity`
- Deployment continuity alias: `npm run guardrail:deployment`
- Continuity kernel alias: `npm run guardrail:kernel`

## What It Scans
Current default scopes:
- `src/app`
- `src/components/navigation`
- `src/live-prototypes`
- `src/config`
- `src/language`

Extensions:
- `.ts`
- `.tsx`
- `.md`

## Checks
1. **Banned terminology list**
2. **Tone drift signals** (assistant / fortune / startup / marketing)
3. **Naming consistency check** for high-priority surfaces
4. **Calm language hint check** for high-priority surfaces
5. **Production path drift check** for app/dashboard/marketplace/assistant/feed/retention terms
6. **Production asset continuity check** for old-brand or exploration files
7. **Required anchor check** for freeze, brand, and browser-air files
8. **Public archive isolation check** for old source packs
9. **Production brand reference check** for `/brand/production/` only
10. **Required package script check** for continuity commands

## Naming System Anchors
- Primary front-facing brand: `Reverent Inquiry`
- Ecosystem / domain anchor: `taoist365.com`
- Archive source layer only: `Yewen / \u8c12\u95ee`

`taoist365.com` should stay an address and ecosystem anchor, not the product name.
Legacy Chinese naming belongs to archive context and should not return to production UI.

## Usage
```bash
npm run guardrail:terminology
npm run guardrail:runtime
npm run guardrail:operating
npm run guardrail:continuity
npm run guardrail:deployment
npm run guardrail:kernel
```

If issues are found, script exits with non-zero status and prints top matches.

## Lightweight by Design
- No AST parsing
- No build-step hooks yet
- Fast string-based guardrail suitable for daily editing

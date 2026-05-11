# Terminology and Tone Guardrail System

## Purpose
A lightweight scanner to prevent terminology and tone drift across key user-facing text surfaces.

Target drift:
- assistantization
- fortune-telling wording
- startup/growth wording
- marketing pressure wording

## Files
- Rules: `src/config/terminology-guardrail.json`
- Scanner: `scripts/terminology-guardrail.mjs`
- Command: `npm run guardrail:terminology`

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

## Naming System Anchors
- Product/Site: `Taoist365`
- Brand expression: `Reverent Inquiry`
- Cultural signature: `ÚËÎÊ¶«·½`

## Usage
```bash
npm run guardrail:terminology
```

If issues are found, script exits with non-zero status and prints top matches.

## Lightweight by Design
- No AST parsing
- No build-step hooks yet
- Fast string-based guardrail suitable for daily editing

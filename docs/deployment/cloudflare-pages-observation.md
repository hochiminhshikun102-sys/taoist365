# Cloudflare Pages Quiet Observation

This is a deployment observation note for Reverent Inquiry at taoist365.com. It is not a launch checklist.

## Pages Settings

Use Cloudflare Pages with the static export already configured in `next.config.ts`.

- Framework preset: Next.js or none with explicit commands.
- Build command: `npm run build`.
- Build output directory: `out`.
- Node version: use the project default unless Cloudflare requires an explicit current LTS value.
- Environment variable for protected preview admin: `NEXT_PUBLIC_QUIET_ADMIN_PHRASE`.

Do not add Functions, Workers, SSR adapters, analytics, or optimization tools unless a real continuity problem requires them.

## GitHub Binding

GitHub is source continuity.

- Bind the private repository after the current working tree is intentionally committed.
- Keep repository access small.
- Keep `docs/project-brain/` and guardrail files review-protected by human habit even if branch protection is not yet formal.
- Avoid issue-board and project-board setup unless needed for repair.

No repository ceremony is needed.

## Domain Binding

When the Pages deployment is stable:

- add `www.taoist365.com` as the production custom domain;
- add `taoist365.com` as the apex domain and redirect it to `https://www.taoist365.com`;
- keep canonical identity on `https://www.taoist365.com`;
- avoid launch copy, announcement pages, or campaign URLs.

The domain should appear as an address, not an event.

## Edge Continuity

Keep Cloudflare simple.

Allowed:

- DNS continuity;
- default Pages static delivery;
- conservative `_headers`;
- Cloudflare Access for `/admin` when public;
- simple bot protection if abuse appears.

Avoid:

- performance experiments;
- multiple cache rule layers;
- A/B infrastructure;
- traffic growth tooling;
- enterprise security theater.

## AI-readable Observation

After deployment, check:

- `https://www.taoist365.com/llms.txt`;
- `https://www.taoist365.com/ai-readable.json`;
- object anchors under `/objects`;
- page metadata;
- no keyword-stuffed machine copy.

AI-readable files are continuity, not acquisition.

## Browser Climate Observation

After the domain resolves, observe with real browsers:

- homepage remains ordinary;
- Browser Air remains peripheral;
- mobile scroll remains breathable;
- Draw a Lot still feels like a page, not an app;
- Objects still reads as object presence, not a shop wall;
- footer simply ends;
- wind residue does not become the center.

Observe before repairing. Repair only restraint drift.

## Admin Protection

The static phrase gate is not production authentication.

Before exposing `/admin` publicly:

- set `NEXT_PUBLIC_QUIET_ADMIN_PHRASE` only for trusted preview if needed;
- put `/admin` behind Cloudflare Access or an equivalent platform gate;
- keep admin labels maintenance-oriented;
- do not add operator dashboards.

## Post-deployment Non-action

After first deployment:

- do not tune for metrics;
- do not add analytics by default;
- do not redesign from first impression panic;
- do not announce a launch;
- wait for ordinary browser use before changing the frontstage.

The correct first state is simply reachable.

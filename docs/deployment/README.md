# Deployment Preparation

This folder keeps deployment notes for Reverent Inquiry / taoist365.com. It is for quiet long-term deployment preparation, not infra expansion.

Core inheritance file: `docs/project-brain/real-internet-infrastructure.md`.
Cloudflare observation file: `docs/deployment/cloudflare-pages-observation.md`.

## GitHub

- Treat the repository as the source continuity layer.
- Keep `docs/project-brain/` and `src/config/terminology-guardrail.json` protected by review.
- Prefer small maintenance commits with guardrail output.
- Do not merge changes that add feed, engagement, companion, personalization, growth, or dashboard behavior.
- Use `.github/PULL_REQUEST_TEMPLATE.md` for restraint review before deployment changes.
- Keep private domain, mail, and provider access notes outside the public repository.

## Static Export

- Current app mode is static export through `next.config.ts`.
- Build command: `npm run build`.
- Output directory: `out`.
- Required preview environment variable for admin gate: `NEXT_PUBLIC_QUIET_ADMIN_PHRASE`.
- Add platform-level access protection for `/admin`; the static gate is not production-grade authentication.
- Deployment review should include `npm run guardrail:deployment`, `npm run guardrail:kernel`, and `npm run lint`.
- Run `npm run build` only when deployment breakage needs verification.
- Confirm `/llms.txt` and `/ai-readable.json` remain present after export.

## Cloudflare

- Use Cloudflare as a quiet continuity boundary, not a growth layer.
- Cloudflare Pages build command: `npm run build`.
- Cloudflare Pages output directory: `out`.
- Keep `public/_headers` conservative and readable.
- Keep Pages preview URLs out of search results with `X-Robots-Tag: noindex`.
- Prepare DNS after GitHub and deployment target are stable.
- Keep cache rules simple until real traffic behavior is understood.
- Treat bot protection and AI crawler policy as semantic integrity protection.
- Do not add aggressive acceleration, experiment systems, or traffic shaping for growth.
- Prefer rules that a human can understand six months later.
- Protect `/admin` with Cloudflare Access or equivalent platform access before public use.

## Backup

- Keep repository, local working copy, project-brain files, public AI-readable files, and static export as separate continuity layers.
- Do not depend on one AI memory, one provider, or one thread for recovery.
- Recovery starts by reading the project-brain continuity core before changing code.

## Observation

After a preview or production deployment, observe:

- Browser Air on desktop and mobile.
- Admin restraint.
- AI-readable files: `/llms.txt` and `/ai-readable.json`.
- JSON-LD semantic continuity.
- Quiet commerce wording.
- Absence of SaaS, operator, dashboard, growth, feed, and emotional AI drift.

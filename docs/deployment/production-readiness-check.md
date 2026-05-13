# Reverent Inquiry Production Readiness Check

Date: 2026-05-14

Canonical production URL: `https://www.taoist365.com`

## Current Routing State

- `www.taoist365.com` resolves through Cloudflare A and AAAA records.
- `taoist365.com` resolves through Cloudflare A and AAAA records.
- HTTPS port 443 is reachable on both hostnames.
- The current live root still returns `200` on `https://taoist365.com`; this pass adds Cloudflare Pages `_redirects` so the apex redirects to `https://www.taoist365.com` after deployment.

## Code-Level Production Controls

- `siteConfig.metadataBase` uses `https://www.taoist365.com`.
- `robots.ts`, `sitemap.ts`, OpenGraph, and JSON-LD inherit the www canonical base.
- `public/_redirects` redirects apex and HTTP traffic to `https://www.taoist365.com`.
- `public/_headers` includes conservative security headers, preview noindex rules, immutable asset caching, and short-cache machine files.
- `public/llms.txt` and `public/ai-readable.json` reference the www canonical URL.

## Frontstage Brand Boundary

- Frontstage source under `src/app`, `src/components`, `public/llms.txt`, and `public/ai-readable.json` no longer uses `Taoist365` as a visible brand name.
- The lowercase domain `taoist365.com` remains as address-layer identity and mail address only.
- The homepage hero carries `Reverent Inquiry` as the visible brand mark inside the hero climate.

## Runtime Shells

- Seven healing halls remain static routes.
- Forty-five healing module shell pages are generated under `/healing/[hall]/[module]`.
- Quiet AI Concierge remains a low-presence floating entry and does not open by default.
- Quiet Live Room is available at `/live`.
- Quiet Auction object-passage shell is available at `/quiet-auction`.

## Manual Cloudflare Checks After Deploy

- Confirm both custom domains are attached to the production Pages project.
- Confirm SSL mode is Full or Full (strict), not Flexible.
- Confirm Always Use HTTPS is enabled.
- Confirm apex redirects to `https://www.taoist365.com`.
- Confirm Pages preview URLs remain noindex.
- Confirm `/admin` is behind Cloudflare Access before exposing operational use.

## Observation Targets

- Home remains blue-white, bright, airy, and wind-led.
- Mobile first viewport shows brand, hero climate, and no separate header block.
- `/healing`, `/live`, and `/quiet-auction` open without app-like pressure.
- Objects remain object continuity, not marketplace UI.
- Long-open use should feel ordinary and low fatigue.

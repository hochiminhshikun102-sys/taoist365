# P0-01A Preview baseline and resource isolation

## Authorization

```text
P0_01A_CONSTRUCTION_AUTHORIZED=TRUE
P0_01B_TO_F_AUTHORIZED=FALSE
SKELETON_CONSTRUCTION_AUTHORIZED=FALSE
OVERVIEW_CONSTRUCTION_AUTHORIZED=FALSE
PRODUCTION_DEPLOY=FALSE
```

## Isolation

| Item | Value |
| --- | --- |
| Worktree | `D:\DH_ADMIN_OS_P0_01A_PREVIEW_BASELINE_WT` |
| Branch | `feat/admin-os-p0-01a-preview-baseline` |
| Base commit | `cdc74ae` |
| Preview static | `docs/security/preview-static/` (marker page, not full site `out/`) |
| Persist | `.preview-state/` (gitignored) |
| KV/R2 | local simulated via `wrangler pages dev --kv --r2 --persist-to` |
| Production bind | none |
| Account Center track | not modified; see `p0-01a-parallel-track-boundary.md` |

This batch does not copy the main working tree `out/` (Account Center is building in parallel). Functions are served from this WT `functions/` directory.

## Not changed

- `src/components/admin/AdminOSConsole.tsx`
- `src/app/layout.tsx`, `src/app/globals.css`
- `src/app/(member)/account/journal/**`
- `public/dh/account/journal/**`
- Account Orders / After-sales pages
- No Admin API lock
- No consumer migration

## How to start Preview (do not deploy)

```text
powershell -File scripts/p0-01a-start-preview.ps1
```

Listens on `http://127.0.0.1:8788`.

Then:

```text
node scripts/p0-01a-probe-preview.mjs
node scripts/p0-01a-seed-preview-fixture.mjs
node scripts/p0-01a-probe-preview.mjs
```

Writes must appear only under `.preview-state/`.

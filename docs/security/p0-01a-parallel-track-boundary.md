# Parallel construction boundary — Account Center vs Admin OS

Received 2026-08-15 from Account Center 狗蛋. Binding for this WT:

```text
ACCOUNT_CENTER_TRACK=SEPARATE
OA_ADMIN_OS_TRACK=THIS_WT
WAIT_FOR_EACH_OTHER=FALSE
```

## This WT must not touch

- `src/app/(member)/account/journal/**`
- `public/dh/account/journal/**`
- Account Orders / After-sales pages
- Global `src/app/layout.tsx` and `src/app/globals.css` unless a later OA package explicitly authorizes and aligns

Account Center current avoid-list:

- WT: `D:\DH_JOURNAL_DETAIL_RUNTIME_V1_5_WT`
- Branch: `feat/journal-detail-rebuild-runtime-v1-5`
- `PAGE_GO=FALSE`, not deployed

## This WT

- Path: `D:\DH_ADMIN_OS_P0_01A_PREVIEW_BASELINE_WT`
- Branch: `feat/admin-os-p0-01a-preview-baseline`
- Authorized batch: P0-01A only

Do not join real Journal/Order APIs, cross-account auth, or OA read/write against Account Center Runtime in this batch.
Do not “fix while here” across tracks.

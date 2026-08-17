# P0-01A rollback

Worktree:

```text
D:\DH_ADMIN_OS_P0_01A_PREVIEW_BASELINE_WT
branch: feat/admin-os-p0-01a-preview-baseline
base: cdc74ae
```

This batch must not delete old routes or lock Admin APIs. Rollback is therefore:

1. Stop Preview Functions.
2. Leave Production untouched (`PRODUCTION_DEPLOY=FALSE`).
3. If this branch must be abandoned:

```text
git -C "D:\DH_ADMIN_OS_P0_01A_PREVIEW_BASELINE_WT" checkout -- .
git -C "D:\谒问东方独立站\谒问东方独立站\taoist365" worktree remove "D:\DH_ADMIN_OS_P0_01A_PREVIEW_BASELINE_WT"
git -C "D:\谒问东方独立站\谒问东方独立站\taoist365" branch -D feat/admin-os-p0-01a-preview-baseline
```

4. Local Preview state lives only in:

```text
D:\DH_ADMIN_OS_P0_01A_PREVIEW_BASELINE_WT\.preview-state
```

Delete that folder to wipe Preview data. It is gitignored.

5. Do not run `wrangler delete` against Production KV/R2.
6. Do not restore Production from Preview fixtures.

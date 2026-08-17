# P0-00B rollback

Identity public layer only. No Production deploy was performed.

To drop this batch:

1. Delete `functions/_auth/**` and `functions/api/account/session.js`.
2. Delete `src/lib/auth/README.md`.
3. Delete `scripts/p0-00b-identity-tests.mjs`.
4. Delete `docs/security/p0-00b-functions-identity-layer.md` and this file.
5. Remove `jose` from `package.json` / `package-lock.json` and run `npm uninstall jose` in this worktree.
6. Remove the `test:p0-00b` script from `package.json`.

Cloudflare Preview variables from P0-00A stay as the owner set them. This batch did not write secrets and does not need them removed to roll back code.

P0-00C / P0-00D / P0-01B remain unauthorized until a later gate.

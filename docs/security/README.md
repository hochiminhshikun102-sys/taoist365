# Security construction notes

This folder holds P0 Admin API security construction evidence.

Current authorized batch: **P0-00C** AuthModal and browser session. See `p0-00c-authmodal-session.md`.

```text
P0_00B_FUNCTIONS_IDENTITY=PASS
P0_00C_AUTHORIZED=TRUE
P0_00D_AUTHORIZED=FALSE
P0_01B_IMPLEMENTATION=PAUSED
PRODUCTION_DEPLOY=FALSE
```

Account Center construction is a separate track. This WT must not edit Journal / Orders / After-sales paths or global `layout` / `globals.css`.

- Do not lock `/api/admin/*` in this batch.
- Do not migrate Wind Seeker / Account consumers in this batch.
- Do not bind Production KV/R2.
- Do not deploy Production.

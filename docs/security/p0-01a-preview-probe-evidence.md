# P0-01A Preview probe evidence

Probed at: 2026-08-15T04:08:46+08:00  
Base: `http://127.0.0.1:8788`  
`PRODUCTION_DEPLOY=FALSE`

Wrangler bindings (from start log):

```text
env.OBJECT_INTAKE_KV          KV Namespace   local
env.OBJECT_MEDIA_BUCKET       R2 Bucket      local
env.DOHARA_RUNTIME_ENV        local (preview)
env.DOHARA_PREVIEW_ISOLATION  local (TRUE)
```

## Before seed

| Path | HTTP | storage | rows |
| --- | ---: | --- | ---: |
| `/api/public/objects` | 200 | (none) | 0 |
| `/api/admin/object-intakes` | 200 | OBJECT_INTAKE_KV | 0 |
| `/api/admin/objects` | 200 | OBJECT_INTAKE_KV | 0 |
| `/api/admin/orders` | 200 | OBJECT_INTAKE_KV | 0 |
| `/api/admin/air-engine/jobs` | 200 | OBJECT_INTAKE_KV | 0 |

Anonymous 200 on Admin API is the **current baseline**, not a fix. Locking is P0-01D and is not authorized yet.

## After redacted seed (`POST /api/object-intakes` → 201)

| Path | HTTP | rows |
| --- | ---: | ---: |
| `/api/admin/object-intakes` | 200 | 1 |
| `/api/admin/air-engine/jobs` | 200 | 1 |
| `/api/public/objects` | 200 | 0 |

Created Preview IDs (synthetic, not Production): `intake_mstdqxd9_2otn1s` / `OI-38125933`

Persist files appeared only under:

```text
D:\DH_ADMIN_OS_P0_01A_PREVIEW_BASELINE_WT\.preview-state\v3\kv\
D:\DH_ADMIN_OS_P0_01A_PREVIEW_BASELINE_WT\.preview-state\v3\r2\
```

No Production KV/R2 IDs were used. Probe scripts do not print emails, addresses, or source_url.

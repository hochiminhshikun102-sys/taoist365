# P0-00A-CF1 Cloudflare read-only probe

```text
P0_00A_SUPABASE_DASHBOARD_READY=TRUE
P0_00A_CLOUDFLARE_PREVIEW_ENV_READY=FALSE
P0_00A_GATE=HOLD
P0_00A_CF1_PROBE=DONE
PRODUCTION_DEPLOY=FALSE
```

WT: `D:\DH_ADMIN_OS_P0_01A_PREVIEW_BASELINE_WT`  
Date: 2026-08-16  
Commands run: `npx wrangler --version`, `npx wrangler whoami`, `npx wrangler pages project list --json`  
Not run: `pages secret put`, deploy, login, token create.

## Command results

| Command | Result |
| --- | --- |
| `npx wrangler --version` | `4.123.0` |
| `npx wrangler whoami` | **Not authenticated.** Asked for `wrangler login`. |
| `npx wrangler pages project list --json` | **Failed.** Non-interactive: needs `CLOUDFLARE_API_TOKEN`. No token was created or set. |

Remote Pages project list, Production branch, and live env names are **unconfirmed**.

## Findings (local + prior public observation)

| Question | Answer | Confidence |
| --- | --- | --- |
| Pages vs Workers | **Cloudflare Pages** with Pages Functions (`functions/`, `pages_build_output_dir: ./out`). Not a standalone Workers app. Live site `www.taoist365.com` previously returned `Server: cloudflare` and Functions JSON. | High for type; project **name** not confirmed via API |
| Wrangler config on disk | **No** `wrangler.toml` / `wrangler.json` / `wrangler.jsonc`. Templates only: `wrangler.example.jsonc` (`name: "taoist365"`), `wrangler.preview.example.jsonc` (`name: "taoist365-preview-p0-01a"`, local P0-01A, not a live CF project). | High |
| Accurate Pages project name | **Unknown from CLI.** Repo template name is `taoist365`. Must be read in Cloudflare Dashboard. | Unconfirmed |
| Production branch | **Unknown from CLI.** Internal note `docs/project-brain/地瓜05-专用信道资料/施工状态.md` says `master`. GitHub remote exists. Do not treat as Dashboard-confirmed. | Unconfirmed |
| Preview deploy method | **Git-connected Pages preview** (docs: `*.pages.dev` / branch previews) **plus** local `wrangler pages dev` (P0-01A). No Wrangler production deploy was used this batch. | Medium (docs + local script) |

## `pages secret put` risk (why GATE stays HOLD)

`wrangler pages secret put --help` (v4.123.0) shows:

- required key name
- `--project-name`

**No Preview-vs-Production environment flag.** Writing a secret via CLI can hit the production Pages env. Do not run it until Dashboard confirms project name and a safe Preview-only write path.

## Environment variable **names** only

### Live Cloudflare Dashboard names

**Not readable** (no login / no token).

### Names declared in this WT (not proof they exist on CF)

From `wrangler.example.jsonc` / bindings docs / `.env.example` (gitignored, names only):

```text
NEXT_PUBLIC_QUIET_ADMIN_PHRASE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
OBJECT_INTAKE_KV          (KV binding name)
OBJECT_MEDIA_BUCKET       (R2 binding name)
```

From P0-00A template (planned, not written to CF):

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_URL
SUPABASE_ISSUER
SUPABASE_JWKS_URL
SUPABASE_SECRET_KEY
DOHARA_RUNTIME_ENV
```

No values were printed or committed.

## Stop

No deploy, no secret put, no production change, no token.  
`P0_00A_CLOUDFLARE_PREVIEW_ENV_READY` remains **FALSE**.

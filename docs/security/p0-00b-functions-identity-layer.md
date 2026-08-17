# P0-00B — Functions identity public layer

```text
P0_00A_GATE=PASS
P0_00B_CONSTRUCTION_AUTHORIZED=TRUE
P0_00C_TO_D_AUTHORIZED=FALSE
P0_01B_IMPLEMENTATION=PAUSED
PRODUCTION_DEPLOY=FALSE
```

This batch adds JWKS verification and `GET /api/account/session` only. AuthModal (C), fixture owner remap (D), P0-01B business APIs, Admin lock, and Production deploy are out of scope.

## Isolation

| Env | Supabase Project | This batch |
| --- | --- | --- |
| Preview | dedicated project; Cloudflare Preview vars already set by owner | verifier reads `SUPABASE_ISSUER` + `SUPABASE_JWKS_URL` |
| Production | separate project | **not used**; Production Cloudflare vars were not changed |

Verification never uses `SUPABASE_SECRET_KEY`. That name may exist in Preview for later server jobs; it is not an authorization input.

`SUPABASE_JWKS_JSON` is **local test only**. Do not set it on Cloudflare Preview or Production.

## Files

| Path | Role |
| --- | --- |
| `functions/_auth/auth-errors.js` | `AUTH_REQUIRED` / `TOKEN_EXPIRED` / `TOKEN_INVALID` / `ISSUER_MISMATCH` / `PERMISSION_DENIED` / `ACCOUNT_RESTRICTED`; `Cache-Control: no-store` |
| `functions/_auth/supabase-identity.js` | `jose` `jwtVerify` against JWKS; map `sub` → `user_id` / `account_id`; roles only from `app_metadata.dohara_roles` |
| `functions/_auth/require-identity.js` | Bearer required; non-`active` `account_status` → 403 |
| `functions/_auth/require-role.js` | role + `member_id` / `windseeker_id` presence |
| `functions/api/account/session.js` | `GET /api/account/session` session DTO |
| `src/lib/auth/README.md` | pointer only; no second verifier |
| `scripts/p0-00b-identity-tests.mjs` | local ES256 keys; no JWT/secret printed |
| `package.json` / `package-lock.json` | `jose` |

## Verify order

```text
read request_id
→ Bearer token
→ missing → 401 AUTH_REQUIRED
→ jwtVerify(signature, kid, iss, aud, exp)
→ missing sub → 401 TOKEN_INVALID
→ map identity from payload.sub + app_metadata only
→ account_status !== active → 403 ACCOUNT_RESTRICTED
→ requireRole(needed) → 403 PERMISSION_DENIED
```

Trusted fields: `sub`, `app_metadata.dohara_roles`, `app_metadata.member_id`, `app_metadata.windseeker_id`, `app_metadata.account_status`.

Not used for authorization: `user_metadata`, email, phone, client `user_id` / `owner_id` / `role`, `SUPABASE_SECRET_KEY`.

## Session DTO (no token / email / JWT)

```text
authenticated
user_id
account_id
member_id
windseeker_id
roles
account_status
expires_at
request_id
```

## Tests

Command (prints pass/fail names only):

```text
npm run test:p0-00b
```

Local run 2026-08-16: **16 / 16 PASS**. No token values written to logs.

| Case | Result |
| --- | --- |
| Preview member token | verify OK; session 200; roles include `member`; DTO has no token/email |
| Preview wind_seeker token | session 200; `member` + `wind_seeker` + `windseeker_id` |
| No token | 401 `AUTH_REQUIRED` |
| Forged signature / unknown kid | 401 `TOKEN_INVALID` |
| Expired token | 401 `TOKEN_EXPIRED` |
| Production issuer on Preview config | 401 `ISSUER_MISMATCH` or `TOKEN_INVALID` |
| Wrong audience | 401 |
| `user_metadata.role=admin` spoof | roles stay `member`; no `admin` |
| disabled identity | 403 `ACCOUNT_RESTRICTED` |
| member missing `wind_seeker` | 403 |
| JWKS rotation (old kid still present) | still verifies |
| JWKS rotation (kid removed) | rejected |

Build / lint of the Next app were not required to exercise Functions identity. The identity tests import the same modules Pages Functions will load.

## Not done

- AuthModal / Supabase browser client (P0-00C)
- Fixture owner remap (P0-00D)
- P0-01B Wind Seeker / Account business APIs
- Admin API lock
- Production deploy
- Reading or printing any Cloudflare / Supabase secret value

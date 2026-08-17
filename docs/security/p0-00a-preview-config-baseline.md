# P0-00A STOP — repo-side Preview config baseline

```text
P0_00A_CONSTRUCTION_AUTHORIZED=TRUE
P0_00A_DASHBOARD_ACCESS=FALSE
P0_00A_PROJECT_CREATED=FALSE
P0_00B_TO_D_AUTHORIZED=FALSE
P0_01B_IMPLEMENTATION=PAUSED
PRODUCTION_DEPLOY=FALSE
```

No Supabase Dashboard / CLI login is available in this channel. Per the construction order: **repo-side checklist only**. No forged project, token, test account, or shared secret.

## Isolation (locked)

| Env | Supabase Project | Status this batch |
| --- | --- | --- |
| Preview | dedicated project, test users only | **to be created by owner in Dashboard** |
| Production | separate project | may be created later; **must stay closed**; do not put Preview values here |

Never share Auth Project, Signing Key, or Secret Key across Preview and Production.

## Environment variable names only

### Browser-safe (Publishable, not identity)

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

### Functions / Cloudflare encrypted vars

```text
SUPABASE_URL
SUPABASE_ISSUER
SUPABASE_JWKS_URL
SUPABASE_SECRET_KEY
```

`SUPABASE_SECRET_KEY` is never `NEXT_PUBLIC_*`. Never commit values. Never paste values in chat.

### URL templates (fill project ref only in Dashboard / Cloudflare UI)

```text
SUPABASE_URL        = https://<PREVIEW_PROJECT_REF>.supabase.co
SUPABASE_ISSUER     = https://<PREVIEW_PROJECT_REF>.supabase.co/auth/v1
SUPABASE_JWKS_URL   = https://<PREVIEW_PROJECT_REF>.supabase.co/auth/v1/.well-known/jwks.json
```

Production uses `<PRODUCTION_PROJECT_REF>` — a **different** ref.

Official JWKS: https://supabase.com/docs/guides/auth/jwts  
Signing keys: https://supabase.com/docs/guides/auth/signing-keys

## Redirect Allowlist (Preview only)

Site URL (Preview):

```text
http://127.0.0.1:3000
```

Additional Redirect URLs (Preview):

```text
http://127.0.0.1:3000/**
http://localhost:3000/**
http://127.0.0.1:8788/**
http://localhost:8788/**
http://127.0.0.1:3000/auth/callback
http://localhost:3000/auth/callback
https://<PREVIEW_PAGES_HOSTNAME>/**
https://<PREVIEW_PAGES_HOSTNAME>/auth/callback
```

**Must not** appear on the Preview allowlist:

```text
https://www.taoist365.com
https://taoist365.com
```

Those belong only to the Production project, later.

## Auth methods to enable on Preview (Dashboard)

- Email + Password
- Magic Link / OTP
- Confirm email: Preview may use “confirm signup” per owner preference; do not send production mail
- Social login: **off**

## Asymmetric Signing Key

Dashboard: Project Settings → JWT → Signing keys.

- New projects after 2025-10-01 default to asymmetric keys.
- Required algorithm for this foundation: **asymmetric** (`ES256` preferred, or RSA).
- **HS256 shared JWT secret is not acceptable** for Functions JWKS verify (JWKS would be empty).
- After enable, `GET SUPABASE_JWKS_URL` must return `keys` with at least one `kid` (public only). Do not screenshot secrets. A redacted `{ "keys": [ { "kid": "…", "alg": "ES256" } ] }` is enough later.

## Four Preview test identities (create in Dashboard only)

Do **not** write emails or passwords in git or chat.

| Handle | `app_metadata.dohara_roles` | `account_status` | Also set | Purpose |
| --- | --- | --- | --- | --- |
| preview-member | `["member"]` | `active` | `member_id` | self read |
| preview-windseeker | `["member","wind_seeker"]` | `active` | `member_id` + `windseeker_id` | buyer self read |
| preview-other | `["member"]` | `active` | different `member_id` | other-resource 404 |
| preview-disabled | `["member"]` | `disabled` | `member_id` | 403 restricted |

`app_metadata` is server-only. Never put roles in `user_metadata`.

## Cloudflare Pages

| Environment | Action this batch |
| --- | --- |
| Preview | After Dashboard project exists, owner pastes Preview vars in Cloudflare **Preview** env only |
| Production | Leave Supabase vars **empty**. Do not copy Preview values |

## Owner Dashboard checklist (no secrets in reply)

1. Create Supabase project named like `dohara-identity-preview` (region owner chooses).
2. Optionally create `dohara-identity-production` and leave unused.
3. Preview: enable Email+Password and Magic Link; disable social.
4. Preview: set Site URL + Redirect Allowlist as above.
5. Preview: confirm JWT signing keys are **asymmetric**; open JWKS URL privately and confirm `keys` is non-empty.
6. Create the four users; set `app_metadata` via Dashboard / Admin API (not in this chat).
7. Put Preview URL + publishable key + secret key into Cloudflare **Preview** encrypted vars only.
8. Tell 狗蛋: `P0_00A_DASHBOARD_READY=TRUE` **without** pasting any secret, password, or JWT.

## This batch did not

- Create a Supabase project or users
- Add `src/lib/supabase` or `functions/_auth` (those are P0-00B)
- Open AuthModal (P0-00C)
- Resume P0-01B
- Touch Journal / Orders / After-sales / layout / globals.css / Admin OS
- Write any Secret, token, or test password

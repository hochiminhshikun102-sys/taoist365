# P0-01B STOP — identity gap + API contract

```text
P0_01B_CONSTRUCTION_AUTHORIZED=TRUE
P0_01B_IMPLEMENTATION=STOPPED
P0_01B_IDENTITY_SESSION=MISSING
P0_01B_FAKE_LOGIN=NOT_CREATED
P0_01C_TO_F_AUTHORIZED=FALSE
PRODUCTION_DEPLOY=FALSE
```

This batch is **stopped at the contract**. No Wind Seeker / Account Functions were added. No shared token, preview passphrase, or fake login was invented.

## 1. Why implementation cannot start

P0-01B requires: resolve `subject_id` from a **server-side** customer / partner session, then ownership-check, then whitelist DTO.

Searched this WT (`cdc74ae` + P0-01A staged files):

| Candidate | Result |
| --- | --- |
| `functions/_auth/**` | does not exist |
| Next `middleware.ts` | does not exist (static export also cannot protect Functions) |
| Cloudflare Access JWT verify in Functions | not present |
| next-auth / Clerk / Lucia / iron-session | not present |
| Member login / sign-in routes | no `login` / `signIn` page under `src/app` |
| `buyerProfiles` | empty store slot only |
| Stripe `session-status` | checkout payment session (`cs_…`), not a user session |

What exists today (not reusable as identity):

| Mechanism | What it actually is |
| --- | --- |
| `NEXT_PUBLIC_QUIET_ADMIN_PHRASE` + `sessionStorage` | Admin **page** gate only; public env; not a buyer/member session |
| Hardcoded `windSeekerBuyerId = "wind-seeker"` | Client constant sent as query `buyer_id` / `submitted_by` |
| Hardcoded `member_id: "member-preview"` | Client body field on `POST /api/object-intakes` |
| localStorage buyer applications | Browser-only mock, not Functions auth |

Trusting those client fields is **explicitly forbidden**. Using the admin phrase as a buyer/member login is also forbidden.

Without a server `subject_id`, required tests cannot be honest:

| Required test | Without session |
| --- | --- |
| 本人 200 | cannot distinguish self |
| 未认证 401 | could fake a blanket 401, but then 本人 200 is impossible |
| 他人 404 | cannot distinguish other vs missing |
| 422 / 409 | not sufficient to authorize going live |

## 2. Frozen API contract (do not implement until identity exists)

When a later package supplies a Functions-readable session, implement **only** these routes. Methods: GET. No consumer migration in B.

### 2.1 Routes

| Route | Subject | Ownership |
| --- | --- | --- |
| `GET /api/wind-seeker/intakes` | partner / buyer session | rows where `buyer_id` or `submitted_by` equals `subject_id` AND channel is Wind Seeker commerce (not WK member supply) |
| `GET /api/wind-seeker/products` | same | same; list DTO |
| `GET /api/wind-seeker/products/{id}` | same | one intake or published object owned by `subject_id`; unknown or others → `404 RESOURCE_NOT_FOUND` |
| `GET /api/account/windkeep-supplies/{id}` | customer / member session | `member_id` (or equivalent owner field) equals `subject_id`; others → 404 |

Do not accept `user_id`, `owner_id`, `role`, `email`, `buyer_id`, `member_id`, `submitted_by` from query/body/headers as authorization.

### 2.2 Session resolver (required from identity package)

Must run on Cloudflare Pages Functions:

```text
parse request_id
→ read HttpOnly session / verified edge JWT
→ reject if missing or invalid → 401 AUTH_REQUIRED
→ subject = { kind: "wind_seeker"|"account_member", subject_id }
→ never take subject_id from the client
```

Admin phrase gate is out of scope. Account Center Journal/Orders session (when it exists) must not be invented here; wait for the identity contract from 发财 / 客户中心, then map `subject_id` only.

### 2.3 Wind Seeker list/detail DTO whitelist

Allowed:

```text
intake_id
source_type
title
cover
submitted_at
updated_at
review_status
publish_status
object_id
public_feedback
allowed_actions
```

`owner_id` may be used server-side only; do not echo other people’s ids.

Forbidden in response:

```text
admin notes, internal cost, risk tags
other users’ contact / identity
source_url
full review snapshot / before_json / after_json
EnrichedIntake raw object
email, phone, address, Stripe secrets, KV keys
```

### 2.4 Account WK supply DTO whitelist

Allowed:

```text
supply_id
object_summary
media_owned_by_user
submission_status
review_status
next_action
created_at
updated_at
```

`owner_id` server-side only. Same forbidden list as above.

### 2.5 Error contract

| HTTP | code | When |
| ---: | --- | --- |
| 401 | `AUTH_REQUIRED` | no/invalid session; empty body of business rows |
| 403 | `PERMISSION_DENIED` | authenticated but wrong kind (e.g. member hitting Wind Seeker) |
| 404 | `RESOURCE_NOT_FOUND` | missing **or** owned by someone else (no existence leak) |
| 409 | `STATE_CONFLICT` | reserved; these four routes are GET. Use if a later write lands on the same resource |
| 422 | `VALIDATION_FAILED` | missing/invalid `{id}` or disallowed query |
| 429 | `RATE_LIMITED` | reserved |
| 500 | `INTERNAL_ERROR` | no stack, no KV key |

Every response: `request_id`; private responses `Cache-Control: no-store`.

Example 401 (no data):

```json
{
  "ok": false,
  "code": "AUTH_REQUIRED",
  "error": "Authentication required.",
  "request_id": "req_preview_redacted"
}
```

Example 404 (do not say “not yours”):

```json
{
  "ok": false,
  "code": "RESOURCE_NOT_FOUND",
  "error": "Resource not found.",
  "request_id": "req_preview_redacted"
}
```

## 3. What 发财 / 身份包 must provide before B can resume

1. A Pages Functions session verifier that returns `{ kind, subject_id }` or throws unauthenticated.
2. Mapping rules: Wind Seeker `subject_id` ↔ intake `buyer_id` / `submitted_by`; member `subject_id` ↔ `member_id`.
3. How Preview issues a real session **without** Production users and **without** a shared passphrase.
4. Confirmation that Account Center Journal/Orders identity (separate track) is either reusable or explicitly not reused.

Until that package exists, P0-01B stays STOPPED. P0-01C must not start (consumers still call `/api/admin/*`).

## 4. This batch did not

- Add `functions/api/wind-seeker/**` or `functions/api/account/windkeep-supplies/**`
- Migrate four frontstage consumers
- Lock `/api/admin/*`
- Touch Admin OS UI, Skeleton, Overview
- Touch Journal, Orders, After-sales, `layout.tsx`, `globals.css`
- Write Production KV/R2 or deploy

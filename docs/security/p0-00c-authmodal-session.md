# P0-00C — AuthModal and browser session

```text
P0_00B_FUNCTIONS_IDENTITY=PASS
P0_00C_E1_FAIL_CLOSED=DONE
P0_00D_AUTHORIZED=FALSE
P0_01B_IMPLEMENTATION=PAUSED
PRODUCTION_DEPLOY=FALSE
LOGOUT_OLD_SESSION=SDK_SESSION_NULL; UNEXPIRED_JWT_NOT_REVOKED
```

## E1 fail-closed

- `PreviewAuthGate` starts closed. Children (AuthModal / callback inner) do not mount until the gate allows. No Supabase init on first paint.
- `getSupabaseBrowserClient` also refuses unless the same gate passes.
- Allowed hosts: `127.0.0.1`, `localhost`, and `*.taoist365.pages.dev` with `NEXT_PUBLIC_DOHARA_RUNTIME_ENV=preview`.
- Denied: `taoist365.com`, `www.taoist365.com`, Pages production `taoist365.pages.dev`, any other `*.pages.dev`.
- `signOutAndVerifyCleared` checks `signOut()` error, then `getSession()` must be `null`. Empty-token 401 is a separate test, not logout proof.

## Logout finding (not substituted with no-token 401)

1. Real SDK `signOut` + `getSession()` must yield `session === null`.
2. Replaying the **same unexpired** access JWT still returns 200 from `GET /api/account/session`.
3. Functions verify JWKS signature/exp only. This batch does not add a denylist.

```text
SDK_SESSION_CLEARED=TRUE
UNEXPIRED_ACCESS_JWT_IMMEDIATE_REVOKE=FALSE
NO_TOKEN_401=SEPARATE_FROM_LOGOUT
```

import { createLocalJWKSet, createRemoteJWKSet, jwtVerify } from "jose";
import { authCodes } from "./auth-errors.js";

const jwksCache = new Map();

function readEnv(env, key) {
  return String(env?.[key] || "").trim();
}

export function resolveAuthConfig(env = {}) {
  const issuer = readEnv(env, "SUPABASE_ISSUER");
  const jwksUrl = readEnv(env, "SUPABASE_JWKS_URL");
  const audience = readEnv(env, "SUPABASE_JWT_AUD") || "authenticated";
  const localJwks = readEnv(env, "SUPABASE_JWKS_JSON");
  return { issuer, jwksUrl, audience, localJwks };
}

async function getKeySet(config) {
  if (config.localJwks) {
    const parsed = JSON.parse(config.localJwks);
    return createLocalJWKSet(parsed);
  }
  if (!config.jwksUrl) {
    throw Object.assign(new Error("JWKS URL is not configured."), { code: authCodes.AUTH_REQUIRED });
  }
  const cached = jwksCache.get(config.jwksUrl);
  if (cached) return cached;
  const keySet = createRemoteJWKSet(new URL(config.jwksUrl), {
    cacheMaxAge: 600_000,
    cooldownDuration: 30_000,
  });
  jwksCache.set(config.jwksUrl, keySet);
  return keySet;
}

function normalizeAudience(value) {
  if (Array.isArray(value)) return value.map(String);
  return String(value || "authenticated");
}

function readRoles(appMetadata) {
  const roles = appMetadata?.dohara_roles;
  return Array.isArray(roles) ? roles.map(String).filter(Boolean) : [];
}

function readAccountStatus(appMetadata) {
  if (!appMetadata || !Object.prototype.hasOwnProperty.call(appMetadata, "account_status")) {
    return "restricted";
  }
  const raw = appMetadata.account_status;
  if (typeof raw !== "string") {
    return "restricted";
  }
  const status = raw.trim();
  if (status === "active") return "active";
  return status || "restricted";
}

export function mapVerifiedIdentity(payload) {
  const sub = String(payload.sub || "").trim();
  const appMetadata = payload.app_metadata && typeof payload.app_metadata === "object" ? payload.app_metadata : {};
  const roles = readRoles(appMetadata);
  const accountStatus = readAccountStatus(appMetadata);
  const memberId = String(appMetadata.member_id || "").trim() || null;
  const windseekerId = String(appMetadata.windseeker_id || "").trim() || null;

  return {
    sub,
    auth_subject_id: sub,
    user_id: sub,
    account_id: sub,
    member_id: memberId,
    windseeker_id: windseekerId,
    roles,
    account_status: accountStatus,
    expires_at: typeof payload.exp === "number" ? new Date(payload.exp * 1000).toISOString() : null,
  };
}

export async function verifySupabaseAccessToken(token, env = {}) {
  const raw = String(token || "").trim();
  if (!raw) {
    return { ok: false, code: authCodes.AUTH_REQUIRED, error: "Authentication required." };
  }

  const config = resolveAuthConfig(env);
  if (!config.issuer) {
    return { ok: false, code: authCodes.AUTH_REQUIRED, error: "Authentication required." };
  }

  try {
    const keySet = await getKeySet(config);
    const { payload } = await jwtVerify(raw, keySet, {
      issuer: config.issuer,
      audience: normalizeAudience(config.audience),
    });

    const sub = String(payload.sub || "").trim();
    if (!sub) {
      return { ok: false, code: authCodes.TOKEN_INVALID, error: "Authentication required." };
    }

    return { ok: true, identity: mapVerifiedIdentity(payload) };
  } catch (error) {
    const name = String(error?.code || error?.name || "");
    if (name === "ERR_JWT_EXPIRED" || name === "JWTExpired") {
      return { ok: false, code: authCodes.TOKEN_EXPIRED, error: "Token expired." };
    }
    if (name === "ERR_JWT_CLAIM_VALIDATION_FAILED" && String(error?.claim || "") === "iss") {
      return { ok: false, code: authCodes.ISSUER_MISMATCH, error: "Authentication required." };
    }
    return { ok: false, code: authCodes.TOKEN_INVALID, error: "Authentication required." };
  }
}

export function readBearerToken(request) {
  const header = request?.headers?.get?.("authorization") || request?.headers?.get?.("Authorization") || "";
  const match = String(header).match(/^Bearer\s+(\S+)/i);
  return match ? match[1] : "";
}

"use client";

import { privateFetch } from "@/lib/auth/private-api";
import { fetchTrustedOaSession, getOaSupabaseBrowserClient } from "@/lib/oa-auth/supabaseClient";
import { readAccessToken } from "@/lib/supabase/client";

export const OA_PRIVATE_READ_ROLES = ["oa_admin", "oa_operator"] as const;
export const OA_PRIVATE_GET_TIMEOUT_MS = 12000;

export type CoReadErrorCode =
  | "auth_required"
  | "permission_denied"
  | "provider_unavailable"
  | "preview_read_unavailable";

export type CoReadSource = "VERIFIED_LOCAL_READ_SOURCE";

export type CoJsonGetOk<T> = {
  ok: true;
  status: 200;
  payload: T;
  storage: string | null;
  readSource: CoReadSource;
};

export type CoJsonGetErr = {
  ok: false;
  status: number | null;
  code: CoReadErrorCode;
};

export type CoJsonGetResult<T> = CoJsonGetOk<T> | CoJsonGetErr;

export type CoPrivateAccess =
  | { allow: true; role: (typeof OA_PRIVATE_READ_ROLES)[number] }
  | { allow: false; code: Exclude<CoReadErrorCode, "preview_read_unavailable"> };

export function createCoReadController() {
  let generation = 0;
  let controller: AbortController | null = null;
  const blobUrls = new Set<string>();

  function revokeBlobs() {
    for (const url of blobUrls) {
      try {
        URL.revokeObjectURL(url);
      } catch {
        /* ignore */
      }
    }
    blobUrls.clear();
  }

  return {
    next(): { generation: number; signal: AbortSignal } {
      generation += 1;
      controller?.abort();
      revokeBlobs();
      controller = new AbortController();
      return { generation, signal: controller.signal };
    },
    isCurrent(value: number) {
      return value === generation;
    },
    trackBlob(url: string) {
      blobUrls.add(url);
    },
    clear() {
      generation += 1;
      controller?.abort();
      controller = null;
      revokeBlobs();
    },
  };
}

export async function resolvePrivateReadAccess(signal?: AbortSignal): Promise<CoPrivateAccess> {
  if (signal?.aborted) return { allow: false, code: "provider_unavailable" };
  try {
    const token = String((await readAccessToken()) || "").trim();
    if (!token) return { allow: false, code: "auth_required" };
    const result = await fetchTrustedOaSession();
    if (signal?.aborted) return { allow: false, code: "provider_unavailable" };
    if (result.status === 401) return { allow: false, code: "auth_required" };
    if (result.status === 403) return { allow: false, code: "permission_denied" };
    if (result.status !== 200 || result.body?.authenticated !== true) {
      return { allow: false, code: "auth_required" };
    }
    const role = String(result.body.oa_role || "");
    if ((OA_PRIVATE_READ_ROLES as readonly string[]).includes(role)) {
      return { allow: true, role: role as (typeof OA_PRIVATE_READ_ROLES)[number] };
    }
    return { allow: false, code: "permission_denied" };
  } catch {
    return { allow: false, code: "provider_unavailable" };
  }
}

export type CoBlobGetResult =
  | { ok: true; blob: Blob; contentType: string }
  | { ok: false; status: number | null; code: CoReadErrorCode | "not_found" };

export function isTrustedPrivateBytePath(path: string): boolean {
  return /^\/api\/(?:assets|object-media)\/[A-Za-z0-9._-]+$/.test(path);
}

export async function oaPrivateGetBlob(path: string, signal: AbortSignal): Promise<CoBlobGetResult> {
  if (!isTrustedPrivateBytePath(path)) {
    return { ok: false, status: null, code: "provider_unavailable" };
  }
  const access = await resolvePrivateReadAccess(signal);
  if (signal.aborted) return { ok: false, status: null, code: "provider_unavailable" };
  if (!access.allow) return { ok: false, status: null, code: access.code };

  const timeout = AbortSignal.timeout(OA_PRIVATE_GET_TIMEOUT_MS);
  const combined =
    typeof AbortSignal.any === "function" ? AbortSignal.any([signal, timeout]) : signal;

  try {
    const response = await privateFetch(path, {
      method: "GET",
      signal: combined,
      headers: { accept: "image/*,video/*,application/octet-stream" },
    });
    if (response.status === 401) return { ok: false, status: 401, code: "auth_required" };
    if (response.status === 403) return { ok: false, status: 403, code: "permission_denied" };
    if (response.status === 404) return { ok: false, status: 404, code: "not_found" };
    if (response.status !== 200) return { ok: false, status: response.status, code: "provider_unavailable" };
    const blob = await response.blob();
    const contentType = response.headers.get("content-type") || blob.type || "";
    return { ok: true, blob, contentType };
  } catch (error) {
    if (signal.aborted || (error instanceof DOMException && error.name === "AbortError")) {
      return { ok: false, status: null, code: "provider_unavailable" };
    }
    return { ok: false, status: null, code: "provider_unavailable" };
  }
}

export async function oaPrivateGetJson<T extends { storage?: string }>(
  path: "/api/admin/orders" | "/api/admin/objects" | "/api/admin/assets",
  signal: AbortSignal,
): Promise<CoJsonGetResult<T>> {
  const access = await resolvePrivateReadAccess(signal);
  if (signal.aborted) return { ok: false, status: null, code: "provider_unavailable" };
  if (!access.allow) return { ok: false, status: null, code: access.code };

  const timeout = AbortSignal.timeout(OA_PRIVATE_GET_TIMEOUT_MS);
  const combined =
    typeof AbortSignal.any === "function" ? AbortSignal.any([signal, timeout]) : signal;

  try {
    const response = await privateFetch(path, {
      method: "GET",
      signal: combined,
      headers: { accept: "application/json" },
    });
    if (response.status === 401) return { ok: false, status: 401, code: "auth_required" };
    if (response.status === 403) return { ok: false, status: 403, code: "permission_denied" };
    if (response.status !== 200) return { ok: false, status: response.status, code: "provider_unavailable" };

    let payload: T;
    try {
      payload = (await response.json()) as T;
    } catch {
      return { ok: false, status: response.status, code: "provider_unavailable" };
    }
    if (!payload || typeof payload !== "object" || !Array.isArray((payload as { rows?: unknown }).rows)) {
      // A malformed or missing rows collection is not an empty live result.
      return { ok: false, status: 200, code: "provider_unavailable" };
    }
    const storage = typeof payload.storage === "string" ? payload.storage : null;
    return {
      ok: true,
      status: 200,
      payload,
      storage,
      readSource: "VERIFIED_LOCAL_READ_SOURCE",
    };
  } catch (error) {
    if (signal.aborted || (error instanceof DOMException && error.name === "AbortError")) {
      return { ok: false, status: null, code: "provider_unavailable" };
    }
    return { ok: false, status: null, code: "provider_unavailable" };
  }
}

export function subscribeOaAuthEpoch(onChange: () => void): () => void {
  const client = getOaSupabaseBrowserClient();
  if (!client) return () => undefined;
  const { data } = client.auth.onAuthStateChange(() => {
    onChange();
  });
  return () => data.subscription.unsubscribe();
}

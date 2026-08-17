"use client";

import { readAccessToken, getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { ServerSessionDto } from "@/lib/auth/identity";

const sessionUrl = "/api/account/session";

export async function fetchAccountSession(accessToken: string): Promise<{
  status: number;
  body: ServerSessionDto;
}> {
  const token = String(accessToken || "").trim();
  const response = await fetch(sessionUrl, {
    method: "GET",
    cache: "no-store",
    headers: token
      ? {
          authorization: `Bearer ${token}`,
          accept: "application/json",
        }
      : { accept: "application/json" },
  });
  const body = (await response.json()) as ServerSessionDto;
  return { status: response.status, body };
}

export async function fetchTrustedSession(): Promise<{
  status: number;
  body: ServerSessionDto;
}> {
  const token = await readAccessToken();
  return fetchAccountSession(token);
}

export async function privateFetch(input: RequestInfo | URL, init: RequestInit = {}, didRefresh = false): Promise<Response> {
  const token = await readAccessToken();
  const headers = new Headers(init.headers || {});
  if (token) headers.set("authorization", `Bearer ${token}`);
  headers.set("cache-control", "no-store");
  const response = await fetch(input, { ...init, headers, cache: "no-store" });
  if (response.status !== 401 || didRefresh) return response;

  const { error } = await getSupabaseBrowserClient().auth.refreshSession();
  if (error) return response;
  return privateFetch(input, init, true);
}

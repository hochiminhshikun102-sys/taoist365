"use client";

import type { FormEvent } from "react";
import type { OaAuthDenyReason } from "@/lib/oa-auth/oaAuthClaims";

type Props = {
  reason: OaAuthDenyReason | "checking";
  notice?: string;
  onSignIn?: (email: string, password: string) => void;
  pending?: boolean;
};

const COPY: Record<
  Exclude<Props["reason"], "checking">,
  { title: string; zh: string; en: string; chips: string[] }
> = {
  runtime_not_preview: {
    title: "OA Admin access required",
    zh: "当前不是 Preview 运行时，OA 门禁保持关闭。",
    en: "OA Auth Gate stays closed outside Preview runtime.",
    chips: ["preview_only", "read_only", "real_write_false"],
  },
  env_missing: {
    title: "OA Admin access required",
    zh: "缺少 Preview 公共环境变量，OA 门禁保持关闭。",
    en: "Preview public env is missing. OA Auth Gate stays closed.",
    chips: ["preview_only", "auth_required", "real_write_false"],
  },
  auth_required: {
    title: "OA Admin access required",
    zh: "请使用已授权的 OA 测试账户登录后访问。",
    en: "Sign in with an authorized OA test account to continue.",
    chips: ["auth_required", "preview_only", "real_write_false"],
  },
  role_not_allowed: {
    title: "OA Admin access required",
    zh: "当前账户角色不在 OA 授权列表中。",
    en: "This account role is not allowed for OA Admin.",
    chips: ["role_not_allowed", "read_only", "real_write_false"],
  },
  account_inactive: {
    title: "OA Admin access required",
    zh: "当前账户状态不是 active，访问已关闭。",
    en: "Account status is not active. Access stays closed.",
    chips: ["account_inactive", "read_only", "real_write_false"],
  },
};

export function OaAdminAuthState({ reason, notice, onSignIn, pending }: Props) {
  if (reason === "checking") {
    return (
      <section className="oa-page oa-auth-block" data-oa-auth-state="checking">
        <article className="oa-card">
          <h1 className="oa-page-title">OA Admin access required</h1>
          <p className="oa-skeleton-lead">Checking access. OA content stays hidden until the gate opens.</p>
          <div className="oa-capability-row">
            <span className="oa-capability-pill is-not_connected">auth_required</span>
            <span className="oa-capability-pill is-not_connected">preview_only</span>
            <span className="oa-capability-pill is-not_connected">real_write_false</span>
          </div>
        </article>
      </section>
    );
  }

  const copy = COPY[reason];

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!onSignIn) return;
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();
    const password = String(new FormData(form).get("password") || "");
    onSignIn(email, password);
  }

  return (
    <section className="oa-page oa-auth-block" data-oa-auth-state={reason}>
      <article className="oa-card">
        <h1 className="oa-page-title">{copy.title}</h1>
        <p className="oa-skeleton-lead">{copy.zh}</p>
        <p className="oa-skeleton-lead">{copy.en}</p>
        <div className="oa-capability-row">
          {copy.chips.map((chip) => (
            <span key={chip} className="oa-capability-pill is-not_connected">
              {chip}
            </span>
          ))}
        </div>
        {reason === "auth_required" && onSignIn ? (
          <form className="oa-auth-sign-in" onSubmit={submit}>
            <label>
              Email
              <input name="email" type="email" autoComplete="username" required disabled={pending} />
            </label>
            <label>
              Password
              <input name="password" type="password" autoComplete="current-password" required disabled={pending} />
            </label>
            <button className="oa-btn" type="submit" disabled={pending}>
              Sign in
            </button>
          </form>
        ) : null}
        {notice ? <p className="oa-skeleton-meta">{notice}</p> : null}
      </article>
    </section>
  );
}

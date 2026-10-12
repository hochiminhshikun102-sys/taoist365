import type { PlatformReadonlyModule } from "./platformReadonlyTypes";

/**
 * TEST_ONLY UI fixtures for Finance / Compliance / Settings readonly wiring D.
 * Not Formal Provider. No live finance / compliance / settings writes.
 */
export const PLATFORM_READONLY_META = {
  data_source: "TEST_ONLY_UI_FIXTURE",
  not_formal_provider: true,
  mode: "READONLY_PREVIEW",
  provider_status: "Provider not connected",
} as const;

export const PLATFORM_READONLY_MODULES: Record<string, PlatformReadonlyModule> = {
  finance: {
    id: "finance",
    activeKey: "finance",
    en: "Finance",
    zh: "财务",
    descriptionEn:
      "Readonly finance board. Settlement, payout, refund, and reconciliation fixtures only — live ledger writes stay blocked.",
    descriptionZh: "财务只读看板。结算、打款、退款与对账仅为夹具；真实账本写入保持阻断。",
    canonicalDomain: "08 Finance",
    writeGateLine: "Live Finance write blocked",
    writeGateMeta: "No payout / refund / settlement mutation",
    summaries: [
      { label: "Settlement queue · 结算队列", value: "4", hint: "TEST_ONLY count" },
      { label: "Payout preview · 打款预览", value: "2", hint: "preview only" },
      { label: "Refund watch · 退款观察", value: "1", hint: "fixture only" },
      { label: "Provider link · 接线状态", value: "Offline", hint: "Not connected" },
    ],
    rows: [
      {
        id: "FIN-TEST-SET-801",
        primary: "Settlement batch · 结算批次",
        secondary: "Billing review · preview",
        status: "settlement_preview",
        asOf: "2026-10-12 12:10",
      },
      {
        id: "FIN-TEST-PAY-640",
        primary: "Payout request · 打款请求",
        secondary: "Payout blocked · Provider offline",
        status: "payout_blocked",
        asOf: "2026-10-12 11:22",
      },
      {
        id: "FIN-TEST-REF-312",
        primary: "Refund / reconciliation · 退款对账",
        secondary: "Reconciliation fixture · write disabled",
        status: "recon_watch",
        asOf: "2026-10-11 17:45",
      },
    ],
    listTitle: "Finance snapshot · 财务快照（只读）",
    emptyTitle: "Empty state · 空状态",
    emptyBody: "No live Finance Provider ledger connected. Fixture rows are preview-only.",
    errorTitle: "Error state · 错误状态",
    errorBody: "Provider unavailable · Finance source not wired. Payout / refund / settlement actions disabled.",
    primaryActionLabel: "Run settlement · 执行结算 · Provider not connected",
    secondaryActionLabel: "Issue payout · 发起打款 · Not connected",
  },
  compliance: {
    id: "compliance",
    activeKey: "risk_control",
    en: "Compliance",
    zh: "合规",
    descriptionEn:
      "Readonly compliance board. Policy, audit, risk, and regional restriction fixtures only — no enforcement writes.",
    descriptionZh: "合规只读看板。政策、审计、风险与区域限制仅为夹具；不做真实执法写入。",
    canonicalDomain: "13 Compliance",
    writeGateLine: "Live Compliance write blocked",
    writeGateMeta: "No policy / enforcement / evidence mutation",
    summaries: [
      { label: "Policy packs · 政策包", value: "6", hint: "TEST_ONLY count" },
      { label: "Audit items · 审计项", value: "9", hint: "preview only" },
      { label: "Risk flags · 风险标记", value: "3", hint: "fixture only" },
      { label: "Provider link · 接线状态", value: "Offline", hint: "Not connected" },
    ],
    rows: [
      {
        id: "CMP-TEST-POL-501",
        primary: "Policy review · 政策复核",
        secondary: "Regional restriction · descriptive",
        status: "policy_preview",
        asOf: "2026-10-12 10:55",
      },
      {
        id: "CMP-TEST-AUD-388",
        primary: "Audit evidence · 审计证据",
        secondary: "Evidence attach blocked · Provider offline",
        status: "audit_preview",
        asOf: "2026-10-12 09:40",
      },
      {
        id: "CMP-TEST-RSK-220",
        primary: "Risk watch · 风险观察",
        secondary: "Enforcement action disabled",
        status: "risk_watch",
        asOf: "2026-10-11 20:18",
      },
    ],
    listTitle: "Compliance snapshot · 合规快照（只读）",
    emptyTitle: "Empty state · 空状态",
    emptyBody: "No live Compliance Provider cases connected. Fixture rows are preview-only.",
    errorTitle: "Error state · 错误状态",
    errorBody: "Provider unavailable · Compliance source not wired. Enforcement actions disabled.",
    primaryActionLabel: "Apply policy · 应用政策 · Provider not connected",
    secondaryActionLabel: "Enforce · 执法 · Not connected",
  },
  settings: {
    id: "settings",
    activeKey: "system_settings",
    en: "Settings",
    zh: "设置",
    descriptionEn:
      "Readonly settings board. Roles summary, integration status, and environment checklist are fixtures — configuration writes stay disabled.",
    descriptionZh: "设置只读看板。角色摘要、集成状态与环境清单为夹具；配置写入保持禁用。",
    canonicalDomain: "14 Settings",
    writeGateLine: "Live Settings write blocked",
    writeGateMeta: "No role / integration / toggle mutation",
    summaries: [
      { label: "Role summaries · 角色摘要", value: "5", hint: "TEST_ONLY count" },
      { label: "Integrations · 集成", value: "3 offline", hint: "Not connected" },
      { label: "Env checklist · 环境清单", value: "Watch", hint: "fixture" },
      { label: "Provider link · 接线状态", value: "Offline", hint: "Not connected" },
    ],
    rows: [
      {
        id: "SET-TEST-ROLE-101",
        primary: "System roles summary · 系统角色摘要",
        secondary: "Readonly · no identity backend write",
        status: "role_preview",
        asOf: "2026-10-12 08:30",
      },
      {
        id: "SET-TEST-INT-204",
        primary: "Integration status · 集成状态",
        secondary: "Provider offline · toggle disabled",
        status: "integration_offline",
        asOf: "2026-10-12 08:30",
      },
      {
        id: "SET-TEST-ENV-309",
        primary: "Environment checklist · 环境清单",
        secondary: "Readonly toggles · write blocked",
        status: "env_watch",
        asOf: "2026-10-11 22:05",
      },
    ],
    listTitle: "Settings snapshot · 设置快照（只读）",
    emptyTitle: "Empty state · 空状态",
    emptyBody: "No live Settings Provider config connected. Fixture rows are preview-only.",
    errorTitle: "Error state · 错误状态",
    errorBody: "Provider unavailable · Settings source not wired. Save / toggle actions disabled.",
    primaryActionLabel: "Save settings · 保存设置 · Provider not connected",
    secondaryActionLabel: "Toggle · 切换 · Not connected",
  },
};

export function getPlatformReadonlyModule(id: string): PlatformReadonlyModule | undefined {
  return PLATFORM_READONLY_MODULES[id];
}

import type { MemberServiceReadonlyModule } from "./memberServiceReadonlyTypes";

/**
 * TEST_ONLY UI fixtures for CS Center / WK / GS readonly wiring C.
 * Not Formal Provider. No live CS / WindKeep / Guidance writes.
 */
export const MEMBER_SERVICE_READONLY_META = {
  data_source: "TEST_ONLY_UI_FIXTURE",
  not_formal_provider: true,
  mode: "READONLY_PREVIEW",
  provider_status: "Provider not connected",
} as const;

export const MEMBER_SERVICE_READONLY_MODULES: Record<string, MemberServiceReadonlyModule> = {
  "cs-center": {
    id: "cs-center",
    activeKey: "cs_center",
    en: "CS Center",
    zh: "客服中心",
    descriptionEn:
      "Readonly customer support carrier. Ticket / message / SLA fixtures only — live reply and escalation stay blocked.",
    descriptionZh: "客服中心只读承载。工单、消息与 SLA 仅为夹具；真实回复与升级保持阻断。",
    canonicalDomain: "07 CS Center",
    writeGateLine: "Live CS write blocked",
    writeGateMeta: "No ticket reply / escalation mutation",
    summaries: [
      { label: "Open tickets · 未结工单", value: "7", hint: "TEST_ONLY count" },
      { label: "Messages · 消息", value: "19", hint: "preview only" },
      { label: "SLA watch · SLA 观察", value: "2", hint: "fixture breach" },
      { label: "Provider link · 接线状态", value: "Offline", hint: "Not connected" },
    ],
    rows: [
      {
        id: "CS-TEST-TICKET-401",
        primary: "Order inquiry · 订单问询",
        secondary: "Channel email · SLA watch",
        status: "open_fixture",
        asOf: "2026-10-12 11:05",
      },
      {
        id: "CS-TEST-MSG-318",
        primary: "Member message preview · 会员消息预览",
        secondary: "Inbox · reply disabled",
        status: "inbox_preview",
        asOf: "2026-10-12 10:22",
      },
      {
        id: "CS-TEST-ESC-210",
        primary: "Escalation queue · 升级队列",
        secondary: "Escalation blocked · Provider offline",
        status: "escalation_blocked",
        asOf: "2026-10-11 16:40",
      },
    ],
    listTitle: "Support snapshot · 客服快照（只读）",
    emptyTitle: "Empty state · 空状态",
    emptyBody: "No live CS Provider tickets connected. Fixture rows are preview-only.",
    errorTitle: "Error state · 错误状态",
    errorBody: "Provider unavailable · CS source not wired. Reply / escalate actions disabled.",
    primaryActionLabel: "Reply · 回复 · Provider not connected",
    secondaryActionLabel: "Escalate · 升级 · Not connected",
  },
  wk: {
    id: "wk",
    activeKey: "wk",
    en: "WK",
    zh: "WindKeep",
    descriptionEn:
      "Readonly WindKeep carrier. Objects, exchanges, and dispute states are fixtures — no live WK mutation.",
    descriptionZh: "WindKeep 只读承载。物件、交换与争议态为夹具；不写真实 WK。",
    canonicalDomain: "11 WK",
    writeGateLine: "Live WindKeep write blocked",
    writeGateMeta: "No object / exchange / dispute mutation",
    summaries: [
      { label: "WK objects · WK 物件", value: "12", hint: "TEST_ONLY count" },
      { label: "Exchanges · 交换", value: "3", hint: "preview only" },
      { label: "Disputes · 争议", value: "1", hint: "fixture only" },
      { label: "Provider link · 接线状态", value: "Offline", hint: "Not connected" },
    ],
    rows: [
      {
        id: "WK-TEST-OBJ-771",
        primary: "Consignment object · 寄售物件",
        secondary: "Fulfillment state · preview",
        status: "listed_fixture",
        asOf: "2026-10-12 09:48",
      },
      {
        id: "WK-TEST-EX-552",
        primary: "Exchange request · 交换请求",
        secondary: "Counterparty preview · action disabled",
        status: "exchange_preview",
        asOf: "2026-10-12 08:15",
      },
      {
        id: "WK-TEST-DSP-109",
        primary: "Dispute case · 争议案件",
        secondary: "Fulfillment hold · write blocked",
        status: "dispute_watch",
        asOf: "2026-10-11 21:05",
      },
    ],
    listTitle: "WindKeep snapshot · WindKeep 快照（只读）",
    emptyTitle: "Empty state · 空状态",
    emptyBody: "No live WindKeep Provider objects connected. Fixture rows are preview-only.",
    errorTitle: "Error state · 错误状态",
    errorBody: "Provider unavailable · WindKeep source not wired. Write actions disabled.",
    primaryActionLabel: "Update WK · 更新 WK · Provider not connected",
    secondaryActionLabel: "Refresh · 刷新 · Not connected",
  },
  gs: {
    id: "gs",
    activeKey: "gs",
    en: "GS",
    zh: "Guidance Services",
    descriptionEn:
      "Readonly Guidance Services carrier. Cases and replies are fixtures — no live GS write or service state change.",
    descriptionZh: "Guidance Services 只读承载。案件与回复为夹具；不写真实 GS、不改服务状态。",
    canonicalDomain: "12 GS",
    writeGateLine: "Live GS write blocked",
    writeGateMeta: "No case reply / service status mutation",
    summaries: [
      { label: "Open cases · 未结案件", value: "5", hint: "TEST_ONLY count" },
      { label: "Replies · 回复", value: "8", hint: "preview only" },
      { label: "Service status · 服务状态", value: "Watch", hint: "fixture" },
      { label: "Provider link · 接线状态", value: "Offline", hint: "Not connected" },
    ],
    rows: [
      {
        id: "GS-TEST-CASE-601",
        primary: "Guidance intake · 引导接入",
        secondary: "Service status · preview",
        status: "case_open_fixture",
        asOf: "2026-10-12 10:40",
      },
      {
        id: "GS-TEST-RPL-440",
        primary: "Advisor reply draft · 顾问回复草稿",
        secondary: "Reply blocked · Provider offline",
        status: "reply_preview",
        asOf: "2026-10-12 09:12",
      },
      {
        id: "GS-TEST-SVC-220",
        primary: "Service status watch · 服务状态观察",
        secondary: "Status change disabled",
        status: "status_watch",
        asOf: "2026-10-11 19:30",
      },
    ],
    listTitle: "Guidance snapshot · Guidance 快照（只读）",
    emptyTitle: "Empty state · 空状态",
    emptyBody: "No live GS Provider cases connected. Fixture rows are preview-only.",
    errorTitle: "Error state · 错误状态",
    errorBody: "Provider unavailable · GS source not wired. Reply / status actions disabled.",
    primaryActionLabel: "Send reply · 发送回复 · Provider not connected",
    secondaryActionLabel: "Change status · 改状态 · Not connected",
  },
};

export function getMemberServiceReadonlyModule(
  id: string,
): MemberServiceReadonlyModule | undefined {
  return MEMBER_SERVICE_READONLY_MODULES[id];
}

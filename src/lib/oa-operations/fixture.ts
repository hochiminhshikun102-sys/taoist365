import type {
  OpsExceptionItem,
  OpsProviderReadiness,
  OpsWorkstream,
} from "./types";
import { OPERATIONS_META } from "./types";

/** DEMO workstreams for 03 Operations readonly foundation. */
export const OPERATIONS_WORKSTREAMS: OpsWorkstream[] = [
  {
    id: "03A_member_ops",
    code: "03A",
    title_en: "Member Operations",
    title_zh: "会员运营",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Member profile projection",
      "Saved / favorites relation projection",
      "Membership status projection",
      "Unified benefits ledger entry (read-only)",
    ],
    future_slots: [{ name: "Live membership mutation", status: "not_connected" }],
    account_mappings: [
      {
        label: "Account · Profile",
        route: "/account",
        note: "Consumer-side profile surface — OA reads projection only",
      },
      {
        label: "Account · Saved",
        route: "/account/saved",
        note: "Saved relation reference — no OA write to Account Center",
      },
    ],
    exception_preview: ["membership_status_unknown ×1 (DEMO)", "saved_sync_stale ×0"],
    notes: ["Does not own Account Center writes", "Benefits ledger is projection entry only"],
  },
  {
    id: "03B_points_benefits",
    code: "03B",
    title_en: "Points & Benefits",
    title_zh: "积分与权益",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Wellness Points balance projection",
      "Points ledger projection",
      "Benefits entitlement projection",
    ],
    future_slots: [{ name: "Redemption execute", status: "not_connected" }],
    account_mappings: [
      {
        label: "Account · Rewards / Benefits",
        route: "/account/rewards",
        note: "Consumer rewards view — OA does not grant or redeem",
      },
    ],
    exception_preview: ["points_ledger_gap ×1 (DEMO)", "entitlement_mismatch ×0"],
    notes: ["No real points write", "Redemption remains not_connected"],
  },
  {
    id: "03C_member_services",
    code: "03C",
    title_en: "Member Services",
    title_zh: "会员服务",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Guidance eligibility / usage projection",
      "Healing session projection",
      "Subscriptions status projection",
      "Pending service requests (DEMO queue)",
    ],
    future_slots: [
      { name: "Service fulfill write", status: "not_connected" },
      { name: "Subscription mutate", status: "not_connected" },
    ],
    account_mappings: [
      {
        label: "Account · Guidance",
        route: "/account/guidance",
        note: "Consumer guidance entry — OA coordinates via projection only",
      },
      {
        label: "Frontstage · Healing",
        route: "/healing",
        note: "Frontstage healing halls — reference mapping only",
      },
    ],
    exception_preview: ["service_request_open ×2 (DEMO)", "subscription_past_due ×0"],
    notes: ["Creator content is NOT under 03C — see 03E", "No Guidance/Healing/Subscription writes"],
  },
  {
    id: "03D_member_content",
    code: "03D",
    title_en: "Member Content",
    title_zh: "会员内容",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Journal public-review projection",
      "Source binding projection",
      "Public review queue (DEMO)",
    ],
    future_slots: [{ name: "Private journal staff read", status: "not_connected" }],
    account_mappings: [
      {
        label: "Account · Journal",
        route: "/account/journal",
        note: "Consumer journal — private content is NOT default staff-readable",
      },
    ],
    exception_preview: ["public_review_pending ×1 (DEMO)", "source_binding_missing ×0"],
    notes: [
      "Private member content must not be default-readable by staff",
      "No Journal write from OA Operations",
    ],
  },
  {
    id: "03E_creator",
    code: "03E",
    title_en: "Creator Operations",
    title_zh: "创作者运营",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Creator registry projection",
      "Videos / Live / Replay / Clip inventory projection",
      "Moderation / appeal queue projection",
    ],
    future_slots: [{ name: "Creator revenue settle", status: "not_connected" }],
    account_mappings: [
      {
        label: "Account · Creator Studio",
        route: "/account",
        note: "Creator studio consumer surface — mapped as reference only",
      },
    ],
    exception_preview: ["moderation_open ×1 (DEMO)", "appeal_pending ×0"],
    notes: [
      "Creator is independent from Member Services (03C)",
      "Revenue future slot = not_connected",
    ],
  },
  {
    id: "03F_growth_rewards",
    code: "03F",
    title_en: "Growth & Rewards",
    title_zh: "增长与奖励",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Invite relation projection (single-level only)",
      "Attribution projection",
      "Rewards projection",
      "Campaigns projection",
    ],
    future_slots: [
      { name: "Multi-level reward engine", status: "not_connected" },
      { name: "Reward grant execute", status: "not_connected" },
    ],
    account_mappings: [
      {
        label: "Account · Invite / Rewards",
        route: "/account/rewards",
        note: "Consumer invite/rewards — OA does not grant rewards",
      },
    ],
    exception_preview: ["invite_attribution_gap ×1 (DEMO)", "campaign_cap_watch ×0"],
    notes: [
      `SINGLE_LEVEL_INVITE_ONLY=${String(OPERATIONS_META.single_level_invite_only).toUpperCase()}`,
      `MULTI_LEVEL_REWARD=${String(OPERATIONS_META.multi_level_reward).toUpperCase()}`,
      "Locked to single-level invite; multi-level reward disabled",
    ],
  },
  {
    id: "03G_messaging",
    code: "03G",
    title_en: "Messaging",
    title_zh: "消息触达",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Template catalog projection",
      "Push task projection",
      "Delivery record projection",
    ],
    future_slots: [
      { name: "Failed delivery retry", status: "not_connected" },
      { name: "Live push send", status: "not_connected" },
    ],
    account_mappings: [
      {
        label: "Account · Notifications (consumer)",
        route: "/account",
        note: "Consumer notification inbox reference — OA does not send live messages",
      },
    ],
    exception_preview: ["delivery_failed ×0", "template_stale ×1 (DEMO)"],
    notes: ["No real message send", "Failed delivery future slot = not_connected"],
  },
];

export const OPERATIONS_EXCEPTIONS: OpsExceptionItem[] = [
  {
    id: "ops_ex_001",
    workstream: "03A_member_ops",
    title: "Membership status unknown (DEMO)",
    severity: "watch",
    source: "TEST_ONLY_UI_FIXTURE",
    as_of: "2026-10-13T12:00:00+08:00",
  },
  {
    id: "ops_ex_002",
    workstream: "03B_points_benefits",
    title: "Points ledger gap vs entitlement (DEMO)",
    severity: "watch",
    source: "TEST_ONLY_UI_FIXTURE",
    as_of: "2026-10-13T12:00:00+08:00",
  },
  {
    id: "ops_ex_003",
    workstream: "03C_member_services",
    title: "Open service request awaiting owner (DEMO)",
    severity: "info",
    source: "TEST_ONLY_UI_FIXTURE",
    as_of: "2026-10-13T12:00:00+08:00",
  },
  {
    id: "ops_ex_004",
    workstream: "03E_creator",
    title: "Creator moderation item open (DEMO)",
    severity: "hold",
    source: "TEST_ONLY_UI_FIXTURE",
    as_of: "2026-10-13T12:00:00+08:00",
  },
  {
    id: "ops_ex_005",
    workstream: "03F_growth_rewards",
    title: "Invite attribution gap — single-level only (DEMO)",
    severity: "watch",
    source: "TEST_ONLY_UI_FIXTURE",
    as_of: "2026-10-13T12:00:00+08:00",
  },
];

export const OPERATIONS_PROVIDER_READINESS: OpsProviderReadiness[] = [
  {
    name: "Member / Identity Provider",
    status: "not_connected",
    note: "No live member mutate. DEMO fixture only.",
  },
  {
    name: "Points / Benefits Provider",
    status: "not_connected",
    note: "No grant / redeem. Redemption slot reserved.",
  },
  {
    name: "Services Provider (Guidance / Healing / Subscriptions)",
    status: "not_connected",
    note: "No service fulfill writes this round.",
  },
  {
    name: "Content / Creator Provider",
    status: "not_connected",
    note: "No journal or creator writes. Private content gated.",
  },
  {
    name: "Growth / Invite / Messaging Provider",
    status: "not_connected",
    note: "Single-level invite lock. No live push send.",
  },
];

export function getOperationsWorkbenchData() {
  return {
    meta: OPERATIONS_META,
    workstreams: OPERATIONS_WORKSTREAMS,
    exceptions: OPERATIONS_EXCEPTIONS,
    providers: OPERATIONS_PROVIDER_READINESS,
  };
}

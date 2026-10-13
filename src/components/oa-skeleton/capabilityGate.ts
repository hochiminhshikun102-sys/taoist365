/**
 * Wave 0 Structure Gate — honest capability states.
 * UI gate is not server authorization.
 */
export type OaCapabilityStatus = "not_connected" | "read_only" | "skeleton" | "available";

export type OaCapabilityRecord = {
  id: string;
  route: string;
  labelEn: string;
  labelZh: string;
  status: OaCapabilityStatus;
  noteEn: string;
  noteZh: string;
};

export const CAPABILITY_STATUS_LABEL: Record<OaCapabilityStatus, { en: string; zh: string }> = {
  not_connected: { en: "Not connected", zh: "未接通" },
  read_only: { en: "Read only", zh: "只读" },
  skeleton: { en: "Skeleton", zh: "骨架" },
  available: { en: "Available", zh: "可用" },
};

/** Primary module capability (landing pages). */
export const PRIMARY_CAPABILITY: Record<string, OaCapabilityStatus> = {
  overview: "read_only",
  commerce: "read_only",
  operations: "not_connected",
  "ai-ops": "not_connected",
  site: "not_connected",
  geo: "not_connected",
  "cs-center": "read_only",
  finance: "read_only",
  logistics: "read_only",
  "supply-chain": "read_only",
  wk: "not_connected",
  gs: "not_connected",
  compliance: "read_only",
  settings: "not_connected",
};

/** CO secondary workbench capability. */
export const CO_SECONDARY_CAPABILITY: Record<string, OaCapabilityRecord> = {
  intake: {
    id: "intake",
    route: "/admin/oa/co/intake",
    labelEn: "Product Intake",
    labelZh: "宝贝入库",
    status: "available",
    noteEn: "Existing intake / publish / review kept. IA rebuild deferred.",
    noteZh: "保留现有入库/发布/审核成果；IA 大重构暂缓。",
  },
  objects: {
    id: "objects",
    route: "/admin/oa/co/objects",
    labelEn: "Objects Runtime",
    labelZh: "商品系统",
    status: "read_only",
    noteEn: "R47 read-only product ledger skeleton. DEMO fixture. Live Provider not_connected. No publish writes.",
    noteZh: "R47 只读商品台账骨架（DEMO）。真实 Provider 未接通。无发布写入。",
  },
  media: {
    id: "media",
    route: "/admin/oa/co/media",
    labelEn: "Product Media",
    labelZh: "商品素材",
    status: "read_only",
    noteEn: "R47 read-only media ledger skeleton. DEMO fixture. Live Provider not_connected. No upload/delete.",
    noteZh: "R47 只读素材台账骨架（DEMO）。真实 Provider 未接通。无上传/删除。",
  },
  orders: {
    id: "orders",
    route: "/admin/oa/co/orders",
    labelEn: "Orders Runtime",
    labelZh: "订单系统",
    status: "read_only",
    noteEn: "Wave 1B Orders Core restored with DEMO fixture. Live Provider not_connected. No real writes.",
    noteZh: "Wave 1B 订单核心已恢复（DEMO 夹具）。真实 Provider 未接通。无真实写入。",
  },
  payments: {
    id: "payments",
    route: "/admin/oa/co/payments",
    labelEn: "Payments Runtime",
    labelZh: "支付管理",
    status: "read_only",
    noteEn: "Wave 1C Payments skeleton with DEMO fixture. Live Provider not_connected. No payment writes.",
    noteZh: "Wave 1C 支付骨架（DEMO）。真实 Provider 未接通。无支付写入。",
  },
  shipping: {
    id: "shipping",
    route: "/admin/oa/co/shipping",
    labelEn: "Shipping Runtime",
    labelZh: "发货管理",
    status: "read_only",
    noteEn: "Wave 1C Shipping skeleton with DEMO fixture. Live Provider not_connected. No fulfillment writes.",
    noteZh: "Wave 1C 发货骨架（DEMO）。真实 Provider 未接通。无履约写入。",
  },
};

export function capabilityLabel(status: OaCapabilityStatus): string {
  const row = CAPABILITY_STATUS_LABEL[status];
  return `${row.en} · ${row.zh}`;
}

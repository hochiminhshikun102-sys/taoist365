/** R67 Overview Readiness Control Board — UI fixture only. Not a live Provider. */

export type OaReadinessStatus =
  | "read_only"
  | "not_connected"
  | "provider_pending"
  | "blocked"
  | "ready_for_review";

export type OaReadinessRow = {
  id: string;
  key: string;
  labelEn: string;
  labelZh: string;
  route: string;
  status: OaReadinessStatus;
  ownerEn: string;
  ownerZh: string;
  realWrite: false;
  providerConnected: false;
  deployEnabled: false;
  nextEn: string;
  nextZh: string;
};

export const OA_R67_GLOBAL_FLAGS = [
  "OA readonly foundation",
  "Provider not connected",
  "Production deploy disabled",
  "Real business write disabled",
] as const;

export const OA_R67_RISKS = [
  {
    en: "Product Publish R3 is owned by Digua04. This ticket does not enter intake or publish content.",
    zh: "商品发布 R3 由地瓜04执行，本单不进入入库或发布内容层。",
  },
  {
    en: "Account Center is not in scope.",
    zh: "不改 Account Center。",
  },
  {
    en: "Frontstage is not in scope.",
    zh: "不改 Frontstage。",
  },
  {
    en: "Cloudflare / env / binding stays untouched.",
    zh: "不改 Cloudflare / env / binding。",
  },
  {
    en: "Real business writes stay disabled.",
    zh: "真实业务写入禁用。",
  },
] as const;

export const OA_R67_READINESS_ROWS: OaReadinessRow[] = [
  {
    id: "01",
    key: "overview",
    labelEn: "Overview",
    labelZh: "全局看板",
    route: "/admin/oa/overview",
    status: "ready_for_review",
    ownerEn: "Dogdan · OA Overview (readonly)",
    ownerZh: "狗蛋 · OA 总览（只读）",
    realWrite: false,
    providerConnected: false,
    deployEnabled: false,
    nextEn: "Controller review of R67 board. Keep exception projection readonly.",
    nextZh: "交总控复核 R67 看板；异常投影保持只读。",
  },
  {
    id: "02",
    key: "co",
    labelEn: "CO",
    labelZh: "商品与订单",
    route: "/admin/oa/commerce",
    status: "read_only",
    ownerEn: "OA CO hub: Dogdan. Product Publish R3 content: Digua04",
    ownerZh: "OA CO 门户：狗蛋。商品发布 R3 内容：地瓜04",
    realWrite: false,
    providerConnected: false,
    deployEnabled: false,
    nextEn: "04 continues intake content. Dogdan does not touch /admin/oa/co/intake.",
    nextZh: "04 继续入库内容接入。狗蛋不碰 /admin/oa/co/intake。",
  },
  {
    id: "03",
    key: "operations",
    labelEn: "Operations",
    labelZh: "运营营销",
    route: "/admin/oa/operations",
    status: "read_only",
    ownerEn: "Dogdan · OA Operations (readonly)",
    ownerZh: "狗蛋 · OA 运营营销（只读）",
    realWrite: false,
    providerConnected: false,
    deployEnabled: false,
    nextEn: "Keep 03A–03G projection. No live campaign writes.",
    nextZh: "维持 03A–03G 投影。不做真实投放写入。",
  },
  {
    id: "04",
    key: "ai_ops",
    labelEn: "AI Ops",
    labelZh: "AI 推广中心",
    route: "/admin/oa/ai-ops",
    status: "read_only",
    ownerEn: "Dogdan · OA AI Ops (readonly)",
    ownerZh: "狗蛋 · OA AI 推广（只读）",
    realWrite: false,
    providerConnected: false,
    deployEnabled: false,
    nextEn: "Keep A1–A8 readonly. Model provider stays not_connected.",
    nextZh: "维持 A1–A8 只读。模型 Provider 保持未接通。",
  },
  {
    id: "05",
    key: "site",
    labelEn: "Site",
    labelZh: "站点前台",
    route: "/admin/oa/site",
    status: "read_only",
    ownerEn: "Dogdan · OA Site (readonly). Frontstage out of scope",
    ownerZh: "狗蛋 · OA 站点（只读）。Frontstage 不在范围",
    realWrite: false,
    providerConnected: false,
    deployEnabled: false,
    nextEn: "Keep S1–S7 registry. Do not edit Frontstage.",
    nextZh: "维持 S1–S7 登记。不改 Frontstage。",
  },
  {
    id: "06",
    key: "geo",
    labelEn: "GEO",
    labelZh: "区域全局配置",
    route: "/admin/oa/geo",
    status: "read_only",
    ownerEn: "Dogdan · OA GEO (readonly)",
    ownerZh: "狗蛋 · OA GEO（只读）",
    realWrite: false,
    providerConnected: false,
    deployEnabled: false,
    nextEn: "Keep G1–G7 projection. No market writes.",
    nextZh: "维持 G1–G7 投影。无市场写入。",
  },
  {
    id: "07",
    key: "cs_center",
    labelEn: "CS Center",
    labelZh: "客户满意中心",
    route: "/admin/oa/cs-center",
    status: "read_only",
    ownerEn: "Dogdan · OA CS Center (readonly)",
    ownerZh: "狗蛋 · OA 客服中心（只读）",
    realWrite: false,
    providerConnected: false,
    deployEnabled: false,
    nextEn: "Keep CS projection. No ticket mutations.",
    nextZh: "维持客服投影。不改工单。",
  },
  {
    id: "08",
    key: "finance",
    labelEn: "Finance",
    labelZh: "财务中心",
    route: "/admin/oa/finance",
    status: "read_only",
    ownerEn: "Dogdan · OA Finance (readonly)",
    ownerZh: "狗蛋 · OA 财务（只读）",
    realWrite: false,
    providerConnected: false,
    deployEnabled: false,
    nextEn: "Keep finance projection. No payment writes.",
    nextZh: "维持财务投影。无支付写入。",
  },
  {
    id: "09",
    key: "logistics",
    labelEn: "Logistics",
    labelZh: "物流管理",
    route: "/admin/oa/logistics",
    status: "read_only",
    ownerEn: "Dogdan · OA Logistics (readonly)",
    ownerZh: "狗蛋 · OA 物流（只读）",
    realWrite: false,
    providerConnected: false,
    deployEnabled: false,
    nextEn: "Keep logistics projection. No fulfillment writes.",
    nextZh: "维持物流投影。无履约写入。",
  },
  {
    id: "10",
    key: "supply_chain",
    labelEn: "Supply Chain",
    labelZh: "供应链管理",
    route: "/admin/oa/supply-chain",
    status: "read_only",
    ownerEn: "Dogdan · OA Supply Chain (readonly)",
    ownerZh: "狗蛋 · OA 供应链（只读）",
    realWrite: false,
    providerConnected: false,
    deployEnabled: false,
    nextEn: "Keep supply projection. No inventory writes.",
    nextZh: "维持供应链投影。无库存写入。",
  },
  {
    id: "11",
    key: "wk",
    labelEn: "WK",
    labelZh: "WindKeep",
    route: "/admin/oa/wk",
    status: "not_connected",
    ownerEn: "Dogdan · OA WK entry only",
    ownerZh: "狗蛋 · OA WK 入口仅占位",
    realWrite: false,
    providerConnected: false,
    deployEnabled: false,
    nextEn: "Stay not_connected. Do not fake a live WindKeep provider.",
    nextZh: "保持未接通。不得假装 WindKeep 已可用。",
  },
  {
    id: "12",
    key: "gs",
    labelEn: "GS",
    labelZh: "全球买手",
    route: "/admin/oa/gs",
    status: "not_connected",
    ownerEn: "Dogdan · OA GS entry only",
    ownerZh: "狗蛋 · OA GS 入口仅占位",
    realWrite: false,
    providerConnected: false,
    deployEnabled: false,
    nextEn: "Stay not_connected. Review-required publish is out of this ticket.",
    nextZh: "保持未接通。需审核发布不在本单。",
  },
  {
    id: "13",
    key: "compliance",
    labelEn: "Compliance",
    labelZh: "合规法务",
    route: "/admin/oa/compliance",
    status: "read_only",
    ownerEn: "Dogdan · OA Compliance (readonly)",
    ownerZh: "狗蛋 · OA 合规（只读）",
    realWrite: false,
    providerConnected: false,
    deployEnabled: false,
    nextEn: "Keep risk projection. No legal-record writes.",
    nextZh: "维持风险投影。无法务档案写入。",
  },
  {
    id: "14",
    key: "settings",
    labelEn: "Settings",
    labelZh: "系统底座",
    route: "/admin/oa/settings",
    status: "not_connected",
    ownerEn: "Dogdan · OA Settings entry. Account Center out of scope",
    ownerZh: "狗蛋 · OA 系统底座入口。Account Center 不在范围",
    realWrite: false,
    providerConnected: false,
    deployEnabled: false,
    nextEn: "Stay not_connected. Do not edit Account Center or env/bindings.",
    nextZh: "保持未接通。不改 Account Center 或 env/binding。",
  },
];

export const OA_R67_MODULE_COUNT = OA_R67_READINESS_ROWS.length;

import { CO_SECONDARY_CAPABILITY, type OaCapabilityStatus } from "@/components/oa-skeleton/capabilityGate";

export const CO_OVERVIEW_META = {
  data_source: "TEST_ONLY_UI_FIXTURE",
  capability: "read_only" as const,
  live_provider: "not_connected" as const,
  real_write: false,
} as const;

export type CoWorkbenchCard = {
  id: string;
  route: string;
  labelEn: string;
  labelZh: string;
  status: OaCapabilityStatus;
  metricEn: string;
  metricZh: string;
  metricValue: string;
  alertEn: string;
  alertZh: string;
};

/** Six fixed CO workbenches — labels locked by R47 task. */
export const CO_WORKBENCH_CARDS: CoWorkbenchCard[] = [
  {
    id: "intake",
    route: "/admin/oa/co/intake",
    labelEn: "Product Intake",
    labelZh: "宝贝入库",
    status: CO_SECONDARY_CAPABILITY.intake.status,
    metricEn: "Legacy intake links kept",
    metricZh: "保留现成果链接",
    metricValue: "3 links",
    alertEn: "IA rebuild deferred",
    alertZh: "不做 IA 大重构",
  },
  {
    id: "objects",
    route: "/admin/oa/co/objects",
    labelEn: "Objects Runtime",
    labelZh: "商品系统",
    status: "read_only",
    metricEn: "DEMO objects in ledger",
    metricZh: "DEMO 商品台账",
    metricValue: "5",
    alertEn: "2 media gaps · 1 risk hold",
    alertZh: "2 素材缺口 · 1 风险挂起",
  },
  {
    id: "media",
    route: "/admin/oa/co/media",
    labelEn: "Product Media",
    labelZh: "商品素材",
    status: "read_only",
    metricEn: "DEMO media rows",
    metricZh: "DEMO 素材行",
    metricValue: "6",
    alertEn: "AI hold + orphaned bundle",
    alertZh: "AI 挂起 + 孤儿素材包",
  },
  {
    id: "orders",
    route: "/admin/oa/co/orders",
    labelEn: "Orders Runtime",
    labelZh: "订单系统",
    status: CO_SECONDARY_CAPABILITY.orders.status,
    metricEn: "R43 DEMO orders preserved",
    metricZh: "保留 R43 DEMO 订单",
    metricValue: "read_only",
    alertEn: "Live Provider not_connected",
    alertZh: "真实 Provider 未接通",
  },
  {
    id: "payments",
    route: "/admin/oa/co/payments",
    labelEn: "Payments Runtime",
    labelZh: "支付管理",
    status: CO_SECONDARY_CAPABILITY.payments.status,
    metricEn: "R44 payments skeleton preserved",
    metricZh: "保留 R44 支付骨架",
    metricValue: "read_only",
    alertEn: "Capture / refund blocked",
    alertZh: "扣款/退款已阻断",
  },
  {
    id: "shipping",
    route: "/admin/oa/co/shipping",
    labelEn: "Shipping Runtime",
    labelZh: "发货管理",
    status: CO_SECONDARY_CAPABILITY.shipping.status,
    metricEn: "R44 shipping skeleton preserved",
    metricZh: "保留 R44 发货骨架",
    metricValue: "read_only",
    alertEn: "Fulfillment write blocked",
    alertZh: "履约写入已阻断",
  },
];

export const CO_OVERVIEW_KPIS = [
  { labelEn: "Open order projection", labelZh: "未完结订单投影", value: "18", hint: "TEST_ONLY" },
  { labelEn: "Objects on sale", labelZh: "在售商品", value: "1", hint: "DEMO" },
  { labelEn: "Media awaiting rights", labelZh: "待权属素材", value: "3", hint: "DEMO" },
  { labelEn: "Provider link", labelZh: "接线状态", value: "Offline", hint: "not_connected" },
] as const;

export const CO_OVERVIEW_ALERTS = [
  {
    id: "ALERT-DEMO-01",
    severity: "watch",
    en: "Objects: SKU-DEMO-INC-B pending_review with partial media",
    zh: "商品：SKU-DEMO-INC-B 待审且素材不全",
  },
  {
    id: "ALERT-DEMO-02",
    severity: "hold",
    en: "Media: AI derivative rejected — not approved_public_asset",
    zh: "素材：AI 衍生已拒 — 非 approved_public_asset",
  },
  {
    id: "ALERT-DEMO-03",
    severity: "info",
    en: "Intake IA rebuild still deferred; legacy links only",
    zh: "宝贝入库仍只保留现成果链接，IA 大重构暂缓",
  },
] as const;

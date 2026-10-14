/** R83 — Provider Connection Center fixture. Status only; no live wiring. */

export const PROVIDER_STATUS_CHIPS = [
  "not_connected",
  "read_only",
  "requires_authorization",
  "real_write_false",
] as const;

export type ProviderStatusChip = (typeof PROVIDER_STATUS_CHIPS)[number];

export type ProviderModuleId =
  | "commerce"
  | "cs"
  | "finance"
  | "logistics"
  | "supply_chain"
  | "wk"
  | "gs"
  | "compliance"
  | "site_geo"
  | "ai_ops";

export type ProviderModuleRow = {
  id: ProviderModuleId;
  zh: string;
  en: string;
  href: string;
  chips: readonly ProviderStatusChip[];
};

export const PROVIDER_CONNECTION_META = {
  data_source: "TEST_ONLY_UI_FIXTURE",
  mode: "READONLY_STATUS",
  provider_wiring: "none",
  real_business_write: false,
} as const;

export const PROVIDER_CONNECTION_MODULES: readonly ProviderModuleRow[] = [
  {
    id: "commerce",
    zh: "商品与订单",
    en: "Commerce",
    href: "/admin/oa/commerce",
    chips: PROVIDER_STATUS_CHIPS,
  },
  {
    id: "cs",
    zh: "客户满意中心",
    en: "CS",
    href: "/admin/oa/cs-center",
    chips: PROVIDER_STATUS_CHIPS,
  },
  {
    id: "finance",
    zh: "财务中心",
    en: "Finance",
    href: "/admin/oa/finance",
    chips: PROVIDER_STATUS_CHIPS,
  },
  {
    id: "logistics",
    zh: "物流管理",
    en: "Logistics",
    href: "/admin/oa/logistics",
    chips: PROVIDER_STATUS_CHIPS,
  },
  {
    id: "supply_chain",
    zh: "供应链管理",
    en: "Supply Chain",
    href: "/admin/oa/supply-chain",
    chips: PROVIDER_STATUS_CHIPS,
  },
  {
    id: "wk",
    zh: "WindKeep",
    en: "WK",
    href: "/admin/oa/wk",
    chips: PROVIDER_STATUS_CHIPS,
  },
  {
    id: "gs",
    zh: "全球买手",
    en: "GS",
    href: "/admin/oa/gs",
    chips: PROVIDER_STATUS_CHIPS,
  },
  {
    id: "compliance",
    zh: "合规法务",
    en: "Compliance",
    href: "/admin/oa/compliance",
    chips: PROVIDER_STATUS_CHIPS,
  },
  {
    id: "site_geo",
    zh: "站点 / 区域配置",
    en: "Site / GEO",
    href: "/admin/oa/geo",
    chips: PROVIDER_STATUS_CHIPS,
  },
  {
    id: "ai_ops",
    zh: "AI 推广中心",
    en: "AI Ops",
    href: "/admin/oa/ai-ops",
    chips: PROVIDER_STATUS_CHIPS,
  },
] as const;

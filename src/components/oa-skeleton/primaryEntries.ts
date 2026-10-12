export type OaPrimaryEntry = {
  slug: string;
  path: string;
  en: string;
  zh: string;
  descriptionEn: string;
  descriptionZh: string;
  /** Existing rail key in oaNavCanonical NAV_ITEMS (14-item contract). */
  activeKey: string;
  canonicalDomain: string;
};

/** Canonical 14 primary entry landings. Does not replace NAV_ITEMS. */
export const OA_PRIMARY_ENTRIES: OaPrimaryEntry[] = [
  {
    slug: "overview",
    path: "/admin/oa/overview",
    en: "Overview",
    zh: "总览",
    descriptionEn: "Operations overview board landing. Live metrics remain fixture-only until Provider wiring.",
    descriptionZh: "经营总览看板入口。真实指标待 Provider 接线前仅使用夹具。",
    activeKey: "overview",
    canonicalDomain: "01 Overview",
  },
  {
    slug: "commerce",
    path: "/admin/oa/commerce",
    en: "CO",
    zh: "商业订单",
    descriptionEn: "Commerce and order primary entry. Skeleton only — no live order tables.",
    descriptionZh: "商业与订单一级入口。仅骨架，不含真实订单表。",
    activeKey: "products_orders",
    canonicalDomain: "02 CO",
  },
  {
    slug: "operations",
    path: "/admin/oa/operations",
    en: "Operations",
    zh: "运营",
    descriptionEn: "Member and operations primary entry. Read-only skeleton, no live member data.",
    descriptionZh: "会员与运营一级入口。只读骨架，无真实会员数据。",
    activeKey: "users_members",
    canonicalDomain: "03 Operations",
  },
  {
    slug: "ai-ops",
    path: "/admin/oa/ai-ops",
    en: "AI Ops",
    zh: "AI 运营",
    descriptionEn: "AI operations primary entry. No model calls or write actions in this round.",
    descriptionZh: "AI 运营一级入口。本轮无模型调用、无写操作。",
    activeKey: "marketing",
    canonicalDomain: "04 AI Ops",
  },
  {
    slug: "site",
    path: "/admin/oa/site",
    en: "Site",
    zh: "站点",
    descriptionEn: "Site content and SEO primary entry. Descriptive skeleton only.",
    descriptionZh: "站点内容与 SEO 一级入口。仅描述性骨架。",
    activeKey: "content_assets",
    canonicalDomain: "05 Site",
  },
  {
    slug: "geo",
    path: "/admin/oa/geo",
    en: "GEO",
    zh: "GEO",
    descriptionEn: "GEO configuration primary entry. No region mutation in this skeleton.",
    descriptionZh: "GEO 配置一级入口。本骨架不做区域变更。",
    activeKey: "seo_geo",
    canonicalDomain: "06 GEO",
  },
  {
    slug: "cs-center",
    path: "/admin/oa/cs-center",
    en: "CS Center",
    zh: "客服中心",
    descriptionEn: "Customer support primary entry. No live case queue.",
    descriptionZh: "客服中心一级入口。无真实案件队列。",
    activeKey: "after_sales",
    canonicalDomain: "07 CS Center",
  },
  {
    slug: "finance",
    path: "/admin/oa/finance",
    en: "Finance",
    zh: "财务",
    descriptionEn: "Finance and settlement primary entry. No live ledger or payouts.",
    descriptionZh: "财务与结算一级入口。无真实账本或打款。",
    activeKey: "finance",
    canonicalDomain: "08 Finance",
  },
  {
    slug: "logistics",
    path: "/admin/oa/logistics",
    en: "Logistics",
    zh: "物流",
    descriptionEn: "Logistics and fulfillment primary entry. No live shipment data.",
    descriptionZh: "物流与履约一级入口。无真实运单数据。",
    activeKey: "logistics",
    canonicalDomain: "09 Logistics",
  },
  {
    slug: "supply-chain",
    path: "/admin/oa/supply-chain",
    en: "Supply Chain",
    zh: "供应链",
    descriptionEn: "Supply chain primary entry. Warehouse data remains disconnected.",
    descriptionZh: "供应链一级入口。仓储数据尚未接通。",
    activeKey: "logistics",
    canonicalDomain: "10 Supply Chain",
  },
  {
    slug: "wk",
    path: "/admin/oa/wk",
    en: "WK",
    zh: "WindKeep",
    descriptionEn: "WindKeep primary entry. No live WK runtime wiring.",
    descriptionZh: "WindKeep 一级入口。无正式 WK Runtime 接线。",
    activeKey: "windkeep",
    canonicalDomain: "11 WK",
  },
  {
    slug: "gs",
    path: "/admin/oa/gs",
    en: "GS",
    zh: "Guidance Services",
    descriptionEn: "Guidance Services / Wind Seeker primary entry. Skeleton only.",
    descriptionZh: "Guidance Services / Wind Seeker 一级入口。仅骨架。",
    activeKey: "wind_seeker",
    canonicalDomain: "12 GS",
  },
  {
    slug: "compliance",
    path: "/admin/oa/compliance",
    en: "Compliance",
    zh: "合规",
    descriptionEn: "Compliance and risk primary entry. No enforcement actions.",
    descriptionZh: "合规与风控一级入口。无执法或处置动作。",
    activeKey: "risk_control",
    canonicalDomain: "13 Compliance",
  },
  {
    slug: "settings",
    path: "/admin/oa/settings",
    en: "Settings",
    zh: "设置",
    descriptionEn: "System settings primary entry. Configuration writes disabled.",
    descriptionZh: "系统设置一级入口。配置写入已禁用。",
    activeKey: "system_settings",
    canonicalDomain: "14 Settings",
  },
];

export function getPrimaryEntry(slug: string): OaPrimaryEntry | undefined {
  return OA_PRIMARY_ENTRIES.find((e) => e.slug === slug);
}

/** Rail key → primary entry path for shell navigation (preserves 14 NAV_ITEMS). */
export const NAV_KEY_TO_PRIMARY_PATH: Record<string, string> = {
  overview: "/admin/oa/overview",
  products_orders: "/admin/oa/commerce",
  content_assets: "/admin/oa/site",
  users_members: "/admin/oa/operations",
  wind_seeker: "/admin/oa/gs",
  windkeep: "/admin/oa/wk",
  journal: "/admin/oa/operations",
  marketing: "/admin/oa/ai-ops",
  seo_geo: "/admin/oa/geo",
  logistics: "/admin/oa/logistics",
  after_sales: "/admin/oa/cs-center",
  finance: "/admin/oa/finance",
  risk_control: "/admin/oa/compliance",
  system_settings: "/admin/oa/settings",
};

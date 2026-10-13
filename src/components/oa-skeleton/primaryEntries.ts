export type OaPrimaryEntry = {
  slug: string;
  path: string;
  en: string;
  zh: string;
  descriptionEn: string;
  descriptionZh: string;
  /** Rail key in oaNavCanonical NAV_ITEMS (approved 14). */
  activeKey: string;
  canonicalDomain: string;
};

/** Canonical 14 primary entry landings. */
export const OA_PRIMARY_ENTRIES: OaPrimaryEntry[] = [
  {
    slug: "overview",
    path: "/admin/oa/overview",
    en: "Overview",
    zh: "全局总览",
    descriptionEn: "Overview exception projection + navigation. R52 consumer B. Not a second ledger.",
    descriptionZh: "总览异常投影与导航。R52 Consumer B。不成为第二业务账本。",
    activeKey: "overview",
    canonicalDomain: "01 Overview",
  },
  {
    slug: "commerce",
    path: "/admin/oa/commerce",
    en: "CO",
    zh: "商品与订单",
    descriptionEn: "CO hub with six workbenches. R47 read-only operations overview.",
    descriptionZh: "CO 门户，含六个工作台。R47 只读运营总入口。",
    activeKey: "co",
    canonicalDomain: "02 CO",
  },
  {
    slug: "operations",
    path: "/admin/oa/operations",
    en: "Operations",
    zh: "运营营销",
    descriptionEn: "Operations readonly foundation with 7 internal workstreams. R54. Provider not_connected.",
    descriptionZh: "运营只读地基，含 7 条内部施工线。R54。Provider 未接通。",
    activeKey: "operations",
    canonicalDomain: "03 Operations",
  },
  {
    slug: "ai-ops",
    path: "/admin/oa/ai-ops",
    en: "AI Operations",
    zh: "AI 推广中心",
    descriptionEn: "AI Operations readonly foundation. Suggestion-only. Model calls disabled. R56.",
    descriptionZh: "AI 运营只读地基。仅建议。禁止模型调用。R56。",
    activeKey: "ai_ops",
    canonicalDomain: "04 AI Operations",
  },
  {
    slug: "site",
    path: "/admin/oa/site",
    en: "Site",
    zh: "站点前台",
    descriptionEn: "Site primary entry. Visual editor deferred.",
    descriptionZh: "站点前台一级入口。可视化编辑后置。",
    activeKey: "site",
    canonicalDomain: "05 Site",
  },
  {
    slug: "geo",
    path: "/admin/oa/geo",
    en: "GEO",
    zh: "区域全局配置",
    descriptionEn: "GEO primary entry. No region mutation in this gate.",
    descriptionZh: "GEO 一级入口。本结构门不做区域变更。",
    activeKey: "geo",
    canonicalDomain: "06 GEO",
  },
  {
    slug: "cs-center",
    path: "/admin/oa/cs-center",
    en: "CS Center",
    zh: "客户满意中心",
    descriptionEn: "CS Center readonly projection from CO Orders/Payments/Shipping. R52 consumer B.",
    descriptionZh: "客服只读投影，消费 CO 订单/支付/发货。R52 Consumer B。",
    activeKey: "cs_center",
    canonicalDomain: "07 CS Center",
  },
  {
    slug: "finance",
    path: "/admin/oa/finance",
    en: "Finance",
    zh: "财务中心",
    descriptionEn: "Finance readonly projection from CO Orders/Payments. R50 consumer A.",
    descriptionZh: "财务只读投影，消费 CO 订单/支付。R50 Consumer A。",
    activeKey: "finance",
    canonicalDomain: "08 Finance",
  },
  {
    slug: "logistics",
    path: "/admin/oa/logistics",
    en: "Logistics",
    zh: "物流管理",
    descriptionEn: "Logistics readonly projection from CO Orders/Shipping. R50 consumer A.",
    descriptionZh: "物流只读投影，消费 CO 订单/发货。R50 Consumer A。",
    activeKey: "logistics",
    canonicalDomain: "09 Logistics",
  },
  {
    slug: "supply-chain",
    path: "/admin/oa/supply-chain",
    en: "Supply Chain",
    zh: "供应链管理",
    descriptionEn: "Supply Chain readonly projection from Objects/Orders/Shipping. R50 consumer A.",
    descriptionZh: "供应链只读投影，消费商品/订单/发货。R50 Consumer A。",
    activeKey: "supply_chain",
    canonicalDomain: "10 Supply Chain",
  },
  {
    slug: "wk",
    path: "/admin/oa/wk",
    en: "WK",
    zh: "WindKeep",
    descriptionEn: "WindKeep primary entry. Not mixed with commerce refund.",
    descriptionZh: "WindKeep 一级入口。不与商用退款混账。",
    activeKey: "wk",
    canonicalDomain: "11 WK",
  },
  {
    slug: "gs",
    path: "/admin/oa/gs",
    en: "GS",
    zh: "全球买手",
    descriptionEn: "WindSeeker / GS primary entry. Review-required publish.",
    descriptionZh: "全球买手一级入口。发布需审核。",
    activeKey: "gs",
    canonicalDomain: "12 GS",
  },
  {
    slug: "compliance",
    path: "/admin/oa/compliance",
    en: "Compliance",
    zh: "合规法务",
    descriptionEn: "Compliance readonly risk projection from CO Orders/Finance/Logistics. R52 consumer B.",
    descriptionZh: "合规只读风险投影，消费 CO 订单/财务/物流。R52 Consumer B。",
    activeKey: "compliance",
    canonicalDomain: "13 Compliance",
  },
  {
    slug: "settings",
    path: "/admin/oa/settings",
    en: "Settings",
    zh: "系统底座",
    descriptionEn: "Settings primary entry. Not a business-page substitute.",
    descriptionZh: "系统底座一级入口。不替代业务页。",
    activeKey: "settings",
    canonicalDomain: "14 Settings",
  },
];

export function getPrimaryEntry(slug: string): OaPrimaryEntry | undefined {
  return OA_PRIMARY_ENTRIES.find((e) => e.slug === slug);
}

/** Rail key → primary entry path (approved 14). */
export const NAV_KEY_TO_PRIMARY_PATH: Record<string, string> = {
  overview: "/admin/oa/overview",
  co: "/admin/oa/commerce",
  operations: "/admin/oa/operations",
  ai_ops: "/admin/oa/ai-ops",
  site: "/admin/oa/site",
  geo: "/admin/oa/geo",
  cs_center: "/admin/oa/cs-center",
  finance: "/admin/oa/finance",
  logistics: "/admin/oa/logistics",
  supply_chain: "/admin/oa/supply-chain",
  wk: "/admin/oa/wk",
  gs: "/admin/oa/gs",
  compliance: "/admin/oa/compliance",
  settings: "/admin/oa/settings",
};

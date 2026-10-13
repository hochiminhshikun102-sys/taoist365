export type OaNavItem = {
  id: string;
  key: string;
  en: string;
  zh: string;
  canonical: string;
  canonical_domain_id: string;
  owner_domain: string;
  has_submenu: boolean;
};

export type OaSubmenuItem = {
  label: string;
  route: string;
  owner: string;
};

/**
 * Wave 0 Structure Gate — approved 14 primary modules.
 * Labels follow OA_APPROVED_VISUAL_STRUCTURE_REGISTER_R1.
 * Interim rail labels (Content & Assets / Users & Members / …) are not authority.
 */
export const NAV_ITEMS: OaNavItem[] = [
  {
    id: "01",
    key: "overview",
    en: "Overview",
    zh: "全局总览",
    canonical: "01 Overview",
    canonical_domain_id: "01",
    owner_domain: "01 Overview",
    has_submenu: false,
  },
  {
    id: "02",
    key: "co",
    en: "CO · Products & Orders",
    zh: "商品与订单",
    canonical: "02 CO",
    canonical_domain_id: "02",
    owner_domain: "02 CO",
    has_submenu: true,
  },
  {
    id: "03",
    key: "operations",
    en: "Operations",
    zh: "运营营销",
    canonical: "03 Operations",
    canonical_domain_id: "03",
    owner_domain: "03 Operations",
    has_submenu: false,
  },
  {
    id: "04",
    key: "ai_ops",
    en: "AI Operations",
    zh: "AI 推广中心",
    canonical: "04 AI Operations",
    canonical_domain_id: "04",
    owner_domain: "04 AI Operations",
    has_submenu: false,
  },
  {
    id: "05",
    key: "site",
    en: "Site",
    zh: "站点前台",
    canonical: "05 Site",
    canonical_domain_id: "05",
    owner_domain: "05 Site",
    has_submenu: false,
  },
  {
    id: "06",
    key: "geo",
    en: "GEO",
    zh: "区域全局配置",
    canonical: "06 GEO",
    canonical_domain_id: "06",
    owner_domain: "06 GEO",
    has_submenu: false,
  },
  {
    id: "07",
    key: "cs_center",
    en: "CS Center",
    zh: "客户满意中心",
    canonical: "07 CS Center",
    canonical_domain_id: "07",
    owner_domain: "07 CS Center",
    has_submenu: false,
  },
  {
    id: "08",
    key: "finance",
    en: "Finance",
    zh: "财务中心",
    canonical: "08 Finance",
    canonical_domain_id: "08",
    owner_domain: "08 Finance",
    has_submenu: false,
  },
  {
    id: "09",
    key: "logistics",
    en: "Logistics",
    zh: "物流管理",
    canonical: "09 Logistics",
    canonical_domain_id: "09",
    owner_domain: "09 Logistics",
    has_submenu: false,
  },
  {
    id: "10",
    key: "supply_chain",
    en: "Supply Chain",
    zh: "供应链管理",
    canonical: "10 Supply Chain",
    canonical_domain_id: "10",
    owner_domain: "10 Supply Chain",
    has_submenu: false,
  },
  {
    id: "11",
    key: "wk",
    en: "WK · WindKeep",
    zh: "WindKeep",
    canonical: "11 WK",
    canonical_domain_id: "11",
    owner_domain: "11 WK",
    has_submenu: false,
  },
  {
    id: "12",
    key: "gs",
    en: "GS · WindSeeker",
    zh: "全球买手",
    canonical: "12 GS",
    canonical_domain_id: "12",
    owner_domain: "12 GS",
    has_submenu: false,
  },
  {
    id: "13",
    key: "compliance",
    en: "Compliance",
    zh: "合规法务",
    canonical: "13 Compliance",
    canonical_domain_id: "13",
    owner_domain: "13 Compliance",
    has_submenu: false,
  },
  {
    id: "14",
    key: "settings",
    en: "Settings",
    zh: "系统底座",
    canonical: "14 Settings",
    canonical_domain_id: "14",
    owner_domain: "14 Settings",
    has_submenu: false,
  },
];

/** Approved CO six secondary workbenches — Additive-only; do not delete/rename/merge. */
export const CO_SECONDARY_SUBMENU: OaSubmenuItem[] = [
  {
    label: "Product Intake · 宝贝入库",
    route: "/admin/oa/co/intake",
    owner: "02 CO",
  },
  {
    label: "Objects Runtime · 商品系统",
    route: "/admin/oa/co/objects",
    owner: "02 CO",
  },
  {
    label: "Product Media · 商品素材",
    route: "/admin/oa/co/media",
    owner: "02 CO",
  },
  {
    label: "Orders Runtime · 订单系统",
    route: "/admin/oa/co/orders",
    owner: "02 CO",
  },
  {
    label: "Payments Runtime · 支付管理",
    route: "/admin/oa/co/payments",
    owner: "02 CO",
  },
  {
    label: "Shipping Runtime · 发货管理",
    route: "/admin/oa/co/shipping",
    owner: "02 CO",
  },
];

/** @deprecated alias kept for any residual import; prefer CO_SECONDARY_SUBMENU */
export const PRODUCTS_ORDERS_SUBMENU = CO_SECONDARY_SUBMENU;

export const DATA_SOURCE = "TEST_ONLY_UI_FIXTURE";
export const NOT_FORMAL_PROVIDER = true;
export const NO_15TH_DOMAIN = true;
export const ADDITIVE_ONLY = true;

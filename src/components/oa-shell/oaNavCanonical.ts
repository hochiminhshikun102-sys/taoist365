export type OaNavItem = {
  id: string;
  key: string;
  en: string;
  zh: string;
  canonical: string;
  canonical_domain_id: string;
  owner_domain: string;
  has_submenu: boolean;
  capabilitySlug: string;
};

export type OaSubmenuItem = {
  labelEn: string;
  labelZh: string;
  route: string;
  owner: string;
  hint?: string;
};

export type OaSubmenuGroup = {
  titleEn: string;
  titleZh: string;
  items: OaSubmenuItem[];
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
    zh: "全局看板",
    canonical: "01 Overview",
    canonical_domain_id: "01",
    owner_domain: "01 Overview",
    has_submenu: false,
    capabilitySlug: "overview",
  },
  {
    id: "02",
    key: "co",
    en: "CO",
    zh: "商品与订单",
    canonical: "02 CO",
    canonical_domain_id: "02",
    owner_domain: "02 CO",
    has_submenu: true,
    capabilitySlug: "commerce",
  },
  {
    id: "03",
    key: "operations",
    en: "Operations",
    zh: "运营营销",
    canonical: "03 Operations",
    canonical_domain_id: "03",
    owner_domain: "03 Operations",
    has_submenu: true,
    capabilitySlug: "operations",
  },
  {
    id: "04",
    key: "ai_ops",
    en: "AI Ops",
    zh: "AI 推广中心",
    canonical: "04 AI Operations",
    canonical_domain_id: "04",
    owner_domain: "04 AI Operations",
    has_submenu: true,
    capabilitySlug: "ai-ops",
  },
  {
    id: "05",
    key: "site",
    en: "Site",
    zh: "站点前台",
    canonical: "05 Site",
    canonical_domain_id: "05",
    owner_domain: "05 Site",
    has_submenu: true,
    capabilitySlug: "site",
  },
  {
    id: "06",
    key: "geo",
    en: "GEO",
    zh: "区域全局配置",
    canonical: "06 GEO",
    canonical_domain_id: "06",
    owner_domain: "06 GEO",
    has_submenu: true,
    capabilitySlug: "geo",
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
    capabilitySlug: "cs-center",
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
    capabilitySlug: "finance",
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
    capabilitySlug: "logistics",
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
    capabilitySlug: "supply-chain",
  },
  {
    id: "11",
    key: "wk",
    en: "WK",
    zh: "WindKeep",
    canonical: "11 WK",
    canonical_domain_id: "11",
    owner_domain: "11 WK",
    has_submenu: false,
    capabilitySlug: "wk",
  },
  {
    id: "12",
    key: "gs",
    en: "GS",
    zh: "全球买手",
    canonical: "12 GS",
    canonical_domain_id: "12",
    owner_domain: "12 GS",
    has_submenu: false,
    capabilitySlug: "gs",
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
    capabilitySlug: "compliance",
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
    capabilitySlug: "settings",
  },
];

/** Approved CO six secondary workbenches — Additive-only; do not delete/rename/merge. */
export const CO_SECONDARY_SUBMENU: OaSubmenuItem[] = [
  { labelEn: "Intake", labelZh: "宝贝入库", route: "/admin/oa/co/intake", owner: "02 CO", hint: "read_only" },
  { labelEn: "Objects", labelZh: "商品系统", route: "/admin/oa/co/objects", owner: "02 CO", hint: "read_only" },
  { labelEn: "Media", labelZh: "商品素材", route: "/admin/oa/co/media", owner: "02 CO", hint: "read_only" },
  { labelEn: "Orders", labelZh: "订单系统", route: "/admin/oa/co/orders", owner: "02 CO", hint: "read_only" },
  { labelEn: "Payments", labelZh: "支付管理", route: "/admin/oa/co/payments", owner: "02 CO", hint: "read_only" },
  { labelEn: "Shipping", labelZh: "发货管理", route: "/admin/oa/co/shipping", owner: "02 CO", hint: "read_only" },
];

export const OPERATIONS_SUBMENU: OaSubmenuItem[] = [
  { labelEn: "03A Member Operations", labelZh: "03A 会员运营", route: "/admin/oa/operations#03A_member_ops", owner: "03 Operations", hint: "read_only" },
  { labelEn: "03B Points & Benefits", labelZh: "03B 积分与权益", route: "/admin/oa/operations#03B_points_benefits", owner: "03 Operations", hint: "read_only" },
  { labelEn: "03C Member Services", labelZh: "03C 会员服务", route: "/admin/oa/operations#03C_member_services", owner: "03 Operations", hint: "read_only" },
  { labelEn: "03D Member Content", labelZh: "03D 会员内容", route: "/admin/oa/operations#03D_member_content", owner: "03 Operations", hint: "read_only" },
  { labelEn: "03E Creator Operations", labelZh: "03E 创作者运营", route: "/admin/oa/operations#03E_creator", owner: "03 Operations", hint: "read_only" },
  { labelEn: "03F Growth & Rewards", labelZh: "03F 增长与奖励", route: "/admin/oa/operations#03F_growth_rewards", owner: "03 Operations", hint: "read_only" },
  { labelEn: "03G Messaging", labelZh: "03G 消息触达", route: "/admin/oa/operations#03G_messaging", owner: "03 Operations", hint: "read_only" },
];

export const SITE_SUBMENU: OaSubmenuItem[] = [
  { labelEn: "S1 Site Overview", labelZh: "S1 站点总览", route: "/admin/oa/site#site_overview", owner: "05 Site", hint: "read_only" },
  { labelEn: "S2 Route & Page Registry", labelZh: "S2 路由与页面登记", route: "/admin/oa/site#route_page_registry", owner: "05 Site", hint: "read_only" },
  { labelEn: "S3 Content Blocks", labelZh: "S3 内容区块", route: "/admin/oa/site#content_blocks", owner: "05 Site", hint: "read_only" },
  { labelEn: "S4 SEO Metadata", labelZh: "S4 SEO 元数据", route: "/admin/oa/site#seo_metadata_control", owner: "05 Site", hint: "read_only" },
  { labelEn: "S5 Visual & Asset Mapping", labelZh: "S5 视觉与资产", route: "/admin/oa/site#visual_asset_mapping", owner: "05 Site", hint: "read_only" },
  { labelEn: "S6 Site Review Queue", labelZh: "S6 站点审核队列", route: "/admin/oa/site#site_review_queue", owner: "05 Site", hint: "read_only" },
  { labelEn: "S7 Publish Readiness", labelZh: "S7 发布就绪", route: "/admin/oa/site#publish_readiness", owner: "05 Site", hint: "read_only" },
];

export const GEO_SUBMENU: OaSubmenuItem[] = [
  { labelEn: "G1 GEO Overview", labelZh: "G1 全球市场总览", route: "/admin/oa/geo#geo_overview", owner: "06 GEO", hint: "read_only" },
  { labelEn: "G2 Market Matrix", labelZh: "G2 市场矩阵", route: "/admin/oa/geo#market_matrix", owner: "06 GEO", hint: "read_only" },
  { labelEn: "G3 Search & AI Discovery", labelZh: "G3 搜索与发现", route: "/admin/oa/geo#search_ai_discovery", owner: "06 GEO", hint: "read_only" },
  { labelEn: "G4 Localization Queue", labelZh: "G4 本地化队列", route: "/admin/oa/geo#localization_queue", owner: "06 GEO", hint: "read_only" },
  { labelEn: "G5 Channel Signals", labelZh: "G5 渠道信号", route: "/admin/oa/geo#channel_signals", owner: "06 GEO", hint: "read_only" },
  { labelEn: "G6 Regional Compliance", labelZh: "G6 区域合规", route: "/admin/oa/geo#regional_compliance_flags", owner: "06 GEO", hint: "read_only" },
  { labelEn: "G7 GEO Content Actions", labelZh: "G7 GEO 内容动作", route: "/admin/oa/geo#geo_content_actions", owner: "06 GEO", hint: "read_only" },
];

export const AI_OPS_SUBMENU: OaSubmenuItem[] = [
  { labelEn: "A1 Global Dashboard", labelZh: "A1 AI 运行总览", route: "/admin/oa/ai-ops#global_dashboard", owner: "04 AI Operations", hint: "read_only" },
  { labelEn: "A2 Task Queue", labelZh: "A2 AI 任务队列", route: "/admin/oa/ai-ops#task_queue", owner: "04 AI Operations", hint: "read_only" },
  { labelEn: "A3 Model & Provider", labelZh: "A3 模型配置", route: "/admin/oa/ai-ops#model_provider_config", owner: "04 AI Operations", hint: "not_connected" },
  { labelEn: "A4 Material Generation", labelZh: "A4 素材生成", route: "/admin/oa/ai-ops#material_generation", owner: "04 AI Operations", hint: "read_only" },
  { labelEn: "A5 Material Library", labelZh: "A5 产物素材库", route: "/admin/oa/ai-ops#material_library", owner: "04 AI Operations", hint: "read_only" },
  { labelEn: "A6 Compliance & Source", labelZh: "A6 合规与来源", route: "/admin/oa/ai-ops#compliance_source", owner: "04 AI Operations", hint: "read_only" },
  { labelEn: "A7 Traffic & Reports", labelZh: "A7 流量与报告", route: "/admin/oa/ai-ops#traffic_reports", owner: "04 AI Operations", hint: "read_only" },
  { labelEn: "A8 Short Video Factory", labelZh: "A8 短视频工厂", route: "/admin/oa/ai-ops#short_video_factory", owner: "04 AI Operations", hint: "read_only" },
];

export const OA_SUBMENUS: Record<string, OaSubmenuGroup> = {
  co: { titleEn: "CO board", titleZh: "商品与订单看板", items: CO_SECONDARY_SUBMENU },
  operations: { titleEn: "Operations board", titleZh: "运营营销看板", items: OPERATIONS_SUBMENU },
  site: { titleEn: "Site board", titleZh: "站点前台看板", items: SITE_SUBMENU },
  geo: { titleEn: "GEO board", titleZh: "区域配置看板", items: GEO_SUBMENU },
  ai_ops: { titleEn: "AI Ops board", titleZh: "AI 推广看板", items: AI_OPS_SUBMENU },
};

/** @deprecated alias kept for any residual import; prefer CO_SECONDARY_SUBMENU */
export const PRODUCTS_ORDERS_SUBMENU = CO_SECONDARY_SUBMENU;

export const DATA_SOURCE = "TEST_ONLY_UI_FIXTURE";
export const NOT_FORMAL_PROVIDER = true;
export const NO_15TH_DOMAIN = true;
export const ADDITIVE_ONLY = true;

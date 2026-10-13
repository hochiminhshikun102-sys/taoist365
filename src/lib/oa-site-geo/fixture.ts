import type {
  GeoChannelRow,
  GeoComplianceRow,
  GeoDiscoveryRow,
  GeoLocaleRow,
  GeoMarketRow,
  GeoPanelId,
  SiteAssetRow,
  SiteBlockRow,
  SiteGeoDemoMetric,
  SiteGeoPanel,
  SitePanelId,
  SitePublishRow,
  SiteReviewRow,
  SiteRouteRow,
  SiteSeoRow,
} from "./types";
import { SITE_GEO_META } from "./types";

const CROSS_LINKS = [
  { label: "Overview · 全局总览", href: "/admin/oa/overview" },
  { label: "Site · 站点前台", href: "/admin/oa/site" },
  { label: "GEO · 区域全局配置", href: "/admin/oa/geo" },
  { label: "AI Ops · AI 推广中心", href: "/admin/oa/ai-ops" },
  { label: "CO Media · 商品素材", href: "/admin/oa/co/media" },
  { label: "Compliance · 合规", href: "/admin/oa/compliance" },
  { label: "Operations · 运营", href: "/admin/oa/operations" },
] as const;

export const SITE_PANELS: SiteGeoPanel<SitePanelId>[] = [
  {
    id: "site_overview",
    code: "S1",
    title_en: "Site Overview",
    title_zh: "站点总览",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Page inventory projection (DEMO)",
      "Site content health demo projection",
      "Provider readiness = not_connected",
    ],
    future_slots: [{ name: "Live CMS health feed", status: "not_connected" }],
    disabled_commands: ["Refresh live pages", "Open visual editor"],
    links: [...CROSS_LINKS],
    notes: [
      `SITE_WRITE_DISABLED=${String(SITE_GEO_META.site_write_disabled).toUpperCase()}`,
      "No real page writes",
    ],
  },
  {
    id: "route_page_registry",
    code: "S2",
    title_en: "Route & Page Registry",
    title_zh: "路由与页面登记",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Home / collections / guidance / objects / account page map (DEMO)",
      "route / title / canonical / noindex status demo projection",
      "Does not mutate real pages",
    ],
    future_slots: [{ name: "Live route crawler", status: "not_connected" }],
    disabled_commands: ["Create page", "Rename route", "Delete page"],
    links: [{ label: "Overview · 全局总览", href: "/admin/oa/overview" }],
    notes: ["Registry is a DEMO ledger", "Frontstage pages are not rewritten"],
  },
  {
    id: "content_blocks",
    code: "S3",
    title_en: "Content Blocks",
    title_zh: "内容区块",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Hero / collection / guidance / footer blocks",
      "owner / status / last_update demo projection",
    ],
    future_slots: [{ name: "Block editor write", status: "not_connected" }],
    disabled_commands: ["Edit block", "Publish block"],
    links: [{ label: "Operations · 运营", href: "/admin/oa/operations" }],
    notes: ["Block copy is DEMO only", "No CMS write"],
  },
  {
    id: "seo_metadata_control",
    code: "S4",
    title_en: "SEO Metadata Control",
    title_zh: "SEO 元数据控制",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "title / description / canonical / robots demo projection",
      "All apply / publish / sync commands disabled",
    ],
    future_slots: [{ name: "Search Console / sitemap sync", status: "not_connected" }],
    disabled_commands: ["Apply metadata", "Publish SEO", "Sync sitemap", "Write robots"],
    links: [{ label: "GEO · 区域全局配置", href: "/admin/oa/geo" }],
    notes: ["No real metadata / canonical / robots / sitemap writes"],
  },
  {
    id: "visual_asset_mapping",
    code: "S5",
    title_en: "Visual & Asset Mapping",
    title_zh: "视觉与素材映射",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Page-referenced assets (DEMO)",
      "Map to CO Media and AI Ops — no generate / upload / replace",
    ],
    future_slots: [{ name: "Asset replace pipeline", status: "not_connected" }],
    disabled_commands: ["Upload", "Replace asset", "Generate image"],
    links: [
      { label: "CO Media · 商品素材", href: "/admin/oa/co/media" },
      { label: "AI Ops · AI 推广中心", href: "/admin/oa/ai-ops" },
    ],
    notes: ["No material generation or replacement"],
  },
  {
    id: "site_review_queue",
    code: "S6",
    title_en: "Site Review Queue",
    title_zh: "站点审核队列",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Content issues / missing image / canonical risk / noindex risk (DEMO)",
      "Future approval slot = not_connected",
    ],
    future_slots: [{ name: "Approval execute", status: "not_connected" }],
    disabled_commands: ["Approve", "Clear risk", "Force index"],
    links: [{ label: "Compliance · 合规", href: "/admin/oa/compliance" }],
    notes: [`BUSINESS_APPROVAL_REQUIRED=${String(SITE_GEO_META.business_approval_required).toUpperCase()}`],
  },
  {
    id: "publish_readiness",
    code: "S7",
    title_en: "Publish Readiness",
    title_zh: "发布就绪",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "staging / preview / production status readonly",
      "deploy disabled · Cloudflare disabled",
    ],
    future_slots: [
      { name: "Production deploy", status: "not_connected" },
      { name: "Cloudflare binding", status: "not_connected" },
    ],
    disabled_commands: ["Deploy", "Promote preview", "Change Cloudflare"],
    links: [{ label: "Overview · 全局总览", href: "/admin/oa/overview" }],
    notes: [
      `DEPLOY_DISABLED=${String(SITE_GEO_META.deploy_disabled).toUpperCase()}`,
      "No env / binding / production deploy",
    ],
  },
];

export const GEO_PANELS: SiteGeoPanel<GeoPanelId>[] = [
  {
    id: "geo_overview",
    code: "G1",
    title_en: "GEO Overview",
    title_zh: "全球市场总览",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Global market overview (DEMO)",
      "region / language / currency demo projection",
    ],
    future_slots: [{ name: "Live market feed", status: "not_connected" }],
    disabled_commands: ["Refresh markets", "Save region"],
    links: [...CROSS_LINKS],
    notes: [`GEO_EXTERNAL_API_DISABLED=${String(SITE_GEO_META.geo_external_api_disabled).toUpperCase()}`],
  },
  {
    id: "market_matrix",
    code: "G2",
    title_en: "Market Matrix",
    title_zh: "市场矩阵",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "US / EU / Middle East / LatAm / SEA / JP / KR / AU demo markets",
      "priority / opportunity / risk / localization status",
    ],
    future_slots: [{ name: "Live market scoring", status: "not_connected" }],
    disabled_commands: ["Re-rank markets", "Open market"],
    links: [{ label: "Operations · 运营", href: "/admin/oa/operations" }],
    notes: ["Matrix is DEMO projection only"],
  },
  {
    id: "search_ai_discovery",
    code: "G3",
    title_en: "Search & AI Discovery",
    title_zh: "搜索与生成式发现",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Search intent (DEMO)",
      "GEO / generative discovery readiness",
      "AI answer visibility demo projection",
    ],
    future_slots: [
      { name: "Search API", status: "not_connected" },
      { name: "Model / OpenAI call", status: "not_connected" },
    ],
    disabled_commands: ["Call search API", "Call model", "Fetch SERP"],
    links: [{ label: "AI Ops · AI 推广中心", href: "/admin/oa/ai-ops" }],
    notes: ["No search API · no model call · no Cloudflare AI"],
  },
  {
    id: "localization_queue",
    code: "G4",
    title_en: "Localization Queue",
    title_zh: "本地化队列",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "language / locale / page mapping (DEMO)",
      "translation future slot = not_connected",
    ],
    future_slots: [{ name: "Translation write", status: "not_connected" }],
    disabled_commands: ["Translate", "Publish locale", "Sync locale pages"],
    links: [{ label: "Site · 站点前台", href: "/admin/oa/site" }],
    notes: ["No real translation writes"],
  },
  {
    id: "channel_signals",
    code: "G5",
    title_en: "Channel Signals",
    title_zh: "渠道信号",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "organic / social / referral / AI discovery demo signals",
      "No live analytics provider",
    ],
    future_slots: [{ name: "Analytics provider", status: "not_connected" }],
    disabled_commands: ["Connect analytics", "Import traffic"],
    links: [{ label: "Operations · 运营", href: "/admin/oa/operations" }],
    notes: ["Signals are DEMO only"],
  },
  {
    id: "regional_compliance_flags",
    code: "G6",
    title_en: "Regional Compliance Flags",
    title_zh: "区域合规标记",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "restricted claims",
      "health / beauty / herbal / aromatherapy / pet regional flags (DEMO)",
    ],
    future_slots: [{ name: "Compliance execute", status: "not_connected" }],
    disabled_commands: ["Clear flag", "Approve claim"],
    links: [{ label: "Compliance · 合规", href: "/admin/oa/compliance" }],
    notes: ["Flags are suggestion-only projections"],
  },
  {
    id: "geo_content_actions",
    code: "G7",
    title_en: "GEO Content Actions",
    title_zh: "GEO 内容动作",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Content suggestion only",
      "All commands disabled",
    ],
    future_slots: [{ name: "Campaign / page write", status: "not_connected" }],
    disabled_commands: ["Publish content", "Dispatch campaign", "Sync metadata"],
    links: [
      { label: "Site · 站点前台", href: "/admin/oa/site" },
      { label: "AI Ops · AI 推广中心", href: "/admin/oa/ai-ops" },
    ],
    notes: [
      `BUSINESS_APPROVAL_REQUIRED=${String(SITE_GEO_META.business_approval_required).toUpperCase()}`,
      "Suggestions never become business facts here",
    ],
  },
];

export const SITE_METRICS: SiteGeoDemoMetric[] = [
  { label: "Pages mapped", value: "12", meta: "DEMO registry · not crawled" },
  { label: "Content health", value: "watch", meta: "DEMO projection · not live CMS" },
  { label: "Provider", value: "not_connected", meta: "No CMS / Cloudflare / SEO API" },
  { label: "Deploy", value: "disabled", meta: "staging / preview / production readonly" },
];

export const GEO_METRICS: SiteGeoDemoMetric[] = [
  { label: "Demo markets", value: "8", meta: "US EU ME LatAm SEA JP KR AU" },
  { label: "Locales queued", value: "6", meta: "translation slot not_connected" },
  { label: "External API", value: "disabled", meta: "no search / GEO / model calls" },
  { label: "Approval", value: "required", meta: "suggestion-only content actions" },
];

export const SITE_ROUTE_ROWS: SiteRouteRow[] = [
  { route: "/", title: "Home", canonical: "https://demo.taoist365.invalid/", noindex: "index", status: "mapped" },
  { route: "/new-arrivals", title: "Collections · New arrivals", canonical: "https://demo.taoist365.invalid/new-arrivals", noindex: "index", status: "mapped" },
  { route: "/guidance", title: "Guidance", canonical: "https://demo.taoist365.invalid/guidance", noindex: "index", status: "mapped" },
  { route: "/objects", title: "Objects", canonical: "https://demo.taoist365.invalid/objects", noindex: "index", status: "mapped" },
  { route: "/account", title: "Account", canonical: "https://demo.taoist365.invalid/account", noindex: "noindex", status: "mapped" },
];

export const SITE_BLOCK_ROWS: SiteBlockRow[] = [
  { block: "Hero", owner: "05 Site", status: "demo_draft", last_update: "2026-10-13" },
  { block: "Collection block", owner: "03 Operations", status: "demo_review", last_update: "2026-10-13" },
  { block: "Guidance block", owner: "05 Site", status: "demo_ok", last_update: "2026-10-12" },
  { block: "Footer block", owner: "05 Site", status: "demo_ok", last_update: "2026-10-11" },
];

export const SITE_SEO_ROWS: SiteSeoRow[] = [
  {
    route: "/",
    title: "Taoist365 · DEMO title",
    description: "Quiet objects DEMO description",
    canonical: "https://demo.taoist365.invalid/",
    robots: "index,follow",
  },
  {
    route: "/account",
    title: "Account · DEMO",
    description: "Member account DEMO",
    canonical: "https://demo.taoist365.invalid/account",
    robots: "noindex,nofollow",
  },
];

export const SITE_ASSET_ROWS: SiteAssetRow[] = [
  { page: "/", asset_ref: "hero_still_demo", kind: "image", mapping: "CO Media / AI Ops (readonly)" },
  { page: "/objects", asset_ref: "object_shelf_demo", kind: "image", mapping: "CO Media (readonly)" },
  { page: "/guidance", asset_ref: "guidance_banner_demo", kind: "image", mapping: "AI Ops suggestion only" },
];

export const SITE_REVIEW_ROWS: SiteReviewRow[] = [
  { id: "sr_001", issue: "Missing collection hero alt (DEMO)", severity: "watch", source: "content" },
  { id: "sr_002", issue: "Canonical host is demo invalid URL", severity: "hold", source: "canonical" },
  { id: "sr_003", issue: "Account route noindex expected", severity: "info", source: "noindex" },
];

export const SITE_PUBLISH_ROWS: SitePublishRow[] = [
  { env: "staging", status: "readonly_projection", note: "No promote" },
  { env: "preview", status: "readonly_projection", note: "No preview deploy" },
  { env: "production", status: "blocked", note: "DEPLOY_DISABLED · Cloudflare disabled" },
];

export const GEO_MARKET_ROWS: GeoMarketRow[] = [
  { market: "US", region: "North America", language: "en-US", currency: "USD", priority: "P1", opportunity: "high", risk: "claims", localization: "demo_ready" },
  { market: "EU", region: "Europe", language: "en-GB", currency: "EUR", priority: "P1", opportunity: "high", risk: "health claims", localization: "demo_review" },
  { market: "Middle East", region: "MENA", language: "ar-AE", currency: "AED", priority: "P2", opportunity: "mid", risk: "restricted claims", localization: "queued" },
  { market: "LatAm", region: "Latin America", language: "es-MX", currency: "USD", priority: "P2", opportunity: "mid", risk: "import copy", localization: "queued" },
  { market: "SEA", region: "Southeast Asia", language: "en-SG", currency: "USD", priority: "P2", opportunity: "mid", risk: "herbal flags", localization: "demo_ready" },
  { market: "JP", region: "East Asia", language: "ja-JP", currency: "JPY", priority: "P1", opportunity: "high", risk: "cosmetics claims", localization: "queued" },
  { market: "KR", region: "East Asia", language: "ko-KR", currency: "KRW", priority: "P2", opportunity: "mid", risk: "beauty ads", localization: "queued" },
  { market: "AU", region: "Oceania", language: "en-AU", currency: "AUD", priority: "P3", opportunity: "watch", risk: "therapeutic claims", localization: "hold" },
];

export const GEO_DISCOVERY_ROWS: GeoDiscoveryRow[] = [
  { signal: "Search intent", intent: "quiet objects / ritual objects", readiness: "demo_projection", visibility: "unknown" },
  { signal: "GEO / generative discovery", intent: "AI answer inclusion", readiness: "not_connected", visibility: "not_measured" },
  { signal: "AI answer visibility", intent: "suggestion-only", readiness: "not_connected", visibility: "DEMO only" },
];

export const GEO_LOCALE_ROWS: GeoLocaleRow[] = [
  { locale: "en-US", language: "English", page_map: "/  /objects  /guidance", translation_slot: "not_connected" },
  { locale: "en-GB", language: "English (UK)", page_map: "/  /objects", translation_slot: "not_connected" },
  { locale: "ja-JP", language: "Japanese", page_map: "/  /objects", translation_slot: "not_connected" },
  { locale: "ko-KR", language: "Korean", page_map: "/", translation_slot: "not_connected" },
  { locale: "es-MX", language: "Spanish", page_map: "/", translation_slot: "not_connected" },
  { locale: "ar-AE", language: "Arabic", page_map: "/", translation_slot: "not_connected" },
];

export const GEO_CHANNEL_ROWS: GeoChannelRow[] = [
  { channel: "organic", volume: "DEMO", note: "No analytics provider" },
  { channel: "social", volume: "DEMO", note: "No social API" },
  { channel: "referral", volume: "DEMO", note: "No live referrer feed" },
  { channel: "AI discovery", volume: "DEMO", note: "No model / search API" },
];

export const GEO_COMPLIANCE_ROWS: GeoComplianceRow[] = [
  { region: "EU", category: "health", flag: "restricted_claims", note: "Suggestion only · link Compliance" },
  { region: "US", category: "beauty", flag: "watch_copy", note: "DEMO flag" },
  { region: "SEA", category: "herbal", flag: "restricted_claims", note: "DEMO flag" },
  { region: "AU", category: "aromatherapy", flag: "therapeutic_hold", note: "DEMO flag" },
  { region: "EU", category: "pet", flag: "watch_copy", note: "DEMO flag" },
];

export function getSiteWorkbenchData() {
  return {
    meta: SITE_GEO_META,
    panels: SITE_PANELS,
    metrics: SITE_METRICS,
    routes: SITE_ROUTE_ROWS,
    blocks: SITE_BLOCK_ROWS,
    seo: SITE_SEO_ROWS,
    assets: SITE_ASSET_ROWS,
    reviews: SITE_REVIEW_ROWS,
    publish: SITE_PUBLISH_ROWS,
    crossLinks: CROSS_LINKS,
  };
}

export function getGeoWorkbenchData() {
  return {
    meta: SITE_GEO_META,
    panels: GEO_PANELS,
    metrics: GEO_METRICS,
    markets: GEO_MARKET_ROWS,
    discovery: GEO_DISCOVERY_ROWS,
    locales: GEO_LOCALE_ROWS,
    channels: GEO_CHANNEL_ROWS,
    compliance: GEO_COMPLIANCE_ROWS,
    crossLinks: CROSS_LINKS,
  };
}

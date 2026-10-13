/**
 * 05 Site + 06 GEO readonly foundation types.
 * DEMO / TEST_ONLY only — no page writes, no SEO/GEO APIs, no deploy, no secrets.
 */

export type SiteGeoCapability = "read_only" | "not_connected";

export type SitePanelId =
  | "site_overview"
  | "route_page_registry"
  | "content_blocks"
  | "seo_metadata_control"
  | "visual_asset_mapping"
  | "site_review_queue"
  | "publish_readiness";

export type GeoPanelId =
  | "geo_overview"
  | "market_matrix"
  | "search_ai_discovery"
  | "localization_queue"
  | "channel_signals"
  | "regional_compliance_flags"
  | "geo_content_actions";

export type SiteGeoPanel<TId extends string> = {
  id: TId;
  code: string;
  title_en: string;
  title_zh: string;
  capability: SiteGeoCapability;
  provider_status: "not_connected";
  focus_items: string[];
  future_slots: Array<{ name: string; status: "not_connected" }>;
  disabled_commands: string[];
  links: Array<{ label: string; href: string }>;
  notes: string[];
};

export type SiteGeoDemoMetric = {
  label: string;
  value: string;
  meta: string;
};

export type SiteRouteRow = {
  route: string;
  title: string;
  canonical: string;
  noindex: "index" | "noindex";
  status: string;
};

export type SiteBlockRow = {
  block: string;
  owner: string;
  status: string;
  last_update: string;
};

export type SiteSeoRow = {
  route: string;
  title: string;
  description: string;
  canonical: string;
  robots: string;
};

export type SiteAssetRow = {
  page: string;
  asset_ref: string;
  kind: string;
  mapping: string;
};

export type SiteReviewRow = {
  id: string;
  issue: string;
  severity: "info" | "watch" | "hold";
  source: string;
};

export type SitePublishRow = {
  env: "staging" | "preview" | "production";
  status: string;
  note: string;
};

export type GeoMarketRow = {
  market: string;
  region: string;
  language: string;
  currency: string;
  priority: string;
  opportunity: string;
  risk: string;
  localization: string;
};

export type GeoDiscoveryRow = {
  signal: string;
  intent: string;
  readiness: string;
  visibility: string;
};

export type GeoLocaleRow = {
  locale: string;
  language: string;
  page_map: string;
  translation_slot: "not_connected";
};

export type GeoChannelRow = {
  channel: string;
  volume: string;
  note: string;
};

export type GeoComplianceRow = {
  region: string;
  category: string;
  flag: string;
  note: string;
};

export const SITE_GEO_META = {
  data_source: "TEST_ONLY_UI_FIXTURE",
  capability: "read_only" as const,
  live_provider: "not_connected" as const,
  real_write: false,
  real_external_api_call: false,
  account_center_write: false,
  frontstage_write: false,
  site_write_disabled: true,
  geo_external_api_disabled: true,
  deploy_disabled: true,
  business_approval_required: true,
  secrets_hidden: true,
  primary_modules_only: true,
} as const;

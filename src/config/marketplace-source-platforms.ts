export type MarketplaceSourcePlatform =
  | "auto"
  | "manual"
  | "taobao"
  | "tmall"
  | "1688"
  | "pdd"
  | "xianyu"
  | "tiktok"
  | "temu"
  | "amazon"
  | "etsy"
  | "shopify"
  | "jd"
  | "other";

export type MarketplaceSourcePolicy = {
  platform: MarketplaceSourcePlatform;
  label: string;
  defaultChannel: "commerce_new" | "windkeep_secondhand";
  defaultCondition: "new" | "preowned";
  sourceUsage: "manual_upload" | "reference_only";
  mediaRightsStatus: "owned_or_original" | "reference_only";
  transformRequired: boolean;
  airEnginePolicy: "direct_review" | "rebuild_or_replace_before_publish";
  note: string;
};

export const marketplaceSourcePolicies: readonly MarketplaceSourcePolicy[] = [
  {
    platform: "manual",
    label: "Manual / self-owned material",
    defaultChannel: "commerce_new",
    defaultCondition: "new",
    sourceUsage: "manual_upload",
    mediaRightsStatus: "owned_or_original",
    transformRequired: false,
    airEnginePolicy: "direct_review",
    note: "Use only when Dohara owns the photo, video, or supplier authorization.",
  },
  {
    platform: "taobao",
    label: "Taobao",
    defaultChannel: "commerce_new",
    defaultCondition: "new",
    sourceUsage: "reference_only",
    mediaRightsStatus: "reference_only",
    transformRequired: true,
    airEnginePolicy: "rebuild_or_replace_before_publish",
    note: "Taobao source media is a reference. Final listing media must be rebuilt, re-shot, licensed, or transformed by Air Engine.",
  },
  {
    platform: "tmall",
    label: "Tmall",
    defaultChannel: "commerce_new",
    defaultCondition: "new",
    sourceUsage: "reference_only",
    mediaRightsStatus: "reference_only",
    transformRequired: true,
    airEnginePolicy: "rebuild_or_replace_before_publish",
    note: "Tmall source media is a reference. Do not publish marketplace images directly.",
  },
  {
    platform: "1688",
    label: "1688",
    defaultChannel: "commerce_new",
    defaultCondition: "new",
    sourceUsage: "reference_only",
    mediaRightsStatus: "reference_only",
    transformRequired: true,
    airEnginePolicy: "rebuild_or_replace_before_publish",
    note: "1688 supplier material still needs authorization or Dohara rebuilt media before publication.",
  },
  {
    platform: "pdd",
    label: "Pinduoduo",
    defaultChannel: "commerce_new",
    defaultCondition: "new",
    sourceUsage: "reference_only",
    mediaRightsStatus: "reference_only",
    transformRequired: true,
    airEnginePolicy: "rebuild_or_replace_before_publish",
    note: "Pinduoduo source media is a reference. Final product media must be rebuilt or replaced.",
  },
  {
    platform: "xianyu",
    label: "Xianyu / Goofish",
    defaultChannel: "windkeep_secondhand",
    defaultCondition: "preowned",
    sourceUsage: "reference_only",
    mediaRightsStatus: "reference_only",
    transformRequired: true,
    airEnginePolicy: "rebuild_or_replace_before_publish",
    note: "Xianyu is routed to Windkeep secondhand by default. Source images are reference-only.",
  },
  {
    platform: "tiktok",
    label: "TikTok / TikTok Shop",
    defaultChannel: "commerce_new",
    defaultCondition: "new",
    sourceUsage: "reference_only",
    mediaRightsStatus: "reference_only",
    transformRequired: true,
    airEnginePolicy: "rebuild_or_replace_before_publish",
    note: "TikTok Shop source media is a reference. Final media must be rebuilt for Dohara.",
  },
  {
    platform: "temu",
    label: "Temu",
    defaultChannel: "commerce_new",
    defaultCondition: "new",
    sourceUsage: "reference_only",
    mediaRightsStatus: "reference_only",
    transformRequired: true,
    airEnginePolicy: "rebuild_or_replace_before_publish",
    note: "Temu source media is a reference. Do not publish marketplace images directly.",
  },
  {
    platform: "amazon",
    label: "Amazon",
    defaultChannel: "commerce_new",
    defaultCondition: "new",
    sourceUsage: "reference_only",
    mediaRightsStatus: "reference_only",
    transformRequired: true,
    airEnginePolicy: "rebuild_or_replace_before_publish",
    note: "Amazon source media is a reference. Final media must be licensed, replaced, or rebuilt.",
  },
  {
    platform: "etsy",
    label: "Etsy",
    defaultChannel: "commerce_new",
    defaultCondition: "new",
    sourceUsage: "reference_only",
    mediaRightsStatus: "reference_only",
    transformRequired: true,
    airEnginePolicy: "rebuild_or_replace_before_publish",
    note: "Etsy source media is a reference unless seller authorization is documented.",
  },
  {
    platform: "shopify",
    label: "Shopify / independent store",
    defaultChannel: "commerce_new",
    defaultCondition: "new",
    sourceUsage: "reference_only",
    mediaRightsStatus: "reference_only",
    transformRequired: true,
    airEnginePolicy: "rebuild_or_replace_before_publish",
    note: "Independent-store source media needs authorization or Dohara rebuilt outputs.",
  },
  {
    platform: "jd",
    label: "JD",
    defaultChannel: "commerce_new",
    defaultCondition: "new",
    sourceUsage: "reference_only",
    mediaRightsStatus: "reference_only",
    transformRequired: true,
    airEnginePolicy: "rebuild_or_replace_before_publish",
    note: "JD source media is a reference. Final listing media must be rebuilt or replaced.",
  },
  {
    platform: "other",
    label: "Other marketplace",
    defaultChannel: "commerce_new",
    defaultCondition: "new",
    sourceUsage: "reference_only",
    mediaRightsStatus: "reference_only",
    transformRequired: true,
    airEnginePolicy: "rebuild_or_replace_before_publish",
    note: "Unknown source media is reference-only until rights and rebuilt outputs are confirmed.",
  },
];

export const marketplaceSourcePlatformOptions: readonly MarketplaceSourcePlatform[] = [
  "auto",
  ...marketplaceSourcePolicies.map((policy) => policy.platform),
];

export function findMarketplaceSourcePolicy(platform: string): MarketplaceSourcePolicy {
  return marketplaceSourcePolicies.find((policy) => policy.platform === platform) ?? marketplaceSourcePolicies[marketplaceSourcePolicies.length - 1];
}

export function detectMarketplaceSourcePlatform(sourceUrl: string): MarketplaceSourcePlatform {
  const value = sourceUrl.toLowerCase();
  if (/xianyu|goofish|2\.taobao/.test(value)) return "xianyu";
  if (/tmall|detail\.tmall/.test(value)) return "tmall";
  if (/taobao|item\.taobao/.test(value)) return "taobao";
  if (/1688\.com|alibaba/.test(value)) return "1688";
  if (/pinduoduo|yangkeduo|pdd/.test(value)) return "pdd";
  if (/tiktok|tokopedia/.test(value)) return "tiktok";
  if (/temu/.test(value)) return "temu";
  if (/amazon|amzn\.to/.test(value)) return "amazon";
  if (/etsy/.test(value)) return "etsy";
  if (/jd\.com|360buy/.test(value)) return "jd";
  if (/myshopify|shopify/.test(value)) return "shopify";
  return "other";
}

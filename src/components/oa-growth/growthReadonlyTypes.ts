export type GrowthReadonlyModuleId = "site" | "geo" | "ai-ops";

export type GrowthSummaryCard = {
  label: string;
  value: string;
  hint: string;
};

export type GrowthListRow = {
  id: string;
  primary: string;
  secondary: string;
  status: string;
  asOf: string;
};

export type GrowthReadonlyModule = {
  id: GrowthReadonlyModuleId;
  activeKey: string;
  en: string;
  zh: string;
  descriptionEn: string;
  descriptionZh: string;
  canonicalDomain: string;
  writeGateLine: string;
  writeGateMeta: string;
  summaries: GrowthSummaryCard[];
  rows: GrowthListRow[];
  listTitle: string;
  emptyTitle: string;
  emptyBody: string;
  errorTitle: string;
  errorBody: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
};

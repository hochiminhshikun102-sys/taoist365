export type PlatformReadonlyModuleId = "finance" | "compliance" | "settings";

export type PlatformSummaryCard = {
  label: string;
  value: string;
  hint: string;
};

export type PlatformListRow = {
  id: string;
  primary: string;
  secondary: string;
  status: string;
  asOf: string;
};

export type PlatformReadonlyModule = {
  id: PlatformReadonlyModuleId;
  activeKey: string;
  en: string;
  zh: string;
  descriptionEn: string;
  descriptionZh: string;
  canonicalDomain: string;
  writeGateLine: string;
  writeGateMeta: string;
  summaries: PlatformSummaryCard[];
  rows: PlatformListRow[];
  listTitle: string;
  emptyTitle: string;
  emptyBody: string;
  errorTitle: string;
  errorBody: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
};

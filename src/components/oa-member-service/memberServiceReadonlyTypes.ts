export type MemberServiceReadonlyModuleId = "cs-center" | "wk" | "gs";

export type MemberServiceSummaryCard = {
  label: string;
  value: string;
  hint: string;
};

export type MemberServiceListRow = {
  id: string;
  primary: string;
  secondary: string;
  status: string;
  asOf: string;
};

export type MemberServiceReadonlyModule = {
  id: MemberServiceReadonlyModuleId;
  activeKey: string;
  en: string;
  zh: string;
  descriptionEn: string;
  descriptionZh: string;
  canonicalDomain: string;
  writeGateLine: string;
  writeGateMeta: string;
  summaries: MemberServiceSummaryCard[];
  rows: MemberServiceListRow[];
  listTitle: string;
  emptyTitle: string;
  emptyBody: string;
  errorTitle: string;
  errorBody: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
};

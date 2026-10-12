export type CommerceReadonlyModuleId =
  | "commerce"
  | "operations"
  | "logistics"
  | "supply-chain";

export type CommerceSummaryCard = {
  label: string;
  value: string;
  hint: string;
};

export type CommerceListRow = {
  id: string;
  primary: string;
  secondary: string;
  status: string;
  asOf: string;
};

export type CommerceReadonlyModule = {
  id: CommerceReadonlyModuleId;
  activeKey: string;
  en: string;
  zh: string;
  descriptionEn: string;
  descriptionZh: string;
  canonicalDomain: string;
  summaries: CommerceSummaryCard[];
  rows: CommerceListRow[];
  listTitle: string;
  emptyTitle: string;
  emptyBody: string;
  errorTitle: string;
  errorBody: string;
};

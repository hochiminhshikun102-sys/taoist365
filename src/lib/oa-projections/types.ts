/**
 * Shared readonly order projection fields for cross-module OA consumers.
 * Source of truth remains CO Orders / Payments / Shipping fixtures.
 * Amounts are minor units; never sum across currencies.
 * No write capability — capability_status is read_only | not_connected only.
 */
export type OrderProjectionRow = {
  order_id: string;
  order_number: string;
  order_status: string;
  payment_status: string;
  fulfillment_status: string;
  after_sales_status: string;
  refund_status: string;
  risk_status: string;
  currency: string;
  amount_minor: number;
  items_count: number;
  package_count: number;
  last_event_at: string;
  source_route: string;
  owner_module: string;
  exception_type: string;
  capability_status: "read_only" | "not_connected";
};

export const SHARED_PROJECTION_FIELDS = [
  "order_id",
  "order_number",
  "order_status",
  "payment_status",
  "fulfillment_status",
  "after_sales_status",
  "refund_status",
  "risk_status",
  "currency",
  "amount_minor",
  "items_count",
  "package_count",
  "last_event_at",
  "source_route",
  "owner_module",
  "exception_type",
  "capability_status",
] as const;

export type SharedProjectionField = (typeof SHARED_PROJECTION_FIELDS)[number];

export const PROJECTION_META = {
  data_source: "TEST_ONLY_UI_FIXTURE",
  capability: "read_only" as const,
  live_provider: "not_connected" as const,
  real_write: false,
  cross_currency_sum: false,
} as const;

export type OverviewWorkItem = {
  id: string;
  title: string;
  title_zh: string;
  count: number;
  owner_module: string;
  href: string;
  exception_type: string;
  capability_status: "read_only" | "not_connected";
};

/**
 * 03 Operations readonly foundation types.
 * Seven internal workstreams under a single OA primary module.
 * DEMO / TEST_ONLY only — no Account Center or Provider writes.
 */

export type OpsCapability = "read_only" | "not_connected";

export type OpsWorkstreamId =
  | "03A_member_ops"
  | "03B_points_benefits"
  | "03C_member_services"
  | "03D_member_content"
  | "03E_creator"
  | "03F_growth_rewards"
  | "03G_messaging";

export type OpsAccountMapping = {
  /** Account / frontstage consumer routes — reference text only, never edited here. */
  label: string;
  route: string;
  note: string;
};

export type OpsWorkstream = {
  id: OpsWorkstreamId;
  code: string;
  title_en: string;
  title_zh: string;
  capability: OpsCapability;
  provider_status: "not_connected";
  focus_items: string[];
  future_slots: Array<{ name: string; status: "not_connected" }>;
  account_mappings: OpsAccountMapping[];
  exception_preview: string[];
  notes: string[];
};

export type OpsExceptionItem = {
  id: string;
  workstream: OpsWorkstreamId;
  title: string;
  severity: "info" | "watch" | "hold";
  source: string;
  as_of: string;
};

export type OpsProviderReadiness = {
  name: string;
  status: "not_connected";
  note: string;
};

export const OPERATIONS_META = {
  data_source: "TEST_ONLY_UI_FIXTURE",
  capability: "read_only" as const,
  live_provider: "not_connected" as const,
  real_write: false,
  account_center_write: false,
  single_level_invite_only: true,
  multi_level_reward: false,
  primary_module_only: true,
  workstreams_are_internal: true,
} as const;

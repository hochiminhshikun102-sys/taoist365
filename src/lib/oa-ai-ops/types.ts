/**
 * 04 AI Operations readonly foundation types.
 * DEMO / TEST_ONLY only — no model calls, no secrets, no Provider wiring.
 */

export type AiOpsCapability = "read_only" | "not_connected";

export type AiOpsPanelId =
  | "global_dashboard"
  | "task_queue"
  | "model_provider_config"
  | "material_generation"
  | "material_library"
  | "compliance_source"
  | "traffic_reports"
  | "short_video_factory";

export type AiOpsPanel = {
  id: AiOpsPanelId;
  code: string;
  title_en: string;
  title_zh: string;
  capability: AiOpsCapability;
  provider_status: "not_connected";
  focus_items: string[];
  future_slots: Array<{ name: string; status: "not_connected" }>;
  disabled_commands: string[];
  links: Array<{ label: string; href: string }>;
  notes: string[];
};

export type AiOpsExceptionItem = {
  id: string;
  panel: AiOpsPanelId;
  title: string;
  severity: "info" | "watch" | "hold";
  source: string;
  as_of: string;
};

export type AiOpsProviderReadiness = {
  name: string;
  status: "not_connected";
  note: string;
};

export type AiOpsDemoMetric = {
  label: string;
  value: string;
  meta: string;
};

export const AI_OPS_META = {
  data_source: "TEST_ONLY_UI_FIXTURE",
  capability: "read_only" as const,
  live_provider: "not_connected" as const,
  real_write: false,
  real_model_call: false,
  account_center_write: false,
  ai_output_is_suggestion_only: true,
  business_approval_required: true,
  model_calls_disabled: true,
  secrets_hidden: true,
  primary_module_only: true,
} as const;

import type {
  AiOpsDemoMetric,
  AiOpsExceptionItem,
  AiOpsPanel,
  AiOpsProviderReadiness,
} from "./types";
import { AI_OPS_META } from "./types";

export const AI_OPS_PANELS: AiOpsPanel[] = [
  {
    id: "global_dashboard",
    code: "A1",
    title_en: "AI Global Dashboard",
    title_zh: "AI 运行总览",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "AI runtime overview (DEMO)",
      "Success / failure rate projection (DEMO)",
      "Usage / cost projection (DEMO minor units — not billed)",
    ],
    future_slots: [{ name: "Live provider metrics", status: "not_connected" }],
    disabled_commands: ["Refresh live metrics", "Export billing"],
    links: [{ label: "Operations · 运营", href: "/admin/oa/operations" }],
    notes: [
      `AI_OUTPUT_IS_SUGGESTION_ONLY=${String(AI_OPS_META.ai_output_is_suggestion_only).toUpperCase()}`,
      "Metrics are DEMO projections only — not business facts",
    ],
  },
  {
    id: "task_queue",
    code: "A2",
    title_en: "AI Task Queue",
    title_zh: "AI 任务队列",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Task queue projection",
      "Draft generation tasks (DEMO)",
      "Failed retry queue (DEMO)",
    ],
    future_slots: [{ name: "Live task runner", status: "not_connected" }],
    disabled_commands: ["Run", "Retry", "Cancel"],
    links: [],
    notes: ["All retry / run / cancel commands remain disabled", "No real AI task writes"],
  },
  {
    id: "model_provider_config",
    code: "A3",
    title_en: "Model & Provider Config",
    title_zh: "模型与 Provider 配置",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Model config references (names only)",
      "OpenAI / image / video / text / embedding future slots",
      "Secrets never loaded or displayed",
    ],
    future_slots: [
      { name: "OpenAI connect", status: "not_connected" },
      { name: "Image model connect", status: "not_connected" },
      { name: "Video model connect", status: "not_connected" },
      { name: "Text / embedding connect", status: "not_connected" },
      { name: "Cloudflare AI connect", status: "not_connected" },
    ],
    disabled_commands: ["Connect provider", "Rotate key", "Test call"],
    links: [],
    notes: [
      "Does not read real keys",
      "Does not print secrets",
      "Does not connect Cloudflare / OpenAI",
      `MODEL_CALLS_DISABLED=${String(AI_OPS_META.model_calls_disabled).toUpperCase()}`,
    ],
  },
  {
    id: "material_generation",
    code: "A4",
    title_en: "AI Material Generation",
    title_zh: "AI 素材生成",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Copy / image / video / product material generation entries",
      "DEMO task cards only",
    ],
    future_slots: [{ name: "Live generate pipeline", status: "not_connected" }],
    disabled_commands: ["Generate", "Regenerate", "Batch generate"],
    links: [{ label: "CO Media · 商品素材", href: "/admin/oa/co/media" }],
    notes: ["Generate button disabled", "No real material generation"],
  },
  {
    id: "material_library",
    code: "A5",
    title_en: "AI Material Library",
    title_zh: "AI 产物素材库",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "AI output library readonly ledger (DEMO)",
      "source / rights / original / public / ai labels",
    ],
    future_slots: [{ name: "Promote to CO Media write", status: "not_connected" }],
    disabled_commands: ["Publish to media", "Delete asset"],
    links: [{ label: "CO Media · 商品素材", href: "/admin/oa/co/media" }],
    notes: ["Readonly ledger only", "Promotion into CO Media is not executed here"],
  },
  {
    id: "compliance_source",
    code: "A6",
    title_en: "AI Compliance & Source Control",
    title_zh: "AI 合规与来源控制",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "Copyright / source projection",
      "Material rights projection",
      "Risk flags (DEMO)",
    ],
    future_slots: [{ name: "Compliance review execute", status: "not_connected" }],
    disabled_commands: ["Approve rights", "Clear risk"],
    links: [{ label: "Compliance · 合规", href: "/admin/oa/compliance" }],
    notes: ["Compliance review future slot = not_connected", "AI output is suggestion only"],
  },
  {
    id: "traffic_reports",
    code: "A7",
    title_en: "Traffic Dispatch & Reports",
    title_zh: "流量派发与报告",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: [
      "AI content dispatch suggestions (DEMO)",
      "Channel / region / asset report projection (DEMO)",
    ],
    future_slots: [{ name: "Live campaign dispatch", status: "not_connected" }],
    disabled_commands: ["Dispatch", "Schedule push", "Buy media"],
    links: [
      { label: "Site · 站点前台", href: "/admin/oa/site" },
      { label: "GEO · 区域配置", href: "/admin/oa/geo" },
    ],
    notes: ["No real traffic dispatch", "Suggestions require business approval"],
  },
  {
    id: "short_video_factory",
    code: "A8",
    title_en: "Short Video / Promo Factory",
    title_zh: "短视频推广工厂",
    capability: "read_only",
    provider_status: "not_connected",
    focus_items: ["Short-video promo center entry", "Template / batch / script projections (DEMO)"],
    future_slots: [
      { name: "Viral crawl", status: "not_connected" },
      { name: "Script generate", status: "not_connected" },
      { name: "Batch video", status: "not_connected" },
      { name: "Template publish", status: "not_connected" },
    ],
    disabled_commands: ["Crawl", "Batch", "Publish"],
    links: [{ label: "Operations · 运营", href: "/admin/oa/operations" }],
    notes: ["All crawl / batch / publish commands disabled", "No real video generation"],
  },
];

export const AI_OPS_DASHBOARD_METRICS: AiOpsDemoMetric[] = [
  {
    label: "Success rate · 成功率",
    value: "92%*",
    meta: "DEMO projection · not live",
  },
  {
    label: "Failure rate · 失败率",
    value: "8%*",
    meta: "DEMO projection · not live",
  },
  {
    label: "Usage units · 用量",
    value: "1,240*",
    meta: "DEMO units · not billed",
  },
  {
    label: "Cost minor · 费用",
    value: "—",
    meta: "not_connected · no live cost ledger",
  },
];

export const AI_OPS_EXCEPTIONS: AiOpsExceptionItem[] = [
  {
    id: "ai_ex_001",
    panel: "task_queue",
    title: "Draft generation task failed (DEMO)",
    severity: "watch",
    source: "TEST_ONLY_UI_FIXTURE",
    as_of: "2026-10-13T12:40:00+08:00",
  },
  {
    id: "ai_ex_002",
    panel: "compliance_source",
    title: "Rights label missing on DEMO asset",
    severity: "hold",
    source: "TEST_ONLY_UI_FIXTURE",
    as_of: "2026-10-13T12:40:00+08:00",
  },
  {
    id: "ai_ex_003",
    panel: "material_library",
    title: "AI-labeled asset awaiting business approval (DEMO)",
    severity: "info",
    source: "TEST_ONLY_UI_FIXTURE",
    as_of: "2026-10-13T12:40:00+08:00",
  },
];

export const AI_OPS_PROVIDER_READINESS: AiOpsProviderReadiness[] = [
  {
    name: "OpenAI / Text",
    status: "not_connected",
    note: "No key load. No model call.",
  },
  {
    name: "Image generation",
    status: "not_connected",
    note: "Generate disabled.",
  },
  {
    name: "Video generation",
    status: "not_connected",
    note: "Batch / publish disabled.",
  },
  {
    name: "Embedding / retrieval",
    status: "not_connected",
    note: "Future slot only.",
  },
  {
    name: "Cloudflare AI / Workers AI",
    status: "not_connected",
    note: "No binding change. Not connected.",
  },
];

export const AI_OPS_DEMO_LIBRARY_ROWS = [
  {
    asset_id: "ai_demo_001",
    title: "Quiet desk copy draft (DEMO)",
    kind: "copy",
    source: "ai",
    rights: "unknown",
    original: false,
    public: false,
    label: "ai",
  },
  {
    asset_id: "ai_demo_002",
    title: "Seasonal still suggestion (DEMO)",
    kind: "image",
    source: "ai",
    rights: "review_required",
    original: false,
    public: false,
    label: "ai",
  },
  {
    asset_id: "ai_demo_003",
    title: "Promo clip outline (DEMO)",
    kind: "video",
    source: "ai",
    rights: "review_required",
    original: false,
    public: false,
    label: "ai",
  },
] as const;

export function getAiOpsWorkbenchData() {
  return {
    meta: AI_OPS_META,
    panels: AI_OPS_PANELS,
    metrics: AI_OPS_DASHBOARD_METRICS,
    exceptions: AI_OPS_EXCEPTIONS,
    providers: AI_OPS_PROVIDER_READINESS,
    library: AI_OPS_DEMO_LIBRARY_ROWS,
  };
}

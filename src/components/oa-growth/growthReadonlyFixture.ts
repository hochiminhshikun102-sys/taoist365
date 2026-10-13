import type { GrowthReadonlyModule } from "./growthReadonlyTypes";

/**
 * TEST_ONLY UI fixtures for Site / GEO / AI Ops readonly wiring B.
 * Not Formal Provider. No publish / GEO write / AI job execution.
 */
export const GROWTH_READONLY_META = {
  data_source: "TEST_ONLY_UI_FIXTURE",
  not_formal_provider: true,
  mode: "READONLY_PREVIEW",
  provider_status: "Provider not connected",
} as const;

export const GROWTH_READONLY_MODULES: Record<string, GrowthReadonlyModule> = {
  site: {
    id: "site",
    activeKey: "site",
    en: "Site",
    zh: "站点",
    descriptionEn:
      "Readonly site content carrier. Shows pages, publish queue, and content health — publish remains blocked.",
    descriptionZh: "站点内容只读承载。展示页面、发布队列与内容健康；真实发布保持阻断。",
    canonicalDomain: "05 Site",
    writeGateLine: "Real publish blocked",
    writeGateMeta: "No page / content publish mutation",
    summaries: [
      { label: "Pages tracked · 页面跟踪", value: "24", hint: "TEST_ONLY count" },
      { label: "Publish queue · 发布队列", value: "3", hint: "preview only" },
      { label: "Content health · 内容健康", value: "Watch", hint: "2 warnings" },
      { label: "Provider link · 接线状态", value: "Offline", hint: "Not connected" },
    ],
    rows: [
      {
        id: "PAGE-TEST-HOME",
        primary: "Homepage · 首页",
        secondary: "Route / · locale en",
        status: "published_fixture",
        asOf: "2026-10-12 08:10",
      },
      {
        id: "PAGE-TEST-ABOUT",
        primary: "About · 关于",
        secondary: "Route /about · draft queue",
        status: "queue_preview",
        asOf: "2026-10-12 09:22",
      },
      {
        id: "PAGE-TEST-COLLECTIONS",
        primary: "Collections · 主题系列",
        secondary: "Content health warning · missing alt set",
        status: "health_watch",
        asOf: "2026-10-11 18:40",
      },
    ],
    listTitle: "Site content snapshot · 站点内容快照（只读）",
    emptyTitle: "Empty state · 空状态",
    emptyBody: "No live site Provider pages connected. Fixture rows are preview-only.",
    errorTitle: "Error state · 错误状态",
    errorBody: "Provider unavailable · Site content source not wired. Publish actions disabled.",
    primaryActionLabel: "Publish · 发布 · Not connected",
    secondaryActionLabel: "Refresh · 刷新 · Not connected",
  },
  geo: {
    id: "geo",
    activeKey: "geo",
    en: "GEO",
    zh: "GEO",
    descriptionEn:
      "Readonly SEO/GEO carrier. Coverage and canonical/noindex flags are descriptive only — no search manipulation.",
    descriptionZh: "SEO/GEO 只读承载。覆盖与 canonical/noindex 仅描述；不做搜索操纵、不写 metadata。",
    canonicalDomain: "06 GEO",
    writeGateLine: "GEO / metadata write blocked",
    writeGateMeta: "No auto metadata or index mutation",
    summaries: [
      { label: "GEO projects · GEO 项目", value: "6", hint: "TEST_ONLY count" },
      { label: "Page coverage · 页面覆盖", value: "71%", hint: "fixture ratio" },
      { label: "noindex flags · noindex", value: "4", hint: "descriptive" },
      { label: "Provider link · 接线状态", value: "Offline", hint: "Not connected" },
    ],
    rows: [
      {
        id: "GEO-TEST-US-HOME",
        primary: "US Homepage · AI-readable",
        secondary: "canonical / · indexable fixture",
        status: "ai_readable",
        asOf: "2026-10-12 07:55",
      },
      {
        id: "GEO-TEST-EU-ABOUT",
        primary: "EU About · coverage gap",
        secondary: "canonical /about · locale fr watch",
        status: "coverage_gap",
        asOf: "2026-10-12 07:55",
      },
      {
        id: "GEO-TEST-JP-STORE",
        primary: "JP Store listing · noindex",
        secondary: "Descriptive noindex · not a write action",
        status: "noindex_flag",
        asOf: "2026-10-11 20:12",
      },
    ],
    listTitle: "GEO / SEO snapshot · GEO 快照（只读）",
    emptyTitle: "Empty state · 空状态",
    emptyBody: "No live GEO Provider projects connected. Fixture rows are preview-only.",
    errorTitle: "Error state · 错误状态",
    errorBody: "Provider unavailable · GEO source not wired. Metadata writes disabled.",
    primaryActionLabel: "Write metadata · 写元数据 · Not connected",
    secondaryActionLabel: "Refresh · 刷新 · Not connected",
  },
  "ai-ops": {
    id: "ai-ops",
    activeKey: "ai_ops",
    en: "AI Ops",
    zh: "AI 运营",
    descriptionEn:
      "Readonly AI operations carrier. Queue and failure states are fixtures — no live AI jobs or model calls.",
    descriptionZh: "AI 运营只读承载。队列与失败态为夹具；不触发真实 AI job、不调用外部模型。",
    canonicalDomain: "04 AI Ops",
    writeGateLine: "AI job execution blocked",
    writeGateMeta: "No model call / OpenAI config mutation",
    summaries: [
      { label: "Queued jobs · 排队任务", value: "5", hint: "TEST_ONLY count" },
      { label: "Failed / retry · 失败重试", value: "2", hint: "fixture only" },
      { label: "Model calls · 模型调用", value: "0 live", hint: "Not connected" },
      { label: "Provider link · 接线状态", value: "Offline", hint: "Not connected" },
    ],
    rows: [
      {
        id: "AIJOB-TEST-901",
        primary: "Content moderation preview · 内容审核预览",
        secondary: "Queue · not executed",
        status: "queued_fixture",
        asOf: "2026-10-12 10:05",
      },
      {
        id: "AIJOB-TEST-887",
        primary: "Image caption assist · 配文辅助",
        secondary: "Failed preview · retry disabled",
        status: "failed_fixture",
        asOf: "2026-10-12 09:31",
      },
      {
        id: "AIJOB-TEST-870",
        primary: "Campaign copy draft · 投放文案草稿",
        secondary: "Model call status · offline",
        status: "offline",
        asOf: "2026-10-11 22:18",
      },
    ],
    listTitle: "AI job snapshot · AI 任务快照（只读）",
    emptyTitle: "Empty state · 空状态",
    emptyBody: "No live AI Ops Provider jobs connected. Fixture rows are preview-only.",
    errorTitle: "Error state · 错误状态",
    errorBody: "Provider unavailable · AI Ops source not wired. Run / retry actions disabled.",
    primaryActionLabel: "Run job · 执行任务 · Not connected",
    secondaryActionLabel: "Retry · 重试 · Not connected",
  },
};

export function getGrowthReadonlyModule(id: string): GrowthReadonlyModule | undefined {
  return GROWTH_READONLY_MODULES[id];
}

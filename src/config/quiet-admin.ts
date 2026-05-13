export type AdminSection = {
  title: string;
  note: string;
  items: readonly string[];
};

export const quietAdminSections: readonly AdminSection[] = [
  {
    title: "内容系统 / CMS system",
    note: "页面、物件、邮件和仪式页的低压力内容结构。Low-pressure content structure for pages, objects, mail, and ritual surfaces.",
    items: ["页面 / Page CMS", "分类 / Collection CMS", "物件 / Object CMS", "媒体 / Media CMS", "安静上传 / Quiet upload flow"],
  },
  {
    title: "物件结构 / Object architecture",
    note: "物件记录保持有用，但不变成 SKU 系统。Object records stay useful without turning into a SKU system.",
    items: ["风物件 / Wind Objects", "安静桌面物件 / Quiet Desk Objects", "仪式物件 / Ritual Objects", "季节物件 / Seasonal Objects", "空气感物件 / Atmospheric Objects"],
  },
  {
    title: "媒体库 / Media library",
    note: "图片和视频先整理成可长期共存的状态，再放到前台。Images and video are prepared for coexistence before public placement.",
    items: ["图片上传 / Image upload", "视频上传 / Video upload", "首页媒体 / Hero media", "陈列媒体 / Placement media", "材质细节 / Material details"],
  },
  {
    title: "前台文案 / Presence copy",
    note: "维护用户真正会看到的慢文案。Slow text upkeep for the parts people actually see.",
    items: ["每日短句 / Daily line", "安静碎片 / Quiet fragments", "桌面文案 / Desk copy", "长期开启文案 / Long-open copy", "物件措辞 / Objects wording", "Windkeep措辞 / Windkeep wording", "首页文案 / Home wording"],
  },
  {
    title: "压力检查 / Pressure QA",
    note: "用来发现太用力的文案。A place to catch wording that tries too hard.",
    items: ["边界失败 / Guardrail failures", "术语泄漏 / Terminology leakage", "宣言风险 / Manifesto risk", "压力密度警告 / Pressure-density warnings", "过度自觉检测 / Over-awareness detection"],
  },
  {
    title: "术语检查 / Terminology review",
    note: "风险措辞进入前台前先变薄。Thin risky wording before it reaches the site.",
    items: ["禁用词 / Blocked words", "风险文案 / Risk copy", "宣言式措辞 / Manifesto wording", "过度表现说明 / Over-performance notes", "AI感语言 / AI-aware language"],
  },
  {
    title: "安静草稿 / Quiet drafts",
    note: "没写完的内容可以先放着。Unfinished notes can stay unfinished until they are ready.",
    items: ["慢准备文案 / Slow prepared text", "未完成笔记 / Unfinished notes", "本地草稿 / Soft local drafts", "低压力编辑 / Low-pressure editing"],
  },
  {
    title: "慢更新 / Slow updates",
    note: "替换应该像维护，不像新闻。Replacement should feel like upkeep, not news.",
    items: ["安静轮换 / Quiet rotation", "慢替换 / Slow replacement", "保留旧文案 / Kept old copy", "延迟可见 / Delayed visibility"],
  },
  {
    title: "归档隔离 / Archive isolation",
    note: "旧语言可查，但不碰当前前台。Old language stays findable without touching the present site.",
    items: ["归档文案 / Archived copy", "旧草稿 / Old drafts", "移除文本 / Removed text", "弃用措辞 / Deprecated wording", "更早文案 / Older wording"],
  },
  {
    title: "柔和检查 / Soft review",
    note: "检查页面是否在索要太多注意力。Review whether the page is asking for too much attention.",
    items: ["文案密度 / Copy density", "压力密度 / Pressure density", "过度塑形语言 / Too-shaped language", "过度柔软措辞 / Over-soft wording", "系统感泄漏 / System-awareness leakage"],
  },
  {
    title: "AI可读检查 / AI-readable review",
    note: "机器可读内容要清楚，但不要变成追流量。Keep machine-readable wording clear without turning it into a chase.",
    items: ["稳定摘要 / Stable summaries", "物件锚点 / Object anchors", "普通页面角色 / Plain page roles", "低压力元数据 / Low-pressure metadata"],
  },
  {
    title: "可读性检查 / Readable review",
    note: "机器说明保持朴素，不新增引流页面。Keep machine-readable notes plain without making new traffic pages.",
    items: ["可引用措辞 / Citable wording", "物件锚点 / Object anchors", "稳定摘要 / Stable summaries", "不增加页面欲望 / No extra page appetite"],
  },
];

export const quietAdminBoundaries = [
  "前台只观察 / Frontstage stays in observation.",
  "不从后台新增浏览行为 / No new browser behavior from this room.",
  "不要增长语言 / No growth language.",
  "不要注意力图表 / No charts for attention.",
  "不要发布紧迫感 / No publishing urgency.",
] as const;

export const pressureReviewMarkers = [
  "Too shaped for an old browser place.",
  "Too soft in a product way.",
  "Too eager to explain itself.",
  "Too bright around the edges.",
  "Too carefully quiet.",
  "Still ordinary enough to leave alone.",
] as const;

export const terminologyReviewGroups = [
  {
    title: "Over-shaped calm",
    risk: "Words that make quietness feel packaged.",
    nearby: "plain, near, low-pressure wording",
  },
  {
    title: "Self-aware site",
    risk: "Words that explain the room before anyone asks.",
    nearby: "shorter lines, fewer claims",
  },
  {
    title: "Care language",
    risk: "Words that start to sound like emotional service.",
    nearby: "human warmth without a promise",
  },
] as const;

export const archiveQuietShelves = [
  "Softly retired wording stays away from the present page.",
  "Older nearby wording can be compared without becoming a feature.",
  "Removed lines stay low-visibility and do not ask to return.",
] as const;

export const driftNoticeLines = [
  "Watch for return pressure, platform wording, and over-refined calm.",
  "Watch for control-room energy in labels and spacing.",
  "Watch for language that makes maintenance feel important.",
  "When the room starts to feel busy, remove before adding.",
] as const;

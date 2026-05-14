"use client";

import { useMemo, useState } from "react";
import { locales, localeDefinitions } from "@/config/locales";
import { siteConfig } from "@/config/site";

const t = {
  adminSystem: "\u540e\u53f0\u7cfb\u7edf",
  media: "\u7d20\u6750\u4e2d\u5fc3",
  ai: "AI \u8fd0\u8425",
  commerce: "\u5546\u54c1\u4e0e\u8ba2\u5355",
  logistics: "\u7269\u6d41\u7ba1\u7406",
  supply: "\u4f9b\u5e94\u94fe\u7ba1\u7406",
  member: "\u4f1a\u5458\u4e2d\u5fc3",
  risk: "\u4f1a\u5458\u98ce\u63a7",
  client: "\u5ba2\u6237\u7aef\u540e\u53f0",
  frontstage: "\u524d\u53f0\u8fd0\u8425",
  windkeep: "\u7269\u4ef6\u6d41\u8f6c",
  driftbox: "\u5b89\u9759\u6765\u4fe1",
  rules: "\u89c4\u5219\u4e2d\u5fc3",
  upload: "\u4e0a\u4f20\u89c4\u8303",
  aiStatus: "AI \u72b6\u6001",
  ruleBinding: "\u89c4\u5219\u7ed1\u5b9a",
  localeGeo: "\u8bed\u8a00\u4e0e\u5730\u533a",
  quick: "\u79fb\u52a8\u5feb\u6377",
  assetGovernance: "\u7d20\u6750\u6cbb\u7406",
  noCrop: "\u7981\u6b62\u88c1\u5207",
  threeLevels: "\u4e09\u7ea7\u4ee5\u5185",
} as const;

type WorkspaceId =
  | "overview"
  | "objects"
  | "orders"
  | "payments"
  | "homepage-runtime"
  | "section-runtime"
  | "navigation-runtime"
  | "frontstage-visual"
  | "homepage-rotation"
  | "publishing-runtime"
  | "global-locale-runtime"
  | "quiet-analytics"
  | "frontstage-safe-area"
  | "atmosphere-governance"
  | "ai-queue"
  | "ai-image"
  | "ai-video"
  | "geo"
  | "viral-radar"
  | "logistics"
  | "tracking"
  | "freight"
  | "returns"
  | "suppliers"
  | "inventory"
  | "procurement"
  | "costs"
  | "brand-assets"
  | "product-media"
  | "social-media"
  | "prompt-packs"
  | "safe-area"
  | "member-center"
  | "member-risk-control"
  | "client-runtime"
  | "windkeep"
  | "driftbox"
  | "rules-binding"
  | "locale-geo";

type Workspace = {
  id: WorkspaceId;
  cn: string;
  en: string;
  state: string;
  work: readonly string[];
  ai?: readonly string[];
  mobile?: readonly string[];
};

const workspaceMap = {
  overview: {
    id: "overview",
    cn: t.adminSystem,
    en: "Operating Overview",
    state: "Runtime workspace active",
    work: ["Workspace switch", "Module status", "Rules binding", "Mobile essentials", "AI lanes", "Asset governance"],
  },
  objects: {
    id: "objects",
    cn: "\u5546\u54c1\u7cfb\u7edf",
    en: "Objects Runtime",
    state: "Commerce shell",
    work: ["Object list", "Product cards", "Wishlist state", "Filtering", "Sorting", "Review queue"],
  },
  orders: {
    id: "orders",
    cn: "\u8ba2\u5355\u7cfb\u7edf",
    en: "Orders Runtime",
    state: "Operations shell",
    work: ["Order list", "Payment status", "Fulfillment status", "Support notes", "Returns", "Export"],
  },
  payments: {
    id: "payments",
    cn: "\u652f\u4ed8\u7ba1\u7406",
    en: "Payments Runtime",
    state: "Provider-ready shell",
    work: ["Provider status", "Refunds", "Region rules", "Risk link", "Reconciliation", "Exception queue"],
  },
  "homepage-runtime": {
    id: "homepage-runtime",
    cn: "\u9996\u9875\u8fd0\u8425",
    en: "Homepage Runtime",
    state: "Frontstage civilization layer",
    work: ["Hero", "Ways to Begin", "Healing World", "Windkeep", "Moments", "Energy Field", "Quiet Extracts", "PC / Mobile"],
  },
  "section-runtime": {
    id: "section-runtime",
    cn: "\u533a\u5757\u8fd0\u8425",
    en: "Section Runtime",
    state: "Module operations",
    work: ["Hero", "Product Grid", "Editorial", "Healing", "Windkeep", "Driftbox"],
  },
  "navigation-runtime": {
    id: "navigation-runtime",
    cn: "\u5bfc\u822a\u8fd0\u8425",
    en: "Navigation Runtime",
    state: "Route visibility shell",
    work: ["Header", "Footer", "Mobile Nav", "Route Visibility", "Menu order", "Published route"],
  },
  "frontstage-visual": {
    id: "frontstage-visual",
    cn: "\u524d\u53f0\u89c6\u89c9",
    en: "Frontstage Visual Runtime",
    state: "Browser Air visual control",
    work: ["Banner", "Hero", "Typography", "Theme", "Atmosphere", "Motion"],
  },
  "homepage-rotation": {
    id: "homepage-rotation",
    cn: "\u9996\u9875\u8f6e\u6362",
    en: "Homepage Rotation Runtime",
    state: "Seasonal layer reserved",
    work: ["Hero rotation", "Seasonal Layer", "Holiday climate", "Temporary Atmosphere", "Schedule", "Rollback"],
  },
  "publishing-runtime": {
    id: "publishing-runtime",
    cn: "\u53d1\u5e03\u8fd0\u884c",
    en: "Publishing Runtime",
    state: "Production workflow",
    work: ["Draft", "Preview", "Publish", "Schedule", "Rollback", "Publish log"],
  },
  "global-locale-runtime": {
    id: "global-locale-runtime",
    cn: "\u5168\u7403\u8bed\u8a00",
    en: "Global Locale Runtime",
    state: "Locale operations",
    work: ["Translations", "GEO adaptation", "Route locale", "Metadata", "Canonical", "Hreflang"],
  },
  "quiet-analytics": {
    id: "quiet-analytics",
    cn: "\u5b89\u9759\u5206\u6790",
    en: "Quiet Analytics",
    state: "Low-pressure analytics",
    work: ["Page health", "Stay rhythm", "Section view", "Device split", "Error trace", "No growth hacking"],
  },
  "frontstage-safe-area": {
    id: "frontstage-safe-area",
    cn: "\u524d\u53f0\u5b89\u5168\u533a",
    en: "Safe Area Runtime",
    state: "Live preview reserved",
    work: ["PC preview", "Mobile preview", "Hero", "Banner", "Product", "Windkeep"],
  },
  "atmosphere-governance": {
    id: "atmosphere-governance",
    cn: "\u6c14\u5019\u6cbb\u7406",
    en: "Atmosphere Governance",
    state: "Quiet climate control",
    work: ["Wind feeling", "Motion", "Quiet Level", "Seasonal Tone", "Page breathing", "Browser Air"],
  },
  "ai-queue": {
    id: "ai-queue",
    cn: "AI \u961f\u5217",
    en: "AI Queue Runtime",
    state: "Queue reserved",
    work: ["Queue", "Status", "Tokens", "Cost", "Errors", "Retry"],
    ai: ["Asset Review", "Product Draft", "Logistics Routing", "Inventory Forecast", "Risk Score", "Fraud Prediction", "Failed Retry"],
  },
  "ai-image": {
    id: "ai-image",
    cn: "AI \u56fe\u50cf",
    en: "AI Image Runtime",
    state: "Reserved",
    work: ["Prompt packs", "Image tasks", "Asset review", "Version notes", "Safe area check", "Failure retry"],
  },
  "ai-video": {
    id: "ai-video",
    cn: "AI \u89c6\u9891",
    en: "AI Video Runtime",
    state: "Reserved",
    work: ["Video tasks", "Scene prompts", "Cost logs", "Status", "Failure retry", "Platform export"],
  },
  geo: {
    id: "geo",
    cn: "GEO",
    en: "Region Runtime",
    state: "Reserved",
    work: ["Region access", "Currency rules", "Shipping region", "Compliance note", "Locale link", "Provider state"],
  },
  "viral-radar": {
    id: "viral-radar",
    cn: "\u8f7b\u4f20\u64ad\u89c2\u6d4b",
    en: "Viral Radar",
    state: "Reserved only",
    work: ["Signal capture", "Channel notes", "No spam", "No forced sharing", "Campaign review", "Soft growth"],
  },
  logistics: {
    id: "logistics",
    cn: t.logistics,
    en: "Logistics Runtime",
    state: "API-ready shell",
    work: ["Tracking input", "Carrier selection", "Shipment status", "Return logistics", "Batch status", "Freight rules"],
    ai: ["DHL", "UPS", "SF Express", "Overseas warehouse", "AI routing", "AI freight calculation", "Auto tracking sync"],
    mobile: ["Tracking input", "Quick status", "Exception handling", "Progress view"],
  },
  tracking: {
    id: "tracking",
    cn: "\u8f68\u8ff9\u67e5\u770b",
    en: "Tracking Runtime",
    state: "Lightweight phase",
    work: ["Tracking number", "Carrier trace", "Status sync", "Exception flag", "Customer notice", "Manual update"],
  },
  freight: {
    id: "freight",
    cn: "\u8fd0\u8d39\u89c4\u5219",
    en: "Freight Runtime",
    state: "Rule shell",
    work: ["Region table", "Weight band", "Carrier option", "Base fee", "Exception rule", "AI calculator hook"],
  },
  returns: {
    id: "returns",
    cn: "\u9000\u8d27\u7269\u6d41",
    en: "Returns Runtime",
    state: "Support shell",
    work: ["Return request", "Return label", "Inspection note", "Refund link", "Exception state", "Human support"],
  },
  suppliers: {
    id: "suppliers",
    cn: "\u4f9b\u5e94\u5546",
    en: "Suppliers Runtime",
    state: "Lightweight phase",
    work: ["Supplier profiles", "Contact", "Capability", "Lead time", "Score", "Notes"],
  },
  inventory: {
    id: "inventory",
    cn: "\u5e93\u5b58\u7ba1\u7406",
    en: "Inventory Runtime",
    state: "AI forecast reserved",
    work: ["Manual inventory", "Warnings", "Stock count", "Reserved stock", "Object link", "AI forecast"],
  },
  procurement: {
    id: "procurement",
    cn: "\u91c7\u8d2d\u8bb0\u5f55",
    en: "Procurement Runtime",
    state: "Record shell",
    work: ["Purchase records", "Supplier link", "Arrival status", "Cost input", "Margin link", "AI replenishment"],
  },
  costs: {
    id: "costs",
    cn: "\u6210\u672c\u8bb0\u5f55",
    en: "Costs Runtime",
    state: "Analysis reserved",
    work: ["Cost records", "Shipping cost", "Packaging cost", "Margin", "Supplier compare", "Auto reconciliation"],
  },
  "brand-assets": {
    id: "brand-assets",
    cn: "\u54c1\u724c\u8d44\u4ea7",
    en: "Brand Assets",
    state: "Visual governance",
    work: ["Logo", "Marks", "Hero assets", "Guides", "Versions", "Usage"],
  },
  "product-media": {
    id: "product-media",
    cn: "\u5546\u54c1\u7d20\u6750",
    en: "Product Media",
    state: "No browser crop",
    work: ["Product images", "Product video", "Gallery", "Alt text", "Version", "Usage"],
  },
  "social-media": {
    id: "social-media",
    cn: "\u793e\u5a92\u7d20\u6750",
    en: "Social Media",
    state: "Template reserved",
    work: ["Channel assets", "Post templates", "Export states", "Copy", "Review", "Version"],
  },
  "prompt-packs": {
    id: "prompt-packs",
    cn: "\u63d0\u793a\u8bcd\u5305",
    en: "Prompt Packs",
    state: "AI ready",
    work: ["Image prompts", "Video prompts", "Copy prompts", "Rules", "Versions", "Failures"],
  },
  "safe-area": {
    id: "safe-area",
    cn: "\u5b89\u5168\u533a",
    en: "Safe Area",
    state: "Upload discipline",
    work: ["PC size", "Mobile size", "Ratio", "Safe area", "Max MB", "Format"],
  },
  "member-center": {
    id: "member-center",
    cn: t.member,
    en: "Member Center",
    state: "Trust layer reserved",
    work: ["Member profiles", "Verification status", "Credit score", "Member level", "Notifications", "Access review"],
  },
  "member-risk-control": {
    id: "member-risk-control",
    cn: t.risk,
    en: "Member Risk Control",
    state: "Backend-only trust infrastructure",
    work: ["Identity review", "Behavior detection", "Credit score runtime", "Rule configuration", "Audit logs", "Export"],
    ai: ["AI anomaly detection", "AI risk scoring", "AI fraud prediction", "AI restriction strategy", "Device fingerprinting", "Automated risk scoring"],
    mobile: ["Pending reviews", "Quick approve / reject", "Risk alerts", "Large transaction alerts"],
  },
  "client-runtime": {
    id: "client-runtime",
    cn: t.client,
    en: "Human Runtime Layer",
    state: "Client shell reserved",
    work: ["Dashboard", "My Objects", "My Orders", "Membership", "Driftbox", "My AI", "Settings"],
    ai: ["My AI runtime", "Sharing points reserved", "Verification status", "Notifications", "Logistics loop", "Membership loop"],
    mobile: ["Orders", "Objects", "Membership", "Driftbox", "Verification status"],
  },
  windkeep: {
    id: "windkeep",
    cn: t.windkeep,
    en: "Windkeep Continuity",
    state: "Rules linked",
    work: ["Passing Things", "Quiet Receiving", "Drift Notes", "Continuation Requests", "Risk link", "Object memory"],
  },
  driftbox: {
    id: "driftbox",
    cn: t.driftbox,
    en: "Driftbox Correspondence",
    state: "Moderation shell",
    work: ["Messages", "Human replies", "Archives", "Continuation mail", "Notifications", "Safety"],
  },
  "rules-binding": {
    id: "rules-binding",
    cn: t.rules,
    en: "Help & Rules Binding",
    state: "Binding layer",
    work: ["Windkeep", "Driftbox", "Payments", "AI", "Member", "Risk Control", "Client Runtime", "Orders", "Logistics", "Supply Chain"],
  },
  "locale-geo": {
    id: "locale-geo",
    cn: t.localeGeo,
    en: "Locale & GEO Layer",
    state: "14 locale routes",
    work: ["Locale routing", "Metadata", "Canonical", "Hreflang", "Open Graph", "Region rule"],
  },
} satisfies Record<WorkspaceId, Workspace>;

const navGroups = [
  {
    id: "frontstage",
    icon: "FR",
    cn: t.frontstage,
    en: "Frontstage Runtime",
    items: ["homepage-runtime", "section-runtime", "navigation-runtime", "frontstage-visual", "homepage-rotation", "publishing-runtime", "global-locale-runtime", "quiet-analytics", "frontstage-safe-area", "atmosphere-governance"] satisfies WorkspaceId[],
  },
  {
    id: "commerce",
    icon: "CO",
    cn: t.commerce,
    en: "Commerce",
    items: ["objects", "orders", "payments"] satisfies WorkspaceId[],
  },
  {
    id: "ai",
    icon: "AI",
    cn: t.ai,
    en: "AI Operations",
    items: ["ai-queue", "ai-image", "ai-video", "geo", "viral-radar"] satisfies WorkspaceId[],
  },
  {
    id: "logistics",
    icon: "LG",
    cn: t.logistics,
    en: "Logistics",
    items: ["logistics", "tracking", "freight", "returns"] satisfies WorkspaceId[],
  },
  {
    id: "supply",
    icon: "SC",
    cn: t.supply,
    en: "Supply Chain",
    items: ["suppliers", "inventory", "procurement", "costs"] satisfies WorkspaceId[],
  },
  {
    id: "media",
    icon: "MA",
    cn: t.media,
    en: "Media Assets",
    items: ["brand-assets", "product-media", "social-media", "prompt-packs", "safe-area"] satisfies WorkspaceId[],
  },
  {
    id: "member",
    icon: "MB",
    cn: t.member,
    en: "Member",
    items: ["member-center", "member-risk-control", "client-runtime"] satisfies WorkspaceId[],
  },
  {
    id: "world",
    icon: "WR",
    cn: "\u6587\u660e\u8fd0\u884c",
    en: "World Runtime",
    items: ["windkeep", "driftbox", "rules-binding", "locale-geo"] satisfies WorkspaceId[],
  },
] as const;

const uploadSpecs = [
  ["\u9996\u9875\u89c6\u89c9", "Homepage Visuals", "PC + Mobile exported section artwork", "Use source ratio only", "Text and key object inside exported artwork", "PNG / JPG / WEBP, max 8 MB"],
  ["\u5546\u54c1\u56fe", "Product Images", "Product gallery source", "Natural product ratio", "No browser crop; object centered by source", "PNG / JPG / WEBP, max 6 MB"],
  ["\u7269\u6d41\u51ed\u8bc1", "Logistics Proof", "Label / invoice / carrier file", "Document source ratio", "Tracking code and recipient fields visible", "PNG / JPG / PDF / WEBP, max 10 MB"],
] as const;

const ruleBindings = [
  ["Windkeep", "Object continuity / Continuation request / Quiet receiving"],
  ["Driftbox", "Human reply / Archive / No support-feed behavior"],
  ["Payments", "Refund / Return / Region compliance / Provider review"],
  ["AI", "Queue / Token / Cost / Error / Retry"],
  ["Member", "Access / Locale / Privacy / Permission / Verification status"],
  ["Member Risk Control", "Identity verification / Behavior flag / Credit score / Restriction / Audit"],
  ["Client Runtime", "Dashboard / My Objects / Orders / Membership / Driftbox / My AI / Settings"],
  ["Orders", "Shipping / Packaging / Human support / Exception handling"],
  ["Logistics", "Tracking / Carrier / Return / Freight / API-ready expansion"],
  ["Supply Chain", "Supplier / Inventory / Procurement / Cost / AI forecast"],
] as const;

function StatusPill({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <span className="rounded-full border border-[#8d7446]/55 bg-[#20180d] px-3 py-1 text-xs text-[#d8bd78]">
      {children}
    </span>
  );
}

function RuntimeCard({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="rounded-2xl border border-[#3b2c18] bg-[#100d09] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
      {children}
    </div>
  );
}

function WorkspacePanel({ workspace }: Readonly<{ workspace: Workspace }>) {
  return (
    <div className="grid gap-5">
      <section className="rounded-3xl border border-[#3b2c18] bg-[#100d09] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.34)] sm:p-6">
        <div className="flex flex-col gap-4 border-b border-[#2d2214] pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-[#9f8a60]">{workspace.en}</p>
            <h2 className="mt-2 text-4xl font-semibold leading-tight text-[#f3db9b]">{workspace.cn}</h2>
          </div>
          <StatusPill>{workspace.state}</StatusPill>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4">
          {workspace.work.map((work) => (
            <button key={work} type="button" className="rounded-xl border border-[#3b2c18] bg-[#0b0907] px-3 py-3 text-left text-sm text-[#d8c48d] hover:border-[#8d7446]/55">
              {work}
            </button>
          ))}
        </div>

        {workspace.ai ? (
          <RuntimeCard>
            <p className="text-sm text-[#9f8a60]">AI Runtime Extension</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {workspace.ai.map((item) => (
                <StatusPill key={item}>{item}</StatusPill>
              ))}
            </div>
          </RuntimeCard>
        ) : null}

        {workspace.mobile ? (
          <RuntimeCard>
            <p className="text-sm text-[#9f8a60]">{t.quick} / Mobile high-frequency only</p>
            <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
              {workspace.mobile.map((item) => (
                <span key={item} className="text-sm text-[#cbb477]">{item}</span>
              ))}
            </div>
          </RuntimeCard>
        ) : null}
      </section>
    </div>
  );
}

function OverviewWorkspace() {
  return (
    <div className="grid gap-5">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          [t.assetGovernance, "Visual Governance", "12 asset domains"],
          ["AI \u961f\u5217", "AI Queue", "7 reserved lanes"],
          [t.logistics, "Fulfillment Runtime", "API-ready shell"],
          [t.risk, "Trust Infrastructure", "Backend-only runtime"],
          [t.client, "Human Runtime", "Client shell reserved"],
        ].map(([cn, en, value]) => (
          <RuntimeCard key={cn}>
            <p className="text-3xl font-semibold text-[#e7d19a]">{cn}</p>
            <p className="mt-1 text-sm text-[#9f8a60]">{en}</p>
            <p className="mt-6 text-xl text-[#f1e7cf]">{value}</p>
          </RuntimeCard>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <RuntimeCard>
          <h3 className="text-2xl font-semibold text-[#e7d19a]">{t.upload}</h3>
          <div className="mt-4 grid gap-3">
            {uploadSpecs.map(([cn, en, size, ratio, safe, limits]) => (
              <article key={en} className="rounded-xl border border-[#2d2214] bg-[#0b0907] p-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h4 className="text-xl font-semibold text-[#e7d19a]">{cn}</h4>
                  <p className="text-sm text-[#9f8a60]">{en}</p>
                </div>
                <dl className="mt-4 grid gap-2 text-sm text-[#cbb477] sm:grid-cols-2">
                  <div><dt className="text-[#7f704f]">Size</dt><dd>{size}</dd></div>
                  <div><dt className="text-[#7f704f]">Ratio</dt><dd>{ratio}</dd></div>
                  <div><dt className="text-[#7f704f]">Safe Area</dt><dd>{safe}</dd></div>
                  <div><dt className="text-[#7f704f]">Limits</dt><dd>{limits}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </RuntimeCard>

        <RuntimeCard>
          <h3 className="text-2xl font-semibold text-[#e7d19a]">{t.ruleBinding}</h3>
          <div className="mt-4 grid gap-3">
            {ruleBindings.map(([area, rule]) => (
              <div key={area} className="rounded-xl border border-[#2d2214] bg-[#0b0907] p-4">
                <p className="text-xl font-semibold text-[#e7d19a]">{area}</p>
                <p className="mt-2 text-sm leading-6 text-[#cbb477]">{rule}</p>
              </div>
            ))}
          </div>
        </RuntimeCard>
      </section>
    </div>
  );
}

function LocaleWorkspace() {
  return (
    <RuntimeCard>
      <h3 className="text-2xl font-semibold text-[#e7d19a]">{t.localeGeo}</h3>
      <p className="mt-1 text-sm text-[#9f8a60]">Locale routing, canonical localization, hreflang, and region readiness.</p>
      <div className="mt-5 max-h-[32rem] overflow-auto rounded-xl border border-[#2d2214]">
        <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
          <thead className="bg-[#0b0907] text-[#9f8a60]">
            <tr>
              <th className="border-b border-[#2d2214] px-3 py-3">Route</th>
              <th className="border-b border-[#2d2214] px-3 py-3">Language</th>
              <th className="border-b border-[#2d2214] px-3 py-3">Direction</th>
              <th className="border-b border-[#2d2214] px-3 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {locales.map((locale) => {
              const definition = localeDefinitions[locale];
              return (
                <tr key={locale}>
                  <td className="border-b border-[#1e170f] px-3 py-3 font-mono text-[#e7d19a]">/{locale}</td>
                  <td className="border-b border-[#1e170f] px-3 py-3 text-[#cbb477]">{definition.label}</td>
                  <td className="border-b border-[#1e170f] px-3 py-3 text-[#cbb477]">{definition.dir.toUpperCase()}</td>
                  <td className="border-b border-[#1e170f] px-3 py-3 text-[#9f8a60]">Reserved</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </RuntimeCard>
  );
}

export function AdminOSConsole() {
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceId>("overview");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(navGroups.map((group) => [group.id, true])),
  );

  const workspace = workspaceMap[activeWorkspace];
  const activeGroup = useMemo(
    () => navGroups.find((group) => (group.items as readonly WorkspaceId[]).includes(activeWorkspace)),
    [activeWorkspace],
  );

  return (
    <main className="min-h-screen bg-[#070605] text-[#f1e7cf]">
      <div className="grid min-h-screen lg:grid-cols-[20rem_1fr]">
        <aside className="border-b border-[#2d2214] bg-[#0b0907] lg:border-r lg:border-b-0">
          <div className="border-b border-[#2d2214] px-5 py-5">
            <p className="text-2xl font-semibold leading-tight text-[#e7d19a]">{t.adminSystem}</p>
            <p className="mt-1 text-sm text-[#9f8a60]">Admin OS</p>
            <p className="mt-4 text-sm leading-6 text-[#b9a878]">{siteConfig.siteName}</p>
            <button
              type="button"
              onClick={() => setActiveWorkspace("overview")}
              className={`mt-5 w-full rounded-xl border px-3 py-3 text-left text-sm ${activeWorkspace === "overview" ? "border-[#8d7446] bg-[#20180d] text-[#f3db9b]" : "border-[#3b2c18] bg-[#100d09] text-[#cbb477]"}`}
            >
              Runtime Overview
            </button>
          </div>

          <nav className="max-h-[calc(100vh-10rem)] overflow-auto px-3 py-4" aria-label="Admin OS workspace navigation">
            {navGroups.map((group) => {
              const isOpen = openGroups[group.id];
              const isActiveGroup = activeGroup?.id === group.id;
              return (
                <div key={group.id} className="mb-2">
                  <button
                    type="button"
                    onClick={() => setOpenGroups((current) => ({ ...current, [group.id]: !current[group.id] }))}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${isActiveGroup ? "border-[#8d7446]/70 bg-[#171107]" : "border-transparent hover:border-[#3b2c18] hover:bg-[#100d09]"}`}
                    aria-expanded={isOpen}
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-[#4b381f] bg-[#100d09] text-xs font-semibold text-[#d8bd78]">{group.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg leading-tight text-[#e7d19a]">{group.cn}</span>
                      <span className="block truncate text-xs text-[#7f704f]">{group.en}</span>
                    </span>
                    <span className="text-[#9f8a60]">{isOpen ? "-" : "+"}</span>
                  </button>

                  {isOpen ? (
                    <div className="mt-1 grid gap-1 pl-12">
                      {group.items.map((id) => {
                        const item = workspaceMap[id];
                        const isActive = id === activeWorkspace;
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setActiveWorkspace(id)}
                            className={`rounded-lg border px-3 py-2 text-left text-sm transition ${isActive ? "border-[#8d7446] bg-[#20180d] text-[#f3db9b]" : "border-transparent text-[#b9a878] hover:border-[#3b2c18] hover:bg-[#100d09]"}`}
                          >
                            <span className="block">{item.cn}</span>
                            <span className="mt-0.5 block text-xs text-[#7f704f]">{item.en}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
        </aside>

        <section className="flex min-h-screen min-w-0 flex-col">
          <header className="sticky top-0 z-10 border-b border-[#2d2214] bg-[#070605]/96 px-4 py-4 backdrop-blur lg:px-7">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-sm text-[#9f8a60]">Runtime Workspace Architecture</p>
                <h1 className="mt-1 text-3xl font-semibold leading-tight text-[#f3db9b] sm:text-4xl">{workspace.en}</h1>
                <p className="mt-1 text-sm text-[#b9a878]">{workspace.cn} / {workspace.state}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusPill>{t.threeLevels} / 3 levels max</StatusPill>
                <StatusPill>{t.noCrop} / no browser crop</StatusPill>
                <StatusPill>Workspace switch</StatusPill>
              </div>
            </div>
          </header>

          <div className="min-h-0 flex-1 overflow-auto px-4 py-5 lg:px-7">
            {activeWorkspace === "overview" ? <OverviewWorkspace /> : activeWorkspace === "locale-geo" ? <LocaleWorkspace /> : <WorkspacePanel workspace={workspace} />}
          </div>
        </section>
      </div>
    </main>
  );
}

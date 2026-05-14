import { locales, localeDefinitions } from "@/config/locales";
import { siteConfig } from "@/config/site";

const t = {
  adminSystem: "\u540e\u53f0\u7cfb\u7edf",
  media: "\u7d20\u6750\u4e2d\u5fc3",
  ai: "AI \u8fd0\u8425",
  commerce: "\u5546\u54c1\u4e0e\u8ba2\u5355",
  logistics: "\u7269\u6d41\u7ba1\u7406",
  supply: "\u4f9b\u5e94\u94fe\u7ba1\u7406",
  windkeep: "\u7269\u4ef6\u6d41\u8f6c",
  driftbox: "\u5b89\u9759\u6765\u4fe1",
  rules: "\u89c4\u5219\u4e2d\u5fc3",
  upload: "\u4e0a\u4f20\u89c4\u8303",
  aiStatus: "AI \u72b6\u6001",
  ruleBinding: "\u89c4\u5219\u7ed1\u5b9a",
  localeGeo: "\u8bed\u8a00\u4e0e\u5730\u533a",
  quick: "\u79fb\u52a8\u5feb\u6377",
  assetGovernance: "\u7d20\u6750\u6cbb\u7406",
  aiQueue: "AI \u961f\u5217",
  noCrop: "\u7981\u6b62\u88c1\u5207",
  threeLevels: "\u4e09\u7ea7\u4ee5\u5185",
} as const;

const adminModules = [
  {
    id: "media-assets",
    cn: t.media,
    en: "Media Assets Center",
    state: "Phase 2 ready",
    work: ["Brand assets", "Enterprise UI", "Product images", "Product videos", "Social content", "Prompt packs"],
  },
  {
    id: "ai-operations",
    cn: t.ai,
    en: "AI Operations Runtime",
    state: "Queue reserved",
    work: ["Queue", "Status", "Tokens", "Cost", "Errors", "Retry"],
  },
  {
    id: "commerce",
    cn: t.commerce,
    en: "Commerce Operations",
    state: "Runtime shell",
    work: ["Objects", "Orders", "Payments", "GEO", "Packaging", "Reviews"],
  },
  {
    id: "logistics",
    cn: t.logistics,
    en: "Logistics Runtime",
    state: "API-ready shell",
    work: ["Tracking input", "Carrier selection", "Shipment status", "Return logistics", "Batch status", "Freight rules"],
    ai: ["DHL", "UPS", "SF Express", "Overseas warehouse", "AI routing", "AI freight calculation", "Auto tracking sync"],
    mobile: ["Tracking input", "Quick status", "Exception handling", "Progress view"],
  },
  {
    id: "supply-chain",
    cn: t.supply,
    en: "Supply Chain Runtime",
    state: "Lightweight phase",
    work: ["Supplier profiles", "Manual inventory", "Inventory warnings", "Procurement records", "Cost records"],
    ai: ["AI replenishment", "AI procurement", "Inventory forecast", "Margin analysis", "Supplier scoring", "Auto reconciliation"],
    mobile: ["Supplier list", "Inventory warnings", "Quick input", "Cost overview"],
  },
  {
    id: "windkeep",
    cn: t.windkeep,
    en: "Windkeep Continuity",
    state: "Rules linked",
    work: ["Passing Things", "Quiet Receiving", "Drift Notes", "Continuation Requests"],
  },
  {
    id: "driftbox",
    cn: t.driftbox,
    en: "Driftbox Correspondence",
    state: "Moderation shell",
    work: ["Messages", "Human replies", "Archives", "Continuation mail"],
  },
  {
    id: "help-rules",
    cn: t.rules,
    en: "Help & Rules",
    state: "Binding layer",
    work: ["Windkeep", "Driftbox", "Payments", "AI", "Member", "Orders", "Logistics", "Supply Chain"],
  },
] as const;

const uploadSpecs = [
  {
    cn: "\u9996\u9875\u89c6\u89c9",
    en: "Homepage Visuals",
    desktop: "PC: exported section artwork",
    mobile: "Mobile: dedicated mobile artwork",
    ratio: "Use source ratio only",
    safe: "Safe area: text and key object inside exported artwork",
    limit: "Max 8 MB",
    formats: "PNG / JPG / WEBP",
  },
  {
    cn: "\u5546\u54c1\u56fe",
    en: "Product Images",
    desktop: "PC: product gallery source",
    mobile: "Mobile: product gallery source",
    ratio: "Natural product ratio",
    safe: "Safe area: no browser crop; object centered by source",
    limit: "Max 6 MB",
    formats: "PNG / JPG / WEBP",
  },
  {
    cn: "\u7269\u6d41\u51ed\u8bc1",
    en: "Logistics Proof",
    desktop: "PC: label / invoice / carrier file",
    mobile: "Mobile: quick proof capture",
    ratio: "Document source ratio",
    safe: "Safe area: tracking code and recipient fields visible",
    limit: "Max 10 MB",
    formats: "PNG / JPG / PDF / WEBP",
  },
] as const;

const aiQueues = [
  { cn: "\u7d20\u6750\u68c0\u67e5", en: "Asset Review", status: "Idle", tokens: "0", cost: "$0.00", errors: "0" },
  { cn: "\u5546\u54c1\u8349\u7a3f", en: "Product Draft", status: "Ready", tokens: "0", cost: "$0.00", errors: "0" },
  { cn: "\u7269\u6d41\u8def\u7531", en: "Logistics Routing", status: "Reserved", tokens: "0", cost: "$0.00", errors: "0" },
  { cn: "\u5e93\u5b58\u9884\u6d4b", en: "Inventory Forecast", status: "Reserved", tokens: "0", cost: "$0.00", errors: "0" },
  { cn: "\u5931\u8d25\u91cd\u8dd1", en: "Failed Retry", status: "Reserved", tokens: "0", cost: "$0.00", errors: "0" },
] as const;

const ruleBindings = [
  ["Windkeep", "Object continuity / Continuation request / Quiet receiving"],
  ["Driftbox", "Human reply / Archive / No support-feed behavior"],
  ["Payments", "Refund / Return / Region compliance / Provider review"],
  ["AI", "Queue / Token / Cost / Error / Retry"],
  ["Member", "Access / Locale / Privacy / Permission"],
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

function Panel({ id, cn, en, children }: Readonly<{ id: string; cn: string; en: string; children: React.ReactNode }>) {
  return (
    <section id={id} className="rounded-2xl border border-[#3b2c18] bg-[#100d09] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.34)]">
      <div className="border-b border-[#2d2214] pb-4">
        <p className="text-2xl font-semibold leading-tight text-[#e7d19a]">{cn}</p>
        <p className="mt-1 text-sm text-[#9f8a60]">{en}</p>
      </div>
      <div className="pt-4">{children}</div>
    </section>
  );
}

export function AdminOSConsole() {
  return (
    <main className="min-h-screen bg-[#070605] text-[#f1e7cf]">
      <div className="mx-auto grid min-h-screen w-full max-w-[96rem] lg:grid-cols-[18rem_1fr]">
        <aside className="hidden border-r border-[#2d2214] bg-[#0b0907] px-5 py-6 lg:block">
          <div className="border-b border-[#2d2214] pb-5">
            <p className="text-2xl font-semibold leading-tight text-[#e7d19a]">{t.adminSystem}</p>
            <p className="mt-1 text-sm text-[#9f8a60]">Admin OS</p>
            <p className="mt-5 text-sm leading-7 text-[#b9a878]">{siteConfig.siteName}</p>
          </div>
          <nav className="mt-6 grid gap-2" aria-label="Admin OS navigation">
            {adminModules.map((module) => (
              <a key={module.id} href={`#${module.id}`} className="rounded-xl border border-transparent px-3 py-3 text-[#cbb477] hover:border-[#4b381f] hover:bg-[#130f0a]">
                <span className="block text-lg leading-tight">{module.cn}</span>
                <span className="mt-1 block text-xs text-[#7f704f]">{module.en}</span>
              </a>
            ))}
          </nav>
        </aside>

        <div>
          <header className="sticky top-0 z-10 border-b border-[#2d2214] bg-[#070605]/95 px-4 py-5 backdrop-blur lg:px-7">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-sm text-[#9f8a60]">Industrial Infrastructure Phase</p>
                <h1 className="mt-2 text-4xl font-semibold leading-tight text-[#f3db9b]">Reverent Inquiry Admin OS</h1>
                <p className="mt-2 max-w-3xl text-base leading-7 text-[#b9a878]">
                  AI Native Commerce Fulfillment Runtime with lightweight operations now and AI expansion later.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusPill>{t.threeLevels} / 3 levels max</StatusPill>
                <StatusPill>{t.noCrop} / no browser crop</StatusPill>
                <StatusPill>PC + Mobile assets</StatusPill>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 lg:px-7">
            <section id="mobile-quick" className="grid gap-3 md:grid-cols-2 xl:hidden">
              {adminModules.filter((module) => ["media-assets", "ai-operations", "logistics", "supply-chain"].includes(module.id)).map((module) => (
                <a key={module.id} href={`#${module.id}`} className="rounded-2xl border border-[#3b2c18] bg-[#100d09] p-4">
                  <p className="text-2xl font-semibold text-[#e7d19a]">{module.cn}</p>
                  <p className="mt-1 text-sm text-[#9f8a60]">{module.en}</p>
                  <p className="mt-4 text-xs text-[#b9a878]">{module.state}</p>
                </a>
              ))}
            </section>

            <section id="overview" className="mt-6 grid gap-4 md:grid-cols-2 xl:mt-0 xl:grid-cols-4">
              {[
                [t.assetGovernance, "Visual Governance", "12 asset domains"],
                [t.aiQueue, "AI Queue", "5 reserved lanes"],
                [t.logistics, "Fulfillment Runtime", "API-ready shell"],
                [t.supply, "Inventory Runtime", "AI forecast reserved"],
              ].map(([cn, en, value]) => (
                <div key={cn} className="rounded-2xl border border-[#3b2c18] bg-[#100d09] p-5">
                  <p className="text-3xl font-semibold text-[#e7d19a]">{cn}</p>
                  <p className="mt-1 text-sm text-[#9f8a60]">{en}</p>
                  <p className="mt-6 text-xl text-[#f1e7cf]">{value}</p>
                </div>
              ))}
            </section>

            <section className="mt-6 grid gap-4 xl:grid-cols-2">
              {adminModules.map((module) => (
                <Panel key={module.id} id={module.id} cn={module.cn} en={module.en}>
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <StatusPill>{module.state}</StatusPill>
                    <a href={`#rules-${module.id}`} className="text-sm text-[#d8bd78] underline-offset-4 hover:underline">
                      {t.rules} / Rules
                    </a>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {module.work.map((work) => (
                      <button key={work} type="button" className="rounded-xl border border-[#3b2c18] bg-[#0b0907] px-3 py-3 text-left text-sm text-[#d8c48d]">
                        {work}
                      </button>
                    ))}
                  </div>
                  {"ai" in module ? (
                    <div className="mt-4 rounded-xl border border-[#2d2214] bg-[#0b0907] p-4">
                      <p className="text-sm text-[#9f8a60]">AI Runtime Extension</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {module.ai.map((item) => (
                          <StatusPill key={item}>{item}</StatusPill>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {"mobile" in module ? (
                    <div className="mt-4 rounded-xl border border-[#2d2214] bg-[#0b0907] p-4">
                      <p className="text-sm text-[#9f8a60]">{t.quick} / Mobile high-frequency only</p>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {module.mobile.map((item) => (
                          <span key={item} className="text-sm text-[#cbb477]">{item}</span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </Panel>
              ))}
            </section>

            <section className="mt-6 grid gap-4 xl:grid-cols-[1fr_0.9fr]">
              <Panel id="asset-specs" cn={t.upload} en="Upload Requirements">
                <div className="grid gap-3">
                  {uploadSpecs.map((spec) => (
                    <article key={spec.cn} className="rounded-xl border border-[#2d2214] bg-[#0b0907] p-4">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="text-xl font-semibold text-[#e7d19a]">{spec.cn}</h3>
                        <p className="text-sm text-[#9f8a60]">{spec.en}</p>
                      </div>
                      <dl className="mt-4 grid gap-2 text-sm text-[#cbb477] sm:grid-cols-2">
                        <div><dt className="text-[#7f704f]">Size</dt><dd>{spec.desktop}</dd><dd>{spec.mobile}</dd></div>
                        <div><dt className="text-[#7f704f]">Ratio</dt><dd>{spec.ratio}</dd></div>
                        <div><dt className="text-[#7f704f]">Safe Area</dt><dd>{spec.safe}</dd></div>
                        <div><dt className="text-[#7f704f]">Limits</dt><dd>{spec.limit}</dd><dd>{spec.formats}</dd></div>
                      </dl>
                    </article>
                  ))}
                </div>
              </Panel>

              <Panel id="ai-runtime" cn={t.aiStatus} en="AI Operations Status">
                <div className="grid gap-3">
                  {aiQueues.map((queue) => (
                    <article key={queue.en} className="rounded-xl border border-[#2d2214] bg-[#0b0907] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xl font-semibold text-[#e7d19a]">{queue.cn}</p>
                          <p className="text-sm text-[#9f8a60]">{queue.en}</p>
                        </div>
                        <StatusPill>{queue.status}</StatusPill>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                        <p><span className="block text-[#7f704f]">Tokens</span>{queue.tokens}</p>
                        <p><span className="block text-[#7f704f]">Cost</span>{queue.cost}</p>
                        <p><span className="block text-[#7f704f]">Errors</span>{queue.errors}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </Panel>
            </section>

            <section className="mt-6 grid gap-4 xl:grid-cols-[0.9fr_1fr]">
              <Panel id="rules-binding" cn={t.ruleBinding} en="Help & Rules Binding">
                <div className="grid gap-3">
                  {ruleBindings.map(([area, rule]) => (
                    <div key={area} id={`rules-${area.toLowerCase().replaceAll(" ", "-")}`} className="rounded-xl border border-[#2d2214] bg-[#0b0907] p-4">
                      <p className="text-xl font-semibold text-[#e7d19a]">{area}</p>
                      <p className="mt-2 text-sm leading-6 text-[#cbb477]">{rule}</p>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel id="locale-os" cn={t.localeGeo} en="Locale & GEO Layer">
                <div className="max-h-[30rem] overflow-auto">
                  <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
                    <thead className="text-[#9f8a60]">
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
              </Panel>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

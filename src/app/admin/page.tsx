import { QuietAdminAccess } from "@/components/admin/QuietAdminAccess";
import { QuietAdminWorkspace } from "@/components/admin/QuietAdminWorkspace";
import { quietAdminBoundaries, quietAdminSections } from "@/config/quiet-admin";
import { contentRuntimeBoundaries, resolveSlowContentRuntime } from "@/config/content-runtime";
import { siteConfig } from "@/config/site";

const navItems = ["Copy", "QA", "Terms", "Drafts", "Updates", "Archive", "Review", "Text"] as const;

export default function AdminPage() {
  const slowContent = resolveSlowContentRuntime();

  return (
    <QuietAdminAccess>
      <main className="min-h-full bg-[#eef1f4] text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="border-b border-border-subtle/80 pb-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.12em] text-text-muted">Quiet admin</p>
              <h1 className="mt-2 text-2xl font-normal leading-tight text-foreground sm:text-3xl">
                {siteConfig.siteName}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
                A plain maintenance room for slow copy review, guardrail repair, and archive separation.
              </p>
            </div>
            <div className="max-w-xs border-l border-border-subtle/70 pl-4 text-xs leading-6 text-text-muted">
              Access shell only. Wire deployment auth before using this route outside a trusted preview.
            </div>
          </div>
          <nav className="mt-6 flex gap-4 overflow-x-auto text-xs text-text-muted" aria-label="Admin sections">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="shrink-0 hover:text-text-secondary">
                {item}
              </a>
            ))}
          </nav>
        </header>

        <section className="grid gap-4 border-b border-border-subtle/70 py-6 sm:grid-cols-5">
          {quietAdminBoundaries.map((line) => (
            <p key={line} className="border-l border-border-subtle/70 pl-3 text-xs leading-6 text-text-muted">
              {line}
            </p>
          ))}
        </section>

        <section className="grid gap-4 py-6 lg:grid-cols-[0.72fr_0.28fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {quietAdminSections.map((section, index) => (
              <section
                key={section.title}
                id={navItems[index]?.toLowerCase()}
                className="rounded-lg border border-border-subtle/80 bg-white/58 px-4 py-4 shadow-none"
              >
                <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">{section.title}</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">{section.note}</p>
                <ul className="mt-4 space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs leading-6 text-text-muted">
                      <span className="mt-[0.68rem] h-px w-3 shrink-0 bg-border-default" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="space-y-4">
            <aside className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
              <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">Review posture</p>
              <div className="mt-4 space-y-4 text-xs leading-6 text-text-muted">
                <p>Repair wording only when it adds pressure, self-awareness, or a product feeling.</p>
                <p>Keep drafts slow. Keep archive separate. Leave the public site alone unless a guardrail asks.</p>
                <p>When unsure, choose less text and fewer controls.</p>
              </div>
            </aside>

            <section id="text" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
              <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">Slow text review</p>
              <div className="mt-4 space-y-4">
                {slowContent.map((entry) => (
                  <div key={entry.label} className="border-t border-border-subtle/70 pt-3 first:border-t-0 first:pt-0">
                    <p className="text-xs text-foreground">{entry.label}</p>
                    <p className="mt-2 text-xs leading-6 text-text-secondary">{entry.present}</p>
                    <p className="mt-1 text-[0.68rem] leading-5 text-text-muted">Still nearby: {entry.nearby}</p>
                    <p className="mt-2 text-[0.68rem] leading-5 text-text-muted/80">{entry.note}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 space-y-1 border-t border-border-subtle/70 pt-3">
                {contentRuntimeBoundaries.map((line) => (
                  <p key={line} className="text-[0.66rem] leading-5 text-text-muted/80">
                    {line}
                  </p>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="border-t border-border-subtle/70 py-6">
          <QuietAdminWorkspace entries={slowContent} />
        </section>
      </div>
      </main>
    </QuietAdminAccess>
  );
}

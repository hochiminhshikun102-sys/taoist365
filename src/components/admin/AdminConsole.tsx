import { adminConsoleMetrics, adminConsoleNav, adminConsoleSections } from "@/config/admin-console";
import { locales, localeDefinitions } from "@/config/locales";
import { siteConfig } from "@/config/site";

export function AdminConsole() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="grid min-h-screen lg:grid-cols-[16rem_1fr]">
        <aside className="border-r border-neutral-200 bg-white px-4 py-5">
          <div className="border-b border-neutral-200 pb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Admin Console</p>
            <h1 className="mt-2 text-xl font-semibold tracking-normal text-black">{siteConfig.siteName}</h1>
          </div>
          <nav className="mt-5 grid gap-1 text-sm" aria-label="Admin console">
            {adminConsoleNav.map((item) => (
              <a key={item.href} href={item.href} className="rounded-md px-3 py-2 font-medium text-neutral-700 hover:bg-neutral-100 hover:text-black">
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <div>
          <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white px-5 py-4 lg:px-7">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Operations</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-normal text-black">Production Admin Foundation</h2>
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                <button className="rounded-md border border-neutral-300 bg-white px-3 py-2 font-medium text-neutral-800 hover:bg-neutral-50" type="button">
                  Export
                </button>
                <button className="rounded-md bg-black px-3 py-2 font-medium text-white hover:bg-neutral-800" type="button">
                  New object
                </button>
              </div>
            </div>
          </header>

          <div className="px-5 py-6 lg:px-7">
            <section id="overview" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {adminConsoleMetrics.map((metric) => (
                <div key={metric.label} className="rounded-md border border-neutral-200 bg-white p-4">
                  <p className="text-sm font-medium text-neutral-600">{metric.label}</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-black">{metric.value}</p>
                  <p className="mt-1 text-xs text-neutral-500">{metric.note}</p>
                </div>
              ))}
            </section>

            <section className="mt-6 rounded-md border border-neutral-200 bg-white">
              <div className="border-b border-neutral-200 px-4 py-3">
                <h3 className="text-base font-semibold text-black">Locale Matrix</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[780px] border-collapse text-left text-sm">
                  <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                    <tr>
                      <th className="border-b border-neutral-200 px-4 py-3">Locale</th>
                      <th className="border-b border-neutral-200 px-4 py-3">Language</th>
                      <th className="border-b border-neutral-200 px-4 py-3">Direction</th>
                      <th className="border-b border-neutral-200 px-4 py-3">Routing</th>
                      <th className="border-b border-neutral-200 px-4 py-3">Translation Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locales.map((locale) => {
                      const definition = localeDefinitions[locale];
                      return (
                        <tr key={locale} className="border-b border-neutral-100 last:border-b-0">
                          <td className="px-4 py-3 font-mono text-xs text-black">/{locale}</td>
                          <td className="px-4 py-3 text-neutral-800">{definition.label}</td>
                          <td className="px-4 py-3 text-neutral-700">{definition.dir.toUpperCase()}</td>
                          <td className="px-4 py-3 text-neutral-700">Active</td>
                          <td className="px-4 py-3">
                            <span className="rounded bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700">
                              English fallback
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-6 grid gap-4 xl:grid-cols-2">
              {adminConsoleSections.map((section) => (
                <article key={section.id} id={section.id} className="rounded-md border border-neutral-200 bg-white">
                  <div className="border-b border-neutral-200 px-4 py-3">
                    <h3 className="text-base font-semibold text-black">{section.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-neutral-600">{section.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-4">
                    {section.actions.map((action) => (
                      <button key={action} type="button" className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-left text-sm font-medium text-neutral-800 hover:bg-neutral-50">
                        {action}
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

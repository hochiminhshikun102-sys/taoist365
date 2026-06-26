import type { Metadata } from "next";
import Link from "next/link";
import { journalEntries } from "@/config/journal-runtime";
import { articleSchema, breadcrumbSchema, buildAiSeoSignals, buildSeoGeoMetadata, SeoGeoJsonLd } from "@/lib/seo-geo-runtime";

export const metadata: Metadata = buildSeoGeoMetadata({
  title: "Journal - Dohara",
  description: "Longer notes, object stories, and quiet semantic traces from Dohara.",
  path: "/journal",
  kind: "article",
  phrases: ["long content", "AI summaries", "related links", "object stories"],
});

export default function JournalPage() {
  return (
    <main className="min-h-dvh bg-[#F0F2F5] px-5 py-10 text-[#2C323C]">
      <SeoGeoJsonLd
        graph={[
          articleSchema({
            title: "Journal - Dohara",
            description: "Longer notes, object stories, and quiet semantic traces from Dohara.",
            path: "/journal",
            kind: "article",
            relatedLinks: ["/healing", "/windkeep", "/quiet-extracts"],
          }),
          ...journalEntries.map((entry) =>
            articleSchema({
              title: entry.title,
              description: entry.summary,
              path: `/journal#${entry.slug}`,
              kind: "article",
              phrases: entry.tags,
              relatedLinks: entry.relatedLinks,
            }),
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
          ]),
        ]}
      />
      <section className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-[#646E7A]">Dohara</Link>
        <div className="mt-8 rounded-[28px] border border-[#D7DCE3] bg-[#E8EBF0] p-6 sm:p-10">
          <p className="text-sm text-[#646E7A]">Journal Runtime</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-[-0.01em] text-[#2C323C]">Journal</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#646E7A]">
            Longer notes for search, generative engines, and human reading. The structure stays clear without becoming a content farm.
          </p>
        </div>

        <div className="mt-6 grid gap-5">
          {journalEntries.map((entry) => {
            const signals = buildAiSeoSignals({
              title: entry.title,
              description: entry.summary,
              path: `/journal#${entry.slug}`,
              kind: "article",
              phrases: entry.tags,
            });
            return (
              <article key={entry.slug} id={entry.slug} className="rounded-3xl border border-[#D7DCE3] bg-white p-6 sm:p-8">
                <p className="text-sm text-[#909BA8]">AI Summary</p>
                <h2 className="mt-2 text-3xl font-semibold text-[#2C323C]">{entry.title}</h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-[#646E7A]">{entry.aiSummary}</p>
                <div className="mt-5 space-y-4 text-base leading-8 text-[#2C323C]">
                  {entry.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {signals.semanticPhrases.slice(0, 6).map((phrase) => (
                    <span key={phrase} className="rounded-full border border-[#D7DCE3] bg-[#F0F2F5] px-3 py-1 text-xs text-[#646E7A]">{phrase}</span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {entry.relatedLinks.map((href) => (
                    <Link key={href} href={href} className="text-sm text-[#8A7C6E] underline-offset-4 hover:underline">
                      {href}
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

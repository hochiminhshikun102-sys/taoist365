import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { humanCorrespondenceLayer } from "@/data/human-correspondence-layer/system";

export const metadata: Metadata = {
  title: "Mail",
  description:
    "hello@taoist365.com—plain mail about objects and pages. Humans reply when someone is at the shelf.",
  openGraph: {
    title: `Mail · ${siteConfig.siteName}`,
    description: humanCorrespondenceLayer.pageLead,
    url: `${siteConfig.metadataBase}/inquiry`,
  },
};

const mailGeneral = `mailto:${siteConfig.inquiryEmail}?subject=${encodeURIComponent(humanCorrespondenceLayer.defaultSubject)}`;

export default function InquiryPage() {
  const layer = humanCorrespondenceLayer;

  return (
    <main className="min-h-full bg-background">
      <div className="room-section-y-standard relative mx-auto w-full max-w-2xl px-6 sm:px-10">
        <p className="text-xs text-text-muted/85">{layer.pageEyebrow}</p>
        <h1 className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl">{layer.pageTitle}</h1>
        <p className="mt-5 text-sm leading-8 text-text-secondary">{layer.pageLead}</p>

        <div className="taoist-ritual-shell mt-10 rounded-2xl border border-border-subtle bg-surface p-6 sm:p-7">
          <p className="text-xs text-text-muted/80">Address</p>
          <p className="mt-2 font-mono text-sm text-text-secondary">{siteConfig.inquiryEmail}</p>
          <a
            href={mailGeneral}
            className="taoist-quiet-action mt-6 inline-block rounded-lg border border-border-subtle bg-surface px-4 py-2.5 text-sm text-text-secondary transition hover:border-border-default hover:bg-white"
          >
            {layer.composeLinkLabel}
          </a>
        </div>

        <p className="mt-10 text-xs leading-7 text-text-muted/75">{siteConfig.maintenanceLine}</p>
        <p className="mt-3 text-xs leading-7 text-text-muted/65">
          <Link href="/objects" className="text-text-secondary underline-offset-4 hover:underline">
            Objects
          </Link>
          {" · "}
          <Link href="/guidance" className="text-text-secondary underline-offset-4 hover:underline">
            Pause
          </Link>
        </p>
      </div>
    </main>
  );
}

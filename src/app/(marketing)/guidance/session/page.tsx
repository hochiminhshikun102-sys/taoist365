import type { Metadata } from "next";
import { Suspense } from "react";
import { GuidanceSessionClient } from "@/components/guidance/GuidanceSessionClient";
import { GuidanceSessionRhythmBanner } from "@/components/guidance/GuidanceSessionRhythmBanner";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Pause · session",
  description:
    "Short session on taoist365.com—few lines, plain links. No chat thread, no server memory.",
  openGraph: {
    title: `Pause session · ${siteConfig.siteName}`,
    description: "Bounded session; same domain as the rest of the site.",
    url: `${siteConfig.metadataBase}/guidance/session`,
  },
};

function SessionFallback() {
  return (
    <p className="text-sm leading-7 text-text-muted/55" aria-busy="true">
      …
    </p>
  );
}

export default function GuidanceSessionPage() {
  return (
    <main className="min-h-full bg-background">
      <div className="room-section-y-standard relative mx-auto w-full max-w-xl px-5 sm:px-8">
        <p className="text-xs text-text-muted/78">Pause</p>
        <h1 className="mt-2 text-xl text-foreground sm:text-2xl">Session</h1>
        <p className="mt-4 text-sm leading-8 text-text-secondary">Few lines, then links. No chat UI.</p>
        <GuidanceSessionRhythmBanner />
        <div className="mt-10">
          <Suspense fallback={<SessionFallback />}>
            <GuidanceSessionClient />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

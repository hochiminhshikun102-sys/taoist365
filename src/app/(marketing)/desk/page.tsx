import type { Metadata } from "next";
import Link from "next/link";
import { OwnershipEchoCorner } from "@/components/objects/OwnershipEchoCorner";
import { DeskScratch } from "@/components/desk/DeskScratch";
import { siteConfig } from "@/config/site";
import { DeskTemporalNote } from "@/components/living/DeskTemporalNote";
import { DeskPageMaterial } from "@/components/material/DeskPageMaterial";
import { BrowserDeskRealityStrip } from "@/components/desk/BrowserDeskRealityStrip";

export const metadata: Metadata = {
  title: "Desk",
  description:
    "A plain page on taoist365.com—textarea notes stored only in your browser. No account, no cloud, no streaks.",
  openGraph: {
    title: `Desk · ${siteConfig.siteName}`,
    description: siteConfig.deskScopeLine,
    url: `${siteConfig.metadataBase}/desk`,
  },
};

export default function DeskPage() {
  return (
    <main className="min-h-full bg-background print:bg-white">
      <div className="room-section-y-standard relative mx-auto w-full max-w-3xl px-6 sm:px-10">
        <p className="text-xs text-text-muted/85">Browser-local</p>
        <h1 className="mt-3 max-w-2xl text-3xl leading-tight text-foreground sm:text-4xl">Desk</h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-text-secondary">
          A small corner that lingers in your browser—not a notes app, no folders, no sync. Scratch for longer drift and a
          shorter phrases strip if you want it; same domain as the rest of Reverent Inquiry, still nothing transmitted when you
          type.
        </p>
        <p className="mt-4 max-w-2xl text-xs leading-7 text-text-muted/70">{siteConfig.deskDrawerGravityLine}</p>
        <p className="mt-2 max-w-2xl text-xs leading-7 text-text-muted/64">{siteConfig.deskNightBrowserLine}</p>
        <p className="mt-3 max-w-2xl text-xs leading-7 text-text-muted/78">
          If typing here feels too open-ended,{" "}
          <Link href="/guidance" className="text-text-secondary underline-offset-4 hover:underline">
            Pause
          </Link>{" "}
          starts from named states and short noticing—then Desk stays one possible door, not a chat session.
        </p>
        <DeskTemporalNote />
        <BrowserDeskRealityStrip />
        <DeskPageMaterial />
        <p className="mt-2 max-w-2xl text-xs leading-7 text-text-muted/80">{siteConfig.deskScopeLine}</p>
        <p className="mt-2 max-w-2xl text-xs leading-7 text-text-muted/72">{siteConfig.personalResidueScopeLine}</p>
        <p className="mt-2 max-w-2xl text-xs leading-7 text-text-muted/68">{siteConfig.browserSideLine}</p>
        <p className="mt-3 max-w-2xl text-xs leading-7 text-text-muted/62">{siteConfig.deskLightReuseLine}</p>
        <p className="mt-2 max-w-2xl text-xs leading-7 text-text-muted/56">{siteConfig.lightDependencyFootLine}</p>
        <p className="mt-3 max-w-2xl text-xs leading-7 text-text-muted/52">{siteConfig.deskObjectBridgeLine}</p>
        <p className="mt-4 max-w-2xl text-xs leading-7 text-text-muted/58">
          Desk nights often picture what stays beside the machine—a mug, a tray, linen—without needing to acquire anything.
          The same object names can reappear here with a stable URL, not a cart.
        </p>

        <DeskScratch />

        <p className="mt-6 max-w-2xl text-xs leading-7 text-text-muted/56 print:hidden">
          Slow mail here means the same things—sand mug by the trackpad, crackle cup in screen bloom—can feel familiar without becoming a funnel.
        </p>
        <p className="mt-3 max-w-2xl text-xs leading-7 text-text-muted/52 print:hidden">
          Arrival can stay plain too: brown paper, box beside the door through rain, opened after work—then the thing drifts to desk clutter without ceremony. No shopping language, just{" "}
          <Link href="/inquiry" className="text-text-secondary underline-offset-4 hover:underline">
            Mail
          </Link>{" "}
          and the same shelf on{" "}
          <Link href="/objects" className="text-text-secondary underline-offset-4 hover:underline">
            Objects
          </Link>
          .
        </p>
        <p className="mt-3 max-w-2xl text-xs leading-7 text-text-muted/50 print:hidden">
          This tab is also where sentences stop mid-line and fatigue shows as half-finished phrases—just a browser corner where someone was recently tired.
        </p>
        <p className="mt-3 max-w-2xl text-xs leading-7 text-text-muted/46 print:hidden">
          Tabs and phrases can stay in the same browser corner for months—sun on the real desk elsewhere still writes slow outlines on paper stacks nobody moves around. Just long ordinary use.
        </p>
        <p className="mt-3 max-w-2xl text-xs leading-7 text-text-muted/48 print:hidden">
          After months, things migrate less—mug left of glow, tray default for keys, linen that never went back to the drawer.
          Not habits or stacking routines—just surfaces that forgot to rearrange. Same anchors on{" "}
          <Link href="/objects" className="text-text-secondary underline-offset-4 hover:underline">
            Objects
          </Link>
          .
        </p>

        <div className="mt-8 print:hidden">
          <OwnershipEchoCorner heading="Object names already nearby" />
        </div>

        <p className="mt-10 text-xs leading-7 text-text-muted/72 print:hidden">
          <Link href="/objects" className="text-text-secondary underline-offset-4 hover:underline">
            Objects
          </Link>{" "}
          carries optional private margins beside each catalog line in this browser;{" "}
          <Link href="/rituals" className="text-text-secondary underline-offset-4 hover:underline">
            Rituals
          </Link>{" "}
          and{" "}
          <Link href="/inquiry" className="text-text-secondary underline-offset-4 hover:underline">
            Mail
          </Link>{" "}
          stay the shared pages on this domain.
        </p>
      </div>
    </main>
  );
}

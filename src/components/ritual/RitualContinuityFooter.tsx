"use client";

import Link from "next/link";

type RitualKey = "draw-a-lot" | "daily-guidance" | "home-harmony";

interface RitualContinuityFooterProps {
  current: RitualKey;
  onCloseForNow: () => void;
}

const ritualLinks: Record<RitualKey, Array<{ href: string; label: string }>> = {
  "draw-a-lot": [
    { href: "/rituals/daily-guidance", label: "Daily Guidance" },
    { href: "/rituals/home-harmony", label: "Home Harmony" },
  ],
  "daily-guidance": [
    { href: "/rituals/draw-a-lot", label: "Draw a Lot" },
    { href: "/rituals/home-harmony", label: "Home Harmony" },
  ],
  "home-harmony": [
    { href: "/rituals/draw-a-lot", label: "Draw a Lot" },
    { href: "/rituals/daily-guidance", label: "Daily Guidance" },
  ],
};

export function RitualContinuityFooter({ current, onCloseForNow }: RitualContinuityFooterProps) {
  return (
    <div className="taoist-quiet-field mt-6 rounded-xl border border-border-subtle/20 bg-background/40 p-5 sm:p-6">
      <p className="text-xs leading-6 text-text-muted/82">Somewhere else on the site</p>
      <p className="mt-3 text-sm leading-8 text-text-secondary">
        Same tab pile as everything else. Wander or close—either is fine.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {ritualLinks[current].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="taoist-quiet-action rounded-lg border border-border-subtle/24 px-4 py-2 text-xs text-text-muted transition hover:text-text-secondary"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/rituals/homepage"
          className="taoist-quiet-action rounded-lg border border-border-subtle/24 px-4 py-2 text-xs text-text-muted transition hover:text-text-secondary"
        >
          Homepage (layout)
        </Link>
        <button
          type="button"
          onClick={onCloseForNow}
          className="taoist-quiet-action rounded-lg border border-border-subtle/22 px-4 py-2 text-xs text-text-muted/90 transition hover:text-text-muted"
        >
          Done for now
        </button>
      </div>
      <p className="mt-5 text-[0.68rem] leading-6 text-text-muted/45">
        Nothing here logs whether you opened this again today or in a month.
      </p>
    </div>
  );
}

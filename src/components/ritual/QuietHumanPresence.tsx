"use client";

import { quietHumanPresence } from "@/data/quiet-human-presence/system";
import { rotateByAnchor, useAmbientAnchor } from "@/lib/ambient-anchor";

type HumanPresenceKey = "homepage" | "drawALot" | "dailyGuidance" | "homeHarmony";

interface QuietHumanPresenceProps {
  presenceKey: HumanPresenceKey;
}

export function QuietHumanPresence({ presenceKey }: QuietHumanPresenceProps) {
  const anchor = useAmbientAnchor();
  const lines = rotateByAnchor(quietHumanPresence[presenceKey], anchor);

  return (
    <section className="mt-9 border-t border-border-subtle/32 pt-8">
      <p className="text-xs text-text-muted/82">{quietHumanPresence.shared.title}</p>
      <div className="mt-3 space-y-2.5">
        {lines.map((line, index) => (
          <p
            key={`${presenceKey}-${line}`}
            className={`text-sm leading-8 text-text-secondary ${index > 0 ? "hidden sm:block" : ""}`}
          >
            {line}
          </p>
        ))}
      </div>
      {quietHumanPresence.shared.shelter ? (
        <p className="mt-3 text-xs leading-7 text-text-muted/90">{quietHumanPresence.shared.shelter}</p>
      ) : null}
    </section>
  );
}

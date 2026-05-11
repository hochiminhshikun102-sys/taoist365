"use client";

import { seasonalPresence, type SeasonalMoment } from "@/data/seasonal-presence/system";
import { rotateByAnchor, useAmbientAnchor } from "@/lib/ambient-anchor";

type SeasonalKey = "homepage" | "drawALot" | "dailyGuidance" | "homeHarmony";

interface SeasonalPresenceProps {
  seasonalKey: SeasonalKey;
  moment?: SeasonalMoment;
}

export function SeasonalPresence({ seasonalKey, moment = "late-afternoon" }: SeasonalPresenceProps) {
  const anchor = useAmbientAnchor();
  const traces = rotateByAnchor(seasonalPresence[seasonalKey].traces, anchor);

  return (
    <section className="mt-10 border-t border-border-subtle/32 pt-8">
      <p className="text-xs text-text-muted/82">{seasonalPresence.shared.title}</p>
      <p className="mt-2 text-sm leading-8 text-text-secondary">{seasonalPresence.shared.moments[moment]}</p>
      <div className="mt-2 space-y-1.5">
        {traces.map((line, index) => (
          <p
            key={`${seasonalKey}-${line}`}
            className={`text-xs leading-7 text-text-muted ${index > 0 ? "hidden sm:block" : ""}`}
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}

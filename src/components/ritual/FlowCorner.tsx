"use client";

import { ritualCornerPresence } from "@/data/ritual-corner-presence/system";
import { rotateByAnchor, useAmbientAnchor } from "@/lib/ambient-anchor";

type CornerKey = "homepage" | "drawALot" | "dailyGuidance" | "homeHarmony";

interface FlowCornerProps {
  corner: CornerKey;
}

/** Supplementary corner lines — same data as before; neutral component name. */
export function FlowCorner({ corner }: FlowCornerProps) {
  const anchor = useAmbientAnchor();
  const traces = rotateByAnchor(ritualCornerPresence[corner].traces, anchor);

  return (
    <section className="mt-9 border-t border-border-subtle/32 pt-8">
      <p className="text-xs text-text-muted/82">{ritualCornerPresence.shared.title}</p>
      <div className="mt-3 space-y-2.5">
        {traces.map((line, index) => (
          <p
            key={`${corner}-${line}`}
            className={`text-sm leading-8 text-text-secondary ${index > 1 ? "hidden sm:block" : ""}`}
          >
            {line}
          </p>
        ))}
      </div>
      <p className="mt-3 text-xs leading-7 text-text-muted/90">{ritualCornerPresence.shared.shelterLine}</p>
    </section>
  );
}

"use client";

import { offFramePresence } from "@/data/off-frame-presence/system";
import { rotateByAnchor, useAmbientAnchor } from "@/lib/ambient-anchor";

type OffFrameSurfaceKey = Exclude<keyof typeof offFramePresence, "shared">;

interface OffFramePresenceProps {
  frameKey: OffFrameSurfaceKey;
}

export function OffFramePresence({ frameKey }: OffFramePresenceProps) {
  const anchor = useAmbientAnchor();
  const lines = rotateByAnchor(offFramePresence[frameKey], anchor);

  return (
    <section className="mt-9 border-t border-border-subtle/28 pt-8">
      <p className="text-xs text-text-muted/82">{offFramePresence.shared.title}</p>
      <p className="mt-2 text-xs leading-7 text-text-muted/72">{offFramePresence.shared.line}</p>
      <div className="mt-3 space-y-1.5">
        {lines.map((line, index) => (
          <p
            key={`${frameKey}-${line}`}
            className={`text-xs leading-7 text-text-muted/90 ${index > 0 ? "hidden sm:block" : ""}`}
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}

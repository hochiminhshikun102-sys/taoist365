"use client";

import { useMemo } from "react";
import { myPathPresence, type MyPathRitualKey } from "@/data/my-path-presence/system";
import { rotateByAnchor, useAmbientAnchor } from "@/lib/ambient-anchor";

interface MyPathPresenceProps {
  ritual: MyPathRitualKey;
}

export function MyPathPresence({ ritual }: MyPathPresenceProps) {
  const anchor = useAmbientAnchor();

  const lines = useMemo(() => {
    const firstRitual = myPathPresence.byRitual[ritual][0];
    return rotateByAnchor(
      [firstRitual, myPathPresence.sharedTraces[0], myPathPresence.objectEchoes[0]],
      anchor,
    );
  }, [anchor, ritual]);

  return (
    <section className="mt-9 border-t border-border-subtle/32 pt-8">
      <p className="text-xs text-text-muted/82">Odds and ends you might notice</p>
      <div className="mt-3 space-y-2.5">
        {lines.map((line, index) => (
          <p
            key={`${ritual}-${line}`}
            className={`text-sm leading-8 text-text-secondary ${index > 0 ? "hidden sm:block" : ""}`}
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}

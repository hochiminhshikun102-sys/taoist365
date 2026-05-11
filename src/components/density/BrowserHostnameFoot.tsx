"use client";

import { useWorldRuntime } from "@/lib/use-world-runtime";

export function BrowserHostnameFoot() {
  const { browserReality, antiSystemSelfAwareness, realInternetDefaultness } = useWorldRuntime();
  return (
    <div className="mt-6 space-y-1.5 text-[0.62rem] leading-[1.55] text-text-muted/42">
      <p>{browserReality.hostname.hostnameFamiliarityLine}</p>
      <p className="text-text-muted/38">{browserReality.objectInternetSediment.lowRefreshObjectsLine}</p>
      <p className="text-text-muted/36">{realInternetDefaultness.ordinaryPresenceLine}</p>
      {antiSystemSelfAwareness.showAntiMetaFooter ? (
        <p className="text-text-muted/32">{antiSystemSelfAwareness.antiMetaReminder}</p>
      ) : null}
    </div>
  );
}

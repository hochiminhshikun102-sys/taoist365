import type { Metadata } from "next";
import { Suspense } from "react";
import { IntakeStatusDetailFromQuery } from "@/components/object-intake/IntakeStatusDetailClient";

export const metadata: Metadata = {
  title: "Windkeep Supply Status - Account",
  description: "Member-center Windkeep supply intake status.",
};

export default function WindkeepSupplyStatusPage() {
  return (
    <Suspense fallback={null}>
      <IntakeStatusDetailFromQuery mode="windkeep" />
    </Suspense>
  );
}

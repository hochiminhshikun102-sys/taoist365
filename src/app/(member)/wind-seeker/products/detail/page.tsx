import type { Metadata } from "next";
import { Suspense } from "react";
import { IntakeStatusDetailFromQuery } from "@/components/object-intake/IntakeStatusDetailClient";

export const metadata: Metadata = {
  title: "Wind Seeker Object Status",
  description: "Professional buyer object intake status.",
};

export default function WindSeekerProductStatusPage() {
  return (
    <Suspense fallback={null}>
      <IntakeStatusDetailFromQuery mode="wind_seeker" />
    </Suspense>
  );
}

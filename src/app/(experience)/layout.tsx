import type { ReactNode } from "react";
import { CalmNavigation } from "@/components/navigation";
import { ExperienceContinuityShell } from "@/components/experience/ExperienceContinuityShell";
import { RitualVisitRecorder } from "@/components/rituals/RitualVisitRecorder";
import { SiteColophon } from "@/components/site/SiteColophon";

export default function ExperienceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full w-full flex-1 flex-col bg-background">
      <RitualVisitRecorder />
      <CalmNavigation />
      <ExperienceContinuityShell>{children}</ExperienceContinuityShell>
      <SiteColophon />
    </div>
  );
}

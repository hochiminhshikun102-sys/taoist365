import type { Metadata } from "next";
import { DailyGuidanceLiveExperience } from "@/live-prototypes/daily-guidance/LiveExperience";

export const metadata: Metadata = {
  title: "Daily guidance",
  description:
    "Long-running Dohara page—one optional nudge for the day; bookmarkable URL on the main domain.",
};

export default function DailyGuidanceRitualPage() {
  return <DailyGuidanceLiveExperience />;
}

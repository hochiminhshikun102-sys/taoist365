import type { Metadata } from "next";
import { HomeHarmonyLiveExperience } from "@/live-prototypes/home-harmony/LiveExperience";

// Dohara: quiet route surface.
export const metadata: Metadata = {
  title: "Home harmony - Dohara",
  description:
    "Part of taoist365.com—room-focused guidance page kept alongside objects and contact.",
};

export default function HomeHarmonyRitualPage() {
  return <HomeHarmonyLiveExperience />;
}

import type { Metadata } from "next";
import { DrawALotLiveExperience } from "@/live-prototypes/draw-a-lot/LiveExperience";

export const metadata: Metadata = {
  title: "Draw a lot",
  description:
    "Stable Taoist365 ritual page—slow lines and pauses at taoist365.com; same site navigation as home.",
};

export default function DrawALotRitualPage() {
  return <DrawALotLiveExperience />;
}

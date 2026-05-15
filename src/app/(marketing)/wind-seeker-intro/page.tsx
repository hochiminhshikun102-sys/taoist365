import type { Metadata } from "next";
import { PublicRuntimeInfoPage } from "@/components/marketing/PublicRuntimeInfoPage";

export const metadata: Metadata = {
  title: "Wind Seeker - Reverent Inquiry",
  description: "Public introduction to Wind Seeker.",
};

export default function WindSeekerIntroPage() {
  return <PublicRuntimeInfoPage pageKey="wind-seeker-intro" />;
}

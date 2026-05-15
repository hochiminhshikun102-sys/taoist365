import type { Metadata } from "next";
import { PublicRuntimeInfoPage } from "@/components/marketing/PublicRuntimeInfoPage";
import { buildSeoGeoMetadata } from "@/lib/seo-geo-runtime";

export const metadata: Metadata = buildSeoGeoMetadata({
  title: "Wind Seeker Public Intro - Reverent Inquiry",
  description: "Public introduction to the Reverent Inquiry global distributed object discovery network.",
  path: "/wind-seeker-intro",
  kind: "wind-seeker",
  phrases: ["public intro", "object discovery", "reviewed objects"],
});

export default function WindSeekerIntroPage() {
  return <PublicRuntimeInfoPage pageKey="wind-seeker-intro" />;
}

import type { Metadata } from "next";
import { PublicRuntimeInfoPage } from "@/components/marketing/PublicRuntimeInfoPage";

export const metadata: Metadata = {
  title: "Cookie - Reverent Inquiry",
  description: "Public cookie information for Reverent Inquiry.",
};

export default function CookiePage() {
  return <PublicRuntimeInfoPage pageKey="cookie" />;
}

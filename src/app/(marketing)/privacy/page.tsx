import type { Metadata } from "next";
import { PublicRuntimeInfoPage } from "@/components/marketing/PublicRuntimeInfoPage";

export const metadata: Metadata = {
  title: "Privacy - Reverent Inquiry",
  description: "Public privacy information for Reverent Inquiry.",
};

export default function PrivacyPage() {
  return <PublicRuntimeInfoPage pageKey="privacy" />;
}

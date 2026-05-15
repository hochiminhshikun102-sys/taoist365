import type { Metadata } from "next";
import { PublicRuntimeInfoPage } from "@/components/marketing/PublicRuntimeInfoPage";

export const metadata: Metadata = {
  title: "Journal - Reverent Inquiry",
  description: "Journal notes and object stories from Reverent Inquiry.",
};

export default function JournalPage() {
  return <PublicRuntimeInfoPage pageKey="journal" />;
}

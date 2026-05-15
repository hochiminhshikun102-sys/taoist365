import type { Metadata } from "next";
import { PublicRuntimeInfoPage } from "@/components/marketing/PublicRuntimeInfoPage";

export const metadata: Metadata = {
  title: "Quiet Extracts - Reverent Inquiry",
  description: "Quiet public extracts from Reverent Inquiry.",
};

export default function QuietExtractsPage() {
  return <PublicRuntimeInfoPage pageKey="quiet-extracts" />;
}

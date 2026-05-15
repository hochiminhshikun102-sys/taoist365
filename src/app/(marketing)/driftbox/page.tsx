import type { Metadata } from "next";
import { PublicRuntimeInfoPage } from "@/components/marketing/PublicRuntimeInfoPage";

export const metadata: Metadata = {
  title: "Driftbox - Reverent Inquiry",
  description: "Quiet correspondence layer for Reverent Inquiry.",
};

export default function DriftboxPage() {
  return <PublicRuntimeInfoPage pageKey="driftbox" />;
}

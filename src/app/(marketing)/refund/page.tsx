import type { Metadata } from "next";
import { PublicRuntimeInfoPage } from "@/components/marketing/PublicRuntimeInfoPage";

export const metadata: Metadata = {
  title: "Refund - Reverent Inquiry",
  description: "Public refund information for Reverent Inquiry.",
};

export default function RefundPage() {
  return <PublicRuntimeInfoPage pageKey="refund" />;
}

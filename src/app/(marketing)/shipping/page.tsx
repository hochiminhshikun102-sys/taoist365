import type { Metadata } from "next";
import { PublicRuntimeInfoPage } from "@/components/marketing/PublicRuntimeInfoPage";

export const metadata: Metadata = {
  title: "Shipping - Reverent Inquiry",
  description: "Public shipping information for Reverent Inquiry.",
};

export default function ShippingPage() {
  return <PublicRuntimeInfoPage pageKey="shipping" />;
}

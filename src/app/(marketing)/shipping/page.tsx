import type { Metadata } from "next";
import { PublicRuntimeInfoPage } from "@/components/marketing/PublicRuntimeInfoPage";

export const metadata: Metadata = {
  title: "Shipping - Dohara",
  description: "Public shipping information for Dohara.",
};

export default function ShippingPage() {
  return <PublicRuntimeInfoPage pageKey="shipping" />;
}

import type { Metadata } from "next";
import { PublicRuntimeInfoPage } from "@/components/marketing/PublicRuntimeInfoPage";

export const metadata: Metadata = {
  title: "Refund - Dohara",
  description: "Public refund information for Dohara.",
};

export default function RefundPage() {
  return <PublicRuntimeInfoPage pageKey="refund" />;
}

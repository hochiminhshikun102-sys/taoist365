import type { Metadata } from "next";
import { PublicRuntimeInfoPage } from "@/components/marketing/PublicRuntimeInfoPage";

export const metadata: Metadata = {
  title: "Quiet Extracts - Dohara",
  description: "Quiet public extracts from Dohara.",
};

export default function QuietExtractsPage() {
  return <PublicRuntimeInfoPage pageKey="quiet-extracts" />;
}

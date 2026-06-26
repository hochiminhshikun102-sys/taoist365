import type { Metadata } from "next";
import { PublicRuntimeInfoPage } from "@/components/marketing/PublicRuntimeInfoPage";

export const metadata: Metadata = {
  title: "Privacy - Dohara",
  description: "Public privacy information for Dohara.",
};

export default function PrivacyPage() {
  return <PublicRuntimeInfoPage pageKey="privacy" />;
}

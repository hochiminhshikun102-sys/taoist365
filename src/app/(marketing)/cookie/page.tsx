import type { Metadata } from "next";
import { PublicRuntimeInfoPage } from "@/components/marketing/PublicRuntimeInfoPage";

export const metadata: Metadata = {
  title: "Cookie - Dohara",
  description: "Public cookie information for Dohara.",
};

export default function CookiePage() {
  return <PublicRuntimeInfoPage pageKey="cookie" />;
}

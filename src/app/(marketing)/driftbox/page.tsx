import type { Metadata } from "next";
import { PublicRuntimeInfoPage } from "@/components/marketing/PublicRuntimeInfoPage";

export const metadata: Metadata = {
  title: "Driftbox - Dohara",
  description: "Quiet correspondence layer for Dohara.",
};

export default function DriftboxPage() {
  return <PublicRuntimeInfoPage pageKey="driftbox" />;
}

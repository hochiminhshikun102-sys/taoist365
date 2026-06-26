import type { Metadata } from "next";
import { MemberWindkeepSupplyClient } from "@/components/member/MemberWindkeepSupplyClient";

export const metadata: Metadata = {
  title: "Windkeep Supply - Account",
  description: "Member-center supply, consignment, and referral intake for Windkeep.",
};

export default function WindkeepSupplyPage() {
  return <MemberWindkeepSupplyClient />;
}

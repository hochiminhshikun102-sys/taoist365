import type { Metadata } from "next";
import type { ReactNode } from "react";
import { OaAdminAuthGate } from "@/components/oa-auth/OaAdminAuthGate";
import "@/styles/oa/oa-shell.css";
import "@/styles/oa/oa-auth.css";
import "@/styles/oa/oa-overview.css";
import "@/styles/oa/oa-mobile.css";
import "@/styles/oa/oa-skeleton.css";
import "@/styles/oa/oa-commerce.css";
import "@/styles/oa/oa-growth.css";
import "@/styles/oa/oa-member-service.css";
import "@/styles/oa/oa-platform.css";
import "@/styles/oa/oa-orders.css";
import "@/styles/oa/oa-payments-shipping.css";
import "@/styles/oa/oa-objects.css";
import "@/styles/oa/oa-media.css";
import "@/styles/oa/oa-finance.css";
import "@/styles/oa/oa-logistics.css";
import "@/styles/oa/oa-supply-chain.css";
import "@/styles/oa/oa-cs-center.css";
import "@/styles/oa/oa-compliance.css";
import "@/styles/oa/oa-operations.css";
import "@/styles/oa/oa-ai-ops.css";
import "@/styles/oa/oa-site-geo.css";

export const metadata: Metadata = {
  title: "OA Admin Candidate",
  robots: { index: false, follow: false },
};

export default function OaAdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <OaAdminAuthGate>{children}</OaAdminAuthGate>;
}

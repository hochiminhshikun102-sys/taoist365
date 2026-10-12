import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/oa/oa-shell.css";
import "@/styles/oa/oa-overview.css";
import "@/styles/oa/oa-mobile.css";
import "@/styles/oa/oa-skeleton.css";
import "@/styles/oa/oa-commerce.css";
import "@/styles/oa/oa-growth.css";

export const metadata: Metadata = {
  title: "OA Admin Candidate",
  robots: { index: false, follow: false },
};

export default function OaAdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}

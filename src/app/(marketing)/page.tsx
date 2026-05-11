import type { Metadata } from "next";
import { HomepageBrowserRoom } from "@/components/marketing/HomepageBrowserRoom";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Taoist365 - Reverent Inquiry",
  description:
    "A quiet browser room for Taoist365 / Reverent Inquiry, kept steady beside ordinary life.",
  openGraph: {
    title: `${siteConfig.siteName} - ${siteConfig.brandEnName}`,
    description: siteConfig.description,
    url: "https://taoist365.com/",
  },
};

export default function MarketingHomepage() {
  return <HomepageBrowserRoom />;
}

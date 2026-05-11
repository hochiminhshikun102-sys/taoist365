import type { Metadata } from "next";
import { HomepageBrowserRoom } from "@/components/marketing/HomepageBrowserRoom";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Reverent Inquiry",
  description:
    "A quiet browser room at taoist365.com, kept steady beside ordinary life.",
  openGraph: {
    title: `${siteConfig.siteName} - ${siteConfig.domain}`,
    description: siteConfig.description,
    url: "https://taoist365.com/",
  },
};

export default function MarketingHomepage() {
  return <HomepageBrowserRoom />;
}

import type { Metadata } from "next";
import { HomepageBrowserRoom } from "@/components/marketing/HomepageBrowserRoom";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Dohara",
  description:
    "A quiet browser room at taoist365.com, kept steady beside ordinary life.",
  openGraph: {
    title: `${siteConfig.siteName} - ${siteConfig.domain}`,
    description: siteConfig.description,
    url: siteConfig.metadataBase,
  },
};

export default function MarketingHomepage() {
  return <HomepageBrowserRoom />;
}

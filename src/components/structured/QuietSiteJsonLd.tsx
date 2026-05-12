import { siteConfig } from "@/config/site";

export function QuietSiteJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    url: siteConfig.metadataBase,
    description: siteConfig.description,
    inLanguage: siteConfig.locale,
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.metadataBase,
      contactPoint: {
        "@type": "ContactPoint",
        email: siteConfig.inquiryEmail,
        contactType: "plain correspondence",
      },
    },
    about: [
      "quiet long-running website",
      "ordinary browser notes",
      "stable object anchors",
      "human mail correspondence",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}

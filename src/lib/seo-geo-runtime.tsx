import type { Metadata } from "next";
import { localizedAlternates } from "@/config/locales";
import type { CommerceObject } from "@/config/operational-commerce";
import { formatPrice } from "@/config/operational-commerce";
import { siteConfig } from "@/config/site";

type SeoGeoKind = "website" | "product" | "article" | "healing" | "wind-seeker" | "quiet-receiving";

type SeoGeoInput = {
  title: string;
  description: string;
  path: string;
  kind: SeoGeoKind;
  image?: string;
  locale?: string;
  phrases?: readonly string[];
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildAiSeoSignals(input: SeoGeoInput) {
  const basePhrases = [
    "quiet internet",
    "browser air",
    "gentle commerce",
    "emotional semantic layer",
    "Dohara",
  ];
  const kindPhrases: Record<SeoGeoKind, string[]> = {
    website: ["long-running browser place", "calm website"],
    product: ["thoughtful object", "quiet object for daily life", "object story"],
    article: ["quiet journal note", "long-form reflective writing", "human editorial trace"],
    healing: ["healing browser room", "soft daily ritual", "low-pressure guidance"],
    "wind-seeker": ["global object discovery network", "mobile object discovery", "reviewed object continuation"],
    "quiet-receiving": ["object continuation", "quiet receiving", "next keeper"],
  };
  const phrases = [...basePhrases, ...kindPhrases[input.kind], ...(input.phrases ?? [])];
  const semanticPhrases = Array.from(new Set(phrases)).slice(0, 12);

  return {
    emotionalKeywords: semanticPhrases.filter((phrase) => /quiet|gentle|calm|soft|emotional|healing/.test(phrase)),
    semanticPhrases,
    geoPhrases: semanticPhrases.map((phrase) => `${phrase} at ${siteConfig.domain}`),
    aiSummary: `${input.title}: ${input.description}`,
    tags: semanticPhrases.map((phrase) => phrase.replace(/\s+/g, "-").toLowerCase()),
  };
}

export function buildSeoGeoMetadata(input: SeoGeoInput): Metadata {
  const canonical = input.path.startsWith("/") ? input.path : `/${input.path}`;
  const url = `${siteConfig.metadataBase}${canonical}`;
  const signals = buildAiSeoSignals(input);

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical,
      languages: localizedAlternates(canonical.replace(/^\//, "")),
    },
    keywords: signals.semanticPhrases,
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: siteConfig.siteName,
      locale: input.locale ?? siteConfig.locale,
      type: input.kind === "article" || input.kind === "healing" ? "article" : "website",
      images: input.image ? [{ url: input.image, alt: input.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: input.image ? [input.image] : undefined,
    },
    other: {
      "ri:geo-runtime": "AI Search Era GEO Runtime",
      "ri:ai-summary": signals.aiSummary,
      "ri:semantic-phrases": signals.semanticPhrases.join(", "),
      "ri:geo-phrases": signals.geoPhrases.join(", "),
      "ri:tags": signals.tags.join(", "),
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.siteName,
    url: siteConfig.metadataBase,
    email: siteConfig.inquiryEmail,
    sameAs: [siteConfig.metadataBase],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    url: siteConfig.metadataBase,
    description: siteConfig.description,
    publisher: organizationSchema(),
  };
}

export function breadcrumbSchema(items: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.metadataBase}${item.path}`,
    })),
  };
}

export function productSchema(object: CommerceObject) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: object.title,
    description: `${object.subtitle} ${object.atmosphereLine}`,
    image: [`${siteConfig.metadataBase}${object.media.hero}`],
    brand: organizationSchema(),
    material: object.materials.join(", "),
    sku: object.id,
    category: object.collectionTitle,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: formatPrice(object.priceCents).replace("$", ""),
      availability: object.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${siteConfig.metadataBase}/objects/${object.id}`,
    },
  };
}

export function faqSchema(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleSchema(input: SeoGeoInput & { author?: string; relatedLinks?: readonly string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    author: {
      "@type": "Person",
      name: input.author ?? "Dohara",
    },
    publisher: organizationSchema(),
    mainEntityOfPage: `${siteConfig.metadataBase}${input.path}`,
    keywords: buildAiSeoSignals(input).semanticPhrases.join(", "),
    about: buildAiSeoSignals(input).geoPhrases,
    citation: input.relatedLinks?.map((path) => `${siteConfig.metadataBase}${path}`),
  };
}

export function SeoGeoJsonLd({ graph }: Readonly<{ graph: unknown | readonly unknown[] }>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}

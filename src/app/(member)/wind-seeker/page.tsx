import type { Metadata } from "next";
import { WindSeekerRuntime } from "@/components/wind-seeker/WindSeekerRuntime";
import { breadcrumbSchema, buildSeoGeoMetadata, SeoGeoJsonLd } from "@/lib/seo-geo-runtime";

export const metadata: Metadata = buildSeoGeoMetadata({
  title: "Wind Seeker - Reverent Inquiry",
  description: "Mobile-first global object discovery runtime for Reverent Inquiry.",
  path: "/wind-seeker",
  kind: "wind-seeker",
  phrases: ["global distributed object discovery network", "AI product review", "mobile object upload", "AML KYC runtime"],
});

export default function WindSeekerPage() {
  return (
    <>
      <SeoGeoJsonLd
        graph={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Wind Seeker", path: "/wind-seeker" },
        ])}
      />
      <WindSeekerRuntime />
    </>
  );
}

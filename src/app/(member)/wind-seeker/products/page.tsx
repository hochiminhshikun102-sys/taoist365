import type { Metadata } from "next";
import { WindSeekerProductsClient } from "@/components/object-intake/WindSeekerProductsClient";
import { buildSeoGeoMetadata } from "@/lib/seo-geo-runtime";

export const metadata: Metadata = buildSeoGeoMetadata({
  title: "Wind Seeker Products - Reverent Inquiry",
  description: "Review buyer-submitted objects moving through the VL Object Intake Pipeline.",
  path: "/wind-seeker/products",
  kind: "wind-seeker",
  phrases: ["Wind Seeker products", "buyer submitted objects", "object review status"],
});

export default function WindSeekerProductsPage() {
  return <WindSeekerProductsClient />;
}

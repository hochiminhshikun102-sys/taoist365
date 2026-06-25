import type { Metadata } from "next";
import { WindSeekerUploadClient } from "@/components/object-intake/WindSeekerUploadClient";
import { buildSeoGeoMetadata } from "@/lib/seo-geo-runtime";

export const metadata: Metadata = buildSeoGeoMetadata({
  title: "Wind Seeker Upload - Reverent Inquiry",
  description: "Upload an object into the VL Object Intake Pipeline.",
  path: "/wind-seeker/upload",
  kind: "wind-seeker",
  phrases: ["Wind Seeker upload", "object intake", "buyer object review"],
});

export default function WindSeekerUploadPage() {
  return <WindSeekerUploadClient />;
}

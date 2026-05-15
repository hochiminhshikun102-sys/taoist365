import type { Metadata } from "next";
import { WindSeekerRuntime } from "@/components/wind-seeker/WindSeekerRuntime";

export const metadata: Metadata = {
  title: "Wind Seeker - Reverent Inquiry",
  description: "Mobile-first global object discovery runtime for Reverent Inquiry.",
};

export default function WindSeekerPage() {
  return <WindSeekerRuntime />;
}

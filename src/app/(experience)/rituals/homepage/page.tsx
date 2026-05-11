import type { Metadata } from "next";
import { HomepageLivePrototype } from "@/live-prototypes/homepage/LivePrototype";

// Reverent Inquiry: quiet route surface.
export const metadata: Metadata = {
  title: "Homepage layout - Reverent Inquiry",
  description:
    "Alternate homepage scroll on taoist365.com—same navigation and domain as the live home page.",
};

export default function HomepageRitualPage() {
  return <HomepageLivePrototype />;
}

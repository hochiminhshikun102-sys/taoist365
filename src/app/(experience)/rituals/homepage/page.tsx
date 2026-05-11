import type { Metadata } from "next";
import { HomepageLivePrototype } from "@/live-prototypes/homepage/LivePrototype";

// Taoist365 / Reverent Inquiry: quiet route surface.
export const metadata: Metadata = {
  title: "Homepage layout - Taoist365",
  description:
    "Alternate homepage scroll on taoist365.com—same navigation and domain as the live home page.",
};

export default function HomepageRitualPage() {
  return <HomepageLivePrototype />;
}

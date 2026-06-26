import type { Metadata } from "next";
import { HomepageLivePrototype } from "@/live-prototypes/homepage/LivePrototype";

// Dohara: quiet route surface.
export const metadata: Metadata = {
  title: "Homepage layout - Dohara",
  description:
    "Alternate homepage scroll on taoist365.com—same navigation and domain as the live home page.",
};

export default function HomepageRitualPage() {
  return <HomepageLivePrototype />;
}

import type { Metadata } from "next";
import "./windkeep.css";
import WindKeepOverview from "./WindKeepOverview";

export const metadata: Metadata = {
  title: "My WindKeep | DOHARA",
  description: "A quiet place to care for objects, stories, requests, and protected transfers.",
  robots: { index: false, follow: false },
};

export default function MyWindKeepPage() {
  return <WindKeepOverview />;
}

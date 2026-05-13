import type { Metadata } from "next";
import { GlobalSearchClient } from "@/components/marketing/GlobalSearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Reverent Inquiry objects, collections, and quiet ritual pages.",
};

export default function SearchPage() {
  return (
    <main className="min-h-full bg-background">
      <div className="room-section-y-standard mx-auto w-full max-w-6xl px-6 sm:px-10">
        <p className="text-xs text-text-muted/85">Search</p>
        <h1 className="mt-3 max-w-2xl text-3xl leading-tight text-foreground sm:text-4xl">Find objects, collections, and quiet pages.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-text-secondary">
          A plain search surface for products, collection entries, and ritual pages. No filters to manage unless a word is useful.
        </p>
        <div className="mt-10">
          <GlobalSearchClient />
        </div>
      </div>
    </main>
  );
}

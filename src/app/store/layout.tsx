import type { Metadata } from "next";
import "./store.css";

const storeTitle = "Velune Quiet Extracts Store";
const storeDescription = "Velune Quiet Extracts storefront for botanical daily tonics in the United States.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.taoist365.com"),
  title: { absolute: storeTitle },
  description: storeDescription,
  alternates: {
    canonical: "/store",
    languages: {},
  },
  robots: { index: false, follow: false },
  openGraph: {
    title: storeTitle,
    description: storeDescription,
    url: "/store",
    siteName: "Velune",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: storeTitle,
    description: storeDescription,
  },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


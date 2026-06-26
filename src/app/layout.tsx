import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist_Mono, Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import { localizedAlternates } from "@/config/locales";
import { TemporalBandRoot } from "@/components/ritual/TemporalBandRoot";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const displaySerif = Cormorant_Garamond({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const rootTitle = `${siteConfig.siteName} — ${siteConfig.domain}`;

/** Matches page background so mobile chrome stays visually steady between revisits. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F0F2F5",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.metadataBase),
  title: {
    default: rootTitle,
    template: `%s — ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
    languages: localizedAlternates(""),
  },
  icons: {
    icon: "/brand/production/favicon.svg",
  },
  openGraph: {
    title: rootTitle,
    description: siteConfig.description,
    url: siteConfig.metadataBase,
    siteName: siteConfig.siteName,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: rootTitle,
    description: siteConfig.description,
  },
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      translate="no"
      className={`${inter.variable} ${geistMono.variable} ${displaySerif.variable} h-full antialiased notranslate`}
    >
      <body className="min-h-full flex flex-col notranslate">
        <TemporalBandRoot>{children}</TemporalBandRoot>
      </body>
    </html>
  );
}

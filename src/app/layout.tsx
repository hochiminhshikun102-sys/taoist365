import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist_Mono, Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
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

/** Matches page background so mobile chrome stays visually steady between revisits. */
export const viewport: Viewport = {
  themeColor: "#F0F2F5",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.metadataBase),
  title: {
    default: `${siteConfig.siteName} · ${siteConfig.brandEnName}`,
    template: `%s · ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.siteName} · ${siteConfig.brandEnName}`,
    description: siteConfig.description,
    url: siteConfig.metadataBase,
    siteName: siteConfig.siteName,
    locale: siteConfig.locale,
    type: "website",
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
      className={`${inter.variable} ${geistMono.variable} ${displaySerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TemporalBandRoot>{children}</TemporalBandRoot>
      </body>
    </html>
  );
}

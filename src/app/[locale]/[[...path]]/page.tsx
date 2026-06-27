import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutPage from "@/app/(marketing)/about/page";
import CookiePage from "@/app/(marketing)/cookie/page";
import DriftboxPage from "@/app/(marketing)/driftbox/page";
import GuidancePage from "@/app/(marketing)/guidance/page";
import HealingIndexPage from "@/app/(marketing)/healing/page";
import InquiryPage from "@/app/(marketing)/inquiry/page";
import JournalPage from "@/app/(marketing)/journal/page";
import QuietLiveRoomPage from "@/app/(marketing)/live/page";
import ObjectsPage from "@/app/(marketing)/objects/page";
import PrivacyPage from "@/app/(marketing)/privacy/page";
import QuietExtractsPage from "@/app/(marketing)/quiet-extracts/page";
import QuietReceivingPage from "@/app/(marketing)/quiet-receiving/page";
import RefundPage from "@/app/(marketing)/refund/page";
import SearchPage from "@/app/(marketing)/search/page";
import ShippingPage from "@/app/(marketing)/shipping/page";
import WindkeepPage from "@/app/(marketing)/windkeep/page";
import WindSeekerIntroPage from "@/app/(marketing)/wind-seeker-intro/page";
import { HomepageBrowserRoom } from "@/components/marketing/HomepageBrowserRoom";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import {
  isLocale,
  localeDefinitions,
  locales,
  localizedAlternates,
  localizedStaticPaths,
  type Locale,
} from "@/config/locales";
import { siteConfig } from "@/config/site";
import { getMessages } from "@/messages";

type LocalePageProps = {
  params: Promise<{ locale: string; path?: string[] }>;
};

const routeTitles: Record<string, string> = {
  "": "Dohara",
  about: "About",
  healing: "Healing",
  windkeep: "Windkeep",
  "quiet-receiving": "Quiet Receiving",
  guidance: "Guidance",
  live: "Quiet Live Room",
  objects: "Objects",
  inquiry: "Driftbox",
  driftbox: "Driftbox",
  journal: "Journal",
  "quiet-extracts": "Quiet Extracts",
  shipping: "Shipping",
  refund: "Refund",
  privacy: "Privacy",
  cookie: "Cookie",
  "wind-seeker-intro": "Wind Seeker",
  search: "Search",
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    localizedStaticPaths.map((path) => ({
      locale,
      path: path ? path.split("/") : undefined,
    })),
  );
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale, path = [] } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const routePath = path.join("/");
  const messages = getMessages(locale);
  const title = routeTitles[routePath] ?? messages.metadata.siteTitle;
  const canonical = `/${locale}${routePath ? `/${routePath}` : ""}`;
  const definition = localeDefinitions[locale as Locale];

  return {
    title,
    description: messages.metadata.siteDescription,
    alternates: {
      canonical,
      languages: localizedAlternates(routePath),
    },
    openGraph: {
      title: `${title} - ${siteConfig.siteName}`,
      description: messages.metadata.siteDescription,
      url: `${siteConfig.metadataBase}${canonical}`,
      siteName: siteConfig.siteName,
      locale: definition.ogLocale,
      type: "website",
    },
  };
}

function LocalizedFrame({
  children,
  locale,
  path,
}: Readonly<{
  children: React.ReactNode;
  locale: Locale;
  path: string;
}>) {
  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-5 pt-5 sm:px-8 lg:px-10">
        <LanguageSwitcher currentLocale={locale} path={path} />
      </div>
      {children}
    </>
  );
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale, path = [] } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const routePath = path.join("/");
  let page: React.ReactNode;

  switch (routePath) {
    case "":
      page = <HomepageBrowserRoom />;
      break;
    case "about":
      page = <AboutPage />;
      break;
    case "healing":
      page = <HealingIndexPage />;
      break;
    case "windkeep":
      page = <WindkeepPage />;
      break;
    case "quiet-receiving":
      page = <QuietReceivingPage />;
      break;
    case "guidance":
      page = <GuidancePage />;
      break;
    case "live":
      page = <QuietLiveRoomPage />;
      break;
    case "objects":
      page = <ObjectsPage />;
      break;
    case "inquiry":
      page = <InquiryPage />;
      break;
    case "driftbox":
      page = <DriftboxPage />;
      break;
    case "journal":
      page = <JournalPage />;
      break;
    case "quiet-extracts":
      page = <QuietExtractsPage />;
      break;
    case "shipping":
      page = <ShippingPage />;
      break;
    case "refund":
      page = <RefundPage />;
      break;
    case "privacy":
      page = <PrivacyPage />;
      break;
    case "cookie":
      page = <CookiePage />;
      break;
    case "wind-seeker-intro":
      page = <WindSeekerIntroPage />;
      break;
    case "search":
      page = <SearchPage />;
      break;
    default:
      notFound();
  }

  return (
    <LocalizedFrame locale={locale} path={routePath}>
      {page}
    </LocalizedFrame>
  );
}

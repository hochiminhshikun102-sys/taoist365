/**
 * C1-A 组件预览页 · V6三方试跑SOP V0.1
 * 路由：/__account-v6/preview/c1a（隔离预览，非正式页面）
 * 用途：发财+老板 Gate C1 视觉验收；Playwright截图基线源
 * 注意：本页允许data-dh-fixture标记的DEV示例；Gate O1与本页无关
 */
import type { Metadata } from "next";
import "@/styles/account/account-tokens.v1.1-r1.css";
import "@/styles/account/account-utilities.v1.css";
import "@/styles/account/v6-components-c1a.css";
import { AccountGlobalHeader } from "@/components/account/v6/AccountGlobalHeader";
import { AccountHero } from "@/components/account/v6/AccountHero";
import { AccountUtilityEnd } from "@/components/account/v6/AccountUtilityEnd";
import { CompactPageTitle } from "@/components/account/v6/CompactPageTitle";
import { SectionTitle } from "@/components/account/v6/SectionTitle";

export const metadata: Metadata = {
  title: "C1-A Component Preview · DOHARA V6 Trial",
  robots: { index: false, follow: false },
};

/* 官方资产（overview-v1-0-2冻结包，仓库现存路径） */
const ASSETS = {
  logo: "/brand/production/account/overview-v1-0-2/03_ASSETS/brand/dohara_logo_official.png",
  avatar: "/brand/production/account/global/header/lena-header-avatar.png",
  heroPc: "/brand/production/account/overview-v1-0-2/03_HERO/pc_deer_scene_asset.png",
  iconHelp: "/brand/production/account/overview-v1-0-2/03_ASSETS/icons/help.png",
  iconInfo: "/brand/production/account/overview-v1-0-2/03_ASSETS/icons/info.png",
};

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "var(--dh-sp-3)" }}>
      <p
        className="dh-scope"
        style={{
          fontSize: "var(--dh-text-cap)",
          lineHeight: "var(--dh-lh-cap)",
          color: "var(--dh-ink-muted)",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          margin: 0,
        }}
      >
        {label}
      </p>
      <div style={{ border: "var(--dh-line)", borderRadius: "var(--dh-radius-card)", overflow: "hidden", background: "var(--dh-bg)" }}>
        {children}
      </div>
    </section>
  );
}

export default function C1APreviewPage() {
  return (
    <>
    <link rel="stylesheet" href="/fonts/account/account-fonts.css" />
    <main
      className="dh-scope"
      style={{
        background: "var(--dh-bg-page)",
        minHeight: "100vh",
        padding: "var(--dh-sp-6)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--dh-sp-6)",
      }}
      data-dh-page="c1a-preview"
    >
      <CompactPageTitle
        title="C1-A Component Preview"
        subtitle="AccountGlobalHeader · AccountHero · AccountUtilityEnd · CompactPageTitle · SectionTitle"
      />

      {/* ═══ 1. AccountGlobalHeader ═══
          注：logo与action图标当前为overview-v1-0-2资产，一律标记
          dev-only fixture（R1第4条），不作为正式视觉基线 */}
      <Block label="AccountGlobalHeader · Normal">
        <AccountGlobalHeader
          logoSrc={ASSETS.logo}
          logoIsDevFixture
          memberName="Lena"
          avatarSrc={ASSETS.avatar}
          actions={[
            { iconSrc: ASSETS.iconHelp, label: "Support", href: "#", iconIsDevFixture: true },
            { iconSrc: ASSETS.iconInfo, label: "Notifications", href: "#", iconIsDevFixture: true },
          ]}
        />
      </Block>
      <Block label="AccountGlobalHeader · Disabled action / Locked">
        <AccountGlobalHeader
          logoSrc={ASSETS.logo}
          logoIsDevFixture
          memberName="Lena"
          avatarSrc={ASSETS.avatar}
          state="locked"
          actions={[
            { iconSrc: ASSETS.iconHelp, label: "Support", disabled: true, iconIsDevFixture: true },
          ]}
        />
      </Block>

      {/* ═══ 2. AccountHero ═══ */}
      <Block label="AccountHero · titleMode=standard + scenic bg (fixture)">
        <AccountHero
          title="My Account"
          eyebrow="Dohara Member"
          subtitle="Your space for orders, journals, mindful benefits, and member benefits."
          bgSrc={ASSETS.heroPc}
          bgIsDevFixture
        />
      </Block>
      <Block label="AccountHero · titleMode=long + notice + long body">
        <AccountHero
          title="Windkeep Records & Custody"
          titleMode="long"
          subtitle="Winckneys are financial custody under dedicated contracts. Sales objects are services for order-linked facts and follow Objects delivery rules. Subscriptions and services do not show shipment actions unless physical delivery exists."
          notice="Coverage: locked for DH business records"
          bgSrc={ASSETS.heroPc}
          bgIsDevFixture
        />
      </Block>
      <Block label="AccountHero · No background (fallback)">
        <AccountHero title="My Orders" subtitle="View your orders and order history." />
      </Block>

      {/* ═══ 3. CompactPageTitle ═══ */}
      <Block label="CompactPageTitle · Normal">
        <div style={{ padding: "var(--dh-sp-5)" }}>
          <CompactPageTitle title="Settings" subtitle="Manage your account and preferences." />
        </div>
      </Block>
      <Block label="CompactPageTitle · Long title">
        <div style={{ padding: "var(--dh-sp-5)" }}>
          <CompactPageTitle
            title="Member Benefits & Growth Privileges Overview"
            subtitle="Explore privileges and member offers across every stage of your DOHARA journey, including seasonal gifts and windkeep milestones."
          />
        </div>
      </Block>

      {/* ═══ 4. SectionTitle ═══ */}
      <Block label="SectionTitle · Normal + View All">
        <div style={{ padding: "var(--dh-sp-5)" }}>
          <SectionTitle title="Recent Activity" viewAllHref="#" />
        </div>
      </Block>
      <Block label="SectionTitle · Long title, no link">
        <div style={{ padding: "var(--dh-sp-5)" }}>
          <SectionTitle title="Services & Guidance for Mindful Living and Windkeep Custody" />
        </div>
      </Block>

      {/* ═══ 5. AccountUtilityEnd ═══ */}
      <Block label="AccountUtilityEnd · Normal + disabled link">
        <AccountUtilityEnd
          links={[
            { label: "Terms", href: "#" },
            { label: "Privacy", href: "#" },
            { label: "Accessibility", href: "#" },
            { label: "Sitemap", href: "#", disabled: true },
            { label: "Back to top", href: "#" },
          ]}
          copyright="© 2026 DOHARA. All rights reserved."
        />
      </Block>
    </main>
    </>
  );
}

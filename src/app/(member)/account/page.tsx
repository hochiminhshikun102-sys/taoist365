/**
 * Account Center Overview — V0.2 TRIAL + V0.3 FINAL CORRECTION (Dogdan)
 * Route: /account (FORMAL)
 * Authority: DOHARA_Account_Overview_Page_Package_V0_1_TRIAL_PACKAGE_READY_V0_3_FINAL_CORRECTION
 *            SHA256 98dd7211d5c55c64e0809849eb9c62fa3e889089d23b0045125e7a3cbf00ed61
 * Rules honored: 4 independent layers; Grid/Flex body; Final never a background;
 * Visibility/State Matrix unchanged; V0.3 locks header_geometry_final,
 * small_mark_optical_alignment, wind_seeker_final. Copy unchanged.
 */
import type { Metadata } from "next";
import { AccountCommerceTail } from "@/components/account-overview/AccountCommerceTail";
import "./dh-ov2.css";

export const metadata: Metadata = {
  title: "Account Overview · V0.2 TRIAL (Dogdan initial build)",
  robots: { index: false, follow: false },
};

const A = "/dh/account/overview/assets";
/* V0.3 final correction: generic DH marks use transparent-edge-trimmed assets so
   the VISIBLE glyph (not the old 256x256 frame) is what the circular holder centers. */
const TRIM = (n: string) => `${A}/icons_trimmed/${n}.png`;
const IMG = (n: string) => `${A}/images/${n}.png`;
const CHEVRON = TRIM("chevron_right");
/* Wind Seeker independent mark, no English wordmark (all 4 wind-seeker locations). */
const WSMARK = IMG("wind_seeker_mark_only_trimmed");

/* Unified circular holder: same visible ring per repeated row so sibling marks
   share one top + centerline (small_mark_optical_alignment.locked.json).
   Brand exception: WindKeep / Wind Seeker NEVER enter the generic DH circular holder.
   WindKeep uses a same-size transparent brand slot for row alignment only. */
function Mark(props: { icon: string; group: string; current?: boolean; brand?: boolean }) {
  if (props.brand) {
    return (
      <span className={`dh-brand-mark dh-brand-mark--${props.group}`}>
        <img className="dh-mark-img" src={props.icon} alt="" />
      </span>
    );
  }
  return (
    <span className={`dh-holder dh-holder--${props.group}${props.current ? " is-current" : ""}`}>
      <img className="dh-mark-img" src={props.icon} alt="" />
    </span>
  );
}

function EntryCard(props: {
  cid: string;
  icon: string;
  title: string;
  desc: string;
  href: string;
  badge?: string;
  locked?: boolean;
  current?: boolean;
  brand?: boolean;
}) {
  return (
    <a className="entry-card" data-control-id={props.cid} href={props.href}>
      <Mark icon={props.icon} group="primary_entry" current={props.current} brand={props.brand} />
      <span className="entry-copy">
        <strong className="slot-text card-title" data-slot-id={`${props.cid}_title`}>
          {props.title}
        </strong>
        <span className="slot-text card-desc" data-slot-id={`${props.cid}_desc`}>
          {props.desc}
        </span>
      </span>
      {props.badge ? (
        <span className="slot-text current-badge" data-slot-id={`${props.cid}_badge`}>
          {props.badge}
        </span>
      ) : null}
      {props.locked ? (
        <span className="gate-lock" aria-label="Locked">
          ●
        </span>
      ) : null}
      <img className="ui-icon" src={CHEVRON} alt="" />
    </a>
  );
}

function StatCard(props: {
  cid: string;
  icon: string;
  href: string;
  value: string;
  title: string;
  state: string;
  brand?: boolean;
}) {
  return (
    <a className="stat" data-control-id={props.cid} href={props.href}>
      <Mark icon={props.icon} group="summary_stat" brand={props.brand} />
      <strong className="slot-text stat-value" data-slot-id={`${props.cid}_value`}>
        {props.value}
      </strong>
      <strong className="slot-text stat-title" data-slot-id={`${props.cid}_title`}>
        {props.title}
      </strong>
      <span className="slot-text stat-state" data-slot-id={`${props.cid}_state`}>
        {props.state}
      </span>
    </a>
  );
}

function ActivityRow(props: {
  cid: string;
  icon: string;
  href: string;
  text: string;
  time: string;
}) {
  return (
    <a className="activity-row" data-control-id={props.cid} href={props.href}>
      <Mark icon={props.icon} group="recent_activity" />
      <span className="slot-text activity-text" data-slot-id={`${props.cid}_text`}>
        {props.text}
      </span>
      <time className="slot-text activity-time" data-slot-id={`${props.cid}_time`}>
        {props.time}
      </time>
    </a>
  );
}

function CardWithChevron(props: {
  cls: string;
  copyCls: string;
  cid: string;
  icon: string;
  href: string;
  title: string;
  desc: string;
  group: string;
}) {
  return (
    <a className={props.cls} data-control-id={props.cid} href={props.href}>
      <Mark icon={props.icon} group={props.group} />
      <span className={props.copyCls}>
        <strong className="slot-text card-title" data-slot-id={`${props.cid}_title`}>
          {props.title}
        </strong>
        <span className="slot-text card-desc" data-slot-id={`${props.cid}_desc`}>
          {props.desc}
        </span>
      </span>
      <img className="ui-icon" src={CHEVRON} alt="" />
    </a>
  );
}

export default function AccountOverviewV02TrialPage() {
  return (
    <div className="dh-ov2" id="top" data-dh-page="account-overview-v0_2-trial" data-page="account-overview-v0_2-trial">
      <header className="account-header" data-layer="header">
        <button className="header-menu mobile-only" data-control-id="header_menu" type="button">
          <img className="ui-icon" src={TRIM("menu")} alt="" />
        </button>
        <img className="header-logo" src={`${A}/header/header_dohara_wordmark_only.png`} alt="Dohara" />
        <nav className="header-actions" aria-label="Account utilities">
          <button type="button" data-control-id="header_notification" aria-label="Notifications">
            <img className="ui-icon" src={TRIM("notification")} alt="" />
          </button>
          <button type="button" data-control-id="header_support" aria-label="Support">
            <img className="ui-icon" src={TRIM("support")} alt="" />
          </button>
          <button type="button" className="profile-control" data-control-id="header_profile" aria-label="Account menu">
            <img className="avatar" src={`${A}/header/header_avatar_lena.png`} alt="" />
            <span className="slot-text pc-only" data-slot-id="header_user">
              Lena
            </span>
            <span className="pc-only" aria-hidden="true">
              ⌄
            </span>
          </button>
        </nav>
      </header>

      <section className="account-hero" data-layer="hero">
        <picture>
          <source media="(max-width:600px)" srcSet={IMG("overview_hero_mobile_clean_exact_scene_390x280")} />
          <img className="hero-scene" src={IMG("overview_hero_pc_clean_exact_scene_1440x420")} alt="" />
        </picture>
        <div className="hero-copy">
          <h1 className="slot-text" data-slot-id="hero_title">
            My Account
          </h1>
          <span className="gold-rule" />
          <p className="slot-text" data-slot-id="hero_body">
            Your space for orders, journals, mindful benefits, and member benefits.
          </p>
        </div>
      </section>

      <main className="account-content" data-layer="content">
        <section className="primary-grid" aria-label="Account sections">
          <EntryCard cid="entry_overview" icon={TRIM("account_overview")} href="/account" title="Overview" desc="Account at a glance and recent activity." badge="Current" current />
          <EntryCard cid="entry_orders" icon={TRIM("my_orders")} href="/account/orders" title="My Orders" desc="View your orders and order history." />
          <EntryCard cid="entry_journal" icon={TRIM("my_journal")} href="/account/journal" title="My Journal" desc="Discover insights and journal entries." />
          <EntryCard cid="entry_windkeep" icon={IMG("windkeep_brand_mark")} href="/account/windkeep" title="My WindKeep" desc="Track your WindKeep activity and progress." brand />
          <EntryCard cid="entry_saved" icon={TRIM("saved_objects")} href="/account/saved" title="Saved Objects" desc="View and manage your saved items." />
          <EntryCard cid="entry_services" icon={TRIM("services")} href="/account/services" title="Services" desc="Access Guidance, Healing and Support." />
          <EntryCard cid="entry_member" icon={TRIM("member_benefits")} href="/account/member-benefits" title="Member Benefits" desc="Explore privileges and member offers." />
          <EntryCard cid="entry_creator" icon={TRIM("creator_studio")} href="/account/studio" title="Creator Studio" desc="Manage content and creator resources." locked />
          <EntryCard cid="entry_invite" icon={TRIM("invite_rewards")} href="/account/invite" title="Invite & Rewards" desc="Invite friends and view earned rewards." locked />
          <EntryCard cid="entry_profile" icon={TRIM("profile")} href="/account/profile" title="Profile" desc="Manage your personal information." />
          <EntryCard cid="entry_settings" icon={TRIM("settings")} href="/account/settings" title="Settings" desc="Manage your account and preferences." />
          <button className="entry-card" data-control-id="entry_signout" data-action="sign_out" type="button">
            <Mark icon={TRIM("sign_out")} group="primary_entry" />
            <span className="entry-copy">
              <strong className="slot-text card-title" data-slot-id="entry_signout_title">
                Sign Out
              </strong>
              <span className="slot-text card-desc" data-slot-id="entry_signout_desc">
                Securely sign out of your account.
              </span>
            </span>
          </button>
        </section>

        <section className="stats-strip" aria-label="Account status">
          <StatCard cid="stat_orders" icon={TRIM("my_orders")} href="/account/orders" value="3" title="Orders" state="Processing" />
          <StatCard cid="stat_windkeep" icon={IMG("windkeep_brand_mark")} href="/account/windkeep" value="2" title="WindKeep" state="Active" brand />
          <StatCard cid="stat_guidance" icon={TRIM("guidance")} href="/account/guidance" value="1" title="Guidance" state="Open" />
          <StatCard cid="stat_subscriptions" icon={TRIM("subscriptions")} href="/account/subscriptions" value="4" title="Subscriptions" state="Active" />
        </section>

        <section className="recent-panel">
          <div className="section-heading-row">
            <h2 className="slot-text" data-slot-id="recent_heading">
              Recent Activity
            </h2>
            <a className="view-all" data-control-id="recent_view_all" href="/account/activity">
              <span className="slot-text" data-slot-id="recent_view_all_text">
                View All
              </span>{" "}
              <img className="ui-icon" src={CHEVRON} alt="" />
            </a>
          </div>
          <div className="activity-list">
            <ActivityRow cid="recent_order" icon={TRIM("parcel")} href="/account/orders/DH2311" text="Order #DH2311 is being processed." time="Today, 10:24 AM" />
            <ActivityRow cid="recent_windseeker" icon={TRIM("under_review")} href="/wind-seeker" text="You applied to the Wind Seeker network." time="Yesterday, 11:47 AM" />
            <ActivityRow cid="recent_journal" icon={TRIM("my_journal")} href="/account/journal" text="New journal entry added." time="May 16, 2025" />
          </div>
        </section>

        <section className="journey-section">
          <h2 className="slot-text section-title" data-slot-id="journey_heading">
            Continue Your Journey
          </h2>
          <div className="journey-grid">
            <a className="journey-card" data-control-id="journey_journal" href="/account/journal">
              <img className="media-image" src={IMG("journey_journal_pc_608x214")} alt="" />
              <span className="journey-copy">
                <strong className="slot-text card-title" data-slot-id="journey_journal_title">
                  Resume Your Journal
                </strong>
                <span className="slot-text card-desc" data-slot-id="journey_journal_desc">
                  Pick up where you left off and capture your thoughts.
                </span>
              </span>
              <img className="ui-icon" src={CHEVRON} alt="" />
            </a>
            <a className="journey-card" data-control-id="journey_saved" href="/account/saved">
              <img className="media-image" src={IMG("journey_saved_pc_608x214")} alt="" />
              <span className="journey-copy">
                <strong className="slot-text card-title" data-slot-id="journey_saved_title">
                  Explore Saved Objects
                </strong>
                <span className="slot-text card-desc" data-slot-id="journey_saved_desc">
                  Revisit your favorites and get inspired.
                </span>
              </span>
              <img className="ui-icon" src={CHEVRON} alt="" />
            </a>
          </div>
        </section>

        <section className="services-section">
          <h2 className="slot-text section-title" data-slot-id="services_heading">
            Services & Guidance
          </h2>
          <div className="services-grid">
            <CardWithChevron cls="service-card" copyCls="service-copy" group="services" cid="service_concierge" icon={TRIM("ai_concierge")} href="/account/ai-concierge" title="Concierge" desc="Get instant support and personalized assistance." />
            <CardWithChevron cls="service-card" copyCls="service-copy" group="services" cid="service_guidance" icon={TRIM("guidance")} href="/account/guidance" title="Guidance" desc="Connect with trusted guides for clarity and direction." />
            <CardWithChevron cls="service-card" copyCls="service-copy" group="services" cid="service_healing" icon={TRIM("healing_paths")} href="/account/healing" title="Healing Paths" desc="Explore practices for well-being, balance and renewal." />
            <CardWithChevron cls="service-card" copyCls="service-copy" group="services" cid="service_subscriptions" icon={TRIM("subscriptions")} href="/account/subscriptions" title="Subscriptions" desc="Manage your plans and subscription benefits." />
          </div>
        </section>

        <section className="wind-banner">
          <img className="wind-mark" src={WSMARK} alt="" />
          <div className="wind-copy">
            <h2 className="slot-text" data-slot-id="wind_heading">
              Join the Wind Seeker Network
            </h2>
            <strong className="slot-text" data-slot-id="wind_subheading">
              Become a Global Hope for Dohara
            </strong>
            <p className="slot-text" data-slot-id="wind_body">
              Discover accomplished seekers from around the world and shine like the Wind to serve Dohara. Create new hope on your journey every day.
            </p>
            <div className="wind-actions">
              <a className="primary-button" data-control-id="wind_apply" href="/wind-seeker-intro">
                <span className="slot-text" data-slot-id="wind_apply_text">
                  Apply as Wind Seeker
                </span>
              </a>
              <a className="secondary-button" data-control-id="wind_learn" href="/wind-seeker-intro">
                <span className="slot-text" data-slot-id="wind_learn_text">
                  Learn More
                </span>
              </a>
            </div>
          </div>
        </section>

        <section className="wind-status">
          <img className="wind-status-mark" src={WSMARK} alt="" />
          <div className="wind-status-copy">
            <span className="slot-text" data-slot-id="wind_status_label">
              Wind Seeker Status
            </span>
            <strong className="slot-text" data-slot-id="wind_status_value">
              Not Applied Yet
            </strong>
          </div>
          <p className="slot-text" data-slot-id="wind_status_body">
            Apply today to open new opportunities and unlock unique perks.
          </p>
          <a data-control-id="wind_status_action" href="/wind-seeker">
            <span className="slot-text" data-slot-id="wind_status_action_text">
              View Details
            </span>
          </a>
        </section>

        <section className="support-grid">
          <CardWithChevron cls="support-card" copyCls="support-copy" group="support" cid="support_center" icon={TRIM("support")} href="/account/support" title="Support Center" desc="Get help with your account, orders, or questions." />
          <CardWithChevron cls="support-card" copyCls="support-copy" group="support" cid="support_policies" icon={TRIM("security")} href="/account/policies" title="Policies & Guidelines" desc="Review privacy, security, terms, and community rules." />
          <CardWithChevron cls="support-card" copyCls="support-copy" group="support" cid="support_notes" icon={TRIM("information")} href="/account/notes" title="Account Notes" desc="Important updates and information for you." />
        </section>

        <AccountCommerceTail />
      </main>

      <footer className="light-footer" data-layer="end" data-tail-section="light-footer">
        <nav>
          <a href="/account/support">Help &amp; Support</a>
          <a href="/account/policies/shipping-returns">Shipping &amp; Returns</a>
          <a href="/account/settings/privacy-security">Privacy &amp; Security</a>
          <a href="/account/policies">Policies &amp; Guidelines</a>
        </nav>
        <div>
          <a href="/account/policies/terms">Terms</a><i />
          <a href="/account/policies/privacy">Privacy</a><i />
          <a href="/account/policies/accessibility">Accessibility</a><i />
          <a href="/sitemap">Sitemap</a>
          <small>© 2026 DOHARA. All rights reserved.</small>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

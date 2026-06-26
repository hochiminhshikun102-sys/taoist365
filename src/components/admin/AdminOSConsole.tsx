"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useState } from "react";
import { locales, localeDefinitions } from "@/config/locales";
import { siteConfig } from "@/config/site";
import { AssetRegistryAdmin } from "@/components/admin/AssetRegistryAdmin";
import { GlobalBuyerAdminRuntime, isGlobalBuyerAdminWorkspace } from "@/components/admin/GlobalBuyerAdminRuntime";
import { OrderAdminQueue } from "@/components/admin/OrderAdminQueue";
import { PublishedObjectsAdmin } from "@/components/admin/PublishedObjectsAdmin";
import { ObjectIntakeAdminNew } from "@/components/object-intake/ObjectIntakeAdminNew";
import { ObjectIntakeAdminQueue } from "@/components/object-intake/ObjectIntakeAdminQueue";

const t = {
  adminSystem: "\u540e\u53f0\u7cfb\u7edf",
  media: "\u7d20\u6750\u4e2d\u5fc3",
  ai: "AI \u8fd0\u8425",
  commerce: "\u5546\u54c1\u4e0e\u8ba2\u5355",
  logistics: "\u7269\u6d41\u7ba1\u7406",
  supply: "\u4f9b\u5e94\u94fe\u7ba1\u7406",
  member: "\u4f1a\u5458\u4e2d\u5fc3",
  risk: "\u4f1a\u5458\u98ce\u63a7",
  client: "\u5ba2\u6237\u7aef\u540e\u53f0",
  frontstage: "\u524d\u53f0\u8fd0\u8425",
  message: "\u6d88\u606f\u4e0e\u901a\u77e5",
  campaign: "\u6d3b\u52a8\u4e0e\u8425\u9500",
  afterSales: "\u552e\u540e\u4e2d\u5fc3",
  moderation: "\u793e\u533a\u4e0e\u5185\u5bb9\u5ba1\u6838",
  compliance: "\u5408\u89c4\u4e0e\u6cd5\u52a1",
  finance: "\u8d22\u52a1\u4e0e\u7ed3\u7b97",
  windSeeker: "Wind Seeker",
  windkeep: "\u7269\u4ef6\u6d41\u8f6c",
  driftbox: "\u5b89\u9759\u6765\u4fe1",
  rules: "\u89c4\u5219\u4e2d\u5fc3",
  upload: "\u4e0a\u4f20\u89c4\u8303",
  aiStatus: "AI \u72b6\u6001",
  ruleBinding: "\u89c4\u5219\u7ed1\u5b9a",
  localeGeo: "\u8bed\u8a00\u4e0e\u5730\u533a",
  quick: "\u79fb\u52a8\u5feb\u6377",
  assetGovernance: "\u7d20\u6750\u6cbb\u7406",
  noCrop: "\u7981\u6b62\u88c1\u5207",
  threeLevels: "\u4e09\u7ea7\u4ee5\u5185",
} as const;

export type AdminWorkspaceId =
  | "overview"
  | "product-intake"
  | "publish-review"
  | "objects"
  | "orders"
  | "payments"
  | "wind-seeker-approval"
  | "ai-product-moderation"
  | "buyer-risk-dashboard"
  | "wind-seeker-settlement"
  | "logistics-monitor"
  | "dispute-runtime"
  | "buyer-deposit-runtime"
  | "wind-seeker-drafts"
  | "wind-seeker-notifications"
  | "wind-seeker-account"
  | "shipping-runtime"
  | "refund-runtime"
  | "buyer-level-runtime"
  | "aml-kyc-runtime"
  | "wind-seeker-risk-runtime"
  | "wind-seeker-moderation-runtime"
  | "multi-language-runtime"
  | "multi-currency-runtime"
  | "region-restriction-runtime"
  | "country-restriction-runtime"
  | "sanctions-runtime"
  | "legal-runtime"
  | "compliance-runtime"
  | "aml-runtime"
  | "settlement-runtime"
  | "moderation-runtime"
  | "deposit-runtime"
  | "audit-runtime"
  | "risk-runtime"
  | "quiet-receiving-runtime"
  | "chargeback-runtime"
  | "counterfeit-enforcement"
  | "message-center"
  | "notification-overview"
  | "notification-templates"
  | "user-messages"
  | "push-channels"
  | "notification-audit"
  | "ai-reach-reserve"
  | "campaign-center"
  | "coupons"
  | "campaigns"
  | "points-mall"
  | "sharing-reserve"
  | "roi-data"
  | "ai-campaign-optimization"
  | "after-sales-center"
  | "after-sales-requests"
  | "refunds-runtime"
  | "exchange-runtime"
  | "arbitration-runtime"
  | "after-sales-tracking"
  | "after-sales-risk-link"
  | "community-moderation"
  | "comment-review"
  | "report-handling"
  | "ugc-review"
  | "sensitive-words"
  | "ai-content-moderation"
  | "media-moderation"
  | "compliance-legal"
  | "gdpr-runtime"
  | "ccpa-runtime"
  | "terms-runtime"
  | "privacy-policy-runtime"
  | "ai-usage-agreement"
  | "infringement-handling"
  | "legal-logs"
  | "finance-settlement"
  | "finance-overview"
  | "reconciliation"
  | "refund-reconciliation"
  | "partner-settlement"
  | "tax-runtime"
  | "funds-ledger"
  | "freeze-unfreeze"
  | "finance-audit-logs"
  | "homepage-runtime"
  | "section-runtime"
  | "navigation-runtime"
  | "frontstage-visual"
  | "homepage-rotation"
  | "publishing-runtime"
  | "global-locale-runtime"
  | "quiet-analytics"
  | "frontstage-safe-area"
  | "atmosphere-governance"
  | "ai-queue"
  | "ai-image"
  | "ai-video"
  | "seo-geo-runtime"
  | "geo"
  | "viral-radar"
  | "logistics"
  | "tracking"
  | "freight"
  | "returns"
  | "suppliers"
  | "inventory"
  | "procurement"
  | "costs"
  | "brand-assets"
  | "product-media"
  | "social-media"
  | "prompt-packs"
  | "safe-area"
  | "member-center"
  | "member-risk-control"
  | "client-runtime"
  | "windkeep"
  | "driftbox"
  | "rules-binding"
  | "locale-geo";

type Workspace = {
  id: AdminWorkspaceId;
  cn: string;
  en: string;
  state: string;
  work: readonly string[];
  ai?: readonly string[];
  mobile?: readonly string[];
};

const workspaceMap = {
  overview: {
    id: "overview",
    cn: t.adminSystem,
    en: "Operating Overview",
    state: "Runtime workspace active",
    work: ["Workspace switch", "Module status", "Rules binding", "Mobile essentials", "AI lanes", "Asset governance"],
  },
  "product-intake": {
    id: "product-intake",
    cn: "宝贝入库",
    en: "Product Intake",
    state: "Object intake pipeline",
    work: ["Source", "Media modules", "AI draft", "Human supplement", "Submit review", "Audit log"],
  },
  "publish-review": {
    id: "publish-review",
    cn: "发布审核",
    en: "Publish Review",
    state: "Review and publish queue",
    work: ["Review pending", "Approve", "Revision required", "Reject", "Publish object_id", "Audit log"],
  },
  objects: {
    id: "objects",
    cn: "\u5546\u54c1\u7cfb\u7edf",
    en: "Objects Runtime",
    state: "Commerce shell",
    work: ["Object list", "Product cards", "Wishlist state", "Filtering", "Sorting", "Review queue"],
  },
  orders: {
    id: "orders",
    cn: "\u8ba2\u5355\u7cfb\u7edf",
    en: "Orders Runtime",
    state: "Operations shell",
    work: ["Order list", "Payment status", "Fulfillment status", "Support notes", "Returns", "Export"],
  },
  payments: {
    id: "payments",
    cn: "\u652f\u4ed8\u7ba1\u7406",
    en: "Payments Runtime",
    state: "Provider-ready shell",
    work: ["Provider status", "Refunds", "Region rules", "Risk link", "Reconciliation", "Exception queue"],
  },
  "wind-seeker-approval": {
    id: "wind-seeker-approval",
    cn: "Wind Seeker \u5ba1\u6838",
    en: "Wind Seeker Approval",
    state: "3-minute listing review",
    work: ["Photo intake", "AI clarity check", "Story review", "Price review", "Human approval", "Publish queue"],
    ai: ["AI title", "AI description", "SEO / GEO", "Suggested price", "Safe Area check"],
    mobile: ["Pending", "Approve", "Reject", "Message"],
  },
  "ai-product-moderation": {
    id: "ai-product-moderation",
    cn: "AI \u7269\u4ef6\u5ba1\u6838",
    en: "AI Product Moderation",
    state: "AI review runtime",
    work: ["Image safety", "Video safety", "Copy safety", "Object category", "Duplicate detection", "Manual review"],
    ai: ["AI clarity detection", "AI safety score", "AI duplicate scan", "AI price range"],
  },
  "buyer-risk-dashboard": {
    id: "buyer-risk-dashboard",
    cn: "\u4e70\u65b9\u98ce\u9669\u4eea\u8868",
    en: "Buyer Risk Dashboard",
    state: "Trust linked",
    work: ["Deposit state", "Order behavior", "Dispute flags", "Account risk", "Restriction link", "Audit"],
    ai: ["AI risk scoring", "AI fraud signal", "Deposit recommendation"],
  },
  "wind-seeker-settlement": {
    id: "wind-seeker-settlement",
    cn: "Wind Seeker \u7ed3\u7b97",
    en: "Settlement Runtime",
    state: "Finance linked",
    work: ["Pending settlement", "Released funds", "Fee records", "Refund link", "Freeze / unfreeze", "Audit logs"],
    mobile: ["Balance", "Pending", "Payout state"],
  },
  "logistics-monitor": {
    id: "logistics-monitor",
    cn: "\u7269\u6d41\u76d1\u63a7",
    en: "Logistics Monitor",
    state: "Shipping linked",
    work: ["Tracking input", "Carrier select", "Shipment status", "Exception monitor", "Returns", "Delivery logs"],
    mobile: ["Tracking", "Exception", "Return"],
  },
  "dispute-runtime": {
    id: "dispute-runtime",
    cn: "\u4e89\u8bae\u5904\u7406",
    en: "Dispute Runtime",
    state: "After-sales linked",
    work: ["Dispute queue", "Evidence", "Messages", "Decision", "Refund link", "Risk link"],
    ai: ["AI case summary", "AI arbitration reserve", "Risk pattern"],
  },
  "buyer-deposit-runtime": {
    id: "buyer-deposit-runtime",
    cn: "\u4e70\u65b9\u4fdd\u8bc1\u91d1",
    en: "Buyer Deposit Runtime",
    state: "Deposit active",
    work: ["Deposit records", "Hold state", "Release state", "Risk link", "Refund link", "Audit logs"],
  },
  "wind-seeker-drafts": {
    id: "wind-seeker-drafts",
    cn: "Wind Seeker \u8349\u7a3f",
    en: "Draft Runtime",
    state: "Mobile first",
    work: ["Draft list", "AI generated copy", "Price", "Condition", "Region", "Unique object", "Story"],
    mobile: ["Continue draft", "Photo", "Publish"],
  },
  "wind-seeker-notifications": {
    id: "wind-seeker-notifications",
    cn: "Wind Seeker \u901a\u77e5",
    en: "Notification Runtime",
    state: "Message linked",
    work: ["Review notice", "Order notice", "Settlement notice", "Dispute notice", "Shipping notice", "Logs"],
    mobile: ["Unread", "Reply", "Switches"],
  },
  "wind-seeker-account": {
    id: "wind-seeker-account",
    cn: "Wind Seeker \u8d26\u6237",
    en: "Account Runtime",
    state: "Trust linked",
    work: ["Profile", "Verification", "Region", "Payout account", "Deposit status", "Account logs"],
    mobile: ["Profile", "Verification", "Balance"],
  },
  "shipping-runtime": {
    id: "shipping-runtime",
    cn: "\u53d1\u8d27",
    en: "Shipping Runtime",
    state: "Logistics linked",
    work: ["Shipping address", "Carrier", "Label", "Pickup", "Tracking", "Exception"],
    mobile: ["Ship", "Tracking", "Exception"],
  },
  "refund-runtime": {
    id: "refund-runtime",
    cn: "\u9000\u6b3e",
    en: "Refund Runtime",
    state: "Finance linked",
    work: ["Refund request", "Reason", "Payment link", "Approval", "Release", "Audit"],
  },
  "buyer-level-runtime": {
    id: "buyer-level-runtime",
    cn: "\u4e70\u65b9\u7b49\u7ea7",
    en: "Buyer Level Runtime",
    state: "Trust tier active",
    work: ["Level table", "Deposit rule", "Order behavior", "Dispute state", "Country rule", "Audit"],
    ai: ["AI trust scoring", "AI behavior signal", "AI deposit suggestion"],
  },
  "aml-kyc-runtime": {
    id: "aml-kyc-runtime",
    cn: "AML / KYC",
    en: "AML / KYC Runtime",
    state: "Identity review",
    work: ["KYC submission", "AML review", "Document status", "Country risk", "Sanctions hit", "Manual approval"],
    ai: ["AI document check", "AI risk country signal", "AI sanctions precheck"],
  },
  "wind-seeker-risk-runtime": {
    id: "wind-seeker-risk-runtime",
    cn: "Wind Seeker \u98ce\u63a7",
    en: "Risk Runtime",
    state: "Risk country dynamic update",
    work: ["Risk country table", "Freeze runtime", "Counterfeit enforcement", "Dispute link", "Chargeback link", "Audit"],
    ai: ["AI risk scoring", "AI counterfeit signal", "AI chargeback risk"],
  },
  "wind-seeker-moderation-runtime": {
    id: "wind-seeker-moderation-runtime",
    cn: "Wind Seeker \u5ba1\u6838\u961f\u5217",
    en: "Moderation Runtime",
    state: "Review queue active",
    work: ["Object review", "Image review", "Video review", "Copy review", "Approve", "Reject", "Logs"],
    ai: ["AI image moderation", "AI copy moderation", "AI duplicate scan"],
  },
  "multi-language-runtime": {
    id: "multi-language-runtime",
    cn: "\u591a\u8bed\u8a00",
    en: "Multi-language Runtime",
    state: "Locale ready",
    work: ["Language list", "Translation queue", "SEO / GEO copy", "Localized policy", "Publish state", "Logs"],
  },
  "multi-currency-runtime": {
    id: "multi-currency-runtime",
    cn: "\u591a\u5e01\u79cd",
    en: "Multi-currency Runtime",
    state: "Finance linked",
    work: ["Currency table", "FX note", "Settlement currency", "Deposit currency", "Refund currency", "Audit"],
  },
  "region-restriction-runtime": {
    id: "region-restriction-runtime",
    cn: "\u533a\u57df\u9650\u5236",
    en: "Region Restriction Runtime",
    state: "GEO linked",
    work: ["Region rules", "Shipping regions", "Payment regions", "Policy version", "Override", "Logs"],
  },
  "country-restriction-runtime": {
    id: "country-restriction-runtime",
    cn: "\u56fd\u5bb6\u9650\u5236",
    en: "Country Restriction Runtime",
    state: "Country table active",
    work: ["Country table", "Risk level", "Allowed state", "Blocked state", "Manual override", "Audit"],
  },
  "sanctions-runtime": {
    id: "sanctions-runtime",
    cn: "\u5236\u88c1\u540d\u5355",
    en: "Sanctions Runtime",
    state: "Compliance linked",
    work: ["Sanctions table", "Screening queue", "Country risk", "AML review", "Freeze link", "Audit logs"],
    ai: ["AI sanctions precheck", "AI false-positive summary"],
  },
  "legal-runtime": {
    id: "legal-runtime",
    cn: "\u6cd5\u52a1",
    en: "Legal Runtime",
    state: "Backend full runtime",
    work: ["Frontstage Public Version", "Backend Full Runtime Version", "Terms version", "Privacy version", "Cookie version", "Rollback"],
  },
  "compliance-runtime": {
    id: "compliance-runtime",
    cn: "\u5408\u89c4",
    en: "Compliance Runtime",
    state: "Global compliance",
    work: ["GDPR", "CCPA", "AI usage", "Country restriction", "Sanctions runtime", "Logs"],
  },
  "aml-runtime": {
    id: "aml-runtime",
    cn: "AML",
    en: "AML Runtime",
    state: "Review active",
    work: ["AML review", "KYC link", "Risk country", "Sanctions hit", "Freeze runtime", "Audit"],
  },
  "settlement-runtime": {
    id: "settlement-runtime",
    cn: "\u7ed3\u7b97",
    en: "Settlement Runtime",
    state: "Global settlement",
    work: ["Settlement table", "Multi-currency", "Payout", "Deposit release", "Refund link", "Audit"],
  },
  "moderation-runtime": {
    id: "moderation-runtime",
    cn: "\u5ba1\u6838",
    en: "Moderation Runtime",
    state: "Queue active",
    work: ["Review queue", "Approve", "Reject", "Counterfeit enforcement", "Sensitive copy", "Logs"],
  },
  "deposit-runtime": {
    id: "deposit-runtime",
    cn: "\u4fdd\u8bc1\u91d1",
    en: "Deposit Runtime",
    state: "Hold / release",
    work: ["Deposit table", "Hold", "Release", "Refund", "Risk link", "Audit"],
  },
  "audit-runtime": {
    id: "audit-runtime",
    cn: "\u5ba1\u8ba1",
    en: "Audit Runtime",
    state: "Logs active",
    work: ["Operator logs", "Policy logs", "Finance logs", "Risk logs", "Export", "History"],
  },
  "risk-runtime": {
    id: "risk-runtime",
    cn: "\u98ce\u63a7",
    en: "Risk Runtime",
    state: "Global risk",
    work: ["Risk country dynamic update", "Freeze runtime", "Counterfeit enforcement", "Dispute runtime", "Chargeback runtime", "Audit"],
    ai: ["AI risk scoring", "AI fraud prediction", "AI restriction strategy"],
  },
  "quiet-receiving-runtime": {
    id: "quiet-receiving-runtime",
    cn: "Quiet Receiving",
    en: "Quiet Receiving Runtime",
    state: "Windkeep linked",
    work: ["Continuation request", "Receiving review", "Object memory", "Keeper note", "Risk link", "Publish"],
  },
  "chargeback-runtime": {
    id: "chargeback-runtime",
    cn: "\u62d2\u4ed8",
    en: "Chargeback Runtime",
    state: "Finance risk",
    work: ["Chargeback queue", "Evidence", "Payment provider", "Risk link", "Decision", "Audit"],
  },
  "counterfeit-enforcement": {
    id: "counterfeit-enforcement",
    cn: "\u5047\u8d27\u6cbb\u7406",
    en: "Counterfeit Enforcement",
    state: "Moderation linked",
    work: ["Counterfeit queue", "Evidence", "Object source", "Reject", "Freeze", "Audit"],
  },
  "message-center": {
    id: "message-center",
    cn: t.message,
    en: "Message & Notification Center",
    state: "Interactive runtime",
    work: ["Notification overview", "Templates", "User messages", "Push Channels", "Audit logs", "AI reach reserve"],
    ai: ["AI reach reserve", "Template suggestion", "Channel timing", "Delivery anomaly"],
    mobile: ["Unread", "Quick reply", "Notification switches"],
  },
  "notification-overview": {
    id: "notification-overview",
    cn: "\u901a\u77e5\u603b\u89c8",
    en: "Notification Overview",
    state: "Queue active",
    work: ["Unread", "Sent", "Failed", "Channel status", "User segment", "Delivery queue"],
    mobile: ["Unread", "Quick reply", "Notification switches"],
  },
  "notification-templates": {
    id: "notification-templates",
    cn: "\u6a21\u677f\u914d\u7f6e",
    en: "Template Configuration",
    state: "Version shell",
    work: ["Email template", "Push template", "SMS template", "Locale copy", "Preview", "Version log"],
  },
  "user-messages": {
    id: "user-messages",
    cn: "\u7528\u6237\u79c1\u4fe1",
    en: "User Messages",
    state: "Inbox runtime",
    work: ["Inbox", "Reply", "Archive", "User state", "Order link", "Driftbox link"],
    mobile: ["Unread", "Quick reply", "User status"],
  },
  "push-channels": {
    id: "push-channels",
    cn: "Push Channels",
    en: "Push Channels",
    state: "Channel shell",
    work: ["Email", "SMS", "Web push", "In-app", "Channel status", "Suppression rules"],
  },
  "notification-audit": {
    id: "notification-audit",
    cn: "\u65e5\u5fd7\u5ba1\u8ba1",
    en: "Notification Logs & Audit",
    state: "Audit runtime",
    work: ["Delivery logs", "Operator logs", "Template changes", "Failed sends", "Export", "Audit trail"],
  },
  "ai-reach-reserve": {
    id: "ai-reach-reserve",
    cn: "AI \u89e6\u8fbe\u9884\u7559",
    en: "AI Reach Reserve",
    state: "Reserved only",
    work: ["Reach suggestions", "Quiet timing", "No spam", "Cost", "Approval queue", "Failure retry"],
    ai: ["AI reach scoring", "AI timing", "AI copy safety", "AI suppression"],
  },
  "campaign-center": {
    id: "campaign-center",
    cn: t.campaign,
    en: "Campaign & Marketing Center",
    state: "Low-stimulation runtime",
    work: ["Coupons", "Campaigns", "Points mall", "Sharing reserve", "ROI data", "AI optimization reserve"],
    ai: ["AI campaign optimization", "ROI insight", "Coupon risk", "Soft growth guard"],
    mobile: ["Campaign status", "Coupon check", "ROI glance"],
  },
  coupons: {
    id: "coupons",
    cn: "\u4f18\u60e0\u5238",
    en: "Coupons Runtime",
    state: "Rule shell",
    work: ["Coupon list", "Create coupon", "Eligibility", "Usage limit", "Risk link", "Redemption logs"],
    mobile: ["Coupon status", "Quick pause", "Usage count"],
  },
  campaigns: {
    id: "campaigns",
    cn: "\u6d3b\u52a8",
    en: "Campaigns Runtime",
    state: "Schedule shell",
    work: ["Campaign list", "Create campaign", "Schedule", "Landing route", "Budget", "Rollback"],
  },
  "points-mall": {
    id: "points-mall",
    cn: "\u79ef\u5206\u5546\u57ce",
    en: "Points Mall",
    state: "Reserved entry",
    work: ["Reward list", "Point rules", "Redemption", "Member link", "Risk limit", "Logs"],
  },
  "sharing-reserve": {
    id: "sharing-reserve",
    cn: "\u5206\u4eab\u88c2\u53d8\u9884\u7559",
    en: "Sharing Reserve",
    state: "Not activated",
    work: ["Entry reserve", "No forced sharing", "Channel rules", "Point reserve", "Risk limit", "Soft review"],
  },
  "roi-data": {
    id: "roi-data",
    cn: "ROI \u6570\u636e",
    en: "ROI Data",
    state: "Analytics shell",
    work: ["ROI table", "Cost input", "Revenue link", "Channel compare", "Export", "Trend"],
  },
  "ai-campaign-optimization": {
    id: "ai-campaign-optimization",
    cn: "AI \u6d3b\u52a8\u4f18\u5316",
    en: "AI Campaign Optimization",
    state: "Reserved",
    work: ["Suggestion queue", "Budget insight", "Copy safety", "ROI prediction", "Human approval", "Retry"],
    ai: ["AI campaign scoring", "AI ROI prediction", "AI copy review", "AI channel mix"],
  },
  "after-sales-center": {
    id: "after-sales-center",
    cn: t.afterSales,
    en: "After-Sales Center",
    state: "Service runtime",
    work: ["Applications", "Refunds", "Exchange", "Arbitration", "Logistics tracking", "Risk link"],
    ai: ["AI arbitration reserve", "Refund anomaly", "Case summary", "Reply draft"],
    mobile: ["Pending cases", "Refund status", "Quick reply", "Tracking"],
  },
  "after-sales-requests": {
    id: "after-sales-requests",
    cn: "\u552e\u540e\u7533\u8bf7",
    en: "After-Sales Requests",
    state: "Case queue",
    work: ["Request list", "Case status", "Reason", "Evidence upload", "Action", "Logs"],
    mobile: ["Pending cases", "Quick approve", "Quick reject"],
  },
  "refunds-runtime": {
    id: "refunds-runtime",
    cn: "\u9000\u6b3e",
    en: "Refunds Runtime",
    state: "Payment linked",
    work: ["Refund queue", "Payment link", "Amount", "Reason", "Approval", "Refund logs"],
  },
  "exchange-runtime": {
    id: "exchange-runtime",
    cn: "\u6362\u8d27",
    en: "Exchange Runtime",
    state: "Inventory linked",
    work: ["Exchange request", "Replacement stock", "Return label", "Shipment", "User note", "Logs"],
  },
  "arbitration-runtime": {
    id: "arbitration-runtime",
    cn: "\u4ef2\u88c1",
    en: "Arbitration Runtime",
    state: "AI reserve",
    work: ["Dispute case", "Evidence", "Decision draft", "Human review", "Risk link", "Audit"],
    ai: ["AI arbitration reserve", "Evidence summary", "Decision suggestion"],
  },
  "after-sales-tracking": {
    id: "after-sales-tracking",
    cn: "\u7269\u6d41\u8ffd\u8e2a",
    en: "After-Sales Tracking",
    state: "Carrier linked",
    work: ["Return tracking", "Carrier", "Exception", "Receipt", "Refund trigger", "Logs"],
  },
  "after-sales-risk-link": {
    id: "after-sales-risk-link",
    cn: "\u98ce\u63a7\u8054\u52a8",
    en: "After-Sales Risk Link",
    state: "Risk linked",
    work: ["Fraud flag", "Abuse pattern", "Member score", "Restriction link", "Manual review", "Audit"],
  },
  "community-moderation": {
    id: "community-moderation",
    cn: t.moderation,
    en: "Community & Content Moderation",
    state: "Moderation runtime",
    work: ["Comments", "Reports", "UGC", "Sensitive words", "AI moderation", "Image / Video / Copy review"],
    ai: ["AI content moderation", "Sensitive image detection", "Video review", "Copy risk"],
    mobile: ["Pending review", "Reports", "Quick approve / reject"],
  },
  "comment-review": {
    id: "comment-review",
    cn: "\u8bc4\u8bba\u5ba1\u6838",
    en: "Comment Review",
    state: "Queue runtime",
    work: ["Comment queue", "Approve", "Reject", "Edit note", "User state", "Logs"],
  },
  "report-handling": {
    id: "report-handling",
    cn: "\u4e3e\u62a5\u5904\u7406",
    en: "Report Handling",
    state: "Case runtime",
    work: ["Report list", "Reporter", "Target", "Evidence", "Action", "Audit"],
    mobile: ["Reports", "Quick action", "User state"],
  },
  "ugc-review": {
    id: "ugc-review",
    cn: "UGC",
    en: "UGC Review",
    state: "Media ready",
    work: ["Text", "Image", "Video", "Object note", "Driftbox link", "Decision"],
  },
  "sensitive-words": {
    id: "sensitive-words",
    cn: "\u654f\u611f\u8bcd",
    en: "Sensitive Words",
    state: "Rule runtime",
    work: ["Word list", "Add rule", "Severity", "Locale", "Match logs", "Export"],
  },
  "ai-content-moderation": {
    id: "ai-content-moderation",
    cn: "AI \u5185\u5bb9\u5ba1\u6838",
    en: "AI Content Moderation",
    state: "AI reserved",
    work: ["AI queue", "Risk score", "Human review", "False positive", "Cost", "Retry"],
    ai: ["AI text moderation", "AI image moderation", "AI video moderation"],
  },
  "media-moderation": {
    id: "media-moderation",
    cn: "\u56fe\u7247\u89c6\u9891\u5ba1\u6838",
    en: "Image / Video / Copy Review",
    state: "Multi-format runtime",
    work: ["Image review", "Video review", "Copy review", "Preview", "Decision", "Logs"],
  },
  "compliance-legal": {
    id: "compliance-legal",
    cn: t.compliance,
    en: "Compliance & Legal Center",
    state: "Versioned legal runtime",
    work: ["GDPR", "CCPA", "Terms", "Privacy policy", "AI usage agreement", "Infringement", "Legal logs"],
    mobile: ["Policy status", "Legal alerts", "Quick view"],
  },
  "gdpr-runtime": {
    id: "gdpr-runtime",
    cn: "GDPR",
    en: "GDPR Runtime",
    state: "Compliance shell",
    work: ["Data request", "Consent", "Export", "Deletion", "Region status", "Logs"],
  },
  "ccpa-runtime": {
    id: "ccpa-runtime",
    cn: "CCPA",
    en: "CCPA Runtime",
    state: "Compliance shell",
    work: ["Request list", "Opt-out", "Disclosure", "Deletion", "Region status", "Logs"],
  },
  "terms-runtime": {
    id: "terms-runtime",
    cn: "\u7528\u6237\u534f\u8bae",
    en: "User Agreement",
    state: "Version runtime",
    work: ["Draft", "Preview", "Publish", "Schedule", "Rollback", "Version log"],
  },
  "privacy-policy-runtime": {
    id: "privacy-policy-runtime",
    cn: "\u9690\u79c1\u653f\u7b56",
    en: "Privacy Policy",
    state: "Version runtime",
    work: ["Draft", "Preview", "Publish", "Schedule", "Rollback", "Version log"],
  },
  "ai-usage-agreement": {
    id: "ai-usage-agreement",
    cn: "AI \u4f7f\u7528\u534f\u8bae",
    en: "AI Usage Agreement",
    state: "Version runtime",
    work: ["AI terms", "Model disclosure", "Consent", "Version", "Rollback", "Logs"],
  },
  "infringement-handling": {
    id: "infringement-handling",
    cn: "\u4fb5\u6743\u5904\u7406",
    en: "Infringement Handling",
    state: "Case runtime",
    work: ["Case list", "Evidence", "Claimant", "Decision", "Response", "Audit"],
  },
  "legal-logs": {
    id: "legal-logs",
    cn: "\u6cd5\u52a1\u65e5\u5fd7",
    en: "Legal Logs",
    state: "Audit runtime",
    work: ["Legal actions", "Policy changes", "Consent logs", "Export", "Operator", "Audit"],
  },
  "finance-settlement": {
    id: "finance-settlement",
    cn: t.finance,
    en: "Finance & Settlement Center",
    state: "Settlement runtime",
    work: ["Finance overview", "Reconciliation", "Refund reconciliation", "Partner settlement", "Tax", "Funds ledger", "Freeze / unfreeze", "Audit logs"],
    ai: ["AI finance analysis reserve", "Anomaly detection", "Margin insight", "Cashflow forecast"],
    mobile: ["Finance overview", "Refund alerts", "Freeze alerts", "Settlement status"],
  },
  "finance-overview": {
    id: "finance-overview",
    cn: "\u8d22\u52a1\u603b\u89c8",
    en: "Finance Overview",
    state: "Metric runtime",
    work: ["Revenue", "Refunds", "Settlement", "Tax", "Frozen funds", "Export"],
    mobile: ["Finance overview", "Alerts", "Today status"],
  },
  reconciliation: {
    id: "reconciliation",
    cn: "\u5bf9\u8d26",
    en: "Reconciliation",
    state: "Table runtime",
    work: ["Payment records", "Order records", "Mismatch", "Manual fix", "Export", "Audit"],
  },
  "refund-reconciliation": {
    id: "refund-reconciliation",
    cn: "\u9000\u6b3e\u5bf9\u8d26",
    en: "Refund Reconciliation",
    state: "Refund linked",
    work: ["Refund records", "Payment provider", "Mismatch", "Status", "Export", "Audit"],
  },
  "partner-settlement": {
    id: "partner-settlement",
    cn: "\u5546\u6237\u7ed3\u7b97",
    en: "Partner Settlement",
    state: "Settlement shell",
    work: ["Settlement list", "Partner", "Amount", "Status", "Payout", "Logs"],
  },
  "tax-runtime": {
    id: "tax-runtime",
    cn: "\u7a0e\u8d39",
    en: "Tax Runtime",
    state: "Region linked",
    work: ["Tax region", "Rate table", "Invoice", "Duty note", "Export", "Logs"],
  },
  "funds-ledger": {
    id: "funds-ledger",
    cn: "\u8d44\u91d1\u6d41\u6c34",
    en: "Funds Ledger",
    state: "Ledger runtime",
    work: ["Ledger", "Inflow", "Outflow", "Balance", "Provider", "Audit"],
  },
  "freeze-unfreeze": {
    id: "freeze-unfreeze",
    cn: "\u51bb\u7ed3 / \u89e3\u51bb",
    en: "Freeze / Unfreeze",
    state: "Risk linked",
    work: ["Freeze list", "Reason", "Risk link", "Approval", "Unfreeze", "Audit"],
  },
  "finance-audit-logs": {
    id: "finance-audit-logs",
    cn: "\u5ba1\u8ba1\u65e5\u5fd7",
    en: "Finance Audit Logs",
    state: "Audit runtime",
    work: ["Operator", "Action", "Amount", "Before / after", "Export", "Audit"],
  },
  "homepage-runtime": {
    id: "homepage-runtime",
    cn: "\u9996\u9875\u8fd0\u8425",
    en: "Homepage Runtime",
    state: "Frontstage civilization layer",
    work: ["Hero", "Ways to Begin", "Healing World", "Windkeep", "Moments", "Energy Field", "Quiet Extracts", "PC / Mobile"],
  },
  "section-runtime": {
    id: "section-runtime",
    cn: "\u533a\u5757\u8fd0\u8425",
    en: "Section Runtime",
    state: "Module operations",
    work: ["Hero", "Product Grid", "Editorial", "Healing", "Windkeep", "Driftbox"],
  },
  "navigation-runtime": {
    id: "navigation-runtime",
    cn: "\u5bfc\u822a\u8fd0\u8425",
    en: "Navigation Runtime",
    state: "Route visibility shell",
    work: ["Header", "Footer", "Mobile Nav", "Route Visibility", "Menu order", "Published route"],
  },
  "frontstage-visual": {
    id: "frontstage-visual",
    cn: "\u524d\u53f0\u89c6\u89c9",
    en: "Frontstage Visual Runtime",
    state: "Browser Air visual control",
    work: ["Banner", "Hero", "Typography", "Theme", "Atmosphere", "Motion"],
  },
  "homepage-rotation": {
    id: "homepage-rotation",
    cn: "\u9996\u9875\u8f6e\u6362",
    en: "Homepage Rotation Runtime",
    state: "Seasonal layer reserved",
    work: ["Hero rotation", "Seasonal Layer", "Holiday climate", "Temporary Atmosphere", "Schedule", "Rollback"],
  },
  "publishing-runtime": {
    id: "publishing-runtime",
    cn: "\u53d1\u5e03\u8fd0\u884c",
    en: "Publishing Runtime",
    state: "Production workflow",
    work: ["Draft", "Preview", "Publish", "Schedule", "Rollback", "Publish log"],
  },
  "global-locale-runtime": {
    id: "global-locale-runtime",
    cn: "\u5168\u7403\u8bed\u8a00",
    en: "Global Locale Runtime",
    state: "Locale operations",
    work: ["Translations", "GEO adaptation", "Route locale", "Metadata", "Canonical", "Hreflang"],
  },
  "quiet-analytics": {
    id: "quiet-analytics",
    cn: "\u5b89\u9759\u5206\u6790",
    en: "Quiet Analytics",
    state: "Low-pressure analytics",
    work: ["Page health", "Stay rhythm", "Section view", "Device split", "Error trace", "No growth hacking"],
  },
  "frontstage-safe-area": {
    id: "frontstage-safe-area",
    cn: "\u524d\u53f0\u5b89\u5168\u533a",
    en: "Safe Area Runtime",
    state: "Live preview reserved",
    work: ["PC preview", "Mobile preview", "Hero", "Banner", "Product", "Windkeep"],
  },
  "atmosphere-governance": {
    id: "atmosphere-governance",
    cn: "\u6c14\u5019\u6cbb\u7406",
    en: "Atmosphere Governance",
    state: "Quiet climate control",
    work: ["Wind feeling", "Motion", "Quiet Level", "Seasonal Tone", "Page breathing", "Browser Air"],
  },
  "ai-queue": {
    id: "ai-queue",
    cn: "AI \u961f\u5217",
    en: "AI Queue Runtime",
    state: "Queue reserved",
    work: ["Queue", "Status", "Tokens", "Cost", "Errors", "Retry"],
    ai: ["Asset Review", "Product Draft", "Logistics Routing", "Inventory Forecast", "Risk Score", "Fraud Prediction", "Failed Retry"],
  },
  "ai-image": {
    id: "ai-image",
    cn: "AI \u56fe\u50cf",
    en: "AI Image Runtime",
    state: "Reserved",
    work: ["Prompt packs", "Image tasks", "Asset review", "Version notes", "Safe area check", "Failure retry"],
  },
  "ai-video": {
    id: "ai-video",
    cn: "AI \u89c6\u9891",
    en: "AI Video Runtime",
    state: "Reserved",
    work: ["Video tasks", "Scene prompts", "Cost logs", "Status", "Failure retry", "Platform export"],
  },
  "seo-geo-runtime": {
    id: "seo-geo-runtime",
    cn: "SEO / GEO",
    en: "AI Search Era GEO Runtime",
    state: "Metadata and schema active",
    work: ["Dynamic metadata", "Product schema", "Article schema", "FAQ schema", "Breadcrumb schema", "Sitemap", "Internal links", "Performance checks"],
    ai: ["Emotional keywords", "Semantic phrases", "GEO phrases", "AI summaries", "Tags", "Related links"],
  },
  geo: {
    id: "geo",
    cn: "GEO",
    en: "Region Runtime",
    state: "Reserved",
    work: ["Region access", "Currency rules", "Shipping region", "Compliance note", "Locale link", "Provider state"],
  },
  "viral-radar": {
    id: "viral-radar",
    cn: "\u8f7b\u4f20\u64ad\u89c2\u6d4b",
    en: "Viral Radar",
    state: "Reserved only",
    work: ["Signal capture", "Channel notes", "No spam", "No forced sharing", "Campaign review", "Soft growth"],
  },
  logistics: {
    id: "logistics",
    cn: t.logistics,
    en: "Logistics Runtime",
    state: "API-ready shell",
    work: ["Tracking input", "Carrier selection", "Shipment status", "Return logistics", "Batch status", "Freight rules"],
    ai: ["DHL", "UPS", "SF Express", "Overseas warehouse", "AI routing", "AI freight calculation", "Auto tracking sync"],
    mobile: ["Tracking input", "Quick status", "Exception handling", "Progress view"],
  },
  tracking: {
    id: "tracking",
    cn: "\u8f68\u8ff9\u67e5\u770b",
    en: "Tracking Runtime",
    state: "Lightweight phase",
    work: ["Tracking number", "Carrier trace", "Status sync", "Exception flag", "Customer notice", "Manual update"],
  },
  freight: {
    id: "freight",
    cn: "\u8fd0\u8d39\u89c4\u5219",
    en: "Freight Runtime",
    state: "Rule shell",
    work: ["Region table", "Weight band", "Carrier option", "Base fee", "Exception rule", "AI calculator hook"],
  },
  returns: {
    id: "returns",
    cn: "\u9000\u8d27\u7269\u6d41",
    en: "Returns Runtime",
    state: "Support shell",
    work: ["Return request", "Return label", "Inspection note", "Refund link", "Exception state", "Human support"],
  },
  suppliers: {
    id: "suppliers",
    cn: "\u4f9b\u5e94\u5546",
    en: "Suppliers Runtime",
    state: "Lightweight phase",
    work: ["Supplier profiles", "Contact", "Capability", "Lead time", "Score", "Notes"],
  },
  inventory: {
    id: "inventory",
    cn: "\u5e93\u5b58\u7ba1\u7406",
    en: "Inventory Runtime",
    state: "AI forecast reserved",
    work: ["Manual inventory", "Warnings", "Stock count", "Reserved stock", "Object link", "AI forecast"],
  },
  procurement: {
    id: "procurement",
    cn: "\u91c7\u8d2d\u8bb0\u5f55",
    en: "Procurement Runtime",
    state: "Record shell",
    work: ["Purchase records", "Supplier link", "Arrival status", "Cost input", "Margin link", "AI replenishment"],
  },
  costs: {
    id: "costs",
    cn: "\u6210\u672c\u8bb0\u5f55",
    en: "Costs Runtime",
    state: "Analysis reserved",
    work: ["Cost records", "Shipping cost", "Packaging cost", "Margin", "Supplier compare", "Auto reconciliation"],
  },
  "brand-assets": {
    id: "brand-assets",
    cn: "\u54c1\u724c\u8d44\u4ea7",
    en: "Brand Assets",
    state: "Visual governance",
    work: ["Logo", "Marks", "Hero assets", "Guides", "Versions", "Usage"],
  },
  "product-media": {
    id: "product-media",
    cn: "\u5546\u54c1\u7d20\u6750",
    en: "Product Media",
    state: "No browser crop",
    work: ["Product images", "Product video", "Gallery", "Alt text", "Version", "Usage"],
  },
  "social-media": {
    id: "social-media",
    cn: "\u793e\u5a92\u7d20\u6750",
    en: "Social Media",
    state: "Template reserved",
    work: ["Channel assets", "Post templates", "Export states", "Copy", "Review", "Version"],
  },
  "prompt-packs": {
    id: "prompt-packs",
    cn: "\u63d0\u793a\u8bcd\u5305",
    en: "Prompt Packs",
    state: "AI ready",
    work: ["Image prompts", "Video prompts", "Copy prompts", "Rules", "Versions", "Failures"],
  },
  "safe-area": {
    id: "safe-area",
    cn: "\u5b89\u5168\u533a",
    en: "Safe Area",
    state: "Upload discipline",
    work: ["PC size", "Mobile size", "Ratio", "Safe area", "Max MB", "Format"],
  },
  "member-center": {
    id: "member-center",
    cn: t.member,
    en: "Member Center",
    state: "Trust layer reserved",
    work: ["Member profiles", "Verification status", "Credit score", "Member level", "Notifications", "Access review"],
  },
  "member-risk-control": {
    id: "member-risk-control",
    cn: t.risk,
    en: "Member Risk Control",
    state: "Backend-only trust infrastructure",
    work: ["Identity review", "Behavior detection", "Credit score runtime", "Rule configuration", "Audit logs", "Export"],
    ai: ["AI anomaly detection", "AI risk scoring", "AI fraud prediction", "AI restriction strategy", "Device fingerprinting", "Automated risk scoring"],
    mobile: ["Pending reviews", "Quick approve / reject", "Risk alerts", "Large transaction alerts"],
  },
  "client-runtime": {
    id: "client-runtime",
    cn: t.client,
    en: "Human Runtime Layer",
    state: "Client shell reserved",
    work: ["Dashboard", "My Objects", "My Orders", "Membership", "Driftbox", "My AI", "Settings"],
    ai: ["My AI runtime", "Sharing points reserved", "Verification status", "Notifications", "Logistics loop", "Membership loop"],
    mobile: ["Orders", "Objects", "Membership", "Driftbox", "Verification status"],
  },
  windkeep: {
    id: "windkeep",
    cn: t.windkeep,
    en: "Windkeep Continuity",
    state: "Rules linked",
    work: ["Passing Things", "Quiet Receiving", "Drift Notes", "Continuation Requests", "Risk link", "Object memory"],
  },
  driftbox: {
    id: "driftbox",
    cn: t.driftbox,
    en: "Driftbox Correspondence",
    state: "Moderation shell",
    work: ["Messages", "Human replies", "Archives", "Continuation mail", "Notifications", "Safety"],
  },
  "rules-binding": {
    id: "rules-binding",
    cn: t.rules,
    en: "Help & Rules Binding",
    state: "Binding layer",
    work: ["Windkeep", "Driftbox", "Payments", "AI", "Member", "Risk Control", "Client Runtime", "Orders", "Logistics", "Supply Chain"],
  },
  "locale-geo": {
    id: "locale-geo",
    cn: t.localeGeo,
    en: "Locale & GEO Layer",
    state: "14 locale routes",
    work: ["Locale routing", "Metadata", "Canonical", "Hreflang", "Open Graph", "Region rule"],
  },
} satisfies Record<AdminWorkspaceId, Workspace>;

const objectIntakeAdminWorkspaces = new Set<AdminWorkspaceId>([
  "wind-seeker-approval",
  "ai-product-moderation",
  "wind-seeker-moderation-runtime",
]);

const navGroups = [
  {
    id: "frontstage",
    icon: "FR",
    cn: t.frontstage,
    en: "Frontstage Runtime",
    items: ["homepage-runtime", "section-runtime", "navigation-runtime", "frontstage-visual", "homepage-rotation", "publishing-runtime", "global-locale-runtime", "quiet-analytics", "frontstage-safe-area", "atmosphere-governance"] satisfies AdminWorkspaceId[],
  },
  {
    id: "commerce",
    icon: "CO",
    cn: t.commerce,
    en: "Commerce",
    items: ["product-intake", "product-media", "publish-review", "objects", "orders", "payments"] satisfies AdminWorkspaceId[],
  },
  {
    id: "wind-seeker",
    icon: "WS",
    cn: t.windSeeker,
    en: "Global Object Scout Network",
    items: ["wind-seeker-approval", "ai-product-moderation", "buyer-risk-dashboard", "wind-seeker-settlement", "logistics-monitor", "dispute-runtime", "buyer-deposit-runtime", "wind-seeker-drafts", "wind-seeker-notifications", "wind-seeker-account", "shipping-runtime", "refund-runtime", "buyer-level-runtime", "aml-kyc-runtime", "wind-seeker-risk-runtime", "wind-seeker-moderation-runtime", "multi-language-runtime", "multi-currency-runtime", "region-restriction-runtime", "country-restriction-runtime", "sanctions-runtime"] satisfies AdminWorkspaceId[],
  },
  {
    id: "messages",
    icon: "MS",
    cn: t.message,
    en: "Message & Notification",
    items: ["message-center", "notification-overview", "notification-templates", "user-messages", "push-channels", "notification-audit", "ai-reach-reserve"] satisfies AdminWorkspaceId[],
  },
  {
    id: "campaign",
    icon: "MK",
    cn: t.campaign,
    en: "Campaign & Marketing",
    items: ["campaign-center", "coupons", "campaigns", "points-mall", "sharing-reserve", "roi-data", "ai-campaign-optimization"] satisfies AdminWorkspaceId[],
  },
  {
    id: "after-sales",
    icon: "AS",
    cn: t.afterSales,
    en: "After-Sales",
    items: ["after-sales-center", "after-sales-requests", "refunds-runtime", "exchange-runtime", "arbitration-runtime", "after-sales-tracking", "after-sales-risk-link"] satisfies AdminWorkspaceId[],
  },
  {
    id: "moderation",
    icon: "CM",
    cn: t.moderation,
    en: "Community Moderation",
    items: ["community-moderation", "comment-review", "report-handling", "ugc-review", "sensitive-words", "ai-content-moderation", "media-moderation"] satisfies AdminWorkspaceId[],
  },
  {
    id: "compliance",
    icon: "CL",
    cn: t.compliance,
    en: "Compliance & Legal",
    items: ["legal-runtime", "compliance-runtime", "aml-runtime", "sanctions-runtime", "chargeback-runtime", "counterfeit-enforcement", "compliance-legal", "gdpr-runtime", "ccpa-runtime", "terms-runtime", "privacy-policy-runtime", "ai-usage-agreement", "infringement-handling", "legal-logs"] satisfies AdminWorkspaceId[],
  },
  {
    id: "finance",
    icon: "FN",
    cn: t.finance,
    en: "Finance & Settlement",
    items: ["settlement-runtime", "deposit-runtime", "audit-runtime", "finance-settlement", "finance-overview", "reconciliation", "refund-reconciliation", "partner-settlement", "tax-runtime", "funds-ledger", "freeze-unfreeze", "finance-audit-logs"] satisfies AdminWorkspaceId[],
  },
  {
    id: "ai",
    icon: "AI",
    cn: t.ai,
    en: "AI Operations",
    items: ["ai-queue", "ai-image", "ai-video", "seo-geo-runtime", "geo", "viral-radar"] satisfies AdminWorkspaceId[],
  },
  {
    id: "logistics",
    icon: "LG",
    cn: t.logistics,
    en: "Logistics",
    items: ["logistics", "tracking", "freight", "returns"] satisfies AdminWorkspaceId[],
  },
  {
    id: "supply",
    icon: "SC",
    cn: t.supply,
    en: "Supply Chain",
    items: ["suppliers", "inventory", "procurement", "costs"] satisfies AdminWorkspaceId[],
  },
  {
    id: "media",
    icon: "MA",
    cn: t.media,
    en: "Media Assets",
    items: ["brand-assets", "product-media", "social-media", "prompt-packs", "safe-area"] satisfies AdminWorkspaceId[],
  },
  {
    id: "member",
    icon: "MB",
    cn: t.member,
    en: "Member",
    items: ["member-center", "member-risk-control", "client-runtime"] satisfies AdminWorkspaceId[],
  },
  {
    id: "world",
    icon: "WR",
    cn: "\u6587\u660e\u8fd0\u884c",
    en: "World Runtime",
    items: ["windkeep", "quiet-receiving-runtime", "driftbox", "risk-runtime", "moderation-runtime", "rules-binding", "locale-geo"] satisfies AdminWorkspaceId[],
  },
] as const;

export const adminWorkspaceIds = Object.keys(workspaceMap) as AdminWorkspaceId[];

export function isAdminWorkspaceId(value: string): value is AdminWorkspaceId {
  return adminWorkspaceIds.includes(value as AdminWorkspaceId);
}

function workspaceHref(id: AdminWorkspaceId) {
  if (id === "product-intake") return "/admin/product-intake";
  if (id === "publish-review") return "/admin/publish-review";
  if (id === "product-media") return "/admin/product-media";
  return id === "overview" ? "/admin" : `/admin/${id}`;
}

const uploadSpecs = [
  ["\u9996\u9875\u89c6\u89c9", "Homepage Visuals", "PC + Mobile exported section artwork", "Use source ratio only", "Text and key object inside exported artwork", "PNG / JPG / WEBP, max 8 MB"],
  ["\u5546\u54c1\u56fe", "Product Images", "Product gallery source", "Natural product ratio", "No browser crop; object centered by source", "PNG / JPG / WEBP, max 6 MB"],
  ["\u7269\u6d41\u51ed\u8bc1", "Logistics Proof", "Label / invoice / carrier file", "Document source ratio", "Tracking code and recipient fields visible", "PNG / JPG / PDF / WEBP, max 10 MB"],
] as const;

const ruleBindings = [
  ["Windkeep", "Object continuity / Continuation request / Quiet receiving"],
  ["Driftbox", "Human reply / Archive / No support-feed behavior"],
  ["Payments", "Refund / Return / Region compliance / Provider review"],
  ["AI", "Queue / Token / Cost / Error / Retry"],
  ["Member", "Access / Locale / Privacy / Permission / Verification status"],
  ["Member Risk Control", "Identity verification / Behavior flag / Credit score / Restriction / Audit"],
  ["Client Runtime", "Dashboard / My Objects / Orders / Membership / Driftbox / My AI / Settings"],
  ["Orders", "Shipping / Packaging / Human support / Exception handling"],
  ["Logistics", "Tracking / Carrier / Return / Freight / API-ready expansion"],
  ["Supply Chain", "Supplier / Inventory / Procurement / Cost / AI forecast"],
] as const;

function StatusPill({ children }: Readonly<{ children: React.ReactNode }>) {
  const bilingual = typeof children === "string" && children in statusText ? statusText[children as RuntimeStatus] : null;
  return (
    <span className="rounded-full border border-[#947A66]/55 bg-[#947A66] px-3 py-1 text-xs text-white">
      {bilingual ? <BilingualText cn={bilingual.cn} en={bilingual.en} align="center" /> : children}
    </span>
  );
}

function RuntimeCard({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="rounded-2xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
      {children}
    </div>
  );
}

const runtimeStatuses = ["Draft", "Open", "Review", "Scheduled", "Published", "Archived", "Failed"] as const;
const pageSize = 5;

const statusText: Record<(typeof runtimeStatuses)[number], { cn: string; en: string }> = {
  Draft: { cn: "草稿", en: "Draft" },
  Open: { cn: "进行中", en: "Open" },
  Review: { cn: "审核中", en: "Review" },
  Scheduled: { cn: "已计划", en: "Scheduled" },
  Published: { cn: "已发布", en: "Published" },
  Archived: { cn: "已归档", en: "Archived" },
  Failed: { cn: "失败", en: "Failed" },
};

const tabText = {
  records: { cn: "记录", en: "Records" },
  form: { cn: "表单", en: "Form" },
  logs: { cn: "日志", en: "Logs" },
} as const;

const actionText = {
  open: { cn: "打开", en: "Open" },
  edit: { cn: "编辑", en: "Edit" },
  publish: { cn: "发布", en: "Publish" },
  archive: { cn: "归档", en: "Archive" },
  delete: { cn: "删除", en: "Delete" },
  create: { cn: "新建", en: "Create" },
  export: { cn: "导出", en: "Export" },
  save: { cn: "保存", en: "Save" },
  clear: { cn: "清空", en: "Clear" },
  previous: { cn: "上一页", en: "Previous" },
  next: { cn: "下一页", en: "Next" },
  cancel: { cn: "取消", en: "Cancel" },
  confirm: { cn: "确认", en: "Confirm" },
  preview: { cn: "预览", en: "Preview" },
  schedule: { cn: "计划", en: "Schedule" },
  rollback: { cn: "回滚", en: "Rollback" },
} as const;

type RuntimeStatus = (typeof runtimeStatuses)[number];
type RuntimeKind = "general" | "media" | "ai" | "logistics" | "supply" | "finance" | "moderation" | "publishing" | "windseeker";
type RuntimeRow = {
  id: string;
  name: string;
  status: RuntimeStatus;
  owner: string;
  category: string;
  note: string;
  progress: number;
  tokens: number;
  amount: string;
  updated: string;
  previewUrl?: string;
};

type RuntimeLog = {
  id: string;
  message: string;
  time: string;
};

type RuntimeForm = {
  name: string;
  category: string;
  owner: string;
  status: RuntimeStatus;
  note: string;
  amount: string;
};

function BilingualText({ cn, en, align = "left" }: Readonly<{ cn: string; en: string; align?: "left" | "center" }>) {
  return (
    <span className={`block leading-tight ${align === "center" ? "text-center" : "text-left"}`}>
      <span className="block text-[0.95rem] font-semibold">{cn}</span>
      <span className="mt-0.5 block text-[0.72rem] font-normal opacity-70">{en}</span>
    </span>
  );
}

const emptyRuntimeForm: RuntimeForm = {
  name: "",
  category: "",
  owner: "Operations",
  status: "Draft",
  note: "",
  amount: "",
};

function runtimeStorageKey(workspaceId: AdminWorkspaceId) {
  return `reverent-admin-runtime:${workspaceId}`;
}

function logStorageKey(workspaceId: AdminWorkspaceId) {
  return `reverent-admin-runtime-logs:${workspaceId}`;
}

function readStoredRows(workspace: Workspace): RuntimeRow[] {
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem(runtimeStorageKey(workspace.id));
    if (stored) {
      return JSON.parse(stored) as RuntimeRow[];
    }
  }

  return workspace.work.map((work, index) => ({
    id: `${workspace.id}-${index + 1}`,
    name: work,
    status: runtimeStatuses[index % runtimeStatuses.length],
    owner: index % 2 === 0 ? "Operations" : "Review",
    category: defaultCategory(workspace.id),
    note: `Runtime record for ${work}`,
    progress: Math.min(95, 20 + index * 12),
    tokens: 840 + index * 315,
    amount: `$${(index * 72 + 48).toFixed(2)}`,
    updated: `2026-05-${15 - (index % 4)}`,
  }));
}

function readStoredLogs(workspace: Workspace): RuntimeLog[] {
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem(logStorageKey(workspace.id));
    if (stored) {
      return JSON.parse(stored) as RuntimeLog[];
    }
  }

  return [
    { id: `${workspace.id}-log-1`, message: `${workspace.en} opened`, time: "2026-05-15 09:00" },
    { id: `${workspace.id}-log-2`, message: "Runtime queue initialized", time: "2026-05-15 09:12" },
  ];
}

function defaultCategory(workspaceId: AdminWorkspaceId) {
  const kind = getRuntimeKind(workspaceId);
  const labels: Record<RuntimeKind, string> = {
    general: "Runtime",
    media: "Media Asset",
    ai: "AI Queue",
    logistics: "Shipment",
    supply: "Supply",
    finance: "Settlement",
    moderation: "Review",
    publishing: "Publishing",
    windseeker: "Wind Seeker",
  };
  return labels[kind];
}

function getRuntimeKind(workspaceId: AdminWorkspaceId): RuntimeKind {
  if (["wind-seeker-approval", "ai-product-moderation", "buyer-risk-dashboard", "wind-seeker-settlement", "logistics-monitor", "dispute-runtime", "buyer-deposit-runtime", "wind-seeker-drafts", "wind-seeker-notifications", "wind-seeker-account", "shipping-runtime", "refund-runtime", "buyer-level-runtime", "aml-kyc-runtime", "wind-seeker-risk-runtime", "wind-seeker-moderation-runtime", "multi-language-runtime", "multi-currency-runtime", "region-restriction-runtime", "country-restriction-runtime", "sanctions-runtime"].includes(workspaceId)) return "windseeker";
  if (["brand-assets", "product-media", "social-media", "prompt-packs", "safe-area", "frontstage-safe-area"].includes(workspaceId)) return "media";
  if (["ai-queue", "ai-image", "ai-video", "seo-geo-runtime", "geo", "viral-radar", "ai-reach-reserve", "ai-campaign-optimization", "ai-content-moderation"].includes(workspaceId)) return "ai";
  if (["logistics", "tracking", "freight", "returns", "after-sales-tracking"].includes(workspaceId)) return "logistics";
  if (["suppliers", "inventory", "procurement", "costs"].includes(workspaceId)) return "supply";
  if (["finance-settlement", "finance-overview", "settlement-runtime", "deposit-runtime", "reconciliation", "refund-reconciliation", "partner-settlement", "tax-runtime", "funds-ledger", "freeze-unfreeze", "finance-audit-logs", "chargeback-runtime"].includes(workspaceId)) return "finance";
  if (["community-moderation", "moderation-runtime", "comment-review", "report-handling", "ugc-review", "sensitive-words", "media-moderation", "counterfeit-enforcement"].includes(workspaceId)) return "moderation";
  if (["publishing-runtime", "legal-runtime", "terms-runtime", "privacy-policy-runtime", "ai-usage-agreement", "homepage-runtime", "section-runtime", "navigation-runtime", "homepage-rotation"].includes(workspaceId)) return "publishing";
  return "general";
}

function persistRows(workspaceId: AdminWorkspaceId, nextRows: RuntimeRow[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(runtimeStorageKey(workspaceId), JSON.stringify(nextRows));
  }
}

function persistLogs(workspaceId: AdminWorkspaceId, nextLogs: RuntimeLog[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(logStorageKey(workspaceId), JSON.stringify(nextLogs));
  }
}

function RuntimeButton({ children, onClick, tone = "default", type = "button" }: Readonly<{ children: React.ReactNode; onClick?: () => void; tone?: "default" | "primary" | "danger"; type?: "button" | "submit" }>) {
  const toneClass = tone === "primary" ? "border-[#947A66] bg-[#947A66] text-white" : tone === "danger" ? "border-[#9E6B6B] bg-[#9E6B6B] text-white" : "border-[#D9DCE0] bg-[#EBEDEF] text-[#2D333A]";
  return (
    <button type={type} onClick={onClick} className={`rounded-xl border px-3 py-2 text-sm transition hover:border-[#A88C75] ${toneClass}`}>
      {children}
    </button>
  );
}

function WorkspacePanel({ workspace }: Readonly<{ workspace: Workspace }>) {
  const kind = getRuntimeKind(workspace.id);
  const [rows, setRows] = useState<RuntimeRow[]>(() => readStoredRows(workspace));
  const [logs, setLogs] = useState<RuntimeLog[]>(() => readStoredLogs(workspace));
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeTab, setActiveTab] = useState<"records" | "form" | "logs">("records");
  const [page, setPage] = useState(1);
  const [drawerItem, setDrawerItem] = useState<RuntimeRow | null>(null);
  const [modalAction, setModalAction] = useState<{ label: string; run: () => void } | null>(null);
  const [form, setForm] = useState<RuntimeForm>(emptyRuntimeForm);

  function writeRows(nextRows: RuntimeRow[]) {
    setRows(nextRows);
    persistRows(workspace.id, nextRows);
  }

  function writeLogs(message: string) {
    const nextLogs = [{ id: `${workspace.id}-log-${Date.now()}`, message, time: new Date().toLocaleString() }, ...logs].slice(0, 20);
    setLogs(nextLogs);
    persistLogs(workspace.id, nextLogs);
  }

  function saveRow(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = form.name.trim();
    if (!name) return;

    const nextRow: RuntimeRow = {
      id: `${workspace.id}-${Date.now()}`,
      name,
      status: form.status,
      owner: form.owner,
      category: form.category || defaultCategory(workspace.id),
      note: form.note,
      progress: kind === "ai" ? 12 : 0,
      tokens: kind === "ai" ? 120 : 0,
      amount: form.amount || "$0.00",
      updated: new Date().toISOString().slice(0, 10),
    };
    writeRows([nextRow, ...rows]);
    writeLogs(`Created ${name}`);
    setForm(emptyRuntimeForm);
    setActiveTab("records");
  }

  function updateRow(rowId: string, patch: Partial<RuntimeRow>, logMessage: string) {
    const nextRows = rows.map((row) => (row.id === rowId ? { ...row, ...patch, updated: new Date().toISOString().slice(0, 10) } : row));
    writeRows(nextRows);
    writeLogs(logMessage);
    const updatedDrawer = nextRows.find((row) => row.id === rowId);
    if (updatedDrawer) setDrawerItem(updatedDrawer);
  }

  function deleteRow(row: RuntimeRow) {
    setModalAction({
      label: `Delete ${row.name}`,
      run: () => {
        writeRows(rows.filter((item) => item.id !== row.id));
        writeLogs(`Deleted ${row.name}`);
        setDrawerItem(null);
      },
    });
  }

  function editRow(row: RuntimeRow) {
    setForm({ name: row.name, category: row.category, owner: row.owner, status: row.status, note: row.note, amount: row.amount });
    setActiveTab("form");
    writeLogs(`Editing ${row.name}`);
  }

  function handleUpload(fileList: FileList | null) {
    const files = Array.from(fileList ?? []);
    if (files.length === 0) return;
    const nextRows = files.map((file) => ({
      id: `${workspace.id}-file-${Date.now()}-${file.name}`,
      name: file.name,
      status: "Draft" as RuntimeStatus,
      owner: "Media",
      category: kind === "media" ? "Uploaded Asset" : defaultCategory(workspace.id),
      note: `${Math.round(file.size / 1024)} KB preview uploaded for this runtime.`,
      progress: 100,
      tokens: 0,
      amount: "$0.00",
      updated: new Date().toISOString().slice(0, 10),
      previewUrl: URL.createObjectURL(file),
    }));
    writeRows([...nextRows, ...rows]);
    writeLogs(`Uploaded ${files.length} file(s)`);
  }

  const filteredRows = rows.filter((row) => {
    const searchText = `${row.name} ${row.category} ${row.owner} ${row.note}`.toLowerCase();
    const matchesQuery = searchText.includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All" || row.status === statusFilter;
    return matchesQuery && matchesStatus;
  });
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const visibleRows = filteredRows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
      <section className="rounded-3xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.34)] sm:p-6">
        <div className="flex flex-col gap-4 border-b border-[#D9DCE0] pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-[#6B7280]">{workspace.en}</p>
            <h2 className="mt-2 text-4xl font-semibold leading-tight text-[#2D333A]">{workspace.cn}</h2>
          </div>
          <StatusPill>{workspace.state}</StatusPill>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto_auto_auto]">
          <label className="block">
            <span className="text-[#9CA3AF]"><BilingualText cn="搜索" en="Search" /></span>
            <input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} className="mt-2 w-full rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-4 py-3 text-sm text-[#2D333A] outline-none focus:border-[#947A66]" placeholder="Search runtime records" type="search" />
          </label>
          <label className="block">
            <span className="text-[#9CA3AF]"><BilingualText cn="筛选" en="Filter" /></span>
            <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }} className="mt-2 w-full rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-4 py-3 text-sm text-[#2D333A] outline-none focus:border-[#947A66]">
              <option value="All">全部 / All</option>
              {runtimeStatuses.map((status) => <option key={status} value={status}>{statusText[status].cn} / {statusText[status].en}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-[#9CA3AF]"><BilingualText cn="上传" en="Upload" /></span>
            <input onChange={(event) => handleUpload(event.target.files)} className="mt-2 block w-full text-sm text-[#6B7280] file:mr-3 file:rounded-lg file:border file:border-[#D9DCE0] file:bg-[#EBEDEF] file:px-3 file:py-2 file:text-[#2D333A]" type="file" multiple />
          </label>
          <div className="flex items-end gap-2">
            <RuntimeButton tone="primary" onClick={() => setActiveTab("form")}><BilingualText {...actionText.create} /></RuntimeButton>
            <RuntimeButton onClick={() => writeLogs("Export requested")}><BilingualText {...actionText.export} /></RuntimeButton>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {(["records", "form", "logs"] as const).map((tab) => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`rounded-full border px-4 py-2 text-sm ${activeTab === tab ? "border-[#947A66] bg-[#947A66] text-white" : "border-[#D9DCE0] bg-[#EBEDEF] text-[#6B7280]"}`}>
              <BilingualText {...tabText[tab]} align="center" />
            </button>
          ))}
        </div>

        <SpecializedRuntimePanel kind={kind} rows={rows} updateRow={updateRow} writeLogs={writeLogs} />

        {activeTab === "records" ? (
          <RuntimeRecordsTable rows={visibleRows} editRow={editRow} deleteRow={deleteRow} setDrawerItem={setDrawerItem} updateRow={updateRow} />
        ) : null}

        {activeTab === "form" ? (
          <RuntimeCard>
            <p className="text-sm text-[#6B7280]"><BilingualText cn="新建 / 编辑 / 保存" en="Create / Edit / Save" /></p>
            <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={saveRow}>
              <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-4 py-3 text-sm text-[#2D333A] outline-none focus:border-[#947A66]" placeholder={kind === "logistics" ? "运单号或发货名称 / Tracking number or shipment name" : "运行标题 / Runtime title"} />
              <input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-4 py-3 text-sm text-[#2D333A] outline-none focus:border-[#947A66]" placeholder={kind === "logistics" ? "物流商 / Carrier / DHL / UPS / SF" : "分类 / Category"} />
              <input value={form.owner} onChange={(event) => setForm({ ...form, owner: event.target.value })} className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-4 py-3 text-sm text-[#2D333A] outline-none focus:border-[#947A66]" placeholder="负责人 / Owner" />
              <input value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-4 py-3 text-sm text-[#2D333A] outline-none focus:border-[#947A66]" placeholder={kind === "finance" ? "金额 / 结算值 / Amount / settlement value" : "可选金额 / Optional value"} />
              <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as RuntimeStatus })} className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-4 py-3 text-sm text-[#2D333A] outline-none focus:border-[#947A66]">
                {runtimeStatuses.map((status) => <option key={status} value={status}>{statusText[status].cn} / {statusText[status].en}</option>)}
              </select>
              <textarea value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} className="min-h-24 rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-4 py-3 text-sm text-[#2D333A] outline-none focus:border-[#947A66] md:col-span-2" placeholder="运营备注 / Operational note" />
              <div className="flex flex-wrap gap-2 md:col-span-2">
                <RuntimeButton type="submit" tone="primary"><BilingualText {...actionText.save} /></RuntimeButton>
                <RuntimeButton onClick={() => setForm(emptyRuntimeForm)}><BilingualText {...actionText.clear} /></RuntimeButton>
              </div>
            </form>
          </RuntimeCard>
        ) : null}

        {activeTab === "logs" ? <RuntimeLogs logs={logs} /> : null}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#6B7280]">分页 / Pagination · 第 {page} 页 / Page {page} of {totalPages} · {filteredRows.length} 条记录 / records</p>
          <div className="flex gap-2">
            <RuntimeButton onClick={() => setPage(Math.max(1, page - 1))}><BilingualText {...actionText.previous} /></RuntimeButton>
            <RuntimeButton onClick={() => setPage(Math.min(totalPages, page + 1))}><BilingualText {...actionText.next} /></RuntimeButton>
          </div>
        </div>
      </section>

      <aside className="grid gap-5">
        <RuntimeCard>
          <p className="text-sm text-[#6B7280]"><BilingualText cn="抽屉 / 记录详情" en="Drawer / Record Detail" /></p>
          <h3 className="mt-2 text-2xl font-semibold text-[#2D333A]">{drawerItem?.name ?? "未选择记录 / No item selected"}</h3>
          {drawerItem ? (
            <div className="mt-4 grid gap-3 text-sm text-[#6B7280]">
              <p>状态 / Status: {statusText[drawerItem.status].cn} / {statusText[drawerItem.status].en}</p>
              <p>分类 / Category: {drawerItem.category}</p>
              <p>负责人 / Owner: {drawerItem.owner}</p>
              <p>{drawerItem.note}</p>
              {drawerItem.previewUrl ? <object data={drawerItem.previewUrl} aria-label="Uploaded asset preview" className="h-48 w-full rounded-xl border border-[#D9DCE0] object-contain" /> : null}
              <div className="flex flex-wrap gap-2">
                <RuntimeButton onClick={() => editRow(drawerItem)}><BilingualText {...actionText.edit} /></RuntimeButton>
                <RuntimeButton tone="primary" onClick={() => updateRow(drawerItem.id, { status: "Published" }, `Published ${drawerItem.name}`)}><BilingualText {...actionText.publish} /></RuntimeButton>
                <RuntimeButton onClick={() => updateRow(drawerItem.id, { status: "Archived" }, `Archived ${drawerItem.name}`)}><BilingualText {...actionText.archive} /></RuntimeButton>
                <RuntimeButton tone="danger" onClick={() => deleteRow(drawerItem)}><BilingualText {...actionText.delete} /></RuntimeButton>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm leading-6 text-[#6B7280]">打开一条记录后可查看、编辑、发布、归档、删除、预览与查看历史。 / Open a row to inspect, edit, publish, archive, delete, preview, and review history.</p>
          )}
        </RuntimeCard>

        {workspace.mobile ? (
          <RuntimeCard>
            <p className="text-sm text-[#6B7280]"><BilingualText cn={t.quick} en="Mobile High-Frequency Actions" /></p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {workspace.mobile.map((item) => (
                <button key={item} type="button" onClick={() => writeLogs(`Mobile action: ${item}`)} className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-3 py-3 text-left text-sm text-[#6B7280] hover:border-[#A88C75]">{item}</button>
              ))}
            </div>
          </RuntimeCard>
        ) : null}
      </aside>

      {modalAction ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#2D333A]/35 px-4">
          <div className="w-full max-w-md rounded-3xl border border-[#947A66] bg-white p-6 shadow-[0_28px_80px_rgba(0,0,0,0.5)]">
            <p className="text-sm text-[#6B7280]"><BilingualText cn="弹窗 / 确认" en="Modal / Confirmation" /></p>
            <h3 className="mt-2 text-2xl font-semibold text-[#2D333A]">{modalAction.label}</h3>
            <p className="mt-3 text-sm leading-6 text-[#6B7280]">此操作会写入当前 Runtime 状态，并增加一条审计日志。 / This operation writes to the current Runtime state and adds an audit log entry.</p>
            <div className="mt-6 flex justify-end gap-2">
              <RuntimeButton onClick={() => setModalAction(null)}><BilingualText {...actionText.cancel} /></RuntimeButton>
              <RuntimeButton tone="primary" onClick={() => { modalAction.run(); setModalAction(null); }}><BilingualText {...actionText.confirm} /></RuntimeButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function RuntimeRecordsTable({ rows, editRow, deleteRow, setDrawerItem, updateRow }: Readonly<{ rows: RuntimeRow[]; editRow: (row: RuntimeRow) => void; deleteRow: (row: RuntimeRow) => void; setDrawerItem: (row: RuntimeRow) => void; updateRow: (rowId: string, patch: Partial<RuntimeRow>, logMessage: string) => void }>) {
  return (
    <div className="mt-5 overflow-auto rounded-2xl border border-[#D9DCE0]">
      <table className="w-full min-w-[62rem] border-collapse text-left text-sm">
        <thead className="bg-[#EBEDEF] text-[#6B7280]">
          <tr>
            <th className="border-b border-[#D9DCE0] px-3 py-3"><BilingualText cn="名称" en="Name" /></th>
            <th className="border-b border-[#D9DCE0] px-3 py-3"><BilingualText cn="状态" en="Status" /></th>
            <th className="border-b border-[#D9DCE0] px-3 py-3"><BilingualText cn="分类" en="Category" /></th>
            <th className="border-b border-[#D9DCE0] px-3 py-3"><BilingualText cn="负责人" en="Owner" /></th>
            <th className="border-b border-[#D9DCE0] px-3 py-3"><BilingualText cn="进度" en="Progress" /></th>
            <th className="border-b border-[#D9DCE0] px-3 py-3"><BilingualText cn="金额" en="Amount" /></th>
            <th className="border-b border-[#D9DCE0] px-3 py-3"><BilingualText cn="更新时间" en="Updated" /></th>
            <th className="border-b border-[#D9DCE0] px-3 py-3"><BilingualText cn="操作" en="Actions" /></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="border-b border-[#D9DCE0] px-3 py-3 text-[#2D333A]">{row.name}</td>
              <td className="border-b border-[#D9DCE0] px-3 py-3"><StatusPill>{row.status}</StatusPill></td>
              <td className="border-b border-[#D9DCE0] px-3 py-3 text-[#6B7280]">{row.category}</td>
              <td className="border-b border-[#D9DCE0] px-3 py-3 text-[#6B7280]">{row.owner}</td>
              <td className="border-b border-[#D9DCE0] px-3 py-3 text-[#6B7280]">{row.progress}%</td>
              <td className="border-b border-[#D9DCE0] px-3 py-3 text-[#6B7280]">{row.amount}</td>
              <td className="border-b border-[#D9DCE0] px-3 py-3 text-[#6B7280]">{row.updated}</td>
              <td className="border-b border-[#D9DCE0] px-3 py-3">
                <div className="flex flex-wrap gap-2">
                  <RuntimeButton onClick={() => setDrawerItem(row)}><BilingualText {...actionText.open} /></RuntimeButton>
                  <RuntimeButton onClick={() => editRow(row)}><BilingualText {...actionText.edit} /></RuntimeButton>
                  <RuntimeButton tone="primary" onClick={() => updateRow(row.id, { status: "Published", progress: 100 }, `Published ${row.name}`)}><BilingualText {...actionText.publish} /></RuntimeButton>
                  <RuntimeButton onClick={() => updateRow(row.id, { status: "Archived" }, `Archived ${row.name}`)}><BilingualText {...actionText.archive} /></RuntimeButton>
                  <RuntimeButton tone="danger" onClick={() => deleteRow(row)}><BilingualText {...actionText.delete} /></RuntimeButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RuntimeLogs({ logs }: Readonly<{ logs: RuntimeLog[] }>) {
  return (
    <RuntimeCard>
      <p className="text-sm text-[#6B7280]"><BilingualText cn="日志 / 历史" en="Logs / History" /></p>
      <div className="mt-4 grid gap-3">
        {logs.map((log) => (
          <div key={log.id} className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] p-3">
            <p className="text-sm text-[#2D333A]">{log.message}</p>
            <p className="mt-1 text-xs text-[#9CA3AF]">{log.time}</p>
          </div>
        ))}
      </div>
    </RuntimeCard>
  );
}

function SpecializedRuntimePanel({ kind, rows, updateRow, writeLogs }: Readonly<{ kind: RuntimeKind; rows: RuntimeRow[]; updateRow: (rowId: string, patch: Partial<RuntimeRow>, logMessage: string) => void; writeLogs: (message: string) => void }>) {
  const firstRow = rows[0];
  if (!firstRow) return null;

  if (kind === "ai") {
    const tokenUsage = rows.reduce((sum, row) => sum + row.tokens, 0);
    return (
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <RuntimeMetric label={<BilingualText cn="队列" en="Queue" />} value={`${rows.length}`} />
        <RuntimeMetric label={<BilingualText cn="Token 用量" en="Token Usage" />} value={`${tokenUsage}`} />
        <RuntimeMetric label={<BilingualText cn="进度" en="Progress" />} value={`${Math.round(rows.reduce((sum, row) => sum + row.progress, 0) / rows.length)}%`} />
        <RuntimeButton onClick={() => updateRow(firstRow.id, { status: "Open", progress: Math.min(100, firstRow.progress + 20), tokens: firstRow.tokens + 260 }, `Retried ${firstRow.name}`)}><BilingualText cn="重跑首条队列" en="Retry First Queue" /></RuntimeButton>
      </div>
    );
  }

  if (kind === "media") {
    return (
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <RuntimeMetric label={<BilingualText cn="文件" en="Files" />} value={`${rows.length}`} />
        <RuntimeMetric label={<BilingualText cn="分类" en="Categories" />} value="Brand / Product / Social" />
        <RuntimeMetric label={<BilingualText cn="安全区" en="Safe Area" />} value="PC + Mobile" />
        <RuntimeButton onClick={() => writeLogs("Safe Area preview opened")}><BilingualText cn="安全区预览" en="Safe Area Preview" /></RuntimeButton>
      </div>
    );
  }

  if (kind === "logistics") {
    return (
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <RuntimeMetric label={<BilingualText cn="单号录入" en="Tracking Input" />} value="Ready" />
        <RuntimeMetric label={<BilingualText cn="物流商选择" en="Carrier Select" />} value="DHL / UPS / SF" />
        <RuntimeMetric label={<BilingualText cn="退货" en="Returns" />} value={`${rows.filter((row) => row.name.toLowerCase().includes("return")).length}`} />
        <RuntimeButton onClick={() => updateRow(firstRow.id, { status: "Open", progress: 65 }, `Updated shipment ${firstRow.name}`)}><BilingualText cn="更新物流" en="Update Shipment" /></RuntimeButton>
      </div>
    );
  }

  if (kind === "supply") {
    return (
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <RuntimeMetric label={<BilingualText cn="供应商" en="Suppliers" />} value={`${rows.length}`} />
        <RuntimeMetric label={<BilingualText cn="预警状态" en="Warning States" />} value={`${rows.filter((row) => row.status === "Failed").length}`} />
        <RuntimeMetric label={<BilingualText cn="采购" en="Procurement" />} value="Records active" />
        <RuntimeButton onClick={() => updateRow(firstRow.id, { status: "Review" }, `Inventory warning reviewed: ${firstRow.name}`)}><BilingualText cn="复核预警" en="Review Warning" /></RuntimeButton>
      </div>
    );
  }

  if (kind === "finance") {
    return (
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <RuntimeMetric label={<BilingualText cn="结算" en="Settlement" />} value={`${rows.length} records`} />
        <RuntimeMetric label={<BilingualText cn="退款" en="Refunds" />} value={`${rows.filter((row) => row.name.toLowerCase().includes("refund")).length}`} />
        <RuntimeMetric label={<BilingualText cn="审计日志" en="Audit Logs" />} value="Active" />
        <RuntimeButton onClick={() => updateRow(firstRow.id, { status: "Review" }, `Freeze / unfreeze reviewed: ${firstRow.name}`)}><BilingualText cn="冻结 / 解冻" en="Freeze / Unfreeze" /></RuntimeButton>
      </div>
    );
  }

  if (kind === "moderation") {
    return (
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <RuntimeMetric label={<BilingualText cn="审核队列" en="Review Queue" />} value={`${rows.length}`} />
        <RuntimeMetric label={<BilingualText cn="举报" en="Reports" />} value={`${rows.filter((row) => row.status === "Review").length}`} />
        <RuntimeButton onClick={() => updateRow(firstRow.id, { status: "Published", progress: 100 }, `Approved ${firstRow.name}`)}><BilingualText cn="通过" en="Approve" /></RuntimeButton>
        <RuntimeButton onClick={() => updateRow(firstRow.id, { status: "Archived" }, `Rejected ${firstRow.name}`)}><BilingualText cn="驳回" en="Reject" /></RuntimeButton>
      </div>
    );
  }

  if (kind === "publishing") {
    return (
      <div className="mt-5 grid gap-3 md:grid-cols-5">
        <RuntimeButton onClick={() => updateRow(firstRow.id, { status: "Draft" }, `Draft saved: ${firstRow.name}`)}><BilingualText cn="草稿" en="Draft" /></RuntimeButton>
        <RuntimeButton onClick={() => writeLogs(`Preview opened: ${firstRow.name}`)}><BilingualText {...actionText.preview} /></RuntimeButton>
        <RuntimeButton tone="primary" onClick={() => updateRow(firstRow.id, { status: "Published", progress: 100 }, `Published ${firstRow.name}`)}><BilingualText {...actionText.publish} /></RuntimeButton>
        <RuntimeButton onClick={() => updateRow(firstRow.id, { status: "Scheduled", progress: 50 }, `Scheduled ${firstRow.name}`)}><BilingualText {...actionText.schedule} /></RuntimeButton>
        <RuntimeButton onClick={() => updateRow(firstRow.id, { status: "Archived" }, `Rollback ${firstRow.name}`)}><BilingualText {...actionText.rollback} /></RuntimeButton>
      </div>
    );
  }

  if (kind === "windseeker") {
    return (
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <RuntimeMetric label={<BilingualText cn="3分钟流程" en="3-Minute Flow" />} value="Discover / photo / AI / review" />
        <RuntimeMetric label={<BilingualText cn="AI 生成" en="AI Generated" />} value="Title / SEO / GEO / price" />
        <RuntimeMetric label={<BilingualText cn="保证金" en="Deposit" />} value="Hold / release / refund" />
        <RuntimeMetric label={<BilingualText cn="全球控制" en="Global Controls" />} value="AML / KYC / country / sanctions" />
        <RuntimeButton tone="primary" onClick={() => updateRow(firstRow.id, { status: "Published", progress: 100 }, `Wind Seeker approved: ${firstRow.name}`)}><BilingualText cn="通过上架" en="Approve Listing" /></RuntimeButton>
      </div>
    );
  }

  return (
    <div className="mt-5 grid gap-3 md:grid-cols-4">
      <RuntimeMetric label={<BilingualText cn="新建" en="Create" />} value="Ready" />
      <RuntimeMetric label={<BilingualText cn="编辑 / 保存" en="Edit / Save" />} value="Ready" />
      <RuntimeMetric label={<BilingualText cn="发布 / 归档" en="Publish / Archive" />} value="Ready" />
      <RuntimeMetric label={<BilingualText cn="历史" en="History" />} value="Active" />
    </div>
  );
}

function RuntimeMetric({ label, value }: Readonly<{ label: React.ReactNode; value: React.ReactNode }>) {
  return (
    <div className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] p-4">
      <p className="text-[#9CA3AF]">{label}</p>
      <p className="mt-3 text-lg text-[#2D333A]">{value}</p>
    </div>
  );
}

function OverviewWorkspace() {
  return (
    <div className="grid gap-5">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          [t.assetGovernance, "RI Constitution Pack V2 Global Runtime Blueprint", "12 asset domains"],
          ["AI \u961f\u5217", "AI Queue", "7 reserved lanes"],
          [t.logistics, "Fulfillment Runtime", "API-ready shell"],
          [t.risk, "Trust Infrastructure", "Backend-only runtime"],
          [t.client, "Human Runtime", "Client shell reserved"],
        ].map(([cn, en, value]) => (
          <RuntimeCard key={cn}>
            <p className="text-3xl font-semibold text-[#2D333A]">{cn}</p>
            <p className="mt-1 text-sm text-[#6B7280]">{en}</p>
            <p className="mt-6 text-xl text-[#2D333A]">{value}</p>
          </RuntimeCard>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <RuntimeCard>
          <h3 className="text-2xl font-semibold text-[#2D333A]">{t.upload}</h3>
          <div className="mt-4 grid gap-3">
            {uploadSpecs.map(([cn, en, size, ratio, safe, limits]) => (
              <article key={en} className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] p-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h4 className="text-xl font-semibold text-[#2D333A]">{cn}</h4>
                  <p className="text-sm text-[#6B7280]">{en}</p>
                </div>
                <dl className="mt-4 grid gap-2 text-sm text-[#6B7280] sm:grid-cols-2">
                  <div><dt className="text-[#9CA3AF]"><BilingualText cn="尺寸" en="Size" /></dt><dd>{size}</dd></div>
                  <div><dt className="text-[#9CA3AF]"><BilingualText cn="比例" en="Ratio" /></dt><dd>{ratio}</dd></div>
                  <div><dt className="text-[#9CA3AF]"><BilingualText cn="安全区" en="Safe Area" /></dt><dd>{safe}</dd></div>
                  <div><dt className="text-[#9CA3AF]"><BilingualText cn="限制" en="Limits" /></dt><dd>{limits}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </RuntimeCard>

        <RuntimeCard>
          <h3 className="text-2xl font-semibold text-[#2D333A]">{t.ruleBinding}</h3>
          <div className="mt-4 grid gap-3">
            {ruleBindings.map(([area, rule]) => (
              <div key={area} className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] p-4">
                <p className="text-xl font-semibold text-[#2D333A]">{area}</p>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">{rule}</p>
              </div>
            ))}
          </div>
        </RuntimeCard>
      </section>
    </div>
  );
}

function LocaleWorkspace() {
  return (
    <RuntimeCard>
      <h3 className="text-2xl font-semibold text-[#2D333A]">{t.localeGeo}</h3>
      <p className="mt-1 text-sm text-[#6B7280]">语言路由、canonical 本地化、hreflang 与区域准备。 / Locale routing, canonical localization, hreflang, and region readiness.</p>
      <div className="mt-5 max-h-[32rem] overflow-auto rounded-xl border border-[#D9DCE0]">
        <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
          <thead className="bg-[#EBEDEF] text-[#6B7280]">
            <tr>
              <th className="border-b border-[#D9DCE0] px-3 py-3"><BilingualText cn="路由" en="Route" /></th>
              <th className="border-b border-[#D9DCE0] px-3 py-3"><BilingualText cn="语言" en="Language" /></th>
              <th className="border-b border-[#D9DCE0] px-3 py-3"><BilingualText cn="方向" en="Direction" /></th>
              <th className="border-b border-[#D9DCE0] px-3 py-3"><BilingualText cn="状态" en="Status" /></th>
            </tr>
          </thead>
          <tbody>
            {locales.map((locale) => {
              const definition = localeDefinitions[locale];
              return (
                <tr key={locale}>
                  <td className="border-b border-[#D9DCE0] px-3 py-3 font-mono text-[#2D333A]">/{locale}</td>
                  <td className="border-b border-[#D9DCE0] px-3 py-3 text-[#6B7280]">{definition.label}</td>
                  <td className="border-b border-[#D9DCE0] px-3 py-3 text-[#6B7280]">{definition.dir.toUpperCase()}</td>
                  <td className="border-b border-[#D9DCE0] px-3 py-3 text-[#6B7280]">已预留 / Reserved</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </RuntimeCard>
  );
}

export function AdminOSConsole({ activeWorkspace = "overview" }: Readonly<{ activeWorkspace?: AdminWorkspaceId }>) {
  const workspace = workspaceMap[activeWorkspace];
  const activeGroup = navGroups.find((group) => (group.items as readonly AdminWorkspaceId[]).includes(activeWorkspace));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const usesObjectIntakeRuntime = objectIntakeAdminWorkspaces.has(activeWorkspace);
  const usesAssetRegistryRuntime = activeWorkspace === "product-media";
  const usesProductIntakeRuntime = activeWorkspace === "product-intake";
  const usesPublishReviewRuntime = activeWorkspace === "publish-review";
  const usesOrderRuntime = activeWorkspace === "orders";
  const usesPublishedObjectsRuntime = activeWorkspace === "objects";

  return (
    <main className="min-h-screen bg-[#F5F6F8] text-[#2D333A]">
      <div className="grid min-h-screen lg:grid-cols-[var(--admin-sidebar)_1fr]" style={{ "--admin-sidebar": sidebarCollapsed ? "5.5rem" : "20rem" } as CSSProperties}>
        <aside className="border-b border-[#D9DCE0] bg-[#EBEDEF] lg:border-r lg:border-b-0">
          <div className="border-b border-[#D9DCE0] px-5 py-5">
            <div className="flex items-center justify-between gap-3">
              <div className={sidebarCollapsed ? "sr-only" : ""}>
                <p className="text-2xl font-semibold leading-tight text-[#2D333A]">{t.adminSystem}</p>
                <p className="mt-1 text-sm text-[#6B7280]">Admin OS</p>
              </div>
              <button type="button" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#D9DCE0] bg-white text-sm text-[#2D333A] hover:border-[#A88C75]" aria-label="折叠侧边栏 / Collapse sidebar">
                {sidebarCollapsed ? ">" : "<"}
              </button>
            </div>
            <p className={`mt-4 text-sm leading-6 text-[#6B7280] ${sidebarCollapsed ? "sr-only" : ""}`}>{siteConfig.siteName}</p>
            <Link
              href="/admin"
              title="运行总览 / Runtime Overview"
              className={`mt-5 block w-full rounded-xl border px-3 py-3 text-left text-sm ${activeWorkspace === "overview" ? "border-[#947A66] bg-[#947A66] text-white" : "border-[#D9DCE0] bg-white text-[#6B7280]"}`}
            >
              {sidebarCollapsed ? "OV" : <BilingualText cn="运行总览" en="Runtime Overview" />}
            </Link>
          </div>

          <nav className="max-h-[calc(100vh-10rem)] overflow-auto px-3 py-4" aria-label="Admin OS workspace navigation">
            {navGroups.map((group) => {
              const isActiveGroup = activeGroup?.id === group.id;
              return (
                <details key={group.id} className="mb-2" open={isActiveGroup || group.id === "frontstage"}>
                  <summary
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${isActiveGroup ? "border-[#947A66] bg-white" : "border-transparent hover:border-[#D9DCE0] hover:bg-white"}`}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#D9DCE0] bg-[#947A66] text-xs font-semibold text-white">{group.icon}</span>
                    <span className={`min-w-0 flex-1 ${sidebarCollapsed ? "sr-only" : ""}`}>
                      <span className="block text-lg leading-tight text-[#2D333A]">{group.cn}</span>
                      <span className="block truncate text-xs text-[#9CA3AF]">{group.en}</span>
                    </span>
                    <span className={`text-[#6B7280] ${sidebarCollapsed ? "sr-only" : ""}`}>+</span>
                  </summary>

                  <div className={`mt-1 grid gap-1 ${sidebarCollapsed ? "pl-0" : "pl-12"}`}>
                    {group.items.map((id) => {
                      const item = workspaceMap[id];
                      const isActive = id === activeWorkspace;
                      return (
                        <Link
                          key={id}
                          href={workspaceHref(id)}
                          title={`${item.cn} / ${item.en}`}
                          className={`rounded-lg border px-3 py-2 text-left text-sm transition ${isActive ? "border-[#947A66] bg-[#947A66] text-white" : "border-transparent text-[#6B7280] hover:border-[#D9DCE0] hover:bg-white"}`}
                        >
                          <span className="block">{sidebarCollapsed ? item.en.slice(0, 2).toUpperCase() : item.cn}</span>
                          <span className={`mt-0.5 block text-xs text-[#9CA3AF] ${sidebarCollapsed ? "sr-only" : ""}`}>{item.en}</span>
                        </Link>
                      );
                    })}
                  </div>
                </details>
              );
            })}
          </nav>
        </aside>

        <section className="flex min-h-screen min-w-0 flex-col">
          <header className="sticky top-0 z-10 border-b border-[#D9DCE0] bg-[#F5F6F8]/96 px-4 py-4 backdrop-blur lg:px-7">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-sm text-[#6B7280]">Runtime Workspace Architecture</p>
                <h1 className="mt-1 text-3xl font-semibold leading-tight text-[#2D333A] sm:text-4xl">{workspace.en}</h1>
                <p className="mt-1 text-sm text-[#6B7280]">{workspace.cn} / {workspace.state}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusPill>{t.threeLevels} / 3 levels max</StatusPill>
                <StatusPill>{t.noCrop} / no browser crop</StatusPill>
                <StatusPill>Workspace switch</StatusPill>
              </div>
            </div>
          </header>

          <div className="min-h-0 flex-1 overflow-auto px-4 py-5 lg:px-7">
            {activeWorkspace === "overview" ? <OverviewWorkspace /> : null}
            {activeWorkspace === "locale-geo" ? <LocaleWorkspace /> : null}
            {usesProductIntakeRuntime ? <ObjectIntakeAdminNew /> : null}
            {usesAssetRegistryRuntime ? <AssetRegistryAdmin /> : null}
            {usesPublishReviewRuntime || usesObjectIntakeRuntime ? <ObjectIntakeAdminQueue /> : null}
            {usesOrderRuntime ? <OrderAdminQueue /> : null}
            {usesPublishedObjectsRuntime ? <PublishedObjectsAdmin /> : null}
            {activeWorkspace !== "overview" && activeWorkspace !== "locale-geo" && !usesProductIntakeRuntime && !usesAssetRegistryRuntime && !usesPublishReviewRuntime && !usesOrderRuntime && !usesPublishedObjectsRuntime && !usesObjectIntakeRuntime && isGlobalBuyerAdminWorkspace(activeWorkspace) ? <GlobalBuyerAdminRuntime workspaceId={activeWorkspace} /> : null}
            {activeWorkspace !== "overview" && activeWorkspace !== "locale-geo" && !usesProductIntakeRuntime && !usesAssetRegistryRuntime && !usesPublishReviewRuntime && !usesOrderRuntime && !usesPublishedObjectsRuntime && !usesObjectIntakeRuntime && !isGlobalBuyerAdminWorkspace(activeWorkspace) ? <WorkspacePanel workspace={workspace} /> : null}
          </div>
        </section>
      </div>
    </main>
  );
}




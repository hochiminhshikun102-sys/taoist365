"use client";

import Link from "next/link";
import { useState } from "react";
import { locales, localeDefinitions } from "@/config/locales";
import { siteConfig } from "@/config/site";

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
  | "objects"
  | "orders"
  | "payments"
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
  | "merchant-settlement"
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
    work: ["Finance overview", "Reconciliation", "Refund reconciliation", "Merchant settlement", "Tax", "Funds ledger", "Freeze / unfreeze", "Audit logs"],
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
  "merchant-settlement": {
    id: "merchant-settlement",
    cn: "\u5546\u6237\u7ed3\u7b97",
    en: "Merchant Settlement",
    state: "Settlement shell",
    work: ["Settlement list", "Merchant", "Amount", "Status", "Payout", "Logs"],
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
    items: ["objects", "orders", "payments"] satisfies AdminWorkspaceId[],
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
    items: ["compliance-legal", "gdpr-runtime", "ccpa-runtime", "terms-runtime", "privacy-policy-runtime", "ai-usage-agreement", "infringement-handling", "legal-logs"] satisfies AdminWorkspaceId[],
  },
  {
    id: "finance",
    icon: "FN",
    cn: t.finance,
    en: "Finance & Settlement",
    items: ["finance-settlement", "finance-overview", "reconciliation", "refund-reconciliation", "merchant-settlement", "tax-runtime", "funds-ledger", "freeze-unfreeze", "finance-audit-logs"] satisfies AdminWorkspaceId[],
  },
  {
    id: "ai",
    icon: "AI",
    cn: t.ai,
    en: "AI Operations",
    items: ["ai-queue", "ai-image", "ai-video", "geo", "viral-radar"] satisfies AdminWorkspaceId[],
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
    items: ["windkeep", "driftbox", "rules-binding", "locale-geo"] satisfies AdminWorkspaceId[],
  },
] as const;

export const adminWorkspaceIds = Object.keys(workspaceMap) as AdminWorkspaceId[];

export function isAdminWorkspaceId(value: string): value is AdminWorkspaceId {
  return adminWorkspaceIds.includes(value as AdminWorkspaceId);
}

function workspaceHref(id: AdminWorkspaceId) {
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
  return (
    <span className="rounded-full border border-[#8d7446]/55 bg-[#20180d] px-3 py-1 text-xs text-[#d8bd78]">
      {children}
    </span>
  );
}

function RuntimeCard({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="rounded-2xl border border-[#3b2c18] bg-[#100d09] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
      {children}
    </div>
  );
}

const runtimeStatuses = ["Open", "Review", "Scheduled", "Failed"] as const;

function WorkspacePanel({ workspace }: Readonly<{ workspace: Workspace }>) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [drawerItem, setDrawerItem] = useState<string | null>(null);
  const [modalAction, setModalAction] = useState<string | null>(null);

  const rows = workspace.work.map((work, index) => ({
    id: `${workspace.id}-${index + 1}`,
    name: work,
    status: runtimeStatuses[index % runtimeStatuses.length],
    owner: index % 2 === 0 ? "Operations" : "Review",
    queue: `${index + 2}`,
    updated: `2026-05-${15 - (index % 4)}`,
  }));
  const filteredRows = rows.filter((row) => {
    const matchesQuery = row.name.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All" || row.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
      <section className="rounded-3xl border border-[#3b2c18] bg-[#100d09] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.34)] sm:p-6">
        <div className="flex flex-col gap-4 border-b border-[#2d2214] pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-[#9f8a60]">{workspace.en}</p>
            <h2 className="mt-2 text-4xl font-semibold leading-tight text-[#f3db9b]">{workspace.cn}</h2>
          </div>
          <StatusPill>{workspace.state}</StatusPill>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.22em] text-[#7f704f]">Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[#3b2c18] bg-[#0b0907] px-4 py-3 text-sm text-[#f1e7cf] outline-none focus:border-[#8d7446]"
              placeholder="Search runtime item"
              type="search"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.22em] text-[#7f704f]">Filter</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[#3b2c18] bg-[#0b0907] px-4 py-3 text-sm text-[#f1e7cf] outline-none focus:border-[#8d7446]"
            >
              <option>All</option>
              {runtimeStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>
          <div className="flex items-end gap-2">
            <button type="button" onClick={() => setModalAction("Create runtime item")} className="rounded-xl border border-[#8d7446] bg-[#20180d] px-4 py-3 text-sm text-[#f3db9b]">
              New
            </button>
            <button type="button" onClick={() => setModalAction("Upload asset")} className="rounded-xl border border-[#3b2c18] bg-[#0b0907] px-4 py-3 text-sm text-[#d8c48d]">
              Upload
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Status", workspace.state],
            ["Queue", `${rows.length} items`],
            ["Logs", "Audit trail active"],
            ["Actions", "Drawer + modal ready"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-[#2d2214] bg-[#0b0907] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[#7f704f]">{label}</p>
              <p className="mt-3 text-lg text-[#e7d19a]">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 overflow-auto rounded-2xl border border-[#2d2214]">
          <table className="w-full min-w-[54rem] border-collapse text-left text-sm">
            <thead className="bg-[#0b0907] text-[#9f8a60]">
              <tr>
                <th className="border-b border-[#2d2214] px-3 py-3">Runtime Item</th>
                <th className="border-b border-[#2d2214] px-3 py-3">Status</th>
                <th className="border-b border-[#2d2214] px-3 py-3">Owner</th>
                <th className="border-b border-[#2d2214] px-3 py-3">Queue</th>
                <th className="border-b border-[#2d2214] px-3 py-3">Updated</th>
                <th className="border-b border-[#2d2214] px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id}>
                  <td className="border-b border-[#1e170f] px-3 py-3 text-[#e7d19a]">{row.name}</td>
                  <td className="border-b border-[#1e170f] px-3 py-3"><StatusPill>{row.status}</StatusPill></td>
                  <td className="border-b border-[#1e170f] px-3 py-3 text-[#cbb477]">{row.owner}</td>
                  <td className="border-b border-[#1e170f] px-3 py-3 text-[#cbb477]">{row.queue}</td>
                  <td className="border-b border-[#1e170f] px-3 py-3 text-[#9f8a60]">{row.updated}</td>
                  <td className="border-b border-[#1e170f] px-3 py-3">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setDrawerItem(row.name)} className="rounded-lg border border-[#3b2c18] px-3 py-2 text-xs text-[#d8c48d] hover:border-[#8d7446]">Open</button>
                      <button type="button" onClick={() => setModalAction(`Approve ${row.name}`)} className="rounded-lg border border-[#3b2c18] px-3 py-2 text-xs text-[#d8c48d] hover:border-[#8d7446]">Approve</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-2">
          <RuntimeCard>
            <p className="text-sm text-[#9f8a60]">Form / Runtime editing</p>
            <form className="mt-4 grid gap-3" onSubmit={(event) => { event.preventDefault(); setModalAction("Save runtime form"); }}>
              <input className="rounded-xl border border-[#3b2c18] bg-[#0b0907] px-4 py-3 text-sm text-[#f1e7cf] outline-none focus:border-[#8d7446]" placeholder="Runtime title" />
              <select className="rounded-xl border border-[#3b2c18] bg-[#0b0907] px-4 py-3 text-sm text-[#f1e7cf] outline-none focus:border-[#8d7446]">
                {runtimeStatuses.map((status) => <option key={status}>{status}</option>)}
              </select>
              <textarea className="min-h-24 rounded-xl border border-[#3b2c18] bg-[#0b0907] px-4 py-3 text-sm text-[#f1e7cf] outline-none focus:border-[#8d7446]" placeholder="Operational note" />
              <button type="submit" className="rounded-xl border border-[#8d7446] bg-[#20180d] px-4 py-3 text-sm text-[#f3db9b]">Save Form</button>
            </form>
          </RuntimeCard>

          <RuntimeCard>
            <p className="text-sm text-[#9f8a60]">Queue / Logs</p>
            <div className="mt-4 grid gap-3">
              {rows.slice(0, 4).map((row) => (
                <div key={`log-${row.id}`} className="flex items-center justify-between gap-3 rounded-xl border border-[#2d2214] bg-[#0b0907] p-3">
                  <div>
                    <p className="text-sm text-[#e7d19a]">{row.name}</p>
                    <p className="mt-1 text-xs text-[#7f704f]">Queue {row.queue} / {row.updated}</p>
                  </div>
                  <button type="button" onClick={() => setModalAction(`Retry ${row.name}`)} className="rounded-lg border border-[#3b2c18] px-3 py-2 text-xs text-[#d8c48d]">Retry</button>
                </div>
              ))}
            </div>
          </RuntimeCard>
        </div>
      </section>

      <aside className="grid gap-5">
        <RuntimeCard>
          <p className="text-sm text-[#9f8a60]">Drawer</p>
          <h3 className="mt-2 text-2xl font-semibold text-[#e7d19a]">{drawerItem ?? "No item selected"}</h3>
          <p className="mt-3 text-sm leading-6 text-[#cbb477]">Open a row to inspect status, queue position, logs, linked rules, and operator actions without leaving this workspace.</p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => setModalAction("Escalate drawer item")} className="rounded-xl border border-[#3b2c18] px-3 py-2 text-sm text-[#d8c48d]">Escalate</button>
            <button type="button" onClick={() => setDrawerItem(null)} className="rounded-xl border border-[#3b2c18] px-3 py-2 text-sm text-[#d8c48d]">Close</button>
          </div>
        </RuntimeCard>

        {workspace.ai ? (
          <RuntimeCard>
            <p className="text-sm text-[#9f8a60]">AI Runtime Extension</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {workspace.ai.map((item) => (
                <StatusPill key={item}>{item}</StatusPill>
              ))}
            </div>
          </RuntimeCard>
        ) : null}

        {workspace.mobile ? (
          <RuntimeCard>
            <p className="text-sm text-[#9f8a60]">{t.quick} / Mobile high-frequency only</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {workspace.mobile.map((item) => (
                <span key={item} className="text-sm text-[#cbb477]">{item}</span>
              ))}
            </div>
          </RuntimeCard>
        ) : null}
      </aside>

      {modalAction ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/65 px-4">
          <div className="w-full max-w-md rounded-3xl border border-[#8d7446]/60 bg-[#100d09] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.5)]">
            <p className="text-sm text-[#9f8a60]">Modal</p>
            <h3 className="mt-2 text-2xl font-semibold text-[#f3db9b]">{modalAction}</h3>
            <p className="mt-3 text-sm leading-6 text-[#cbb477]">Confirm this operation inside the current Runtime Workspace. This shell reserves approval, failure retry, and audit log hooks.</p>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setModalAction(null)} className="rounded-xl border border-[#3b2c18] px-4 py-3 text-sm text-[#d8c48d]">Cancel</button>
              <button type="button" onClick={() => setModalAction(null)} className="rounded-xl border border-[#8d7446] bg-[#20180d] px-4 py-3 text-sm text-[#f3db9b]">Confirm</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function OverviewWorkspace() {
  return (
    <div className="grid gap-5">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          [t.assetGovernance, "Visual Governance", "12 asset domains"],
          ["AI \u961f\u5217", "AI Queue", "7 reserved lanes"],
          [t.logistics, "Fulfillment Runtime", "API-ready shell"],
          [t.risk, "Trust Infrastructure", "Backend-only runtime"],
          [t.client, "Human Runtime", "Client shell reserved"],
        ].map(([cn, en, value]) => (
          <RuntimeCard key={cn}>
            <p className="text-3xl font-semibold text-[#e7d19a]">{cn}</p>
            <p className="mt-1 text-sm text-[#9f8a60]">{en}</p>
            <p className="mt-6 text-xl text-[#f1e7cf]">{value}</p>
          </RuntimeCard>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <RuntimeCard>
          <h3 className="text-2xl font-semibold text-[#e7d19a]">{t.upload}</h3>
          <div className="mt-4 grid gap-3">
            {uploadSpecs.map(([cn, en, size, ratio, safe, limits]) => (
              <article key={en} className="rounded-xl border border-[#2d2214] bg-[#0b0907] p-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h4 className="text-xl font-semibold text-[#e7d19a]">{cn}</h4>
                  <p className="text-sm text-[#9f8a60]">{en}</p>
                </div>
                <dl className="mt-4 grid gap-2 text-sm text-[#cbb477] sm:grid-cols-2">
                  <div><dt className="text-[#7f704f]">Size</dt><dd>{size}</dd></div>
                  <div><dt className="text-[#7f704f]">Ratio</dt><dd>{ratio}</dd></div>
                  <div><dt className="text-[#7f704f]">Safe Area</dt><dd>{safe}</dd></div>
                  <div><dt className="text-[#7f704f]">Limits</dt><dd>{limits}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </RuntimeCard>

        <RuntimeCard>
          <h3 className="text-2xl font-semibold text-[#e7d19a]">{t.ruleBinding}</h3>
          <div className="mt-4 grid gap-3">
            {ruleBindings.map(([area, rule]) => (
              <div key={area} className="rounded-xl border border-[#2d2214] bg-[#0b0907] p-4">
                <p className="text-xl font-semibold text-[#e7d19a]">{area}</p>
                <p className="mt-2 text-sm leading-6 text-[#cbb477]">{rule}</p>
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
      <h3 className="text-2xl font-semibold text-[#e7d19a]">{t.localeGeo}</h3>
      <p className="mt-1 text-sm text-[#9f8a60]">Locale routing, canonical localization, hreflang, and region readiness.</p>
      <div className="mt-5 max-h-[32rem] overflow-auto rounded-xl border border-[#2d2214]">
        <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
          <thead className="bg-[#0b0907] text-[#9f8a60]">
            <tr>
              <th className="border-b border-[#2d2214] px-3 py-3">Route</th>
              <th className="border-b border-[#2d2214] px-3 py-3">Language</th>
              <th className="border-b border-[#2d2214] px-3 py-3">Direction</th>
              <th className="border-b border-[#2d2214] px-3 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {locales.map((locale) => {
              const definition = localeDefinitions[locale];
              return (
                <tr key={locale}>
                  <td className="border-b border-[#1e170f] px-3 py-3 font-mono text-[#e7d19a]">/{locale}</td>
                  <td className="border-b border-[#1e170f] px-3 py-3 text-[#cbb477]">{definition.label}</td>
                  <td className="border-b border-[#1e170f] px-3 py-3 text-[#cbb477]">{definition.dir.toUpperCase()}</td>
                  <td className="border-b border-[#1e170f] px-3 py-3 text-[#9f8a60]">Reserved</td>
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

  return (
    <main className="min-h-screen bg-[#070605] text-[#f1e7cf]">
      <div className="grid min-h-screen lg:grid-cols-[20rem_1fr]">
        <aside className="border-b border-[#2d2214] bg-[#0b0907] lg:border-r lg:border-b-0">
          <div className="border-b border-[#2d2214] px-5 py-5">
            <p className="text-2xl font-semibold leading-tight text-[#e7d19a]">{t.adminSystem}</p>
            <p className="mt-1 text-sm text-[#9f8a60]">Admin OS</p>
            <p className="mt-4 text-sm leading-6 text-[#b9a878]">{siteConfig.siteName}</p>
            <Link
              href="/admin"
              className={`mt-5 block w-full rounded-xl border px-3 py-3 text-left text-sm ${activeWorkspace === "overview" ? "border-[#8d7446] bg-[#20180d] text-[#f3db9b]" : "border-[#3b2c18] bg-[#100d09] text-[#cbb477]"}`}
            >
              Runtime Overview
            </Link>
          </div>

          <nav className="max-h-[calc(100vh-10rem)] overflow-auto px-3 py-4" aria-label="Admin OS workspace navigation">
            {navGroups.map((group) => {
              const isActiveGroup = activeGroup?.id === group.id;
              return (
                <details key={group.id} className="mb-2" open={isActiveGroup || group.id === "frontstage"}>
                  <summary
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${isActiveGroup ? "border-[#8d7446]/70 bg-[#171107]" : "border-transparent hover:border-[#3b2c18] hover:bg-[#100d09]"}`}
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-[#4b381f] bg-[#100d09] text-xs font-semibold text-[#d8bd78]">{group.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg leading-tight text-[#e7d19a]">{group.cn}</span>
                      <span className="block truncate text-xs text-[#7f704f]">{group.en}</span>
                    </span>
                    <span className="text-[#9f8a60]">+</span>
                  </summary>

                  <div className="mt-1 grid gap-1 pl-12">
                    {group.items.map((id) => {
                      const item = workspaceMap[id];
                      const isActive = id === activeWorkspace;
                      return (
                        <Link
                          key={id}
                          href={workspaceHref(id)}
                          className={`rounded-lg border px-3 py-2 text-left text-sm transition ${isActive ? "border-[#8d7446] bg-[#20180d] text-[#f3db9b]" : "border-transparent text-[#b9a878] hover:border-[#3b2c18] hover:bg-[#100d09]"}`}
                        >
                          <span className="block">{item.cn}</span>
                          <span className="mt-0.5 block text-xs text-[#7f704f]">{item.en}</span>
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
          <header className="sticky top-0 z-10 border-b border-[#2d2214] bg-[#070605]/96 px-4 py-4 backdrop-blur lg:px-7">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-sm text-[#9f8a60]">Runtime Workspace Architecture</p>
                <h1 className="mt-1 text-3xl font-semibold leading-tight text-[#f3db9b] sm:text-4xl">{workspace.en}</h1>
                <p className="mt-1 text-sm text-[#b9a878]">{workspace.cn} / {workspace.state}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusPill>{t.threeLevels} / 3 levels max</StatusPill>
                <StatusPill>{t.noCrop} / no browser crop</StatusPill>
                <StatusPill>Workspace switch</StatusPill>
              </div>
            </div>
          </header>

          <div className="min-h-0 flex-1 overflow-auto px-4 py-5 lg:px-7">
            {activeWorkspace === "overview" ? <OverviewWorkspace /> : activeWorkspace === "locale-geo" ? <LocaleWorkspace /> : <WorkspacePanel workspace={workspace} />}
          </div>
        </section>
      </div>
    </main>
  );
}


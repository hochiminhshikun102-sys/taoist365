import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminOSAccess } from "@/components/admin/AdminOSAccess";
import { AdminOSConsole, type AdminWorkspaceId } from "@/components/admin/AdminOSConsole";

const adminWorkspaceIds = [
  "objects",
  "orders",
  "payments",
  "message-center",
  "notification-overview",
  "notification-templates",
  "user-messages",
  "push-channels",
  "notification-audit",
  "ai-reach-reserve",
  "campaign-center",
  "coupons",
  "campaigns",
  "points-mall",
  "sharing-reserve",
  "roi-data",
  "ai-campaign-optimization",
  "after-sales-center",
  "after-sales-requests",
  "refunds-runtime",
  "exchange-runtime",
  "arbitration-runtime",
  "after-sales-tracking",
  "after-sales-risk-link",
  "community-moderation",
  "comment-review",
  "report-handling",
  "ugc-review",
  "sensitive-words",
  "ai-content-moderation",
  "media-moderation",
  "compliance-legal",
  "gdpr-runtime",
  "ccpa-runtime",
  "terms-runtime",
  "privacy-policy-runtime",
  "ai-usage-agreement",
  "infringement-handling",
  "legal-logs",
  "finance-settlement",
  "finance-overview",
  "reconciliation",
  "refund-reconciliation",
  "merchant-settlement",
  "tax-runtime",
  "funds-ledger",
  "freeze-unfreeze",
  "finance-audit-logs",
  "homepage-runtime",
  "section-runtime",
  "navigation-runtime",
  "frontstage-visual",
  "homepage-rotation",
  "publishing-runtime",
  "global-locale-runtime",
  "quiet-analytics",
  "frontstage-safe-area",
  "atmosphere-governance",
  "ai-queue",
  "ai-image",
  "ai-video",
  "geo",
  "viral-radar",
  "logistics",
  "tracking",
  "freight",
  "returns",
  "suppliers",
  "inventory",
  "procurement",
  "costs",
  "brand-assets",
  "product-media",
  "social-media",
  "prompt-packs",
  "safe-area",
  "member-center",
  "member-risk-control",
  "client-runtime",
  "windkeep",
  "driftbox",
  "rules-binding",
  "locale-geo",
] as const satisfies readonly AdminWorkspaceId[];

type AdminWorkspacePageProps = {
  params: Promise<{ workspaceId: string }>;
};

function isAdminWorkspaceId(value: string): value is AdminWorkspaceId {
  return (adminWorkspaceIds as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return adminWorkspaceIds.map((workspaceId) => ({ workspaceId }));
}

export async function generateMetadata({ params }: AdminWorkspacePageProps): Promise<Metadata> {
  const { workspaceId } = await params;
  return {
    title: isAdminWorkspaceId(workspaceId) ? `Admin OS - ${workspaceId}` : "Admin OS",
    description: "Reverent Inquiry Admin OS Runtime Workspace.",
  };
}

export default async function AdminWorkspacePage({ params }: AdminWorkspacePageProps) {
  const { workspaceId } = await params;

  if (!isAdminWorkspaceId(workspaceId)) {
    notFound();
  }

  return (
    <AdminOSAccess>
      <AdminOSConsole activeWorkspace={workspaceId} />
    </AdminOSAccess>
  );
}

import type { Metadata } from "next";
import { AdminOSAccess } from "@/components/admin/AdminOSAccess";
import { AdminCommerceOpsNav } from "@/components/admin/AdminCommerceOpsNav";
import { ObjectIntakeAdminQueue } from "@/components/object-intake/ObjectIntakeAdminQueue";

export const metadata: Metadata = {
  title: "Publish Review - Reverent Inquiry",
  robots: { index: false, follow: false },
};

export default function AdminPublishReviewPage() {
  return (
    <AdminOSAccess>
      <AdminCommerceOpsNav />
      <ObjectIntakeAdminQueue />
    </AdminOSAccess>
  );
}

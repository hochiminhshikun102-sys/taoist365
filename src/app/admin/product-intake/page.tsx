import type { Metadata } from "next";
import { AdminOSAccess } from "@/components/admin/AdminOSAccess";
import { AdminCommerceOpsNav } from "@/components/admin/AdminCommerceOpsNav";
import { ObjectIntakeAdminNew } from "@/components/object-intake/ObjectIntakeAdminNew";

export const metadata: Metadata = {
  title: "Product Intake - Reverent Inquiry",
  robots: { index: false, follow: false },
};

export default function AdminProductIntakePage() {
  return (
    <AdminOSAccess>
      <AdminCommerceOpsNav />
      <ObjectIntakeAdminNew />
    </AdminOSAccess>
  );
}

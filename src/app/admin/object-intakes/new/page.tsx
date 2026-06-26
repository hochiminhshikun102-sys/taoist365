import type { Metadata } from "next";
import { AdminOSAccess } from "@/components/admin/AdminOSAccess";
import { ObjectIntakeAdminNew } from "@/components/object-intake/ObjectIntakeAdminNew";

export const metadata: Metadata = {
  title: "Admin Object Intake New - Dohara",
  robots: { index: false, follow: false },
};

export default function AdminObjectIntakeNewPage() {
  return (
    <AdminOSAccess>
      <ObjectIntakeAdminNew />
    </AdminOSAccess>
  );
}

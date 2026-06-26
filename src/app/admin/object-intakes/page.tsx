import type { Metadata } from "next";
import { AdminOSAccess } from "@/components/admin/AdminOSAccess";
import { ObjectIntakeAdminQueue } from "@/components/object-intake/ObjectIntakeAdminQueue";

export const metadata: Metadata = {
  title: "Admin Object Intakes - Dohara",
  robots: { index: false, follow: false },
};

export default function AdminObjectIntakesPage() {
  return (
    <AdminOSAccess>
      <ObjectIntakeAdminQueue />
    </AdminOSAccess>
  );
}

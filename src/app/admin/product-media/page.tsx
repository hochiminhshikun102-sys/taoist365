import type { Metadata } from "next";
import { AdminOSAccess } from "@/components/admin/AdminOSAccess";
import { AssetRegistryAdmin } from "@/components/admin/AssetRegistryAdmin";

export const metadata: Metadata = {
  title: "Admin Product Media - Reverent Inquiry",
  robots: { index: false, follow: false },
};

export default function AdminProductMediaPage() {
  return (
    <AdminOSAccess>
      <AssetRegistryAdmin />
    </AdminOSAccess>
  );
}

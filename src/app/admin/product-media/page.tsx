import type { Metadata } from "next";
import { AdminOSAccess } from "@/components/admin/AdminOSAccess";
import { AdminOSConsole } from "@/components/admin/AdminOSConsole";

export const metadata: Metadata = {
  title: "Admin Product Media - Reverent Inquiry",
  robots: { index: false, follow: false },
};

export default function AdminProductMediaPage() {
  return (
    <AdminOSAccess>
      <AdminOSConsole activeWorkspace="product-media" />
    </AdminOSAccess>
  );
}

import type { Metadata } from "next";
import { AdminOSAccess } from "@/components/admin/AdminOSAccess";
import { AdminOSConsole } from "@/components/admin/AdminOSConsole";

export const metadata: Metadata = {
  title: "Product Intake - Dohara",
  robots: { index: false, follow: false },
};

export default function AdminProductIntakePage() {
  return (
    <AdminOSAccess>
      <AdminOSConsole activeWorkspace="product-intake" />
    </AdminOSAccess>
  );
}

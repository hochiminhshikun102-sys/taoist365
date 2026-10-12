import type { Metadata } from "next";
import { AdminOSAccess } from "@/components/admin/AdminOSAccess";
import Publish from "@/components/oa-publish/Publish";

export const metadata: Metadata = {
  title: "Product Publishing — DOHARA CO Preview",
  robots: { index: false, follow: false },
};

export default function AdminCoPublishPage() {
  return (
    <AdminOSAccess>
      <Publish />
    </AdminOSAccess>
  );
}

import type { Metadata } from "next";
import { AdminOSAccess } from "@/components/admin/AdminOSAccess";
import { AdminOSConsole } from "@/components/admin/AdminOSConsole";

export const metadata: Metadata = {
  title: "Publish Review - Reverent Inquiry",
  robots: { index: false, follow: false },
};

export default function AdminPublishReviewPage() {
  return (
    <AdminOSAccess>
      <AdminOSConsole activeWorkspace="publish-review" />
    </AdminOSAccess>
  );
}

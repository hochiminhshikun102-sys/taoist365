import { AdminOSAccess } from "@/components/admin/AdminOSAccess";
import { AdminCommerceOpsNav } from "@/components/admin/AdminCommerceOpsNav";
import { AdminOSConsole } from "@/components/admin/AdminOSConsole";

export default function AdminPage() {
  return (
    <AdminOSAccess>
      <AdminCommerceOpsNav />
      <AdminOSConsole />
    </AdminOSAccess>
  );
}

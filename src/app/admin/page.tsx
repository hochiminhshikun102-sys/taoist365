import { AdminOSAccess } from "@/components/admin/AdminOSAccess";
import { AdminOSConsole } from "@/components/admin/AdminOSConsole";

export default function AdminPage() {
  return (
    <AdminOSAccess>
      <AdminOSConsole />
    </AdminOSAccess>
  );
}

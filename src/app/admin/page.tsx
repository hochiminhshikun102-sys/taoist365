import { AdminConsole } from "@/components/admin/AdminConsole";
import { QuietAdminAccess } from "@/components/admin/QuietAdminAccess";

export default function AdminPage() {
  return (
    <QuietAdminAccess>
      <AdminConsole />
    </QuietAdminAccess>
  );
}

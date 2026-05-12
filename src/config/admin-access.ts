export const quietAdminAccess = {
  enabled: Boolean(process.env.NEXT_PUBLIC_QUIET_ADMIN_PHRASE),
  phrase: process.env.NEXT_PUBLIC_QUIET_ADMIN_PHRASE ?? "",
  storageKey: "reverent-inquiry-quiet-admin-access",
  storageValue: "nearby",
} as const;

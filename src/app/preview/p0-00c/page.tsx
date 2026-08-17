import type { Metadata } from "next";

import { AuthModal } from "@/components/auth/AuthModal";
import { PreviewAuthGate } from "@/components/auth/PreviewAuthGate";

export const metadata: Metadata = {
  title: "P0-00C Preview Auth",
  robots: { index: false, follow: false },
};

export default function P000CPreviewAuthPage() {
  return (
    <PreviewAuthGate>
      <AuthModal />
    </PreviewAuthGate>
  );
}

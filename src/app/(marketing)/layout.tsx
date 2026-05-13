"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CalmNavigation } from "@/components/navigation";
import { SiteColophon } from "@/components/site/SiteColophon";
import { PassiveReturnResidue } from "@/components/ritual/PassiveReturnResidue";
import { QuietAiConcierge } from "@/components/marketing/QuietAiConcierge";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isWindkeepRoom = pathname === "/windkeep" || pathname === "/quiet-receiving";

  return (
    <>
      {isHome || isWindkeepRoom ? null : <CalmNavigation />}
      <div className="lived-room-frame runtime-room-shell">{children}</div>
      <QuietAiConcierge />
      {isHome || isWindkeepRoom ? null : <PassiveReturnResidue />}
      {isHome || isWindkeepRoom ? null : <SiteColophon />}
    </>
  );
}

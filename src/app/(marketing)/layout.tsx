"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CalmNavigation } from "@/components/navigation";
import { SiteColophon } from "@/components/site/SiteColophon";
import { PassiveReturnResidue } from "@/components/ritual/PassiveReturnResidue";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      {isHome ? null : <CalmNavigation />}
      <div className="lived-room-frame runtime-room-shell">{children}</div>
      {isHome ? null : <PassiveReturnResidue />}
      {isHome ? null : <SiteColophon />}
    </>
  );
}

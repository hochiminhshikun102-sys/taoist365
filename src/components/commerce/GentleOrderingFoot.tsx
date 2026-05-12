import Link from "next/link";

/** Mail-only acquisition path - no cart language; links are plain continuity. */
export function GentleOrderingFoot({ className = "" }: { className?: string }) {
  return (
    <p className={`mt-4 text-[0.68rem] leading-7 text-text-muted/68 ${className}`}>
      No storefront opens here. If something named on{" "}
      <Link href="/objects" className="text-text-secondary underline-offset-4 hover:underline">
        Objects
      </Link>{" "}
      should sit nearer, write through{" "}
      <Link href="/inquiry" className="text-text-secondary underline-offset-4 hover:underline">
        Mail
      </Link>
      . A human can reply later.
    </p>
  );
}

import Link from "next/link";

/** Mail-only acquisition path—no cart language; links are plain continuity. */
export function GentleOrderingFoot({ className = "" }: { className?: string }) {
  return (
    <p className={`mt-4 text-[0.68rem] leading-7 text-text-muted/68 ${className}`}>
      No storefront opens here. When something named on{" "}
      <Link href="/objects" className="text-text-secondary underline-offset-4 hover:underline">
        Objects
      </Link>{" "}
      should sit nearer you, write through{" "}
      <Link href="/inquiry" className="text-text-secondary underline-offset-4 hover:underline">
        Mail
      </Link>
      —slow correspondence; humans answer when they are actually at the inbox, not as support theater. If you are not
      ready to name the thing yet,{" "}
      <Link href="/guidance" className="text-text-secondary underline-offset-4 hover:underline">
        Pause
      </Link>{" "}
      starts from a state, not a cart.
    </p>
  );
}

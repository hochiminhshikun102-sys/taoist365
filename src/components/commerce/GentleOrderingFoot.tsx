import Link from "next/link";

/** Low-pressure acquisition path. */
export function GentleOrderingFoot({ className = "" }: { className?: string }) {
  return (
    <p className={`mt-4 text-[0.68rem] leading-7 text-text-muted/68 ${className}`}>
      If something named on{" "}
      <Link href="/objects" className="text-text-secondary underline-offset-4 hover:underline">
        Objects
      </Link>{" "}
      should sit nearer, use{" "}
      <Link href="/cart" className="text-text-secondary underline-offset-4 hover:underline">
        Cart
      </Link>
      . A human still confirms payment and shipping.
    </p>
  );
}

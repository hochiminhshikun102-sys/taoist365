import Link from "next/link";
import { ownershipGravityEchoes } from "@/data/taoist365-objects-collection/slow-commerce-ownership";

type Props = {
  heading?: string;
  className?: string;
};

/** Slow repeat of the same coordinates — familiarity accumulates like a pinned URL, not a recommender. */
export function OwnershipEchoCorner({
  heading = "Coordinates that keep drifting back",
  className = "",
}: Props) {
  return (
    <aside
      className={`rounded-xl border border-border-subtle/26 bg-background/40 px-4 py-4 sm:px-5 sm:py-5 ${className}`}
    >
      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-text-muted/55">{heading}</p>
      <ul className="mt-3 space-y-2.5">
        {ownershipGravityEchoes.map((e) => (
          <li key={e.catalogId} className="text-[0.7rem] leading-6 text-text-muted/78">
            <span>{e.gravityLine}</span>{" "}
            <Link
              href={`/objects#${e.catalogId}`}
              className="text-text-secondary/90 underline-offset-[3px] hover:underline"
            >
              catalog anchor
            </Link>
            .
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.62rem] leading-5 text-text-muted/48">
        No cart—same phrases may appear elsewhere on the domain until they feel familiar, not urgent.
      </p>
    </aside>
  );
}

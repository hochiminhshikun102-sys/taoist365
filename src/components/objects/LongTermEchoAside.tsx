import Link from "next/link";
import { longTermGravityEchoes, longTermUsageShared } from "@/data/taoist365-objects-collection/long-term-usage-presence";

type Props = {
  className?: string;
};

/** Long-kept traces — repeated placement, stacked rings—no habit-product vocabulary. */
export function LongTermEchoAside({ className = "" }: Props) {
  return (
    <aside
      className={`rounded-xl border border-border-subtle/22 bg-background/34 px-4 py-4 sm:px-5 sm:py-5 ${className}`}
    >
      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-text-muted/50">{longTermUsageShared.layerEyebrow}</p>
      <p className="mt-2 text-[0.62rem] leading-5 text-text-muted/46">{longTermUsageShared.noDesignWorshipLine}</p>
      <ul className="mt-4 space-y-2.5">
        {longTermGravityEchoes.map((item) => (
          <li key={item.href} className="text-[0.7rem] leading-6 text-text-muted/76">
            {item.text}{" "}
            <Link href={item.href} className="text-text-secondary/88 underline-offset-[3px] hover:underline">
              {item.linkLabel}
            </Link>
            .
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.62rem] leading-5 text-text-muted/44">
        Not routines—just things left where they always are now.
      </p>
    </aside>
  );
}

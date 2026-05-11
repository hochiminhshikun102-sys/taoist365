import Link from "next/link";
import { humanArrivalLayer } from "@/data/human-arrival-layer/system";

type Props = {
  heading?: string;
  className?: string;
};

/** Slow cross-page gravity — parcels, doorside boxes, shelf lookup — not logistics dashboards. */
export function ArrivalEchoAside({
  heading = "Quiet arrival gravity",
  className = "",
}: Props) {
  return (
    <aside
      className={`rounded-xl border border-border-subtle/22 bg-background/36 px-4 py-4 sm:px-5 sm:py-5 ${className}`}
    >
      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-text-muted/52">{heading}</p>
      <ul className="mt-3 space-y-2.5">
        {humanArrivalLayer.crossPageEchoes.map((item) => (
          <li key={item.text} className="text-[0.7rem] leading-6 text-text-muted/76">
            {item.text}{" "}
            <Link
              href={item.href}
              className="text-text-secondary/88 underline-offset-[3px] hover:underline"
            >
              {item.linkLabel}
            </Link>
            .
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.62rem] leading-5 text-text-muted/46">
        No fulfillment vocabulary—just brown paper time and rooms re-closing around a thing.
      </p>
    </aside>
  );
}

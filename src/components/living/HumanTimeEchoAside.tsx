import Link from "next/link";
import { humanTimeLayer } from "@/data/human-time-layer/system";

type Props = {
  className?: string;
};

/** Cross-page time sediment — months, sun lines, not vintage theater. */
export function HumanTimeEchoAside({ className = "" }: Props) {
  return (
    <aside
      className={`rounded-xl border border-border-subtle/18 bg-background/28 px-4 py-4 sm:px-5 sm:py-5 ${className}`}
    >
      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-text-muted/44">{humanTimeLayer.pageEyebrow}</p>
      <p className="mt-2 text-[0.62rem] leading-5 text-text-muted/42">{humanTimeLayer.boundaries.noVintageFetish}</p>
      <ul className="mt-4 space-y-2.5">
        {humanTimeLayer.crossPageEchoes.map((item) => (
          <li key={item.href + item.text} className="text-[0.7rem] leading-6 text-text-muted/72">
            {item.text}{" "}
            <Link href={item.href} className="text-text-secondary/88 underline-offset-[3px] hover:underline">
              {item.linkLabel}
            </Link>
            .
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.62rem] leading-5 text-text-muted/40">{humanTimeLayer.boundaries.noStyledAging}</p>
    </aside>
  );
}

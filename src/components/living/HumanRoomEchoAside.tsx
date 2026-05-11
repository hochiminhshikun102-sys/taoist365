import Link from "next/link";
import { humanRoomLayer } from "@/data/human-room-layer/system";

type Props = {
  className?: string;
};

/** Faint human residue across pages — not personas, not wellness staging. */
export function HumanRoomEchoAside({ className = "" }: Props) {
  return (
    <aside
      className={`rounded-xl border border-border-subtle/20 bg-background/30 px-4 py-4 sm:px-5 sm:py-5 ${className}`}
    >
      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-text-muted/48">{humanRoomLayer.pageEyebrow}</p>
      <p className="mt-2 text-[0.62rem] leading-5 text-text-muted/44">{humanRoomLayer.boundaries.noLifestyleMagazine}</p>
      <ul className="mt-4 space-y-2.5">
        {humanRoomLayer.crossPageEchoes.map((item) => (
          <li key={item.href + item.text} className="text-[0.7rem] leading-6 text-text-muted/74">
            {item.text}{" "}
            <Link href={item.href} className="text-text-secondary/88 underline-offset-[3px] hover:underline">
              {item.linkLabel}
            </Link>
            .
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.62rem] leading-5 text-text-muted/42">
        {humanRoomLayer.boundaries.noCharacters}
      </p>
    </aside>
  );
}

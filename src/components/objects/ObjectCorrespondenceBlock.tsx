import Link from "next/link";
import { siteConfig } from "@/config/site";
import { mailImaginationForCatalogId } from "@/data/taoist365-objects-collection/mail-imagination";

function mailtoHref(subject: string) {
  return `mailto:${siteConfig.inquiryEmail}?subject=${encodeURIComponent(subject)}`;
}

type Props = {
  catalogId: string;
};

/** Imagining the letter — not checkout, not support category. */
export function ObjectCorrespondenceBlock({ catalogId }: Props) {
  const mi = mailImaginationForCatalogId(catalogId);
  const primarySubject = mi.exampleSubjects[0] ?? "Hello — Taoist365";

  return (
    <div className="taoist-quiet-field mt-6 rounded-xl border border-border-subtle bg-surface px-4 py-4 sm:px-5 sm:py-5">
      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-text-muted/55">If you wrote mail tonight</p>
      <p className="mt-2 text-xs leading-6 text-text-muted/72">
        Not an order form—just the shape of a note someone might send after picturing this in a room.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-text-muted/40">
        {mi.fragments.map((line) => (
          <li key={line} className="text-sm leading-7 text-text-secondary">
            {line}
          </li>
        ))}
      </ul>
      {mi.exampleSubjects.length > 1 ? (
        <p className="mt-4 text-[0.68rem] leading-6 text-text-muted/58">
          Other subject shapes:{" "}
          {mi.exampleSubjects.slice(1).map((s, i) => (
            <span key={s}>
              {i > 0 ? " · " : null}
              <Link href={mailtoHref(s)} className="text-text-secondary underline-offset-2 hover:underline">
                {s}
              </Link>
            </span>
          ))}
        </p>
      ) : null}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          href={mailtoHref(primarySubject)}
          className="taoist-quiet-action inline-block rounded-lg border border-border-subtle/26 px-4 py-2 text-xs text-text-muted transition hover:text-text-secondary"
        >
          Write a plain note about this
        </Link>
        <Link href="/inquiry" className="text-[0.68rem] text-text-muted/68 underline-offset-2 hover:text-text-secondary hover:underline">
          How mail works here
        </Link>
      </div>
      <p className="mt-3 text-[0.62rem] leading-5 text-text-muted/48">
        Subject lines above are only examples—yours can be messier. The thread stays correspondence, not a ticket.
      </p>
    </div>
  );
}

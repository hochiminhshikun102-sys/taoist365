import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ObjectTemporalAgingLine } from "@/components/objects/ObjectTemporalAgingLine";
import { ObjectRuntimeGate } from "@/components/objects/ObjectRuntimeGate";
import { ObjectSurvivedRhythmLine } from "@/components/objects/ObjectSurvivedRhythmLine";
import { ObjectCorrespondenceBlock } from "@/components/objects/ObjectCorrespondenceBlock";
import { ObjectPrivateMargin } from "@/components/objects/ObjectPrivateMargin";
import { BrowserHostnameFoot } from "@/components/density/BrowserHostnameFoot";
import { LivingQuietPhoto } from "@/components/living/LivingQuietPhoto";
import { ownershipPresenceForPiece } from "@/data/taoist365-objects-collection/ownership-presence";
import { taoist365ObjectsCatalog } from "@/data/taoist365-objects-collection/system";

export const metadata: Metadata = {
  title: "Objects",
  description: "Pieces on taoist365.com; mail if one should come nearer.",
  openGraph: {
    title: `Objects - ${siteConfig.siteName}`,
    description: "Objects on taoist365.com; humans reply by mail.",
    url: `${siteConfig.metadataBase}/objects`,
  },
};

export default function ObjectsPage() {
  return (
    <main className="min-h-full bg-background">
      <div className="room-section-y-standard relative mx-auto w-full max-w-3xl px-6 sm:px-10">
        <p className="text-xs text-text-muted/85">Objects</p>
        <h1 className="mt-3 max-w-2xl text-3xl leading-tight text-foreground sm:text-4xl">Objects</h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-text-secondary">{siteConfig.objectsObtainableIntroLine}</p>
        <p className="mt-4 max-w-2xl text-sm leading-8 text-text-secondary">
          <Link href="/inquiry" className="text-foreground underline-offset-4 hover:underline">
            Mail
          </Link>{" "}
          to ask about a piece when one should come nearer.
        </p>
        <p className="mt-3 max-w-2xl text-xs leading-7 text-text-muted/72">{siteConfig.permanenceLine}</p>

        <section
          id="driftbox"
          className="mt-10 scroll-mt-28 border-l border-border-subtle/70 pl-5"
          aria-label="Driftbox inside Windkeep"
        >
          <p className="text-xs uppercase tracking-[0.14em] text-text-muted/72">Driftbox</p>
          <p className="mt-3 max-w-2xl text-sm leading-8 text-text-secondary">
            A small place inside Windkeep for things that have moved on. If something should come nearer, mail can
            receive the note and the object can keep going through ordinary hands.
          </p>
        </section>

        <ul className="room-object-stack mt-10">
          {taoist365ObjectsCatalog.map((piece) => {
            const own = ownershipPresenceForPiece(piece);
            return (
              <ObjectRuntimeGate catalogId={piece.id} key={piece.id}>
                <li
                  id={piece.id}
                  className="taoist-ritual-shell object-resting-surface scroll-mt-28 rounded-2xl border border-border-subtle bg-surface p-6 sm:p-7"
                >
                  <p className="text-xs text-text-muted/80">{piece.catalogLine}</p>
                  <h2 className="mt-2 text-xl text-foreground">{piece.title}</h2>
                  <p className="mt-1 text-[0.65rem] leading-5 text-text-muted/52">{piece.editionNote}</p>
                  <ObjectTemporalAgingLine catalogPieceId={piece.id} />
                  <ObjectSurvivedRhythmLine catalogPieceId={piece.id} />
                  <p className="mt-5 text-sm leading-8 text-text-secondary">{piece.roomPlacement}</p>
                  <div className="mt-6">
                    <LivingQuietPhoto
                      photo={piece.photo}
                      aspect="card"
                      ownershipCaption={own.photoOwnershipNote}
                    />
                  </div>
                  <ObjectCorrespondenceBlock catalogId={piece.id} />
                  <ObjectPrivateMargin objectId={piece.id} />
                </li>
              </ObjectRuntimeGate>
            );
          })}
        </ul>

        <BrowserHostnameFoot />

        <p className="room-mt-standard text-xs leading-7 text-text-muted/75">
          <Link href="/guidance" className="text-text-secondary underline-offset-4 hover:underline">
            Pause
          </Link>
          {" / "}
          <Link href="/inquiry" className="text-text-secondary underline-offset-4 hover:underline">
            Mail
          </Link>
        </p>
      </div>
    </main>
  );
}

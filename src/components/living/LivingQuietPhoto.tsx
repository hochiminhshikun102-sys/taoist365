import Image from "next/image";
import type { LivingPhotoRef } from "@/data/living-visuals/system";

type Props = {
  photo: LivingPhotoRef;
  /** Short height for strips; tall for object cards */
  aspect?: "strip" | "card" | "banner";
  /** Marks, fold, wear — “already lived with,” not launch polish */
  ownershipCaption?: string;
  className?: string;
};

const aspectClass: Record<NonNullable<Props["aspect"]>, string> = {
  strip: "aspect-[4/3] sm:aspect-[5/4]",
  card: "aspect-[4/3]",
  banner: "aspect-[21/9] sm:aspect-[24/9]",
};

/** Warm documentary crop — quiet, not magazine polish. */
export function LivingQuietPhoto({ photo, aspect = "strip", ownershipCaption, className = "" }: Props) {
  return (
    <figure className={`overflow-hidden rounded-xl border border-border-subtle bg-surface shadow-[0_14px_44px_rgba(26,26,26,0.035)] ${className}`}>
      <div className={`relative w-full ${aspectClass[aspect]}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover opacity-[0.93]"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          unoptimized
        />
      </div>
      <figcaption className="space-y-2 px-3.5 py-3 sm:px-4 sm:py-3.5">
        <p className="text-xs leading-6 text-text-muted/78">{photo.caption}</p>
        {ownershipCaption ? (
          <p className="text-[0.68rem] leading-6 text-text-muted/62">{ownershipCaption}</p>
        ) : null}
        <p className="text-[0.58rem] leading-4 text-text-muted/42">
          Photo:{" "}
          <a href={photo.creditHref} className="underline-offset-2 hover:underline" rel="noreferrer" target="_blank">
            {photo.credit}
          </a>{" "}
          / Unsplash
        </p>
      </figcaption>
    </figure>
  );
}

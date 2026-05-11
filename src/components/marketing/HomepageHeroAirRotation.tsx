import Image from "next/image";
import type { ReactNode } from "react";
import { homepageHeroFrames } from "@/runtime/homepage-runtime-map";

type HomepageHeroAirRotationProps = {
  children?: ReactNode;
  className?: string;
};

export function HomepageHeroAirRotation({
  children,
  className,
}: HomepageHeroAirRotationProps) {
  return (
    <div
      className={
        className ??
        "relative min-h-[20rem] overflow-hidden rounded-[1.4rem_1.8rem_1.5rem_1.65rem] border border-border-subtle/70 bg-white/48 shadow-[0_18px_76px_rgba(26,26,26,0.026)] sm:min-h-[28rem] lg:-translate-x-5 lg:translate-y-2"
      }
    >
      {homepageHeroFrames.map((frame, index) => (
        <div
          key={frame.id}
          className={
            index === 0
              ? "homepage-hero-air-layer-a absolute inset-0"
              : "homepage-hero-air-layer-b absolute inset-0"
          }
        >
          <Image
            src={frame.src}
            alt={frame.alt}
            fill
            priority={index === 0}
            className={frame.imageClassName}
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </div>
      ))}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(240,242,245,0.46)_0%,rgba(255,255,255,0.12)_44%,rgba(240,242,245,0.18)_100%),linear-gradient(180deg,rgba(255,255,255,0.24),rgba(240,242,245,0.08))]" />
      {children ? <div className="absolute inset-0 z-[1]">{children}</div> : null}
    </div>
  );
}

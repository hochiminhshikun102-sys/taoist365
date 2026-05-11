"use client";

import type { VisualProfile } from "@/data/living-presence-runtime/system";

const veilStyle: Record<
  VisualProfile,
  { overlay: string; vignette?: string }
> = {
  default: {
    overlay: "linear-gradient(180deg, rgba(240,242,245,0.1) 0%, transparent 42%)",
  },
  "cooler-dusk": {
    overlay: "linear-gradient(175deg, rgba(226,232,240,0.07) 0%, transparent 46%)",
    vignette: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(200,210,222,0.05), transparent 55%)",
  },
  "warm-low": {
    overlay: "linear-gradient(185deg, rgba(235,224,206,0.09) 0%, transparent 48%)",
  },
  "rain-muted": {
    overlay: "linear-gradient(180deg, rgba(210,208,204,0.08) 0%, transparent 45%)",
    vignette: "radial-gradient(ellipse 90% 60% at 50% 100%, rgba(190,188,184,0.04), transparent 50%)",
  },
  "dim-hall": {
    overlay: "linear-gradient(180deg, rgba(120,108,92,0.045) 0%, transparent 38%)",
    vignette: "radial-gradient(ellipse 80% 45% at 50% 0%, rgba(90,82,72,0.05), transparent 52%)",
  },
};

type Props = {
  profile: VisualProfile;
  className?: string;
};

/** Pointer-events-none tint — no animation, no particles. */
export function LivingTemporalVeil({ profile, className = "" }: Props) {
  const v = veilStyle[profile];
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[0] ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0 opacity-[0.85]" style={{ background: v.overlay }} />
      {v.vignette ? (
        <div className="absolute inset-0 opacity-[0.75]" style={{ background: v.vignette }} />
      ) : null}
    </div>
  );
}

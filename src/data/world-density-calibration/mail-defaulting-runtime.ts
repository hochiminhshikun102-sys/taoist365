import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import { dailyIndex } from "@/lib/living-day-key";

export type MailDefaulting = {
  thinWelcomeLayer: boolean;
  thinProcessExplainer: boolean;
  mailDefaultingLine: string | null;
};

export function resolveMailDefaulting(
  age: WorldAgeStateId,
  dayKey: string,
  structural: StructuralSilenceBundle,
): MailDefaulting {
  const h = dailyIndex(`${dayKey}:mail-def:${age}`, 100);
  const tired = structural.explanationFatigue.mail === "minimal";
  const thinWelcomeLayer = tired && h > 36;
  const thinProcessExplainer = tired && h > 44;
  return {
    thinWelcomeLayer,
    thinProcessExplainer,
    mailDefaultingLine:
      thinWelcomeLayer || thinProcessExplainer
        ? "Mail reads like a long thread you never left—not onboarding, not a welcome desk."
        : null,
  };
}

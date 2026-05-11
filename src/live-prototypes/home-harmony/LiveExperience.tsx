"use client";

import { useState } from "react";
import { stepTimingTokens } from "@/design-system/tokens/step-timing";
import { RitualContinuityFooter } from "@/components/ritual/RitualContinuityFooter";
import { MyPathPresence } from "@/components/ritual/MyPathPresence";
import { RitualShelf } from "@/components/ritual/RitualShelf";
import { FlowCorner } from "@/components/ritual/FlowCorner";
import { SeasonalPresence } from "@/components/ritual/SeasonalPresence";
import { QuietHumanPresence } from "@/components/ritual/QuietHumanPresence";
import { OffFramePresence } from "@/components/ritual/OffFramePresence";
import { homeHarmonyContent } from "@/data/guidance-content/system";
import { ritualObjectLayer } from "@/data/ritual-object-layer/system";
import { RitualLivingSlice } from "@/components/living/RitualLivingSlice";
import { GentleOrderingFoot } from "@/components/commerce/GentleOrderingFoot";
import { gentleCommercePresence } from "@/data/gentle-commerce-presence/system";
import { pickInventory } from "@/data/ritual-inventory/system";

export function HomeHarmonyLiveExperience() {
  const [phase, setPhase] = useState<
    "arrival" | "awareness" | "grounding" | "pause" | "guidance" | "completion" | "return"
  >("arrival");

  const buttonLabel = "Next";

  const onAdvance = () => {
    if (phase === "arrival") return setPhase("awareness");
    if (phase === "awareness") return setPhase("grounding");
    if (phase === "grounding") return setPhase("pause");
    if (phase === "pause") return setPhase("guidance");
    if (phase === "guidance") return setPhase("completion");
    if (phase === "completion") return setPhase("return");
  };

  const onReset = () => setPhase("arrival");

  const awarenessLayers = homeHarmonyContent.awarenessLines;
  const homeShelfItems = pickInventory("ceramic-window-bowl", "linen-sheet-edge", "wood-light-line");

  return (
    <main className="room-section-y-standard relative mx-auto w-full max-w-4xl px-5 sm:px-10">
      <section className="taoist-ritual-shell living-surface-inset relative min-h-[min(72svh,52rem)] rounded-2xl border border-border-subtle/38 bg-surface p-7 shadow-none sm:p-9">
        <h1 className="max-w-2xl text-3xl leading-[1.32] text-foreground sm:text-4xl">Room notes</h1>
        <p className="mt-6 max-w-2xl text-base leading-9 text-text-secondary">Look around if you want—no checklist.</p>
        <RitualLivingSlice ritual="homeHarmony" />

        <div className="mt-11 rounded-xl border taoist-quiet-field border-border-subtle/24 bg-surface px-5 py-5 sm:px-5 sm:py-6">
          <p className="text-sm leading-8 text-text-secondary">
            {phase === "arrival"
              ? "Start."
              : phase === "awareness"
                ? "Notice light and corners."
                : phase === "grounding"
                  ? "Notice materials nearby."
                  : phase === "pause"
                    ? "Pause if useful."
                    : phase === "guidance"
                      ? "One optional tweak."
                      : phase === "completion"
                        ? "Enough for now."
                        : "Open again when useful."}
          </p>
        </div>

        <div className="mt-10 border-t border-border-subtle/30 pt-10">
          <p className="text-xs text-text-muted/82">Things nearby</p>
          <p className="mt-3 text-sm leading-8 text-text-secondary">{ritualObjectLayer.homeHarmony.anchorLine}</p>
          <RitualShelf items={homeShelfItems} />
          <p className="mt-4 text-sm leading-8 text-text-secondary">{gentleCommercePresence.homeHarmony.line}</p>
          <div className="mt-2 space-y-1">
            {gentleCommercePresence.homeHarmony.bringIntoLife.map((line, index) => (
              <p
                key={line}
                className={`text-xs leading-7 text-text-muted/90 ${index > 0 ? "hidden sm:block" : ""}`}
              >
                {line}
              </p>
            ))}
            <GentleOrderingFoot />
          </div>
        </div>
        <SeasonalPresence seasonalKey="homeHarmony" moment="late-afternoon" />

        {phase === "awareness" ||
        phase === "grounding" ||
        phase === "pause" ||
        phase === "guidance" ||
        phase === "completion" ||
        phase === "return" ? (
          <div className="mt-9 grid gap-3 md:grid-cols-3 md:gap-4">
            {awarenessLayers.map((line, index) => (
              <p
                key={line}
                className="rounded-lg border border-border-subtle/30 bg-surface px-3.5 py-3.5 text-sm leading-8 text-text-secondary"
                style={{
                  transitionDuration: `${
                    stepTimingTokens.revealCadenceMs.firstLayer +
                    index * stepTimingTokens.revealCadenceMs.preReveal
                  }ms`,
                }}
              >
                {line}
              </p>
            ))}
          </div>
        ) : null}

        {phase === "grounding" || phase === "pause" || phase === "guidance" || phase === "completion" || phase === "return" ? (
          <div className="mt-9 rounded-xl border border-border-subtle/36 bg-surface px-5 py-5">
            <p className="text-sm leading-8 text-text-secondary">
              {homeHarmonyContent.materialCalmnessLines[0]}
            </p>
          </div>
        ) : null}

        {phase === "pause" || phase === "guidance" || phase === "completion" || phase === "return" ? (
          <div
            className="mt-9 rounded-xl border border-border-subtle/36 bg-surface px-5 py-6"
            style={{ transitionDuration: `${stepTimingTokens.betweenStepPauseMs}ms` }}
          >
            <p className="text-sm leading-8 text-text-secondary">
              {homeHarmonyContent.pausePrompts[0]}
            </p>
          </div>
        ) : null}

        {phase === "pause" || phase === "guidance" || phase === "completion" || phase === "return" ? (
          <FlowCorner corner="homeHarmony" />
        ) : null}
        {phase === "return" ? <MyPathPresence ritual="homeHarmony" /> : null}
        {phase === "return" ? (
          <QuietHumanPresence presenceKey="homeHarmony" />
        ) : null}
        {phase === "return" ? (
          <div className="hidden sm:block">
            <OffFramePresence frameKey="homeHarmony" />
          </div>
        ) : null}

        {phase === "guidance" || phase === "completion" || phase === "return" ? (
          <div className="mt-9 rounded-xl border taoist-quiet-field border-border-subtle/26 bg-surface px-5 py-5">
            <p className="text-sm leading-8 text-text-secondary">
              {homeHarmonyContent.spatialGuidanceLines[0]}
            </p>
          </div>
        ) : null}

        {phase === "completion" || phase === "return" ? (
          <div className="mt-9 rounded-xl border taoist-quiet-field border-border-subtle/26 bg-surface px-5 py-5">
            <p className="text-sm leading-8 text-text-secondary">
              {homeHarmonyContent.completionLines[0]}
            </p>
          </div>
        ) : null}

        {phase === "return" ? (
          <RitualContinuityFooter current="home-harmony" onCloseForNow={onReset} />
        ) : (
          <button
            type="button"
            onClick={onAdvance}
            className="taoist-quiet-action mt-10 rounded-lg border border-border-subtle/26 px-5 py-2.5 text-sm text-text-secondary transition hover:text-foreground"
          >
            {buttonLabel}
          </button>
        )}
      </section>
    </main>
  );
}

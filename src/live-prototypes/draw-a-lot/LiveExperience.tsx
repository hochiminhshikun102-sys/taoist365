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
import { drawGuidanceContent } from "@/data/guidance-content/system";
import { ritualObjectLayer } from "@/data/ritual-object-layer/system";
import { RitualLivingSlice } from "@/components/living/RitualLivingSlice";
import { GentleOrderingFoot } from "@/components/commerce/GentleOrderingFoot";
import { gentleCommercePresence } from "@/data/gentle-commerce-presence/system";
import { pickInventory } from "@/data/ritual-inventory/system";

export function DrawALotLiveExperience() {
  const [phase, setPhase] = useState<
    | "arrival"
    | "threshold"
    | "shake"
    | "moon-block"
    | "guidance"
    | "pause"
    | "continuation"
  >("arrival");
  const [revealedLayer, setRevealedLayer] = useState(0);

  const onAdvance = () => {
    if (phase === "arrival") {
      setPhase("threshold");
      return;
    }

    if (phase === "threshold") {
      setPhase("shake");
      return;
    }

    if (phase === "shake") {
      setPhase("moon-block");
      return;
    }

    if (phase === "moon-block") {
      setPhase("guidance");
      setRevealedLayer(1);
      return;
    }

    if (phase === "guidance" && revealedLayer < drawGuidanceContent.guidanceLayers.length) {
      setRevealedLayer((prev) => prev + 1);
      return;
    }

    if (phase === "guidance" && revealedLayer >= drawGuidanceContent.guidanceLayers.length) {
      setPhase("pause");
      return;
    }

    if (phase === "pause") {
      setPhase("continuation");
    }
  };

  const buttonLabel =
    phase === "guidance" && revealedLayer < drawGuidanceContent.guidanceLayers.length
      ? "Next"
      : phase === "pause"
        ? "Next"
        : "Next";

  const isActionDisabled = phase === "continuation";

  const showGuidance = phase === "guidance" || phase === "pause" || phase === "continuation";
  const showPauseStrip = phase === "pause" || phase === "continuation";

  const guidanceDelay = stepTimingTokens.revealCadenceMs.firstLayer;
  const betweenStepDelayMs = stepTimingTokens.betweenStepPauseMs;

  const onReset = () => {
    setPhase("arrival");
    setRevealedLayer(0);
  };
  const drawShelfItems = pickInventory("folded-paper-note", "ceramic-window-bowl", "tea-cup-warmth");

  return (
    <main className="room-section-y-standard relative mx-auto w-full max-w-4xl px-5 sm:px-10">
      <section className="taoist-ritual-shell living-surface-inset relative min-h-[min(72svh,52rem)] rounded-2xl border border-border-subtle/38 bg-surface p-7 shadow-none sm:p-9">
        <h1 className="max-w-2xl text-3xl leading-[1.32] text-foreground sm:text-4xl">Draw a lot</h1>
        <p className="mt-6 max-w-2xl text-base leading-9 text-text-secondary">Plain steps below—no score kept.</p>
        <RitualLivingSlice ritual="drawALot" />

        <div className="mt-11 rounded-xl border taoist-quiet-field border-border-subtle/24 bg-surface px-5 py-5 sm:px-5 sm:py-6">
          <p className="text-sm leading-8 text-text-secondary">
            {phase === "arrival"
              ? "Start whenever."
              : phase === "threshold"
                ? "Next when ready."
                : phase === "shake"
                  ? drawGuidanceContent.shakeDescription
                  : phase === "moon-block"
                    ? drawGuidanceContent.moonBlockMessage
                    : phase === "guidance"
                      ? "One line at a time."
                      : phase === "pause"
                        ? drawGuidanceContent.pausePrompt
                        : drawGuidanceContent.continuationNote}
          </p>
        </div>

        <div className="mt-10 border-t border-border-subtle/30 pt-10">
          <p className="text-xs text-text-muted/82">Things nearby</p>
          <p className="mt-3 text-sm leading-8 text-text-secondary">{ritualObjectLayer.drawALot.anchorLine}</p>
          <RitualShelf items={drawShelfItems} />
          <p className="mt-4 text-sm leading-8 text-text-secondary">{gentleCommercePresence.drawALot.line}</p>
          <div className="mt-2 space-y-1">
            {gentleCommercePresence.drawALot.bringIntoLife.map((line, index) => (
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
        <SeasonalPresence seasonalKey="drawALot" moment="quiet-evening" />

        {showGuidance ? (
          <div className="mt-9 space-y-3">
            {drawGuidanceContent.guidanceLayers.slice(0, revealedLayer).map((layer, index) => (
              <p
                key={layer}
                className="rounded-lg border border-border-subtle/32 bg-surface px-4 py-3.5 text-sm leading-8 text-text-secondary"
                style={{
                  transitionDuration: `${guidanceDelay + index * stepTimingTokens.revealCadenceMs.preReveal}ms`,
                }}
              >
                {layer}
              </p>
            ))}
          </div>
        ) : null}

        {showPauseStrip ? (
          <div className="mt-9 rounded-xl border border-border-subtle/36 bg-surface px-5 py-6">
            <p className="text-sm leading-8 text-text-secondary">Okay to stop.</p>
          </div>
        ) : null}

        {showPauseStrip ? <FlowCorner corner="drawALot" /> : null}
        {phase === "continuation" ? <MyPathPresence ritual="drawALot" /> : null}
        {phase === "continuation" ? <QuietHumanPresence presenceKey="drawALot" /> : null}
        {phase === "continuation" ? (
          <div className="hidden sm:block">
            <OffFramePresence frameKey="drawALot" />
          </div>
        ) : null}

        {phase === "continuation" ? (
          <div
            className="mt-9 rounded-xl border taoist-quiet-field border-border-subtle/26 bg-surface p-5 sm:p-6"
            style={{ transitionDuration: `${betweenStepDelayMs}ms` }}
          >
            <p className="text-sm leading-8 text-text-secondary">Close anytime.</p>
            <RitualContinuityFooter current="draw-a-lot" onCloseForNow={onReset} />
          </div>
        ) : (
          <button
            type="button"
            onClick={onAdvance}
            disabled={isActionDisabled}
            className="taoist-quiet-action mt-10 rounded-lg border border-border-subtle/26 px-5 py-2.5 text-sm text-text-secondary transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            {buttonLabel}
          </button>
        )}
      </section>
    </main>
  );
}

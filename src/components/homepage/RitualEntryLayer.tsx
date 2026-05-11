"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { calmInteractionStates } from "@/design-system/interaction-states/system";

interface RitualRoute {
  path: string;
  title: string;
  purpose: string;
}

interface RitualEntryLayerProps {
  routes: RitualRoute[];
}

const entryToneByPath: Record<string, string> = {
  "/rituals/draw-a-lot": "Hands can move slower here if they want to.",
  "/rituals/daily-guidance": "Enough room for one small part of the day.",
  "/rituals/home-harmony": "Same air as home—nothing to get right first.",
};

export function RitualEntryLayer({ routes }: RitualEntryLayerProps) {
  const [isSettled, setIsSettled] = useState(false);
  const [activePath, setActivePath] = useState<string | null>(null);

  const activeRoute = useMemo(
    () => routes.find((route) => route.path === activePath),
    [activePath, routes],
  );

  return (
    <div className="taoist-ritual-shell rounded-2xl border border-border-subtle bg-surface p-7 sm:p-8">
      <p className="text-xs text-text-muted/85">Small stops</p>
      <p className="mt-4 max-w-2xl text-sm leading-8 text-text-muted">
        Pick one if you like. Skip everything if you do not.
      </p>

      {!isSettled ? (
        <div className="taoist-quiet-field mt-8 rounded-xl border border-border-subtle bg-surface p-5 sm:p-6">
          <p className="text-sm leading-8 text-text-secondary">
            Pause if you want, then tap when you are ready—no prep required.
          </p>
          <button
            type="button"
            onClick={() => setIsSettled(true)}
            className="taoist-quiet-action mt-5 rounded-lg border border-border-subtle/28 px-4 py-2 text-xs text-text-muted transition hover:text-text-secondary"
            style={{ transitionDuration: `${calmInteractionStates.hoverCalmness.durationMs}ms` }}
          >
            Show paths
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {routes.map((route) => {
            const isActive = activePath === route.path;
            return (
              <button
                key={route.path}
                type="button"
                onClick={() => setActivePath(route.path)}
                className={`taoist-quiet-field rounded-xl border px-5 py-5 text-left transition-colors sm:py-6 ${
                  isActive
                    ? "border-border-default bg-surface"
                    : "border-border-subtle bg-surface hover:border-border-default"
                }`}
                style={{
                  transitionDuration: `${calmInteractionStates.revealGentleness.fadeMs}ms`,
                }}
              >
                <h3 className="text-lg text-foreground">{route.title}</h3>
                <p className="mt-3 text-sm leading-8 text-text-secondary">{route.purpose}</p>
                <p className="mt-5 text-xs leading-6 text-text-muted">
                  {entryToneByPath[route.path] ?? "Open whenever—no right moment."}
                </p>
              </button>
            );
          })}
        </div>
      )}

      {isSettled && activeRoute ? (
        <div className="taoist-quiet-field mt-8 rounded-xl border border-border-subtle bg-surface p-5 sm:p-6">
          <p className="text-xs text-text-muted/85">When you are ready</p>
          <p className="mt-4 text-xs leading-6 text-text-muted">
            Leave and come back the way you would to any tab. No checklist waits.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={activeRoute.path}
              className="taoist-quiet-action rounded-lg border border-border-subtle/26 px-4 py-2 text-xs text-text-muted transition hover:text-text-secondary"
              style={{ transitionDuration: `${calmInteractionStates.focusSoftness.durationMs}ms` }}
            >
              Open
            </Link>
            <button
              type="button"
              onClick={() => setActivePath(null)}
              className="taoist-quiet-action rounded-lg border border-border-subtle/24 px-4 py-2 text-xs text-text-muted/90 transition hover:text-text-muted"
            >
              Not now
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

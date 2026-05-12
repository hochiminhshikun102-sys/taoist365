"use client";

import { useEffect, useState } from "react";

import type { SlowContentEntry } from "@/config/content-runtime";
import {
  aiMaintenanceReviewLines,
  aiOperationsBoundaries,
  aiReadableSiteProfile,
  objectSemanticEntries,
  quietDistributionReviewLines,
  readableReviewLines,
} from "@/config/ai-native-operations";
import {
  archiveQuietShelves,
  driftNoticeLines,
  pressureReviewMarkers,
  terminologyReviewGroups,
} from "@/config/quiet-admin";
import {
  quietCommerceBoundaries,
  quietCommerceHumanReview,
  quietCommerceObservationChecks,
  quietCommerceSupplyContinuity,
  windkeepContinuityRules,
} from "@/config/quiet-commerce";
import {
  quietPlacementBoundaries,
  quietPlacementReviewLines,
  quietPlacementSlots,
} from "@/config/quiet-placement";

type DraftMap = Record<string, string>;

const draftKey = "reverent-inquiry-quiet-admin-drafts";

function readDrafts(): DraftMap {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const stored = window.localStorage.getItem(draftKey);
    return stored ? (JSON.parse(stored) as DraftMap) : {};
  } catch {
    return {};
  }
}

function writeDrafts(drafts: DraftMap) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(draftKey, JSON.stringify(drafts));
}

export function QuietAdminWorkspace({ entries }: Readonly<{ entries: readonly SlowContentEntry[] }>) {
  const [drafts, setDrafts] = useState<DraftMap>(readDrafts);

  useEffect(() => {
    writeDrafts(drafts);
  }, [drafts]);

  function updateDraft(label: string, value: string) {
    setDrafts((current) => ({ ...current, [label]: value }));
  }

  return (
    <div className="space-y-4">
      <section id="drafts" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">Slow text review</p>
        <div className="mt-4 space-y-4">
          {entries.map((entry) => {
            const value = drafts[entry.label] ?? entry.present;

            return (
              <div key={entry.label} className="border-t border-border-subtle/70 pt-4 first:border-t-0 first:pt-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-foreground">{entry.label}</p>
                    <p className="mt-1 text-[0.68rem] leading-5 text-text-muted/80">{entry.note}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateDraft(entry.label, entry.present)}
                    className="shrink-0 text-[0.68rem] leading-5 text-text-muted hover:text-text-secondary"
                  >
                    Use present line
                  </button>
                </div>
                <textarea
                  value={value}
                  onChange={(event) => updateDraft(entry.label, event.target.value)}
                  rows={3}
                  className="mt-3 w-full resize-y border border-border-subtle bg-white/52 px-3 py-2 text-sm leading-6 text-text-secondary outline-none transition-colors focus:border-border-default"
                />
                <p className="mt-2 text-[0.68rem] leading-5 text-text-muted">Still nearby: {entry.nearby}</p>
                <p className="mt-1 text-[0.68rem] leading-5 text-text-muted/75">Left in this browser.</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="qa" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">Pressure notes</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {pressureReviewMarkers.map((marker) => (
            <p key={marker} className="border-l border-border-subtle/70 pl-3 text-xs leading-6 text-text-muted">
              {marker}
            </p>
          ))}
        </div>
      </section>

      <section id="terms" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">Term groups</p>
        <div className="mt-4 space-y-4">
          {terminologyReviewGroups.map((group) => (
            <div key={group.title} className="border-t border-border-subtle/70 pt-3 first:border-t-0 first:pt-0">
              <p className="text-xs text-foreground">{group.title}</p>
              <p className="mt-2 text-xs leading-6 text-text-muted">{group.risk}</p>
              <p className="mt-1 text-[0.68rem] leading-5 text-text-muted/80">Nearby: {group.nearby}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="archive" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">Archive shelf</p>
        <div className="mt-4 space-y-3">
          {archiveQuietShelves.map((line) => (
            <p key={line} className="text-xs leading-6 text-text-muted">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section id="review" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">Drift notes</p>
        <div className="mt-4 space-y-3">
          {driftNoticeLines.map((line) => (
            <p key={line} className="text-xs leading-6 text-text-muted">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section id="placement" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">Placement room</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {quietPlacementSlots.map((slot) => (
            <div key={slot.id} className="border-t border-border-subtle/70 pt-3 first:border-t-0 first:pt-0 sm:first:border-t sm:first:pt-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs text-foreground">{slot.label}</p>
                <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">{slot.cadence}</p>
              </div>
              <p className="mt-2 text-xs leading-6 text-text-muted">{slot.note}</p>
              <p className="mt-1 text-[0.68rem] leading-5 text-text-muted/80">
                {slot.where} / {slot.replaceBy}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-2 border-t border-border-subtle/70 pt-3 sm:grid-cols-2">
          {[...quietPlacementBoundaries, ...quietPlacementReviewLines].map((line) => (
            <p key={line} className="text-[0.66rem] leading-5 text-text-muted/80">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section id="ai-readable" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">AI-readable notes</p>
        <p className="mt-3 text-xs leading-6 text-text-secondary">{aiReadableSiteProfile.plainSummary}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {aiOperationsBoundaries.map((line) => (
            <p key={line} className="border-l border-border-subtle/70 pl-3 text-xs leading-6 text-text-muted">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section id="readable-review" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">Readable review</p>
        <div className="mt-4 space-y-3">
          {readableReviewLines.map((line) => (
            <p key={line} className="text-xs leading-6 text-text-muted">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section id="object-semantics" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">Object semantics</p>
        <div className="mt-4 space-y-4">
          {objectSemanticEntries.slice(0, 5).map((entry) => (
            <div key={entry.id} className="border-t border-border-subtle/70 pt-3 first:border-t-0 first:pt-0">
              <p className="text-xs text-foreground">{entry.name}</p>
              <p className="mt-1 text-[0.68rem] leading-5 text-text-muted">{entry.anchor}</p>
              <p className="mt-2 text-xs leading-6 text-text-secondary">{entry.plainKind}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="quiet-commerce" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">Quiet commerce</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            ["Boundaries", quietCommerceBoundaries],
            ["Human", quietCommerceHumanReview],
            ["Supply", quietCommerceSupplyContinuity],
            ["Observe", quietCommerceObservationChecks],
            ["Windkeep", windkeepContinuityRules],
          ].map(([title, lines]) => (
            <div key={title as string} className="border-t border-border-subtle/70 pt-3 first:border-t-0 first:pt-0">
              <p className="text-xs text-foreground">{title as string}</p>
              <div className="mt-3 space-y-2">
                {(lines as readonly string[]).map((line) => (
                  <p key={line} className="text-[0.68rem] leading-5 text-text-muted">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="readable-references" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">Readable references</p>
        <div className="mt-4 space-y-3">
          {[...aiMaintenanceReviewLines, ...quietDistributionReviewLines].map((line) => (
            <p key={line} className="text-xs leading-6 text-text-muted">
              {line}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}

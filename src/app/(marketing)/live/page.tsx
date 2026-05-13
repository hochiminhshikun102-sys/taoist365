import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quiet Live Room",
  description: "Ambient browser presence for wind, light, tea, night, and long-open calm.",
};

const liveModes = [
  ["Wind", "Pale window air and a slow open tab."],
  ["Tea", "A quiet table surface for reading or doing nothing."],
  ["Night", "Low light, slower contrast, and no live-selling rhythm."],
  ["Water", "Soft drops and room-distance sound placeholder."],
] as const;

export default function QuietLiveRoomPage() {
  return (
    <main className="min-h-full bg-background">
      <div className="room-section-y-standard mx-auto w-full max-w-6xl px-6 sm:px-10">
        <section className="relative overflow-hidden rounded-[1rem_1.16rem_1.08rem_1.12rem] border border-border-subtle bg-white/48 p-6 sm:p-9">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_12%,rgba(255,255,255,0.86),transparent_42%),radial-gradient(ellipse_at_84%_28%,rgba(198,216,229,0.28),transparent_48%),linear-gradient(180deg,rgba(245,250,253,0.92),rgba(236,244,249,0.72))]" />
          <div className="relative z-[1] grid min-h-[24rem] gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-text-muted">Ambient live room</p>
              <h1 className="mt-4 text-4xl leading-tight text-foreground sm:text-6xl">Quiet Live Room</h1>
              <p className="mt-5 max-w-xl text-sm leading-8 text-text-secondary">
                A browser presence layer for wind, night, tea, water, and gentle long-open companionship. It is a room,
                not a live commerce surface.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {liveModes.map(([title, body]) => (
                <div key={title} className="rounded-lg border border-border-subtle/70 bg-white/50 p-5">
                  <p className="text-lg text-foreground">{title}</p>
                  <p className="mt-3 text-xs leading-6 text-text-muted">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {[
            ["Runtime", "Visual climate shell, mode cards, sound placeholders, and long-open pacing are ready for deeper media later."],
            ["AI hook", "Future guidance can adjust tone, sound, or a single gentle line without opening a chat panel."],
            ["Continuity", "The room can later remember preferred mode locally and stay useful as a pinned browser tab."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-lg border border-border-subtle bg-white/48 p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted">{title}</p>
              <p className="mt-3 text-sm leading-7 text-text-secondary">{body}</p>
            </div>
          ))}
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/healing/meditation/cloud-meditation-altar" className="rounded-md border border-border-subtle bg-white/54 px-4 py-3 text-sm text-text-secondary hover:bg-white">
            Cloud altar
          </Link>
          <Link href="/healing/playground/courtyard-water-calm" className="rounded-md border border-border-subtle bg-white/54 px-4 py-3 text-sm text-text-secondary hover:bg-white">
            Water calm
          </Link>
          <Link href="/healing" className="rounded-md border border-border-subtle bg-white/44 px-4 py-3 text-sm text-text-secondary hover:bg-white">
            Healing halls
          </Link>
        </div>
      </div>
    </main>
  );
}

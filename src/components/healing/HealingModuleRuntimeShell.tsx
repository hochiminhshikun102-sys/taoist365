import Link from "next/link";
import type { HealingHall, HealingModule } from "@/config/healing-ecosystem";
import { HealingModuleActions } from "@/components/healing/HealingModuleActions";

const toneClass: Record<HealingModule["coverTone"], string> = {
  mist: "from-[#edf4f8] via-[#fbfdff] to-[#dbe8ef]",
  wood: "from-[#f1eee8] via-[#fbfbf8] to-[#e1ded6]",
  water: "from-[#e8f3f6] via-[#fbfdff] to-[#d9e9ef]",
  stone: "from-[#eeefec] via-[#fbfcfa] to-[#dddfd9]",
  paper: "from-[#f5f2ea] via-[#fffdf8] to-[#e9e3d8]",
  desert: "from-[#f3eee5] via-[#fdf9f1] to-[#e7d9c8]",
  garden: "from-[#edf4ea] via-[#fcfdf8] to-[#dce9dc]",
};

type HealingModuleRuntimeShellProps = {
  hall: HealingHall;
  module: HealingModule;
};

export function HealingModuleRuntimeShell({ hall, module }: HealingModuleRuntimeShellProps) {
  return (
    <main className="ri-runtime-coherence min-h-full bg-background">
      <div className="room-section-y-standard mx-auto w-full max-w-6xl px-6 sm:px-10">
        <nav className="flex flex-wrap gap-2 text-xs text-text-muted" aria-label="Quiet room path">
          <Link href="/healing" className="underline-offset-4 hover:text-foreground hover:underline">
            Quiet rooms
          </Link>
          <span>/</span>
          <Link href={hall.href} className="underline-offset-4 hover:text-foreground hover:underline">
            {hall.shortTitle}
          </Link>
        </nav>

        <section className="ri-breath-section mt-6 overflow-hidden rounded-[1rem_1.18rem_1.08rem_1.12rem] border border-[#c7d7df]/44 bg-white/48">
          <div className={`ri-air-motion-surface relative min-h-[22rem] bg-gradient-to-br ${toneClass[module.coverTone]} p-6 sm:p-9`}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_12%,rgba(255,255,255,0.78),transparent_42%),linear-gradient(115deg,rgba(255,255,255,0.16),transparent_58%)]" />
            <div className="relative z-[1] flex min-h-[18rem] flex-col justify-between">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.14em] text-text-muted">{module.climate}</p>
                <HealingModuleActions moduleId={module.id} title={module.title} />
              </div>
              <div className="max-w-3xl">
                <p className="text-sm text-text-muted">{hall.title}</p>
                <h1 className="mt-3 text-4xl leading-tight text-foreground sm:text-6xl">{module.title}</h1>
                <p className="ri-quiet-copy mt-5 max-w-2xl text-sm leading-8 text-text-secondary">{module.roomLine}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="ri-breath-section mt-8 grid gap-5 lg:grid-cols-[0.58fr_0.42fr]">
          <div className="rounded-lg border border-[#d7e5ea]/58 bg-white/52 p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Room atmosphere</p>
            <h2 className="mt-3 text-2xl text-foreground">A quiet browser corner that can stay open.</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Entrance", module.quietEntrance],
                ["Weather", module.weatherLine],
                ["Trace", module.traceLine],
                ["Nearby room", hall.climate],
              ].map(([title, body]) => (
                <div key={title} className="rounded-md border border-[#d7e5ea]/54 bg-white/48 p-4">
                  <p className="text-xs text-foreground">{title}</p>
                  <p className="mt-2 text-xs leading-6 text-text-muted">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-[#d7e5ea]/54 bg-white/42 p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Long-open softness</p>
            <p className="mt-4 text-sm leading-7 text-text-secondary">
              This room can be saved, shared, opened, and left alone. Any later atmosphere support should adapt language,
              image, sound, or object pairing without turning the page into a conversation.
            </p>
            <div className="mt-6 grid gap-3">
              <Link href="/healing" className="rounded-md border border-[#d7e5ea]/58 bg-white/56 px-4 py-3 text-sm text-text-secondary hover:bg-white">
                Back to quiet rooms
              </Link>
              <Link href="/live" className="rounded-md border border-[#d7e5ea]/58 bg-white/46 px-4 py-3 text-sm text-text-secondary hover:bg-white">
                Open another quiet room
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

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
    <main className="min-h-full bg-background">
      <div className="room-section-y-standard mx-auto w-full max-w-6xl px-6 sm:px-10">
        <nav className="flex flex-wrap gap-2 text-xs text-text-muted" aria-label="Healing path">
          <Link href="/healing" className="underline-offset-4 hover:text-foreground hover:underline">
            Healing
          </Link>
          <span>/</span>
          <Link href={hall.href} className="underline-offset-4 hover:text-foreground hover:underline">
            {hall.shortTitle}
          </Link>
        </nav>

        <section className="mt-6 overflow-hidden rounded-[1rem_1.18rem_1.08rem_1.12rem] border border-border-subtle bg-white/48">
          <div className={`relative min-h-[22rem] bg-gradient-to-br ${toneClass[module.coverTone]} p-6 sm:p-9`}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_12%,rgba(255,255,255,0.78),transparent_42%),linear-gradient(115deg,rgba(255,255,255,0.16),transparent_58%)]" />
            <div className="relative z-[1] flex min-h-[18rem] flex-col justify-between">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.14em] text-text-muted">{module.climate}</p>
                <HealingModuleActions moduleId={module.id} title={module.title} />
              </div>
              <div className="max-w-3xl">
                <p className="text-sm text-text-muted">{hall.title}</p>
                <h1 className="mt-3 text-4xl leading-tight text-foreground sm:text-6xl">{module.title}</h1>
                <p className="mt-5 max-w-2xl text-sm leading-8 text-text-secondary">{module.summary}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[0.58fr_0.42fr]">
          <div className="rounded-lg border border-border-subtle bg-white/52 p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Runtime shell</p>
            <h2 className="mt-3 text-2xl text-foreground">A light browser surface, ready for deeper logic later.</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Entry", module.entry],
                ["Current runtime", module.runtime],
                ["Future AI hook", module.aiHook],
                ["Pricing placeholder", module.pricing],
              ].map(([title, body]) => (
                <div key={title} className="rounded-md border border-border-subtle/70 bg-white/48 p-4">
                  <p className="text-xs text-foreground">{title}</p>
                  <p className="mt-2 text-xs leading-6 text-text-muted">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-border-subtle bg-white/42 p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Air service layer</p>
            <p className="mt-4 text-sm leading-7 text-text-secondary">
              The module stays quiet now: save, share, open, and return. Later AI support can adapt language, image, sound,
              or object pairing without turning the page into a chat tool.
            </p>
            <div className="mt-6 grid gap-3">
              <Link href="/healing" className="rounded-md border border-border-subtle bg-white/56 px-4 py-3 text-sm text-text-secondary hover:bg-white">
                Back to all modules
              </Link>
              <Link href="/live" className="rounded-md border border-border-subtle bg-white/46 px-4 py-3 text-sm text-text-secondary hover:bg-white">
                Open Quiet Live Room
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

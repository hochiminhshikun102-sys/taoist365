import Link from "next/link";
import type { HealingModule } from "@/config/healing-ecosystem";
import { HealingModuleActions } from "@/components/healing/HealingModuleActions";

const toneClass: Record<HealingModule["coverTone"], string> = {
  mist: "from-[#eef3f6] via-[#f8faf9] to-[#e4edf1]",
  wood: "from-[#f2eee6] via-[#fbfaf6] to-[#e7e0d4]",
  water: "from-[#e9f1f3] via-[#f7faf9] to-[#dde8ec]",
  stone: "from-[#eeeee9] via-[#fbfaf8] to-[#dedfd9]",
  paper: "from-[#f5f1e8] via-[#fffdf8] to-[#ece7dc]",
  desert: "from-[#f3ece0] via-[#fbf6ed] to-[#e6d8c6]",
  garden: "from-[#edf2e9] via-[#fbfcf8] to-[#dfe8db]",
};

type HealingModuleCardProps = {
  module: HealingModule;
};

export function HealingModuleCard({ module }: HealingModuleCardProps) {
  const moduleHref = `/healing/${module.hall}/${module.id}`;

  return (
    <article
      id={module.id}
      className="quiet-air-touch scroll-mt-28 overflow-hidden rounded-[0.82rem_1rem_0.9rem_0.94rem] border border-border-subtle bg-white/52 transition hover:bg-white/68"
    >
      <div className={`relative min-h-[11rem] bg-gradient-to-br ${toneClass[module.coverTone]}`}>
        <div className="absolute inset-x-8 top-8 h-px bg-white/70" />
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-[0.68rem] uppercase tracking-[0.14em] text-text-muted">{module.climate}</p>
          <h3 className="mt-3 text-2xl leading-tight text-foreground">{module.title}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm leading-7 text-text-secondary">{module.summary}</p>
        <div className="mt-5 grid gap-3 text-xs leading-6 text-text-muted sm:grid-cols-2">
          <p>
            <span className="block text-foreground">Runtime</span>
            {module.runtime}
          </p>
          <p>
            <span className="block text-foreground">Future AI hook</span>
            {module.aiHook}
          </p>
          <p>
            <span className="block text-foreground">Pricing</span>
            {module.pricing}
          </p>
          <p>
            <span className="block text-foreground">Entry</span>
            {module.entry}
          </p>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <Link href={moduleHref} className="text-sm text-foreground underline-offset-4 hover:underline">
            Open
          </Link>
          <HealingModuleActions moduleId={module.id} title={module.title} />
        </div>
      </div>
    </article>
  );
}

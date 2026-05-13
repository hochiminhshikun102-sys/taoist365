import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HealingModuleRuntimeShell } from "@/components/healing/HealingModuleRuntimeShell";
import { healingHallById, healingHalls, healingModuleById, healingModules } from "@/config/healing-ecosystem";

type HealingModulePageProps = {
  params: Promise<{ hallId: string; moduleId: string }>;
};

export function generateStaticParams() {
  return healingModules.map((module) => ({
    hallId: module.hall,
    moduleId: module.id,
  }));
}

export async function generateMetadata({ params }: HealingModulePageProps): Promise<Metadata> {
  const { moduleId } = await params;
  const healingModule = healingModuleById(moduleId);

  return {
    title: healingModule ? `${healingModule.title} - Healing` : "Healing Module",
    description: healingModule?.summary ?? "A Reverent Inquiry healing module.",
  };
}

export default async function HealingModulePage({ params }: HealingModulePageProps) {
  const { hallId, moduleId } = await params;
  const hall = healingHallById(hallId);
  const healingModule = healingModuleById(moduleId);

  if (!hall || !healingModule || healingModule.hall !== hall.id || !healingHalls.some((item) => item.id === hall.id)) {
    notFound();
  }

  return <HealingModuleRuntimeShell hall={hall} module={healingModule} />;
}

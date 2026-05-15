import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HealingModuleRuntimeShell } from "@/components/healing/HealingModuleRuntimeShell";
import { healingHallById, healingHalls, healingModuleById, healingModules } from "@/config/healing-ecosystem";
import { articleSchema, breadcrumbSchema, buildSeoGeoMetadata, SeoGeoJsonLd } from "@/lib/seo-geo-runtime";

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

  return buildSeoGeoMetadata({
    title: healingModule ? `${healingModule.title} - Healing - Reverent Inquiry` : "Healing Module - Reverent Inquiry",
    description: healingModule?.summary ?? "A Reverent Inquiry healing module.",
    path: healingModule ? `/healing/${healingModule.hall}/${healingModule.id}` : "/healing",
    kind: "healing",
    phrases: healingModule ? [healingModule.climate, healingModule.runtime, healingModule.aiHook] : undefined,
  });
}

export default async function HealingModulePage({ params }: HealingModulePageProps) {
  const { hallId, moduleId } = await params;
  const hall = healingHallById(hallId);
  const healingModule = healingModuleById(moduleId);

  if (!hall || !healingModule || healingModule.hall !== hall.id || !healingHalls.some((item) => item.id === hall.id)) {
    notFound();
  }

  return (
    <>
      <SeoGeoJsonLd
        graph={[
          articleSchema({
            title: `${healingModule.title} - Healing - Reverent Inquiry`,
            description: healingModule.summary,
            path: `/healing/${healingModule.hall}/${healingModule.id}`,
            kind: "healing",
            phrases: [healingModule.climate, healingModule.runtime, healingModule.aiHook],
            relatedLinks: [hall.href, "/healing", "/quiet-extracts"],
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Healing", path: "/healing" },
            { name: hall.shortTitle, path: hall.href },
            { name: healingModule.title, path: `/healing/${healingModule.hall}/${healingModule.id}` },
          ]),
        ]}
      />
      <HealingModuleRuntimeShell hall={hall} module={healingModule} />
    </>
  );
}

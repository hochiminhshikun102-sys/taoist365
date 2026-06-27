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
    title: healingModule ? `${healingModule.title} - Quiet Rooms - Dohara` : "Quiet Room - Dohara",
    description: healingModule?.roomLine ?? "A Dohara quiet browser room.",
    path: healingModule ? `/healing/${healingModule.hall}/${healingModule.id}` : "/healing",
    kind: "healing",
    phrases: healingModule ? [healingModule.weatherLine, healingModule.traceLine, healingModule.quietEntrance] : undefined,
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
            title: `${healingModule.title} - Quiet Rooms - Dohara`,
            description: healingModule.roomLine,
            path: `/healing/${healingModule.hall}/${healingModule.id}`,
            kind: "healing",
            phrases: [healingModule.weatherLine, healingModule.traceLine, healingModule.quietEntrance],
            relatedLinks: [hall.href, "/healing", "/quiet-extracts"],
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Quiet Rooms", path: "/healing" },
            { name: hall.shortTitle, path: hall.href },
            { name: healingModule.title, path: `/healing/${healingModule.hall}/${healingModule.id}` },
          ]),
        ]}
      />
      <HealingModuleRuntimeShell hall={hall} module={healingModule} />
    </>
  );
}

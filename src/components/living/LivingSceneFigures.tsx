import { homepageLivingStrip } from "@/data/living-visuals/system";
import { LivingQuietPhoto } from "@/components/living/LivingQuietPhoto";

/** Home “Living room” strip — real domestic photos, not SVG placeholders. */
export function LivingSceneFigures() {
  return (
    <div className="mt-10 space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {homepageLivingStrip.map((photo) => (
          <LivingQuietPhoto key={photo.src} photo={photo} aspect="strip" />
        ))}
      </div>
      <p className="text-[0.62rem] leading-5 text-text-muted/38">
        Ordinary American-adjacent apartments and kitchens—mess tolerated, mysticism avoided.
      </p>
    </div>
  );
}

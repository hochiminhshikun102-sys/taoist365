import type { RitualVisualKey } from "@/data/living-visuals/system";
import { ritualLivingPhotos } from "@/data/living-visuals/system";
import { LivingQuietPhoto } from "@/components/living/LivingQuietPhoto";

export function RitualLivingSlice({ ritual }: { ritual: RitualVisualKey }) {
  const photo = ritualLivingPhotos[ritual];
  return (
    <div className="mt-8">
      <p className="text-xs text-text-muted/78">Room slice</p>
      <div className="mt-3 max-w-3xl">
        <LivingQuietPhoto photo={photo} aspect="banner" />
      </div>
    </div>
  );
}

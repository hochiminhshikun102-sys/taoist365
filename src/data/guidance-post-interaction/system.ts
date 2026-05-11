import { guidanceMinimalPresenceLine } from "./guidance-minimal-presence";
import { guidanceNonGuidanceLine } from "./guidance-non-guidance";
import { guidanceNonSessionLine } from "./guidance-non-session";
import { guidanceNoResolutionRuntimeLine } from "./guidance-no-resolution-runtime";
import { guidancePassiveWeatherLine } from "./guidance-passive-weather";
import { guidanceQuietWithdrawalLine } from "./guidance-quiet-withdrawal";
import { guidanceRoomBackgroundLine } from "./guidance-room-background";
import { guidanceSoftDissolveLine } from "./guidance-soft-dissolve";
import { postInteractionGuidanceLine } from "./post-interaction-guidance";

export type GuidancePostInteractionBundle = {
  guidanceNonSessionLine: string;
  guidancePassiveWeatherLine: string;
  guidanceMinimalPresenceLine: string;
  guidanceRoomBackgroundLine: string;
  guidanceSoftDissolveLine: string;
  guidanceNonGuidanceLine: string;
  guidanceQuietWithdrawalLine: string;
  guidanceNoResolutionRuntimeLine: string;
  postInteractionGuidanceLine: string;
};

export function resolveGuidancePostInteractionBundle(): GuidancePostInteractionBundle {
  return {
    guidanceNonSessionLine: guidanceNonSessionLine(),
    guidancePassiveWeatherLine: guidancePassiveWeatherLine(),
    guidanceMinimalPresenceLine: guidanceMinimalPresenceLine(),
    guidanceRoomBackgroundLine: guidanceRoomBackgroundLine(),
    guidanceSoftDissolveLine: guidanceSoftDissolveLine(),
    guidanceNonGuidanceLine: guidanceNonGuidanceLine(),
    guidanceQuietWithdrawalLine: guidanceQuietWithdrawalLine(),
    guidanceNoResolutionRuntimeLine: guidanceNoResolutionRuntimeLine(),
    postInteractionGuidanceLine: postInteractionGuidanceLine(),
  };
}

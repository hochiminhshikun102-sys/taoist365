import { dailyIndex } from "@/lib/living-day-key";

export type WeatherPassageRuntime = {
  weatherState:
    | "daylightChange"
    | "cloudyAfternoon"
    | "rainPassing"
    | "eveningDimness"
    | "seasonalSoftness";
  weatherLine: string;
  homepageLine: string;
  suppressCinematicWeather: boolean;
};

export function resolveWeatherPassageRuntime(dayKey: string): WeatherPassageRuntime {
  const h = dailyIndex(`${dayKey}:weather-passage`, 100);
  const weatherState =
    h < 20
      ? "daylightChange"
      : h < 40
        ? "cloudyAfternoon"
        : h < 60
          ? "rainPassing"
          : h < 80
            ? "eveningDimness"
            : "seasonalSoftness";

  return {
    weatherState,
    weatherLine:
      weatherState === "daylightChange"
        ? "Daylight changes outside before the page needs to say anything."
        : weatherState === "cloudyAfternoon"
          ? "A cloudy afternoon can flatten the room gently."
          : weatherState === "rainPassing"
            ? "Rain may pass by the browser without becoming a scene."
            : weatherState === "eveningDimness"
              ? "Evening dimness is ordinary, not cinematic."
              : "Seasonal softness stays close to actual weather.",
    homepageLine: "Weather can pass through lightly, like it does around a real window.",
    suppressCinematicWeather: true,
  };
}

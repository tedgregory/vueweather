import { WeatherApiResponse } from "@/api/models/weather.model";
import { fetchWeatherData } from "@/api/openweather";
import { WeatherLocation } from "@/models/Locations";
import { ref, toValue, watchEffect } from "vue";

export async function useFetchWeather<T extends WeatherLocation>(coords: T) {
  const isLoading = ref<boolean>(false);
  const data = ref<WeatherApiResponse>();
  watchEffect(async () => {
    if (coords) {
      isLoading.value = true;
      try {
        data.value = await fetchWeatherData<WeatherApiResponse>(toValue(coords));
      } catch (e) {
        console.log("Fetch weather error", e);
      } finally {
        isLoading.value = false;
      }
    }
  });
  return { data, isLoading };
}

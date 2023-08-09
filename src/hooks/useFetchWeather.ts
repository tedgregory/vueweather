import { WeatherLocation } from "@/api/models";
import { fetchWeatherData } from "@/api/openweather";
import { WeatherApiResponse } from "@/models/WeatherApi";
import { ref } from "vue";

export async function useFetchWeather<T extends WeatherLocation>(coords: T) {
  const isLoading = ref<boolean>(false);
  const data = ref<WeatherApiResponse>();
  if (coords) {
    isLoading.value = true;
    data.value = undefined;
    try {
      data.value = await fetchWeatherData<WeatherApiResponse>(coords);
    } catch (e) {
      console.log("FetchLocations error", e);
    } finally {
      isLoading.value = false;
    }
  }
  return { data, isLoading };
}

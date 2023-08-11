import { LocationsApiResponse } from "@/api/models/locations.model";
import { fetchLocationsData } from "@/api/openweather";
import { LocationsDto, WeatherLocation } from "@/models/Locations";
import { UnwrapRef, ref, watch } from "vue";

export async function useFetchLocations(query = ref<string | null>(null)) {
  const isLoading = ref<boolean>(false);
  const data = ref<WeatherLocation[]>([]);
  const watchHandler = async (q: UnwrapRef<typeof query>) => {
    if (q && q.length > 2) {
      isLoading.value = true;
      data.value = [];
      try {
        const results = await fetchLocationsData<LocationsApiResponse>(q);
        if (results) {
          data.value = results.map((res) => res && new LocationsDto(res)).filter((res) => res);
        }
      } catch (e) {
        console.log("FetchLocations error", e);
      } finally {
        isLoading.value = false;
      }
    }
  };
  watch(query, async (q) => await watchHandler(q));
  return { data, isLoading };
}

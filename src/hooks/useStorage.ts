import { LocalStorageManager } from "@/api/storage";
import { WeatherLocation } from "@/models/Locations";
import { reactive, watch } from "vue";

interface LocationsState<T extends WeatherLocation> {
  data: {
    locations: T[];
  };
  add(v: T): void;
  remove(v: T): void;
  clear(): void;
}

const lm = new LocalStorageManager<WeatherLocation>();
const storage: LocationsState<WeatherLocation> = reactive({
  data: reactive({
    locations: [] as WeatherLocation[],
  }),
  add(item) {
    const newData = item instanceof Array ? item : [item];
    this.data.locations = this.data?.locations?.length
      ? [...this.data.locations, ...newData]
      : newData;
  },
  remove(item) {
    if (this.data.locations.length) {
      this.data.locations = this.data.locations.filter(
        (dataItem) => dataItem.name.toLocaleLowerCase() !== item.name.toLocaleLowerCase()
      );
    }
  },
  clear() {
    this.data.locations = [];
  },
});

storage.data.locations = lm.readData() || [];

export default function useStorage() {
  watch(storage.data, () => {
    console.log("state update");
    lm.saveData(storage.data.locations);
  });
  return { data: storage.data, storage };
}

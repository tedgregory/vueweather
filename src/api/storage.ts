import { WeatherLocation } from "@/models/Locations";
import { WeatherDataStorage } from "@/models/Weather";

export class LocalStorageManager<T extends WeatherLocation> implements WeatherDataStorage<T> {
  private key = "weatherWidget";

  readData() {
    const localData = localStorage.getItem(this.key);
    if (!localData) {
      return null;
    }
    return JSON.parse(localData) as T[];
  }
  saveData(data: T[]) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
  clearData(): void {
    localStorage.clear();
  }
}

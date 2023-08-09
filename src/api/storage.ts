import { WeatherLocation, WeatherDataStorage } from "./models";

export class LocalStorageManager<T extends WeatherLocation> implements WeatherDataStorage<T> {
  private key = "weatherWidget";

  readData() {
    return JSON.parse(localStorage.getItem(this.key) || "[]") || [];
  }
  saveData(data: T[]) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
  clearData(): void {
    localStorage.clear();
  }
}

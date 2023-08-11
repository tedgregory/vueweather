export type WeatherLocation = {
  id: number;
  name: string;
  countryCode: string;
  lat: number;
  lon: number;
};

export interface WeatherDataStorage<T extends WeatherLocation> {
  clearData(): void;
  saveData(data: T[]): void;
  readData(): T[] | null;
}

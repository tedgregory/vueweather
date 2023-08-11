import { LocationsApiResponse } from "@/api/models/locations.model";

export type WeatherLocation = {
  id: number;
  name: string;
  countryCode: string;
  lat: number;
  lon: number;
};

export class LocationsDto implements WeatherLocation {
  id: number;
  name: string;
  lat: number;
  lon: number;
  countryCode: string;
  constructor(rawData: LocationsApiResponse) {
    (this.id = Date.now()),
      (this.name = rawData.name),
      (this.lat = rawData.lat),
      (this.lon = rawData.lon),
      (this.countryCode = rawData.country);
  }
}

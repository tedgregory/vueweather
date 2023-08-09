import { WeatherLocation } from "./models";

export async function fetchWeatherData<T>(location: WeatherLocation) {
  const API_KEY = process.env.VUE_APP_OW_API_KEY;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric&exclude=minutely,alerts`
    );
    const data = await response.json();
    return data as T;
  } catch {
    console.log("REQUEST FAILED");
  }
}

export async function fetchLocationsData<T>(query: string) {
  const API_KEY = process.env.VUE_APP_OW_API_KEY;
  const LOCATIONS_LIMIT = 10;
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(
        query
      )}&limit=${LOCATIONS_LIMIT}&appid=${API_KEY}`
    );
    const data = await response.json();
    return data as T[];
  } catch {
    console.log("REQUEST FAILED");
  }
}

export type LocationsApiResponse = {
  name: string;
  local_names: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state: string;
};

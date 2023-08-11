import { WeatherLocation } from "@/models/Locations";

export async function fetchWeatherData<T>(location: WeatherLocation) {
  const API_KEY = process.env.VUE_APP_OW_API_KEY;
  let data: T | undefined = undefined;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric&exclude=minutely,alerts`
    );
    data = await response.json();
  } catch {
    console.log("REQUEST FAILED");
  }
  return data;
}

export async function fetchLocationsData<T>(query: string) {
  const API_KEY = process.env.VUE_APP_OW_API_KEY;
  const LOCATIONS_LIMIT = 5;
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(
        query
      )}&limit=${LOCATIONS_LIMIT}&appid=${API_KEY}`
    );
    const data: T[] = await response.json();
    return [...new Set(data)];
  } catch {
    console.log("REQUEST FAILED");
  }
}

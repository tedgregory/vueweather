<script async setup lang="ts">
import { ref, computed } from "vue";
import { ApiResponse } from "@/models/Api";
import WeatherIcon from "@/ui/WeatherIcon.vue";
import * as helpers from "@/utils/weather.helpers";

const weatherData = ref<ApiResponse | undefined>(undefined);
const dewPoint = computed(() =>
  helpers.calculateDewPoint(weatherData.value?.main.temp, weatherData.value?.main.humidity)
);
const fetchData = async () => {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?units=metric&q=London&appid=cd705c255d993f07cc09088191eba97e&units=metric&exclude=minutely,alerts,current"
    );
    const data: ApiResponse = await response.json();
    weatherData.value = data;
  } catch {
    console.log("REQUEST FAILED");
  }
};
fetchData();
</script>

<template>
  <section class="weather">
    <div class="weather__container" v-if="weatherData">
      <div class="weather__header">{{ weatherData.name }}, {{ weatherData.sys.country }}</div>
      <article class="splash">
        <div class="splash__image">
          <WeatherIcon
            :iconCode="weatherData.weather[0].icon"
            :altText="weatherData?.weather[0].main"
          />
        </div>
        <div class="splash__data">{{ Math.round(weatherData.main.temp) }}&deg;C</div>
      </article>
      <article>
        <span>Feels like {{ Math.round(weatherData.main.feels_like) }}&deg;C. </span>
        <span>{{ weatherData?.weather[0].description }}. </span>
        <span>Light breeze. </span>
      </article>
      <article class="details">
        <div class="details__main">
          {{ weatherData.wind.speed }}m/s | {{ weatherData.wind.deg }} |
          {{ weatherData.main.pressure }}hPa
        </div>
        <div>Humidity: {{ weatherData.main.humidity }}%</div>
        <div>Dew point: {{ dewPoint }}&deg;C.</div>
        <div>Visibility: {{ Math.floor(weatherData.visibility / 1000).toFixed(0) }}km</div>
      </article>
    </div>
    <div class="weather__container" v-else>ERROR: no data</div>
  </section>
</template>

<style lang="scss">
@import "../styles/styles.scss";
</style>

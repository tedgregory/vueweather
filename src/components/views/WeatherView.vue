<template>
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
  <div class="weather__container" v-else>Loading...</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import * as helpers from "@/utils/weather.helpers";
import WeatherIcon from "@/components/ui/WeatherIcon.vue";
import { WeatherLocation } from "@/models/Weather";
import { useFetchWeather } from "../../hooks/useFetchWeather";

const props = defineProps<{ location: WeatherLocation }>();
const { data } = await useFetchWeather(props.location);

const weatherData = computed(() => data.value);

const dewPoint = computed(() =>
  helpers.calculateDewPoint(weatherData.value?.main.temp, weatherData.value?.main.humidity)
);
</script>

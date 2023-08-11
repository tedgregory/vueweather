import { defineCustomElement } from "vue";
import WeatherWidget from "./components/WeatherWidget.ce.vue";

const weatherWidget = defineCustomElement(WeatherWidget);

customElements.define("weather-widget", weatherWidget);

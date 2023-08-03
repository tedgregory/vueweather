// import { createApp, defineCustomElement } from "vue";
// import App from "./App.vue";
import { defineCustomElement } from "vue";
import WeatherWidget from "./components/WeatherWidget.ce.vue";

const weatherWidget = defineCustomElement(WeatherWidget);

customElements.define("weather-widget", weatherWidget);

// createApp(App).mount("#app");

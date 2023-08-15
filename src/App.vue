<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Suspense><WeatherWidget /></Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherWidget from "./components/WeatherWidget.ce.vue";
import "./styles/styles.scss";

export default defineComponent({
  name: "App",
  components: {
    WeatherWidget,
  },
});
</script>

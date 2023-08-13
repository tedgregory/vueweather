<script async setup lang="ts">
import { computed, ref } from "vue";
import SelectLocation from "./views/SelectLocation.vue";

import SettingsIcon from "@/components/ui/SettingsIcon.vue";
import WeatherView from "./views/WeatherView.vue";
import useStorage from "@/hooks/useStorage";

const isSettings = ref<boolean>(false);
const toggleSettings = () => {
  isSettings.value = !isSettings.value;
};
const { data } = useStorage();

const savedLocations = computed(() => data.locations);
</script>

<template>
  <div class="weather">
    <div class="weather__wrapper">
      <SettingsIcon :isOpen="isSettings" @click="toggleSettings" />
      <SelectLocation v-if="isSettings" />
      <template v-else>
        <Suspense v-for="loc of savedLocations" :key="loc.id + loc.lat">
          <WeatherView :location="loc" />
        </Suspense>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
@import "../styles/styles.scss";
</style>

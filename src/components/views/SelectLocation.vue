<template>
  <div class="weather__container">
    <h3>Settings</h3>
    <ul v-if="locations">
      <li v-for="location of locations" :key="location.lat">
        {{ location.name }} ({{ location.countryCode }})
      </li>
    </ul>
    <div v-else>No areas selected</div>
    <Suspense>
      <AddLocation @add-location="addLocationToList" />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { WeatherLocation } from "@/models/Locations";
import AddLocation from "../AddLocation.vue";
import useStorage from "@/hooks/useStorage";
import { computed } from "vue";

const { data, storage } = useStorage();

const locations = computed(() => data.locations);

function addLocationToList(location: WeatherLocation) {
  storage.add(location);
}
</script>

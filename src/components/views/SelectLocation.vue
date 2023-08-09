<template>
  <div class="weather__container">
    <h3>Settings</h3>
    <ul v-if="locations">
      <li v-for="location of locations" :key="location.id">
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
import AddLocation from "../AddLocation.vue";
import { WeatherLocation } from "@/api/models";
import useStorage from "@/hooks/useStorage";

const { data: locations, actions: lsm } = useStorage();
function addLocationToList(location: WeatherLocation) {
  lsm.add(location);
}
</script>

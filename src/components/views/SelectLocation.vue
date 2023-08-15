<template>
  <div class="weather__container locations">
    <h3>Settings</h3>
    <div class="locations__list" v-if="locations">
      <div class="locations__location" v-for="location of locations" :key="location.lat">
        {{ location.name }} ({{ location.countryCode }})
      </div>
    </div>
    <div v-else>No location selected</div>
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

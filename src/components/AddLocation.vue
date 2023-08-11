<template>
  <form class="search-form">
    <div class="search-form__input">
      <input
        type="text"
        placeholder="Start typing location..."
        v-model="query"
        @focus="handleInput"
      />
      <button @click.prevent="addLocation" v-if="!IsSuggestOpen">+</button>
    </div>
    <div class="search-form__suggest suggest" v-if="IsSuggestOpen">
      <div v-if="isLoading" class="suggest__preloader">loading ...</div>
      <div v-else-if="data" class="suggest__list">
        <div v-for="loc of data" :key="loc.id + loc.lat" @click="selectLocation(loc)">
          <em>{{ loc.name }}</em> ( {{ loc.countryCode }} )
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { WeatherLocation } from "@/models/Locations";
import { useFetchLocations } from "../hooks/useFetchLocations";
import { ref } from "vue";
const emit = defineEmits<{ "add-location": [locationData: WeatherLocation] }>();

function addLocation() {
  if (selectedLocationOption.value) {
    emit("add-location", selectedLocationOption.value);
    query.value = selectedLocationOption.value.name;
    selectedLocationOption.value = null;
  }
}

function selectLocation(location: WeatherLocation) {
  selectedLocationOption.value = location;
  IsSuggestOpen.value = false;
}

function handleInput() {
  selectedLocationOption.value = null;
  IsSuggestOpen.value = true;
}

const query = ref<string | null>("");
const IsSuggestOpen = ref<boolean>(false);
const selectedLocationOption = ref<WeatherLocation | null>(null);
const { data, isLoading } = await useFetchLocations(query); // query changes automatically update hook return
</script>

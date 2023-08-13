<template>
  <form class="search-form" ref="suggestForm">
    <div class="search-form__input">
      <input
        type="text"
        placeholder="Start typing location..."
        v-model="query"
        @focus="handleInput"
      />
      <button @click.prevent="addLocation" v-if="!isSuggestOpen">+</button>
    </div>
    <div class="search-form__suggest suggest" v-if="isSuggestOpen && data.length">
      <div v-if="isLoading" class="suggest__preloader">loading ...</div>
      <div v-else-if="data" class="suggest__list" ref="suggestList">
        <div
          class="suggest__item"
          v-for="loc of data"
          :key="loc.id + loc.lat"
          @click="selectLocation(loc)"
          @keydown.prevent="selectLocation(loc)"
        >
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

const suggestForm = ref<HTMLDivElement>();
const suggestList = ref<HTMLDivElement | null>(null);
const activeLineIndex = ref(0);

document.addEventListener("keypress", (event) => {
  if (event.key in ["ArrowDown", "ArrowUp"] && suggestList.value) {
    console.log(event.key);

    const loadedOptionsArray = Array.from(suggestList.value?.querySelectorAll(".suggest__item"));
    const activeLine =
      loadedOptionsArray.find((option) => option.classList.contains("active")) || null;
    activeLine?.classList.remove("active");
    const prevLineIndex = activeLine ? loadedOptionsArray.indexOf(activeLine) : 0;
    const newLineIndex =
      event.key === "ArrowUp"
        ? prevLineIndex > 0
          ? prevLineIndex - 1
          : 0
        : prevLineIndex < loadedOptionsArray.length
        ? prevLineIndex + 1
        : loadedOptionsArray.length;
    activeLineIndex.value = newLineIndex;
  }
  if (event.key === "Enter" && suggestList.value && isSuggestOpen) {
    selectLocation(data.value[activeLineIndex.value]);
  }
});

function addLocation() {
  if (selectedLocationOption.value) {
    emit("add-location", selectedLocationOption.value);
    query.value = selectedLocationOption.value.name;
    query.value = "";
    selectedLocationOption.value = null;
  }
}

function selectLocation(location: WeatherLocation) {
  selectedLocationOption.value = location;
  query.value = getLocationDisplayValue(location);
  isSuggestOpen.value = false;
}

function getLocationDisplayValue(location: WeatherLocation) {
  return `${location.name} (${location.countryCode})`;
}

function handleInput() {
  selectedLocationOption.value = null;
  isSuggestOpen.value = true;
}

const query = ref<string | null>("");
const isSuggestOpen = ref<boolean>(false);
const selectedLocationOption = ref<WeatherLocation | null>(null);
const { data, isLoading } = await useFetchLocations(query); // query changes automatically update hook return
</script>

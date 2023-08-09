<template>
  <img :src="iconUrl" :alt="props.altText" />
</template>

<script setup lang="ts">
type PropsType = {
  iconCode: string;
  altText: string;
};
const props = defineProps<PropsType>();
const iconUrl = "https://openweathermap.org/img/wn/" + props.iconCode + "@2x.png";
</script>

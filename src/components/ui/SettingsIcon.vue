<template>
  <div class="weather__tools">
    <img src="../../assets/close.svg" v-if="props.isOpen" />
    <img src="../../assets/gear.svg" v-else />
  </div>
</template>

<script setup lang="ts">
type PropsType = {
  isOpen: boolean;
};
const props = defineProps<PropsType>();
</script>

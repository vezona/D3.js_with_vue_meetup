<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "/src/store/mainStore.js";

const $mainStore = useMainStore();
const isMobileScreen = computed(() => $mainStore.isMobileScreen);
</script>

<template>
  <b-header />

  <div
    class="mx-auto block"
    :class="{
      'max-w-full p-4': isMobileScreen,
      'max-w-980px px-4': !isMobileScreen,
    }"
  >
    <router-view />
  </div>
</template>

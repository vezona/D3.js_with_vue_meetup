<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "/src/store/mainStore.js";

const $mainStore = useMainStore();
const isMobileScreen = computed(() => $mainStore.isMobileScreen);
</script>

<template>
  <!-- <b-header /> -->

  <div
    class="mx-auto block"
    :class="{
      'max-w-full p-4': isMobileScreen,
      'max-w-1280px px-4': !isMobileScreen,
    }"
  >
    <router-view />
  </div>

  <!-- <ModalsContainer /> -->
</template>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>

<script setup>
import { ref } from "vue";

const data = ref([99, 71, 78, 25, 36, 92]);
const changeData = () => {
  let arr = [];
  for (let i = 0; i < 6; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  data.value = arr;
};
</script>

<template>
  <button
    class="border rounded-lg bg-gray-200 border-gray-500 my-3 py-2 px-4"
    @click="changeData"
  >
    change data
  </button>
  <basic-line-chart-computed title="使用vue進行資料綁定" :data="data" />

  <!-- <basic-line-chart />
  <animation /> -->
</template>

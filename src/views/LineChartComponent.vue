<script setup>
import { ref } from "vue";
import * as d3 from "d3";

const data1 = ref([99, 71, 78, 25, 36, 92, 105, 34, 69, 72, 55]);
const data2 = ref([59, 25, 92, 30, 46, 84, 88, 104, 39, 52, 75]);
const data3 = ref([39, 19, 68, 50, 20, 62, 89, 93, 77, 49, 51]);
</script>

<template>
  <line-chart
    title="折線圖：自訂色彩"
    :data="data1"
    :strokeWidth="8"
    :colorPicker="true"
  />
  <line-chart title="折線圖：動畫" :data="data2" :transition="true" />

  <line-chart title="折線圖：Tooltip" :data="data3" :tooltip="true" />
</template>

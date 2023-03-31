<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted } from "vue";
import * as d3 from "d3";

// Ref
// https://data.gov.tw/dataset/7442

const data = ref(null);
const svg = ref(null);

const drawMap = async () => {
  data.value = await d3.json("/data/GEO_Taiwan_Map.json");
  console.log(data.value);
  const container = d3.select(svg.value);

  // 設定投影模式與比例尺
  const projection = d3.geoMercator().center([123, 24]).scale(5500);
  // 設定地圖輪廓
  const path = d3.geoPath(projection);

  console.log(path);

  // 綁定畫面
  // container
  //   .selectAll("path")
  //   .data(data.value.features)
  //   .enter()
  //   .append("path")
  //   .attr("d", path)
  // .style("stroke", "grey");
};

onMounted(() => {
  watchEffect(() => drawMap());
});
</script>

<template>
  <div>
    <svg ref="svg" width="700" height="700"></svg>
  </div>
</template>

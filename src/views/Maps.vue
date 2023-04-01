<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted } from "vue";
import * as d3 from "d3";

// Ref
// https://data.gov.tw/dataset/7442

const data = ref(null);
const svg = ref(null);
const city = ref('請選擇指定縣市')

const drawMap = async () => {
  data.value = await d3.json("/data/TW_COUNTY.json");
  const container = d3.select(svg.value);

  // 設定投影模式與比例尺
  // center 設定為台灣的經緯度位置
  // scale 設定地圖大小(縮放程度)
  const projection = d3.geoMercator().center([122, 23.8]).scale(7000);
  // 設定地圖輪廓
  const path = d3.geoPath(projection);

  // 設定滑鼠互動
  const mouseover = (d)=>{
    city.value = d.target.__data__.properties.COUNTYNAME;
    const area = d3.select(d.target);
    area
    .style("cursor", "pointer")
    .style('fill', '#f68b47')
  }

  const mouseleave = (d)=>{
    city.value = '請選擇指定縣市';
    const area = d3.select(d.target);
    area
    .style("stroke", "white")
    .style("fill", 'grey')
  }

  // 綁定畫面
  container
    .selectAll("path")
    .data(data.value.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("id", (d)=>d.properties.COUNTYCODE)
    .style("stroke", "white")
    .style("fill", 'grey')
    .on('mouseover', mouseover)
    .on('mouseleave', mouseleave)
};

onMounted(() => drawMap());
</script>

<template>
  <div>
    <div class="text-center mt-4">縣市：{{city}}</div>
    <svg ref="svg" width="700" height="500"></svg>
  </div>
</template>

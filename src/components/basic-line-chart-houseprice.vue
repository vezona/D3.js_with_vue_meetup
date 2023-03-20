<script setup>
import { ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import * as d3 from "d3";
import dayjs from "dayjs";

const props = defineProps({
  title: {
    required: true,
    type: String,
  },
  data: {
    required: true,
    type: Array,
  },
  width: {
    default: 900,
    type: Number,
  },
  height: {
    default: 500,
    type: Number,
  },
});
const svg = ref(null);
const margin = { top: 20, bottom: 90, right: 20, left: 60 };

const viewBox = computed(() => {
  return `0 0 ${props.width} ${props.height}`;
});


const xScale = computed(() => {
      // map 資料集
    const xData = props.data.map((i) => i["時間"]);

   return d3
      .scaleTime()
      .domain(d3.extent(xData))
      .range([margin.left, props.width - margin.right])
      .nice();

});
const yScale = computed(() => {
    const yData = props.data.map((i) => +i["買賣契約價格平均總價(不分建物類別)"]);

    return d3
      .scaleLinear()
      .domain(d3.extent(yData))
      .range([props.height - margin.bottom, margin.top])
      .nice();
});

const xAxisGenerator = computed(() => d3
        .axisBottom(xScale.value)
        // .ticks(tickNumber)
        .tickFormat((d) => dayjs(d).format("YYYY/MM/DD"))
      );

const yAxisGenerator = computed(() => d3
      .axisLeft(yScale.value)
      .tickFormat((d) => `${d}萬`)
    );

const line = computed(() => {
   return d3
      .line()
      .x((d) => xScale.value(d["時間"]))
      .y((d) => yScale.value(+d["買賣契約價格平均總價(不分建物類別)"]));
});

const renderChart = ()=>{
    // 呼叫繪製x軸、調整x軸位置
    const xAxisGroup = d3.select(svg.value)
      .append("g")
      .classed('xAxis', true)
      .call(xAxisGenerator.value)
      .style("font-size", "16px")
      .attr("transform", `translate(0,${props.height - margin.bottom})`);

    // X軸刻度位置調整
        xAxisGroup
        .selectAll(".tick text")
        .style("transform", "rotate(-48deg)")
        .attr("x", -50)
        .attr("y", 6)

    // 呼叫繪製y軸、調整y軸位置
    const yAxisGroup = d3.select(svg.value)
      .append("g")
      .classed('yAxis', true)
      .call(yAxisGenerator.value)
      .style("font-size", "16px")
      .attr("transform", `translate(${margin.left},0)`);

  //建立折線
    d3.select(svg.value)
      .append('g')
      .classed('line', true)
      .append("path")
      .transition()
      .duration(1000)
      .attr("d", line.value(props.data))
      .attr("fill", "none")
      .attr("stroke", "#f68b47")
      .attr("stroke-width", 4);
}

onMounted(() => {
    watchEffect(() => {
      renderChart();
  });
});

onUnmounted(() => {
  d3.select(svg.value).selectAll("*").remove();
});
</script>

<template>
  <div>
    
    <p class="mt-4 text-center mb-0 chartTitle fw-bold">
      2006-2024 台灣房屋成交價格
    </p>
    <svg ref="svg" :viewBox="viewBox"></svg>
  </div>
</template>

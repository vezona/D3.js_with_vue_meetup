<script setup>
import { ref, watch, computed, watchEffect, onMounted, onUnmounted } from "vue";
import * as d3 from "d3";

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

const barChart = ref(null);
const svg = ref(null);
const xAxisRef = ref(null);
const yAxisRef = ref(null);
const margin = 60;

const viewBox = computed(() => {
  return `0 0 ${props.width} ${props.height}`;
});

const xData = computed(() => props.data.map((i) => i["縣市"]));
const yData = computed(() =>
  props.data.map((i) => parseInt(i["A.售電量(度)"].split(",").join("")))
);
console.log(yData.value);

const xScale = computed(() => {
  return d3
    .scaleBand()
    .domain(xData.value)
    .range([margin * 2, props.width - margin / 2])
    .padding(0.2);
});

const yScale = computed(() => {
  return d3
    .scaleLinear()
    .domain([0, d3.max(yData.value)])
    .range([props.height - margin, margin])
    .nice();
});

const xAxisGenerator = computed(() => d3.axisBottom(xScale.value));
const yAxisGenerator = computed(() =>
  d3.axisLeft(yScale.value).ticks(5).tickSize(3)
);

// 滑鼠事件
const handleMouseOver = (e, i) => {
  // console.log(d)
  // console.log(d.target.__data__)
  d3.select(e.target).attr("fill", "#f68b47");

  // 加上文字標籤
  d3.select(svg.value)
    .append("text")
    .attr("class", "infoText")
    .attr(
      "y",
      yScale.value(
        parseInt(e.target.__data__["A.售電量(度)"].split(",").join(""))
      ) - 20
    )
    .attr("x", xScale.value(e.target.__data__["縣市"]) + 50)
    .style("fill", "#000")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("text-anchor", "middle")
    .text(e.target.__data__["A.售電量(度)"] + "度");
};

const handleMouseLeave = (e) => {
  d3.select(e.target).attr("fill", "#69b3a2");

  // 移除文字標籤
  d3.select(svg.value).select(".infoText").remove();
};

const drawChart = () => {
  // x軸
  const xAxis = d3
    .select(xAxisRef.value)
    .attr("transform", `translate(0,${props.height - margin})`)
    .transition()
    .duration(1000)
    .call(xAxisGenerator.value);

  // 調整X軸刻度文字標籤傾斜
  xAxis
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")
    .attr("font-size", "14px");

  // y軸
  const yAxis = d3
    .select(yAxisRef.value)
    .attr("transform", `translate(${margin * 2},0)`)
    .transition()
    .duration(1000)
    .call(yAxisGenerator.value);

  // 調整X軸刻度文字標籤傾斜
  yAxis.selectAll("text").attr("font-size", "14px");

  // 建立長條圖
  const bar = d3
    .select(svg.value)
    .selectAll("rect")
    .data(props.data)
    .join("rect");

  // 加上漸增動畫
  bar
    .transition()
    .duration(1000)
    .attr("x", (d) => xScale.value(d["縣市"]))
    .attr("y", (d) =>
      yScale.value(parseInt(d["A.售電量(度)"].split(",").join("")))
    )
    .attr("width", xScale.value.bandwidth())
    .attr(
      "height",
      (d) =>
        props.height -
        margin -
        yScale.value(parseInt(d["A.售電量(度)"].split(",").join("")))
    )
    .attr("fill", "#69b3a2");

  // 加上滑鼠事件
  bar
    .attr("cursor", "pointer")
    .on("mouseover", handleMouseOver)
    .on("mouseleave", handleMouseLeave);
};

onMounted(() => {
  watchEffect(() => {
    drawChart();
  });
});
</script>

<template>
  <h3 class="my-3 text-center text-2xl">{{ title }}</h3>
  <div ref="barChart">
    <svg ref="svg" :viewBox="viewBox">
      <g ref="xAxisRef"></g>
      <g ref="yAxisRef"></g>
    </svg>
  </div>
</template>

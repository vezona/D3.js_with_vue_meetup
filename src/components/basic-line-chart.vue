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
    default: 500,
    type: Number,
  },
  height: {
    default: 270,
    type: Number,
  },
});

const pathRef = ref(null);
const xAxisRef = ref(null);
const yAxisRef = ref(null);

const viewBox = computed(() => {
  return `0 0 ${props.width} ${props.height}`;
});


const xScale = computed(() => {
  return d3
    .scaleLinear()
    .range([30, props.width - 60])
    .domain(d3.extent(props.data, (d, i) => i))
    .nice();
});

const yScale = computed(() => {
  return d3
    .scaleLinear()
    .range([props.height - 60, 0])
    .domain([0, d3.max(props.data, (d) => d)])
    .nice();
});

const xAxisGenerator = computed(() => d3.axisBottom(xScale.value));
const yAxisGenerator = computed(() => d3.axisLeft(yScale.value));

const path = computed(() => {
  return d3
    .line()
    .x((d, i) => xScale.value(i))
    .y((d) => yScale.value(d));
});

const line = computed(() => {
  return path.value(props.data);
});


const renderPath = ()=>{
    if (!pathRef.value) return;
    d3.select(pathRef.value)
      .attr("transform", "translate(0,30)")
      .selectAll("path")
      .data(props.data)
      .join("path")
      .transition()
      .duration(1000)
      .attr("d", line.value)
      .attr("fill", "none")
      .attr("stroke", "#f68b47")
      .attr("stroke-width", 4);
}

const renderXAxis = ()=>{
    if (!xAxisRef.value) return;
    d3.select(xAxisRef.value)
      .transition()
      .duration(1000)
      .call(xAxisGenerator.value)
      .attr("transform", `translate(0,${props.height - 30})`);
}

const renderYAxis = ()=>{
        if (!yAxisRef.value) return;
    d3.select(yAxisRef.value)
      .transition()
      .duration(1000)
      .call(yAxisGenerator.value)
      .attr("transform", "translate(30,30)");
}

onMounted(() => {
//     watch(props, () => {
//       renderPath();
//       renderXAxis()
//       renderYAxis()
//   }, {immediate: true});

  watchEffect(() => {
      renderPath();
      renderXAxis()
      renderYAxis()
  });
});
</script>

<template>
  <div>
    <!-- <h3 class="my-3 text-center text-2xl">{{title}}</h3> -->
    <p>資料：{{ data }}</p>
    <svg class="line-chart" :viewBox="viewBox">
      <g ref="pathRef"></g>
      <g ref="xAxisRef"></g>
      <g ref="yAxisRef"></g>

      <!-- <g>
        <path
          class="line-chart__line"
          fill="none"
          stroke="#76BF8A"
          stroke-width="3px"
          :d="line"
        />
      </g> -->
    </svg>
  </div>
</template>

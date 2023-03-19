<script setup>
import { ref, computed,watch, onMounted, onUnmounted } from "vue";
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

const xScale = computed(() => {
      return d3.scaleBand()
        .rangeRound([0, props.width])
        .padding(0.1)
        .domain(
          props.data.map((d, i) => {
            return i;
          })
        );
});

const yScale = computed(() => {
     return d3.scaleLinear()
        .rangeRound([props.height, 0])
        .domain(d3.extent(props.data));
   
});

const viewBox = computed(() => {
  return `0 0 ${props.width} ${props.height}`;
});


</script>

<template>
  <div>
    <p>{{ title }}{{ data }}</p>
    <svg class="line-chart" :viewBox="viewBox">
      <g>
        <rect
          v-for="(item, i) in data"
          :key="i"
          :x="xScale(i)"
          :y="yScale(item)"
          :width="xScale.bandwidth()"
          :height="height - yScale(item)"
        ></rect>
      </g>
    </svg>
  </div>
</template>

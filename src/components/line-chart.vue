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
    default: 300,
    type: Number,
  },
  colorPicker: {
    default: false,
    type: Boolean,
  },
  strokeWidth: {
    default: 2,
    type: Number,
  },
  transition: {
    default: false,
    type: Boolean,
  },
  tooltip: {
    default: false,
    type: Boolean,
  },
});

const svg = ref(null);
const color = ref("#e66465");
const padding = 30;

const xScale = computed(() => {
  return d3
    .scaleLinear()
    .range([padding, props.width - padding])
    .domain(d3.extent(props.data, (d, i) => i))
    .nice();
});

const yScale = computed(() => {
  return d3
    .scaleLinear()
    .range([props.height - padding, padding])
    .domain([0, d3.max(props.data)])
    .nice();
});

const xAxisGenerator = computed(() => d3.axisBottom(xScale.value));
const yAxisGenerator = computed(() => d3.axisLeft(yScale.value));

const line = computed(() => {
  return d3
    .line()
    .x((d, i) => xScale.value(i))
    .y((d) => yScale.value(d));
});

// 再次繪製動畫
const transitionAgain = () => {
  d3.select(svg.value).selectAll("*").remove();
  drawChart();
};

// 圖表動畫
const chartTransition = (path) => {
  // 折線圖動畫
  const pathLength = path.node().getTotalLength();
  const transitionPath = d3.transition().ease(d3.easeSin).duration(4000);
  path
    .attr("stroke-dashoffset", pathLength)
    .attr("stroke-dasharray", pathLength)
    .transition(transitionPath)
    .attr("stroke-dashoffset", 0);
};

// 遮罩與tooltip
const addTooltip = (svg) => {
  // 建立一個覆蓋svg的方形
  svg
    .append("rect")
    .style("fill", "transparent")
    .style("pointer-events", "all")
    .attr("width", props.width - padding)
    .attr("height", props.height - padding)
    .style("cursor", "pointer")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseout);

  // 建立沿著折線移動的圓點點
  const focusDot = svg
    .append("g")
    .append("circle")
    .style("fill", color.value)
    .attr("stroke", color.value)
    .attr("r", props.strokeWidth + 2)
    .style("opacity", 0);

  // 建立移動的資料標籤
  const focusText = svg
    .append("g")
    .append("text")
    .style("opacity", 0)
    .attr("text-anchor", "left")
    .attr("alignment-baseline", "middle");

  function mouseover() {
    focusDot.style("opacity", 1);
    focusText.style("opacity", 1);
  }

  function mousemove() {
    // 把目前X的位置用xScale去換算
    const x0 = xScale.value.invert(d3.pointer(event, this)[0]);
    const xData = parseInt(x0);
    const yData = props.data[parseInt(x0)];

    // 圓點
    focusDot.attr("cx", xScale.value(xData)).attr("cy", yScale.value(yData));

    focusText
      .html("數值：" + yData)
      .attr("x", xScale.value(xData) + 15)
      .attr("y", yScale.value(yData));
  }

  function mouseout() {
    focusDot.style("opacity", 0);
    focusText.style("opacity", 0);
  }
};

const drawChart = () => {
  const svgContainer = d3.select(svg.value);

  const xAxis = svgContainer
    .append("g")
    .call(xAxisGenerator.value)
    .attr("transform", `translate(0,${props.height - padding})`);

  const yAxis = svgContainer
    .append("g")
    .call(yAxisGenerator.value)
    .attr("transform", `translate(${padding},0)`);

  // 折線
  const path = svgContainer
    .append("g")
    .selectAll("path")
    .data(props.data)
    .join("path")
    .attr("d", line.value(props.data))
    .attr("fill", "none")
    .attr("stroke", color.value)
    .attr("stroke-width", props.strokeWidth);

  // 圖表動畫
  props.transition && chartTransition(path);

  // 互動Tooltip
  props.tooltip && addTooltip(svgContainer);
};

onMounted(() => {
  watchEffect(() => {
    drawChart();
  });
});
</script>

<template>
  <div class="my-5">
    <h3 class="my-3 text-2xl">{{ title }}</h3>
    <p>資料：{{ data }}</p>

    <svg ref="svg" :width="width" :height="height"></svg>

    <div v-if="colorPicker">
      <div>
        <input type="color" id="head" name="head" v-model="color" />
        <label for="head">自訂折線色彩</label>
      </div>
    </div>

    <button
      v-if="transition"
      @click="transitionAgain"
      class="border rounded border-3 border-gray-600 px-2"
    >
      動畫再一次
    </button>
  </div>
</template>

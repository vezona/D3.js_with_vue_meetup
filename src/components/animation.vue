<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as d3 from "d3";
import dayjs from "dayjs";

const chartData = ref(null); //  API 取得的資料

// 中華年份改西元
const TWDateToADDate = (date) => {
  // 年份轉換
  date = date.replace(/\d{3}/, (match) => String(+match + 1911));

  // 季度換為每季第一天
  const seasonDates = {
    Q1: "-01-01",
    Q2: "-04-01",
    Q3: "-07-01",
    Q4: "-10-01",
  };

  const season = date.match(/Q\d/)[0];
  date = date.replace(season, seasonDates[season]);
  return new Date(date);
};

// 取得資料並繪製圖表
const fetchData = async () => {
  chartData.value = await d3.csv("/data/U96年-113年房價統計資訊整合結果.csv");
  drawChart();
};

// 繪製圖表
const drawChart = () => {
  if (chartData.value) {
    // 設定 SVG
    const width = parseInt(d3.select(".lineChartAnimation").style("width")),
      height = 500,
      margin = { top: 20, bottom: 90, right: 20, left: 60 };

    const svg = d3
      .select(".lineChartAnimation")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const data = d3.reverse(chartData.value).map((i) => {
      i["時間"] = TWDateToADDate(i["時間"]);
      return i;
    });

    // map 資料集
    const xData = data.map((i) => i["時間"]);
    const yData = data.map((i) => +i["買賣契約價格平均總價(不分建物類別)"]);

    // Time Scale
    // 設定要給 X 軸用的 scale 跟 axis
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(xData))
      .range([margin.left, width - margin.right])
      .nice();

    // X軸
    let tickNumber = window.innerWidth > 900 ? xData.length / 3 : 10;
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(tickNumber)
      .tickFormat((d) => dayjs(d).format("YYYY/MM/DD"));

    // 呼叫繪製x軸、調整x軸位置
    const xAxisGroup = svg
      .append("g")
      .call(xAxis)
      .style("font-size", "16px")
      .attr("transform", `translate(0,${height - margin.bottom})`);

    // X軸刻度位置調整
    xAxisGroup.call((g) =>
      g
        .selectAll(".tick text")
        .style("transform", "rotate(-48deg)")
        .attr("x", -50)
        .attr("y", 6)
    );

    //  Y 軸
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(yData))
      .range([height - margin.bottom, margin.top])
      .nice();

    const yAxis = d3.axisLeft(yScale).tickFormat((d) => `${d}萬`);

    // 呼叫繪製y軸、調整y軸位置
    const yAxisGroup = svg
      .append("g")
      .call(yAxis)
      .style("font-size", "16px")
      .attr("transform", `translate(${margin.left},0)`);

    // 設定 path 的 d
    const lineChart = d3
      .line()
      .x((d) => xScale(d["時間"]))
      .y((d) => yScale(+d["買賣契約價格平均總價(不分建物類別)"]));

    // 建立折線圖
    const animatedPath = svg
      .append("path")
      .data(data)
      .attr("d", lineChart(data))
      .attr("fill", "none")
      .attr("stroke", "#f68b47")
      .attr("stroke-width", 4);

    const pathLength = animatedPath.node().getTotalLength();

    const transitionPath = d3.transition().ease(d3.easeSin).duration(5000);
    animatedPath
      .attr("stroke-dashoffset", pathLength)
      .attr("stroke-dasharray", pathLength)
      .transition(transitionPath)
      .attr("stroke-dashoffset", 0);
  }
};

onMounted(() => {
  fetchData();
});

onUnmounted(() => {
  d3.select(".lineChartAnimation").selectAll("*").remove();
});
</script>

<template>
  <div class="my-20">
    <h3 class="my-3 text-center text-2xl">折線圖動畫 Animation</h3>
    <p class="mt-4 text-center mb-0 chartTitle fw-bold">
      2006-2024 台灣房屋成交價格
    </p>
    <div class="lineChartAnimation"></div>
  </div>
</template>

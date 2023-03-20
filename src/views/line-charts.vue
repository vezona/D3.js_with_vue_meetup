<script setup>
import { ref } from "vue";
import * as d3 from "d3";

const data = ref([99, 71, 78, 25, 36, 92]);
const changeData = () => {
  let arr = [];
  for (let i = 0; i < 6; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  data.value = arr;
};

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

// 取得房價資料
const housePriceData = ref([])
const fetchHousePriceData = async () => {
const res =  await d3.csv("/data/U96年-113年房價統計資訊整合結果.csv");

housePriceData.value = d3.reverse(res).map((i) => {
    i["時間"] = TWDateToADDate(i["時間"]);
    return i;
  });
};


fetchHousePriceData();
</script>

<template>
  <button
    class="border rounded-lg bg-gray-200 border-gray-500 my-3 py-2 px-4"
    @click="changeData"
  >
    change data
  </button>
  <basic-line-chart title="結合vue的d3.js基本折線圖" :data="data" />

  <basic-line-chart-houseprice title="房價趨勢折線圖" :data="housePriceData" class="mt-20"/>
  <animation-line-chart-houseprice title="房價趨勢折線圖" :data="housePriceData" class="mt-20"/>
</template>

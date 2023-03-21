<script setup>
import { ref } from "vue";
import * as d3 from "d3";

// 取得住宅售電資料
const electricData = ref([]);
const fetchElectricData = async (url) => {
  electricData.value = await d3.csv(url);
};

fetchElectricData("/data/202211_Electric.csv");
</script>

<template>
  <div>
    <basic-bar-chart title="基礎長條圖" :data="electricData" />
    <div class="flex mt-5">
      <button
        class="rounded-btn mx-3"
        @click="fetchElectricData('/data/202211_Electric.csv')"
      >
        2022 11月
      </button>
      <button
        class="rounded-btn"
        @click="fetchElectricData('/data/202212_Electric.csv')"
      >
        2022 12月
      </button>
    </div>
  </div>
</template>

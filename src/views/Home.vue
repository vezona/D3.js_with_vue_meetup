<template>
  <div class="my-8 text-center text-4xl leading-14">
    <span class="bg-c-main-orange rounded-xl px-2 text-6xl text-light-50"
      >D3.js</span
    >與
    <span class="rounded-xl bg-[#42b883] px-2 text-6xl text-light-50"
      >Vue.js</span
    >框架的結合，讓圖表更具表現力
  </div>
  <test-line/>

  <button class="border px-3" @click="changeData">change data</button>
  <test-line-component title="使用vue進行資料綁定" :data="data"/>

  <bar-chart-components class="mt-6" title="Bar Chart" :data="data"/>


</template>

<script setup>
import { ref, onMounted } from "vue";
import * as d3 from "d3";
const data = ref([99, 71, 78, 25, 36, 92])
const changeData = ()=>{
  let arr = [];
  for (let i = 0; i < 6; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  data.value = arr;
};


</script>

<style></style>

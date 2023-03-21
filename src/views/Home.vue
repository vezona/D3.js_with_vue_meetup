<template>
  <div class="my-8 text-center text-2xl">
    <span class="bg-c-main-orange rounded-xl px-2 text-4xl text-light-50"
      >D3.js</span
    >與
    <span class="rounded-xl bg-[#42b883] px-2 text-4xl text-light-50"
      >Vue.js</span
    >框架的結合，讓圖表更具表現力
  </div>

  <router-link
    to="/line-charts"
    class="border rounded m-auto border-gray-500 my-8 text-center py-2 px-3 w-100px block"
    >折線圖
  </router-link>

  <router-link
    to="/bar-charts"
    class="border rounded m-auto border-gray-500 my-8 text-center py-2 px-3 w-100px block"
    >長條圖
  </router-link>

  <router-link
    to="/combined-charts"
    class="border rounded m-auto border-gray-500 my-8 text-center py-2 px-3 w-100px block"
    >合併圖
  </router-link>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as d3 from "d3";
</script>

<style></style>

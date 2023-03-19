<script setup>
import { ref,watchEffect, onMounted, onUnmounted } from "vue";
import * as d3 from 'd3';

const data = ref([99, 71, 78, 25, 36, 92])

const changeData = ()=>{
    data.value = [50, 31, 78];
}

const drawLine = ()=>{
    const svg = d3.select('.drawLine')
      .append('svg')
      .attr('width', 500)
      .attr('height', 270)
      .append('g')
      .attr('transform', 'translate(0, 10)');

    const x = d3.scaleLinear().range([0, 430]).domain(d3.extent(data.value, (d, i) => i));
    const y = d3.scaleLinear().range([210, 0]).domain([0, d3.max(data.value, d => d)]);

    d3.axisLeft().scale(x);
    d3.axisTop().scale(y);

    const createPath = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d));

     svg
      .selectAll('.path')
      .data(data.value)
      .join("path")
      .attr('d', createPath(data.value))
      .attr('fill', 'none')
      .attr('stroke', '#76BF8A')
      .attr('stroke-width', '3px');
};


onMounted(()=>{
   watchEffect(()=>{
    d3.select('.drawLine svg').remove()
    drawLine();
   }) 
   
});
</script>

<template>
{{data}}
  <button class="border px-2" @click="changeData">change data</button>
  <div class="drawLine"></div>

</template>

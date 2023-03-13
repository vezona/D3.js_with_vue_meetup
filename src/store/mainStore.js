import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMainStore = defineStore('mainStore', () => {
    const isMobile = ref(false)
    // const name = ref('Eduardo')
    // const doubleCount = computed(() => count.value * 2)
    // function increment() {
    //   count.value++
    // }
  
    return {isMobile}
  })
import { createRouter, createWebHistory } from 'vue-router';
import { useMainStore } from '/src/store/mainStore.js';
import { useMediaQuery } from '@vueuse/core';
import Home from '../views/Home.vue'
import LineCharts from '../views/line-charts.vue'
import MultiLineCharts from '../views/multi-line-charts.vue'
import BarCharts from '../views/bar-charts.vue'
import CombinedCharts from '../views/combined-charts.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/line-charts', name: 'LineCharts', component: LineCharts },
    { path: '/multi-line-charts', name: 'MultiLineCharts', component: MultiLineCharts },
    { path: '/bar-charts', name: 'BarCharts', component: BarCharts },
    { path: '/combined-charts', name: 'CombinedCharts', component: CombinedCharts },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(() => { 
    const store = useMainStore();
    // 偵測螢幕寬度
    store.isMobileScreen = !!useMediaQuery('(max-width: 768px)')?.value;
})

export default router;
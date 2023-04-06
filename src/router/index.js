import { createRouter, createWebHistory } from 'vue-router';
import { useMainStore } from '/src/store/mainStore.js';
import { useMediaQuery } from '@vueuse/core';
import Home from '../views/Home.vue'
import LineCharts from '../views/LineCharts.vue'
import LineChartComponent from '../views/LineChartComponent.vue'
import BarCharts from '../views/BarCharts.vue'
import Maps from '../views/Maps.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/line-charts', name: 'LineCharts', component: LineCharts },
    { path: '/line-chart-component', name: 'LineChartComponent', component: LineChartComponent },
    { path: '/bar-charts', name: 'BarCharts', component: BarCharts },
    { path: '/maps', name: 'Maps', component: Maps },
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
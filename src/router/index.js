import { createRouter, createWebHistory } from 'vue-router';
import { useMainStore } from '/src/store/mainStore.js';
import { useMediaQuery } from '@vueuse/core';
import Home from '../views/Home.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
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
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './pages/home/HomeView.vue';

const routes = [
    {
        path: '/',
        component: HomeView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
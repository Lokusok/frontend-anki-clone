import { createRouter, createWebHistory } from 'vue-router';

import HomeView from './pages/home/HomeView.vue';
import DecksList from './pages/decks-list/DecksList.vue';
import DecksCreate from './pages/decks-create/DecksCreate.vue';
import Login from './pages/login/Login.vue';
import Register from './pages/register/Register.vue';
import DecksSearch from './pages/decks-search/DecksSearch.vue';
import Profile from './pages/profile/Profile.vue';

const routes = [
    {
        path: '/',
        component: HomeView,
        name: 'home'
    },
    {
        path: '/decks',
        component: DecksList,
        name: 'decks.index'
    },
    {
        path: '/decks/create',
        component: DecksCreate,
        name: 'decks.create'
    },
    {
        path: '/decks/search',
        component: DecksSearch,
        name: 'decks.search'
    },
    {
        path: '/login',
        component: Login,
        name: 'login'
    },
    {
        path: '/register',
        component: Register,
        name: 'register',
    },
    {
        path: '/profile',
        component: Profile,
        name: 'profile',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalizedGeneric,
} from 'vue-router';

import { useSessionStore } from './stores/session';

import HomeView from './pages/home/HomeView.vue';
import DecksList from './pages/decks-list/DecksList.vue';
import DecksCreate from './pages/decks-create/DecksCreate.vue';
import Login from './pages/login/Login.vue';
import Register from './pages/register/Register.vue';
import DecksSearch from './pages/decks-search/DecksSearch.vue';
import Profile from './pages/profile/Profile.vue';
import DecksEdit from './pages/decks-edit/DecksEdit.vue';
import QuestionsCreate from './pages/questions-create/QuestionsCreate.vue';
import QuestionsAnswer from './pages/questions-answer/QuestionsAnswer.vue';
import QuestionsEdit from './pages/questions-edit/QuestionsEdit.vue';

const routes = [
  {
    path: '/',
    component: HomeView,
    name: 'home',
    meta: {
      title: 'Главная',
    },
  },
  {
    path: '/decks',
    component: DecksList,
    name: 'decks.index',
    meta: {
      title: 'Коллекции',
    },
  },
  {
    path: '/decks/create',
    component: DecksCreate,
    name: 'decks.create',
    meta: {
      title: 'Создать коллекцию',
    },
  },
  {
    path: '/decks/search',
    component: DecksSearch,
    name: 'decks.search',
    meta: {
      title: 'Поиск коллекции',
    },
  },
  {
    path: '/decks/:id/edit',
    component: DecksEdit,
    name: 'decks.edit',
    meta: {
      title: 'Изменение коллекции',
    },
  },
  {
    path: '/questions/create',
    component: QuestionsCreate,
    name: 'questions.create',
    meta: {
      title: 'Создание вопроса',
    },
  },
  {
    path: '/decks/:deckId/questions/:questionId/edit',
    component: QuestionsEdit,
    name: 'questions.edit',
    meta: {
      title: 'Обновление вопроса',
    },
  },
  {
    path: '/decks/:deckId/questions/answer',
    component: QuestionsAnswer,
    name: 'questions.answer',
    meta: {
      title: 'Ответы на вопросы',
    },
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      title: 'Вход',
    },
  },
  {
    path: '/register',
    component: Register,
    name: 'register',
    meta: {
      title: 'Регистрация',
    },
  },
  {
    path: '/profile',
    component: Profile,
    name: 'profile',
    meta: {
      title: 'Профиль',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const onlyGuests = ['login', 'register'];
const onlyAuth = ['decks.index', 'decks.create', 'decks.search', 'questions.create', 'questions.answer', 'profile'];

export const accessTo = (to: RouteLocationNormalizedGeneric): boolean => {
  const sessionStore = useSessionStore();

  if (onlyGuests.includes(to.name as string) && sessionStore.isAuth) {
    return false;
  }

  if (onlyAuth.includes(to.name as string) && !sessionStore.isAuth) {
    return false;
  }

  return true;
};

router.beforeEach((to) => {
  return accessTo(to);
});

router.afterEach((to) => {
  document.title = to.meta?.title ?? 'Вопросы и ответы';
});

export default router;

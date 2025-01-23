import {
  createRouter,
  createWebHistory,
  RouteLocationNormalizedGeneric,
} from 'vue-router';

import { useSessionStore } from './stores/session';

import HomeView from './modules/home/HomeView.vue';
import DecksIndex from './modules/decks/index/DecksIndex.vue';
import DecksCreate from './modules/decks/create/DecksCreate.vue';
import DecksSearch from './modules/decks/search/DecksSearch.vue';
import DecksEdit from './modules/decks/edit/DecksEdit.vue';
import QuestionsCreate from './modules/questions/create/QuestionsCreate.vue';
import QuestionsEdit from './modules/questions/edit/QuestionsEdit.vue';
import QuestionsAnswer from './modules/questions/answer/QuestionsAnswer.vue';
import Login from './modules/session/login/Login.vue';
import Register from './modules/session/register/Register.vue';
import Profile from './modules/session/profile/Profile.vue';
import ProfileEdit from './modules/session/profile/ProfileEdit.vue';

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
    component: DecksIndex,
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
  {
    path: '/profile/edit',
    component: ProfileEdit,
    name: 'profile.edit',
    meta: {
      title: 'Редактирование профиля',
    },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => {
    return { top: 0 };
  },
});

const onlyGuests = ['login', 'register'];
const onlyAuth = ['decks.index', 'decks.create', 'decks.search', 'questions.create', 'questions.answer', 'profile', 'profile.edit'];

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
  document.title = to.meta?.title as string ?? 'Вопросы и ответы';
});

export default router;

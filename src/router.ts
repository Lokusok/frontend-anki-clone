import {
  createRouter,
  createWebHistory,
  RouteLocationNormalizedGeneric,
} from 'vue-router';

import { useSessionStore } from './stores/session';

const routes = [
  {
    path: '/',
    component: () => import('./modules/home/HomeView.vue'),
    name: 'home',
    meta: {
      title: 'Главная',
    },
  },
  {
    path: '/decks',
    component: () => import('./modules/decks/index/DecksIndex.vue'),
    name: 'decks.index',
    meta: {
      title: 'Коллекции',
    },
  },
  {
    path: '/decks/create',
    component: () => import('./modules/decks/create/DecksCreate.vue'),
    name: 'decks.create',
    meta: {
      title: 'Создать коллекцию',
    },
  },
  {
    path: '/decks/search',
    component: () => import('./modules/decks/search/DecksSearch.vue'),
    name: 'decks.search',
    meta: {
      title: 'Поиск коллекции',
    },
  },
  {
    path: '/decks/:id/edit',
    component: () => import('./modules/decks/edit/DecksEdit.vue'),
    name: 'decks.edit',
    meta: {
      title: 'Изменение коллекции',
    },
  },
  {
    path: '/questions/create',
    component: () => import('./modules/questions/create/QuestionsCreate.vue'),
    name: 'questions.create',
    meta: {
      title: 'Создание вопроса',
    },
  },
  {
    path: '/decks/:deckId/questions/:questionId/edit',
    component: () => import('./modules/questions/edit/QuestionsEdit.vue'),
    name: 'questions.edit',
    meta: {
      title: 'Обновление вопроса',
    },
  },
  {
    path: '/decks/:deckId/questions/answer',
    component: () => import('./modules/questions/answer/QuestionsAnswer.vue'),
    name: 'questions.answer',
    meta: {
      title: 'Ответы на вопросы',
    },
  },
  {
    path: '/login',
    component: () => import('./modules/session/login/Login.vue'),
    name: 'login',
    meta: {
      title: 'Вход',
    },
  },
  {
    path: '/register',
    component: () => import('./modules/session/register/Register.vue'),
    name: 'register',
    meta: {
      title: 'Регистрация',
    },
  },
  {
    path: '/profile',
    component: () => import('./modules/session/profile/Profile.vue'),
    name: 'profile',
    meta: {
      title: 'Профиль',
    },
  },
  {
    path: '/forgot-password',
    component: () => import('./modules/session/profile/ProfileEdit.vue'),
    name: 'forgot-password',
    meta: {
      title: 'Восстановление пароля',
    },
  },
  {
      path: '/password-reset/:token',
      component: () => import('./modules/session/credentials/forgot-password/EnterNewPassword.vue'),
      name: 'forgot-password.enter-new',
      meta: {
        title: 'Введите новый пароль'
      },
  },
  {
    path: '/profile/edit',
    component: () => import('./modules/session/profile/ProfileEdit.vue'),
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

const onlyGuests = ['login', 'register', 'forgot-password', 'forgot-password.enter-new'];
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

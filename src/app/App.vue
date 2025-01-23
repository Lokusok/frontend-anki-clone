<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useSessionStore } from '@/stores/session';

import Header from '@/components/Header.vue';

import { accessTo } from '@/router';
import { useThemeSwitch } from '@/composables/use-theme-switch';
import { TTheme } from '@/types/settings';
import { THEME_KEY } from '@/config/storage-keys';

const sessionStore = useSessionStore();
sessionStore.startSession();

const { currentTheme, setTheme } = useThemeSwitch();

const router = useRouter();
const route = useRoute();

const inits = {
  initTheme: () => {
    setTheme(localStorage.getItem(THEME_KEY) ?? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' as TTheme);
  },
};

const callbacks = {
  logout: () => {
    sessionStore.logout();
    router.push({ name: 'login' });
  },
};

inits.initTheme();

watch(currentTheme, () => {
  localStorage.setItem(THEME_KEY, currentTheme.value);
});

watch([() => sessionStore.isAuth, () => sessionStore.init], () => {
  if (sessionStore.init) {
    const isAllowBeOnThisPage = accessTo(route);
  
    if (! isAllowBeOnThisPage) {
      router.replace({ name: 'home' });
    }
  }
}, { immediate: true });
</script>

<template>
  <v-layout>
    <Header
      :is-auth="sessionStore.isAuth"
      :waiting="sessionStore.waiting"
      @logout-click="callbacks.logout"
    />

    <v-main v-if="!sessionStore.waiting">
      <router-view></router-view>
    </v-main>
  </v-layout>

  <v-footer color="primary d-flex justify-center py-3" :style="{ 'max-height': '50px' }">
    <span class="font-weight-bold">Anki clone</span>
  </v-footer>
</template>

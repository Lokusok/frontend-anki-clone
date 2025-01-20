<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Header from '../components/Header.vue';
import { useSessionStore } from '../stores/session';
import { accessTo } from '../router';

const sessionStore = useSessionStore();
const router = useRouter();
const route = useRoute();

sessionStore.startSession();

watch(() => sessionStore.isAuth, () => {
  const isAllowBeOnThisPage = accessTo(route);

  if (! isAllowBeOnThisPage) {
    router.replace({ name: 'home' });
  }
}, { immediate: true });
</script>

<template>
  <v-layout>
    <Header
      :is-auth="sessionStore.isAuth"
      :waiting="sessionStore.waiting"
      @logout-click="sessionStore.logout"
    />

    <v-main v-if="!sessionStore.waiting">
      <router-view></router-view>
    </v-main>
  </v-layout>

  <v-footer color="primary d-flex justify-center py-3" :style="{ 'max-height': '50px' }">
    <span class="font-weight-bold">Anki clone</span>
  </v-footer>
</template>

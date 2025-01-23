<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTheme } from 'vuetify';

import { useSessionStore } from '@/stores/session';

import CenterWhiteBlock from '@/components/CenterWhiteBlock.vue';
import PageLayout from '@/components/layouts/PageLayout.vue';

const sessionStore = useSessionStore();

const themeModel = ref(localStorage.getItem('theme') ?? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

console.log(themeModel.value);

const theme = useTheme();

watch(themeModel, () => {
  console.log(themeModel.value);
  theme.global.name.value = themeModel.value;
}, { immediate: true });
</script>

<template>
  <PageLayout title="Профиль">
    <CenterWhiteBlock>
      <div class="text-center font-weight-bold">
        <div>
          <span>Name: {{ sessionStore.session.name }}</span>
        </div>

        <div>
          <span>Email: {{ sessionStore.session.email }}</span>
        </div>

        <v-divider class="my-3"></v-divider>

        <div class="d-flex flex-column align-center">
          <div>Тема приложения:</div>
          <v-radio-group v-model="themeModel">
            <v-radio label="Светлая тема" value="light"></v-radio>
            <v-radio label="Тёмная тема" value="dark"></v-radio>
          </v-radio-group>
        </div>
      </div>
    </CenterWhiteBlock>
  </PageLayout>
</template>

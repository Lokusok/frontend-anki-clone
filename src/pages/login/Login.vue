<script setup lang="ts">
import { computed, ref, toValue } from 'vue';
import { useRouter } from 'vue-router';

import { useSessionStore } from '../../stores/session';
import CenterWhiteBlock from '../../components/CenterWhiteBlock.vue';
import PageLayout from '../../components/layouts/PageLayout.vue';

const sessionStore = useSessionStore();
const router = useRouter();

const user = ref({
  email: '',
  password: '',
});

const errors = ref({
  email: '',
  password: '',
});

const isSubmitBtnDisabled = computed(() => {
  const isNotAllFilled = !user.value.email || !user.value.password;

  return isNotAllFilled;
});

const loginUser = async () => {
    const success = await sessionStore.loginUser(toValue(user));

    console.log({ success });

    if (success) {
        router.replace({ name: 'profile' });
    }
};
</script>

<template>
  <PageLayout title="Войти в аккаунт">
    <CenterWhiteBlock>
      <form @submit.prevent="loginUser">
        <v-text-field
          v-model="user.email"
          :error-messages="errors.email"
          label="Почта"
        />
        <v-text-field
          v-model="user.password"
          :error-messages="errors.password"
          label="Пароль"
        />

        <div class="d-flex justify-space-between align-center">
          <v-btn :disabled="isSubmitBtnDisabled" type="submit" color="primary">Войти</v-btn>
          <router-link :to="{ name: 'register' }">Нет аккуанта?</router-link>
        </div>
      </form>
    </CenterWhiteBlock>
  </PageLayout>
</template>

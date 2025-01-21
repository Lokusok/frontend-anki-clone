<script setup lang="ts">
import { computed, ref, toValue } from 'vue';
import { useRouter } from 'vue-router';

import { useSessionStore } from '../../stores/session';
import CenterWhiteBlock from '../../components/CenterWhiteBlock.vue';
import PageLayout from '../../components/layouts/PageLayout.vue';

const sessionStore = useSessionStore();
const router = useRouter();

const waiting = ref(false);

const user = ref({
  email: '',
  password: '',
});

const errors = ref({
  message: '',
  email: '',
  password: '',
});

const isSubmitBtnDisabled = computed(() => {
  const isNotAllFilled = !user.value.email || !user.value.password;

  return isNotAllFilled;
});

const loginUser = async () => {
  waiting.value = true;

  const loginErrors = await sessionStore.loginUser(toValue(user));

  if (loginErrors) {
    errors.value.message = loginErrors.message;

    errors.value.email = loginErrors.errors.email?.[0];
    errors.value.password = loginErrors.errors.password?.[0];
  } else {
    router.replace({ name: 'profile' });
  }

  waiting.value = false;
};
</script>

<template>
  <PageLayout title="Войти в аккаунт">
    <CenterWhiteBlock>
      <form @submit.prevent="loginUser">
        <v-text-field v-model="user.email" :disabled="waiting" :error-messages="errors.email" label="Почта" />
        <v-text-field v-model="user.password" :disabled="waiting" :error-messages="errors.password" label="Пароль" />

        <div class="d-flex justify-space-between align-center">
          <v-btn :disabled="isSubmitBtnDisabled || waiting" type="submit" color="primary">
            Войти
          </v-btn>

          <router-link :to="{ name: 'register' }">Нет аккаунта?</router-link>
        </div>
      </form>
    </CenterWhiteBlock>
  </PageLayout>
</template>

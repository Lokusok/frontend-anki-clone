<script setup lang="ts">
import { computed, ref, toValue } from 'vue';
import { useRouter } from 'vue-router';

import { useSessionStore } from '../../stores/session';

import PageLayout from '../../components/layouts/PageLayout.vue';
import CenterWhiteBlock from '../../components/CenterWhiteBlock.vue';

const sessionStore = useSessionStore();
const router = useRouter();

const waiting = ref(false);

const user = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const errors = ref({
  message: '',
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const isSubmitBtnDisabled = computed(() => {
  const isNotAllFilled =
    !user.value.name ||
    !user.value.email ||
    !user.value.password ||
    !user.value.password_confirmation;
  return isNotAllFilled;
});

const registerUser = async () => {
  waiting.value = true;

  const registerErrors = await sessionStore.registerUser(toValue(user));

  waiting.value = false;

  if (registerErrors) {
    errors.value.message = registerErrors.message;

    errors.value.name = registerErrors.errors.name[0];
    errors.value.email = registerErrors.errors.email[0];
    errors.value.password = registerErrors.errors.password[0];
    errors.value.password_confirmation =
      registerErrors.errors.password_confirmation[0];

    user.value.password = '';
    user.value.password_confirmation = '';
  } else {
    errors.value.name = '';
    errors.value.email = '';
    errors.value.password = '';
    errors.value.password_confirmation = '';

    router.replace({ name: 'profile' });
  }
};
</script>

<template>
  <PageLayout title="Регистрация">
    <CenterWhiteBlock>
      <form @submit.prevent="registerUser">
        <v-text-field
          v-model="user.name"
          :disabled="waiting"
          :error-messages="errors.name"
          label="Логин"
        />
        <v-text-field
          v-model="user.email"
          :disabled="waiting"
          :error-messages="errors.email"
          label="Почта"
        />
        <v-text-field
          v-model="user.password"
          :disabled="waiting"
          :error-messages="errors.password"
          label="Пароль"
        />
        <v-text-field
          v-model="user.password_confirmation"
          :disabled="waiting"
          :error-messages="errors.password_confirmation"
          label="Подтвердите пароль"
        />

        <div class="d-flex justify-space-between align-center">
          <v-btn
            :disabled="isSubmitBtnDisabled || waiting"
            type="submit"
            color="primary"
          >
            Создать аккаунт
          </v-btn>
          <router-link :to="{ name: 'login' }">Уже есть аккаунт?</router-link>
        </div>
      </form>
    </CenterWhiteBlock>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, toValue } from 'vue';
import { useRouter } from 'vue-router';

import { useSessionStore } from '@/stores/session';
import { useFormState } from '@/composables/use-form-state';

import PageLayout from '@/components/layouts/PageLayout.vue';
import CenterWhiteBlock from '@/components/CenterWhiteBlock.vue';

const sessionStore = useSessionStore();
const router = useRouter();

const waiting = ref(false);
const isShowPasswords = ref(false);

const { data: user, errors, isSubmitDisabled } = useFormState({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const registerUser = async () => {
  waiting.value = true;

  const registerErrors = await sessionStore.registerUser(toValue(user));

  console.log({registerErrors});

  waiting.value = false;

  if (registerErrors) {
    errors.value.message = registerErrors.message;

    errors.value.name = registerErrors.errors.name?.[0];
    errors.value.email = registerErrors.errors.email?.[0];
    errors.value.password = registerErrors.errors.password?.[0];
    errors.value.password_confirmation =
      registerErrors.errors.password_confirmation?.[0];

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
          :type="isShowPasswords ? 'text' : 'password'"
          :append-icon="isShowPasswords ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="isShowPasswords = !isShowPasswords"
          label="Пароль"
        />
        <v-text-field
          v-model="user.password_confirmation"
          :disabled="waiting"
          :error-messages="errors.password_confirmation"
          :type="isShowPasswords ? 'text' : 'password'"
          label="Подтвердите пароль"
        />

        <div class="d-flex justify-space-between align-center">
          <v-btn
            :disabled="isSubmitDisabled || waiting"
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

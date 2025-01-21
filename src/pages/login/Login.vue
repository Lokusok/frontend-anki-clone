<script setup lang="ts">
import { ref, toValue } from 'vue';
import { useRouter } from 'vue-router';

import { useFormState } from '../../composables/use-form-state';
import { useSessionStore } from '../../stores/session';
import CenterWhiteBlock from '../../components/CenterWhiteBlock.vue';
import PageLayout from '../../components/layouts/PageLayout.vue';

const sessionStore = useSessionStore();
const router = useRouter();

const waiting = ref(false);
const isShowPasswords = ref(false);

const {
  data: user,
  errors,
  isSubmitDisabled,
} = useFormState({
  email: '',
  password: '',
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

        <div class="d-flex justify-space-between align-center">
          <v-btn
            :disabled="isSubmitDisabled || waiting"
            type="submit"
            color="primary"
          >
            Войти
          </v-btn>

          <router-link :to="{ name: 'register' }">Нет аккаунта?</router-link>
        </div>
      </form>
    </CenterWhiteBlock>
  </PageLayout>
</template>

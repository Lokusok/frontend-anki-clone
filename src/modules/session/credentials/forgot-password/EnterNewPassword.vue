<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import CenterWhiteBlock from '@/components/CenterWhiteBlock.vue';
import PageLayout from '@/components/layouts/PageLayout.vue';
import { useFormState } from '@/composables/use-form-state';
import { useSessionStore } from '@/stores/session';

const router = useRouter();
const route = useRoute();

const sessionStore = useSessionStore();

const { data: formState, errors, isSubmitDisabled } = useFormState({
  newPassword: '',
});

const waitingReset = ref(false);
const showPassword = ref(false);

const callbacks = {
  applyNewPassword: async () => {
    waitingReset.value = true;

    const resetPasswordErrors = await sessionStore.resetPassword({
      token: String(route.params.token),
      email: String(route.query.email),
      password: formState.value.newPassword,
    });

    if (resetPasswordErrors) {
        errors.value.message = resetPasswordErrors.message;
  
        errors.value.password = resetPasswordErrors.errors.password?.[0];
    } else {
        router.push({ name: 'login' });
    }

    waitingReset.value = false;
  },
};
</script>

<template>
  <PageLayout title="Введите новый пароль">
    <CenterWhiteBlock>
      <form @submit.prevent="callbacks.applyNewPassword">
        <v-text-field
          v-model="formState.newPassword"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :disabled="waitingReset"
          :type="showPassword ? 'text' : 'password'"
          :error-messages="errors.message || errors.password"
          @click:append="showPassword = !showPassword"
          label="Новый пароль"
        ></v-text-field>
        <v-btn :disabled="isSubmitDisabled" :loading="waitingReset" type="submit" color="primary">
          Изменить
        </v-btn>
      </form>
    </CenterWhiteBlock>
  </PageLayout>
</template>

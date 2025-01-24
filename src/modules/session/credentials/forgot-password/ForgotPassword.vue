<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSessionStore } from '@/stores/session';
import { useFormState } from '@/composables/use-form-state';

import CenterWhiteBlock from '@/components/CenterWhiteBlock.vue';
import PageLayout from '@/components/layouts/PageLayout.vue';

const router = useRouter();

const sessionStore = useSessionStore();

const waitingResetLinkSent = ref(false);

const {
  data: formState,
  errors,
  isSubmitDisabled,
} = useFormState({
  email: '',
});

const callbacks = {
  sendResetLink: async () => {
    waitingResetLinkSent.value = true;

    const sendResetLinkErrors = await sessionStore.sendResetLink({
      email: formState.value.email,
    });

    if (sendResetLinkErrors) {
      errors.value.message = sendResetLinkErrors.message;

      errors.value.email = sendResetLinkErrors.errors.email?.[0];
    } else {
      errors.value.message = '';
      errors.value.email = '';

      router.replace({ name: 'login' });
    }

    waitingResetLinkSent.value = false;
  },
};
</script>

<template>
  <PageLayout title="Восстановление пароля">
    <CenterWhiteBlock>
      <form @submit.prevent="callbacks.sendResetLink">
        <v-text-field
          v-model="formState.email"
          :error-messages="errors.email"
          label="Почта"
          hint="На эту почту придёт письмо для сброса пароля"
          persistent-hint
          class="mb-3"
        ></v-text-field>
        <v-btn
          :disabled="isSubmitDisabled"
          :loading="waitingResetLinkSent"
          color="primary"
          type="submit"
        >
          Отправить
        </v-btn>
      </form>
    </CenterWhiteBlock>
  </PageLayout>
</template>

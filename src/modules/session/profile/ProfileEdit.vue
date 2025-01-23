<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useSessionStore } from '@/stores/session';
import { useFormState } from '@/composables/use-form-state';

import CenterWhiteBlock from '@/components/CenterWhiteBlock.vue';
import PageLayout from '@/components/layouts/PageLayout.vue';
import BackButton from '@/components/BackButton.vue';

const sessionStore = useSessionStore();
const router = useRouter();

const { data: formState, errors } = useFormState({
  name: sessionStore.session.name,
  email: sessionStore.session.email,
});

const waitingUpdate = ref(false);

const isSubmitDisabled = computed(() => {
  const isEmpty = !formState.value.name || !formState.value.email;
  const isEqualsAsPref =
    formState.value.name === sessionStore.session.name &&
    formState.value.email === sessionStore.session.email;

  return isEmpty || isEqualsAsPref;
});

const callbacks = {
  updateProfile: async () => {
    waitingUpdate.value = true;

    const response = await sessionStore.updateQuestion({
      name: formState.value.name,
      email: formState.value.email,
    });

    console.log(response);

    if (response?.errors) {
      errors.value.email = response.errors.email?.[0];
      errors.value.name = response.errors.name?.[0];
    } else {
      router.push({ name: 'profile' });
    }

    waitingUpdate.value = false;
  },
};
</script>

<template>
  <PageLayout title="Профиль">
    <CenterWhiteBlock>
      <template #header>
        <BackButton />
      </template>

      <form @submit.prevent="callbacks.updateProfile">
        <v-text-field
          v-model="formState.name"
          :disabled="waitingUpdate"
          :error-messages="errors.name"
          label="Имя"
        ></v-text-field>
        <v-text-field
          v-model="formState.email"
          :disabled="waitingUpdate"
          :error-messages="errors.email"
          label="Почта"
        ></v-text-field>
        <v-btn
          :loading="waitingUpdate"
          :disabled="isSubmitDisabled"
          color="primary"
          type="submit"
        >
          Изменить
        </v-btn>
      </form>
    </CenterWhiteBlock>
  </PageLayout>
</template>

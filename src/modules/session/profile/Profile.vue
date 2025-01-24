<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useSessionStore } from '@/stores/session';

import CenterWhiteBlock from '@/components/CenterWhiteBlock.vue';
import PageLayout from '@/components/layouts/PageLayout.vue';

import { useThemeSwitch } from '@/composables/use-theme-switch';
import { useFormState } from '@/composables/use-form-state';

import { TTheme } from '@/types/settings';

const sessionStore = useSessionStore();

const { currentTheme, setTheme } = useThemeSwitch();

const router = useRouter();

const {
  data: formState,
  errors,
  isSubmitDisabled,
} = useFormState({
  currentPassword: '',
  newPassword: '',
});

const themeModel = ref(currentTheme);
const changePasswordModal = ref(false);
const waitingChangePassword = ref(false);

watch(themeModel, (theme) => setTheme(theme as TTheme), { immediate: true });

const callbacks = {
  changePasswordStart: () => {
    changePasswordModal.value = true;
  },

  changePasswordStop: () => {
    changePasswordModal.value = false;

    formState.value.currentPassword = '';
    formState.value.newPassword = '';
  },

  changePassword: async () => {
    waitingChangePassword.value = true;

    const changePasswordErrors = await sessionStore.changePassword({
      currentPassword: formState.value.currentPassword,
      newPassword: formState.value.newPassword,
    });

    waitingChangePassword.value = false;

    console.log(changePasswordErrors);

    if (changePasswordErrors) {
      errors.value.message = changePasswordErrors.message;

      errors.value.currentPassword =
        changePasswordErrors.errors.current_password?.[0];
      errors.value.newPassword = changePasswordErrors.errors.new_password?.[0];
    } else {
      errors.value.message = '';
      errors.value.currentPassword = '';
      errors.value.newPassword = '';

      router.push({ name: 'login' });
    }
  },
};
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

    <v-divider class="my-5"></v-divider>

    <CenterWhiteBlock>
      <div class="d-flex justify-center ga-3">
        <v-btn :to="{ name: 'profile.edit' }" color="primary">
          <template #prepend>
            <v-icon icon="mdi-account-edit"></v-icon>
            Изменить данные
          </template>
        </v-btn>

        <v-btn color="secondary" @click="callbacks.changePasswordStart">
          <v-icon icon="mdi-progress-question"></v-icon>
          Сброс пароля
        </v-btn>
      </div>
    </CenterWhiteBlock>
  </PageLayout>

  <v-dialog v-model="changePasswordModal" max-width="500">
    <v-card title="Сброс пароля">
      <form @submit.prevent="callbacks.changePassword">
        <div class="px-5">
          <v-text-field
            v-model="formState.currentPassword"
            :disabled="waitingChangePassword"
            :error-messages="errors.message || errors.currentPassword"
            label="Текущий пароль"
          ></v-text-field>
          <v-text-field
            v-model="formState.newPassword"
            :disabled="waitingChangePassword"
            :error-messages="errors.newPassword"
            label="Новый пароль"
          ></v-text-field>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            :disabled="waitingChangePassword"
            color="primary"
            variant="flat"
            @click="callbacks.changePasswordStop"
          >
            Отмена
          </v-btn>

          <v-btn
            :disabled="isSubmitDisabled"
            :loading="waitingChangePassword"
            color="secondary"
            variant="flat"
            type="submit"
          >
            Изменить
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

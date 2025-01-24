<script setup lang="ts">
import { ref } from 'vue';

import { useFormState } from '@/composables/use-form-state';

import { useDeckStore } from '@/stores/decks';
import CenterWhiteBlock from '@/components/CenterWhiteBlock.vue';
import PageLayout from '@/components/layouts/PageLayout.vue';

const deckStore = useDeckStore();

const waiting = ref(false);
const successSnack = ref(false);

const { data: formState, errors, isSubmitDisabled } = useFormState({
  title: '',
});

const callbacks = {
  createDeck: async () => {
    waiting.value = true;
  
    const createDeckErrors = await deckStore.createDeck({
      title: formState.value.title,
    });

    console.log(createDeckErrors);

    if (createDeckErrors) {
      errors.value.message = createDeckErrors.message;
      errors.value.title = createDeckErrors.errors.title?.[0];

      waiting.value = false;
      return;
    } else {
      errors.value.message = '';
      errors.value.title = '';
    }
  
    waiting.value = false;
  
    formState.value.title = '';
  
    successSnack.value = true;
  },
};
</script>

<template>
  <PageLayout title="Добавить коллекцию">
    <CenterWhiteBlock>
      <form @submit.prevent="callbacks.createDeck">
        <v-text-field
          v-model="formState.title"
          :disabled="waiting"
          :error-messages="errors.title"
          label="Название коллекции"
        />
        <v-btn
          :disabled="isSubmitDisabled || waiting"
          :loading="waiting"
          type="submit"
          color="primary"
          >Создать</v-btn
        >
      </form>
    </CenterWhiteBlock>
  </PageLayout>

  <v-snackbar v-model="successSnack" color="primary">
    <template #actions>
      <div class="pa-3">Коллекция была успешно создана.</div>

      <v-btn color="secondary" variant="flat" @click="successSnack = false">
        Понял
      </v-btn>
    </template>
  </v-snackbar>
</template>

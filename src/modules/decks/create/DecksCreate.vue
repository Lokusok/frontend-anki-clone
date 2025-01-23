<script setup lang="ts">
import { computed, ref, toValue } from 'vue';

import { useDeckStore } from '@/stores/decks';
import CenterWhiteBlock from '@/components/CenterWhiteBlock.vue';
import PageLayout from '@/components/layouts/PageLayout.vue';

const deckStore = useDeckStore();

const waiting = ref(false);
const successSnack = ref(false);

const deck = ref({
  title: '',
});

const isSubmitBtnDisabled = computed(() => {
  return !deck.value.title;
});

const callbacks = {
  createDeck: async () => {
    waiting.value = true;
  
    await deckStore.createDeck(toValue(deck));
  
    waiting.value = false;
  
    deck.value.title = '';
  
    successSnack.value = true;
  };
};
</script>

<template>
  <PageLayout title="Добавить коллекцию">
    <CenterWhiteBlock>
      <form @submit.prevent="callbacks.createDeck">
        <v-text-field
          v-model="deck.title"
          :disabled="waiting"
          label="Название коллекции"
        />
        <v-btn
          :disabled="isSubmitBtnDisabled || waiting"
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

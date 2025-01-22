<script setup lang="ts">
import { computed, onUnmounted, ref, toValue } from 'vue';
import { useRoute } from 'vue-router';

import { useDeckStore } from '@/stores/decks';
import { useQuestionsStore } from '@/stores/questions';

import CenterWhiteBlock from '@/components/CenterWhiteBlock.vue';
import PageLayout from '@/components/layouts/PageLayout.vue';

import { TQuestion } from '@/types/question';
import ContainerQuestionsTable from '../containers/ContainerQuestionsTable.vue';

const route = useRoute();

const decksStore = useDeckStore();
const questionsStore = useQuestionsStore();

questionsStore.getQuestions({ deckId: Number(route.params.id) });

onUnmounted(() => questionsStore.resetState());

const waiting = ref(false);
const successSnack = ref(false);

const waitQuestionDelete = ref(false);
const deleteQuestionDialog = ref(false);
const deleteQuestionId = ref<TQuestion['id'] | null>(null);

const deck = ref({
  title: '',
});

decksStore.getDeck(Number(route.params.id)).then((fetchedDeck) => {
  if (fetchedDeck) {
    deck.value.title = fetchedDeck.title;
  }
});

const isSubmitBtnDisabled = computed(() => {
  return !deck.value.title;
});

const callbacks = {
  updateDeck: async () => {
    waiting.value = true;
  
    await decksStore.createDeck(toValue(deck));
  
    waiting.value = false;
  
    deck.value.title = '';
  
    successSnack.value = true;
  },

  deleteQuestion: async () => {
    console.log('here');
    waitQuestionDelete.value = true;

    await questionsStore.deleteQuestion({
      deckId: String(route.params.id),
      questionId: deleteQuestionId.value,
    });

    callbacks.resetDeleteQuestionDialog();

    waitQuestionDelete.value = false;
  },

  activateDeleteQuestionDialog: (id: TQuestion['id']) => {
    deleteQuestionId.value = id;
    deleteQuestionDialog.value = true;
  },

  resetDeleteQuestionDialog: () => {
    deleteQuestionId.value = null;
    deleteQuestionDialog.value = false;
  },
};
</script>

<template>
  <PageLayout title="Изменить коллекцию">
    <CenterWhiteBlock :style="{ 'min-height': '200px' }">
      <v-btn :to="{ name: 'decks.index' }" color="primary">
        <template #prepend>
          <v-icon icon="mdi-arrow-left-bold-circle" />
        </template>
        К списку
      </v-btn>

      <v-divider class="ma-3"></v-divider>

      <div
        v-if="decksStore.waiting"
        class="d-flex justify-center align-center h-100"
      >
        <v-progress-circular :size="50" color="primary" indeterminate />
      </div>

      <form v-else @submit.prevent="callbacks.updateDeck">
        <v-text-field
          v-model="deck.title"
          :disabled="waiting"
          label="Название коллекции"
        />
        <v-btn
          :disabled="isSubmitBtnDisabled || waiting"
          type="submit"
          color="primary"
        >
          Обновить
        </v-btn
        >
      </form>
    </CenterWhiteBlock>

    <v-divider class="ma-5"></v-divider>

    <ContainerQuestionsTable />
  </PageLayout>
</template>

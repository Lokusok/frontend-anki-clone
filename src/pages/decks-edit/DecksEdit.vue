<script setup lang="ts">
import { computed, onUnmounted, ref, toValue } from 'vue';
import { useRoute } from 'vue-router';

import { useDeckStore } from '../../stores/decks';
import CenterWhiteBlock from '../../components/CenterWhiteBlock.vue';
import PageLayout from '../../components/layouts/PageLayout.vue';
import QuestionsTable from '../../components/QuestionsTable.vue';
import { useQuestionsStore } from '../../stores/questions';

const route = useRoute();

const decksStore = useDeckStore();
const questionsStore = useQuestionsStore();

questionsStore.getQuestions({ deckId: Number(route.params.id) });

onUnmounted(() => questionsStore.resetState());

const waiting = ref(false);
const successSnack = ref(false);

const deck = ref({
  title: '',
});

decksStore.getDeck(Number(route.params.id)).then((fetchedDeck) => {
  deck.value.title = fetchedDeck.title;
});

const isSubmitBtnDisabled = computed(() => {
  return !deck.value.title;
});

const createDeck = async () => {
  waiting.value = true;

  await decksStore.createDeck(toValue(deck));

  waiting.value = false;

  deck.value.title = '';

  successSnack.value = true;
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

      <form v-else @submit.prevent="createDeck">
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

    <v-divider class="ma-5"></v-divider>

    <CenterWhiteBlock>
      <div
        v-if="decksStore.waiting || questionsStore.waiting"
        class="d-flex justify-center align-center h-100"
      >
        <v-progress-circular :size="50" color="primary" indeterminate />
      </div>

      <template v-else>
        <div class="text-center text-h5 font-weight-bold">Вопросы</div>
  
        <QuestionsTable :questions="questionsStore.questions" />
      </template>
    </CenterWhiteBlock>
  </PageLayout>

  <v-snackbar v-model="successSnack" color="primary">
    <template #actions>
      <div class="pa-3">Коллекция была успешно обновлена.</div>

      <v-btn color="secondary" variant="flat" @click="successSnack = false">
        Понял
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import CenterWhiteBlock from '@/components/CenterWhiteBlock.vue';
import PageLayout from '@/components/layouts/PageLayout.vue';

import { useDeckStore } from '@/stores/decks';
import { useQuestionsStore } from '@/stores/questions';

const decksStore = useDeckStore();
const questionsStore = useQuestionsStore();

const decksTitles = ref<{ id: number | string, title: string }[]>([]);
const waitingTitles = ref(true);

decksStore
  .getAllDecksTitles()
  .then((titles) => {
    if (titles) {
      decksTitles.value = titles;
    }
  })
  .finally(() => (waitingTitles.value = false));

const question = ref({
  deckId: '',
  front: '',
  back: '',
  tags: '',
});

const waitingQuestionCreate = ref(false);

const isSubmitBtnDisabled = computed(() => {
  return !question.value.deckId || !question.value.front || !question.value.back;
});

const callbacks = {
  createQuestion: async () => {
    waitingQuestionCreate.value = true;

    await questionsStore.createQuestion({
      deckId: question.value.deckId,
      front: question.value.front,
      back: question.value.back,
      tags: question.value.tags.split(',').map((s) => s.trim()).filter((s) => s.length > 0),
    });

    waitingQuestionCreate.value = false;

    // question.value.deckId = '';
    question.value.front = '';
    question.value.back = '';
    question.value.tags = '';
  },
};
</script>

<template>
  <PageLayout title="Создание вопроса">
    <CenterWhiteBlock>
      <form @submit.prevent="callbacks.createQuestion">
        <v-select
          v-model="question.deckId"
          :loading="waitingTitles"
          :disabled="waitingTitles || waitingQuestionCreate"
          :items="decksTitles"
          item-title="title"
          item-value="id"
          label="Коллекция"
        ></v-select>

        <v-text-field
          v-model="question.front"
          :disabled="waitingQuestionCreate"
          label="Вопрос"
        ></v-text-field>
        <v-text-field
          v-model="question.back"
          :disabled="waitingQuestionCreate"
          label="Ответ"
        ></v-text-field>
        <v-text-field v-model="question.tags" :disabled="waitingQuestionCreate" label="Теги (через запятую)">

        </v-text-field>

        <v-btn
          :disabled="isSubmitBtnDisabled"
          :loading="waitingQuestionCreate"
          type="submit"
          color="primary"
        >
          Создать вопрос
        </v-btn>
      </form>
    </CenterWhiteBlock>
  </PageLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import CenterWhiteBlock from '@/components/CenterWhiteBlock.vue';
import PageLayout from '@/components/layouts/PageLayout.vue';
import BackButton from '@/components/BackButton.vue';

import { useDeckStore } from '@/stores/decks';
import { useQuestionsStore } from '@/stores/questions';

const decksStore = useDeckStore();
const questionsStore = useQuestionsStore();
const route = useRoute();

const decksTitles = ref<{ id: string | number; title: string }[]>([]);
const waitingInit = ref(false);
const successSnack = ref(false);

const question = ref({
  deckId: '' as string | number,
  front: '',
  back: '',
  tags: '',
});

const waitingQuestionUpdate = ref(false);

const isSubmitBtnDisabled = computed(() => {
  return (
    !question.value.deckId || !question.value.front || !question.value.back
  );
});

const inits = {
  loadDecksTitles: async () => {
    const titles = await decksStore.getAllDecksTitles();

    if (titles) {
      decksTitles.value = titles;
    }
  },

  loadCurrentQuestion: async () => {
    const responseQuestion = await questionsStore.getQuestion({
      deckId: String(route.params.deckId),
      questionId: String(route.params.questionId),
    });

    if (responseQuestion) {
      question.value.front = responseQuestion.front;
      question.value.back = responseQuestion.back;
      question.value.deckId = responseQuestion.deck_id;
      question.value.tags = responseQuestion.tags
        .map((t) => t.title)
        .toString();
    }
  },
};

const callbacks = {
  updateQuestion: async () => {
    waitingQuestionUpdate.value = true;

    await questionsStore.updateQuestion({
      id: String(route.params.questionId),
      deckId: question.value.deckId,
      front: question.value.front,
      back: question.value.back,
      tags: question.value.tags
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
    });

    waitingQuestionUpdate.value = false;
    successSnack.value = true;
  },
};

waitingInit.value = true;
Promise.all([
  inits.loadDecksTitles(),
  inits.loadCurrentQuestion(),
]).finally(() => (waitingInit.value = false));
</script>

<template>
  <PageLayout title="Обновление вопроса">
    <CenterWhiteBlock>
      <template #header>
        <BackButton />
      </template>

      <form @submit.prevent="callbacks.updateQuestion">
        <v-select
          v-model="question.deckId"
          :loading="waitingInit"
          :disabled="waitingInit || waitingQuestionUpdate"
          :items="decksTitles"
          item-title="title"
          item-value="id"
          label="Коллекция"
        ></v-select>

        <v-text-field
          v-model="question.front"
          :disabled="waitingInit || waitingQuestionUpdate"
          label="Вопрос"
        ></v-text-field>
        <v-text-field
          v-model="question.back"
          :disabled="waitingInit || waitingQuestionUpdate"
          label="Ответ"
        ></v-text-field>
        <v-text-field
          v-model="question.tags"
          :disabled="waitingInit || waitingQuestionUpdate"
          label="Теги (через запятую)"
        >
        </v-text-field>

        <v-btn
          :disabled="waitingInit || isSubmitBtnDisabled"
          :loading="waitingQuestionUpdate"
          type="submit"
          color="primary"
        >
          Обновить вопрос
        </v-btn>
      </form>
    </CenterWhiteBlock>
  </PageLayout>

  <v-snackbar v-model="successSnack" color="primary" timeout="3000">
    <template #actions>
      <div class="pa-3">Вопрос был успешно обновлён.</div>

      <v-btn color="secondary" variant="flat" @click="successSnack = false">
        Понял
      </v-btn>
    </template>
  </v-snackbar>
</template>

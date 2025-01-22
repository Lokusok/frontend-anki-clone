<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { useQuestionsStore } from '@/stores/questions';

import PageLayout from '@/components/layouts/PageLayout.vue';
import CenterWhiteBlock from '@/components/CenterWhiteBlock.vue';

const questionsStore = useQuestionsStore();
const router = useRouter();
const route = useRoute();

const isShowAnswer = ref(false);
const isWaitingAnswer = ref(false);

const api = {
  getQuestions: () => {
    questionsStore.getQuestions({ deckId: String(route.params.deckId), askReady: true });
  },

  answer: async (type: string) => {
    isWaitingAnswer.value = true;

    await questionsStore.answerToCurrent(type);

    if (questionsStore.isFinalReached) {
        router.replace({ name: 'decks.index' });
    } else {
        callbacks.hideAnswer();
    }

    isWaitingAnswer.value = false;
  },
};

const callbacks = {
  showAnswer: () => (isShowAnswer.value = true),
  hideAnswer: () => (isShowAnswer.value = false),
};

api.getQuestions();

onUnmounted(() => questionsStore.resetState());
</script>

<template>
  <PageLayout title="Вопросы из категории">
    <CenterWhiteBlock>
      <div
        v-if="questionsStore.waiting"
        class="d-flex justify-center align-center h-100"
      >
        <v-progress-circular :size="50" color="primary" indeterminate />
      </div>

      <template v-if="questionsStore.currentQuestion">
        <div class="text-h4 font-weight-bold text-center">
          {{ questionsStore.currentQuestion.front }}
        </div>

        <v-divider class="ma-5"></v-divider>

        <div v-if="isShowAnswer" class="text-center mb-5">
          {{ questionsStore.currentQuestion.back }}
        </div>

        <div class="d-flex justify-center">
          <template v-if="isShowAnswer">
            <v-btn-group variant="outlined" divided>
              <v-btn :disabled="isWaitingAnswer" 
                variant="flat"
                color="primary"
                @click="api.answer('again')"
              >
                Заново
              </v-btn>
              <v-btn :disabled="isWaitingAnswer" color="primary" @click="api.answer('hard')">Тяжело</v-btn>
              <v-btn :disabled="isWaitingAnswer" color="primary" @click="api.answer('good')">Хорошо</v-btn>
              <v-btn :disabled="isWaitingAnswer" variant="flat" color="primary" @click="api.answer('easy')">
                Легко
              </v-btn>
            </v-btn-group>
          </template>

          <template v-else>
            <v-btn color="primary" @click="callbacks.showAnswer">
              Показать ответ
            </v-btn>
          </template>
        </div>
      </template>
    </CenterWhiteBlock>
  </PageLayout>
</template>

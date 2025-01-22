<script setup lang="ts">
import { onMounted, onUnmounted, ref, toValue } from 'vue';
import { useRoute } from 'vue-router';

import { useDeckStore } from '@/stores/decks';
import { useQuestionsStore } from '@/stores/questions';

import CenterWhiteBlock from '@/components/CenterWhiteBlock.vue';
import QuestionsTable from '@/components/QuestionsTable.vue';

import { TQuestion } from '@/types/question';

const props = defineProps<{
    search?: {
        deckId: string[];
        tags: string[];
        query: string;
    }
}>();

onMounted(() => {
    console.log(props.search);
});

const route = useRoute();

const decksStore = useDeckStore();
const questionsStore = useQuestionsStore();

if (! props.search) {
    questionsStore.getQuestions({ deckId: Number(route.params.id) });
} else {
    questionsStore.searchQuestions(toValue(props.search));
}

onUnmounted(() => questionsStore.resetState());

const successSnack = ref(false);

const waitQuestionDelete = ref(false);
const deleteQuestionDialog = ref(false);
const deleteQuestionId = ref<TQuestion['id'] | null>(null);

const callbacks = {
  deleteQuestion: async () => {
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
    <CenterWhiteBlock>
      <div
        v-if="decksStore.waiting || questionsStore.waiting"
        class="d-flex justify-center align-center h-100"
      >
        <v-progress-circular :size="50" color="primary" indeterminate />
      </div>

      <template v-else>
        <div class="text-center text-h5 font-weight-bold">Вопросы</div>

        <QuestionsTable
          v-if="questionsStore.questions.length"
          :deck-id="String($route.params.id)"
          :questions="questionsStore.questions"
          @delete="callbacks.activateDeleteQuestionDialog"
        />

        <div v-else class="d-flex justify-center mt-3">
          <v-btn color="primary" :to="{ name: 'questions.create' }">
            <template #prepend>
              <v-icon icon="mdi-plus"></v-icon>
            </template>
            Добавить вопрос
          </v-btn>
        </div>
      </template>
    </CenterWhiteBlock>

    <v-snackbar v-model="successSnack" color="primary">
    <template #actions>
      <div class="pa-3">Коллекция была успешно обновлена.</div>

      <v-btn color="secondary" variant="flat" @click="successSnack = false">
        Понял
      </v-btn>
    </template>
  </v-snackbar>

  <v-dialog v-model="deleteQuestionDialog" max-width="500">
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <div class="text-h5 ma-2">Подтвердите удаление</div>

        <v-btn
          :disabled="waitQuestionDelete"
          :style="{
            display: $vuetify.display.width < 430 ? 'none' : 'initial',
          }"
          icon="mdi-close"
          variant="text"
          @click="callbacks.resetDeleteQuestionDialog"
        />
      </v-card-title>
      <v-card-text>
        Удалённый вопрос не подлежит восстановлению.
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          :disabled="waitQuestionDelete"
          variant="flat"
          color="primary"
          @click="callbacks.resetDeleteQuestionDialog"
        >
          Отмена
        </v-btn>

        <v-btn
          :loading="waitQuestionDelete"
          variant="flat"
          color="red"
          class="font-weight-bold"
          @click="callbacks.deleteQuestion"
        >
          <template #prepend>
            <v-icon icon="mdi-trash-can" />
          </template>
          Да, удалить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { TDeck } from '../types/deck';
import { TQuestion } from '../types/question';

defineProps<{
  deckId: TDeck['id'];
  questions: TQuestion[];
}>();

defineEmits<{
  delete: [id: TQuestion['id']];
}>();
</script>

<template>
  <v-table fixed-header>
    <thead>
      <tr>
        <th class="text-center font-weight-bold">Вопрос</th>
        <th class="text-center font-weight-bold">Ответ</th>
        <th class="text-center font-weight-bold">Теги</th>
        <th class="text-center font-weight-bold">Готов</th>
        <th class="text-center font-weight-bold">Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="question in $props.questions" :key="question.id">
        <td class="text-center">{{ question.front }}</td>
        <td class="text-center">{{ question.back }}</td>
        <td class="text-center">
          {{ question.tags.map((t) => t.title).join(', ') }}
        </td>
        <td class="text-center">{{ 'TODO' }}</td>
        <td class="d-flex justify-center">
          <div class="d-flex ga-2 py-2">
            <v-btn
              color="secondary"
              icon="mdi-pen"
              size="x-small"
              :to="{
                name: 'questions.edit',
                params: { deckId: $props.deckId, questionId: question.id },
              }"
            ></v-btn>

            <v-btn
              color="red"
              icon="mdi-trash-can"
              size="x-small"
              @click="$emit('delete', question.id)"
            ></v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

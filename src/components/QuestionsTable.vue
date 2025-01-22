<script setup lang="ts">
import { TDeck } from '../types/deck';

defineProps<{
    decks: TDeck[];
}>();

defineEmits<{
    delete: [id: TDeck['id']];
}>();
</script>

<template>
  <v-table fixed-header>
    <thead>
      <tr>
        <th class="text-center font-weight-bold">Название</th>
        <th class="text-center font-weight-bold">Пора/Не пора</th>
        <th class="text-center font-weight-bold">Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="deck in $props.decks" :key="deck.title">
        <td class="text-center">{{ deck.title }}</td>
        <td class="text-center">
          {{ `${deck.ask_ready}/${deck.ask_later}` }}
        </td>
        <td class="d-flex justify-center">
          <div class="d-flex ga-2 py-2">
            <v-btn
              :disabled="deck.ask_ready === 0"
              :to="{ name: 'questions.answer', params: { deckId: deck.id } }"
              color="primary"
              icon="mdi-eye-circle-outline"
              size="x-small"
            ></v-btn>
            <v-btn
              color="secondary"
              icon="mdi-pen"
              size="x-small"
              @click="
                $router.push({
                  name: 'decks.edit',
                  params: { id: deck.id },
                })
              "
            ></v-btn>
            <v-btn
              color="red"
              icon="mdi-trash-can"
              size="x-small"
              @click="$emit('delete', deck.id)"
            ></v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

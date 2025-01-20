<script setup lang="ts">
import CenterWhiteBlock from '../../components/CenterWhiteBlock.vue';
import PageLayout from '../../components/layouts/PageLayout.vue';
import { useDeckStore } from '../../stores/decks';

const decksStore = useDeckStore();

decksStore.getAllDecks();
</script>

<template>
  <PageLayout title="Список коллекций">
    <CenterWhiteBlock :style="{ 'min-height': '300px' }">
      <div v-if="decksStore.waiting" class="d-flex justify-center align-center h-100">
        <v-progress-circular :size="50" color="primary" indeterminate />
      </div>

      <v-table v-else fixed-header height="500px">
        <thead>
          <tr>
            <th class="text-center font-weight-bold">Название</th>
            <th class="text-center font-weight-bold">Пора/Не пора</th>
            <th class="text-center font-weight-bold">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="deck in decksStore.decks" :key="deck.title">
            <td class="text-center">{{ deck.title }}</td>
            <td class="text-center">{{ `${deck.ask_later}/${deck.ask_ready}` }}</td>
            <td class="d-flex justify-center">
              <div class="d-flex ga-2 py-2">
                <v-btn
                  color="primary"
                  icon="mdi-eye-circle-outline"
                  size="x-small"
                ></v-btn>
                <v-btn color="secondary" icon="mdi-pen" size="x-small"></v-btn>
                <v-btn color="red" icon="mdi-trash-can" size="x-small"></v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </CenterWhiteBlock>
  </PageLayout>
</template>

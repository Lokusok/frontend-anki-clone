<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useDeckStore } from '@/stores/decks';

import CenterWhiteBlock from '@/components/CenterWhiteBlock.vue';
import PageLayout from '@/components/layouts/PageLayout.vue';
import DecksTable from '@/components/DecksTable.vue';

import { TDeck } from '@/types/deck';
import { TDeckSearchInput } from '@/types/input/deck';

const decksStore = useDeckStore();
const router = useRouter();
const route = useRoute();

const hasFilters = computed(() => {
  return route.query.deck_id;
});

watchEffect(() => {
  if (hasFilters.value)
    decksStore.getAllDecks(route.query as unknown as TDeckSearchInput);
  else decksStore.getAllDecks();
});

const waitDelete = ref(false);

const deleteDialog = ref(false);
const deleteDeckId = ref<TDeck['id'] | null>(null);

const callbacks = {
  resetFilters: () => {
    router.replace({ query: {} });
  },

  deleteDeck: async () => {
    if (!deleteDeckId.value) {
      return;
    }

    waitDelete.value = true;

    await decksStore.deleteDeck(deleteDeckId.value);

    waitDelete.value = false;

    callbacks.resetDeleteDialog();
  },

  activateDeleteDialog: (id: TDeck['id']) => {
    deleteDeckId.value = id;
    deleteDialog.value = true;
  },

  resetDeleteDialog: () => {
    deleteDeckId.value = null;
    deleteDialog.value = false;
  },
};
</script>

<template>
  <PageLayout title="Список коллекций">
    <div v-if="hasFilters" class="d-flex justify-center mb-4">
      <v-btn color="primary" @click="callbacks.resetFilters">
        <template #prepend>
          <v-icon icon="mdi-trash-can"></v-icon>
        </template>

        Сбросить фильтры
      </v-btn>
    </div>

    <CenterWhiteBlock :style="{ 'min-height': '300px' }">
      <div
        v-if="decksStore.waiting"
        class="d-flex justify-center align-center h-100"
      >
        <v-progress-circular :size="50" color="primary" indeterminate />
      </div>

      <DecksTable
        v-else
        :decks="decksStore.decks"
        @delete="callbacks.activateDeleteDialog"
      />
    </CenterWhiteBlock>
  </PageLayout>

  <v-dialog v-model="deleteDialog" max-width="500">
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <div class="text-h5 ma-2">Подтвердите удаление</div>

        <v-btn
          :disabled="waitDelete"
          icon="mdi-close"
          variant="text"
          @click="callbacks.resetDeleteDialog"
          :style="{
            display: $vuetify.display.width < 430 ? 'none' : 'initial',
          }"
        />
      </v-card-title>
      <v-card-text>
        Удалённая коллекция не подлежит восстановлению
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          :disabled="waitDelete"
          variant="flat"
          color="primary"
          @click="callbacks.resetDeleteDialog"
        >
          Отмена
        </v-btn>

        <v-btn
          :loading="waitDelete"
          variant="flat"
          color="red"
          class="font-weight-bold"
          @click="callbacks.deleteDeck"
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

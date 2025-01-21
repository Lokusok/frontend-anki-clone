<script setup lang="ts">
import { ref } from 'vue';
import CenterWhiteBlock from '../../components/CenterWhiteBlock.vue';
import PageLayout from '../../components/layouts/PageLayout.vue';
import { useDeckStore } from '../../stores/decks';
import { TDeck } from '../../types/deck';

const decksStore = useDeckStore();
decksStore.getAllDecks();

const waitDelete = ref(false);

const deleteDialog = ref(false);
const deleteDeckId = ref<TDeck['id'] | null>(null);

const activateDeleteDialog = (id: TDeck['id']) => {
  deleteDeckId.value = id;
  deleteDialog.value = true;
};

const resetDeleteDialog = () => {
  deleteDeckId.value = null;
  deleteDialog.value = false;
};

const deleteDeck = async () => {
  if (!deleteDeckId.value) {
    return;
  }

  waitDelete.value = true;

  await decksStore.deleteDeck(deleteDeckId.value);

  waitDelete.value = false;

  resetDeleteDialog();
};
</script>

<template>
  <PageLayout title="Список коллекций">
    <CenterWhiteBlock :style="{ 'min-height': '300px' }">
      <div
        v-if="decksStore.waiting"
        class="d-flex justify-center align-center h-100"
      >
        <v-progress-circular :size="50" color="primary" indeterminate />
      </div>

      <v-table v-else fixed-header>
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
            <td class="text-center">
              {{ `${deck.ask_ready}/${deck.ask_later}` }}
            </td>
            <td class="d-flex justify-center">
              <div class="d-flex ga-2 py-2">
                <v-btn
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
                  @click="activateDeleteDialog(deck.id)"
                ></v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </CenterWhiteBlock>
  </PageLayout>

  <v-dialog v-model="deleteDialog" :disabled="waitDelete" max-width="500">
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <div class="text-h5 ma-2">Подтвердите удаление</div>

        <v-btn
          :disabled="waitDelete"
          icon="mdi-close"
          variant="text"
          @click="resetDeleteDialog"
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
          @click="resetDeleteDialog"
        >
          Отмена
        </v-btn>

        <v-btn
          :loading="waitDelete"
          variant="flat"
          color="red"
          class="font-weight-bold"
          @click="deleteDeck"
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

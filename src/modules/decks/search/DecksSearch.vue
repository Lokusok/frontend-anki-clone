<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { useFormState } from '@/composables/use-form-state';
import { useDeckStore } from '@/stores/decks';
import { useTagsStore } from '@/stores/tags';
import { useQuestionsStore } from '@/stores/questions';

import CenterWhiteBlock from '@/components/CenterWhiteBlock.vue';
import PageLayout from '@/components/layouts/PageLayout.vue';

import ContainerQuestionsTable from '../containers/ContainerQuestionsTable.vue';

const decksStore = useDeckStore();
const tagsStore = useTagsStore();
const questionsStore = useQuestionsStore();

const router = useRouter();

decksStore.getAllDecks();
tagsStore.getAllTags();

const isFullSearch = ref(false);
const waitingSearch = ref(false);

const { data: searchData } = useFormState({
  deckId: [],
  tagId: [],
  query: '',
});

const isSubmitDisabled = computed(() => {
  return (
    !searchData.value.deckId.length &&
    !searchData.value.tagId.length &&
    !searchData.value.query
  );
});

const callbacks = {
  search: async () => {
    // Когда пользователь хочет искать только по коллекции
    if (
      searchData.value.deckId.length &&
      !searchData.value.tagId.length &&
      !searchData.value.query
    ) {
      router.push({
        name: 'decks.index',
        query: {
          deck_id: searchData.value.deckId.toString(),
        },
      });
    } else {
      waitingSearch.value = true;

      await questionsStore.searchQuestions({
        deckId: searchData.value.deckId,
        tags: searchData.value.tagId,
        query: searchData.value.query,
      });

      waitingSearch.value = false;

      isFullSearch.value = true;
    }
  },
};
</script>

<template>
  <PageLayout title="Поиск коллекций">
    <CenterWhiteBlock>
      <form @submit.prevent="callbacks.search">
        <div class="d-flex flex-column">
          <v-select
            v-model="searchData.deckId"
            label="Коллекция"
            :items="decksStore.decks"
            :loading="decksStore.waiting || waitingSearch"
            :disabled="decksStore.waiting || waitingSearch"
            hint="Выбор только этого поля приведёт к поиску по коллекциям"
            item-title="title"
            item-value="id"
            multiple
            persistent-hint
            class="mb-4"
          ></v-select>

          <v-select
            v-model="searchData.tagId"
            :items="tagsStore.tags"
            :loading="tagsStore.waiting || waitingSearch"
            :disabled="tagsStore.waiting || waitingSearch"
            multiple
            item-title="title"
            item-value="title"
            label="Тег"
          ></v-select>

          <v-text-field
            v-model="searchData.query"
            label="Содержимое"
            :loading="tagsStore.waiting || waitingSearch"
            :disabled="tagsStore.waiting || waitingSearch"
          ></v-text-field>
        </div>

        <v-divider class="ma-3"></v-divider>

        <v-btn :disabled="isSubmitDisabled || waitingSearch" :loading="waitingSearch" color="primary" type="submit">
          Поиск
        </v-btn>
      </form>
    </CenterWhiteBlock>

    <template v-if="isFullSearch">
      <v-divider class="ma-5"></v-divider>

      <ContainerQuestionsTable />
    </template>
  </PageLayout>
</template>

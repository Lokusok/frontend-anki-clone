<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import CenterWhiteBlock from '../../components/CenterWhiteBlock.vue';
import PageLayout from '../../components/layouts/PageLayout.vue';

import { useDeckStore } from '../../stores/decks';
import { useTagsStore } from '../../stores/tags';
import { useFormState } from '../../composables/use-form-state';

const decksStore = useDeckStore();
const tagsStore = useTagsStore();
const router = useRouter();

decksStore.getAllDecks();
tagsStore.getAllTags();

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
  search: () => {
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
      console.log('FULL SEARCH');
    }
  },
};
</script>

<template>
  <PageLayout title="Поиск коллекций">
    <CenterWhiteBlock>
      <form @submit.prevent="callbacks.search">
        <v-select
          v-model="searchData.deckId"
          label="Коллекция"
          :items="decksStore.decks"
          :loading="decksStore.waiting"
          :disabled="decksStore.waiting"
          item-title="title"
          item-value="id"
          multiple
          persistent-hint
        ></v-select>
        <v-select
          v-model="searchData.tagId"
          :items="tagsStore.tags"
          :loading="tagsStore.waiting"
          :disabled="tagsStore.waiting"
          multiple
          item-title="title"
          item-value="title"
          label="Тег"
        ></v-select>
        <v-text-field
          v-model="searchData.query"
          label="Содержимое"
        ></v-text-field>

        <v-btn :disabled="isSubmitDisabled" color="primary" type="submit">
          Поиск
        </v-btn>
      </form>
    </CenterWhiteBlock>
  </PageLayout>
</template>

<script setup lang="ts">
import CenterWhiteBlock from '../../components/CenterWhiteBlock.vue';
import PageLayout from '../../components/layouts/PageLayout.vue';
import { useDeckStore } from '../../stores/decks';
import { useTagsStore } from '../../stores/tags';
import { useFormState } from '../../composables/use-form-state';
import { computed } from 'vue';

const decksStore = useDeckStore();
const tagsStore = useTagsStore();

decksStore.getAllDecks();
tagsStore.getAllTags();

const { data: searchData } = useFormState({
  deckId: null,
  tagId: null,
  query: '',
});

const isSubmitDisabled = computed(() => {
  return !searchData.value.deckId && !searchData.value.tagId && !searchData.value.query;
});

const callbacks = {
  search: () => {
    console.log('search method');
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

        <v-btn
          :disabled="isSubmitDisabled"
          color="primary"
          type="submit"
          >Поиск</v-btn
        >
      </form>
    </CenterWhiteBlock>
  </PageLayout>
</template>

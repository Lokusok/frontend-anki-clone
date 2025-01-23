<script setup lang="ts">
import { computed } from 'vue';

type TProps = {
    hideIfNoBack?: boolean;
};

const { hideIfNoBack = true } = defineProps<TProps>();

const back = window.history.state.back;

const isShow = computed(() => {
    if (!back && hideIfNoBack) {
        return false;
    }

    return true;
});
</script>

<template>
  <v-btn v-if="isShow" :to="back" color="primary">
    <template #prepend>
      <v-icon icon="mdi-arrow-left-bold-circle" />
    </template>
    Назад
  </v-btn>
</template>

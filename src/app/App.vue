<script setup lang="ts">
import useCounterStore from '../stores/counter';

const counterStore = useCounterStore();
</script>

<template>
  <h1>Vue 3</h1>

  <h3>{{ counterStore.count }} | {{ counterStore.doubleCount }}</h3>

  <button @click="counterStore.increment">Increment</button>

  <RouterView />
</template>
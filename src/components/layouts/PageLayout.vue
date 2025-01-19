<script setup lang="ts">
defineProps<{
  title: string
}>();
</script>

<template>
<div class="py-5">
    <h1 class="text-h4 text-center">{{ $props.title }}</h1>
  </div>

  <v-divider class="pb-5" />

  <slot></slot>
</template>
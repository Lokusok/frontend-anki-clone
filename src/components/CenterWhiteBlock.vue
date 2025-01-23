<template>
  <div class="d-flex justify-center">
    <v-sheet
      v-bind="$attrs"
      :style="{ 'max-width': '1024px', margin: '0 auto', 'flex-grow': 1 }"
      elevation="10"
      class="pa-3 mx-3 rounded-lg"
    >
      <template v-if="$slots.header">
        <slot name="header"></slot>
        <v-divider class="my-3"></v-divider>
      </template>
      <slot></slot>
    </v-sheet>
  </div>
</template>

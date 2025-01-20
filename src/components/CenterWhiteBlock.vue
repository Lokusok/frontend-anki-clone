<template>
  <div class="d-flex justify-center">
    <v-sheet
      :style="{ 'max-width': '1024px', margin: '0 auto', 'flex-grow': 1 }"
      elevation="10"
      class="pa-3 mx-3 rounded-lg"
    >
      <slot></slot>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue';
</script>

<template>
  <v-layout>
    <Header />

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-layout>

  <v-footer color="primary d-flex justify-center py-3" :style="{ 'max-height': '50px' }">
    <span class="font-weight-bold">Anki clone</span>
  </v-footer>
</template>

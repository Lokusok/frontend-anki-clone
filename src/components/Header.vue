<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  isAuth: boolean;
}>();

defineEmits(['logoutClick']);

const drawer = ref(false);
</script>

<template>
  <v-app-bar color="primary">
    <template #prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <template #title>
      <router-link
        :to="{ name: 'home' }"
        class="text-decoration-none text-white"
      >
        <v-icon icon="mdi-list-box-outline" />
        Anki
      </router-link>
    </template>

    <template #append>
      <v-btn v-if="!props.isAuth" :to="{ name: 'login' }"
        >Войти в аккаунт</v-btn
      >
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>

        <v-list>
          <v-list-item v-if="!props.isAuth" :to="{ name: 'register' }">
            Регистрация
          </v-list-item>

          <v-list-item v-if="props.isAuth" @click="$emit('logoutClick')">
            Выйти из аккаунта
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer">
    <v-list>
      <v-list-item :to="{ name: 'decks.index' }">
        <template #prepend>
          <v-icon icon="mdi-view-list" />
        </template>

        Список коллекций
      </v-list-item>

      <v-list-item :to="{ name: 'decks.create' }">
        <template #prepend>
          <v-icon icon="mdi-folder-plus"></v-icon>
        </template>

        Создать коллекцию
      </v-list-item>

      <v-list-item :to="{ name: 'decks.search' }">
        <template #prepend>
          <v-icon icon="mdi-text-search"></v-icon>
        </template>

        Поиск
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

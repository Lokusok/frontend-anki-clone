<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  isAuth: boolean;
  waiting: boolean;
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
      <v-hover>
        <template #default="{ isHovering, props }">
          <router-link
            v-bind="props"
            :to="{ name: 'home' }"
            :style="{ 'opacity': isHovering ? '0.6' : '1' }"
            class="text-decoration-none text-white"
          >
            <v-icon icon="mdi-list-box-outline" />
            Anki
          </router-link>
        </template>
      </v-hover>
    </template>

    <template #append>
      <template v-if="props.waiting">
        <div class="px-5">
          <v-skeleton-loader
            width="100"
            height="30"
            elevation="6"
            :style="{ opacity: 0.7 }"
          />
        </div>
      </template>

      <template v-if="!props.waiting">
        <v-btn v-if="!props.isAuth" :to="{ name: 'login' }">
          Войти в аккаунт
        </v-btn>

        <v-btn v-if="props.isAuth" :to="{ name: 'profile' }"> Профиль </v-btn>
      </template>

      <template v-if="props.waiting">
        <v-skeleton-loader
          class="rounded-circle"
          width="40"
          height="40"
          elevation="6"
          :style="{ opacity: 0.7 }"
        />
      </template>

      <template v-if="!props.waiting">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
          </template>

          <v-list>
            <v-list-item v-if="!props.isAuth" :to="{ name: 'register' }">
              Регистрация
            </v-list-item>

            <template v-if="props.isAuth">
              <v-list-item to="/settings">
                Настройки
              </v-list-item>

              <v-list-item @click="$emit('logoutClick')">
                Выйти из аккаунта
              </v-list-item>
            </template>
          </v-list>
        </v-menu>
      </template>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer">
    <v-list>
      <v-list-item :disabled="!props.isAuth" :to="{ name: 'decks.index' }">
        <template #prepend>
          <v-icon icon="mdi-view-list" />
        </template>

        Список коллекций
      </v-list-item>

      <v-list-item :disabled="!props.isAuth" :to="{ name: 'decks.create' }">
        <template #prepend>
          <v-icon icon="mdi-folder-plus"></v-icon>
        </template>

        Создать коллекцию
      </v-list-item>

      <v-list-item :disabled="!props.isAuth" :to="{ name: 'questions.create' }">
        <template #prepend>
          <v-icon icon="mdi-head-question"></v-icon>
        </template>

        Создание вопроса
      </v-list-item>

      <v-list-item :disabled="!props.isAuth" :to="{ name: 'decks.search' }">
        <template #prepend>
          <v-icon icon="mdi-text-search"></v-icon>
        </template>

        Поиск
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

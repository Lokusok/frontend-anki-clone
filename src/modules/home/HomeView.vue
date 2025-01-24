<script setup lang="ts">
import CenterWhiteBlock from '@/components/CenterWhiteBlock.vue';
import PageLayout from '@/components/layouts/PageLayout.vue';
import { useSessionStore } from '@/stores/session';

import { useStatsStore } from '@/stores/stats';

const statsStore = useStatsStore();
const sessionStore = useSessionStore();
</script>

<template>
  <PageLayout title="Статистика">
    <CenterWhiteBlock>
      <template v-if="sessionStore.isAuth">
        <template v-if="statsStore.waiting">
          <v-row>
            <v-col v-for="n in 4" cols="12" sm="6" md="3" :key="n">
              <v-skeleton-loader width="220" height="100"></v-skeleton-loader>
            </v-col>
          </v-row>
        </template>
  
        <template v-else>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-card elevation="12" class="pa-5 d-flex justify-space-between ga-5">
                <div class="d-flex flex-column ga-1">
                  <div class="text-grey">Коллекций</div>
                  <div class="text-h5 font-weight-bold">{{ statsStore.decksCount }}</div>
                </div>
        
                <div class="d-flex justify-center align-center">
                  <v-icon size="40" icon="mdi-view-list" :style="{ opacity: 0.5 }"></v-icon>
                </div>
              </v-card>
            </v-col>
    
            <v-col cols="12" sm="6" md="3">
              <v-card elevation="12" class="pa-5 d-flex justify-space-between ga-5">
                <div class="d-flex flex-column ga-1">
                  <div class="text-grey">Вопросов</div>
                  <div class="text-h5 font-weight-bold">{{ statsStore.questionsCount }}</div>
                </div>
        
                <div class="d-flex justify-center align-center">
                  <v-icon size="40" icon="mdi-head-question" :style="{ opacity: 0.5 }"></v-icon>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </template>

      <template v-else>
        <div class="font-weight-bold text-center text-h5">
          Для начала работы необходим вход в аккаунт
        </div>
      </template>
    </CenterWhiteBlock>
  </PageLayout>
</template>

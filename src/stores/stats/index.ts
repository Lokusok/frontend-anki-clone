import { defineStore } from 'pinia';
import { statsService } from '@/services/api/stats';

export const useStatsStore = defineStore('statsStore', {
  state: () => ({
    waiting: true,
    decksCount: null as number | null,
    questionsCount: null as number | null,
  }),
  actions: {
    async getStats() {
      this.waiting = true;
      const response = await statsService.getStats();

      if (response) {
        this.decksCount = response.decksCount;
        this.questionsCount = response.questionsCount;
      }

      this.waiting = false;
    },
  },
});

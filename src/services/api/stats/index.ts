import { apiClient } from '..';
import { TStats } from '@/types/stats';

export const statsService = {
  async getStats(): Promise<TStats | null> {
    try {
      const response = await apiClient.get<{ decks_count: number, questions_count: number }>('/api/v1/all/stats');
      return {
        decksCount: response.data.decks_count,
        questionsCount: response.data.questions_count,
      };
    } catch {
      return null;
    }
  },
};

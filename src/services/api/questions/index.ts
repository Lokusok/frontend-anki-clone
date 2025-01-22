import { apiClient } from '..';
import {
  TQuestionInput,
  TQuestionsGetInput,
} from '../../../types/input/question';
import { TQuestion } from '../../../types/question';

export const questionsService = {
  async getQuestions(data: TQuestionsGetInput): Promise<TQuestion[] | null> {
    try {
      const response = await apiClient.get(
        `/api/v1/decks/${data['deckId']}/questions`,
        {
          params: {
            ask_ready: data.askReady ?? false,
            shuffle: true,
          },
        }
      );
      return response.data.data;
    } catch {
      return null;
    }
  },

  async deleteQuestion(data: any): Promise<boolean | null> {
    try {
      const response = await apiClient.delete(`/api/v1/decks/${data['deckId']}/questions/${data['questionId']}`);
      return response.status === 204;
    } catch {
      return null;
    }
  },

  async createQuestion(data: TQuestionInput): Promise<TQuestion | null> {
    try {
      const response = await apiClient.post(
        `/api/v1/decks/${data.deckId}/questions`,
        data
      );
      return response.data.data;
    } catch {
      return null;
    }
  },

  async updateQuestion(data: TQuestionInput & { id: string | number }): Promise<TQuestion | null> {
    try {
        const response = await apiClient.put(
          `/api/v1/decks/${data.deckId}/questions/${data.id}`,
          {
            ...data,
            deck_id: data.deckId,
          }
        );
        return response.data.data;
      } catch {
        return null;
      }
  },

  async answerTo(data: any) {
    try {
      const response = await apiClient.post(
        `/api/v1/decks/${data.deckId}/questions/${data.questionId}/answer`,
        {
          type: data.type,
        }
      );
      return response;
    } catch {
      return null;
    }
  },

  async getQuestion(data: { deckId: string | number, questionId: string | number }): Promise<TQuestion | null> {
    try {
        const response = await apiClient.get(`/api/v1/decks/${data.deckId}/questions/${data.questionId}`);
        return response.data.data;
    } catch {
        return null
    }
  },

  async searchQuestions(data: any) {
    console.log(data.deckId, data.deckId.toString());
    const response = await apiClient.get(`/api/v1/decks/questions/search`, {
      params: {
        deck_id: data.deckId.toString(),
        tags: data.tags.toString(),
        query: data.query,
      }
    });
    console.log(response.data);
    return response.data.data;
  },
};

import { defineStore } from 'pinia';
import { questionsService } from '../../services/api/questions';
import { TQuestionInput, TQuestionsGetInput } from '../../types/input/question';
import { TQuestion } from '../../types/question';
import { TDeck } from '../../types/deck';

export const useQuestionsStore = defineStore('questionsStore', {
  state: () => ({
    waiting: false,
    deckId: null as null | TDeck['id'],
    questions: [] as TQuestion[],
    offset: 0,
  }),
  getters: {
    currentQuestion: (state) => state.questions[state.offset],
    isFinalReached: (state) => state.offset >= state.questions.length,
  },
  actions: {
    async getQuestions(data: TQuestionsGetInput) {
      this.waiting = true;
      this.deckId = data.deckId;

      const questions = await questionsService.getQuestions(data);

      if (questions) {
        this.questions = questions;
      }

      this.waiting = false;
    },

    async createQuestion(data: TQuestionInput) {
      const response = await questionsService.createQuestion(data);
      return response;
    },

    async updateQuestion(data: TQuestionInput & { id: string | number }) {
      const response = await questionsService.updateQuestion(data);
      return response;
    },

    async deleteQuestion(data: any): Promise<boolean | null> {
      const response = await questionsService.deleteQuestion(data);

      if (response) {
        console.log({ response });

        const foundedIndex = this.questions.findIndex((q) => q.id === data.questionId);

        if (foundedIndex !== -1) {
          this.questions.splice(foundedIndex, 1);
        }
      }

      return response;
    },

    async answerToCurrent(type: string) {
      const response = await questionsService.answerTo({
        questionId: this.currentQuestion.id,
        deckId: this.deckId,
        type,
      });

      if (response) {
        this.offset++;
      }
    },

    async getQuestion(data: { deckId: string | number, questionId: string | number }): Promise<TQuestion | null> {
      const response = await questionsService.getQuestion(data);
      return response;
    },

    resetState() {
      this.deckId = null;
      this.questions = [];
      this.offset = 0;
    },
  },
});

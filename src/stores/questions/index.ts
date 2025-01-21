import { defineStore } from "pinia";
import { questionsService } from "../../services/api/questions";
import { TQuestionInput, TQuestionsGetInput } from "../../types/input/question";
import { TQuestion } from "../../types/question";
import { TDeck } from "../../types/deck";

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
            console.log('[CREATED]: ', response);
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

        resetState() {
            this.deckId = null;
            this.questions = [];
            this.offset = 0;
        },
    },
});

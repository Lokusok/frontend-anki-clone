import { defineStore } from "pinia";
import { questionsService } from "../../services/api/questions";
import { TQuestionInput } from "../../types/input/question";

export const useQuestionsStore = defineStore('questionsStore', {
    state: () => ({

    }),
    actions: {
        async createQuestion(data: TQuestionInput) {
            const response = await questionsService.createQuestion(data);
            console.log('[CREATED]: ', response);
            return response;
        },
    },
});

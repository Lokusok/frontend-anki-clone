import { defineStore } from "pinia";
import { questionsService } from "../../services/api/questions";

export const useQuestionsStore = defineStore('questionsStore', {
    state: () => ({

    }),
    actions: {
        async createQuestion(data: any) {
            const response = await questionsService.createQuestion(data);
            console.log('[CREATED]: ', response);
            return response;
        },
    },
});

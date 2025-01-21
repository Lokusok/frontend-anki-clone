import { apiClient } from "..";
import { TQuestionInput, TQuestionsGetInput } from "../../../types/input/question";
import { TQuestion } from "../../../types/question";

export const questionsService = {
    async getQuestions(data: TQuestionsGetInput): Promise<TQuestion[] | null> {
        try {
            const response = await apiClient.get(`/api/v1/decks/${data['deckId']}/questions`, {
                params: {
                    ask_ready: data.askReady ?? false,
                    shuffle: true,
                }
            });
            return response.data.data;
        } catch {
            return null;
        }
    },
    
    async createQuestion(data: TQuestionInput): Promise<object | null> {
        try {
            const response = await apiClient.post(`/api/v1/decks/${data.deckId}/questions`, data);
            return response.data.data;
        } catch {
            return null;
        }
    },

    async answerTo(data: any) {
        try {
            const response = await apiClient.post(`/api/v1/decks/${data.deckId}/questions/${data.questionId}/answer`, {
                type: data.type
            });
            return response;
        } catch {
            return null;
        }
    },
};

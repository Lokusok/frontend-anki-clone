import { apiClient } from "..";
import { TQuestionInput } from "../../../types/input/question";

export const questionsService = {
    async createQuestion(data: TQuestionInput): Promise<object | null> {
        try {
            const response = await apiClient.post(`/api/v1/decks/${data.deckId}/questions`, data);
            return response.data.data;
        } catch {
            return null;
        }
    },
};

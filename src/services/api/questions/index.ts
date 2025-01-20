import { apiClient } from "..";

export const questionsService = {
    async createQuestion(data: any): Promise<object | null> {
        try {
            const response = await apiClient.post(`/api/v1/decks/${data.deckId}/questions`, data);
            return response.data.data;
        } catch {
            return null;
        }
    },
};

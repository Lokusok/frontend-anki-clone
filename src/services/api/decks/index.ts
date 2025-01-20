import { apiClient } from '..';
import { TDeck } from '../../../types/deck';

export const decksService = {
    async createDeck(data: any): Promise<TDeck | null> {
        try {
            const response = await apiClient.post('/api/v1/decks', data);
            console.log(response, '<<<');
            return response.data;
        } catch {
            return null;
        }
    },

    async getAllDecks(): Promise<TDeck[] | null> {
        try {
            const response = await apiClient.get('/api/v1/decks');
            return response.data.data;
        } catch {
            return null;
        }
    },

    async getDeck(id: TDeck['id']): Promise<TDeck | null> {
        try {
            const response = await apiClient.get(`/api/v1/decks/${id}`);
            return response.data.data;
        } catch {
            return null;
        }
    },

    async deleteDeck(id: TDeck['id']): Promise<boolean | null> {
        try {
            const response = await apiClient.delete(`/api/v1/decks/${id}`);
            return response.status === 204;
        } catch {
            return null;
        }
    },
};

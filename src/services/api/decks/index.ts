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
};

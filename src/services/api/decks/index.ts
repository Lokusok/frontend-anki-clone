import { AxiosError } from 'axios';
import { apiClient } from '..';

import { TError } from '@/types/api/error';
import { TDeck } from '@/types/deck';
import { TDeckInput, TDeckSearchInput } from '@/types/input/deck';

export const decksService = {
    async createDeck(data: TDeckInput): Promise<TDeck | TError | null> {
        try {
            const response = await apiClient.post('/api/v1/decks', data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response?.data;
            }

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

    async searchBy(data: TDeckSearchInput): Promise<TDeck[] | null> {
        try {
            const response = await apiClient.get(`/api/v1/decks/search`, {
                params: {
                    deck_id: data.deck_id.toString(),
                },
            });
            return response.data.data;
        } catch {
            return null;
        }
    }
};

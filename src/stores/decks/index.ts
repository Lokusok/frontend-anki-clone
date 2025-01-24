import { defineStore } from 'pinia';

import { decksService } from '@/services/api/decks';

import { TDeckInput, TDeckSearchInput } from '@/types/input/deck';
import { TError } from '@/types/api/error';
import { TDeck } from '@/types/deck';

export const useDeckStore = defineStore('deckStore', {
  state: () => ({
    waiting: true,
    decks: [] as TDeck[],
  }),
  actions: {
    async createDeck(data: TDeckInput): Promise<TError | null> {
      const deck = await decksService.createDeck(data);

      if (deck && !('errors' in deck)) {
        this.decks.push(deck);
        return null;
      }

      return deck;
    },

    async getAllDecks(data?: TDeckSearchInput) {
      this.waiting = true;

      let decks = null;

      if (data) {
        decks = await decksService.searchBy(data);
      } else {
        decks = await decksService.getAllDecks();
      }

      if (decks) {
        this.decks = decks;
      }

      this.waiting = false;
    },

    async getAllDecksTitles(): Promise<{ id: string | number; title: string }[] | null> {
      const decks = await decksService.getAllDecks();

      if (decks) {
        return decks.map((d) => ({
          id: d.id,
          title: d.title,
        }));
      }

      return null;
    },

    async getDeck(id: TDeck['id']): Promise<TDeck | null> {
      this.waiting = true;

      const deck = await decksService.getDeck(id);

      this.waiting = false;

      return deck;
    },

    async deleteDeck(id: TDeck['id']): Promise<boolean | null> {
      const result = await decksService.deleteDeck(id);

      if (result) {
        const foundedIndex = this.decks.findIndex((d) => d.id === id);

        if (foundedIndex !== -1) {
          this.decks.splice(foundedIndex, 1);
        }
      }

      return result;
    },
  },
});

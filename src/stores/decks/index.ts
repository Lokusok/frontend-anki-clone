import { defineStore } from "pinia";
import { decksService } from "../../services/api/decks";
import { TDeck } from "../../types/deck";
import { TDeckInput } from "../../types/input/deck";

export const useDeckStore = defineStore('deckStore', {
    state: () => ({
        waiting: true,
        decks: [] as TDeck[],
    }),
    actions: {
        async createDeck(data: TDeckInput) {
            const deck = await decksService.createDeck(data);

            if (deck) {
                this.decks.push(deck);
            }
        },

        async getAllDecks() {
            this.waiting = true;

            const decks = await decksService.getAllDecks();

            if (decks) {
                this.decks = decks;
            }

            this.waiting = false;
        }
    },
});
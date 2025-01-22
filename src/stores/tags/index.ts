import { defineStore } from "pinia";
import { tagsService } from "../../services/api/tags";

export const useTagsStore = defineStore('tagsStore', {
    state: () => ({
        waiting: false,
        tags: [],
    }),
    actions: {
        async getAllTags() {
            this.waiting = true;

            const tags = await tagsService.getAllTags();

            if (tags) {
                this.tags = tags;
            }

            this.waiting = false;
        },
    },
});
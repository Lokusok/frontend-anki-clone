import { apiClient } from "..";
import { TTag } from "@/types/tag";

export const tagsService = {
    async getAllTags(): Promise<TTag[] | null> {
        try {
            const response = await apiClient.get(`/api/v1/tags`);
            return response.data.data;
        } catch {
            return null;
        }
    },
};

import { apiClient } from "..";

export const tagsService = {
    async getAllTags(): Promise<object | null> {
        try {
            const response = await apiClient.get(`/api/v1/tags`);
            return response.data.data;
        } catch {
            return null;
        }
    },
};

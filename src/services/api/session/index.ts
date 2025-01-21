import { apiClient } from "..";

import { AxiosError } from "axios";
import { TUser } from "../../../types/user";
import { TError } from "../../../types/api/error";

export const sessionService = {
    async registerUser(data: any): Promise<TError | null> {
        try {
            const response = await apiClient.post('/register', data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return error.response.data;
            }

            return null;
        }
    },

    async loginUser(data: any): Promise<TError | null> {
        try {
            await apiClient.post('/login', data);
            return null;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return error.response.data;
            }

            return null;
        }
    },

    async getUser(): Promise<TUser | null> {
        try {
            const response = await apiClient.get('/api/user');
            return response.data;
        } catch {
            return null;
        }
    },

    async logout(): Promise<TUser | null> {
        try {
            const response = await apiClient.post('/logout');
            return response.data;
        } catch {
            return null;
        }
    },
};

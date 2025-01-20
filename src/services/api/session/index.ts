import { AxiosError } from "axios";
import { apiClient } from "..";

export const sessionService = {
    async registerUser(data: any): Promise<object | null> {
        try {
            const response = await apiClient.post('/register', data);
            console.log('REGISTER: ', response.data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return error.response.data;
            }

            return null;
        }
    },

    async loginUser(data: any): Promise<boolean | null> {
        try {
            const response = await apiClient.post('/login', data);
            return response.status === 204;
        } catch (error) {
            return null;
        }
    },

    async getUser() {
        try {
            const response = await apiClient.get('/api/user');
            return response.data;
        } catch {}
    },

    async logout() {
        try {
            const response = await apiClient.post('/logout');
            return response.data;
        } catch {}
    },
};

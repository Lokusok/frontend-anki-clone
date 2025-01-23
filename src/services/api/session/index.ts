import { apiClient } from '..';

import { AxiosError } from 'axios';
import { TUser } from '../../../types/user';
import { TError } from '../../../types/api/error';
import { TUserInputRegister, TUserInputLogin } from '../../../types/input/user';
import { TProfileUpdate } from '@/types/input/profile';

export const sessionService = {
  async registerUser(data: TUserInputRegister): Promise<TError | null> {
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

  async loginUser(data: TUserInputLogin): Promise<TError | null> {
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

  async updateProfile(data: TProfileUpdate) {
    try {
      const response = await apiClient.put(`/api/v1/profile`, data);
      return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data;
        }

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

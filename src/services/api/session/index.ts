import { apiClient } from '..';

import { AxiosError } from 'axios';
import { TUser } from '../../../types/user';
import { TError } from '../../../types/api/error';
import { TUserInputRegister, TUserInputLogin } from '../../../types/input/user';
import { TProfileUpdate } from '@/types/input/profile';
import { TChangePasswordInput, TResetPasswordInput, TSendResetLinkInput } from '@/types/input/credentials';

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

  async changePassword(data: TChangePasswordInput): Promise<TError | null> {
    try {
      await apiClient.post('/change-password', {
        current_password: data.currentPassword,
        new_password: data.newPassword,
      });

      return null;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }

      return null;
    }
  },

  async resetPassword(data: TResetPasswordInput): Promise<TError | null> {
    try {
      await apiClient.post('/reset-password', data);

      return null;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }

      return null;
    }
  },

  async sendResetLink(data: TSendResetLinkInput): Promise<TError | null> {
    try {
      await apiClient.post('/forgot-password', data);
      return null;
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

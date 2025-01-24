import { defineStore } from 'pinia';

import { sessionService } from '@/services/api/session';

import { AUTH_KEY } from '@/config/storage-keys';

import { TUserInputLogin, TUserInputRegister } from '@/types/input/user';
import { TUser } from '@/types/user';
import { TProfileUpdate } from '@/types/input/profile';
import { TError } from '@/types/api/error';
import { TChangePasswordInput, TResetPasswordInput, TSendResetLinkInput } from '@/types/input/credentials';

export const useSessionStore = defineStore('sessionStore', {
  state: () => ({
    init: Boolean(localStorage.getItem(AUTH_KEY)),
    waiting: true,
    session: {
      name: '',
      email: '',
    },
  }),

  getters: {
    isAuth: (state) => state.init || Boolean(state.session.name),
  },

  actions: {
    async registerUser(data: TUserInputRegister) {
      const response = await sessionService.registerUser(data);

      if (!response?.errors) {
        const user = await sessionService.getUser();

        if (user) {
          this.session.name = user.name;
          this.session.email = user.email;
        } else {
          this.logout();
        }

        return;
      }

      return response;
    },

    async loginUser(data: TUserInputLogin) {
      const response = await sessionService.loginUser(data);

      if (!response?.errors) {
        const user = await sessionService.getUser();

        if (user) {
          this.session.name = user.name;
          this.session.email = user.email;

          this.userToStorage(user);
        } else {
          this.logout();
        }

        return;
      }

      return response;
    },

    async startSession() {
      this.waiting = true;

      const dataAuth = JSON.parse(localStorage.getItem(AUTH_KEY) ?? '{}');

      if (localStorage.getItem(AUTH_KEY)) {
        this.session.name = dataAuth.name;
        this.session.email = dataAuth.email;
      }

      const user = await sessionService.getUser();

      if (user) {
        this.init = true;
        this.session.name = user.name;
        this.session.email = user.email;

        this.userToStorage(user);
      } else {
        this.logout();
      }

      this.waiting = false;
    },

    async changePassword(data: TChangePasswordInput): Promise<TError | null> {
      const response = await sessionService.changePassword(data);
      return response;
    },

    async resetPassword(data: TResetPasswordInput): Promise<TError | null> {
      const response = await sessionService.resetPassword(data);
      return response;
    },

    async sendResetLink(data: TSendResetLinkInput): Promise<TError | null> {
      const response = await sessionService.sendResetLink(data);
      return response;
    },

    userToStorage(user: TUser) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ name: user.name, email: user.email }));
    },

    async updateQuestion(data: TProfileUpdate): Promise<TError | null> {
      const updatedUser = await sessionService.updateProfile(data);

      if (updatedUser) {
        this.session.name = updatedUser.name;
        this.session.email = updatedUser.email;
      }

      return updatedUser;
    },

    logout() {
      sessionService.logout();

      localStorage.removeItem(AUTH_KEY);
      this.init = false;
      this.session.name = '';
      this.session.email = '';
    },
  },
});

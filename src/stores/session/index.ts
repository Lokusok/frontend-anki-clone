import { defineStore } from 'pinia';
import { sessionService } from '../../services/api/session';
import { TUserInputLogin, TUserInputRegister } from '../../types/input/user';

const AUTH_KEY = 'SESSION';

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

      if (response && !response.errors) {
        const user = await sessionService.getUser();

        if (user) {
          this.session.name = user.name;
          this.session.email = user.email;
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
        } else {
          this.logout();
        }

        return;
      }

      return response;
    },

    async startSession() {
      this.waiting = true;

      const user = await sessionService.getUser();

      if (user) {
        this.init = true;
        this.session.name = user.name;
        this.session.email = user.email;
      } else {
        this.logout();
      }

      this.waiting = false;
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

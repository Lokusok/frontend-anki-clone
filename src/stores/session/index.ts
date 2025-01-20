import { defineStore } from 'pinia';
import { sessionService } from '../../services/api/session';

export const useSessionStore = defineStore('sessionStore', {
    state: () => ({
        waiting: true,
        session: {
            name: null,
            email: null,
        },
    }),
    getters: {
        isAuth: (state) => Boolean(state.session.name),
    },
    actions: {
        async registerUser(data: any) {
            const response = await sessionService.registerUser(data);

            if (!response.errors) {
                const user = await sessionService.getUser();

                this.session.name = user.name;
                this.session.email = user.email;

                return;
            }

            return response;
        },

        async loginUser(data: any) {
            const response = await sessionService.loginUser(data);

            if (response) {
                const user = await sessionService.getUser();

                this.session.name = user.name;
                this.session.email = user.email;

                return true;
            }
        },

        async startSession() {
            this.waiting = true;

            const user = await sessionService.getUser();

            this.session.name = user.name;
            this.session.email = user.email;
            this.waiting = false;
        },

        logout() {
            sessionService.logout();

            this.session.name = null;
            this.session.email = null;
        },
    },
});

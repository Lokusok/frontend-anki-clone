import { defineStore } from 'pinia';

const useCounterStore = defineStore('counter', {
    state: () => ({
        count: 0
    }),
    getters: {
        doubleCount: (state) => state.count ** 2
    },
    actions: {
        increment() {
            this.count++;
        }
    }
});

export default useCounterStore;

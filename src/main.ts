import { createApp } from 'vue';
import App from './app/App.vue';
import router from './router';
import { createPinia } from 'pinia';

import './globals.css';

// @ts-ignore
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css' 
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const app = createApp(App);
const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

app.use(router);
app.use(pinia);
app.use(vuetify);

app.mount('#app');

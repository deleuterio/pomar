import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import LoadScript from 'vue-plugin-load-script';

// Vuetify
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});

const vueApp = createApp(App);

vueApp.use(LoadScript);
vueApp.use(vuetify);

vueApp.mount('#app');

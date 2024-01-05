import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import LoadScript from 'vue-plugin-load-script';

createApp(App).use(LoadScript).mount('#app')

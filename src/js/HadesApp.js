import { createApp } from 'vue';
import HadesApp from './components/Hades.vue';
import router from './router/index.js';

createApp(HadesApp)
    .use(router)
    .mount('#app');


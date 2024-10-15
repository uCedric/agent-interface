import { createRouter, createWebHistory } from 'vue-router';
import login from '../components/login.vue';
import signup from '../components/signup.vue';
import home from '../components/home.vue';
import chatbot from '../components/chatbot.vue';

const routes = [
  { path: '/', component: login },
  { path: '/home', component: home},
  { path: '/signup', component: signup },
  { path: '/chatbot', component: chatbot }
];

const router = createRouter({
  history: createWebHistory("/Hades.html"),
  routes
});

export default router;

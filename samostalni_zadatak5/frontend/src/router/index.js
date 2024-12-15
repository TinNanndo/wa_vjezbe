import { createRouter, createWebHistory } from 'vue-router';
import Pizze from '../components/Pizze.vue';

const routes = [
  { path: '/', component: Pizze }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
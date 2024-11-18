import { createRouter, createWebHistory } from 'vue-router';
import Proizvodi from '../components/Proizvodi.vue';
import Proizvod from '../components/Proizvod.vue';

const routes = [
  { path: '/', component: Proizvodi },
  { path: '/:id', component: Proizvod }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
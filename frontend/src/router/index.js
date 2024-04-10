import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name:'Home', component: () => import('../pages/All/Home.vue')},
  { path: '/Navigation', name:'Navigation', component: () => import('../pages/Clients/Navigation.vue')},
  { path: '/restaurant/:id', name:'Restaurant', component: () => import('../pages/Clients/Restaurant.vue')},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
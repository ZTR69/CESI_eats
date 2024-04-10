import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name:'Home', component: () => import('../pages/All/Home.vue')},
  { path: '/Navigation', name:'Navigation', component: () => import('../pages/Clients/Navigation.vue')},
  { path: '/restaurant/:id', name:'Restaurant', component: () => import('../pages/Clients/Restaurant.vue')},
  { path: '/login', name:'Login', component: () => import('../pages/All/Login.vue')},
  { path: '/signup', name:'Signup', component: () => import('../pages/All/Signup.vue')},
  { path: '/profile', name:'Profile', component: () => import('../pages/All/Profile.vue')},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
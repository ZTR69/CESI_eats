import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name:'Home', component: () => import('../views/All/Home.vue')},
  { path: '/navigation', name:'Navigation', component: () => import('../views/Clients/Navigation.vue')},
  { path: '/restaurant/:id', name:'Restaurant', component: () => import('../views/Clients/Restaurant.vue')},
  { path: '/login', name:'Login', component: () => import('../views/All/Login.vue')},
  { path: '/signup', name:'signup', component: () => import('../views/All/SignUp.vue')},
  { path: '/profile', name:'Profile', component: () => import('../views/All/Profile/Profile.vue')},
  { path: '/cart', name:'cart', component: () => import('../views/Clients/Cart.vue')},
  { path: '/order-list', name:'OrderList', component: () => import('../views/Delivery/OrderList.vue')},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
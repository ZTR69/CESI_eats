import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/All/Home.vue'
import Login from '../views/All/Login.vue'
import SignUp from '../views/All/SignUp.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUp
        }
    ]
})

export default router
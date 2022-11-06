import { createWebHistory, createRouter } from 'vue-router'
import home from './views/Home/HomeIndex.vue'
import auth from './views/Auth/AuthIndex.vue'
import profile from './views/Profile/ProfileIndex.vue'

const routes = [
    {
        path: '/',
        component: home
    },
    {
        path: '/auth',
        component: auth
    },
    {
        path: '/profile',
        component: profile
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

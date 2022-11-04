import { createWebHistory, createRouter } from 'vue-router'
import home from './views/Home/HomeIndex.vue'
import auth from './views/Auth/AuthIndex.vue'

const routes = [
    {
        path: '/',
        component: home
    },
    {
        path: '/auth',
        component: auth
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

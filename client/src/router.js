import { createWebHistory, createRouter } from 'vue-router'
import home from './views/Home/HomeIndex.vue'

const routes = [
    {
        path: '/',
        component: home
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

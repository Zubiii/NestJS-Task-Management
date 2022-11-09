import { createWebHistory, createRouter } from 'vue-router'
import home from './views/Home/HomeIndex.vue'
import auth from './views/Auth/AuthIndex.vue'
import profile from './views/Profile/ProfileIndex.vue'
import middlewarePipeline from './middleware/middlewarePipeline'
import authMiddleware from './middleware/auth'

const routes = [
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/auth',
        name: 'login',
        component: auth
    },
    {
        path: '/profile',
        name: 'profile',
        component: profile,
        meta: {
            middleware: [
                authMiddleware
            ]
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {

    // Nevigate to the next if middleware is not applied
    if(!to.meta.middleware) return next()

    // Fetch middleware from route
    const middleware = to.meta.middleware 

    const context = {
        to, from, next
    }

    return middleware[0] ({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})

export default router

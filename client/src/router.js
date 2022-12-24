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
        component: home,
        meta: {
            title: "Task Managment"
        }
    },
    {
        path: '/auth',
        name: 'login',
        component: auth,
        meta: {
            title: "Task Managment - Auth"
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: profile,
        meta: {
            title: "Task Managment - Profile",
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

    // Let's Add title to the page
    document.title = `${to.meta.title}`

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

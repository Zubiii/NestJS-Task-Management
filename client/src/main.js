import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import VueFeather from 'vue-feather';
import Notifications from '@kyvg/vue3-notification'

// Layouts
import HeaderLayout from './layouts/HeaderLayout'



const app = createApp(App)

app.use(router)
app.use(Notifications)
app.component(VueFeather.name, VueFeather);
app.component('HeaderLayout', HeaderLayout)


app.mount('#app')

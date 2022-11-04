import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import axios from 'axios'
import VuewAxios from 'vue-axios'

createApp(App).use(router, VuewAxios, axios).mount('#app')

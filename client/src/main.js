import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import VueFeather from 'vue-feather';
import Notifications from '@kyvg/vue3-notification'
import { vfmPlugin } from 'vue-final-modal'

// Layouts
import HeaderLayout from './layouts/HeaderLayout'
import CustomButton from './components/Buttons/CustomButton'



const app = createApp(App)

app.use(router)
app.use(Notifications)
app.use(vfmPlugin)
app.component(VueFeather.name, VueFeather);
app.component('HeaderLayout', HeaderLayout)
app.component("CustomBtn", CustomButton)


app.mount('#app')

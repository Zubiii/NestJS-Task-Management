<template>
  <div id="test" class="flex flex-col justify-center p-4"> <!-- LOGIN -->
        <div class="flex flex-col justify-center">
            <p class="text-xl font-bold mb-1 text-orange400">Login</p>
            <p class="font-medium text-orange400/90">Welcome to Task Managment</p>
        </div>
        <div class="flex flex-col justify-center">
            <p class="font-medium text-red">{{ error.message }}</p>
        </div>
        <div class="mt-3">
            <input class="p-1 px-3 rounded font-bold" type="name" placeholder="Username" required />
        </div>
        <div class="mt-3">
            <input class="p-1 px-3 rounded font-bold" type="password" placeholder="Password" required />
        </div>
        <div>
            <OrangeBgBtnVue @click="login">
                Login
            </OrangeBgBtnVue>
        </div>
    </div>
</template>

<script>
import OrangeBgBtnVue from '@/components/Buttons/OrangeBgBtn.vue';
import { reactive, toRefs } from '@vue/reactivity';
import axios from 'axios';

export default {
    setup() {
        const state = reactive({
            error: {
                message: '',
                code: ''
            }
        })

        return {
            ...toRefs(state)
        }
    },
    components: {
        OrangeBgBtnVue
    },
    methods: {
        async login() {
            const data = await axios.get('http://localhost:3000/api/auth/test').then( res => res.data)
            console.log("Data => ", data)
        }
    }
}
</script>

<style>
#test{
    width: 50%;
    margin: auto;
}
</style>
<template>
  <div id="test" class="flex flex-col justify-center p-4"> <!-- LOGIN -->
        <div class="flex flex-col justify-center">
            <p class="text-xl font-bold mb-1 text-orange400">Login</p>
            <p class="font-medium text-orange400/90">Welcome to Task Managment</p>
        </div>
        <div class="mt-3 flex flex-col justify-center">
            <input class="p-1 px-3 rounded font-bold" v-model="username" type="text" placeholder="Username" required />
        </div>
        <div class="mt-3 flex flex-col justify-center">
            <input class="p-1 px-3 rounded font-bold" v-model="password" type="password" placeholder="Password" required />
        </div>
        <div class="flex flex-col justify-center mt-2">
            <p class="font-medium text-red">{{ error.message }}</p>
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
import AuthService from '@/services/auth'
const authService = new AuthService;

export default {
    setup() {
        const state = reactive({
            username: '',
            password: '',
            error: {
                message: '',
                code: '',
                statusCode: ''
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
            const signin = await authService.signin(this.username, this.password)
            if(signin.error) {
                this.error = signin
            }
            if(signin.username) {
                this.$router.push('/profile')
            }
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
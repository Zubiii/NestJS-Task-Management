<template>
    <div id="test" class="flex flex-col justify-center p-4">
        <!-- LOGIN -->
        <div class="flex flex-col justify-center">
            <p class="text-xl font-bold mb-1 text-orange400">Register</p>
            <p class="font-medium text-orange400/90">Welcome to Task Managment</p>
        </div>
        <div class="mt-3 flex flex-col justify-center">
            <input class="p-1 px-3 rounded font-bold" v-model="username" type="text" placeholder="Username" required />
        </div>
        <div class="mt-3 flex flex-col justify-center">
            <input class="p-1 px-3 rounded font-bold" v-model="password" type="password" placeholder="Password"
                required />
        </div>
        <div class="flex flex-col justify-center mt-2" v-if="Array.isArray(error.message)">
            <div v-for="message in error.message" :key="message">
                <p class="font-medium text-red">{{ message }}</p>
            </div>
        </div>
        <div class="flex flex-col justify-center mt-2" v-else>
            <p class="font-medium text-red">{{ error.message }}</p>
        </div>
        <div>
            <OrangeBgBtnVue class="mt-3" @click="register">
                Sign Up
            </OrangeBgBtnVue>
        </div>
    </div>
</template>
  
<script>
import OrangeBgBtnVue from '@/components/Buttons/OrangeBgBtn.vue';
import { reactive, toRefs } from '@vue/reactivity';
import AuthService from '@/services/auth'
const authService = new AuthService;
import { notify } from "@kyvg/vue3-notification";

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
        async register() {
            const signup = await authService.signup(this.username, this.password)
            if (signup.error) {
                this.error = signup
                return 
            }
            if (signup.message) {
                notify({
                    title: "SignUp",
                    text: `${this.username} You have successfully Register. Now you can login into your Account`,
                    type: "success"
                })
                this.$router.push('/auth')
            }
        }
    }
}
</script>
  
<style>
#test {
    width: 50%;
    margin: auto;
}
</style>
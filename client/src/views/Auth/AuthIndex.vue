<template>
    <div class="flex flex-col justify-center h-screen bg-stone ">
        <div>
            <SignIn />
            <div class="flex flex-row justify-center">
                <div v-if="authModule === 'login'">
                    <OrangeBgButnVue @click="ToggleSignup()">
                        Login
                    </OrangeBgButnVue>
                </div>
                <div v-else >
                    <OrangeBgButnVue @click="ToggleLogin()">
                        SignUp
                    </OrangeBgButnVue>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import OrangeBgButnVue from '@/components/Buttons/OrangeBgButn.vue'
import SignIn from './SignIn.vue'
export default {
    setup() {
        const state = reactive({
            authModule: 'login'
        })
        return {
            ...toRefs(state)
        }
    },
    methods: {
        ToggleLogin() {
            this.authModule = 'login'
        },
        ToggleSignup() {
            this.authModule = 'signup'
        }
    },
    components: {
        OrangeBgButnVue,
        SignIn
    }
}
</script>

<template>
    <div class="h-screen bg-stone flex flex-col justify-center">
        <div class=" ">
            <SignIn v-if="authModule !== 'login'" />
            <SignUp v-else/>
            <div class="flex flex-row justify-center">
                <div v-if="authModule === 'login'">
                    <DarkBgButnVue @click="ToggleSignup()">
                        Alreadey have an Account? <strong>Login</strong>
                    </DarkBgButnVue>
                </div>
                <div v-else >
                    <DarkBgButnVue @click="ToggleLogin()">
                        Create new Account <strong>SignUp</strong>
                    </DarkBgButnVue>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import DarkBgButnVue from '@/components/Buttons/DarkBgButn.vue'
import SignIn from './SignIn.vue'
import SignUp from './SignUp.vue'
export default {
    setup() {
        const state = reactive({
            authModule: 'signup'
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
        DarkBgButnVue,
        SignIn,
        SignUp
    }
}
</script>

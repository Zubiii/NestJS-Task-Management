<template>
    <div class="flex flex-row px-10 pt-5">
        <div class="flex-1 w-50 text-start">
            <h2 class="font-bold text-orange400 text-xl">Task Managment</h2>
        </div>
        <div class="flex-1 w-50 flex flex-row-reverse">
            <TransparentBtn class="flex btn-h-l" @click="logout">
                <vue-feather type="log-out"></vue-feather>Logout
            </TransparentBtn>
        </div>
    </div>
</template>

<script>
import TransparentBtn from '@/components/Buttons/TransparentBtn.vue'
import AuthService from '@/services/auth';
const Auth = new AuthService()

export default {
    components: {
        TransparentBtn
    },
    methods: {
        logout() {
            Auth.logout()
            this.$router.push('/')
        }
    }
}
</script>

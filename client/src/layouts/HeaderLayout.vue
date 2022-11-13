<template>
    <div class="flex flex-row-reverse px-10">
        <TransparentBtn class="mt-4 flex" @click="logout">
            <vue-feather type="log-out"></vue-feather>Logout
        </TransparentBtn>
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

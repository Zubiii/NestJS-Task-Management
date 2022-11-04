<template>
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
</template>

<script>
export default {

}
</script>

<style>

</style>
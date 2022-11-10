<template>
  <div class="bg-stone h-screen">
    <div class="flex flex-col">
      <div class="m-10 bg-orange400/30 p-10 w-100 rounded-lg text-left">
        <h1 class="uppercase font-bold">Hello {{ username }}!</h1>
        <p class="font-medium">
          Welcome back to Task Managment Board
        </p>
      </div>
    </div>
    <div>
      Your other part will go here
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
export default {
  setup() {
    const state = reactive({
      username: localStorage.getItem('username')
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style>

</style>
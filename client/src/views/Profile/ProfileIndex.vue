<template>
  <div class="bg-stone h-screen">
    <div class="flex flex-row-reverse px-10">
      <TransparentBtn class="mt-4 flex">
        <vue-feather type="log-out"></vue-feather>Logout
      </TransparentBtn>
    </div>
    <div class="flex flex-col">
      <div class="m-10 bg-orange400/30 p-10 w-100 rounded-lg text-left">
        <h1 class="uppercase font-bold">Hello {{ username }}!</h1>
        <p class="font-medium">
          Welcome back to Task Managment Board
        </p>
        <OrangeBgBtnVue class="mt-4 flex">
          <vue-feather type="plus"></vue-feather>Add New Task
        </OrangeBgBtnVue>
      </div>
    </div>
    <div>
      Your other part will go here
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import OrangeBgBtnVue from '@/components/Buttons/OrangeBgBtn.vue'
import TransparentBtn from '@/components/Buttons/TransparentBtn.vue'

export default {
  setup() {
    const state = reactive({
      username: localStorage.getItem('username')
    })
    return {
      ...toRefs(state)
    }
  },
  components: {
    OrangeBgBtnVue,
    TransparentBtn
  }
}
</script>

<style>

</style>
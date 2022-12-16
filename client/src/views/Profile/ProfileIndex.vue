<template>
  <div class="bg-stone pb-10">
    <header-layout></header-layout>
    <div class="flex flex-col">
      <div class="shadow m-10 bg-orange400/30 p-6 w-100 rounded-lg text-left">
        <h1 class="uppercase font-bold">Hello {{ username }}!</h1>
        <p class="font-medium">
          Welcome back to Task Managment Board
        </p>
        <OrangeBgBtnVue class="mt-4 flex btn-h-l">
          <vue-feather type="plus"></vue-feather>Add New Task
        </OrangeBgBtnVue>
      </div>
    </div>
    <div class="mx-10 vh-100">
      <TaskDraggable
        :tasks="usrTasks"
        :loading="loading"
        @taskDrag="fetchTasks"
      ></TaskDraggable>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import OrangeBgBtnVue from '@/components/Buttons/OrangeBgBtn.vue'
import TaskDraggable from './TaskDraggable/IndexTasks.vue'
import Tasks from '../../services/tasks'
const tasks = new Tasks()

export default {
  async created() {
    this.loading = true
    console.log('Loading: ', this.loading)
    
    this.usrTasks = await tasks.getTasks()
    console.log("_tasks: ", await this.usrTasks)

    this.loading = false
    console.log('Loading: ', this.loading)
  },
  setup() {
    const state = reactive({
      username: localStorage.getItem('username'),
      loading: null,
      usrTasks: null
    })
    return {
      ...toRefs(state)
    }
  },
  components: {
    OrangeBgBtnVue,
    TaskDraggable
  },
  methods: {
    async fetchTasks() {
      this.usrTasks = await tasks.getTasks()
    }
  }
}
</script>
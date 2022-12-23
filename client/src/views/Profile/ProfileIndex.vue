<template>
  <div class="bg-stone pb-10">
    <header-layout></header-layout>
    <div class="flex flex-col">
      <div class="shadow m-10 bg-orange400/30 p-6 w-100 rounded-lg text-left">
        <h1 class="uppercase font-bold">Hello {{ username }}!</h1>
        <p class="font-medium">
          Welcome back to Task Managment Board
        </p>
        <OrangeBgBtnVue class="mt-4 flex btn-h-l" @click="addTaskModal">
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
    <!-- Add Task Modal -->
    <vue-final-modal name="AddTask" v-model="taskModal" classes="flex justify-center items-center">
      <div class="bg-white rounded p-4">
        <!-- Heading -->
        <div class="text-left">
          <span class="font-bold text-orange400">Add New Task</span>
        </div>
        <hr class="text-orange400 mb-4">
        <!-- Body -->
        <div class="mt-5">
          <div class="flex-row my-2">
            <span class="font-bold w-full">
              Title
            </span>
            <Field v-model="newTask.title" name="title" type="text" class="px-2 w-full rounded border border-solid border-orange400 text-center" required placeholder="Enter your Task Title" :rules="isRequired" />
            <ErrorMessage name="title" class="text-orange400 font-semibold" />
            <!-- <input v-model="newTask.title" > -->
          </div>
          <div class="flex-row my-2">
            <span class="font-bold">
              Description
            </span>
            <Field v-model="newTask.description" name="description" :rules="isRequired">
              <textarea v-model="newTask.description" cols="50" rows="10" class="px-2 w-full rounded border border-solid border-orange400 text-center" required placeholder="Enter your Task Description"></textarea>
            </Field>
            <ErrorMessage name="description" class="text-orange400 font-semibold" />
          </div>
        </div>
        <!-- Actions -->
        <div class="flex justify-end">
          <CustomBtn classes="btn-h-l m-3 border border-solid border-orange400" @click="closeNewTaskModel">
            <span class="text-orange400">Cancel</span>
          </CustomBtn>
          <CustomBtn class="btn-h-l m-3 bg-orange400 px-4" @click="AddNewTask">
            Add
          </CustomBtn>
        </div>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import OrangeBgBtnVue from '@/components/Buttons/OrangeBgBtn.vue'
import TaskDraggable from './TaskDraggable/IndexTasks.vue'
import {Field, ErrorMessage} from 'vee-validate'
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
      usrTasks: null,
      taskModal: false,
      validationAddTask: null,
      newTask: {
        title: '',
        description: ''
      }
    })
    return {
      ...toRefs(state)
    }
  },
  components: {
    OrangeBgBtnVue,
    TaskDraggable,
    Field,
    ErrorMessage
  },
  methods: {
    async fetchTasks() {
      this.usrTasks = await tasks.getTasks()
    },
    addTaskModal() {
      this.taskModal = true
    },
    closeNewTaskModel() {
      this.$vfm.hide('AddTask')
    },
    isRequired(value) {
      if (value && value.trim()) {
        this.validationAddTask = true
        return true;
      }
      this.validationAddTask = false
      return 'This is required';
    },
    async AddNewTask() {
      if(!this.validationAddTask) return 
      let newTask = await tasks.createNewTask(this.newTask.title, this.newTask.description)
      this.newTask.title = '' 
      this.newTask.description = ''
      this.closeNewTaskModel()
      this.usrTasks.push(newTask)
    }
  }
}
</script>
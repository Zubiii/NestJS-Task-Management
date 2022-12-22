<template>
  <div>
    <div v-if="!loading">
      <div class="rounded-lg bg-white min-h-screen flex flex-row p-6">

        <div class="p-2" @drop="onDrop($event, 'OPEN')" @dragover.prevent @dragenter.prevent>
          <h2 class="font-bold text-purple">OPEN</h2>
  
          <div v-if="startTasks.length">
            <div v-for="task in startTasks" :key="task.id" @click="openModalExample(task)">
              <TaskDraggableVue class="mt-2 p-2 rounded-lg bg-purple/30 cursor-pointer" draggable="true" @dragstart="startDrag($event, task)" :task="task"/>
            </div>
          </div>
          <NotFoundVue v-else />

        </div>

        <div class="p-2" @drop="onDrop($event, 'IN_PROGRESS')" @dragover.prevent @dragenter.prevent>
          <h2 class="font-bold text-yellow">IN PROGRESS</h2>
      
          <div v-if="inProgressTasks.length">
            <div v-for="task in inProgressTasks" :key="task.id" @click="openModalExample(task)">
              <TaskDraggableVue class="mt-2 p-2 rounded-lg bg-yellow/30 cursor-pointer" draggable="true" @dragstart="startDrag($event, task)" :task="task"/>
            </div>
          </div>
          <NotFoundVue v-else />
        </div>

        <div class="p-2" @drop="onDrop($event, 'DONE')" @dragover.prevent @dragenter.prevent>
          <h2 class="font-bold text-green">DONE</h2>
          
          <div v-if="doneTasks.length">
            <div v-for="task in doneTasks" :key="task.id" @click="openModalExample(task)">
              <TaskDraggableVue class="mt-2 p-2 rounded-lg bg-green/30 cursor-pointer" draggable="true" @dragstart="startDrag($event, task)" :task="task"/>
            </div>
          </div>
          <NotFoundVue v-else />
        </div>

      </div>
    </div>
    <vue-feather v-else type="rotate-cw" animation="spin" animation-speed="fast"> Loading Tasks</vue-feather>
    <!-- Show Modal -->
    <vue-final-modal v-model="showModal" name="showTask" classes="flex justify-center items-center">
      <div class="bg-white rounded p-4 text-left">
        <div class="flex justify-between">
          <!-- Title -->
          <input v-if="edit" v-model="modalData.title" class="px-2 rounded font-bold border border-solid w-full" type="text">
          <span v-else class="text-2xl font-bold" name="title">{{ modalData.title }}</span>

          <!-- Edit icon -->
          <span v-if="(modalData.status !== 'DONE' && edit === false)" :class="'btn-h-l font-bold cursor-pointer text-center' + classForShowTask(modalData, 'text-color')" @click="showEditTask"><vue-feather class="h-4" type="edit-3"></vue-feather> Edit</span>
        </div>
        <hr :class="'mt-3' + classForShowTask(modalData, 'text-color') ">
        <div class="mt-4" name="body">
          <textarea v-if="edit" v-model="modalData.description" cols="50" rows="10" class="px-2"></textarea>
          <span v-else>{{ modalData.description }}</span>
        </div>
        <!-- Buttons -->
        <div class="flex justify-between mt-3">
          <CustomBtn v-if="edit" class="btn-h-l cursor-pointer" @click="hideEditTask" :classes="'rounded border border-solid' + classForShowTask(modalData, 'text-color')">
            Cancel
          </CustomBtn>
          <CustomBtn v-if="edit" class="btn-h-l cursor-pointer" @click="hideEditTask" :classes="classForShowTask(modalData, 'bg-color')">
            Done
          </CustomBtn>
          <CustomBtn v-if="!edit" class="btn-h-l cursor-pointer" @click="closeTask" :classes="'rounded border border-solid' + classForShowTask(modalData, 'text-color')">
            Close
          </CustomBtn>
        </div>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import NotFoundVue from './NotFound.vue'
import TaskDraggableVue from './TaskDraggable.vue'
import Tasks from '../../../services/tasks'
const tasksApi = new Tasks()

export default {
  components: {
    NotFoundVue,
    TaskDraggableVue
  },
  data() {
    return {
      modalData: {},
      showModal: false,
      edit: false
    }
  },
  props: {
    tasks: Array,
    loading: Boolean
  },
  computed: {
    startTasks: {
      get() {
        return this.tasks.filter( t => t.status === 'OPEN')
      }
    },
    inProgressTasks: {
      get() {
        return this.tasks.filter( t => t.status === 'IN_PROGRESS')
      }
    },
    doneTasks: {
      get() {
        return this.tasks.filter( t => t.status === 'DONE')
      }
    }
  },

  /**
   *  Two approches for drag item, we can send data to dataTransfer Objects by using setData(). But it is not compatibale
   *  check this link: https://stackoverflow.com/questions/11927309/html5-dnd-datatransfer-setdata-or-getdata-not-working-in-every-browser-except-fi
   *  And another method is Local Storage. I used Local Storage.
   */
  methods: {
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      localStorage.setItem('itemID', item.id)
      localStorage.setItem('itemSTATUS', item.status)
    },
    async onDrop(evt, colStatus) {
      const itemID =localStorage.getItem('itemID')
      const itemSTATUS =localStorage.getItem('itemSTATUS')
      if(colStatus !== itemSTATUS) {
        await tasksApi.updateTaskStatus(colStatus, itemID)
        this.$emit('taskDrag')
      }
    },
    openModalExample(task) {
      this.edit = false
      this.modalData = task
      this.$vfm.show('showTask')
    },
    showEditTask() {
      this.edit = true
    },
    hideEditTask() {
      this.edit = false
    },
    closeTask() {
      this.$vfm.hide('showTask')
    },
    classForShowTask(task, obj) {
      if(task?.status === 'OPEN') {
        if(obj === 'text-color'){
          return " text-purple"
        }
        if(obj === 'bg-color'){
          return " bg-purple"
        }
      }
      if(task?.status === 'IN_PROGRESS') {
        if(obj === 'text-color'){
          return " text-yellow"
        }
        if(obj === 'bg-color'){
          return " bg-yellow"
        }
      }
      if(task?.status === 'DONE') {
        if(obj === 'text-color'){
          return " text-green"
        }
        if(obj === 'bg-color'){
          return " bg-green"
        }
      }
    }
  }
}
</script>
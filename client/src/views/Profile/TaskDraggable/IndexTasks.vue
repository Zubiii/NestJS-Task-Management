<template>
  <div>
    <div v-if="!loading">
      <div class="rounded-lg bg-white min-h-screen flex flex-row p-6">
        
        <div class="p-2" @drop="onDrop($event, 'OPEN')" @dragover.prevent @dragenter.prevent>
          <h2 class="font-bold text-purple">START</h2>
  
          <div v-if="startTasks.length">
            <div v-for="task in startTasks" :key="task.id">
              <TaskDraggableVue class="mt-2 p-2 rounded-lg bg-purple/30" draggable="true" @dragstart="startDrag($event, task)" :task="task"/>
            </div>
          </div>
          <NotFoundVue v-else />

        </div>

        <div class="p-2" @drop="onDrop($event, 'IN_PROGRESS')" @dragover.prevent @dragenter.prevent>
          <h2 class="font-bold text-yellow">IN PROGRESS</h2>
      
          <div v-if="inProgressTasks.length">
            <div v-for="task in inProgressTasks" :key="task.id">
              <TaskDraggableVue class="mt-2 p-2 rounded-lg bg-yellow/30" draggable="true" @dragstart="startDrag($event, task)" :task="task"/>
            </div>
          </div>
          <NotFoundVue v-else />
        </div>

        <div class="p-2" @drop="onDrop($event, 'DONE')" @dragover.prevent @dragenter.prevent>
          <h2 class="font-bold text-green">DONE</h2>
          
          <div v-if="doneTasks.length">
            <div v-for="task in doneTasks" :key="task.id">
              <TaskDraggableVue class="mt-2 p-2 rounded-lg bg-green/30" draggable="true" @dragstart="startDrag($event, task)" :task="task"/>
            </div>
          </div>
          <NotFoundVue v-else />
        </div>

      </div>
    </div>
    <vue-feather v-else type="rotate-cw" animation="spin" animation-speed="fast"> Loading Tasks</vue-feather>
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
    }
  }
}
</script>
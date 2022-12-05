<template>
  <Container
    class="h-full flex overflow-x-auto gap-8 outline outline-orange400/20 outline-2 rounded-lg p-2"
    group-name="cols"
    tag="div"
    orientation="horizontal">
    <Draggable class=" bg-orange400/20 rounded-lg h-full w-96 flex-shrink-0 shadow-xl"
      v-for="column in scene.children" :key="column.id">
      <div class="h-full flex flex-col">

        <!-- header-->
        <div class="cursor-move rounded-t-lg p-4 space-x-4 bg-primary text-black flex space-x-2">
          <span class="text-lg">{{ column.name }}</span>
        </div>
        <!-- column -->
        <Container
          class="flex-grow overflow-y-auto overflow-x-hidden bg-stone"
          orientation="vertical"
          group-name="col-items"
          :shouldAcceptDrop="(e, payload) =>  (e.groupName === 'col-items' && !payload.loading)"
          :get-child-payload="getCardPayload(column.id)"
          :drop-placeholder="{ className: 
            `bg-primary bg-opacity-20  
            border-dotted border-2 
            border-primary rounded-lg mx-4 my-2`, 
          animationDuration: '200', 
          showOnTop: true }"
          drag-class="bg-primary dark:bg-primary 
            border-2 border-primary-hover text-white 
            transition duration-100 ease-in z-50
            transform rotate-6 scale-110"
          drop-class="transition duration-100 
            ease-in z-50 transform 
            -rotate-2 scale-90"
          @drop="(e) => onCardDrop(column.id, e)">

            <!-- Items -->
            <KanbanItem v-for="item in column.children" :key="item.id" :item="item"></KanbanItem>
        </Container>
      </div>
    </Draggable>
  </Container>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag, generateItems, generateWords } from '../../../helpers/Vue3Smooth.js'
import KanbanItem from '../../../components/KanbanItem.vue'
// mock
const scene = {
  type: 'container',
  props: {
    orientation: 'horizontal'
  },
  children: generateItems(3, i => ({
    id: `column${i}`,
    type: 'container',
    name: generateWords(Math.random() * 2 + 1),
    props: {
      orientation: 'vertical',
    },
    children: generateItems(+(Math.random() * 10).toFixed() + 5, j => ({
      type: 'draggable',
      id: `${i}${j}`,
      loading: false,
      data: generateWords(Math.random() * 12 + 2)
    }))
  }))
}
export default {
  components: { Container, Draggable, KanbanItem},
  data () {
    return {
      scene,
    }
  },
  mounted(){},
  methods: {
    getColumnHeightPx(){
      let kanban = document.getElementById('kanbanContainer');
      return kanban ? kanban.offsetHeight - 122 : 0;
    },
    onCardDrop (columnId, dropResult) {
      // check if element where ADDED or REMOVED in current collumn
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        
        const scene = Object.assign({}, this.scene)
        const column = scene.children.filter(p => p.id === columnId)[0]
        const itemIndex = scene.children.indexOf(column)
        const newColumn = Object.assign({}, column)
        
        // check if element was ADDED in current column
        if((dropResult.removedIndex == null && dropResult.addedIndex >= 0)){
          // your action / api call
          dropResult.payload.loading = true
          // simulate api call
          setTimeout(function(){ dropResult.payload.loading = false }, (Math.random() * 5000) + 1000); 
        }
        
        newColumn.children = applyDrag(newColumn.children, dropResult)
        scene.children.splice(itemIndex, 1, newColumn)
        this.scene = scene
      }
    },
    getCardPayload (columnId) {
      return index => {
        return this.scene.children.filter(p => p.id === columnId)[0].children[index]
      }
    },
  }
}
</script>
<style>
/** NB: dont remove, 
* When using orientation="horizontal" it auto sets "display: table"
* In this case we need flex and not display table  
*/
.smooth-dnd-container.horizontal{
  display: flex !important;
}
</style>
<template>
    <Draggable v-if="item">
      <div class="cursor-move my-2 mx-4 rounded-lg shadow-md dark:bg-gray-800 hover:border-2 border-primary">
        <div v-if="item.loading" class="flex space-x-2 rounded-lg bg-orange400/75 text-gray-900 dark:text-gray-200 dark:bg-gray-900 px-4 py-2 rounded-t-lg">
          <span>Processing...</span>
        </div>
        <div class="p-4 space-y-2 bg-white rounded-lg">
          <div class="rounded-lg bg-primary p-2 w-max h-max inline-block box-content  ">
            {{emoji}}
          </div>
        <p>{{ item.data }}</p>
        </div>
      </div>
    </Draggable>
  </template>
  
  <script>
  import { getRandomEmoji } from '../helpers/Vue3Smooth'
  import { Draggable } from 'vue3-smooth-dnd'
  export default {
    name: "KanbanItem",
    components: { Draggable },
    data(){ 
      return {
        emoji: getRandomEmoji()
      }
    },
    props: {
      item: Object,
    },
  };
  </script>
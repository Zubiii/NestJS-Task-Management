<template>
  <div>
    <div v-if="!loading">{{ JSON.stringify(tasks) }}</div>
    <vue-feather v-else type="rotate-cw" animation="spin" animation-speed="fast"> Loading Tasks</vue-feather>
  </div>
</template>

<script>

export default {
  components: { 
    //
  },
  data () {
    return {
      columnNames: [
        { 
          id: 1, 
          name: 'START',
          children: null
        }, 
        { 
          id: 2,
          name: 'IN PROGRESS',
          children: null
        }, 
        { 
          id: 3, 
          name: 'DONE',
          children: null
        }
      ]
    }
  },
  created(){
    //
  },
  props: {
    tasks: Array,
    loading: Boolean
  },
  methods: {
    //
  }
}
</script>
<style>
/*  */
</style>
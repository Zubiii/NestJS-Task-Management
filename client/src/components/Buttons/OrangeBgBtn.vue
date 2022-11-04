<template>
    <button
        class="
            cursor-pointer  
            text-md
            text-white
            font-bold
            m-4 
            bg-orange400
            px-2 
            py-1
            rounded   
            drop-shadow-lg
        ">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'OrangeBgButton'
}
</script>

<style>

</style>
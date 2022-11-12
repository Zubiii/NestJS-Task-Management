<template>
    <button
        class="
            cursor-pointer  
            text-md
            text-white
            font-bold
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
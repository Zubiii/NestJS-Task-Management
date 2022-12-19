<template>
    <button
        :class="classes"
        class="
            cursor-pointer  
            text-md
            text-white
            font-bold
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
    name: 'CustomBtn',
    props: {
        classes: String
    }
}
</script>
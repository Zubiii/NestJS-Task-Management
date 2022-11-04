<template>
    <p
        class="
            cursor-pointer  
            text-sm
            text-white
            m-4 
            bg-zinic800/60 
            px-2 
            rounded-full    
            drop-shadow-lg
        ">
        <slot></slot>
    </p>
</template>
<script>
export default {
    name: 'DarkBgButton'
}
</script>
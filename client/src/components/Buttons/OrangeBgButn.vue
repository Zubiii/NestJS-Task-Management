<template>
    <p
        class="
            cursor-pointer 
            text-slate-100 
            text-sm
            m-4 
            bg-orange400/60 
            px-4 
            py-1 
            rounded-full
            font-bold
            drop-shadow-lg
        ">
        <slot></slot>
    </p>
</template>
<script>
export default {
    name: 'OrangeBgButton'
}
</script>
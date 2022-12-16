<template>
    <div>
        <h1 class="font-bold">{{ task.title }}</h1>
        <p>{{ task.description.slice(0, 60) + '...' }}</p>
    </div>
</template>

<script>
export default {
    props: {
        task: Object
    }
}
</script>

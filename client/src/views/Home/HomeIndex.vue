<template>
  <div class="justify-center flex flex-col bg-stone items-center h-screen">
    <div class="m-4">
      <div class="text-4xl max-sm:text-2xl">
        Welcome to Task Managment 🚀
      </div>
      <p class="text-slate-100 text-lg italic">"A good plan can help with risk analyses but it will never guarantee the
        smooth running of the project."</p>
      <div>
        <OutlineBtn redirecTo="/auth">Login</OutlineBtn>
      </div>
    </div>
  </div>
</template>

<script>
import OutlineBtn from '@/components/Buttons/OutlineBtn.vue';

export default {
    setup() {
    },
    components: { OutlineBtn }
}
</script>
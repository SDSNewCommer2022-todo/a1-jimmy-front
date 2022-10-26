<template>
  <div id="task">
    <todo-top/>
    <br><br><br><br>
    {{$store.state.userName}}

  </div>

</template>

<script>
import TodoTop from '@/components/TodoTop.vue';
// import TodoInput from '@/components/TodoInput';

export default {
  components: {
    TodoTop
  }
};


</script>

<style scoped>

</style>

<template>
  <div class="todo">
    <todo-top/>
    <div class="todo__greet">Good afternoon, {{$store.state.userName}}.</div>


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

<style scoped lang="scss">
  .todo{
    &__greet{
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 36px;

      margin-top: 72px;
      margin-left: 60px;
    }
  }
</style>

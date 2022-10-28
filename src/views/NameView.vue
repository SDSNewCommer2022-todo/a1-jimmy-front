<script setup>

</script>

<template>
  <div class="name">
    <todo-top />
    <div class="todo-content">
      <div class="todo-content__welcome">
          Welcome Newbie!!<br>
          MyTodo makes it easy to stay organized and manage your life.
      </div>
      <div class="todo-content__question">What is your name? </div>
      <TodoInput
        class="todo-input"
        :is-name-page="true"

       />
    </div>
  </div>
</template>

<script>
import TodoTop from '@/components/TodoTop.vue';
import TodoInput from '@/components/TodoInput';

export default {
  components : {
    TodoTop, TodoInput
  }
};
</script>

<style scoped lang="scss">
  .todo-content{
    margin-top: 60px;
    margin-left: 120px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;

    line-height: 42px;
    color: #2C3E50;

    &__welcome{
      font-size: 28px;

    }

    &__question{
      margin-top: 24px;
      font-weight: bold;
      font-size: 48px;
    }
  }
  .todo-input{
    margin-top: 20px;
  }

</style>

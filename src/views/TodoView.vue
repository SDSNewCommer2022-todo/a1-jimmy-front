<template>
  <div class="todo">
    <todo-top />
    <div class="todo__greet">{{ greeting }}, {{ $store.state.userName }}.</div>
    <div class="todo__task-count">
      <div class="todo__task-count__head">You've got</div>
      <div class="todo__task-count__content">{{total_task_count}} / {{finished_task_count}}</div>
      <div class="todo__task-count__tail">task Today!</div>
    </div>
  </div>
</template>

<script>
import C from "../const/TodoTaskViewConst"
import TodoTop from '@/components/TodoTop.vue';

export default {
  components : {
    TodoTop
  },
  data() {
    return {
      greeting            : '',
      total_task_count    : 0,
      finished_task_count : 0
    }
  },
  mounted() {
    this.setGreeting();
  },
  methods : {
    setGreeting() {
      let current_hour = new Date().getHours();
      if (current_hour >= 7 && current_hour < 12)
        this.greeting = C.GREET.MORNING;
      else if (current_hour >= 12 && current_hour < 18)
        this.greeting = C.GREET.AFTERNOON;
      else if (current_hour >= 18 && current_hour < 22)
        this.greeting = C.GREET.EVENING;
      else
        this.greeting = C.GREET.NIGHT;
    }
  }
};
</script>

<style scoped lang="scss">
.todo {
  font-family: 'Roboto';
  font-style: normal;

  &__greet {
    font-weight: 400;
    font-size: 24px;
    line-height: 36px;
    margin-top: 24px;
    margin-left: 60px;
  }
s
  &__task-count {
    margin-top: 16px;
    margin-left: 60px;
    font-weight: 400;
    font-size: 24px;
    line-height: 36px;
    height: 36px;
    color: #2C3E50;
    &__head {

    }

    &__content {
      height: 72px;
      font-weight: 700;
      font-size: 48px;
      line-height: 72px;
    }

    &__tail {

    }
  }

}
</style>

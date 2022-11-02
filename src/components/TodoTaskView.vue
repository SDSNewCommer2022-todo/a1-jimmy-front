<template>
  <div class="task-view">
    <div class="task-view__no-task" :class="total_task_count === 0 ? '' : 'display-none'">
      {{ no_task_description }}
    </div>
    <div :class="total_task_count !== 0 ? '' : 'display-none'">
      <div class="task-view__top">
        <div class="task-view__top_dropdown">
          <todo-drop-down :dropdown-contents="dropbox_contents" />
        </div>
        <div class="task-view__top__clear">
          <img
            :src="is_clear_btn_hover ? IC_TASK_CLEAR_BTN_HOVER : IC_TASK_CLEAR_BTN"
            class="task-view__top__clear__img"
            @mouseover="is_clear_btn_hover = true"
            @mouseleave="is_clear_btn_hover = false"
          />
        </div>
      </div>
      <div class="task-view__list">
        <TodoTaskViewComp
          v-for="(task, index) in tasks"
          :key="index"
          :task="task"
          @refresh='$emit("refresh")'
        />
      </div>
    </div>
  </div>
</template>

<script>
import IC_TASK_CLEAR_BTN from '@/assets/ic_task_clear_btn.png';
import IC_TASK_CLEAR_BTN_HOVER from '@/assets/ic_task_clear_btn_hover.png';
import TodoDropDown from '@/components/TodoDropDown';
import TodoTaskViewComp from '@/components/TodoTaskViewComp';

export default {
  name       : 'TodoTaskView',
  components : {
    TodoDropDown,
    TodoTaskViewComp
  },

  props : {
    tasks : {
      state : false
    },
    total_task_count : {
      state : false
    }
  },
  data() {
    return {
      no_task_description     : 'There is no task.',
      dropbox_contents        : ['Oldest', 'Latest'],
      is_clear_btn_hover      : false,
      IC_TASK_CLEAR_BTN       : IC_TASK_CLEAR_BTN,
      IC_TASK_CLEAR_BTN_HOVER : IC_TASK_CLEAR_BTN_HOVER,
    }
  },
  methods : {

  }
};
</script>

<style scoped lang="scss">
.task-view {
  display: inline-block;
  margin-top: 40px;
  width: 100%;
  min-height: 50%;
  background-color: #F2F2F2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;

  &__no-task {
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    opacity: 0.6;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    background-color: #f2f2f2;
  }

  &__top {
    //width: 100%;
    height: 40px;
    margin-top: 24px;
    margin-left: 60px;
    margin-right: 60px;

    &__dropdown{
      display: inline-block;
      height: 60px;
    }
    &__clear {
      display: inline-block;
      float: right;
    }

  }

  &__list{
    margin-top: 24px;
    margin-left: 60px;
    margin-right: 60px;
    margin-bottom: 24px;
  }

}


.display-none {
  display: none;
}
</style>

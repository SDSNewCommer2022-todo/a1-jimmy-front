<template>
  <div class="todo">
    <div class="todo__upper">
    <todo-top />
    <div class="todo__upper__greet">{{ greeting }}, {{ $store.state.userName }}.</div>
     <div class="todo__upper__task-count">
      <div class="todo__upper__task-count__head">You've got</div>
      <div class="todo__upper__task-count__content">{{ registered_task_count }} / {{total_task_count }}</div>
      <div class="todo__upper__task-count__tail">task Today!</div>
      <TodoInput
        class="todo__upper__task-count__input"
        :is-name-page="false"
        @sendBtnClickEvent="newTaskSaveRequest"
      />
     </div>
    </div>
    <div class="todo__lower" >
      <div
        class="todo__lower__no-task"
        :class="total_task_count === 0 ? '' : 'display-none'"
      >There is no task.</div>
      <div :class="total_task_count !== 0 ? '' : 'display-none'">
        <div class="todo__lower__dropdown">
          <todo-drop-down :dropdown-contents="dropbox_contents"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import C from "../const/TodoTaskViewConst"
import TodoTop from '@/components/TodoTop.vue';
import TodoInput from '@/components/TodoInput';
import TodoDropDown from '@/components/TodoDropDown';

import axios from 'axios';

export default {
  components : {
    TodoDropDown,
    TodoInput,
    TodoTop
  },
  data() {
    return {
      greeting              : '',
      total_task_count      : 0,
      registered_task_count : 0,
      task_description      : '',
      dropbox_contents      : ['Oldest', 'Latest']
    }
  },
  mounted() {
    this.setGreeting();
    this.getTasksByName();
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
    },
    getTasksByName(){
      let name = this.$store.state.userName;

      axios.post('http://localhost:8080/task/get-all-task',{
        name : name
      }).then((res)=>{
        this.total_task_count = res.data.filter((el) => el.status != "DELETED").length
        this.registered_task_count = res.data.filter((el) => el.status == "REGISTERED").length
      })
    },
    newTaskSaveRequest(input_text){
      let owner = this.$store.state.userName;
      axios.post('http://localhost:8080/task/save',{
        owner   : owner,
        content : input_text
      }).then(()=>{
        this.getTasksByName();
      })
    },

  }
};
</script>

<style scoped lang="scss">
.todo {
  font-family: 'Roboto';
  font-style: normal;
  height: 100%;
  &__upper {
    display: inline-block;
    &__greet {
      font-weight: 400;
      font-size: 24px;
      line-height: 36px;
      margin-top: 24px;
      margin-left: 60px;
    }

    &__task-count {
      margin-top: 16px;
      margin-left: 60px;
      font-weight: 400;
      font-size: 24px;
      line-height: 36px;
      height: 36px;
      color: #2C3E50;

      &__content {
        height: 72px;
        font-weight: 700;
        font-size: 48px;
        line-height: 72px;
      }

      &__input {
        margin-top: 16px;
      }
    }
  }

  &__lower{
    display: inline-block;
    margin-top: 40px;
    width: 100%;
    height: 50%;
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
    &__dropdown{
      margin-left: 60px;
      margin-top: 24px;
    }
    &__list {

    }
  }

  .display-none {
    display: none;
  }
}
</style>

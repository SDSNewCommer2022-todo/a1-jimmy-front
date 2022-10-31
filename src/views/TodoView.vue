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
    <div class="todo__lower">
      <div class="todo__lower__list">
      </div>
    </div>
  </div>
</template>

<script>
import C from "../const/TodoTaskViewConst"
import TodoTop from '@/components/TodoTop.vue';
import TodoInput from '@/components/TodoInput';
import axios from 'axios';

export default {
  components : {
    TodoInput,
    TodoTop
  },
  data() {
    return {
      greeting              : '',
      total_task_count      : 0,
      registered_task_count : 0
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
        this.total_task_count = res.data.filter(el => el.status != "DELETED").length
        this.registered_task_count = res.data.filter(el => el.status == "REGISTERED").length
      })
    },
    newTaskSaveRequest(input_text){
      let owner = this.$store.state.userName;
      axios.post('http://localhost:8080/task/save',{
        owner   : owner,
        content : input_text
      }).then(()=>{
        window.location.reload();
      })
    },

  }
};
</script>

<style scoped lang="scss">
.todo {
  height: 100%;
  font-family: 'Roboto';
  font-style: normal;
  &__upper {
    display: inline-block;
    height: 50%;
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

      &__input {
        margin-top: 16px;
      }
    }
  }

  &__lower{
    display: inline-block;
    margin-top: 40px;
    width: 100%;

    background-color: #F2F2F2;


    &__list {

    }
  }

}
</style>

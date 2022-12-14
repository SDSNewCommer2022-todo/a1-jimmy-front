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
    <TodoTaskView
      :tasks="tasks"
      :total_task_count="total_task_count"
      :task_order="task_order"
      @refresh="refreshEventListener"
      @dropDownChange="dropDownChangeContentListener"
    />
  </div>
</template>

<script>
import C from "../const/TodoConst"
import STATUS from "@/const/TodoConst"
import TodoTop from '@/components/TodoTop.vue';
import TodoInput from '@/components/TodoInput';
import TodoTaskView from '@/components/TodoTaskView';
import { addTaskRequest, getAllTasksByNameRequest } from '@/requests/TodoRequest';

export default {
  components : {
    TodoInput,
    TodoTop,
    TodoTaskView
  },
  data() {
    return {
      tasks                 : [],
      greeting              : '',
      total_task_count      : 0,
      registered_task_count : 0,
      task_description      : '',
      task_order            : "Oldest"
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
    refreshEventListener(){
      this.getTasksByName();
    },
    dropDownChangeContentListener(order) {
      this.task_order = order;
      this.sortTasksOrderByDate();
    },
    getTasksByName(){
      let name = this.$store.state.userName;
      getAllTasksByNameRequest(name)
        .then((res)=>{
          this.tasks = res.data.filter((el)=>el.status !== STATUS.TASK_STATUS.DELETED);
          this.total_task_count = this.tasks.length
          this.registered_task_count = res.data.filter((el) => el.status === STATUS.TASK_STATUS.REGISTERED).length
          this.sortTasksOrderByDate();
        })
    },
    newTaskSaveRequest(input_text){
      let owner = this.$store.state.userName;
      addTaskRequest(owner, input_text)
        .then(()=>{
          this.getTasksByName();
        })

    },
    sortTasksOrderByDate(){
      if(this.task_order === "Oldest") {
        this.tasks.sort((t1, t2) => {
          return new Date(t1.created_time) - new Date(t2.created_time)
        });
      }
      else{
        this.tasks.sort((t1, t2) => {
          return new Date(t2.created_time) - new Date(t1.created_time)
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.todo {
  height: 100%;
  width: 100%;
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
  .display-none {
    display: none;
  }
}
</style>


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/task")
public class TodoController {
@PostMapping("/new-task")
public void newTask(@RequestBody Map<String, Object> requestData){
requestData.forEach((key, value) -> {
System.out.println("key : " + key);
System.out.println("value : " + value);
});
}
}
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
      >
        {{no_task_description}}
      </div>
      <div :class="total_task_count !== 0 ? '' : 'display-none'">
        <div class="todo__lower__dropdown">
          <todo-drop-down :dropdown-contents="dropbox_contents"/>
        </div>
        <div class="todo__lower__clear">
          <img
            :src="is_clear_btn_hover ?  clear_btn_image_hover : clear_btn_image"
            class="todo__lower__clear__img"
            @mouseover="is_clear_btn_hover=true"
            @mouseleave="is_clear_btn_hover=false">
        </div>
        <div class="todo__lower__list">
          <div
            v-for="(task, index) in tasks"
            :key="index"
            class="todo__lower__list__content"
          >
            <input type="checkbox" class="todo__lower__list__content__checkbox"/>
            <div class="todo__lower__list__content__text">
              {{task.content}}
            </div>
            <div class="todo__lower__list__content__right">
              <div class="todo__lower__list__content__right__date">
                {{toDate(task.created_time)}}
              </div>
              <div class="todo__lower__list__content__right__remove">
                <img :src="remove_btn_image" class="todo__lower__list__content__right__remove__img"/>
              </div>
            </div>
          </div>
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
import IC_TASK_CLEAR_BTN from '@/assets/ic_task_clear_btn.png'
import IC_TASK_CLEAR_BTN_HOVER from'@/assets/ic_task_clear_btn_hover.png'
import IC_CHECKBOX_NOR from '@/assets/ic_checkbox_nor.png'
import IC_CHECKBOX_HOV from '@/assets/ic_checkbox_hov.png'
import IC_BTN_REMOVE from'@/assets/ic_btn_remove.png'

import axios from 'axios';

export default {
  components : {
    TodoDropDown,
    TodoInput,
    TodoTop
  },
  data() {
    return {
      tasks                 : [],
      greeting              : '',
      no_task_description   : 'There is no task.',
      total_task_count      : 0,
      registered_task_count : 0,
      task_description      : '',
      dropbox_contents      : ['Oldest', 'Latest'],
      is_clear_btn_hover    : false,
      clear_btn_image       : IC_TASK_CLEAR_BTN,
      clear_btn_image_hover : IC_TASK_CLEAR_BTN_HOVER,
      check_box_image_nor   : IC_CHECKBOX_NOR,
      check_box_image_hov   : IC_CHECKBOX_HOV,
      remove_btn_image      : IC_BTN_REMOVE
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
        this.tasks = res.data;
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
    toDate(datetime){
      var date = new Date(datetime);
      return date.getMonth()+1 + '/' + date.getDate();
    }
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
    &__dropdown{
      display: inline-block;
      margin-left: 60px;
      margin-top: 24px;
    }
    &__clear {
      margin-top: 24px;
      margin-right: 60px;
      float: right;
      &__img{

      }
    }

    &__list{
      margin-top: 24px;
      margin-left: 60px;
      margin-right: 60px;
      margin-bottom: 24px;

      &__content {
        height: 60px;
        width: 100%;
        background-color: #FFFFFF;
        border: 1px solid #2A82F0;
        border-radius: 4px;
        line-height: 60px;
        margin-top: 8px;
        //padding-left: 16px;

        &__checkbox {
          display: inline-block;
          margin-left: 16px;
          border: 1px solid #CCCCCC;
          border-color: #CCCCCC;
          //line-height: 60px;
        }

        &__text {
          display: inline-block;
          margin-left: 12px;
        }

        &__right {
          display: inline-block;
          float: right;
          margin-right: 18px;
          &__date {
            display: inline-block;
            color: #000000;
            font-size: 12px;
            margin-right: 12px;
            opacity: 0.6;
          }

          &__remove {
            cursor: pointer;
            display: inline-block;
            line-height: 60px;
            &__img{
              vertical-align: middle;
              width: 28px;
              height: 28px;
            }
          }
        }
      }
    }

  }
  d
  .display-none {
    display: none;
  }
}
</style>

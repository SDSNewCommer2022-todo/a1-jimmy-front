<template>
  <div class="task-comp">
    <img
       :class='task.status === TASK_STATUS_REGISTERED ? "task-comp__checkbox": "task-comp__checkbox-checked"'
        :src='task.status === TASK_STATUS_REGISTERED ? IC_CHECKBOX : IC_CHECKBOX_CHECKED'
       @click="updateTaskStatus"
      >
    <div
      :class='task.status === TASK_STATUS_COMPLETED ? "task-comp__text-checked" : ""'
      class="task-comp__text">
      {{ task.content }}
    </div>
    <div class="task-comp__right">
      <div class="task-comp__right__date">
        {{ toDate(task.created_time) }}
      </div>
      <div class="task-comp__right__remove">
        <img
          :src="IC_BTN_REMOVE"
          class="task-comp__right__remove__img"/>
      </div>
    </div>
  </div>
</template>

<script>
import C from '@/const/TodoTaskViewCompConst'
import IC_CHECKBOX from '@/assets/ic_checkbox_nor.svg'
import IC_CHECKBOX_CHECKED from '@/assets/ic_checkbox_hov.svg'
import IC_BTN_REMOVE from '@/assets/ic_btn_remove.png'
import IC_BTN_REMOVE_HOVER from '@/assets/ic_btn_remove_hov.png'
import axios from 'axios';
import API from '@/const/ApiConst';

export default {
  name  : 'TodoTaskViewComp',
  props : {
    task : {
      state : false
    }
  },
  data() {
    return {
      IC_CHECKBOX,
      IC_CHECKBOX_CHECKED,
      IC_BTN_REMOVE,
      IC_BTN_REMOVE_HOVER,
      TASK_STATUS_REGISTERED : C.TASK_STATUS.REGISTERED,
      TASK_STATUS_COMPLETED  : C.TASK_STATUS.COMPLETED,
      TASK_STATUS_DELETED    : C.TASK_STATUS.DELETED
    }
  },
  methods : {
    toDate(datetime){
      var date = new Date(datetime);
      return date.getMonth()+1 + '/' + date.getDate();
    },
    async updateTaskStatus(){
      var status = "";
      if(this.task.status === C.TASK_STATUS.REGISTERED)
        status = C.TASK_STATUS.COMPLETED;
      else
        status = C.TASK_STATUS.REGISTERED;

      axios.patch(API.POST.TASK_STATUS,{
        id : this.task.id,
        status
      }).then(()=>{
         this.$emit("refresh");
      }).finally(

      )
      //
      // await updateTaskStatus(this.task.id, status);
      // await this.$emit("refresh");
      // ->await가 동작하지 않는것인지 62-67번 라인에서의 동작과 달리 값이 변경되기전
      //  refresh 이벤트가 발생해버립니다.
    },
  }
};
</script>

<style scoped lang="scss">
.task-comp{
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  height: 60px;
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 4px;
  line-height: 60px;
  margin-top: 8px;


  &__checkbox {
    width: 28px;
    height: 28px;
    margin-left: 16px;
    &:hover{
      @extend .task-comp__checkbox;
      background-color: rgb(0,0,0,0.1);
      border-radius: 50%;
    }
  }

  &__checkbox-checked {
    width: 28px;
    height: 28px;
    margin-left: 16px;
    &:hover{
      @extend .task-comp__checkbox;
      background-color: rgb(42,130,240, 0.1);
      border-radius: 50%;
    }
  }

  &__text {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
    margin-left: 20px;
    flex-grow:1;
  }
  &__text-checked {
    text-decoration: line-through;
  }

  &__right {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
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
</style>

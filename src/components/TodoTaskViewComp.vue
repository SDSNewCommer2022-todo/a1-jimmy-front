<template>
  <div>
    <div
v-if="isEditing"
         v-click-outside="sendBtnClickListener"
         class="task-comp__edit"
    >
      <input
        id="edit_textbox"
        ref="edit_textbox"
        :class='edit_content ? "task-comp__edit__inputbox" : "task-comp__edit__inputbox--empty"'
        :value="edit_content"
        placeholder="enter your task"
        @input="editInputChange"
        @keyup.enter="sendBtnClickListener"
      />
      <img
        :class='edit_content ? "task-comp__edit__sendbtn" : "task-comp__edit__sendbtn-empty"'
        :src="edit_content ? IC_VECTOR_BLUE : IC_VECTOR_GREY"
        @click="sendBtnClickListener"
      >
    </div>
    <div v-if="!isEditing" class="task-comp">
      <img
        :class='task.status === TASK_STATUS_REGISTERED ? "task-comp__checkbox": "task-comp__checkbox-checked"'
        :src='task.status === TASK_STATUS_REGISTERED ? IC_CHECKBOX : IC_CHECKBOX_CHECKED'
        @click="updateTaskStatus"
      >
      <div
        :class='task.status === TASK_STATUS_COMPLETED ? "task-comp__text-checked" : ""'
        class="task-comp__text"
        @click="toEditingMode"
        @focusout="isEditing=false"
      >
        {{ task.content }}
      </div>
      <div
        class="task-comp__right"
      >
        <div class="task-comp__right__date">
          {{ toDate(task.created_time) }}
        </div>
        <div class="task-comp__right__remove">
          <img
            :src="isDelBtnHover ? IC_BTN_REMOVE_HOVER : IC_BTN_REMOVE"
            class="task-comp__right__remove__img"
            @mouseover="isDelBtnHover=true"
            @mouseleave="isDelBtnHover=false"
            @click="deleteTaskRequest"
          />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import C from '@/const/TodoTaskViewCompConst'
import vClickOutside from 'v-click-outside'
import IC_CHECKBOX from '@/assets/ic_checkbox_nor.svg'
import IC_CHECKBOX_CHECKED from '@/assets/ic_checkbox_hov.svg'
import IC_BTN_REMOVE from '@/assets/ic_btn_remove.png'
import IC_BTN_REMOVE_HOVER from '@/assets/ic_btn_remove_hov.png'
import IC_VECTOR_BLUE from '@/assets/ic_vector_blue.png'
import IC_VECTOR_GREY from '@/assets/ic_vector_grey.png'
import {
  deleteTaskByIdRequest,
  updateTaskContentRequest,
  updateTaskStatusRequest
} from '@/requests/TodoRequest';


export default {
  name       : 'TodoTaskViewComp',
  directives : {
    clickOutside : vClickOutside.directive
  },
  components : {
  },
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
      IC_VECTOR_BLUE,
      IC_VECTOR_GREY,
      TASK_STATUS_REGISTERED : C.TASK_STATUS.REGISTERED,
      TASK_STATUS_COMPLETED  : C.TASK_STATUS.COMPLETED,
      TASK_STATUS_DELETED    : C.TASK_STATUS.DELETED,
      isEditing              : false,
      isDelBtnHover          : false,
      edit_content           : this.task.content
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

      updateTaskStatusRequest(this.task.id, status)
        .then(()=>{ this.$emit("refresh");});

    },
    finishEditing(){
      this.isEditing = false;
    },
    toEditingMode(){
      if(this.task.status === C.TASK_STATUS.COMPLETED)
        return;
      this.isEditing = !this.isEditing;
    },
    editInputChange(){
      const textbox = this.$refs.edit_textbox;
      this.edit_content = textbox.value;
    },
    sendBtnClickListener() {
      var edit_content = this.$refs.edit_textbox.value;
      this.edit_content = edit_content;
      if(edit_content.length === 0)
        return;
      else if(edit_content === this.task.content)
        this.finishEditing();
      else
        this.updateContentRequest(edit_content);
    },
    updateContentRequest(content){
      updateTaskContentRequest(this.task.id, content)
        .then(()=>{
          this.$emit("refresh");
          this.finishEditing();
        })

    },
    deleteTaskRequest(){
      deleteTaskByIdRequest(this.task.id)
        .then(()=>{
          this.$emit("refresh");
        })


    }
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

  &__edit {
    margin-top: 8px;
    display: inline-block;
    height: 60px;
    width: 100%;
    line-height: 60px;
    &__inputbox {
      outline: none;
      display: inline-block;
      height: 58px;
      width: calc(100% - 20px);
      background: #FFFFFF;
      border: 1px solid #2A82F0;
      border-radius: 4px;
      padding-left: 16px;


      &--empty {
        outline: none;
        display: inline-block;
        height: 58px;
        width: calc(100% - 20px);
        border: 1px solid #CCCCCC;
        border-radius: 4px;
        padding-left: 16px;

      }
    }

    &__sendbtn {
      display: inline-block;
      position: absolute;
      width: 16px;
      height: 17px;
      margin-left: -33px;
      margin-top: 22px;
      cursor: pointer;
    }
    &__sendbtn-empty {
      display: inline-block;
      position: absolute;
      width: 16px;
      height: 17px;
      margin-left: -33px;
      margin-top: 22px;
      pointer-events: none;
    }
  }

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
    cursor:text;
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
  .cursor-pointer {
    cursor: pointer;
  }
}
</style>

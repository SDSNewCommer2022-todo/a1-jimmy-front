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
            :src="is_clear_btn_hover ? clear_btn_image_hover : clear_btn_image"
            class="task-view__top__clear__img"
            @mouseover="is_clear_btn_hover = true"
            @mouseleave="is_clear_btn_hover = false"
          />
        </div>
      </div>
      <div class="task-view__list">
        <div v-for="(task, index) in tasks" :key="index" class="task-view__list__content">
          <input type="checkbox" class="task-view__list__content__checkbox" />
          <div class="task-view__list__content__text">
            {{ task.content }}
          </div>
          <div class="task-view__list__content__right">
            <div class="task-view__list__content__right__date">
              {{ toDate(task.created_time) }}
            </div>
            <div class="task-view__list__content__right__remove">
              <img :src="remove_btn_image" class="task-view__list__content__right__remove__img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IC_TASK_CLEAR_BTN from '@/assets/ic_task_clear_btn.png';
import IC_TASK_CLEAR_BTN_HOVER from '@/assets/ic_task_clear_btn_hover.png';
import IC_CHECKBOX_NOR from '@/assets/ic_checkbox_nor.png';
import IC_CHECKBOX_HOV from '@/assets/ic_checkbox_hov.png';
import IC_BTN_REMOVE from '@/assets/ic_btn_remove.png';
import TodoDropDown from '@/components/TodoDropDown';

export default {
  name       : 'TodoTaskView',
  components : {
      TodoDropDown
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
      no_task_description   : 'There is no task.',
      dropbox_contents      : ['Oldest', 'Latest'],
      is_clear_btn_hover    : false,
      clear_btn_image       : IC_TASK_CLEAR_BTN,
      clear_btn_image_hover : IC_TASK_CLEAR_BTN_HOVER,
      check_box_image_nor   : IC_CHECKBOX_NOR,
      check_box_image_hov   : IC_CHECKBOX_HOV,
      remove_btn_image      : IC_BTN_REMOVE
    }
  },
  methods : {
    toDate(datetime){
      var date = new Date(datetime);
      return date.getMonth()+1 + '/' + date.getDate();
    }
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
      &__img{

      }
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

.display-none {
  display: none;
}
</style>

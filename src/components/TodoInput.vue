<template>
  <div class="todo-input" >
    <input
      ref="textbox"
      autofocus
      type="text"
      :value="input_text"
      :placeholder="isNamePage ? PH_NAME : PH_TASK"
      :class="[isNamePage ? 'todo-input__textbox' : 'todo-input__textbox-long',
               isFocus    ? 'todo-input--focus' : 'todo-input--normal',
               input_text ? '' : 'todo-input--normal']"
      @input="inputChangeListener"
      @focus="isFocus = true"
      @focusout="isFocus = false"
      @keyup.enter="sendBtnClickListener"
    >
    <button
      v-if="input_text"
      ref="inputClearButton"
      class="todo-input__clear"
      @click="clearBtnClickListener">
      <img
        ref="clearButtonImage"
        class="todo-input__clear__image"
        :src="input_text ? DELETE_BUTTON_IMAGE : ''"
      >
    </button>
    <button
      ref="sendButton"
      type="button"
      class="todo-input__send"
      :class="input_text ? 'todo-input__send--active' : 'todo-input__send--inactive'"
      @click="sendBtnClickListener">
      <img
        ref="sendButtonImage"
        class="todo-input__send__image"
        :src="input_text ? SEND_BUTTON_BLUE : SEND_BUTTON_GREY"
      >
    </button>
  </div>
</template>

<script>
import C from "../const/TodoInputConst.js"
import IC_DELETE from "@/assets/ic_delete.png"
import IC_VECTOR_BLUE from "@/assets/ic_vector_blue.png"
import IC_VECTOR_GREY from "@/assets/ic_vector_grey.png"

export default {
  name  : 'TodoInput',
  props : {
    isNamePage : {
      state : false
    },
    value : {
      state : false
    }
  },
  data(){
    return {
      input_text          : this.value,
      isFocus             : false,
      PH_NAME             : C.PLACEHOLDER.NAME_PAGE,
      PH_TASK             : C.PLACEHOLDER.TASK_PAGE,
      DELETE_BUTTON_IMAGE : IC_DELETE,
      SEND_BUTTON_GREY    : IC_VECTOR_GREY,
      SEND_BUTTON_BLUE    : IC_VECTOR_BLUE
    }
  },
  methods : {
    inputChangeListener() {
      const text_box = this.$refs.textbox;
      this.input_text = text_box.value;

    },
    clearBtnClickListener() {
      this.input_text = "";
    },
    sendBtnClickListener() {
      if(this.input_text.length === 0) {
        return;
      }
      this.$emit('sendBtnClickEvent', this.input_text);
      this.clearBtnClickListener();
    }
  },
};
</script>

<style scoped lang="scss">
  .todo-input{
    height: 60px;
    &__textbox{
      width: 54%;
      outline: none;
      font-size: 16px;
      border: 0px;
      border-bottom: 1px solid #CCCCCC;
      padding-bottom: 6.5px;
    }
    &__textbox-long{
      width: 90%  ;
      outline: none;
      font-size: 16px;
      border: 1px solid #CCCCCC;
      border-radius: 4px;
      gap: 8px;
      padding: 10px;
    }

    &--focus {
      border-color: #2A82F0;
    }

    &--normal {
      border-color: #CCCCCC;
    }

    &--texting {
      border-color: #2A82F0;
    }

    &__clear{
      cursor: pointer;
      position: absolute;
      display: inline-block;
      border: none;
      background: transparent;
      margin-top: 10px;
      margin-left: -33px;

      &__image{
        width: 20px;
        height: 20px;
      }
    }

    &__send{
      position: absolute;
      margin-top: 12px;
      border-left: 11px;
      border: none;
      background: transparent;
      &__image{
        width: 16px;
        height: 16px;
      }

      &--active {
        cursor: pointer;
      }

      &--inactive {
        cursor: unset;
      }
    }
  }

</style>


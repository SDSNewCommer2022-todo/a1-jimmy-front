<script setup>
</script>

<template>
  <div class="todo-input" >
    <input
      ref="textbox"
      autofocus
      type="text"
      :value="input_text"
      :placeholder="isNamePage ? PH_NAME : PH_TASK"
      :class="[isNamePage ? 'todo-input__textbox' : 'todo-input__textbox-long',
         isNamePage ? 'border-bottom' : 'border-all']"
      @input="inputChangeListener"
      @focus="inputFocusListener"
      @focusout="inputFocusOutListener"
      @keyup.enter="sendBtnClickListener"
    >
    <button
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
      PH_NAME             : C.PLACEHOLDER.NAME_PAGE,
      PH_TASK             : C.PLACEHOLDER.TASK_PAGE,
      DELETE_BUTTON_IMAGE : IC_DELETE,
      SEND_BUTTON_GREY    : IC_VECTOR_GREY,
      SEND_BUTTON_BLUE    : IC_VECTOR_BLUE
    }
  },
  methods : {
    inputBoxNormalState() {
      this.$refs.sendButtonImage.src = IC_VECTOR_GREY;
      this.$refs.sendButton.style.cursor = "";
      if(this.isNamePage)
        this.$refs.textbox.style.borderBottomColor = C.INPUTBOX_COLOR.DEFAULT;
      else
        this.$refs.textbox.style.borderColor = C.INPUTBOX_COLOR.DEFAULT;
    },
    inputBoxFocusState() {
      this.$refs.inputClearButton.style.display = "none";
      this.$refs.sendButtonImage.src = IC_VECTOR_GREY;
      if(this.isNamePage)
        this.$refs.textbox.style.borderBottomColor = C.INPUTBOX_COLOR.ONFOCUS
      else
        this.$refs.textbox.style.borderColor = C.INPUTBOX_COLOR.ONFOCUS
    },
    inputBoxTextingState(){
      this.$refs.sendButton.style.cursor = "pointer";
      this.$refs.inputClearButton.style.display = "inline-block";
      this.$refs.sendButtonImage.src = IC_VECTOR_BLUE
      if(this.isNamePage)
        this.$refs.textbox.style.borderBottomColor = C.INPUTBOX_COLOR.ONFOCUS
      else
        this.$refs.textbox.style.borderColor = C.INPUTBOX_COLOR.ONFOCUS
    },
    inputFocusListener() {
      if(this.input_text.length > 0){
        this.inputBoxTextingState();
      }else{
        this.inputBoxFocusState();
      }
    },
    inputFocusOutListener() {
      this.inputBoxNormalState();

    },
    inputChangeListener() {
      const text_box = this.$refs.textbox;
      if (text_box.value.length === 0) {
        this.inputBoxNormalState();
      } else {
        this.inputBoxTextingState();
        this.input_text = text_box.value;
      }
    },
    clearBtnClickListener() {
      this.inputBoxNormalState();
      this.input_text = "";
      this.$refs.inputClearButton.style.display = "none";
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
    &__textbox{
      width: 54%;
      outline: none;
      font-size: 16px;
    }
    &__textbox-long{
      width: 90%  ;
      outline: none;
      font-size: 16px;
    }
    &__clear{
      cursor: pointer;
      position: absolute;
      display: none;
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
    }
  }

  .border-bottom{
    border: 0px;
    border-bottom: 1px solid #CCCCCC;
    padding-bottom: 6.5px;
  }

  .border-all {
    border: 1px solid #CCCCCC;
    border-radius: 4px;
    gap: 8px;
    padding: 10px;
  }
</style>

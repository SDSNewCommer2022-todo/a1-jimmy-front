<script setup>
</script>

<template>
  <div class="todo-input" >
    <input
      ref="textbox"
      autofocus
      type="text"
      :placeholder="isNamePage ? PH_NAME : PH_TASK"
      :class="['todo-input__textbox', isNamePage ? 'border-bottom' : 'border-all']"
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
    }
  },
  data(){
    return {
      input_text          : "",
      PH_NAME             : C.PLACEHOLDER.NAME_PAGE,
      PH_TASK             : C.PLACEHOLDER.TASK_PAGE,
      DELETE_BUTTON_IMAGE : IC_DELETE,
      SEND_BUTTON_GREY    : IC_VECTOR_GREY,
      SEND_BUTTON_BLUE    : IC_VECTOR_BLUE
    }
  },
  methods : {
    inputBoxNormalState() {
      this.$refs.inputClearButton.style.display = "none";
      this.$refs.sendButtonImage.src = IC_VECTOR_GREY;
      this.$refs.textbox.style.borderBottomColor = C.INPUTBOX_COLOR.DEFAULT;
      this.$refs.textbox.value = "";
      this.$refs.sendButton.style.cursor = "";
      this.input_text = "";
    },
    inputBoxFocusState() {
      this.$refs.inputClearButton.style.display = "none";
      this.$refs.sendButtonImage.src = IC_VECTOR_GREY;
      this.$refs.textbox.style.borderBottomColor = C.INPUTBOX_COLOR.ONFOCUS;
    },
    inputBoxTextingState(){
      this.$refs.sendButton.style.cursor = "pointer";
      this.$refs.inputClearButton.style.display = "inline-block";
      this.$refs.sendButtonImage.src = IC_VECTOR_BLUE
      this.$refs.textbox.style.borderBottomColor = C.INPUTBOX_COLOR.ONFOCUS
    },
    inputFocusListener() {
      this.inputBoxFocusState();
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
    },
    sendBtnClickListener() {
      if(this.input_text.length === 0) {
        return;
      }
      if(this.isNamePage) {
        let input_name = this.input_text;
        this.$store.commit('changeUserName', input_name);
        this.$router.push('/todo')
      }
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

    &__clear{
      cursor: pointer;
      position: absolute;
      display: none;
      border: none;
      background: transparent;
      margin-top: 8px;
      margin-left: -33px;

      &__image{
        width: 20px;
        height: 20px;
      }
    }

    &__send{
      padding-top: 8px;
      border-left: 11px;
      border: none;
      background: transparent;

      &__image{
        width: 16px;
        height: 17px;
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
